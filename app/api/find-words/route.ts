import { NextResponse } from 'next/server';
import type { WordGroups } from '@/types/types';
import words from '@/data/turkish-words.json';

const TURKISH_WORDS = new Set(words);

const LETTER_POINTS: { [key: string]: number } = {
  'a': 1, 'b': 3, 'c': 4, 'ç': 4, 'd': 3, 'e': 1,
  'f': 7, 'g': 5, 'ğ': 8, 'h': 5, 'ı': 2, 'i': 1,
  'j': 10, 'k': 1, 'l': 1, 'm': 2, 'n': 1, 'o': 2,
  'ö': 7, 'p': 5, 'r': 1, 's': 2, 'ş': 4, 't': 1,
  'u': 2, 'ü': 3, 'v': 7, 'y': 3, 'z': 4
};

const LETTER_LIMITS: { [key: string]: number } = {
  'a': 12, 'b': 2, 'c': 2, 'ç': 2, 'd': 2, 'e': 8,
  'f': 1, 'g': 1, 'ğ': 1, 'h': 1, 'ı': 4, 'i': 7,
  'j': 1, 'k': 7, 'l': 7, 'm': 4, 'n': 5, 'o': 3,
  'ö': 1, 'p': 1, 'r': 6, 's': 3, 'ş': 2, 't': 5,
  'u': 3, 'ü': 2, 'v': 1, 'y': 2, 'z': 2
};

function calculateWordPoints(word: string): number {
  return word.split('').reduce((total, letter) => {
    return total + (LETTER_POINTS[letter] || 0);
  }, 0);
}

function isValidWord(word: string, availableLetters: Map<string, number>, wildcardCount: number): boolean {
  const wordLetterCount = new Map<string, number>();

  for (const letter of word) {
    wordLetterCount.set(letter, (wordLetterCount.get(letter) || 0) + 1);
  }

  let neededWildcards = 0;

  for (const [letter, count] of wordLetterCount) {
    const available = availableLetters.get(letter) || 0;
    if (count > available) {
      neededWildcards += count - available;

      if (neededWildcards > wildcardCount || count > (LETTER_LIMITS[letter] || 0)) {
        return false;
      }
    }
  }

  return true;
}

function findWords(letters: string, suffix?: string): Array<{ word: string; points: number }> {
  const letterCount = new Map<string, number>();
  const hasWildcard = letters.includes('*');
  const wildcardCount = (letters.match(/\*/g) || []).length;

  for (const letter of letters.replace(/\*/g, '')) {
    letterCount.set(letter, (letterCount.get(letter) || 0) + 1);
  }

  return Array.from(TURKISH_WORDS)
    .filter(word => {
      if (suffix && !word.includes(suffix)) {
        return false;
      }

      if (word.length > letters.length + wildcardCount) {
        return false;
      }

      return isValidWord(word, letterCount, wildcardCount);
    })
    .map(word => ({
      word,
      points: calculateWordPoints(word)
    }))
    .sort((a, b) => b.points - a.points);
}

export async function POST(request: Request) {
  try {
    const { letters, suffix } = await request.json();

    if (!letters) {
      return NextResponse.json({ error: 'Harfler gerekli' }, { status: 400 });
    }

    const matchingWords = findWords(letters.toLowerCase(), suffix?.toLowerCase());

    const groupedWords = matchingWords.reduce((acc: WordGroups, { word, points }) => {
      const length = word.length;
      if (!acc[length]) {
        acc[length] = [];
      }
      acc[length].push({
        kelime: word,
        length,
        points,
        matchIndex: suffix ? word.indexOf(suffix) : undefined
      });
      return acc;
    }, {});

    return NextResponse.json(groupedWords);
  } catch (error) {
    console.error('API Hatası:', error);
    return NextResponse.json({ error: 'İşlem başarısız' }, { status: 500 });
  }
}
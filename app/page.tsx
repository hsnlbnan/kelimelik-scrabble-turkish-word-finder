'use client';

import { useState, useCallback } from 'react';
import type { Word, WordGroups } from '@/types/types';
import Link from 'next/link';
import { Search, Info, Award, HelpCircle } from 'lucide-react';

const highlightJokerLetters = (word: string, originalLetters: string) => {
  const letterCount = new Map<string, number>();

  for (const letter of originalLetters.replace(/\*/g, '')) {
    letterCount.set(letter, (letterCount.get(letter) || 0) + 1);
  }

  return word.split('').map((letter) => {
    const count = letterCount.get(letter) || 0;
    if (count === 0) {
      return { letter, isJoker: true };
    }
    letterCount.set(letter, count - 1);
    return { letter, isJoker: false };
  });
};

export default function Home() {
  const [letters, setLetters] = useState('');
  const [suffix, setSuffix] = useState('');
  const [results, setResults] = useState<WordGroups>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!letters) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/find-words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ letters, suffix }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Kelime arama hatası:', error);
    } finally {
      setIsLoading(false);
    }
  }, [letters, suffix]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold text-blue-800 tracking-tight">
            Kelime Bulucu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            TDK sözlüğünden kelime bulma aracı. Scrabble, Kelimelik ve benzeri oyunlar için
            en kapsamlı kelime bulma asistanı.
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="letters" className="block text-sm font-semibold text-gray-700">
                Harfleriniz <span className="text-gray-500 font-normal">(Joker için * kullanın)</span>
              </label>
              <div className="relative">
                <input
                  id="letters"
                  type="text"
                  value={letters}
                  onChange={(e) => setLetters(e.target.value.toLowerCase())}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Örnek: rmkaüef*"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="suffix" className="block text-sm font-semibold text-gray-700">
                Bağlanacağı İfade <span className="text-gray-500 font-normal">(İsteğe bağlı)</span>
              </label>
              <input
                id="suffix"
                type="text"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value.toLowerCase())}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Örnek: as"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={!letters || isLoading}
            className="w-full mt-8 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400
                     transition-colors text-lg font-medium focus:ring-4 focus:ring-blue-500/50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Aranıyor...
              </span>
            ) : (
              'Kelimeleri Bul'
            )}
          </button>
        </div>

        {Object.entries(results).length > 0 && (
          <div className="space-y-8">
            {Object.entries(results)
              .sort(([a], [b]) => Number(b) - Number(a))
              .map(([length, words]) => (
                <div key={length} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold mb-6 text-blue-800 flex items-center">
                    <Award className="mr-2" size={24} />
                    {length} Harfli Kelimeler
                    <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {words.length}
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {words.map((word, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all bg-gray-50 hover:bg-white"
                      >
                        <div className="font-medium text-lg mb-1">
                          {highlightJokerLetters(word.kelime, letters).map((char, i) => (
                            <span
                              key={i}
                              className={char.isJoker ? 'text-red-600 font-bold' : 'text-blue-600 font-bold'}
                            >
                              {char.letter}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                          {word.points} puan
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Kelime Bulucu Nedir?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Kelime Bulucu, TDK sözlüğünü kullanarak verilen harflerden
              oluşturulabilecek tüm Türkçe kelimeleri bulan ücretsiz bir araçtır.
              Scrabble, Kelimelik, WORDLE gibi kelime oyunlarında size yardımcı olur.
            </p>
            <h3>Özellikler:</h3>
            <ul>
              <li>60.000+ Türkçe kelime</li>
              <li>Joker harf desteği</li>
              <li>Kelime puanlama sistemi</li>
              <li>TDK uyumlu kelimeler</li>
              <li>Hızlı ve kolay kullanım</li>
            </ul>
          </div>
        </div>

        <footer className="mt-16 border-t pt-8">
          <nav className="flex justify-center space-x-8 text-gray-600">
            <Link href="/nasil-kullanilir" className="flex items-center hover:text-blue-600 transition-colors">
              <Info className="mr-2" size={18} />
              Nasıl Kullanılır?
            </Link>
            <Link href="/sss" className="flex items-center hover:text-blue-600 transition-colors">
              <HelpCircle className="mr-2" size={18} />
              Sık Sorulan Sorular
            </Link>
            <Link href="/puan-tablosu" className="flex items-center hover:text-blue-600 transition-colors">
              <Award className="mr-2" size={18} />
              Puan Tablosu
            </Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}

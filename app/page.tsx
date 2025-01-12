'use client';

import { useState, useCallback } from 'react';
import type { WordGroups } from '@/types/types';
import Link from 'next/link';
import { Search, Info, Award, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { ThemeToggle } from '@/app/components/theme-toggle';

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
  const [error, setError] = useState<string | null>(null);



  const handleSearch = useCallback(async () => {
    if (!letters) return;

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/find-words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ letters, suffix }),
      });

      if (!response.ok) {
        throw new Error('Arama sırasında bir hata oluştu');
      }

      const data = await response.json();
      setResults(data);

      // Smooth scroll to results
      if (Object.keys(data).length > 0) {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    } catch (error) {
      setError('Kelime arama hatası oluştu. Lütfen tekrar deneyin.');
      toast.error('Arama sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  }, [letters, suffix]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <ThemeToggle />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center p-1 mb-8 rounded-full
                         bg-blue-50/50 dark:bg-blue-500/5 text-blue-600 dark:text-blue-400">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full
                           bg-white dark:bg-[#111111] text-sm font-medium">
              <Sparkles size={16} />
              TDK Sözlüğünden Kelime Bulun
            </span>
          </div>
          <h1 className="text-gray-900 dark:text-gray-50 text-5xl font-bold tracking-tight sm:text-6xl mb-4">
            Kelime Bulucu
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Harflerinizi girin, TDK onaylı kelimeleri anında bulun
          </p>
        </motion.header>

        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5
                         dark:from-blue-500/[0.03] dark:to-purple-500/[0.03] rounded-2xl" />
          <div className="relative bg-white dark:bg-[#111111] rounded-2xl
                         border border-gray-200/50 dark:border-[#262626] p-8">
            <div className="grid gap-6 sm:grid-cols-2 mb-6">
              <div className="space-y-2">
                <label htmlFor="letters" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Harfleriniz
                </label>
                <div className="relative group">
                  <input
                    id="letters"
                    type="text"
                    value={letters}
                    onChange={(e) => setLetters(e.target.value.toLowerCase())}
                    onKeyDown={handleKeyPress}
                    maxLength={15}
                    className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200
                             dark:border-[#262626] rounded-lg focus:ring-2 focus:ring-blue-500/20
                             focus:border-blue-500 hover:border-gray-300 dark:hover:border-[#404040]
                             placeholder-gray-400 dark:placeholder-gray-600 transition-all duration-200
                             text-gray-900 dark:text-gray-100"
                    placeholder="Örnek: rmkaüef*"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                                dark:text-gray-600 group-hover:text-blue-500 transition-colors">
                    <Search size={18} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Joker için * kullanın
                </p>
              </div>

              <div>
                <label htmlFor="suffix" className="block text-sm font-medium text-gray-700 mb-2">
                  Bağlanacağı İfade
                </label>
                <input
                  id="suffix"
                  type="text"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value.toLowerCase())}
                  className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200
                  dark:border-[#262626] rounded-lg focus:ring-2 focus:ring-blue-500/20
                  focus:border-blue-500 hover:border-gray-300 dark:hover:border-[#404040]
                  placeholder-gray-400 dark:placeholder-gray-600 transition-all duration-200
                  text-gray-900 dark:text-gray-100"
                  placeholder="İsteğe bağlı"
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={!letters || isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700
                       disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white rounded-lg
                       disabled:cursor-not-allowed transition-all duration-200 font-medium
                       focus:ring-2 focus:ring-blue-500/20 active:scale-[0.98]"
            >
              {isLoading ? (
                <motion.span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Aranıyor
                </motion.span>
              ) : (
                'Kelimeleri Bul'
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {Object.entries(results).length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {Object.entries(results)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([length, words]) => (
                  <div
                    key={length}
                    className="bg-white dark:bg-[#111111] rounded-xl border border-gray-200/50
                             dark:border-[#262626] p-6"
                  >
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100
                                 mb-4 flex items-center gap-2">
                      <Award className="text-blue-600 dark:text-blue-500" size={20} />
                      {length} Harfli Kelimeler
                      <span className="ml-2 px-2.5 py-0.5 bg-blue-50 dark:bg-blue-500/10
                                     text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                        {words.length}
                      </span>
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {words.map((word, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 dark:bg-black p-4 rounded-lg border
                                   border-gray-200/50 dark:border-[#262626] hover:border-blue-200
                                   dark:hover:border-blue-900 transition-all duration-200"
                        >
                          <div className="text-lg mb-1">
                            {highlightJokerLetters(word.kelime, letters).map((char, i) => (
                              <span
                                key={i}
                                className={char.isJoker ? 'text-blue-600 font-medium' : 'text-gray-900'}
                              >
                                {char.letter}
                              </span>
                            ))}
                          </div>
                          <div className="text-sm font-medium text-gray-600">
                            {word.points} puan
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {Object.entries(results).length === 0 && letters && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              Sonuç bulunamadı. Lütfen farklı harflerle tekrar deneyin.
            </p>
          </motion.div>
        )}

        <div className="mt-24 border-t pt-12">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600" size={24} />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">60.000+ Kelime</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">TDK onaylı geniş kelime havuzu</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="text-blue-600" size={24} />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Joker Desteği</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">* işareti ile joker harf kullanımı</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="text-blue-600" size={24} />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Puan Sistemi</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Kelime oyunları için puan hesaplama</p>
            </div>
          </div>
        </div>

        <footer className="mt-24 border-t pt-8">
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href="/nasil-kullanilir" className="hover:text-gray-900 transition-colors">
              Nasıl Kullanılır?
            </Link>
            <Link href="/sss" className="hover:text-gray-900 transition-colors">
              Sık Sorulan Sorular
            </Link>
            <Link href="/puan-tablosu" className="hover:text-gray-900 transition-colors">
              Puan Tablosu
            </Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kelime Puanlama Tablosu | Kelime Bulucu',
  description: 'Kelime bulma oyunlarında kullanılan harf puanları. Her harfin kaç puan ettiğini öğrenin.',
};

export default function PointsTable() {
  const letterGroups = [
    {
      points: 1,
      letters: ['A', 'E', 'İ', 'K', 'L', 'N', 'R', 'T'],
      description: 'En yaygın harfler'
    },
    {
      points: 2,
      letters: ['I', 'M', 'O', 'S', 'U'],
      description: 'Yaygın harfler'
    },
    {
      points: 3,
      letters: ['B', 'D', 'Ü', 'Y'],
      description: 'Orta sıklıkta harfler'
    },
    {
      points: 4,
      letters: ['C', 'Ç', 'Ş', 'Z'],
      description: 'Az kullanılan harfler'
    },
    {
      points: 5,
      letters: ['G', 'H', 'P'],
      description: 'Nadir harfler'
    },
    {
      points: 7,
      letters: ['F', 'Ö', 'V'],
      description: 'Çok nadir harfler'
    },
    {
      points: 8,
      letters: ['Ğ'],
      description: 'En nadir harf'
    },
    {
      points: 10,
      letters: ['J'],
      description: 'En değerli harf'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ChevronLeft className="mr-1" size={20} />
          Ana Sayfaya Dön
        </Link>

        <h1 className="text-4xl font-bold text-blue-800 mb-8">Harf Puanlama Tablosu</h1>

        <div className="space-y-6">
          {letterGroups.map(group => (
            <div
              key={group.points}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-blue-800">{group.points} Puan</h2>
                  <p className="text-gray-600">{group.description}</p>
                </div>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {group.letters.length} harf
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.letters.map(letter => (
                  <div
                    key={letter}
                    className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 text-xl font-bold text-blue-700"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
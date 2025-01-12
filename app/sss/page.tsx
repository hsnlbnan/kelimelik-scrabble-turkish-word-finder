import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sık Sorulan Sorular | Kelime Bulucu',
  description: 'Kelime bulucu hakkında sık sorulan sorular ve cevapları. Kullanım rehberi ve yardım.',
};

export default function FAQ() {
  const questions = [
    {
      q: 'Kaç joker harf kullanabilirim?',
      a: 'En fazla 2 joker harf (*) kullanabilirsiniz. Her joker harf, herhangi bir Türkçe harfin yerine geçebilir.'
    },
    {
      q: 'Puanlama nasıl yapılıyor?',
      a: 'Her harf farklı puana sahiptir. Örneğin A, E, İ harfleri 1 puan, J harfi 10 puan değerindedir. Kelime puanı, içerdiği harflerin puanları toplanarak hesaplanır.'
    },
    {
      q: 'Bulunan kelimeler nereden geliyor?',
      a: 'Tüm kelimeler TDK (Türk Dil Kurumu) sözlüğünden alınmıştır. Sadece Türkçe kelimeler kullanılmaktadır.'
    },
    {
      q: 'Neden bazı kelimeler çıkmıyor?',
      a: 'Sadece TDK sözlüğünde yer alan kelimeler listelenir. Özel isimler, kısaltmalar ve birleşik kelimeler sonuçlarda gösterilmez.'
    },
    {
      q: '"Bağlanacağı İfade" ne işe yarıyor?',
      a: 'Bu alan, bulunacak kelimelerin içermesi gereken bir ek veya harf dizisi belirtmenizi sağlar. Örneğin "lar" yazarsanız, sadece içinde "lar" geçen kelimeler listelenir.'
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

        <h1 className="text-4xl font-bold text-blue-800 mb-8">Sık Sorulan Sorular</h1>

        <div className="space-y-6">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-3">
                {item.q}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
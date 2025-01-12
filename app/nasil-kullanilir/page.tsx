import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Star, Zap, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nasıl Kullanılır? | Kelime Bulucu',
  description: 'Kelime bulucu aracını nasıl kullanacağınızı öğrenin. Detaylı kullanım kılavuzu ve ipuçları.',
  alternates: {
    canonical: 'https://kelimebulucu.com/nasil-kullanilir'
  },
  openGraph: {
    title: 'Kelime Bulucu Nasıl Kullanılır?',
    description: 'Kelime bulucu kullanım kılavuzu ve ipuçları',
    url: 'https://kelimebulucu.com/nasil-kullanilir'
  }
};

export default function HowToUse() {
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

        <h1 className="text-4xl font-bold text-blue-800 mb-8">Nasıl Kullanılır?</h1>

        <div className="space-y-8">
          <section className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-blue-800">
              <Search className="mr-3" size={24} />
              Temel Kullanım
            </h2>
            <div className="prose prose-lg max-w-none">
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-gray-700">
                  <span className="font-medium">Harfleri Girin:</span> Elinizde bulunan harfleri üst kutucuğa yazın
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Joker Kullanımı:</span> Joker harf için * işaretini kullanın (en fazla 2 adet)
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Ek Belirtin (İsteğe Bağlı):</span> Kelimenin içermesi gereken bir ek varsa belirtin
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Aramayı Başlatın:</span> "Kelimeleri Bul" butonuna tıklayın
                </li>
              </ol>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-blue-800">
              <Star className="mr-3" size={24} />
              Joker Kullanımı
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">
                Joker harf (*) kullanıldığında, kelimelerde joker harfle oluşturulan harfler
                <span className="text-red-600 font-bold mx-1">kırmızı</span>
                renkte gösterilir.
              </p>
              <div className="mt-4 bg-gray-50 p-6 rounded-lg">
                <p className="font-medium text-gray-600 mb-2">Örnek:</p>
                <p className="text-gray-700">
                  Harfler: "ka*" ile "kat" kelimesi bulunduğunda:
                </p>
                <div className="mt-2 p-3 bg-white border rounded-lg inline-block">
                  <span className="text-blue-600 font-bold">k</span>
                  <span className="text-blue-600 font-bold">a</span>
                  <span className="text-red-600 font-bold">t</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-blue-800">
              <Zap className="mr-3" size={24} />
              İpuçları
            </h2>
            <div className="prose prose-lg max-w-none">
              <ul className="space-y-3 list-disc list-inside text-gray-700">
                <li>En yüksek puanlı kelimeleri bulmak için uzun kelimeler oluşturmaya çalışın</li>
                <li>Joker harfleri yüksek puanlı harfler için kullanın (F, Ğ, J gibi)</li>
                <li>Kelime uzunluğu arttıkça toplam puan da artar</li>
                <li>Bağlanacağı ifade alanını kullanarak belirli bir eki içeren kelimeleri bulun</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
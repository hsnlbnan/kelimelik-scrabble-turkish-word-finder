import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://kelimebulucu.com'),
  title: 'Kelime Bulucu | TDK Kelime Bulma Oyunu',
  description: 'Türkçe kelime bulma oyunu. Verilen harflerle TDK sözlüğünden kelime bulun. Scrabble, Kelimelik ve benzeri oyunlar için kelime bulucu.',
  keywords: 'kelime bulucu, kelime bulma, tdk kelime bulucu, scrabble kelime bulucu, kelimelik yardımcısı, türkçe kelime oyunu, wordle türkçe, kelime bul',
  openGraph: {
    title: 'Kelime Bulucu | TDK Kelime Bulma Oyunu',
    description: 'Türkçe kelime bulma oyunu. Verilen harflerle TDK sözlüğünden kelime bulun.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://kelimebulucu.com',
    siteName: 'Kelime Bulucu',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kelime Bulucu - TDK Kelime Bulma Oyunu'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kelime Bulucu | TDK Kelime Bulma Oyunu',
    description: 'Türkçe kelime bulma oyunu. TDK sözlüğünden kelime bulun.',
    images: ['/twitter-image.png']
  },
  alternates: {
    canonical: 'https://kelimebulucu.com'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Kelime Bulucu",
              "description": "TDK sözlüğünden kelime bulma aracı",
              "url": "https://kelimebulucu.com",
              "applicationCategory": "GameApplication",
              "operatingSystem": "Web",
              "inLanguage": "tr-TR",
              "author": {
                "@type": "Organization",
                "name": "Kelime Bulucu"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

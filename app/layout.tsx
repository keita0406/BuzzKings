import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://buzzlab8.jp'),
  title: 'SNSで集客しませんか？効果的なSNSマーケティングでフォロワー増加と売上アップ | BUZZLAB',
  description: 'SNS集客のプロが教える効果的なSNSマーケティング。フォロワー増加、エンゲージメント向上、売上アップを実現。個人フォロワー20万人以上の実績で確実な成果をお約束します。',
  keywords: 'SNS集客, SNSマーケティング, フォロワー増加, Instagram集客, TikTok集客, SNS広告, SNSコンサルティング, ソーシャルメディアマーケティング, デジタルマーケティング, SNS戦略',
  authors: [{ name: 'KEITA - BUZZLAB', url: 'https://buzzlab8.jp' }],
  creator: 'BUZZLAB',
  publisher: 'BUZZLAB',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: 'SNSで集客しませんか？効果的なSNSマーケティングでフォロワー増加 | BUZZLAB',
    description: 'SNS集客のプロが教える効果的なSNSマーケティング。個人フォロワー20万人以上の実績で確実な成果をお約束。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://buzzlab8.jp',
    siteName: 'BUZZLAB - SNS集客・マーケティング専門',
    images: [
      {
        url: 'https://buzzlab8.jp/images/buzzlab-logo.png',
        width: 1200,
        height: 630,
        alt: 'BUZZLAB - SNSで集客しませんか？効果的なSNSマーケティング',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SNSで集客しませんか？効果的なSNSマーケティング | BUZZLAB',
    description: 'SNS集客のプロが教える効果的なSNSマーケティング。フォロワー増加と売上アップを実現。',
    creator: '@buzzlab_keita',
    images: ['https://buzzlab8.jp/images/buzzlab-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://buzzlab8.jp',
  },
  category: 'Business',
  classification: 'SNSマーケティング・コンサルティング',
  other: {
    'last-modified': new Date().toISOString(),
    'audience': 'business owners, entrepreneurs, marketers',
    'coverage': 'Japan',
    'distribution': 'global',
    'rating': 'general',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://buzzlab8.jp/#organization",
        "name": "BUZZLAB",
        "alternateName": "バズラボ",
        "url": "https://buzzlab8.jp",
        "logo": {
          "@type": "ImageObject",
          "url": "https://buzzlab8.jp/images/buzzlab-logo.png",
          "width": 200,
          "height": 200
        },
        "description": "SNS集客とマーケティングの専門コンサルティング会社。フォロワー増加と売上アップを実現する効果的なSNSマーケティングを提供。",
        "founder": {
          "@type": "Person",
          "name": "KEITA",
          "jobTitle": "SNSマーケティングコンサルタント"
        },
        "sameAs": [
          "https://instagram.com/buzzlab_keita",
          "https://tiktok.com/@buzzlab_keita"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": "Japanese"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://buzzlab8.jp/#website",
        "url": "https://buzzlab8.jp",
        "name": "BUZZLAB - SNS集客・マーケティング専門",
        "description": "SNSで集客しませんか？効果的なSNSマーケティングでフォロワー増加と売上アップを実現。",
        "publisher": {
          "@id": "https://buzzlab8.jp/#organization"
        },
        "inLanguage": "ja-JP"
      },
      {
        "@type": "WebPage",
        "@id": "https://buzzlab8.jp/#webpage",
        "url": "https://buzzlab8.jp",
        "name": "SNSで集客しませんか？効果的なSNSマーケティング | BUZZLAB",
        "isPartOf": {
          "@id": "https://buzzlab8.jp/#website"
        },
        "about": {
          "@id": "https://buzzlab8.jp/#organization"
        },
        "description": "SNS集客のプロが教える効果的なSNSマーケティング。フォロワー増加、エンゲージメント向上、売上アップを実現。",
        "breadcrumb": {
          "@id": "https://buzzlab8.jp/#breadcrumb"
        },
        "inLanguage": "ja-JP"
      },
      {
        "@type": "Service",
        "@id": "https://buzzlab8.jp/#service",
        "name": "SNSマーケティングコンサルティング",
        "description": "効果的なSNS集客とマーケティング戦略の提供。フォロワー増加から売上アップまでトータルサポート。",
        "provider": {
          "@id": "https://buzzlab8.jp/#organization"
        },
        "areaServed": "Japan",
        "serviceType": "SNSマーケティング, SNS集客, フォロワー増加, SNS広告運用"
      }
    ]
  };

  return (
    <html lang="ja" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
        <meta name="color-scheme" content="light dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setTheme() {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }
                
                // 初期設定
                setTheme();
                
                // システム設定変更の監視
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
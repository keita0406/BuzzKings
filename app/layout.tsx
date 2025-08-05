import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BUZZLAB - SNS × AI で「バズを制する者たち」',
  description: '最先端のAI技術とSNSマーケティングの融合で、あなたのコンテンツを次のレベルへ導きます。バズを生み出すプロフェッショナル集団BUZZLAB。',
  keywords: 'SNS, AI, マーケティング, バズ, インフルエンサー, コンテンツ生成, バイラル',
  openGraph: {
    title: 'BUZZLAB - SNS × AI で「バズを制する者たち」',
    description: '最先端のAI技術とSNSマーケティングの融合で、あなたのコンテンツを次のレベルへ導きます',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BUZZLAB - SNS × AI で「バズを制する者たち」',
    description: '最先端のAI技術とSNSマーケティングの融合で、あなたのコンテンツを次のレベルへ導きます',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
import Layout from '@/components/Layout'
import HeroSection from '@/components/HeroSection'
import StrengthsSection from '@/components/StrengthsSection'
import ServicesSection from '@/components/ServicesSection'
import AchievementsSection from '@/components/AchievementsSection'
import FollowerGrowthSection from '@/components/FollowerGrowthSection'
import RealtimeSNSNewsSection from '@/components/RealtimeSNSNewsSection'
import CounselingSection from '@/components/CounselingSection'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'
import { getPageData } from '@/lib/staticData'

// ISR（Incremental Static Regeneration）設定
export const revalidate = 3600 // 1時間ごとに再生成

// SSG用の静的パラメータ生成
export async function generateStaticParams() {
  return [{}] // ホームページは単一ページなので空のオブジェクト
}

// ページデータを事前にビルド時に取得（SSG/ISR）
export default async function Home() {
  const pageData = await getPageData()

  return (
    <Layout>
      {/* HeroSection - クライアントサイド（アニメーション重視） */}
      <HeroSection />
      
      {/* StrengthsSection - SSGでコンテンツ、アニメーションはクライアント */}
      <StrengthsSection strengths={pageData.strengths} />
      
      {/* ServicesSection - SSGでコンテンツ、アニメーションはクライアント */}
      <ServicesSection services={pageData.services} />
      
      {/* AchievementsSection - SSGでコンテンツ、アニメーションはクライアント */}
      <AchievementsSection achievements={pageData.achievements} />
      
      {/* FollowerGrowthSection - SSGでコンテンツ、アニメーションはクライアント */}
      <FollowerGrowthSection 
        followerData={pageData.followerGrowth} 
        phases={pageData.growthPhases} 
      />
      
      {/* RealtimeSNSNewsSection - SSGでコンテンツ、アニメーションはクライアント */}
      <RealtimeSNSNewsSection />
      
      {/* CounselingSection - クライアントサイド */}
      <CounselingSection />
      
      {/* FAQSection - SSGでコンテンツ、アニメーションはクライアント */}
      <FAQSection faqs={pageData.faqs} />
      
      {/* ContactSection - クライアントサイド */}
      <ContactSection />
    </Layout>
  )
}

// SEO最適化のためのメタデータ生成（SSR）
export async function generateMetadata() {
  const pageData = await getPageData()
  
  return {
    title: pageData.metadata.title,
    description: pageData.metadata.description,
    keywords: [
      'SNS マーケティング',
      'インフルエンサー',
      'バズる',
      'フォロワー増加',
      'AI コンテンツ',
      'Instagram 集客',
      'TikTok 運用',
      '広告運用',
      'ブランディング',
      'BUZZLAB'
    ],
    openGraph: {
      title: pageData.metadata.title,
      description: pageData.metadata.description,
      url: 'https://buzzlab8.jp',
      siteName: 'BUZZLAB',
      type: 'website',
      locale: 'ja_JP',
      images: [
        {
          url: 'https://buzzlab8.jp/images/buzzkings-logo.png',
          width: 1200,
          height: 630,
          alt: 'BUZZLAB - SNS × AI で「バズを制する者たち」',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.metadata.title,
      description: pageData.metadata.description,
      images: ['https://buzzlab8.jp/images/buzzkings-logo.png'],
    },
    alternates: {
      canonical: 'https://buzzlab8.jp',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'last-modified': pageData.metadata.lastUpdated,
    }
  }
}
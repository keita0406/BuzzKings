import Layout from '@/components/Layout'
import HeroSection from '@/components/HeroSection'
import StrengthsSection from '@/components/StrengthsSection'
import HybridSNSSection from '@/components/HybridSNSSection'
import ServicesSection from '@/components/ServicesSection'
import AchievementsSection from '@/components/AchievementsSection'
import FollowerGrowthSection from '@/components/FollowerGrowthSection'
import RealtimeSNSNewsSection from '@/components/RealtimeSNSNewsSection'
import CounselingSection from '@/components/CounselingSection'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'
import { getPageData } from '@/lib/staticData'

// ページデータを事前にサーバーサイドで取得（SEOに重要なコンテンツ）
export default async function Home() {
  const pageData = await getPageData()

  return (
    <Layout>
      {/* HeroSection - クライアントサイド（アニメーション重視） */}
      <HeroSection />
      
      {/* StrengthsSection - SSRでコンテンツ、アニメーションはクライアント */}
      <StrengthsSection strengths={pageData.strengths} />
      
      {/* HybridSNSSection - クライアントサイド */}
      <HybridSNSSection />
      
      {/* ServicesSection - SSRでコンテンツ（SEO重要）、アニメーションはクライアント */}
      <ServicesSection services={pageData.services} />
      
      {/* AchievementsSection - SSRでコンテンツ（SEO重要）、アニメーションはクライアント */}
      <AchievementsSection achievements={pageData.achievements} />
      
      {/* FollowerGrowthSection - SSRでコンテンツ（SEO重要）、チャートはクライアント */}
      <FollowerGrowthSection 
        followerData={pageData.followerGrowth} 
        phases={pageData.growthPhases} 
      />
      
      {/* RealtimeSNSNewsSection - クライアントサイド */}
      <RealtimeSNSNewsSection />
      
      {/* CounselingSection - クライアントサイド */}
      <CounselingSection />
      
      {/* FAQSection - SSRでコンテンツ（SEO重要）、アニメーションはクライアント */}
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
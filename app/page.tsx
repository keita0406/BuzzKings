'use client'

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

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <StrengthsSection />
      <HybridSNSSection />
      <ServicesSection />
      <AchievementsSection />
      <FollowerGrowthSection />
      <RealtimeSNSNewsSection />
      <CounselingSection />
      <FAQSection />
      <ContactSection />
    </Layout>
  )
}
'use client'

import Layout from '@/components/Layout'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import AchievementsSection from '@/components/AchievementsSection'
import FollowerGrowthSection from '@/components/FollowerGrowthSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CounselingSection from '@/components/CounselingSection'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <AchievementsSection />
      <FollowerGrowthSection />
      <TestimonialsSection />
      <CounselingSection />
      <FAQSection />
      <ContactSection />
    </Layout>
  )
}
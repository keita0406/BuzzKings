'use client'

import Layout from '@/components/Layout'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import AchievementsSection from '@/components/AchievementsSection'
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
      <TestimonialsSection />
      <CounselingSection />
      <FAQSection />
      <ContactSection />
    </Layout>
  )
}
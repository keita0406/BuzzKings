import { MotionDiv, MotionLink, ScrollToContactButton } from './ClientMotionWrapper'

interface Achievement {
  image: string
  title: string
  description: string
  category: string
  link?: string
}

interface AchievementsSectionProps {
  achievements: Achievement[]
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const achievementDetails = [
    {
      title: "ブランドオフプライスイベント",
      subtitle: "フォロワー数3万人超",
      description: "インフルエンサーマーケティングと最強広告運用の組み合わせで爆発的成長を実現",
      metrics: [
        "2024年度売上: 3億円超",
        "広告費: 200万以下", 
        "総動員数2万人以上"
      ],
      image: "/images/brand-off-event.jpg",
      link: "https://www.instagram.com/import_buyersalon/"
    },
    {
      title: "焼肉虎喜西宮本店",
      subtitle: "OPEN2ヶ月で黒字化",
      description: "地域性に基づく戦略的な広告運用で集客力を大幅に向上",
      metrics: [
        "毎月新規: 500組以上",
        "SNS経由売上: 90%以上",
        "他県来店: 50%以上"
      ],
      image: "/images/yakiniku-toraki.jpg", 
      link: "https://www.instagram.com/yakiniku.toraki/"
    },
    {
      title: "Eyelash Salon CHARME",
      subtitle: "OPEN1ヶ月目で黒字化",
      description: "ローカル地域性ターゲット分析に広告運用とインフルエンサーマーケティングによりOPEN初月から満席を実現",
      metrics: [
        "新規顧客: 毎月30%以上",
        "SNS経由売上: 90%以上",
        "来店数: 毎月200名以上"
      ],
      image: "/images/eyelash-charme.jpg",
      link: "https://www.instagram.com/charme.eyelash/"
    }
  ]

  return (
    <section id="achievements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                実績
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              弊社SNS集客実績のご紹介（自社のみ）
            </p>
          </MotionDiv>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {achievementDetails.map((achievement, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 text-center flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                
                {/* Subtitle - Same gradient as main title */}
                <div className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    {achievement.subtitle}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {achievement.description}
                </p>
                
                {/* Metrics */}
                <div className="space-y-2 mb-6 flex-1">
                  {achievement.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center justify-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 font-medium">{metric}</span>
                    </div>
                  ))}
                </div>
                
                {/* Instagram Button - Now flex to align properly */}
                <div className="mt-auto">
                  <MotionLink
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagramを見る
                  </MotionLink>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* CTA Section - Updated background to match main page colors */}
        <div className="text-center mt-16">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  意味のあるSNS広告運用で<br className="md:hidden" />
                  費用対効果30倍以上の実績多数
                </span>
              </h3>
              <ScrollToContactButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                無料相談を始める
              </ScrollToContactButton>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
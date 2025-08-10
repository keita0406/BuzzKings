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
  return (
    <section id="achievements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header - SSR */}
        <div className="text-center mb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">実績</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              弊社SNS集客実績のご紹介（自社のみ）
            </p>
          </MotionDiv>
        </div>

        {/* Success Stories - SSR Content with Client Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {achievements.map((story, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  {/* Client Name - SEO重要 */}
                  <h3 className="text-white font-bold text-lg mb-1">
                    {story.title}
                  </h3>
                  {/* Result - SEO重要 */}
                  <p className="text-yellow-300 font-semibold">
                    {story.category}
                  </p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Description - SEO重要 */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {story.description}
                </p>
                
                {/* Instagram Link */}
                {story.link && (
                  <MotionLink
                    href={story.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  >
                    Instagramを見る
                  </MotionLink>
                )}
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                あなたのビジネスも次のサクセスストーリーに
              </h3>
              <p className="text-lg mb-6 opacity-90">
                実績に裏打ちされた戦略で、確実な成果をお約束します
              </p>
              <ScrollToContactButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300"
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
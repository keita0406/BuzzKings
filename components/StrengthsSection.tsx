import { MotionDiv } from './ClientMotionWrapper'

interface Strength {
  title: string
  description: string
}

interface StrengthsSectionProps {
  strengths: Strength[]
}

export default function StrengthsSection({ strengths }: StrengthsSectionProps) {
  return (
    <section id="strengths" className="py-24 bg-white">
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
              <span className="gradient-text">弊社だけの強み</span>
            </h2>
          </MotionDiv>
        </div>

        {/* Strengths Grid - SSR Content with Client Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {strengths.map((strength, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Title - SEO重要 */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight whitespace-pre-line">
                {strength.title}
              </h3>
              {/* Description - SEO重要 */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {strength.description}
              </p>
            </MotionDiv>
          ))}
        </div>

        {/* Plus Symbol */}
        <div className="text-center mb-12">
          <MotionDiv
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl font-bold text-purple-500">+</div>
          </MotionDiv>
        </div>

        {/* Hybrid SNS Section */}
        <div className="text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              {/* SEO重要なタイトル */}
              <h3 className="text-4xl md:text-5xl font-bold mb-4">
                ハイブリッドSNS運用
              </h3>
              {/* SEO重要な説明 */}
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                影響力構築と即時集客を両立させる革新的なアプローチで、
                あなたのビジネスを次のレベルへ導きます
              </p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
} 
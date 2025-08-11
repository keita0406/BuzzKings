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
    <section id="strengths" className="py-24 bg-gradient-to-br from-gray-50 to-white">
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
              <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                弊社だけの強み
              </span>
            </h2>
          </MotionDiv>
        </div>

        {/* Main Content Container */}
        <div className="relative">
          {/* Strengths Cards - Modern Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-8">
            {/* Left Card - Pink/Purple Gradient */}
            <MotionDiv
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  フォロワーを増やして<br />
                  集客を狙う影響力を使った
                </h3>
                <div className="text-3xl font-bold mb-4 text-pink-200">
                  SNS運用
                </div>
                
                {/* Description */}
                <p className="text-white/90 text-lg leading-relaxed">
                  アカウントブランディングによるオーガニック成長
                </p>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-300/30 rounded-full blur-lg"></div>
              </div>
            </MotionDiv>

            {/* Right Card - Blue Gradient */}
            <MotionDiv
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  フォロワーは増やさずに<br />
                  広告を使う影響力の要らない
                </h3>
                <div className="text-3xl font-bold mb-4 text-blue-200">
                  SNS運用
                </div>
                
                {/* Description */}
                <p className="text-white/90 text-lg leading-relaxed">
                  即効性のある広告運用による直接的な集客
                </p>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-300/30 rounded-full blur-lg"></div>
              </div>
            </MotionDiv>
          </div>

          {/* Plus Symbol - Centered and Smaller */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block z-10">
            <MotionDiv
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
                <div className="text-xl font-bold text-white">+</div>
              </div>
            </MotionDiv>
          </div>

          {/* Hybrid SNS Section - Compact Design */}
          <div className="text-center mt-12">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-4xl md:text-6xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                      ハイブリッドSNS運用
                    </span>
                  </h3>
                  
                  {/* Decorative Line */}
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4 opacity-60"></div>
                  
                  {/* Description Text */}
                  <p className="text-base md:text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
                    影響力構築と即時集客を両立させる革新的なアプローチで、<br className="hidden md:block" />
                    あなたのビジネスを次のレベルへ導きます
                  </p>
                </div>
              </div>
            </MotionDiv>
          </div>


        </div>
      </div>
    </section>
  )
} 
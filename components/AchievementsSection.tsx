'use client'

import { motion } from 'framer-motion'
import TextType from './TextType'



const successStories = [
  {
    client: 'ブランドオフプライスイベント',
    result: 'フォロワー数3万人超',
    period: '',
    description: 'インフルエンサーマーケティングと最強広告運用の組み合わせで爆発的成長を実現',
    metrics: ['2024年度売上: 3億円超', '広告費:200万以下', '総動員数2万人以上'],
    instagramUrl: 'https://www.instagram.com/import_buyersalon/',
    imageUrl: '/images/brand-off-event.jpg'
  },
  {
    client: '焼肉虎喜西宮本店',
    result: 'OPEN2ヶ月で黒字化',
    period: '',
    description: '地域性に基づく戦略的な広告運用で集客力を大幅に向上',
    metrics: ['毎月新規: 500組以上', 'SNS経由売上: 90%以上', '他県来店:50%以上'],
    instagramUrl: 'https://www.instagram.com/yakiniku.toraki/',
    imageUrl: '/images/yakiniku-toraki.jpg'
  },
  {
    client: 'Eyelash Salon CHARME',
    result: 'OPEN1ヶ月目で黒字化',
    period: '',
    description: 'ローカル地域性ターゲット分析に広告運用とインフルエンサーマーケティングによりOPEN初月から満席を実現',
    metrics: ['新規顧客: 毎月30%以上', 'SNS経由売上: 90%以上', '来店数: 毎月200名以上'],
    instagramUrl: 'https://www.instagram.com/charme.eyelash/',
    imageUrl: '/images/eyelash-charme.jpg'
  }
]

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">実績</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            弊社SNS集客実績のご紹介（自社のみ）
          </p>
        </motion.div>



        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >

          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.client}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                {/* メインコンテンツ部分 */}
                <div className="flex-grow">
                  {/* 画像表示 */}
                  {story.imageUrl && (
                    <div className="mb-6">
                      <img
                        src={story.imageUrl}
                        alt={story.client}
                        className="w-full h-48 object-cover rounded-xl shadow-md"
                      />
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {story.client}
                    </h4>
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {story.result}
                    </div>
                    {story.period && (
                      <div className="text-sm text-gray-500">
                        {story.period}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {story.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {story.metrics.map((metric, metricIndex) => (
                      <motion.div
                        key={metric}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (index * 0.2) + (metricIndex * 0.1) }}
                        viewport={{ once: true }}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <div className="w-2 h-2 bg-insta-gradient rounded-full mr-3 flex-shrink-0"></div>
                        {metric}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* ボタン部分 - 下部に固定 */}
                {story.instagramUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index * 0.2) + 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-auto"
                  >
                    <motion.a
                      href={story.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagramを見る
                    </motion.a>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 新しいテキストセクション */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight scale-110">
            <TextType 
              text={["弊社のバズる広告戦略で", "広告費の30倍以上の売上を実現"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-center bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent"
              loop={true}
              startOnVisible={true}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
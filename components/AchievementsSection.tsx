'use client'

import { motion } from 'framer-motion'
import { 
  EyeIcon, 
  HeartIcon, 
  ShareIcon, 
  UserGroupIcon,
  ArrowTrendingUpIcon,
  StarIcon 
} from '@heroicons/react/24/outline'

const achievements = [
  {
    icon: EyeIcon,
    number: '1,250万',
    label: '総リーチ数',
    description: '累計リーチ数'
  },
  {
    icon: HeartIcon,
    number: '485万',
    label: 'エンゲージメント',
    description: '月間平均'
  },
  {
    icon: ShareIcon,
    number: '98%',
    label: '拡散率',
    description: 'バイラル成功率'
  },
  {
    icon: UserGroupIcon,
    number: '2,350',
    label: 'クライアント数',
    description: '継続利用率95%'
  },
  {
    icon: ArrowTrendingUpIcon,
    number: '850%',
    label: 'フォロワー増加',
    description: '平均成長率'
  },
  {
    icon: StarIcon,
    number: '4.9',
    label: '満足度',
    description: '5点満点中'
  }
]

const successStories = [
  {
    client: 'コスメブランドA社',
    result: 'フォロワー数300%増加',
    period: '3ヶ月で達成',
    description: 'AI生成コンテンツとインフルエンサーマーケティングの組み合わせで爆発的成長を実現',
    metrics: ['リーチ数: 500万→1,500万', 'エンゲージメント率: 2.1%→8.7%', 'コンバージョン率: 300%向上']
  },
  {
    client: 'フィットネスジムB社',
    result: '売上400%向上',
    period: '6ヶ月で達成',
    description: 'データ分析に基づく戦略的なコンテンツ配信で集客力を大幅に向上',
    metrics: ['新規会員: 月50名→200名', 'SNS経由売上: 20%→65%', 'ブランド認知度: 3倍向上']
  },
  {
    client: 'レストランチェーンC社',
    result: 'バイラル動画1億再生',
    period: '1週間で達成',
    description: 'AIトレンド分析による最適なタイミングでの投稿でメガバイラルを実現',
    metrics: ['動画再生数: 1億回突破', 'メディア掲載: 100件以上', '来店数: 週末2倍増']
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
            数々のクライアントとともに築き上げた成功の軌跡
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-insta-gradient rounded-xl flex items-center justify-center mx-auto mb-4"
              >
                <achievement.icon className="h-6 w-6 text-white" />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: (index * 0.1) + 0.3 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold gradient-text mb-2"
              >
                {achievement.number}
              </motion.div>
              
              <div className="text-sm font-semibold text-gray-700 mb-1">
                {achievement.label}
              </div>
              
              <div className="text-xs text-gray-500">
                {achievement.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-center mb-12">成功事例</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.client}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {story.client}
                  </h4>
                  <div className="text-2xl font-bold gradient-text mb-1">
                    {story.result}
                  </div>
                  <div className="text-sm text-gray-500">
                    {story.period}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {story.description}
                </p>
                
                <div className="space-y-2">
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
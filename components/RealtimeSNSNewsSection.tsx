'use client'

import { motion } from 'framer-motion'
import { ClockIcon, FireIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

const snsNews = [
  {
    platform: 'Instagram',
    icon: '📸',
    color: 'from-purple-500 to-pink-500',
    news: [
      {
        title: 'リール動画のエンゲージメント率が前月比150%増加',
        time: '2分前',
        engagement: '1.2M',
        trending: true
      },
      {
        title: '音楽連動コンテンツが急上昇中',
        time: '5分前',
        engagement: '890K',
        trending: false
      }
    ]
  },
  {
    platform: 'TikTok',
    icon: '🎵',
    color: 'from-red-500 to-blue-500',
    news: [
      {
        title: '#チャレンジ動画 が世界トレンド1位',
        time: '1分前',
        engagement: '2.8M',
        trending: true
      },
      {
        title: '15秒動画の完視聴率が85%達成',
        time: '3分前',
        engagement: '1.5M',
        trending: true
      }
    ]
  },
  {
    platform: 'YouTube',
    icon: '📺',
    color: 'from-red-600 to-red-400',
    news: [
      {
        title: 'ショート動画の収益化が拡大',
        time: '4分前',
        engagement: '3.2M',
        trending: true
      },
      {
        title: 'AI生成サムネイルのクリック率向上',
        time: '7分前',
        engagement: '950K',
        trending: false
      }
    ]
  },
  {
    platform: 'Twitter(X)',
    icon: '🐦',
    color: 'from-blue-500 to-blue-300',
    news: [
      {
        title: 'ライブツイートのリーチが200%増',
        time: '30秒前',
        engagement: '680K',
        trending: true
      },
      {
        title: 'スレッド投稿の効果的活用法が話題',
        time: '6分前',
        engagement: '420K',
        trending: false
      }
    ]
  }
]

const trendingHashtags = [
  '#バズマーケティング',
  '#SNS戦略',
  '#リール攻略',
  '#インフルエンサー',
  '#動画編集',
  '#AI活用'
]

export default function RealtimeSNSNewsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
              リアルタイムSNSニュース
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">
            最新のSNSトレンドと市場動向をリアルタイムでお届け
          </p>
        </motion.div>

        {/* トレンドハッシュタグ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-black mb-6 flex items-center">
            <FireIcon className="h-7 w-7 text-orange-500 mr-3" />
            トレンドハッシュタグ
          </h3>
          <div className="flex flex-wrap gap-3">
            {trendingHashtags.map((hashtag, index) => (
              <motion.span
                key={hashtag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300 rounded-full px-4 py-2 text-gray-800 hover:bg-gradient-to-r hover:from-purple-200 hover:to-blue-200 transition-all duration-300 cursor-pointer"
              >
                {hashtag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* SNSニュースグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {snsNews.map((platform, platformIndex) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: platformIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl p-6 border border-gray-200 hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center text-2xl mr-4`}>
                  {platform.icon}
                </div>
                <h3 className="text-2xl font-bold text-black">{platform.platform}</h3>
              </div>

              <div className="space-y-4">
                {platform.news.map((news, newsIndex) => (
                  <motion.div
                    key={newsIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (platformIndex * 0.1) + (newsIndex * 0.1) }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-4 hover:bg-gray-100 transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-black font-semibold flex-1 mr-2">
                        {news.title}
                      </h4>
                      {news.trending && (
                        <ArrowTrendingUpIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {news.time}
                      </div>
                      <div className="text-purple-400 font-semibold">
                        {news.engagement} エンゲージメント
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ライブインジケーター */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-black font-semibold">リアルタイム更新中</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
'use client'

import { motion } from 'framer-motion'
import { 
  BoltIcon, 
  ChartBarIcon, 
  CpuChipIcon, 
  MegaphoneIcon,
  PresentationChartLineIcon,
  SparklesIcon,
  FilmIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

const services = [
  {
    icon: ChartBarIcon,
    title: 'SNS 分析・最適化',
    description: 'データドリブンなアプローチで、あなたのSNSパフォーマンスを徹底分析。最適な投稿タイミングと戦略を提案します。',
    features: ['リアルタイム分析', 'トレンド予測', 'エンゲージメント最適化']
  },
  {
    icon: DocumentTextIcon,
    title: 'コンテンツ戦略設計',
    description: 'ブランドの世界観を強化しつつ、アルゴリズムに愛される投稿フォーマットとストーリーテリングを構築します。',
    features: ['ビジュアルテンプレート開発', 'コピーライティング最適化', 'UGC活用プラン']
  },
  {
    icon: MegaphoneIcon,
    title: 'フォロワー急増キャンペーン',
    description: '短期的なフォロワーブーストと長期コミュニティ化を両立させるキャンペーンを企画・運用します。',
    features: ['バイラル企画立案', 'ハッシュタグ＆リール戦略', '成果レポート＆改善']
  },
  {
    icon: UserGroupIcon,
    title: 'インフルエンサー連携・PR',
    description: 'ブランドと相性の良いインフルエンサーをマッチングし、ROIの高いコラボレーションを実現します。',
    features: ['キャスティング＆交渉', 'コラボコンテンツ制作', 'ROIトラッキング']
  },
  {
    icon: BoltIcon,
    title: 'SNS広告運用最適化',
    description: 'AIとデータ分析で広告クリエイティブとターゲティングを高速PDCA。広告費を無駄なく成果最大化します。',
    features: ['ターゲット精査', 'クリエイティブABテスト', 'コンバージョン最適化']
  },
  {
    icon: FilmIcon,
    title: 'バズる動画編集・広告動画編集',
    description: '編集が下手だと全てが台無し！？',
    features: ['バズる動画編集テクニック', '広告動画作成伝授', 'AIを使った時短動画編集']
  }
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">サービス</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SNSの力で、あなたのビジネスを加速させます
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-insta-gradient rounded-2xl flex items-center justify-center mb-6"
                >
                  <service.icon className="h-8 w-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <div className="w-2 h-2 bg-insta-gradient rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { 
  BoltIcon, 
  ChartBarIcon, 
  CpuChipIcon, 
  MegaphoneIcon,
  PresentationChartLineIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline'

const services = [
  {
    icon: SparklesIcon,
    title: 'AI コンテンツ生成',
    description: '最新のAI技術を活用して、バズりやすいコンテンツを自動生成。あなたのブランドに最適化されたコンテンツを効率的に作成します。',
    features: ['自動テキスト生成', '画像生成AI', 'ハッシュタグ最適化']
  },
  {
    icon: ChartBarIcon,
    title: 'SNS 分析・最適化',
    description: 'データドリブンなアプローチで、あなたのSNSパフォーマンスを徹底分析。最適な投稿タイミングと戦略を提案します。',
    features: ['リアルタイム分析', 'トレンド予測', 'エンゲージメント最適化']
  },
  {
    icon: MegaphoneIcon,
    title: 'バイラルマーケティング',
    description: 'バズを生み出すためのマーケティング戦略を立案・実行。インフルエンサーとのコラボレーションも含めた総合的なアプローチ。',
    features: ['バイラル戦略立案', 'インフルエンサー連携', 'クロスプラットフォーム展開']
  },
  {
    icon: CpuChipIcon,
    title: 'AI チャットボット',
    description: '24/7対応のAIチャットボットで、フォロワーとのエンゲージメントを向上。パーソナライズされた自動応答システム。',
    features: ['自動応答', 'パーソナライゼーション', 'マルチプラットフォーム対応']
  },
  {
    icon: PresentationChartLineIcon,
    title: '戦略コンサルティング',
    description: 'SNS × AIの専門家による個別コンサルティング。あなたのビジネス目標に合わせたカスタム戦略を提供します。',
    features: ['個別戦略立案', '定期レビュー', '成果測定']
  },
  {
    icon: BoltIcon,
    title: '高速実装サポート',
    description: '戦略から実装まで、スピーディーな展開をサポート。最短でバズを生み出すための緊急対応体制も完備。',
    features: ['緊急対応', 'スピード実装', '24時間サポート']
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
            SNS × AIの力で、あなたのブランドを次のレベルへ
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-insta-gradient text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            詳細を相談する
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
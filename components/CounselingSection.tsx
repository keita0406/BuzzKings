'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon, UserGroupIcon, DocumentChartBarIcon, PresentationChartLineIcon, GiftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { ScrollToContactButton } from './ClientMotionWrapper'

const features = [
  {
    icon: UserGroupIcon,
    title: '1対1オンライン相談',
    description: 'あなたの課題に特化した個別コンサルティング'
  },
  {
    icon: DocumentChartBarIcon,
    title: '専門家による分析',
    description: 'SNSマーケティングのプロフェッショナルが詳細分析'
  },
  {
    icon: PresentationChartLineIcon,
    title: '戦略プラン提案',
    description: 'あなただけのカスタム戦略を立案'
  },
  {
    icon: GiftIcon,
    title: '特典資料プレゼント',
    description: 'バズ攻略ガイド（非売品）を無料提供'
  }
]

const steps = [
  {
    step: '01',
    title: 'お申し込み',
    description: 'フォームから簡単予約。24時間以内にご連絡いたします。'
  },
  {
    step: '02',
    title: '事前ヒアリング',
    description: '現状の課題や目標を詳しくお聞かせください。'
  },
  {
    step: '03',
    title: 'オンライン相談',
    description: '60分間の濃密なコンサルティングセッション。'
  },
  {
    step: '04',
    title: '戦略プラン提示',
    description: 'あなた専用の具体的なアクションプランをご提案。'
  }
]

export default function CounselingSection() {
  return (
    <section id="counseling" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              無料カウンセリング
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            あなたのビジネスに最適なSNSマーケティング戦略を、
            <br className="hidden md:block" />
            まずは無料で体験してみませんか？
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Steps Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            カウンセリングの流れ
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {step.step}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRightIcon className="h-8 w-8 text-blue-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-300/20 rounded-full translate-x-20 translate-y-20"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                今すぐ無料カウンセリングを予約
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                通常￥30,000相当のコンサルティングを完全無料で提供中。
                <br className="hidden md:block" />
                強引な営業は一切ありません。
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <div className="flex items-center text-white">
                  <CheckCircleIcon className="h-6 w-6 mr-2" />
                  <span>60分間の個別相談</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircleIcon className="h-6 w-6 mr-2" />
                  <span>特典資料プレゼント</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircleIcon className="h-6 w-6 mr-2" />
                  <span>営業なし保証</span>
                </div>
              </div>
              
              <ScrollToContactButton
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                無料カウンセリングを予約する
              </ScrollToContactButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
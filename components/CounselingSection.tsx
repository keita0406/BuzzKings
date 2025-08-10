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
    <section id="counseling" className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            無料カウンセリング
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            あなたのビジネスに最適なSNSマーケティング戦略を、
            <br className="hidden md:block" />
            まずは無料で体験してみませんか？
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            カウンセリングの流れ
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-full">
                  <div className="text-4xl font-bold text-purple-400 mb-4">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRightIcon className="h-8 w-8 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              60分間完全無料
            </h3>
            
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              通常￥30,000相当のコンサルティングを、
              <br className="hidden md:block" />
              期間限定で無料提供中です
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ScrollToContactButton
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                今すぐ無料相談を予約
              </ScrollToContactButton>
              
              <div className="flex items-center text-white/70 text-sm">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                <span>強引な営業は一切ありません</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
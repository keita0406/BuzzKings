'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircleIcon, 
  CalendarDaysIcon, 
  VideoCameraIcon, 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  GiftIcon 
} from '@heroicons/react/24/outline'

const counselingFeatures = [
  {
    icon: VideoCameraIcon,
    title: '1対1オンライン相談',
    description: 'あなたの課題に特化した個別コンサルティング',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: '専門家による分析',
    description: 'SNS×AIのプロフェッショナルが詳細分析',
  },
  {
    icon: CalendarDaysIcon,
    title: '戦略プラン提案',
    description: 'あなただけのカスタム戦略を立案',
  },
  {
    icon: GiftIcon,
    title: '特典資料プレゼント',
    description: 'バズ攻略ガイド（非売品）を無料提供',
  }
]

const counselingFlow = [
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
    <section className="py-24 bg-insta-gradient">
      <div className="max-w-7xl mx-auto px-6">
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
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            あなたのビジネスに最適なSNS×AI戦略を、
            <br className="hidden md:block" />
            まずは無料で体験してみませんか？
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {counselingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <feature.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Flow Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-white/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            カウンセリングの流れ
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {counselingFlow.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Step number */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <span className="text-2xl font-bold gradient-text">
                    {item.step}
                  </span>
                </motion.div>
                
                {/* Connector line */}
                {index < counselingFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-white/30 transform -translate-y-1/2 z-0"></div>
                )}
                
                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-white/70 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <div className="flex items-center justify-center mb-6">
              <ClockIcon className="h-8 w-8 text-white mr-3" />
              <span className="text-2xl font-bold text-white">60分間完全無料</span>
            </div>
            
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              通常￥30,000相当のコンサルティングを、
              <br className="hidden md:block" />
              期間限定で無料提供中です
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                今すぐ無料相談を予約
              </motion.button>
              
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
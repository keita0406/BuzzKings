'use client'

import { motion } from 'framer-motion'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'BuzzKingsのサービスを利用するのに、SNSの知識は必要ですか？',
    answer: 'いいえ、SNSの専門知識は必要ありません。私たちが初心者の方にも分かりやすく、ステップバイステップでサポートいたします。AIツールの使い方から戦略立案まで、すべてお任せください。'
  },
  {
    question: '結果が出るまでにどのくらい時間がかかりますか？',
    answer: '多くのクライアント様が1-3ヶ月以内に明確な成果を実感されています。ただし、業界や現在の状況により個人差があります。無料カウンセリングで具体的な目標設定と予想される成果時期をお伝えします。'
  },
  {
    question: 'どのSNSプラットフォームに対応していますか？',
    answer: 'Instagram、TikTok、Twitter（X）、YouTube、Facebook、LinkedInなど、主要なSNSプラットフォーム全てに対応しています。お客様のビジネスに最適なプラットフォームをご提案いたします。'
  },
  {
    question: 'AI生成コンテンツの著作権はどうなりますか？',
    answer: 'AI生成されたコンテンツの著作権は100%お客様に帰属します。生成されたコンテンツは自由にご利用いただけ、商用利用も問題ありません。安心してご活用ください。'
  },
  {
    question: '料金体系について教えてください',
    answer: 'お客様のニーズに合わせた柔軟な料金プランをご用意しています。月額制のサブスクリプションプランから、単発のプロジェクトベースまで対応可能です。詳細は無料カウンセリングでご相談ください。'
  },
  {
    question: 'サポート体制はどうなっていますか？',
    answer: '専任のコンサルタントが付き、24時間体制でサポートいたします。緊急時の対応、定期的な戦略見直し、成果測定など、包括的なサポートを提供します。'
  },
  {
    question: '他社との違いは何ですか？',
    answer: '最大の違いは「SNS×AI」の融合による最先端のアプローチです。単なるSNS運用代行ではなく、AI技術を活用した戦略的なバズ創出を行います。また、実績に裏打ちされた確実な成果をお約束します。'
  },
  {
    question: 'クライアントの業界に制限はありますか？',
    answer: 'B2C、B2Bを問わず、あらゆる業界に対応しています。小売、飲食、美容、フィットネス、教育、IT、医療など、2,350社以上の実績があります。どのような業界でもお気軽にご相談ください。'
  }
]

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">よくある質問</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BuzzKingsについて、よくお寄せいただくご質問にお答えします
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Disclosure>
                {({ open }) => (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Disclosure.Button className="flex w-full justify-between items-center px-6 py-6 text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDownIcon className="h-6 w-6 text-gray-500 flex-shrink-0" />
                      </motion.div>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 pb-6">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
                      >
                        {faq.answer}
                      </motion.div>
                    </Disclosure.Panel>
                  </motion.div>
                )}
              </Disclosure>
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
          <p className="text-gray-600 mb-6">
            その他のご質問がございましたら、お気軽にお問い合わせください
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-insta-gradient text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            お問い合わせ
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
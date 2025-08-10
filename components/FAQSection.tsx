'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { MotionDiv, ScrollToContactButton } from './ClientMotionWrapper'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header - SSR */}
        <div className="text-center mb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">よくある質問</span>
            </h2>
            <p className="text-xl text-gray-600">
              BUZZLABについて、よくお寄せいただくご質問にお答えします
            </p>
          </MotionDiv>
        </div>

        {/* FAQs - SSR Content with Client Animations */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Disclosure>
                {({ open }) => (
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <Disclosure.Button className="flex justify-between items-center w-full px-6 py-5 text-left text-lg font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 transition-colors duration-200">
                      {/* Question - SEO重要 */}
                      <span>{faq.question}</span>
                      <ChevronDownIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } w-5 h-5 text-purple-500 transition-transform duration-200`}
                      />
                    </Disclosure.Button>
                    {/* Answer - SEO重要 */}
                    <Disclosure.Panel className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </MotionDiv>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="text-center mt-16">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                その他のご質問がございましたら、お気軽にお問い合わせください
              </h3>
              <ScrollToContactButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                お問い合わせ
              </ScrollToContactButton>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
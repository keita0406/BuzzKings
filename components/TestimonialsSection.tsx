'use client'

import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'
import { StarIcon } from '@heroicons/react/24/solid'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const testimonials = [
  {
    name: '田中 美咲',
    role: 'ファッションブランド CEO',
    company: 'STYLE TOKYO',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
    content: 'BUZZLABのおかげで、たった3ヶ月でインスタグラムのフォロワーが10万人を突破しました。AI生成コンテンツの質の高さには本当に驚いています。売上も前年比300%アップを達成できました。',
    results: ['フォロワー数: 1万→10万', '売上: 300%向上', 'エンゲージメント率: 8.5%']
  },
  {
    name: '佐藤 健太',
    role: 'フィットネストレーナー',
    company: 'BODY MAKE GYM',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
    content: 'データ分析に基づいた戦略提案が素晴らしく、どの投稿がバズるかが手に取るようにわかるようになりました。新規会員獲得が月200名を超え、ジムの拡張を検討するまでになりました。',
    results: ['新規会員: 月50名→200名', 'リーチ数: 500%増加', 'コンバージョン率: 4.2%']
  },
  {
    name: '山田 あやか',
    role: 'レストランオーナー',
    company: 'FUSION DINING',
    image: 'https://images.pexels.com/photos/3799830/pexels-photo-3799830.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
    content: '1つの動画が1億回再生を記録し、テレビや雑誌からも取材依頼が殺到しました。週末の来店数が2倍になり、予約が取れないほどの人気店になりました。BUZZLABは本当に魔法のようです。',
    results: ['動画再生: 1億回突破', '来店数: 2倍増加', 'メディア掲載: 100件以上']
  },
  {
    name: '鈴木 大輔',
    role: 'ECサイト運営',
    company: 'TECH GADGETS',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
    content: 'AIチャットボットの導入で顧客対応が24時間可能になり、コンバージョン率が劇的に改善しました。SNS経由の売上が全体の70%を占めるまでになり、売上も月1000万円を突破しました。',
    results: ['売上: 月1000万円突破', 'コンバージョン率: 5.8%', 'SNS経由売上: 70%']
  },
  {
    name: '高橋 さくら',
    role: 'コスメブランド創設者',
    company: 'NATURAL BEAUTY',
    image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
    content: 'インフルエンサーマーケティングの効果が想像以上でした。ブランド認知度が大幅に向上し、大手百貨店からも出店依頼をいただくようになりました。今では売上が安定して月500万円を超えています。',
    results: ['ブランド認知度: 10倍向上', '百貨店出店決定', '売上: 月500万円安定']
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">受講生の声</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            実際にBUZZLABを利用したクライアントの成功体験
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            effect={'coverflow'}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 2.5,
              },
            }}
            className="testimonials-swiper pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-6 w-6 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Results */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">主な成果:</h4>
                    <div className="space-y-2">
                      {testimonial.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-insta-gradient rounded-full mr-3 flex-shrink-0"></div>
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonial.role}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

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
            あなたも成功の仲間入り
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
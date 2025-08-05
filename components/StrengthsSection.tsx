'use client'

import { motion } from 'framer-motion'
import { UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Orb from './Orb'

export default function StrengthsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* 3D背景エフェクト */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={260}
          forceHoverState={false}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">弊社だけの強み</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* 左側 - フォロワーを増やす運用 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 w-full lg:w-96"
          >
            <div className="text-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <UserGroupIcon className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black mb-6 leading-relaxed">
                フォロワーを増やして
                <br />
                集客を狙う影響力を使った
                <br />
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  SNS運用
                </span>
              </h3>
            </div>
          </motion.div>

          {/* 中央の + マーク */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center items-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              +
            </div>
          </motion.div>

          {/* 右側 - フォロワーを増やさない運用 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 w-full lg:w-96"
          >
            <div className="text-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <MapPinIcon className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black mb-6 leading-relaxed">
                フォロワーは増やさずに
                <br />
                広告を使う影響力の要らない
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  SNS運用
                </span>
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
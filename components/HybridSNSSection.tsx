'use client'

import { motion } from 'framer-motion'

export default function HybridSNSSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* デザイン性のある枠 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            {/* 外側のグローエフェクト */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            
            {/* メインの枠 */}
            <div className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-1 rounded-3xl">
              <div className="bg-white rounded-3xl px-12 py-8 shadow-2xl">
                {/* 角の装飾 */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-purple-500 rounded-tl-lg"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-blue-500 rounded-tr-lg"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-blue-500 rounded-bl-lg"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-pink-500 rounded-br-lg"></div>
                
                {/* 中央の装飾線 */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full"></div>
                
                {/* タイトル */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                    ハイブリッドSNS運用
                  </span>
                </h2>
                
                {/* 下部の装飾ライン */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mt-6 mx-auto max-w-md rounded-full"
                ></motion.div>
              </div>
            </div>
            
            {/* 浮遊する装飾要素 */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-60"
            ></motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full opacity-50"
            ></motion.div>
            
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 8, -8, 0]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute -bottom-3 -left-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-40"
            ></motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 12, 0],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ 
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-4 -right-3 w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-35"
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 
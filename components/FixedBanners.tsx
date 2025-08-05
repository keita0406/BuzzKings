'use client'

import { motion } from 'framer-motion'

export default function FixedBanners() {
  const handleLineClick = () => {
    // LINEへのリンク（実際のLINE URLに変更してください）
    window.open('https://line.me/R/ti/p/@your-line-id', '_blank')
  }

  const handleContactClick = () => {
    // お問い合わせセクションへスクロール
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* LINE無料カウンセリングバナー */}
      <motion.button
        initial={{ opacity: 0, x: 120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLineClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-3 py-2 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center min-w-[90px]"
      >
        {/* LINEロゴ（シンプル版） */}
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mb-1">
          <div className="bg-green-500 rounded-lg px-1 py-0.5">
            <span className="text-white font-bold text-xs">LINE</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs font-bold mb-0.5">無料</div>
          <div className="text-xs">カウンセリング</div>
        </div>
      </motion.button>

      {/* お問い合わせバナー */}
      <motion.button
        initial={{ opacity: 0, x: 120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContactClick}
        className="bg-gray-800 hover:bg-gray-900 text-white rounded-lg px-3 py-2 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center min-w-[90px]"
      >
        {/* メールアイコン */}
        <div className="bg-white rounded-lg w-8 h-8 flex items-center justify-center mb-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-800"
          >
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="22,6 12,13 2,6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-center">
          <div className="text-xs font-medium">お問い合わせ</div>
        </div>
      </motion.button>
    </div>
  )
} 
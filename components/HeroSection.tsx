'use client'

import { motion } from 'framer-motion'
import { ChevronDownIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import ProfileCard from './ProfileCard'
import BlurText from './BlurText'
import Hyperspeed from './Hyperspeed'
import GradientText from './GradientText'
import GlitchText from './GlitchText'

export default function HeroSection() {
  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Black Background */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 z-1">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x0a0515,
              islandColor: 0x130820,
              background: 0x000000,
              shoulderLines: 0x9932CC,       // より鮮やかなパープル
              brokenLines: 0x1E90FF,         // より鮮やかなブルー
              leftCars: [0xA020F0, 0x4169E1, 0xFF1493, 0x8A2BE2],
              rightCars: [0xFF1493, 0xDA70D6, 0x00BFFF, 0x9370DB],
              sticks: 0xFF69B4,              // より鮮やかなピンク
            }
          }}
        />
      </div>


      
      {/* ロゴ - 右上 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-24 sm:top-28 lg:top-32 right-8 z-20"
      >
        <img
          src="/images/buzzlabo-logo.png"
          alt="BuzzLabo Logo"
          className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
        />
      </motion.div>
      
      {/* ネオンロゴのデジタルアート - ロゴの下 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-44 sm:top-52 lg:top-60 right-8 z-20"
      >
        <img
          src="/images/neon-logo-art.png"
          alt="Neon Logo Digital Art"
          className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen pt-24 sm:pt-32 pb-20">
          {/* Left side - Text content */}
          <div className="text-left">
            {/* SNSで - GlitchTextアニメーション */}
            <div className="mb-2 sm:mb-3 flex items-baseline justify-start">
              <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={false}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mr-36 sm:mr-12 lg:mr-24 scale-[1.3] md:scale-100 origin-left"
              >
                SNS
              </GlitchText>
              <BlurText
                text="で"
                delay={300}
                animateBy="letters"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight scale-[1.3] md:scale-100 origin-left ml-10 sm:ml-0 lg:ml-4"
              />
            </div>
            
            {/* 集客しませんか？ - BlurTextアニメーション */}
            <div className="mb-6 sm:mb-8">
              <BlurText
                text="集客しませんか？"
                delay={100}
                animateBy="letters"
                direction="top"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
              />
            </div>
            
            {/* サブタイトル */}
        <motion.div
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="mb-6 sm:mb-8 lg:mb-10"
            >
              <div className="text-xl sm:text-2xl md:text-3xl leading-relaxed font-serif text-left">
                <GradientText
                  colors={["#8A2BE2", "#0066FF", "#FF1493", "#8A2BE2", "#0066FF"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="block mb-2 text-left"
                >
                  自身のフォロワーも10万人以上
                </GradientText>
                <GradientText
                  colors={["#FF1493", "#8A2BE2", "#0066FF", "#FF1493", "#8A2BE2"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="block text-left"
                >
                  自身の店舗も集客してきた実績多数
                </GradientText>
              </div>
            </motion.div>
            
            {/* Badges Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.8 }}
              className="mb-6 sm:mb-8 lg:mb-10 flex gap-8 items-start"
            >
              {/* 200K+ Badge */}
              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <img
                    src="/images/200k-badge.png"
                    alt="200K+ Badge"
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
                  />
                </div>
                <p className="text-[7px] sm:text-[8px] text-white/70 font-medium text-center">
                  個人フォロワー20万人以上
                </p>
              </div>

              {/* 50K+ Badge */}
              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <img
                    src="/images/50k-badge.png"
                    alt="50K+ Badge"
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
                  />
                </div>
                <p className="text-[7px] sm:text-[8px] text-white/70 font-medium text-center">
                  イベントフォロワー5万人以上
                </p>
              </div>

              {/* 10K+ Badge */}
              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <img
                    src="/images/10k-badge.png"
                    alt="10K+ Badge"
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
                  />
                </div>
                <p className="text-[7px] sm:text-[8px] text-white/70 font-medium text-center">
                  自社店舗1万人以上
                </p>
              </div>

              {/* 100K+ Badge */}
              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <img
                    src="/images/100k-badge.png"
                    alt="100K+ Badge"
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
                  />
                </div>
                <p className="text-[7px] sm:text-[8px] text-white/70 font-medium text-center">
                  SNS総動員数10万人以上
                </p>
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 3.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#achievements')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-insta-gradient text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 text-center"
            >
                実績
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-insta-gradient text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 text-center"
              >
                相談
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // チャットボット機能を開く
                  console.log('AIチャット相談を開始');
                  // ここに実際のチャットボット開始ロジックを追加
                }}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 text-center flex items-center gap-2 justify-center"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                AIチャット相談
            </motion.button>
            </motion.div>
          </div>
          
          {/* Right side - ProfileCard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:flex justify-center items-center"
          >
            <ProfileCard
              name=""
              title=""
              handle="keita.0406"
              status="Instagram"
              contactText="Contact Me"
              avatarUrl="/images/keita-avatar-new.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.open('https://www.instagram.com/keita.0406/', '_blank')}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={scrollToServices}
          className="text-white/70 hover:text-white transition-colors duration-300"
        >
          <ChevronDownIcon className="h-8 w-8" />
        </motion.button>
      </motion.div>
    </section>
  )
}
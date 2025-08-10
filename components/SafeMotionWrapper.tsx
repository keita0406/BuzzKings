'use client'

import { ReactNode, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// framer-motionを動的にインポート
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
)

const MotionButton = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.button),
  { ssr: false }
)

const MotionLink = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.a),
  { ssr: false }
)

interface SafeMotionProps {
  children: ReactNode
  className?: string
  initial?: any
  whileInView?: any
  animate?: any
  transition?: any
  viewport?: any
  whileHover?: any
  whileTap?: any
}

export function SafeMotionDiv({ children, className, initial, whileInView, animate, transition, viewport, whileHover, whileTap }: SafeMotionProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <MotionDiv
      className={className}
      initial={initial}
      whileInView={whileInView}
      animate={animate}
      transition={transition}
      viewport={viewport}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </MotionDiv>
  )
}

export function SafeScrollToContactButton({ children, className, whileHover, whileTap }: SafeMotionProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClick = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isClient) {
    return (
      <button className={className} onClick={handleClick}>
        {children}
      </button>
    )
  }

  return (
    <MotionButton
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      onClick={handleClick}
    >
      {children}
    </MotionButton>
  )
} 
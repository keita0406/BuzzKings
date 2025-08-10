'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MotionDivProps {
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

interface MotionButtonProps extends MotionDivProps {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

interface MotionLinkProps extends MotionDivProps {
  href?: string
  target?: string
  rel?: string
}

export function MotionDiv({ children, className, initial, whileInView, animate, transition, viewport, whileHover, whileTap }: MotionDivProps) {
  return (
    <motion.div
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
    </motion.div>
  )
}

export function MotionSection({ children, className, initial, whileInView, animate, transition, viewport }: MotionDivProps) {
  return (
    <motion.section
      className={className}
      initial={initial}
      whileInView={whileInView}
      animate={animate}
      transition={transition}
      viewport={viewport}
    >
      {children}
    </motion.section>
  )
}

export function MotionButton({ children, className, whileHover, whileTap, onClick, type = 'button' }: MotionButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <motion.button
      type={type}
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  )
}

export function MotionLink({ children, className, whileHover, whileTap, href, target, rel }: MotionLinkProps) {
  return (
    <motion.a
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </motion.a>
  )
}

// スクロール用のコンポーネント
export function ScrollToContactButton({ children, className, whileHover, whileTap }: MotionButtonProps) {
  const handleClick = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.button
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  )
} 
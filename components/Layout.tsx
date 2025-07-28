'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'ホーム', href: '#home' },
  { name: 'サービス', href: '#services' },
  { name: '実績', href: '#achievements' },
  { name: 'よくある質問', href: '#faq' },
]

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white backdrop-blur-md shadow-lg'
            : 'bg-white shadow-sm'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-gray-500/10 py-4">
            <div className="flex items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#home')
                }}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <img 
                  src="/images/buzzkings-logo.png" 
                  alt="BuzzKings Logo" 
                  className="h-10 w-10 object-contain"
                />
                <img 
                  src="/images/buzzkings-name.png" 
                  alt="BuzzKings Name" 
                  className="h-20 object-contain"
                />
              </motion.a>
            </div>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="text-base font-medium text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            <div className="ml-8 lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">メニューを開く</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white/95 backdrop-blur-md"
          >
            <div className="space-y-1 px-6 py-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main content */}
      <main>{children}</main>
    </div>
  )
}
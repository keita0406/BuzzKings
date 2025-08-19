'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import FixedBanners from './FixedBanners'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'ホーム', href: '#home' },
  { name: 'サービス', href: '#services' },
  { name: '実績', href: '#achievements' },
  { name: 'サステナブル', href: '/sustainable' },
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
          <div className="flex w-full items-center justify-between border-b border-gray-500/10 py-0">
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
                  src="/images/bb-logo.png"
                  alt="BUZZLAB BB Logo"
                  className="h-16 object-contain"
                />
                <img
                  src="/images/buzzlabo-text.png"
                  alt="BuzzLabo Text"
                  className="h-16 object-contain"
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
                    if (item.href.startsWith('#')) {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }
                  }}
                  className="text-base font-medium text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            
            <div className="lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
        
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-lg"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-500/10">
              <a href="#home" className="-m-1.5 p-1.5">
                <span className="sr-only">BUZZLAB</span>
                <img
                  className="h-8 w-auto"
                  src="/images/bb-logo.png"
                  alt="BUZZLAB Logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6 px-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith('#')) {
                          e.preventDefault()
                          scrollToSection(item.href)
                        } else {
                          setMobileMenuOpen(false)
                        }
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main content */}
      <main>{children}</main>

      {/* Fixed banners */}
      <FixedBanners />
    </div>
  )
}
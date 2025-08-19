'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface AIResponse {
  success: boolean
  data: {
    answer: string
    confidence: number
    sources: Array<{
      title: string
      type: string
    }>
    suggestedQuestions: string[]
  }
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function AIChatModal({ isOpen, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [showInitialMessage, setShowInitialMessage] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const initialMessage = "SNSの悩み事はありますか？"
  const quickButtons = [
    "SNSで集客する方法を教えて",
    "Instagramでフォロワーを増やしたい"
  ]

  // タイプライターエフェクト
  useEffect(() => {
    if (isOpen && showInitialMessage) {
      let index = 0
      setTypewriterText('')
      const timer = setInterval(() => {
        if (index < initialMessage.length) {
          setTypewriterText(prev => prev + initialMessage[index])
          index++
        } else {
          clearInterval(timer)
          setTimeout(() => setShowInitialMessage(false), 1000)
        }
      }, 80)

      return () => clearInterval(timer)
    }
  }, [isOpen, showInitialMessage])

  // メッセージスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // AIレスポンス取得
  const sendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'query',
          question: message,
          userType: 'prospect'
        })
      })

      const data: AIResponse = await response.json()
      
      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: data.data.answer,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        throw new Error('AIからの応答を取得できませんでした')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'すみません、一時的にエラーが発生しました。もう一度お試しください。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickButton = (text: string) => {
    sendMessage(text)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <SparklesIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">BuzzLab AI</h3>
                  <p className="text-sm text-white/80">SNSのプロがお答えします</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {/* Initial Typewriter Message */}
              {showInitialMessage && (
                <div className="mb-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm inline-block max-w-[80%]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <SparklesIcon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-500">BuzzLab AI</span>
                    </div>
                    <p className="text-gray-800">
                      {typewriterText}
                      <span className="animate-pulse">|</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Messages */}
              {!showInitialMessage && messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`rounded-lg p-3 max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-white shadow-sm'
                  }`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <SparklesIcon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs text-gray-500">BuzzLab AI</span>
                      </div>
                    )}
                    <p className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Loading */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <div className="bg-white rounded-lg p-3 shadow-sm inline-block">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <SparklesIcon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-500">BuzzLab AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-gray-500 text-sm">考えています...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Buttons */}
            {!showInitialMessage && messages.length === 0 && (
              <div className="p-4 bg-white border-t">
                <p className="text-sm text-gray-600 mb-3">よくある質問:</p>
                <div className="space-y-2">
                  {quickButtons.map((button, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleQuickButton(button)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors border border-gray-200"
                    >
                      {button}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            {!showInitialMessage && (
              <div className="p-4 bg-white border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="SNSについて質問してください..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
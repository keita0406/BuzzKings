'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  ClockIcon,
  CpuChipIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface RAGTestResult {
  success: boolean
  data?: {
    answer: string
    confidence: number
    sources: Array<{
      id: string
      title: string
      type: string
      relevanceScore: number
      clusterId?: string
    }>
    entityContext: Array<{
      id: string
      name: string
      type: string
      relevance: number
    }>
    processingTime: number
    relatedTopics: string[]
    suggestedQuestions: string[]
  }
  error?: string
}

export default function RAGTestPanel() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<RAGTestResult | null>(null)
  const [userType, setUserType] = useState<'prospect' | 'customer' | 'partner'>('prospect')

  const handleTest = async () => {
    if (!query.trim()) return
    
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch(`/api/rag?question=${encodeURIComponent(query)}&userType=${userType}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'テストに失敗しました'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sampleQuestions = [
    'BuzzLabのサービスについて教えて',
    'Instagramの運用サービスはありますか？',
    'TikTokでバズらせる方法は？',
    '料金プランを教えてください',
    '盛啓太さんの実績は？',
    'SNSマーケティングの効果は？'
  ]

  return (
    <div className="space-y-6">
      {/* Query Input */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">RAGクエリテスト</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              テスト質問を入力
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleTest()}
                placeholder="BuzzLabについて質問してください..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'prospect' | 'customer' | 'partner')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                <option value="prospect">見込み客</option>
                <option value="customer">顧客</option>
                <option value="partner">パートナー</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTest}
                disabled={isLoading || !query.trim()}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <MagnifyingGlassIcon className="h-5 w-5" />
                )}
                <span className="ml-2">{isLoading ? 'テスト中...' : 'テスト実行'}</span>
              </motion.button>
            </div>
          </div>

          {/* Sample Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              サンプル質問（クリックで入力）
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(sample)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  disabled={isLoading}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">テスト結果</h3>
              <div className="flex items-center space-x-2">
                {result.success ? (
                  <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                )}
                <span className={`text-sm font-medium ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                  {result.success ? '成功' : '失敗'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {result.success && result.data ? (
              <div className="space-y-6">
                {/* Processing Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">処理時間</p>
                      <p className="text-lg font-bold text-gray-900">{result.data.processingTime}ms</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CpuChipIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">信頼度</p>
                      <p className="text-lg font-bold text-gray-900">{(result.data.confidence * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">参照元</p>
                      <p className="text-lg font-bold text-gray-900">{result.data.sources.length}件</p>
                    </div>
                  </div>
                </div>

                {/* Answer */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-2">回答</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 whitespace-pre-wrap">{result.data.answer}</p>
                  </div>
                </div>

                {/* Sources */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-2">参照したソース</h4>
                  <div className="space-y-2">
                    {result.data.sources.map((source, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{source.title}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {source.type}
                            </span>
                            <span className="text-xs text-gray-500">
                              関連度: {(source.relevanceScore * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        {source.clusterId && (
                          <span className="text-xs text-gray-400">クラスター: {source.clusterId}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Entity Context */}
                {result.data.entityContext.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-2">抽出されたエンティティ</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.data.entityContext.map((entity, index) => (
                        <div key={index} className="flex items-center bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                          <span className="text-sm font-medium text-purple-900">{entity.name}</span>
                          <span className="ml-2 text-xs text-purple-600">({entity.type})</span>
                          <span className="ml-2 text-xs text-purple-500">
                            {(entity.relevance * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Topics */}
                {result.data.relatedTopics.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-2">関連トピック</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.data.relatedTopics.map((topic, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Questions */}
                {result.data.suggestedQuestions.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-2">推奨フォローアップ質問</h4>
                    <div className="space-y-2">
                      {result.data.suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(question)}
                          className="block w-full text-left px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg text-orange-800 hover:bg-orange-100 transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">テストに失敗しました</h3>
                <p className="text-gray-600">{result.error}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
} 
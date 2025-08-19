'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  ClockIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import type { BlogCategory } from '@/lib/supabase'

interface Props {
  categories: BlogCategory[]
  tags: Array<{ id: string; name: string; slug: string }>
  onArticleGenerated: () => void
}

interface GenerationStatus {
  step: 'idle' | 'research' | 'outline' | 'writing' | 'metadata' | 'complete' | 'error'
  message: string
  progress: number
}

interface GeneratedArticle {
  title: string
  slug: string
  content: string
  summary: string
  metaDescription: string
  categoryId: string
  tagIds: string[]
  thumbnailUrl?: string
}

export default function ContentGenerationTab({ categories, tags, onArticleGenerated }: Props) {
  const [topic, setTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [status, setStatus] = useState<GenerationStatus>({
    step: 'idle',
    message: '',
    progress: 0
  })
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null)

  const generateArticle = async () => {
    if (!topic.trim()) {
      alert('記事のトピックを入力してください')
      return
    }

    setIsGenerating(true)
    setGeneratedArticle(null)

    try {
      // Step 1: Research Phase
      setStatus({
        step: 'research',
        message: '自社RAGシステムで関連情報を収集中...',
        progress: 20
      })

      // Step 2: Outline Generation
      setStatus({
        step: 'outline',
        message: '記事の構成とよくある質問を生成中...',
        progress: 40
      })

      // Step 3: Content Writing
      setStatus({
        step: 'writing',
        message: '7000文字の記事を執筆中...',
        progress: 70
      })

      // Step 4: Metadata Generation
      setStatus({
        step: 'metadata',
        message: 'タイトル、メタデータ、カテゴリを自動設定中...',
        progress: 90
      })

      // API Call to generate article
      const response = await fetch('/api/content-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          categories,
          tags,
          requirements: {
            wordCount: 7000,
            faqCount: 8,
            includeStructuredData: true
          }
        })
      })

      if (!response.ok) {
        throw new Error('記事生成に失敗しました')
      }

      const data = await response.json()

      if (data.success) {
        setGeneratedArticle(data.article)
        setStatus({
          step: 'complete',
          message: '記事生成が完了しました！',
          progress: 100
        })
      } else {
        throw new Error(data.error || '記事生成に失敗しました')
      }
    } catch (error) {
      console.error('Error generating article:', error)
      
      // より詳細なエラー情報を表示
      let errorMessage = '不明なエラー'
      if (error instanceof Error) {
        errorMessage = error.message
        // API エラーの場合、より具体的な情報を提供
        if (errorMessage.includes('Failed to fetch')) {
          errorMessage = 'サーバーとの接続に失敗しました。サーバーが起動しているか確認してください。'
        } else if (errorMessage.includes('500')) {
          errorMessage = 'サーバー内部エラーが発生しました。しばらく時間をおいて再試行してください。'
        } else if (errorMessage.includes('404')) {
          errorMessage = 'APIエンドポイントが見つかりません。システム設定を確認してください。'
        }
      }
      
      setStatus({
        step: 'error',
        message: `エラー: ${errorMessage}`,
        progress: 0
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const saveAsDraft = async () => {
    if (!generatedArticle) return

    try {
      const response = await fetch('/api/admin/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: generatedArticle.title,
          slug: generatedArticle.slug,
          content: generatedArticle.content,
          excerpt: generatedArticle.summary,
          meta_description: generatedArticle.metaDescription,
          thumbnail_url: generatedArticle.thumbnailUrl || '/images/buzzlabo-logo.png',
          status: 'draft',
          category_id: generatedArticle.categoryId,
          published_at: null,
          tags: generatedArticle.tagIds
        })
      })

      if (response.ok) {
        alert('下書きとして保存されました！')
        onArticleGenerated()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || '保存に失敗しました')
      }
    } catch (error) {
      console.error('Error saving article:', error)
      alert(`保存中にエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const getStatusIcon = () => {
    switch (status.step) {
      case 'complete':
        return <CheckIcon className="h-6 w-6 text-green-500" />
      case 'error':
        return <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
      case 'idle':
        return <DocumentTextIcon className="h-6 w-6 text-gray-400" />
      default:
        return <ArrowPathIcon className="h-6 w-6 text-blue-500 animate-spin" />
    }
  }

  const getStatusColor = () => {
    switch (status.step) {
      case 'complete':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'idle':
        return 'text-gray-500'
      default:
        return 'text-blue-600'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-2">
          <SparklesIcon className="h-8 w-8" />
          <h2 className="text-2xl font-bold">AI コンテンツ生成</h2>
        </div>
        <p className="text-purple-100">
          自社RAGシステムを活用して、高品質な7000文字のブログ記事を自動生成します
        </p>
      </motion.div>

      {/* Topic Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">記事トピック入力</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              記事のトピック・キーワード
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例: Instagramマーケティングの基本、TikTokでバズる方法..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isGenerating}
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">自動生成される項目:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 7000文字の高品質記事本文</li>
              <li>• よくある質問 8項目</li>
              <li>• タイトル（H1キーワード最適化）</li>
              <li>• 記事URL（自動生成）</li>
              <li>• 記事概要・メタディスクリプション</li>
              <li>• 最適なカテゴリ・タグの自動選択</li>
            </ul>
          </div>

          <button
            onClick={generateArticle}
            disabled={isGenerating || !topic.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                記事生成中...
              </>
            ) : (
              <>
                <SparklesIcon className="h-5 w-5" />
                AI記事生成開始
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Generation Status */}
      {(isGenerating || status.step !== 'idle') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            {getStatusIcon()}
            <h3 className="text-lg font-semibold text-gray-900">生成ステータス</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {status.message}
              </span>
              <span className="text-sm text-gray-500">
                {status.progress}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${status.progress}%` }}
              />
            </div>

            {status.step === 'complete' && generatedArticle && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">生成完了！</h4>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-green-800">タイトル:</span>
                      <p className="text-green-700 mt-1">{generatedArticle.title}</p>
                    </div>
                    <div>
                      <span className="font-medium text-green-800">文字数:</span>
                      <p className="text-green-700 mt-1">{generatedArticle.content.length.toLocaleString()}文字</p>
                    </div>
                    <div>
                      <span className="font-medium text-green-800">カテゴリ:</span>
                      <p className="text-green-700 mt-1">
                        {categories.find(c => c.id === generatedArticle.categoryId)?.name || '未設定'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-green-800">タグ数:</span>
                      <p className="text-green-700 mt-1">{generatedArticle.tagIds.length}個</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={saveAsDraft}
                  className="mt-4 w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckIcon className="h-5 w-5" />
                  下書きとして保存してブログ管理へ
                </button>
              </div>
            )}

            {status.step === 'error' && (
              <div className="mt-6 pt-6 border-t">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-700 text-sm">
                    記事生成中にエラーが発生しました。トピックを変更して再度お試しください。
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Preview (if article generated) */}
      {generatedArticle && status.step === 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">記事プレビュー</h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
              <h4 className="font-bold text-xl mb-4">{generatedArticle.title}</h4>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-700">
                  {generatedArticle.content.substring(0, 1000)}
                  {generatedArticle.content.length > 1000 && '...'}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              ※ これは記事の一部です。完全版は下書き保存後にブログ管理で確認できます。
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
} 
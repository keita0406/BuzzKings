'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { 
  DocumentTextIcon, 
  PlusIcon, 
  EyeIcon, 
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CheckIcon,
  TagIcon,
  FolderIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'
import type { BlogPost, BlogCategory } from '@/lib/supabase'
import RAGTestPanel from '@/components/RAGTestPanel'
import ContentGenerationTab from '@/components/ContentGenerationTab'

interface RAGStats {
  totalContents: number
  contentsByType: Record<string, number>
  contentsByClusters: Record<string, number>
  recentQueries: Array<{
    question: string
    confidence: number
    timestamp: string
  }>
  systemStatus: {
    vectorDb: boolean
    embeddingApi: boolean
    lastVectorization: string
    errors?: string[]
  }
  detailedContents?: Array<{
    id: string
    type: string
    title: string
    cluster_id: string | null
    created_at: string
  }>
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [tags, setTags] = useState<Array<{ id: string; name: string; slug: string }>>([])
  const [ragStats, setRagStats] = useState<RAGStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'posts' | 'rag' | 'content-generation'>('posts')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadData()
  }, [])

  const checkAuth = () => {
    const session = sessionStorage.getItem('admin_session')
    if (session !== 'true') {
      router.push('/admin')
    }
  }

  const loadData = async () => {
    try {
      // 記事一覧を取得
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(name, color)
        `)
        .order('created_at', { ascending: false })

      if (postsError) throw postsError
      setPosts((postsData || []) as unknown as BlogPost[])

      // カテゴリ一覧を取得
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories')
        .select('*')
        .order('sort_order')

      if (categoriesError) throw categoriesError
      setCategories((categoriesData || []) as unknown as BlogCategory[])

      // タグ一覧を取得
      const { data: tagsData, error: tagsError } = await supabase
        .from('blog_tags')
        .select('id, name, slug')
        .order('name')

      if (tagsError) throw tagsError
      setTags((tagsData || []) as Array<{ id: string; name: string; slug: string }>)

      // RAG統計を取得
      await loadRAGStats()

    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadBlogPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(name, color)
        `)
        .order('created_at', { ascending: false })

      if (postsError) throw postsError
      setPosts((postsData || []) as unknown as BlogPost[])
    } catch (error) {
      console.error('Error loading blog posts:', error)
    }
  }

  const loadRAGStats = async () => {
    try {
      console.log('🔄 RAG統計読み込み開始...')
      
      // PGVectorからの統計データ取得
      const vectorStatsResponse = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get-vector-stats' })
      })
      
      const vectorStatsData = await vectorStatsResponse.json()
      console.log('📊 ベクトル統計:', vectorStatsData)
      
      // レリバンスエンジンからの統計データ取得
      const relevanceStatsResponse = await fetch('/api/relevance-engine?action=status')
      const relevanceStatsData = await relevanceStatsResponse.json()
      console.log('🔧 レリバンス統計:', relevanceStatsData)

      // システムヘルスチェック
      let vectorDbStatus = false
      let embeddingApiStatus = false
      let healthErrors: string[] = []
      try {
        const healthResponse = await fetch('/api/rag', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'health-check' })
        })
        const healthData = await healthResponse.json()
        console.log('🏥 ヘルスチェック:', healthData)
        
        vectorDbStatus = healthData.success && healthData.data?.vectorDb
        embeddingApiStatus = healthData.success && healthData.data?.openaiApi
        healthErrors = healthData.data?.errors || []
      } catch (healthError) {
        console.error('ヘルスチェックエラー:', healthError)
        vectorDbStatus = false
        embeddingApiStatus = false
        healthErrors = [healthError instanceof Error ? healthError.message : '不明なエラー']
      }

      setRagStats({
        totalContents: vectorStatsData.data?.totalContents || 0,
        contentsByType: vectorStatsData.data?.contentsByType || {},
        contentsByClusters: vectorStatsData.data?.contentsByClusters || {},
        detailedContents: vectorStatsData.data?.detailedContents || [],
        recentQueries: [], // 実装予定
        systemStatus: {
          vectorDb: vectorDbStatus,
          embeddingApi: embeddingApiStatus,
          lastVectorization: vectorStatsData.data?.lastUpdated || new Date().toISOString(),
          errors: healthErrors
        }
      })

      console.log('✅ RAG統計読み込み完了')
    } catch (error) {
      console.error('❌ RAG統計読み込みエラー:', error)
      setRagStats({
        totalContents: 0,
        contentsByType: {},
        contentsByClusters: {},
        recentQueries: [],
        systemStatus: {
          vectorDb: false,
          embeddingApi: false,
          lastVectorization: ''
        }
      })
    }
  }

  const handleSignOut = () => {
    sessionStorage.removeItem('admin_session')
    sessionStorage.removeItem('admin_email')
    router.push('/admin')
  }

  const deletePost = async (id: string) => {
    if (!confirm('この記事を削除しますか？')) return

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (!error) {
      setPosts(posts.filter(post => post.id !== id))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleRevectorize = async () => {
    if (!confirm('全コンテンツを再ベクトル化しますか？この処理には時間がかかります。')) return
    
    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'vectorize-site' })
      })
      
      const result = await response.json()
      if (result.success) {
        alert('ベクトル化が完了しました！')
        loadRAGStats() // 統計を再読み込み
      } else {
        alert('ベクトル化に失敗しました')
      }
    } catch (error) {
      console.error('Vectorization error:', error)
      alert('エラーが発生しました')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">BUZZLAB CMS</h1>
              <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                管理画面
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <DocumentTextIcon className="h-5 w-5 inline mr-2" />
              ブログ管理
            </button>
            <button
              onClick={() => setActiveTab('rag')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rag'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 inline mr-2" />
              RAGシステム
            </button>
            <button
              onClick={() => setActiveTab('content-generation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content-generation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ClipboardDocumentListIcon className="h-5 w-5 inline mr-2" />
              コンテンツ生成
            </button>
          </nav>
        </div>

        {/* Blog Management Tab */}
        {activeTab === 'posts' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <div className="flex items-center">
                  <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">総記事数</p>
                    <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <div className="flex items-center">
                  <CheckIcon className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">公開済み</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {posts.filter(post => post.status === 'published').length}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <div className="flex items-center">
                  <ClockIcon className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">下書き</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {posts.filter(post => post.status === 'draft').length}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <div className="flex items-center">
                  <FolderIcon className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">カテゴリ数</p>
                    <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/admin/posts/new')}
                className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                新規記事作成
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/admin/categories')}
                className="flex items-center bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <FolderIcon className="h-5 w-5 mr-2" />
                カテゴリ管理
              </motion.button>
            </div>

            {/* Posts Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">記事一覧</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        タイトル
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        カテゴリ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ステータス
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        作成日
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {post.title}
                              </div>
                              {post.excerpt && (
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {post.excerpt}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {(post as any).category && (
                            <span 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: (post as any).category.color }}
                            >
                              {(post as any).category.name}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.status === 'published' ? '公開' : '下書き'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(post.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => router.push(`/admin/posts/edit/${post.id}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="編集"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="プレビュー"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="削除"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {posts.length === 0 && (
                  <div className="text-center py-12">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">記事がありません</h3>
                    <p className="mt-1 text-sm text-gray-500">新しい記事を作成してみましょう。</p>
                    <div className="mt-6">
                      <button
                        onClick={() => router.push('/admin/posts/new')}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        新規記事作成
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* RAG System Tab */}
        {activeTab === 'rag' && ragStats && (
          <div>
            {/* RAG Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <div className="flex items-center">
                  <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">ベクトル化済み</p>
                    <p className="text-2xl font-bold text-gray-900">{ragStats.totalContents}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <div className="flex items-center">
                  <CpuChipIcon className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">システム状態</p>
                    <p className="text-sm font-bold text-green-600">
                      {ragStats.systemStatus.vectorDb ? '正常' : 'エラー'}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <div className="flex items-center">
                  <TagIcon className="h-8 w-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">コンテンツ種別</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Object.keys(ragStats.contentsByType).length}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <div className="flex items-center">
                  <ChartBarIcon className="h-8 w-8 text-pink-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">クラスター数</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Object.keys(ragStats.contentsByClusters).length}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RAG Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRevectorize}
                className="flex items-center bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CpuChipIcon className="h-5 w-5 mr-2" />
                再ベクトル化実行
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('/api/rag?question=BuzzLabについて教えて&userType=prospect', '_blank')}
                className="flex items-center bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                RAGテスト実行
              </motion.button>
            </div>

            {/* Content Type Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">コンテンツタイプ別分布</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {Object.entries(ragStats.contentsByType).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{count}件</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Topic Clusters Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-sm border overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">トピッククラスター別分布</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {Object.entries(ragStats.contentsByClusters).map(([cluster, count]) => (
                      <div key={cluster} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-sm font-medium text-gray-700">{cluster}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{count}件</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">システム状態</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${ragStats.systemStatus.vectorDb ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">PGVector DB</p>
                      <p className={`text-xs ${ragStats.systemStatus.vectorDb ? 'text-green-600' : 'text-red-600'}`}>
                        {ragStats.systemStatus.vectorDb ? '接続正常' : '接続エラー'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${ragStats.systemStatus.embeddingApi ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">OpenAI API</p>
                      <p className={`text-xs ${ragStats.systemStatus.embeddingApi ? 'text-green-600' : 'text-red-600'}`}>
                        {ragStats.systemStatus.embeddingApi ? 'API正常' : 'API エラー'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">最終更新</p>
                      <p className="text-xs text-gray-600">
                        {ragStats.systemStatus.lastVectorization ? formatDate(ragStats.systemStatus.lastVectorization) : '未実行'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Detailed Content List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">ベクトル化済みコンテンツ詳細</h3>
                <p className="text-sm text-gray-500 mt-1">PGVectorに保存されている全コンテンツの一覧</p>
              </div>
              <div className="overflow-x-auto max-h-96">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        タイプ
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        タイトル
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        クラスター
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        作成日時
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ragStats.detailedContents?.map((content, index) => (
                      <tr key={content.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            content.type === 'page' ? 'bg-blue-100 text-blue-800' :
                            content.type === 'service' ? 'bg-green-100 text-green-800' :
                            content.type === 'blog' ? 'bg-purple-100 text-purple-800' :
                            content.type === 'faq' ? 'bg-yellow-100 text-yellow-800' :
                            content.type === 'about' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {content.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                            {content.title}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {content.cluster_id ? (
                            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {content.cluster_id}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">未分類</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {formatDate(content.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {(!ragStats.detailedContents || ragStats.detailedContents.length === 0) && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">コンテンツが見つかりません</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* RAG Test Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <RAGTestPanel />
            </motion.div>
          </div>
        )}

        {/* Content Generation Tab */}
        {activeTab === 'content-generation' && (
          <ContentGenerationTab 
            categories={categories}
            tags={tags}
            onArticleGenerated={() => {
              // 記事生成後にブログ管理タブに切り替え
              setActiveTab('posts')
              loadBlogPosts()
            }}
          />
        )}
      </div>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClockIcon, EyeIcon, TagIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'

interface BlogPostWithCategory extends Omit<BlogPost, 'category'> {
  category?: {
    id: string
    name: string
    color: string
  }
}

export default function RealtimeSNSNewsSection() {
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('[DEBUG] RealtimeSNSNewsSection mounted, calling fetchLatestPosts...')
    fetchLatestPosts()
  }, [])

  const fetchLatestPosts = async () => {
    try {
      console.log('[DEBUG] Starting fetchLatestPosts...')
      console.log('[DEBUG] Supabase client:', supabase)
      console.log('[DEBUG] Environment check:')
      console.log('  - NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('  - NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      console.log('  - window exists:', typeof window !== 'undefined')
      
      // Test if we're in browser environment
      if (typeof window !== 'undefined') {
        console.log('[DEBUG] Client-side environment variables from window:')
        console.log('  - process.env.NODE_ENV:', process.env.NODE_ENV)
        console.log('  - All env vars:', Object.keys(process.env))
      }
      
      // Test the supabase client
      console.log('[DEBUG] Testing supabase client methods:')
      console.log('  - supabase.from:', typeof supabase.from)
      
      console.log('[DEBUG] About to make Supabase query...')
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(
            id,
            name,
            color
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(6)

      console.log('[DEBUG] Supabase query completed')
      console.log('[DEBUG] Query result - data:', data)
      console.log('[DEBUG] Query result - error:', error)
      console.log('[DEBUG] Data type:', typeof data)
      console.log('[DEBUG] Data length:', data?.length)

      if (error) {
        console.error('[ERROR] Supabase query error:', error)
        console.error('[ERROR] Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        setError(`Supabaseエラー: ${error.message} (Code: ${error.code || 'N/A'})`)
        return
      }

      if (!data) {
        console.warn('[WARNING] No data returned from Supabase')
        setError('データが取得できませんでした')
        return
      }

      console.log('[DEBUG] Setting posts data:', data)
      setPosts((data || []) as unknown as BlogPost[])
    } catch (error) {
      console.error('[ERROR] Fetch error:', error)
      console.error('[ERROR] Error stack:', error instanceof Error ? error.stack : 'No stack')
      setError(`取得エラー: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      console.log('[DEBUG] Setting isLoading to false')
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  console.log('[DEBUG] Render state:', { isLoading, error, postsLength: posts.length })

  if (isLoading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">最新記事を読み込み中...</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Debug Info:</p>
              <p>Loading: {isLoading ? 'true' : 'false'}</p>
              <p>Error: {error || 'none'}</p>
              <p>Posts count: {posts.length}</p>
              <p>Env URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET'}</p>
              <p>Env Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <h3 className="text-xl font-bold">エラーが発生しました</h3>
              <p className="mt-2">{error}</p>
              <div className="mt-4 text-sm">
                <p>Environment Debug:</p>
                <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'}</p>
                <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setError(null)
                setIsLoading(true)
                fetchLatestPosts()
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              再試行
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
              最新ブログ記事
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">
            SNSマーケティングの最新情報とノウハウをお届け
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">まだ公開されている記事がありません。</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Debug Info:</p>
              <p>Posts loaded: {posts.length}</p>
              <p>Loading state: {isLoading ? 'loading' : 'complete'}</p>
            </div>
          </div>
        ) : (
          <>
            {/* ブログ記事グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="bg-gradient-to-br from-white to-gray-50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer h-full flex flex-col"
                  >
                    {/* サムネイル */}
                    {post.thumbnail_url ? (
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <img
                          src={post.thumbnail_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                        <div className="text-6xl opacity-30">📝</div>
                      </div>
                    )}

                    {/* コンテンツ */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* カテゴリ */}
                      {post.category && (
                        <div className="mb-3">
                          <span
                            className="inline-flex items-center px-3 py-1 text-xs font-medium text-white"
                            style={{ backgroundColor: post.category.color }}
                          >
                            <TagIcon className="h-3 w-3 mr-1" />
                            {post.category.name}
                          </span>
                        </div>
                      )}

                      {/* タイトル */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* 概要 */}
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                          {truncateText(post.excerpt, 120)}
                        </p>
                      )}

                      {/* メタ情報と記事を読むボタン */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-xs text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {post.published_at && formatDate(post.published_at)}
                        </div>
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center group-hover:shadow-lg">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          記事を読む
                        </div>
                      </div>
                    </div>

                    {/* ホバーエフェクト */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </motion.article>
                </Link>
              ))}
            </div>

            {/* 更新インジケーター */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-full px-6 py-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-black font-semibold">最新記事を表示中 ({posts.length}件)</span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
} 
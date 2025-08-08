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

  useEffect(() => {
    fetchLatestPosts()
  }, [])

  const fetchLatestPosts = async () => {
    try {
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

      if (error) {
        console.error('Error fetching posts:', error)
        return
      }

      setPosts(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      return '今日'
    } else if (diffDays === 2) {
      return '昨日'
    } else if (diffDays <= 7) {
      return `${diffDays - 1}日前`
    } else {
      return date.toLocaleDateString('ja-JP', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (isLoading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">最新記事を読み込み中...</p>
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
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                  >
                    {/* サムネイル */}
                    {post.thumbnail_url ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.thumbnail_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center">
                        <div className="text-6xl opacity-30">📝</div>
                      </div>
                    )}

                    {/* コンテンツ */}
                    <div className="p-6">
                      {/* カテゴリ */}
                      {post.category && (
                        <div className="mb-3">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
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
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {truncateText(post.excerpt, 120)}
                        </p>
                      )}

                      {/* メタ情報 */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {post.published_at && formatDate(post.published_at)}
                        </div>
                        <div className="flex items-center">
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
                <span className="text-black font-semibold">最新記事を表示中</span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
} 
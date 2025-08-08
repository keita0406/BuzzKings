'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { BlogPost, BlogCategory } from '@/lib/supabase'
import { CalendarIcon, TagIcon, ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline'

interface BlogPostWithCategory extends Omit<BlogPost, 'category'> {
  category?: {
    id: string
    name: string
    color: string
  }
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPostWithCategory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<BlogPostWithCategory[]>([])

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug])

  const fetchPost = async (slug: string) => {
    try {
      // 記事を取得
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(
            id,
            name,
            color
          )
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (postError) {
        console.error('Error fetching post:', postError)
        return
      }

      setPost(postData)

      // 関連記事を取得（同じカテゴリから3件）
      if (postData.category_id) {
        const { data: relatedData } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(
              id,
              name,
              color
            )
          `)
          .eq('category_id', postData.category_id)
          .eq('status', 'published')
          .neq('id', postData.id)
          .order('published_at', { ascending: false })
          .limit(3)

        setRelatedPosts(relatedData || [])
      }

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

    if (diffDays === 1) return '今日'
    if (diffDays === 2) return '昨日'
    if (diffDays <= 7) return `${diffDays - 1}日前`
    
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || '',
          url: window.location.href,
        })
      } catch (error) {
        console.log('Share failed:', error)
      }
    } else if (post) {
      // フォールバック: クリップボードにコピー
      navigator.clipboard.writeText(window.location.href)
      alert('URLをクリップボードにコピーしました')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">記事を読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">記事が見つかりません</h1>
          <p className="text-gray-600 mb-8">お探しの記事は存在しないか、削除された可能性があります。</p>
          <button
            onClick={() => router.push('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              戻る
            </button>
            <button
              onClick={handleShare}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              シェア
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* サムネイル */}
          {post.thumbnail_url && (
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={post.thumbnail_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* カテゴリ */}
            {post.category && (
              <div className="mb-4">
                <span
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: post.category.color }}
                >
                  <TagIcon className="h-4 w-4 mr-2" />
                  {post.category.name}
                </span>
              </div>
            )}

            {/* タイトル */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* メタ情報 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center text-gray-500 mb-6 pb-6 border-b border-gray-200"
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span className="text-sm">
                {post.published_at && formatDate(post.published_at)}
              </span>
            </motion.div>

            {/* 概要 */}
            {post.excerpt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-6 mb-8 rounded-r-lg"
              >
                <p className="text-gray-700 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
              </motion.div>
            )}

            {/* 本文 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </motion.article>

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <motion.article
                  key={relatedPost.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                  onClick={() => router.push(`/blog/${relatedPost.slug}`)}
                >
                  {relatedPost.thumbnail_url ? (
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={relatedPost.thumbnail_url}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <div className="text-4xl opacity-30">📝</div>
                    </div>
                  )}
                  <div className="p-4">
                    {relatedPost.category && (
                      <span
                        className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white mb-2"
                        style={{ backgroundColor: relatedPost.category.color }}
                      >
                        {relatedPost.category.name}
                      </span>
                    )}
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  )
} 
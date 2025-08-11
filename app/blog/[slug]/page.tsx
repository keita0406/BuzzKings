'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { BlogPost, BlogCategory } from '@/lib/supabase'
import { CalendarIcon, TagIcon, ShareIcon, ChevronDownIcon, ChevronUpIcon, ListBulletIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { marked } from 'marked'
import ContactSection from '@/components/ContactSection'
import FixedBanners from '@/components/FixedBanners'
import AuthorSection from '@/components/AuthorSection'

interface BlogPostWithCategory extends Omit<BlogPost, 'category'> {
  category?: {
    id: string
    name: string
    color: string
  }
}

const navigation = [
  { name: 'ホーム', href: '/' },
  { name: 'サービス', href: '/#services' },
  { name: '実績', href: '/#achievements' },
  { name: 'よくある質問', href: '/#faq' },
]

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPostWithCategory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPostWithCategory[]>([])
  const [tableOfContents, setTableOfContents] = useState<{id: string, text: string}[]>([])
  const [tocOpen, setTocOpen] = useState(false)
  const [processedContent, setProcessedContent] = useState<string>('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug])

  const scrollToSection = (href: string) => {
    if (href === '/') {
      router.push('/')
      return
    }
    
    if (href.startsWith('/#')) {
      router.push(href)
      return
    }
    
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  // Markdownをパースしつつ目次を生成する関数
  const processContentAndGenerateTOC = (content: string) => {
    console.log('[DEBUG] Original content:', content.substring(0, 200))
    
    // HTMLタグで囲まれている場合は、まずHTMLタグを除去
    let cleanContent = content
    
    // <p>タグで囲まれたMarkdownを抽出
    if (content.includes('<p>##') || content.includes('<p>|')) {
      cleanContent = content
        .replace(/<p>/g, '\n')
        .replace(/<\/p>/g, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .trim()
    }
    
    // テーブル専用の前処理: テーブル行間の空行を除去
    // 複数回適用してすべてのテーブル行を連続させる
    let previousContent;
    do {
      previousContent = cleanContent;
      cleanContent = cleanContent.replace(/(\|[^\n]*\|)\n\n(\|[^\n]*\|)/g, '$1\n$2');
    } while (cleanContent !== previousContent);
    
    console.log('[DEBUG] Cleaned content:', cleanContent.substring(0, 200))
    
    // 目次用のH2要素を抽出
    const h2Matches = cleanContent.match(/^## (.+)$/gm) || []
    const toc = h2Matches.map((match, index) => {
      const text = match.replace(/^## /, '').trim()
      const id = `heading-${index + 1}`
      return { id, text }
    })
    
    console.log('[DEBUG] Generated TOC:', toc)
    setTableOfContents(toc)
    
    // MarkdownをHTMLに変換（同期版）
    marked.setOptions({
      gfm: true,
      breaks: true
    })
    
    let htmlContent = marked.parse(cleanContent) as string
    
    // H2タグにIDを追加
    toc.forEach((item, index) => {
      const h2Pattern = new RegExp(`<h2>\\s*${item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*</h2>`, 'i')
      htmlContent = htmlContent.replace(h2Pattern, `<h2 id="${item.id}">${item.text}</h2>`)
    })
    
    console.log('[DEBUG] Processed HTML content:', htmlContent.substring(0, 300))
    setProcessedContent(htmlContent)
    
    return htmlContent
  }

  // コンテンツ処理用のuseEffect
  useEffect(() => {
    if (post?.content && !processedContent) {
      processContentAndGenerateTOC(post.content)
    }
  }, [post?.content, processedContent])

  const fetchPost = async (slug: string) => {
    try {
      console.log('[DEBUG] Fetching post with slug:', slug)
      
      // 記事を取得
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      console.log('[DEBUG] Supabase query result:', { postData, postError })

      if (postError) {
        console.error('[DEBUG] Post fetch error:', postError)
        setError(`記事が見つかりませんでした: ${postError.message}`)
        return
      }

      if (!postData) {
        console.error('[DEBUG] No post data found')
        setError('記事が見つかりませんでした')
        return
      }

      // カテゴリ情報を別途取得
      let categoryData = null
      if (postData.category_id) {
        console.log('[DEBUG] Fetching category for ID:', postData.category_id)
        const { data: cat, error: categoryError } = await supabase
          .from('blog_categories')
          .select('id, name, color')
          .eq('id', postData.category_id)
          .single()
        console.log('[DEBUG] Category fetch result:', { cat, categoryError })
        categoryData = cat
      }

      console.log('[DEBUG] Post fetched successfully:', postData.title)
      setPost({
        ...postData,
        category: categoryData || undefined
      } as BlogPostWithCategory)

      // 関連記事を取得（同じカテゴリから3件）
      if (postData.category_id) {
        const { data: relatedData } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('category_id', postData.category_id)
          .eq('status', 'published')
          .neq('id', postData.id)
          .limit(3)

        if (relatedData) {
          // 各関連記事のカテゴリ情報も取得
          const relatedPostsWithCategory = await Promise.all(
            relatedData.map(async (post) => {
              let cat = null
              if (post.category_id) {
                const { data: categoryInfo } = await supabase
                  .from('blog_categories')
                  .select('id, name, color')
                  .eq('id', post.category_id)
                  .single()
                cat = categoryInfo
              }
              return {
                ...post,
                category: cat || undefined
              } as BlogPostWithCategory
            })
          )
          setRelatedPosts(relatedPostsWithCategory)
        }
      }

    } catch (error) {
      console.error('[DEBUG] Unexpected error:', error)
      setError('記事の読み込み中にエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  // スムーススクロール関数
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">記事を読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 dark:text-white mb-4">{error || '記事が見つかりません'}</h1>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* ヘッダー */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white dark:bg-gray-800 backdrop-blur-md shadow-lg'
            : 'bg-white dark:bg-gray-800 shadow-sm'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-gray-500/10 dark:border-gray-700/50 py-0">
            <div className="flex items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  router.push('/')
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
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            
            <div className="lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
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
            className="lg:hidden fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-500/10 dark:border-gray-700/50">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">BUZZLAB</span>
                <img
                  className="h-8 w-auto"
                  src="/images/bb-logo.png"
                  alt="BUZZLAB Logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700/50">
                <div className="space-y-2 py-6 px-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(item.href)
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
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

      {/* メインコンテンツ */}
      <div className="pt-20">
        {/* 記事ヘッダー */}
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="space-y-6">
              {post.category && (
                <span 
                  className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                  style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                >
                  {post.category.name}
                </span>
              )}
              
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">{post.title}</h1>
              
              <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <time>{new Date(post.published_at || post.created_at).toLocaleDateString('ja-JP')}</time>
                </div>
                
                <button className="flex items-center space-x-2 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <ShareIcon className="w-5 h-5" />
                  <span>シェア</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 目次 (サイドバー) */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                {tableOfContents.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setTocOpen(!tocOpen)}
                      className="flex items-center justify-between w-full text-left text-lg font-semibold mb-4 lg:cursor-default"
                    >
                      <div className="flex items-center space-x-2">
                        <ListBulletIcon className="w-5 h-5" />
                        <span>目次</span>
                      </div>
                      <ChevronDownIcon className={`w-5 h-5 lg:hidden transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <div className={`${tocOpen ? 'block' : 'hidden'} lg:block space-y-2`}>
                      {tableOfContents.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => scrollToHeading(item.id)}
                          className="block w-full text-left text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors py-1 text-sm border-l-2 border-transparent hover:border-purple-500 pl-3"
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* メインコンテンツ */}
            <div className="lg:col-span-3">
              <article className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                {post.thumbnail_url && (
                  <div className="mb-8">
                    <img 
                      src={post.thumbnail_url} 
                      alt={post.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}

                {post.excerpt && (
                  <div className="mb-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                    <p className="text-gray-700 dark:text-gray-300 italic">{post.excerpt}</p>
                  </div>
                )}

                <div 
                  className="prose prose-lg prose-gray dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: processedContent || post.content 
                  }}
                />
              </article>

              {/* 監修者セクション */}
              <AuthorSection />

              {/* 関連記事 */}
              {relatedPosts.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">関連記事</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <motion.article
                        key={relatedPost.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer shadow-sm border border-gray-200 dark:border-gray-700"
                        onClick={() => router.push(`/blog/${relatedPost.slug}`)}
                      >
                        {relatedPost.thumbnail_url && (
                          <img 
                            src={relatedPost.thumbnail_url} 
                            alt={relatedPost.title}
                            className="w-full h-32 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">{relatedPost.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                          <div className="mt-3 flex items-center justify-between">
                            {relatedPost.category && (
                              <span 
                                className="px-2 py-1 rounded text-xs"
                                style={{ backgroundColor: relatedPost.category.color + '20', color: relatedPost.category.color }}
                              >
                                {relatedPost.category.name}
                              </span>
                            )}
                            <time className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(relatedPost.published_at || relatedPost.created_at).toLocaleDateString('ja-JP')}
                            </time>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <ContactSection />

      {/* Fixed banners */}
      <FixedBanners />
    </div>
  )
} 
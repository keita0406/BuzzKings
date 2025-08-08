'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { 
  ArrowLeftIcon, 
  PhotoIcon, 
  TagIcon,
  BookmarkIcon,
  EyeIcon,
  DocumentTextIcon,
  SparklesIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline'
import type { BlogCategory, BlogTag } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

// React Quillを動的インポート（SSR回避）
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
})
import 'react-quill/dist/quill.snow.css'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [tags, setTags] = useState<BlogTag[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingType, setGeneratingType] = useState<'meta' | 'excerpt' | 'tags' | null>(null)
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
    setIsLoading(true)
    try {
      // カテゴリ取得
      console.log('カテゴリを読み込み中...')
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories')
        .select('*')
        .order('sort_order')

      if (categoriesError) {
        console.error('カテゴリ読み込みエラー:', categoriesError)
      } else {
        console.log('カテゴリデータ:', categoriesData)
        setCategories(categoriesData || [])
      }

      // タグ取得
      console.log('タグを読み込み中...')
      const { data: tagsData, error: tagsError } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name')

      if (tagsError) {
        console.error('タグ読み込みエラー:', tagsError)
      } else {
        console.log('タグデータ:', tagsData)
        setTags(tagsData || [])
      }

    } catch (error) {
      console.error('データ読み込み全般エラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 改良されたスラッグ生成関数（日本語対応）
  const generateSlug = (title: string) => {
    // 日本語から英語キーワードへのマッピング
    const japaneseToEnglish: { [key: string]: string } = {
      'SNS': 'sns',
      'インスタグラム': 'instagram',
      'インスタ': 'instagram', 
      'ツイッター': 'twitter',
      'TikTok': 'tiktok',
      'ティックトック': 'tiktok',
      'フェイスブック': 'facebook',
      'YouTube': 'youtube',
      'ユーチューブ': 'youtube',
      'マーケティング': 'marketing',
      '広告': 'advertising',
      'フォロワー': 'followers',
      'フォロー': 'follow',
      'バズ': 'viral',
      'トレンド': 'trend',
      'ビジネス': 'business',
      '戦略': 'strategy',
      'ガイド': 'guide',
      'コツ': 'tips',
      '方法': 'method',
      '運用': 'management',
      '効果': 'effective',
      '成功': 'success',
      '事例': 'case-study',
      '分析': 'analysis',
      'ブランド': 'brand',
      'コンテンツ': 'content',
      '動画': 'video',
      '写真': 'photo',
      '投稿': 'post',
      '企業': 'company',
      '店舗': 'store',
      'アカウント': 'account',
      'キャンペーン': 'campaign',
      'エンゲージメント': 'engagement',
      'インフルエンサー': 'influencer',
      'アルゴリズム': 'algorithm',
      'ハッシュタグ': 'hashtag',
      'ライブ': 'live',
      'ストーリー': 'story',
      'リール': 'reels',
      'ショート': 'shorts',
      '解説': 'explanation',
      '最新': 'latest',
      'ニュース': 'news',
      '入門': 'beginner',
      '初心者': 'beginner',
      '基礎': 'basic',
      '応用': 'advanced',
      '実践': 'practice',
      '活用': 'utilization',
      '集客': 'customer-acquisition',
      '売上': 'sales',
      '収益': 'revenue'
    }

    let slug = title.toLowerCase()
    
    // 日本語キーワードを英語に変換
    Object.entries(japaneseToEnglish).forEach(([japanese, english]) => {
      const regex = new RegExp(japanese, 'gi')
      slug = slug.replace(regex, english)
    })
    
    // 数字の処理（1万人 → 10k など）
    slug = slug.replace(/(\d+)万/g, (match, num) => `${num}0k`)
    slug = slug.replace(/(\d+)千/g, (match, num) => `${num}k`)
    
    // 年月の処理
    slug = slug.replace(/(\d{4})年(\d{1,2})月/g, '$1-$2')
    slug = slug.replace(/(\d{4})年/g, '$1')
    
    // 残りの日本語文字を削除し、英数字・ハイフン・アンダースコアのみ残す
    slug = slug.replace(/[^\w\s-]/g, '')
    
    // 連続するスペースをハイフンに変換
    slug = slug.replace(/\s+/g, '-')
    
    // 連続するハイフンを単一に
    slug = slug.replace(/-+/g, '-')
    
    // 前後のハイフンを削除
    slug = slug.replace(/^-+|-+$/g, '')
    
    // 空の場合はデフォルト値
    if (!slug) {
      slug = `blog-post-${Date.now()}`
    }
    
    // 最大長制限（SEO上50文字程度が理想）
    if (slug.length > 50) {
      slug = slug.substring(0, 50).replace(/-[^-]*$/, '')
    }
    
    return slug
  }

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    // タイトルが変更されたら常に自動生成
    setSlug(generateSlug(newTitle))
  }

  const generateWithAI = async (type: 'meta_description' | 'excerpt' | 'tags') => {
    if (!content.trim()) {
      alert('記事本文を入力してからAI生成を使用してください')
      return
    }

    setIsGenerating(true)
    setGeneratingType(type === 'meta_description' ? 'meta' : type === 'excerpt' ? 'excerpt' : 'tags')
    
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          title,
          type
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'AI生成に失敗しました')
      }

      if (type === 'meta_description') {
        setMetaDescription(data.result)
      } else if (type === 'excerpt') {
        setExcerpt(data.result)
      } else if (type === 'tags') {
        // AI生成されたタグを既存タグと照合し、新しいタグは作成
        const aiTags = data.result as string[]
        const newSelectedTags = [...selectedTags]
        
        for (const tagName of aiTags) {
          const existingTag = tags.find(tag => tag.name === tagName)
          if (existingTag) {
            if (!newSelectedTags.includes(existingTag.id)) {
              newSelectedTags.push(existingTag.id)
            }
          } else {
            // 新しいタグを作成
            const tagSlug = generateSlug(tagName)
            const { data: newTagData, error } = await supabase
              .from('blog_tags')
              .insert([{ name: tagName, slug: tagSlug }])
              .select()
              .single()

            if (!error && newTagData) {
              setTags([...tags, newTagData])
              newSelectedTags.push(newTagData.id)
            }
          }
        }
        
        setSelectedTags(newSelectedTags)
      }

    } catch (error) {
      console.error('AI生成エラー:', error)
      alert(error instanceof Error ? error.message : 'AI生成に失敗しました')
    } finally {
      setIsGenerating(false)
      setGeneratingType(null)
    }
  }

  const addNewTag = async () => {
    if (!newTag.trim()) return

    const tagSlug = generateSlug(newTag)
    
    // 既存タグチェック
    const existingTag = tags.find(tag => tag.slug === tagSlug)
    if (existingTag) {
      if (!selectedTags.includes(existingTag.id)) {
        setSelectedTags([...selectedTags, existingTag.id])
      }
      setNewTag('')
      return
    }

    // 新しいタグを作成
    const { data: newTagData, error } = await supabase
      .from('blog_tags')
      .insert([{ name: newTag.trim(), slug: tagSlug }])
      .select()
      .single()

    if (!error && newTagData) {
      setTags([...tags, newTagData])
      setSelectedTags([...selectedTags, newTagData.id])
      setNewTag('')
    }
  }

  const removeTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // ファイルサイズチェック（5MB制限）
    if (file.size > 5 * 1024 * 1024) {
      alert('ファイルサイズが5MBを超えています')
      return
    }

    // ファイル形式チェック
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('JPG、PNG、GIF、WebP形式の画像のみアップロード可能です')
      return
    }

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `blog-thumbnails/${fileName}`

      console.log('Uploading file:', { fileName, filePath, fileSize: file.size, fileType: file.type })

      const { data, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error details:', uploadError)
        throw uploadError
      }

      console.log('Upload successful:', data)

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      console.log('Public URL:', publicUrl)
      setThumbnailUrl(publicUrl)
      
    } catch (error) {
      console.error('Error uploading image:', error)
      
      // エラーの詳細をユーザーに表示
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = (error as any).message
        if (errorMessage.includes('row-level security')) {
          alert('画像のアップロードに失敗しました（認証エラー）。ページをリフレッシュして再試行してください。')
        } else if (errorMessage.includes('duplicate')) {
          alert('同じファイル名の画像が既に存在します。別の画像を選択してください。')
        } else {
          alert(`画像のアップロードに失敗しました: ${errorMessage}`)
        }
      } else {
        alert('画像のアップロードに失敗しました。再試行してください。')
      }
    }
  }

  const savePost = async (publishStatus: 'draft' | 'published') => {
    if (!title.trim() || !content.trim()) {
      alert('タイトルと本文は必須です')
      return
    }

    setIsSaving(true)
    try {
      // 記事を保存
      // スラッグの重複チェックと調整
      let finalSlug = slug || generateSlug(title)
      let slugCounter = 1
      
      // 既存のスラッグをチェック（406エラー対策）
      while (true) {
        const { data: existingPosts, error } = await supabase
          .from('blog_posts')
          .select('id')
          .eq('slug', finalSlug)
          .limit(1)
        
        // エラーが発生した場合は無視して続行
        if (error) {
          console.warn('Slug check error (ignored):', error)
          break
        }
        
        if (!existingPosts || existingPosts.length === 0) break
        
        // 重複している場合は番号を追加
        const baseSlug = slug || generateSlug(title)
        finalSlug = `${baseSlug}-${slugCounter}`
        slugCounter++
        
        // 無限ループ防止
        if (slugCounter > 100) {
          console.warn('Slug generation reached limit, using random suffix')
          finalSlug = `${baseSlug}-${Date.now()}`
          break
        }
      }

      const postData = {
        title: title.trim(),
        slug: finalSlug,
        content,
        excerpt: excerpt.trim(),
        meta_description: metaDescription.trim(),
        thumbnail_url: thumbnailUrl,
        status: publishStatus,
        category_id: categoryId || null,
        published_at: publishStatus === 'published' ? new Date().toISOString() : null
      }

      const { data: postResult, error: postError } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single()

      if (postError) throw postError

      // タグを関連付け
      if (selectedTags.length > 0) {
        const tagRelations = selectedTags.map(tagId => ({
          post_id: postResult.id,
          tag_id: tagId
        }))

        const { error: tagError } = await supabase
          .from('blog_post_tags')
          .insert(tagRelations)

        if (tagError) throw tagError
      }

      alert(publishStatus === 'published' ? '記事を公開しました' : '下書きを保存しました')
      router.push('/admin/dashboard')

    } catch (error) {
      console.error('Error saving post:', error)
      
      // 詳細なエラーメッセージを表示
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = (error as any).message
        if (errorMessage.includes('violates row-level security')) {
          alert('保存に失敗しました（認証エラー）。ページをリフレッシュして再試行してください。')
        } else if (errorMessage.includes('duplicate key')) {
          alert('保存に失敗しました（重複エラー）。タイトルを変更して再試行してください。')
        } else if (errorMessage.includes('foreign key')) {
          alert('保存に失敗しました（関連データエラー）。カテゴリやタグを確認してください。')
        } else {
          alert(`保存に失敗しました: ${errorMessage}`)
        }
      } else {
        alert('保存に失敗しました。再試行してください。')
      }
    } finally {
      setIsSaving(false)
    }
  }

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
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
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                ダッシュボードに戻る
              </button>
              <h1 className="text-xl font-semibold text-gray-900">新規記事作成</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => savePost('draft')}
                disabled={isSaving}
                className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <BookmarkIcon className="h-4 w-4 mr-2" />
                下書き保存
              </button>
              <button
                onClick={() => savePost('published')}
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                公開
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="記事のタイトルを入力してください"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </motion.div>

          {/* URL Preview (Auto-generated) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-50 p-4 rounded-xl border border-blue-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">記事URL（自動生成）</span>
            </div>
            <div className="bg-white px-3 py-2 rounded-lg border">
              <code className="text-sm text-blue-600">
                https://buzzlab.com/blog/{slug || 'url-slug'}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 タイトルから自動でSEOに最適なURLを生成します
            </p>
          </motion.div>

          {/* Thumbnail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              サムネイル画像
            </label>
            {thumbnailUrl ? (
              <div className="relative">
                <img 
                  src={thumbnailUrl} 
                  alt="Thumbnail" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => setThumbnailUrl('')}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label className="cursor-pointer">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      画像を選択
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  PNG, JPG, GIF (最大5MB)
                </p>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              記事本文 <span className="text-red-500">*</span>
            </label>
            <div className="prose-editor">
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={quillModules}
                placeholder="記事の内容を入力してください..."
                style={{ height: '400px', marginBottom: '50px' }}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Excerpt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  記事概要
                </label>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => generateWithAI('excerpt')}
                  disabled={isGenerating || !content.trim()}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 ${
                    isGenerating && generatingType === 'excerpt'
                      ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white cursor-not-allowed'
                      : content.trim()
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isGenerating && generatingType === 'excerpt' ? (
                    <>
                      <CpuChipIcon className="h-3 w-3 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-3 w-3" />
                      AI生成
                    </>
                  )}
                </motion.button>
              </div>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="記事の簡単な概要を入力してください（記事本文を書いてからAI生成ボタンが使えます）"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                管理画面での記事管理に使用されます {!content.trim() && '• 記事本文を入力してからAI生成をお試しください'}
              </p>
            </motion.div>

            {/* Meta Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  メタディスクリプション
                </label>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => generateWithAI('meta_description')}
                  disabled={isGenerating || !content.trim()}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 ${
                    isGenerating && generatingType === 'meta'
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white cursor-not-allowed'
                      : content.trim()
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isGenerating && generatingType === 'meta' ? (
                    <>
                      <CpuChipIcon className="h-3 w-3 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-3 w-3" />
                      AI生成
                    </>
                  )}
                </motion.button>
              </div>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO用の説明文を入力してください（記事本文を書いてからAI生成ボタンが使えます）"
                rows={4}
                maxLength={300}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                {metaDescription.length}/300文字 {!content.trim() && '• 記事本文を入力してからAI生成をお試しください'}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリ ({categories.length}件)
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">カテゴリを選択</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-sm text-red-500 mt-1">
                  カテゴリが読み込まれていません。ブラウザのConsoleを確認してください。
                </p>
              )}
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  タグ
                </label>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => generateWithAI('tags')}
                  disabled={isGenerating || !content.trim()}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 ${
                    isGenerating && generatingType === 'tags'
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white cursor-not-allowed'
                      : content.trim()
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isGenerating && generatingType === 'tags' ? (
                    <>
                      <CpuChipIcon className="h-3 w-3 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-3 w-3" />
                      AI生成
                    </>
                  )}
                </motion.button>
              </div>
              <div className="flex items-center mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="新しいタグを入力（記事本文からAI生成も可能）"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addNewTag()}
                />
                <button
                  onClick={addNewTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  追加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tagId) => {
                  const tag = tags.find(t => t.id === tagId)
                  return tag ? (
                    <span
                      key={tagId}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag.name}
                      <button
                        onClick={() => removeTag(tagId)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ) : null
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 
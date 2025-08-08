'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  PencilIcon,
  TrashIcon,
  FolderIcon,
  SwatchIcon
} from '@heroicons/react/24/outline'
import type { BlogCategory } from '@/lib/supabase'

export default function CategoriesManager() {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#3b82f6'
  })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadCategories()
  }, [])

  const checkAuth = () => {
    const session = sessionStorage.getItem('admin_session')
    if (session !== 'true') {
      router.push('/admin')
    }
  }

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('sort_order')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug === generateSlug(prev.name) || prev.slug === '' 
        ? generateSlug(name) 
        : prev.slug
    }))
  }

  const openModal = (category?: BlogCategory) => {
    if (category) {
      setEditingCategory(category)
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        color: category.color
      })
    } else {
      setEditingCategory(null)
      setFormData({
        name: '',
        slug: '',
        description: '',
        color: '#3b82f6'
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingCategory(null)
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#3b82f6'
    })
  }

  const saveCategory = async () => {
    if (!formData.name.trim()) {
      alert('カテゴリ名は必須です')
      return
    }

    try {
      const categoryData = {
        name: formData.name.trim(),
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description.trim(),
        color: formData.color,
        sort_order: editingCategory ? editingCategory.sort_order : categories.length
      }

      if (editingCategory) {
        // 更新
        const { error } = await supabase
          .from('blog_categories')
          .update(categoryData)
          .eq('id', editingCategory.id)

        if (error) throw error
      } else {
        // 新規作成
        const { error } = await supabase
          .from('blog_categories')
          .insert([categoryData])

        if (error) throw error
      }

      await loadCategories()
      closeModal()
      alert(editingCategory ? 'カテゴリを更新しました' : 'カテゴリを作成しました')
    } catch (error) {
      console.error('Error saving category:', error)
      alert('保存に失敗しました')
    }
  }

  const deleteCategory = async (category: BlogCategory) => {
    if (!confirm(`「${category.name}」を削除しますか？`)) return

    try {
      const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', category.id)

      if (error) throw error

      setCategories(categories.filter(c => c.id !== category.id))
      alert('カテゴリを削除しました')
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('削除に失敗しました')
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
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                ダッシュボードに戻る
              </button>
              <h1 className="text-xl font-semibold text-gray-900">カテゴリ管理</h1>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              新規カテゴリ
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openModal(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="編集"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="削除"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    スラッグ: <span className="font-mono">{category.slug}</span>
                  </p>
                  {category.description && (
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">カテゴリがありません</h3>
            <p className="mt-1 text-sm text-gray-500">新しいカテゴリを作成してみましょう。</p>
            <div className="mt-6">
              <button
                onClick={() => openModal()}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                新規カテゴリ作成
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingCategory ? 'カテゴリ編集' : '新規カテゴリ作成'}
              </h2>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="カテゴリ名を入力"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    スラッグ
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-slug"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カラー
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      placeholder="#3b82f6"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    説明
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="カテゴリの説明を入力"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={saveCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingCategory ? '更新' : '作成'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
} 
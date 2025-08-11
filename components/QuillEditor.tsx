'use client'

import { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'

// QuillのCSSをインポート
import 'react-quill/dist/quill.snow.css'

// ReactQuillの型定義
interface ReactQuillProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  modules?: any
  formats?: string[]
  theme?: string
  style?: React.CSSProperties
}

// ReactQuillを動的インポート
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <span className="text-gray-500">エディタを読み込み中...</span>
    </div>
  )
})

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  style?: React.CSSProperties
}

export default function QuillEditor({ 
  value, 
  onChange, 
  placeholder = "記事の内容を入力してください...",
  style = { height: '400px', marginBottom: '50px' }
}: QuillEditorProps) {
  const [isClient, setIsClient] = useState(false)
  const [editorValue, setEditorValue] = useState(value)

  // クライアントサイドでのみレンダリング
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 値の同期
  useEffect(() => {
    setEditorValue(value)
  }, [value])

  // Quillの設定をメモ化
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  }), [])

  const formats = useMemo(() => [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'image'
  ], [])

  // 値変更ハンドラー
  const handleChange = (content: string) => {
    setEditorValue(content)
    onChange(content)
  }

  // クライアントサイドでのみレンダリング
  if (!isClient) {
    return (
      <div className="h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-500">エディタを読み込み中...</span>
      </div>
    )
  }

  return (
    <div className="prose-editor">
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        theme="snow"
        style={style}
      />
    </div>
  )
} 
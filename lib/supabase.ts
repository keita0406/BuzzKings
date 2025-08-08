import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// クライアントサイド用
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// データベース型定義
export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  meta_description?: string
  thumbnail_url?: string
  status: 'draft' | 'published'
  category_id?: string
  author_id?: string
  published_at?: string
  created_at: string
  updated_at: string
  category?: BlogCategory
  tags?: BlogTag[]
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  created_at: string
  updated_at: string
} 
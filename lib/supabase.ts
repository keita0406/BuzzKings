import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// デバッグログは一度だけ表示
let loggedOnce = false
if (!loggedOnce) {
  console.log('[SUPABASE] Initializing client with:')
  console.log('  - URL:', supabaseUrl)
  console.log('  - ANON_KEY exists:', !!supabaseAnonKey)
  console.log('  - ANON_KEY length:', supabaseAnonKey?.length || 0)
  console.log('  - SERVICE_KEY exists:', !!supabaseServiceKey)
  loggedOnce = true
}

// シングルトンパターンでクライアント作成
let supabaseInstance: ReturnType<typeof createClient> | null = null
let supabaseAdminInstance: ReturnType<typeof createClient> | null = null

// クライアントサイド用（一般ユーザー）
export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false
      }
    })
  }
  return supabaseInstance
})()

// 管理者用（サーバーサイドまたは認証済み管理者）
export const supabaseAdmin = (() => {
  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createClient(
      supabaseUrl, 
      supabaseServiceKey || supabaseAnonKey, // Fallback to ANON_KEY if SERVICE_KEY is not available
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  }
  return supabaseAdminInstance
})()

// 初期化完了ログは一度だけ
if (!loggedOnce) {
  console.log('[SUPABASE] Clients created successfully')
}

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
  status: 'draft' | 'published' | 'archived'
  category_id?: string
  author_id?: string
  published_at?: string
  created_at: string
  updated_at: string
  view_count?: number
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
  updated_at: string
}

export interface BlogPostTag {
  id: string
  post_id: string
  tag_id: string
  created_at: string
} 
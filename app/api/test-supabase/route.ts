import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('[API] Testing Supabase connection...')
    console.log('[API] Environment variables:')
    console.log('  - NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('  - NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    // Test connection
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, status, published_at')
      .eq('status', 'published')
      .limit(3)

    console.log('[API] Query result - data:', data)
    console.log('[API] Query result - error:', error)

    if (error) {
      console.error('[API] Supabase error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      postsCount: data?.length || 0,
      posts: data,
      environment: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL
      }
    })

  } catch (error) {
    console.error('[API] Test failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
} 
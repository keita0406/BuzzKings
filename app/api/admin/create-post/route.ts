import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateAuthorSectionHTML } from '@/lib/authorData'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// フォールバック: SERVICE_ROLE_KEYが無効な場合、ANON_KEYを使用（開発環境のみ）
const effectiveKey = supabaseServiceKey && supabaseServiceKey.length > 100 
  ? supabaseServiceKey 
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('[API] Using Supabase with key type:', 
  effectiveKey === supabaseServiceKey ? 'SERVICE_ROLE' : 'ANON')

const supabaseAdmin = createClient(supabaseUrl, effectiveKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function POST(request: NextRequest) {
  try {
    console.log('[API] Create post request received')
    
    const requestData = await request.json()
    console.log('[API] Request data:', requestData)

    // 投稿データの検証
    const {
      title,
      slug,
      content,
      excerpt,
      meta_description,
      thumbnail_url,
      status,
      category_id,
      published_at,
      tags
    } = requestData

    if (!title || !slug || !content || !status) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています' },
        { status: 400 }
      )
    }

    // スラッグの重複チェックと調整
    let finalSlug = slug
    let slugCounter = 1
    
    while (true) {
      const { data: existingPosts, error: slugError } = await supabaseAdmin
        .from('blog_posts')
        .select('id')
        .eq('slug', finalSlug)
        .limit(1)

      if (slugError) {
        console.error('[API] Slug check error:', slugError)
        // エラーが発生した場合は元のスラッグを使用
        break
      }

      if (!existingPosts || existingPosts.length === 0) {
        break // スラッグが利用可能
      }

      // 重複している場合は番号を追加
      finalSlug = `${slug}-${slugCounter}`
      slugCounter++
      
      // 無限ループ防止
      if (slugCounter > 100) {
        finalSlug = `${slug}-${Date.now()}`
        break
      }
    }

    // 監修者セクションを記事内容の最後に自動追加（重複チェック）
    let contentWithAuthor = content
    if (!content.includes('author-section') && !content.includes('監修者セクション')) {
      const authorSectionHTML = generateAuthorSectionHTML()
      contentWithAuthor = content + '\n\n' + authorSectionHTML
    }

    // ブログ記事を作成
    const postData = {
      title,
      slug: finalSlug,
      content: contentWithAuthor,
      excerpt,
      meta_description,
      thumbnail_url,
      status,
      category_id,
      published_at: status === 'published' ? published_at || new Date().toISOString() : null
    }

    console.log('[API] Creating post with data:', postData)

    const { data: postResult, error: postError } = await supabaseAdmin
      .from('blog_posts')
      .insert([postData])
      .select()
      .single()

    if (postError) {
      console.error('[API] Post creation error:', postError)
      return NextResponse.json(
        { error: '記事の作成中にエラーが発生しました', details: postError },
        { status: 500 }
      )
    }

    console.log('[API] Post created successfully:', postResult)

    // タグの関連付け（存在する場合）
    if (tags && tags.length > 0 && postResult) {
      const tagRelations = tags.map((tagId: string) => ({
        post_id: postResult.id,
        tag_id: tagId
      }))

      const { error: tagError } = await supabaseAdmin
        .from('blog_post_tags')
        .insert(tagRelations)

      if (tagError) {
        console.error('[API] Tag relation error:', tagError)
        // タグエラーは非致命的なので、警告として処理
      }
    }

    return NextResponse.json({
      success: true,
      data: postResult
    })

  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json(
      { error: '予期しないエラーが発生しました' },
      { status: 500 }
    )
  }
} 
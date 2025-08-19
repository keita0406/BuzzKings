/**
 * BuzzLab コンテンツ自動生成 API
 * 自社RAGシステムを活用した高品質ブログ記事生成
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface GenerationRequest {
  topic: string
  categories: Array<{ id: string; name: string; slug: string }>
  tags: Array<{ id: string; name: string; slug: string }>
  requirements: {
    wordCount: number
    faqCount: number
    includeStructuredData: boolean
  }
}

interface GeneratedArticle {
  title: string
  slug: string
  content: string
  summary: string
  metaDescription: string
  categoryId: string
  tagIds: string[]
  thumbnailUrl?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json()
    const { topic, categories, tags, requirements } = body

    if (!topic) {
      return NextResponse.json({ 
        success: false, 
        error: 'トピックが必要です' 
      }, { status: 400 })
    }

    // Step 1: 自社RAGから関連情報を収集
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_SITE_URL 
      : 'http://localhost:3001'
    
    const ragResponse = await fetch(`${baseUrl}/api/rag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'query',
        question: `${topic}について詳細な情報を教えてください。専門的で実践的な内容をお願いします。`,
        userType: 'expert',
        maxResults: 10
      })
    })

    console.log('RAG Response status:', ragResponse.status, ragResponse.statusText)
    
    if (!ragResponse.ok) {
      const errorText = await ragResponse.text()
      console.error('RAG API error response:', errorText)
      throw new Error(`RAG API error: ${ragResponse.status} - ${ragResponse.statusText}`)
    }

    const ragData = await ragResponse.json()
    console.log('RAG Data received:', ragData.success ? 'Success' : 'Failed')
    
    if (!ragData.success) {
      throw new Error('RAGシステムからの情報収集に失敗しました')
    }

    // Step 2: OpenAI APIで高品質な記事を生成
    const systemPrompt = `あなたは日本のSNSマーケティング専門家です。BuzzLabの知識ベースを活用して、SEOに最適化された高品質なブログ記事を作成してください。

**絶対に禁止されること:**
- HTMLタグの使用（<div>、<a>、<svg>、<img>、<p>、<style>など全て禁止）
- 著者情報、監修者情報、プロフィール情報の記載
- SNSリンク、ソーシャルメディアボタンの生成
- JavaScriptコード、インラインスタイルの記載
- <!-- コメントタグ -->の使用
- <script>、<style>、<link>タグの使用
- 人物の名前、プロフィール、SNSアカウントの言及

**使用可能な形式:**
- マークダウン記法のみ（# ## ### #### - * など）
- プレーンテキスト
- 改行と段落分け

**記事の要件:**
- 文字数: ${requirements.wordCount}文字程度
- よくある質問: ${requirements.faqCount}個を記事内に自然に組み込む
- 読者に価値ある実践的な内容
- 専門用語は初心者にもわかりやすく解説
- 見出し構造を適切に使用（# ## ### のマークダウン記法）
- BuzzLabのサービスを自然に紹介（会社名のみ、人物名は不要）

**参考情報:**
${ragData.data.answer}

**関連ソース:**
${ragData.data.sources.map((s: any) => `- ${s.title}: ${s.content.substring(0, 200)}...`).join('\n')}

**トピック:** ${topic}

記事本文のみを生成してください。著者情報やプロフィールは一切不要です。`

    const contentPrompt = `上記の情報を基に、「${topic}」について${requirements.wordCount}文字程度の詳細な記事を作成してください。

**記事構成:**
1. 導入（問題提起・重要性）
2. 基本概念の説明
3. 具体的な手法・戦略（3-5項目）
4. よくある質問と回答（${requirements.faqCount}個）
5. BuzzLabのサービス紹介（テキストのみ）
6. まとめ・次のステップ

**重要事項:**
- 著者情報、監修者、プロフィールは一切含めない
- HTMLタグ、JavaScriptコード、インラインスタイルは使用禁止
- マークダウン形式の見出し（##, ###）のみ使用
- 記事本文に集中し、記事の最後に著者セクションやSNSリンクを追加しない
- プレーンテキストとマークダウンのみで構成

各セクションは適切な見出し（##, ###）を使用し、読みやすい構成にしてください。`

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-16k', // 長文対応モデル
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: contentPrompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      })
    })

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    const openaiData = await openaiResponse.json()
    let generatedContent = openaiData.choices[0]?.message?.content

    if (!generatedContent) {
      throw new Error('記事コンテンツの生成に失敗しました')
    }

    // 監修者セクションとHTMLコードを完全に除去
    generatedContent = generatedContent
      // 監修者セクション全体を削除（コメントから</div>まで）
      .replace(/<!-- 監修者セクション[\s\S]*?-->[\s\S]*?<\/div>/g, '')
      // author-sectionクラスを含むdiv全体を削除
      .replace(/<div[^>]*class[^>]*author-section[^>]*>[\s\S]*?<\/div>/g, '')
      // HTMLタグを全て削除
      .replace(/<[^>]+>/g, '')
      // HTMLエンティティをデコード
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // 監修者に関連するテキストも削除
      .replace(/監修者[\s\S]*?相談する/g, '')
      .replace(/盛[\s\S]*?啓太/g, '')
      .replace(/Ace Dream LLC/g, '')
      .replace(/総フォロワー[\s\S]*?人以上/g, '')
      // 複数の空行を単一の空行に
      .replace(/\n{3,}/g, '\n\n')
      // 先頭と末尾の空白を削除
      .trim()

    console.log('Content after HTML cleanup - length:', generatedContent.length)
    console.log('Content contains HTML tags:', /<[^>]+>/.test(generatedContent))
    console.log('Content contains 監修者:', /監修者/.test(generatedContent))

    // Step 3: メタデータ生成
    const metadataPrompt = `以下の記事に対して、SEOに最適化されたメタデータを生成してください:

記事内容: ${generatedContent.substring(0, 1000)}...

以下のJSON形式で出力してください:
{
  "title": "SEOに最適化されたタイトル（60文字以内、キーワード含む）",
  "summary": "記事の要約（150文字程度）",
  "metaDescription": "メタディスクリプション（120文字以内、魅力的で検索意図に合致）",
  "slug": "url-friendly-slug"
}`

    const metadataResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: metadataPrompt
          }
        ],
        max_tokens: 500,
        temperature: 0.3
      })
    })

    const metadataData = await metadataResponse.json()
    let metadata
    
    try {
      metadata = JSON.parse(metadataData.choices[0]?.message?.content || '{}')
    } catch {
      // フォールバック
      metadata = {
        title: `${topic} | BuzzLab`,
        summary: `${topic}について詳しく解説します。`,
        metaDescription: `${topic}の基本から実践まで、専門家が徹底解説。`,
        slug: topic.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
      }
    }

    // Step 4: カテゴリ自動選択
    const categoryKeywords = {
      'news': ['ニュース', '最新', 'トレンド', '動向'],
      'strategy': ['戦略', '分析', '手法', 'コツ', 'テクニック'],
      'content': ['コンテンツ', '投稿', '動画', '写真', '編集'],
      'advertising': ['広告', 'キャンペーン', 'プロモーション', '宣伝'],
      'influencer': ['インフルエンサー', 'pr', 'コラボ', '連携'],
      'case-studies': ['事例', '実績', '成功', '結果']
    }

    let selectedCategoryId = categories[0]?.id // デフォルト
    const contentLower = (topic + ' ' + generatedContent).toLowerCase()
    
    for (const category of categories) {
      const keywords = categoryKeywords[category.slug as keyof typeof categoryKeywords] || []
      const matchCount = keywords.filter(keyword => contentLower.includes(keyword)).length
      if (matchCount > 0) {
        selectedCategoryId = category.id
        break
      }
    }

    // Step 5: タグ自動選択
    const selectedTagIds: string[] = []
    const tagKeywords = {
      'sns': ['sns', 'ソーシャル'],
      'snsmarketing': ['マーケティング', '集客'],
      'ai': ['ai', '人工知能', '自動'],
      'beginner': ['初心者', '基本', '入門']
    }

    for (const tag of tags) {
      const keywords = tagKeywords[tag.slug as keyof typeof tagKeywords] || [tag.name.toLowerCase()]
      const matchCount = keywords.filter(keyword => contentLower.includes(keyword)).length
      if (matchCount > 0 && selectedTagIds.length < 5) {
        selectedTagIds.push(tag.id)
      }
    }

    // 最低1つのタグは追加
    if (selectedTagIds.length === 0 && tags.length > 0) {
      selectedTagIds.push(tags[0].id)
    }

    const article: GeneratedArticle = {
      title: metadata.title,
      slug: metadata.slug,
      content: generatedContent,
      summary: metadata.summary,
      metaDescription: metadata.metaDescription,
      categoryId: selectedCategoryId,
      tagIds: selectedTagIds
    }

    return NextResponse.json({
      success: true,
      article,
      ragSources: ragData.data.sources,
      processingTime: Date.now()
    })

  } catch (error) {
    console.error('Content generation error:', error)
    
    // エラーの詳細な情報をログに記録
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '記事生成中にエラーが発生しました',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    }, { status: 500 })
  }
} 
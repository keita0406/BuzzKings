import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // 一時的にAPIを無効化（テスト用）
    // const DISABLE_AI = true
    // if (DISABLE_AI) {
    //   return NextResponse.json(
    //     { error: 'AI機能は一時的に無効化されています' },
    //     { status: 503 }
    //   )
    // }

    // OpenAI API キーの確認
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set')
      return NextResponse.json(
        { error: 'OpenAI APIキーが設定されていません' },
        { status: 500 }
      )
    }

    // APIキーの形式チェック
    if (!process.env.OPENAI_API_KEY.startsWith('sk-proj-') && !process.env.OPENAI_API_KEY.startsWith('sk-')) {
      console.error('Invalid API key format')
      return NextResponse.json(
        { error: 'APIキーの形式が無効です' },
        { status: 500 }
      )
    }

    console.log('API Key format check passed, starts with:', process.env.OPENAI_API_KEY.substring(0, 10) + '...')

    const { content, title, type } = await request.json()
    console.log('API Request:', { contentLength: content?.length, title, type })

    if (!content || !type) {
      return NextResponse.json(
        { error: 'コンテンツと生成タイプが必要です' },
        { status: 400 }
      )
    }

    // HTMLタグを除去してプレーンテキストに
    const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    
    if (plainText.length < 50) {
      return NextResponse.json(
        { error: '記事本文が短すぎます。もう少し内容を書いてください。' },
        { status: 400 }
      )
    }

    let prompt = ''
    let maxTokens = 150

    if (type === 'meta_description') {
      prompt = `
以下のSNSマーケティング記事の内容を分析して、SEOに最適なメタディスクリプションを生成してください。

記事タイトル: ${title || ''}
記事本文: ${plainText.substring(0, 2000)}

要件:
- 120文字以内
- 検索エンジンでクリックされやすい魅力的な説明
- 記事の核心的な価値を簡潔に表現
- SNSマーケティングのキーワードを含める
- 読者のメリットを明確に示す

メタディスクリプションのみを出力してください。説明文は不要です。
`
      maxTokens = 80
    } else if (type === 'excerpt') {
      prompt = `
以下のSNSマーケティング記事の内容を分析して、記事概要（Excerpt）を生成してください。

記事タイトル: ${title || ''}
記事本文: ${plainText.substring(0, 2000)}

要件:
- 100-150文字程度
- 記事の要点を分かりやすくまとめる
- 読者が記事を読みたくなる魅力的な内容
- 記事の価値や学べることを明確に示す
- SNSマーケティングの専門用語を適度に使用
- メタディスクリプションとは異なる視点で

記事概要のみを出力してください。説明文は不要です。
`
      maxTokens = 100
    } else if (type === 'tags') {
      prompt = `
以下のSNSマーケティング記事の内容を分析して、適切なタグを生成してください。

記事タイトル: ${title || ''}
記事本文: ${plainText.substring(0, 2000)}

要件:
- 5-8個のタグ
- SNSマーケティング関連のキーワード
- 検索されやすい人気タグ
- 日本語で簡潔に
- 重複なし

例: SNS運用, インスタグラム, 広告戦略, マーケティング, フォロワー増加, コンテンツ制作

タグをカンマ区切りで出力してください。説明文は不要です。
`
      maxTokens = 100
    }

    console.log('Calling OpenAI API with prompt length:', prompt.length)
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "あなたはSNSマーケティングの専門家です。記事の内容を正確に理解し、SEOに最適化されたメタディスクリプションやタグを生成することができます。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    })

    console.log('OpenAI API response received')

    const result = completion.choices[0]?.message?.content?.trim()

    if (!result) {
      return NextResponse.json(
        { error: 'コンテンツの生成に失敗しました' },
        { status: 500 }
      )
    }

    if (type === 'tags') {
      // タグを配列に変換
      const tagsArray = result
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .slice(0, 8) // 最大8個まで

      return NextResponse.json({ result: tagsArray })
    }

    return NextResponse.json({ result })

  } catch (error) {
    console.error('OpenAI API Error:', error)
    
    // エラーの詳細をログに出力
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    // OpenAI APIエラーの詳細を確認
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as any
      console.error('OpenAI API response status:', apiError.response?.status)
      console.error('OpenAI API response data:', apiError.response?.data)
    }
    
    return NextResponse.json(
      { 
        error: 'AI生成中にエラーが発生しました',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
} 
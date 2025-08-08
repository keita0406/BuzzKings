import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function GET() {
  try {
    // OpenAI API キーの確認
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not set', hasKey: false },
        { status: 500 }
      )
    }

    console.log('Testing OpenAI API Key...')
    console.log('API Key starts with:', process.env.OPENAI_API_KEY.substring(0, 20) + '...')

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // シンプルなテストリクエスト
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Hello, please respond with just 'API working'"
        }
      ],
      max_tokens: 10,
      temperature: 0,
    })

    const result = completion.choices[0]?.message?.content?.trim()

    return NextResponse.json({
      success: true,
      hasKey: true,
      response: result,
      message: 'OpenAI API is working correctly'
    })

  } catch (error) {
    console.error('OpenAI Test Error:', error)
    
    // エラーの詳細をログに出力
    if (error instanceof Error) {
      console.error('Error message:', error.message)
    }
    
    // OpenAI APIエラーの詳細を確認
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as any
      console.error('OpenAI API response status:', apiError.response?.status)
      console.error('OpenAI API response data:', apiError.response?.data)
    }
    
    return NextResponse.json(
      { 
        success: false,
        hasKey: !!process.env.OPENAI_API_KEY,
        error: 'OpenAI API test failed',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
} 
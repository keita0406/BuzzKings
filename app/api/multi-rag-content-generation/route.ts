/**
 * マルチRAG自動記事生成API
 * 3つの異なるRAGシステムからの情報を統合して記事を生成
 */

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import KeitaSNSManualRAG from '@/lib/relevance-engineering/keita-sns-manual-rag'
import { simplifiedVectorizer } from '@/lib/relevance-engineering/simplified-vectorizer'
import { buzzKingsTriples } from '@/lib/relevance-engineering/semantic-triples'

// OpenAI設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

// 第3のRAG: 業界動向・競合分析データ（サンプル）
const industryInsightsData = [
  {
    id: 'industry-001',
    content: 'AI時代のSNSマーケティングでは、パーソナライゼーションが最重要。レリバンスエンジニアリングによる関連性最適化が必要。',
    category: '業界動向',
    importance: 5
  },
  {
    id: 'industry-002',
    content: '2024年のInstagramアルゴリズムは、動画コンテンツ（リール）を優先し、エンゲージメント率を重視している。',
    category: 'アルゴリズム変化',
    importance: 4
  },
  {
    id: 'industry-003',
    content: 'TikTokの成功要因は初動3秒のフック。競合他社も同様の戦略を採用し始めている。',
    category: '競合分析',
    importance: 4
  },
  {
    id: 'industry-004',
    content: 'Z世代マーケティングでは、認証性（オーセンティシティ）とストーリーテリングが効果的。',
    category: 'ターゲット分析',
    importance: 4
  },
  {
    id: 'industry-005',
    content: 'インフルエンサーマーケティングROIは平均5.2倍。マイクロインフルエンサーの方が高いエンゲージメント率。',
    category: 'ROI分析',
    importance: 5
  }
]

interface GenerationRequest {
  topic: string
  targetAudience?: string
  contentType?: 'blog' | 'social' | 'guide' | 'analysis'
  length?: 'short' | 'medium' | 'long'
  tone?: 'professional' | 'casual' | 'expert'
}

interface RAGResult {
  source: string
  relevantData: any
  insights: string[]
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerationRequest = await req.json()
    const { topic, targetAudience = 'SNSマーケティング担当者', contentType = 'blog', length = 'medium', tone = 'professional' } = body

    // 1. 自社RAG検索
    const companyRagResult = await searchCompanyRAG(topic)
    
    // 2. KEITA流SNSマニュアルRAG検索
    const keitaRAG = new KeitaSNSManualRAG()
    const snsManualResult = keitaRAG.searchRelevantEntries(topic, 5)
    
    // 3. 業界動向RAG検索
    const industryResult = searchIndustryInsights(topic)

    // 各RAGからの結果を統合
    const ragResults: RAGResult[] = [
      {
        source: '自社データ（BuzzLab）',
        relevantData: companyRagResult,
        insights: extractCompanyInsights(companyRagResult)
      },
      {
        source: 'KEITA流SNSマニュアル',
        relevantData: snsManualResult,
        insights: snsManualResult.map(entry => entry.content)
      },
      {
        source: '業界動向・競合分析',
        relevantData: industryResult,
        insights: industryResult.map(item => item.content)
      }
    ]

    // OpenAI GPT-4を使用して記事生成
    const generatedContent = await generateArticleWithMultiRAG(topic, ragResults, {
      targetAudience,
      contentType,
      length,
      tone
    })

    return NextResponse.json({
      success: true,
      topic,
      generatedContent,
      ragSources: ragResults.map(r => ({
        source: r.source,
        dataCount: r.relevantData.length,
        insights: r.insights.slice(0, 3) // 最初の3つのインサイトのみ表示
      })),
      metadata: {
        targetAudience,
        contentType,
        length,
        tone,
        generatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('マルチRAG記事生成エラー:', error)
    return NextResponse.json(
      { success: false, error: 'コンテンツ生成に失敗しました' },
      { status: 500 }
    )
  }
}

// 自社RAG検索（セマンティックトリプルとstaticDataを活用）
async function searchCompanyRAG(topic: string) {
  // セマンティックトリプルから関連情報を検索
  const relatedTriples = buzzKingsTriples.filter(triple => 
    triple.subject.includes('buzzlab') || 
    triple.subject.includes('keita-mori') ||
    triple.context?.toLowerCase().includes(topic.toLowerCase()) ||
    triple.object.toLowerCase().includes(topic.toLowerCase())
  )

  // 静的データも含める（簡易版）
  const companyData = {
    services: [
      'SNSマーケティング戦略',
      'フォロワー増加サービス',
      'バズ創出コンサルティング',
      '広告運用最適化'
    ],
    achievements: [
      '総フォロワー20万人以上',
      'イベント売上3億円超',
      '2万人動員実績'
    ]
  }

  return { triples: relatedTriples, company: companyData }
}

// 業界動向RAG検索
function searchIndustryInsights(topic: string) {
  return industryInsightsData.filter(item =>
    item.content.toLowerCase().includes(topic.toLowerCase()) ||
    item.category.toLowerCase().includes(topic.toLowerCase())
  ).sort((a, b) => b.importance - a.importance)
}

// 自社データからインサイト抽出
function extractCompanyInsights(companyData: any): string[] {
  const insights = []
  
  if (companyData.triples?.length > 0) {
    insights.push(`BuzzLabは${companyData.triples.length}件の実績・専門性データを保有`)
  }
  
  if (companyData.company?.achievements) {
    insights.push(`主要実績: ${companyData.company.achievements.join('、')}`)
  }
  
  if (companyData.company?.services) {
    insights.push(`提供サービス: ${companyData.company.services.join('、')}`)
  }
  
  return insights
}

// マルチRAG情報を使用した記事生成
async function generateArticleWithMultiRAG(
  topic: string,
  ragResults: RAGResult[],
  options: {
    targetAudience: string
    contentType: string
    length: string
    tone: string
  }
) {
  // 各RAGからのインサイトを整理
  const allInsights = ragResults.flatMap(result => result.insights)
  
  const lengthInstructions = {
    short: '1000文字程度の簡潔な',
    medium: '1500-2000文字程度の',
    long: '2500文字以上の詳細な'
  }

  const toneInstructions = {
    professional: 'ビジネス向けの専門的で信頼性の高い',
    casual: '親しみやすく読みやすい',
    expert: '業界の専門家向けの高度な'
  }

  const prompt = `
# マルチRAG情報統合記事生成

## 記事テーマ
${topic}

## ターゲット読者
${options.targetAudience}

## 記事スタイル
- タイプ: ${options.contentType}
- 長さ: ${lengthInstructions[options.length as keyof typeof lengthInstructions]}
- トーン: ${toneInstructions[options.tone as keyof typeof toneInstructions]}

## 利用可能な情報源

### 1. 自社データ（BuzzLab実績・専門性）
${ragResults[0]?.insights.join('\n') || '情報なし'}

### 2. KEITA流SNSマニュアル（実践ノウハウ）
${ragResults[1]?.insights.slice(0, 5).join('\n') || '情報なし'}

### 3. 業界動向・競合分析
${ragResults[2]?.insights.join('\n') || '情報なし'}

## 記事生成指示

以下の要件で記事を生成してください：

1. **導入部**: 読者の課題を明確化し、記事の価値を示す
2. **本文**: 3つの情報源から得られたインサイトを統合し、実践的なアドバイスを提供
3. **BuzzLab独自の視点**: 自社の実績と専門性を活かした独自の見解を含める
4. **KEITA流メソッド**: 実証済みのSNSマーケティング手法を具体的に紹介
5. **業界トレンド**: 最新の動向と今後の展望を示す
6. **結論**: 読者が今すぐ実行できるアクションプランを提示

## 重要な要求事項
- 3つの情報源をバランスよく活用する
- 具体的な数値や事例を含める
- 読者にとって実践的で価値のある内容にする
- BuzzLabの専門性と信頼性を自然に示す
- 売り込み感を避け、教育的な価値を重視する

記事を生成してください。
`

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "あなたはSNSマーケティングの専門家として、複数の情報源から得られたデータを統合し、読者にとって価値の高い記事を生成します。BuzzLabの専門性を活かしつつ、実践的で具体的なアドバイスを提供してください。"
      },
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 3000,
    temperature: 0.7,
  })

  return completion.choices[0]?.message?.content || 'コンテンツ生成に失敗しました。'
}

export async function GET() {
  return NextResponse.json({
    message: 'マルチRAG自動記事生成API',
    description: '3つのRAGシステムを使用した記事生成',
    ragSources: [
      '自社データ（BuzzLab実績・専門性）',
      'KEITA流SNSマニュアル（実践ノウハウ）',
      '業界動向・競合分析'
    ],
    usage: {
      method: 'POST',
      endpoint: '/api/multi-rag-content-generation',
      parameters: {
        topic: 'string (required)',
        targetAudience: 'string (optional)',
        contentType: 'blog | social | guide | analysis (optional)',
        length: 'short | medium | long (optional)',
        tone: 'professional | casual | expert (optional)'
      }
    }
  })
} 
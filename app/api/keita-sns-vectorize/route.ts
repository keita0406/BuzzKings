/**
 * KEITA流SNSマニュアル ベクトル化API
 * OpenAI Embeddings + Supabase PGVector統合
 */

import { NextRequest, NextResponse } from 'next/server'
import { vectorizeKeitaSNSManual, searchKeitaSNSManual, getKeitaSNSManualStats } from '@/lib/relevance-engineering/keita-sns-vectorizer'

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 KEITA流SNSマニュアルベクトル化API開始')
    
    const result = await vectorizeKeitaSNSManual()
    
    return NextResponse.json({
      success: result.success,
      message: result.success 
        ? `✅ KEITA流SNSマニュアルベクトル化完了: ${result.processedCount}件処理`
        : '❌ ベクトル化処理でエラーが発生しました',
      data: {
        processedCount: result.processedCount,
        processingTime: result.processingTime,
        errorsCount: result.errors.length,
        errors: result.errors.slice(0, 5) // 最初の5つのエラーのみ表示
      }
    })
    
  } catch (error) {
    console.error('ベクトル化APIエラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'ベクトル化処理に失敗しました',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')
    const action = searchParams.get('action')
    
    // 統計情報取得
    if (action === 'stats') {
      const stats = await getKeitaSNSManualStats()
      return NextResponse.json({
        success: true,
        stats,
        message: 'KEITA流SNSマニュアル統計情報'
      })
    }
    
    // 検索実行
    if (query) {
      const matchThreshold = parseFloat(searchParams.get('threshold') || '0.75')
      const matchCount = parseInt(searchParams.get('count') || '10')
      const filterCategory = searchParams.get('category') || undefined
      const includeDeepLinks = searchParams.get('deeplinks') === 'true'
      
      const searchResult = await searchKeitaSNSManual(query, {
        matchThreshold,
        matchCount,
        filterCategory,
        includeDeepLinks
      })
      
      return NextResponse.json({
        success: true,
        ...searchResult,
        message: `${searchResult.results.length}件の検索結果`
      })
    }
    
    // デフォルト: API情報
    return NextResponse.json({
      message: 'KEITA流SNSマニュアル ベクトル化API',
      description: 'OpenAI Embeddings + Supabase PGVectorを使用したKEITA流SNSマニュアルの検索システム',
      endpoints: {
        'POST /': 'ベクトル化実行 - 全102項目をOpenAI Embeddingsでベクトル化してSupabaseに保存',
        'GET /?query={query}': 'ベクトル検索実行 - 類似度検索で関連するSNSマニュアルを取得',
        'GET /?action=stats': '統計情報取得 - ベクトル化状況と統計データを確認'
      },
      features: [
        '✅ 102項目の完全ベクトル化',
        '🔍 セマンティック検索',
        '🔗 ディープリンク対応',
        '📊 リアルタイム統計',
        '🎯 カテゴリフィルター',
        '⚡ 高速類似度検索'
      ],
      searchParameters: {
        query: 'string (required) - 検索クエリ',
        threshold: 'number (optional, default: 0.75) - 類似度閾値',
        count: 'number (optional, default: 10) - 取得件数',
        category: 'string (optional) - カテゴリフィルター',
        deeplinks: 'boolean (optional) - ディープリンク含める'
      }
    })
    
  } catch (error) {
    console.error('API取得エラー:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'API処理に失敗しました',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
} 
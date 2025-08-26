/**
 * KEITA流SNSマニュアル ベクトル化システム
 * OpenAI Embeddings API + Supabase PGVector連携
 * ディープリンク対応
 */

import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { keitaSNSManualData, SNSManualEntry } from './keita-sns-manual-rag'

// OpenAI設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

// Supabase設定
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ベクトル化された SNSマニュアルエントリー
export interface VectorizedSNSEntry {
  id: string
  type: 'keita-sns-manual'
  title: string
  content: string
  metadata: {
    category: string
    tags: string[]
    importance: number
    originalId: string
    deepLink: string
    entities: string[]
    semanticContext: string[]
    lastUpdated: string
    relevanceScore: number
  }
  vector?: number[]
  clusterId?: string
}

// ディープリンク生成
function generateDeepLink(entry: SNSManualEntry): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://buzzlab8.jp'
  const categorySlug = entry.category.toLowerCase()
    .replace(/[^\w\s-]/g, '') // 特殊文字を除去
    .replace(/\s+/g, '-') // スペースをハイフンに
  
  return `${baseUrl}/keita-sns-manual/${categorySlug}/${entry.id}`
}

// エンティティ抽出（簡易版）
function extractEntities(content: string, tags: string[]): string[] {
  const entities = new Set<string>()
  
  // タグをエンティティとして追加
  tags.forEach(tag => entities.add(tag))
  
  // 一般的なSNSキーワードを抽出
  const snsKeywords = [
    'Instagram', 'TikTok', 'YouTube', 'SNS', 'バズ', 'フォロワー', 
    'エンゲージメント', '広告', 'コンテンツ', '動画', 'ストーリー',
    'ライブ', 'アルゴリズム', '収益化', 'ファン化', '継続', '投稿'
  ]
  
  snsKeywords.forEach(keyword => {
    if (content.includes(keyword)) {
      entities.add(keyword)
    }
  })
  
  return Array.from(entities)
}

// セマンティックコンテキスト生成
function generateSemanticContext(entry: SNSManualEntry): string[] {
  const contexts = []
  
  // カテゴリベースのコンテキスト
  contexts.push(`SNSマーケティング_${entry.category}`)
  
  // 重要度ベースのコンテキスト
  if (entry.importance >= 5) contexts.push('高重要度_実践的ノウハウ')
  else if (entry.importance >= 4) contexts.push('重要_推奨手法')
  else contexts.push('基本_参考情報')
  
  // コンテンツベースのコンテキスト
  if (entry.content.includes('バズ')) contexts.push('バズ創出_戦略')
  if (entry.content.includes('収益化')) contexts.push('収益最適化_手法')
  if (entry.content.includes('継続')) contexts.push('継続運用_重要性')
  if (entry.content.includes('アルゴリズム')) contexts.push('アルゴリズム_理解')
  
  return contexts
}

// SNSマニュアルエントリーをベクトル化フォーマットに変換
function convertToVectorizedEntry(entry: SNSManualEntry): VectorizedSNSEntry {
  const entities = extractEntities(entry.content, entry.tags)
  const semanticContext = generateSemanticContext(entry)
  const deepLink = generateDeepLink(entry)
  
  return {
    id: `keita-sns-${entry.id}`,
    type: 'keita-sns-manual',
    title: `KEITA流 ${entry.category}: ${entry.content.substring(0, 50)}...`,
    content: entry.content,
    metadata: {
      category: entry.category,
      tags: entry.tags,
      importance: entry.importance,
      originalId: entry.id,
      deepLink,
      entities,
      semanticContext,
      lastUpdated: new Date().toISOString(),
      relevanceScore: entry.importance / 5 // 0-1のスコアに正規化
    }
  }
}

// OpenAI Embeddings APIでベクトル化
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float',
    })
    
    return response.data[0].embedding
  } catch (error) {
    console.error('Embedding生成エラー:', error)
    throw error
  }
}

// Supabaseに保存
async function saveToSupabase(entries: VectorizedSNSEntry[]): Promise<void> {
  try {
    const { error } = await supabase
      .from('buzzlab_vectors')
      .upsert(entries.map(entry => ({
        id: entry.id,
        type: entry.type,
        title: entry.title,
        content: entry.content,
        metadata: entry.metadata,
        vector: entry.vector,
        cluster_id: entry.clusterId || 'keita-sns-manual',
        updated_at: new Date().toISOString()
      })))
    
    if (error) {
      throw error
    }
    
    console.log(`✅ ${entries.length}件のKEITA流SNSマニュアルをSupabaseに保存しました`)
  } catch (error) {
    console.error('Supabase保存エラー:', error)
    throw error
  }
}

// バッチ処理でベクトル化実行
export async function vectorizeKeitaSNSManual(): Promise<{
  success: boolean
  processedCount: number
  errors: string[]
  processingTime: number
}> {
  const startTime = Date.now()
  const errors: string[] = []
  let processedCount = 0
  
  try {
    console.log('🚀 KEITA流SNSマニュアルベクトル化開始...')
    console.log(`📋 処理対象: ${keitaSNSManualData.length}件`)
    
    // データ変換
    const vectorizedEntries = keitaSNSManualData.map(convertToVectorizedEntry)
    console.log('✅ データ変換完了')
    
    // バッチサイズ設定（OpenAI APIの制限を考慮）
    const batchSize = 20
    const batches = []
    for (let i = 0; i < vectorizedEntries.length; i += batchSize) {
      batches.push(vectorizedEntries.slice(i, i + batchSize))
    }
    
    console.log(`📦 ${batches.length}バッチに分割`)
    
    // バッチごとにベクトル化実行
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      console.log(`🔄 バッチ ${i + 1}/${batches.length} 処理中... (${batch.length}件)`)
      
      try {
        // 各エントリーのベクトル化
        for (const entry of batch) {
          try {
            // ベクトル化用テキスト作成
            const embeddingText = `
              ${entry.title}
              ${entry.content}
              カテゴリ: ${entry.metadata.category}
              タグ: ${entry.metadata.tags.join(', ')}
              重要度: ${entry.metadata.importance}
            `.trim()
            
            // ベクトル化実行
            entry.vector = await generateEmbedding(embeddingText)
            processedCount++
            
            // レート制限対策（短時間待機）
            await new Promise(resolve => setTimeout(resolve, 100))
            
          } catch (error) {
            const errorMsg = `エントリー ${entry.id} のベクトル化エラー: ${error}`
            console.error(errorMsg)
            errors.push(errorMsg)
          }
        }
        
        // バッチをSupabaseに保存
        const successfulEntries = batch.filter(entry => entry.vector)
        if (successfulEntries.length > 0) {
          await saveToSupabase(successfulEntries)
        }
        
        console.log(`✅ バッチ ${i + 1} 完了 (${successfulEntries.length}/${batch.length}件成功)`)
        
        // バッチ間の待機（API制限対策）
        if (i < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
        
      } catch (error) {
        const errorMsg = `バッチ ${i + 1} 処理エラー: ${error}`
        console.error(errorMsg)
        errors.push(errorMsg)
      }
    }
    
    const processingTime = Date.now() - startTime
    
    console.log('\n🎉 KEITA流SNSマニュアルベクトル化完了!')
    console.log(`📊 処理結果: ${processedCount}/${keitaSNSManualData.length}件成功`)
    console.log(`⏱️ 処理時間: ${Math.round(processingTime / 1000)}秒`)
    console.log(`❌ エラー数: ${errors.length}件`)
    
    return {
      success: processedCount > 0,
      processedCount,
      errors,
      processingTime
    }
    
  } catch (error) {
    const errorMsg = `ベクトル化処理全体エラー: ${error}`
    console.error(errorMsg)
    errors.push(errorMsg)
    
    return {
      success: false,
      processedCount,
      errors,
      processingTime: Date.now() - startTime
    }
  }
}

// ベクトル検索実行
export async function searchKeitaSNSManual(
  query: string,
  options: {
    matchThreshold?: number
    matchCount?: number
    filterCategory?: string
    includeDeepLinks?: boolean
  } = {}
): Promise<{
  results: Array<{
    id: string
    title: string
    content: string
    category: string
    tags: string[]
    importance: number
    similarity: number
    deepLink?: string
    metadata: any
  }>
  query: string
  processingTime: number
}> {
  const startTime = Date.now()
  
  try {
    // クエリをベクトル化
    const queryVector = await generateEmbedding(query)
    
    // Supabaseで類似検索実行
    const { data, error } = await supabase.rpc('match_buzzlab_vectors', {
      query_embedding: queryVector,
      match_threshold: options.matchThreshold || 0.75,
      match_count: options.matchCount || 10,
      filter_type: 'keita-sns-manual'
    })
    
    if (error) {
      throw error
    }
    
    // 結果をフォーマット
    const results = (data || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      category: item.metadata.category,
      tags: item.metadata.tags || [],
      importance: item.metadata.importance || 0,
      similarity: item.similarity,
      deepLink: options.includeDeepLinks ? item.metadata.deepLink : undefined,
      metadata: item.metadata
    }))
    
    // カテゴリフィルター適用
    const filteredResults = options.filterCategory
      ? results.filter((r: any) => r.category === options.filterCategory)
      : results
    
    return {
      results: filteredResults,
      query,
      processingTime: Date.now() - startTime
    }
    
  } catch (error) {
    console.error('KEITA流SNSマニュアル検索エラー:', error)
    throw error
  }
}

// ディープリンクルーティング用の関数
export function parseDeepLink(url: string): {
  category: string
  entryId: string
  isValid: boolean
} {
  try {
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/').filter(Boolean)
    
    // /keita-sns-manual/{category}/{entryId} の形式を期待
    if (pathParts.length >= 3 && pathParts[0] === 'keita-sns-manual') {
      return {
        category: pathParts[1],
        entryId: pathParts[2],
        isValid: true
      }
    }
    
    return { category: '', entryId: '', isValid: false }
    
  } catch (error) {
    return { category: '', entryId: '', isValid: false }
  }
}

// 統計情報取得
export async function getKeitaSNSManualStats(): Promise<{
  totalEntries: number
  categories: string[]
  averageImportance: number
  vectorizedCount: number
  lastUpdated: string
}> {
  try {
    const { data, error } = await supabase
      .from('buzzlab_vectors')
      .select('metadata, created_at')
      .eq('type', 'keita-sns-manual')
    
    if (error) throw error
    
    const categoriesSet = new Set((data || []).map(item => item.metadata.category))
    const categories = Array.from(categoriesSet)
    const totalImportance = (data || []).reduce((sum, item) => sum + (item.metadata.importance || 0), 0)
    const averageImportance = totalImportance / (data || []).length
    
    return {
      totalEntries: keitaSNSManualData.length,
      categories,
      averageImportance,
      vectorizedCount: (data || []).length,
      lastUpdated: Math.max(...(data || []).map(item => new Date(item.created_at).getTime())).toString()
    }
    
  } catch (error) {
    console.error('統計情報取得エラー:', error)
    throw error
  }
}

export default {
  vectorizeKeitaSNSManual,
  searchKeitaSNSManual,
  parseDeepLink,
  getKeitaSNSManualStats
} 
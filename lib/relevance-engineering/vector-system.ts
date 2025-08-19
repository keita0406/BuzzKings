/**
 * BuzzLab ベクトル化システム
 * OpenAI Embeddings API × Supabase PGVector 連携
 */

import { createClient } from '@supabase/supabase-js'
import { Entity } from './entity-mapping'
import { TopicCluster } from './topic-clusters'

// ベクトル化対象コンテンツの型定義
export interface VectorContent {
  id: string
  type: 'entity' | 'cluster' | 'page' | 'blog' | 'faq' | 'service' | 'about' | 'component'
  title: string
  content: string
  metadata: {
    entities: string[]
    keywords: string[]
    semanticContext: string[]
    url?: string
    lastUpdated: string
    relevanceScore: number
  }
  vector?: number[] // OpenAI embeddings
  clusterId?: string // 所属クラスター
}

// ベクトル検索結果の型定義
export interface VectorSearchResult {
  content: VectorContent
  similarity: number
  rank: number
}

// OpenAI Embeddings設定
export interface EmbeddingConfig {
  apiKey: string
  model: 'text-embedding-3-small' | 'text-embedding-3-large' | 'text-embedding-ada-002'
  dimensions?: number // text-embedding-3-*のみ
  batchSize: number
}

// Supabase PGVector設定
export interface VectorDBConfig {
  supabaseUrl: string
  supabaseKey: string
  tableName: string
  vectorDimension: number
}

class BuzzKingsVectorSystem {
  private supabase: any
  private embeddingConfig: EmbeddingConfig
  private vectorDBConfig: VectorDBConfig

  constructor(embeddingConfig: EmbeddingConfig, vectorDBConfig: VectorDBConfig) {
    this.embeddingConfig = embeddingConfig
    this.vectorDBConfig = vectorDBConfig
    this.supabase = createClient(vectorDBConfig.supabaseUrl, vectorDBConfig.supabaseKey)
  }

  // OpenAI Embeddings APIでテキストをベクトル化
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.embeddingConfig.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: text,
          model: this.embeddingConfig.model,
          ...(this.embeddingConfig.dimensions && { dimensions: this.embeddingConfig.dimensions })
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.data[0].embedding
    } catch (error) {
      console.error('Embedding generation failed:', error)
      throw error
    }
  }

  // バッチでテキストをベクトル化
  async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    const batches = []
    for (let i = 0; i < texts.length; i += this.embeddingConfig.batchSize) {
      batches.push(texts.slice(i, i + this.embeddingConfig.batchSize))
    }

    const allEmbeddings: number[][] = []
    
    for (const batch of batches) {
      try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.embeddingConfig.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: batch,
            model: this.embeddingConfig.model,
            ...(this.embeddingConfig.dimensions && { dimensions: this.embeddingConfig.dimensions })
          })
        })

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.statusText}`)
        }

        const data = await response.json()
        const batchEmbeddings = data.data.map((item: any) => item.embedding)
        allEmbeddings.push(...batchEmbeddings)
      } catch (error) {
        console.error('Batch embedding generation failed:', error)
        throw error
      }
    }

    return allEmbeddings
  }

  // エンティティをベクトル化用テキストに変換
  entityToText(entity: Entity): string {
    return `${entity.name}: ${entity.description}. タイプ: ${entity.type}. 関連: ${entity.relatedEntities.join(', ')}`
  }

  // トピッククラスターをベクトル化用テキストに変換
  clusterToText(cluster: TopicCluster): string {
    const pillar = cluster.pillarPage
    return `${cluster.name}: ${pillar.description}. キーワード: ${cluster.targetKeywords.join(', ')}. セマンティック: ${cluster.semanticKeywords.join(', ')}. オーディエンス: ${pillar.targetAudience.join(', ')}`
  }

  // ページコンテンツをベクトル化用テキストに変換
  pageToText(title: string, content: string, metadata: any): string {
    const entities = metadata.entities?.join(', ') || ''
    const keywords = metadata.keywords?.join(', ') || ''
    return `${title}: ${content}. エンティティ: ${entities}. キーワード: ${keywords}`
  }

  // コンテンツをベクトル化してPGVectorに保存
  async vectorizeAndStore(content: VectorContent): Promise<void> {
    try {
      // テキストをベクトル化
      const combinedText = this.pageToText(content.title, content.content, content.metadata)
      const vector = await this.generateEmbedding(combinedText)
      
      // PGVectorに保存
      const { error } = await this.supabase
        .from(this.vectorDBConfig.tableName)
        .upsert({
          id: content.id,
          type: content.type,
          title: content.title,
          content: content.content,
          metadata: content.metadata,
          vector: JSON.stringify(vector), // PGVectorの形式に合わせて調整が必要な場合があります
          cluster_id: content.clusterId,
          created_at: new Date().toISOString()
        })

      if (error) {
        throw new Error(`Supabase storage error: ${error.message}`)
      }

      console.log(`Content vectorized and stored: ${content.id}`)
    } catch (error) {
      console.error('Vectorization and storage failed:', error)
      throw error
    }
  }

  // バッチでコンテンツをベクトル化して保存
  async vectorizeAndStoreBatch(contents: VectorContent[]): Promise<void> {
    const texts = contents.map(content => 
      this.pageToText(content.title, content.content, content.metadata)
    )
    
    const vectors = await this.generateBatchEmbeddings(texts)
    
    const records = contents.map((content, index) => ({
      id: content.id,
      type: content.type,
      title: content.title,
      content: content.content,
      metadata: content.metadata,
      vector: JSON.stringify(vectors[index]),
      cluster_id: content.clusterId,
      created_at: new Date().toISOString()
    }))

    const { error } = await this.supabase
      .from(this.vectorDBConfig.tableName)
      .upsert(records)

    if (error) {
      throw new Error(`Batch storage error: ${error.message}`)
    }

    console.log(`${contents.length} contents vectorized and stored`)
  }

  // ベクトル類似検索
  async searchSimilar(
    query: string, 
    limit: number = 10,
    threshold: number = 0.7,
    filterType?: string,
    filterCluster?: string
  ): Promise<VectorSearchResult[]> {
    try {
      // クエリをベクトル化
      const queryVector = await this.generateEmbedding(query)
      
      // PGVectorで類似検索（実際のクエリはSupabaseのPGVector拡張の仕様に合わせて調整が必要）
      let supabaseQuery = this.supabase
        .from(this.vectorDBConfig.tableName)
        .select('*')
        .limit(limit)

      // フィルタ適用
      if (filterType) {
        supabaseQuery = supabaseQuery.eq('type', filterType)
      }
      if (filterCluster) {
        supabaseQuery = supabaseQuery.eq('cluster_id', filterCluster)
      }

      // 注意: 実際のベクトル類似検索のクエリはSupabaseのPGVector実装に依存します
      // 以下は疑似コードです
      const { data, error } = await supabaseQuery

      if (error) {
        throw new Error(`Vector search error: ${error.message}`)
      }

      // コサイン類似度計算（本来はPGVectorで行う）
      const results: VectorSearchResult[] = []
      
      for (const item of data || []) {
        const itemVector = JSON.parse(item.vector)
        const similarity = this.calculateCosineSimilarity(queryVector, itemVector)
        
        if (similarity >= threshold) {
          results.push({
            content: {
              id: item.id,
              type: item.type,
              title: item.title,
              content: item.content,
              metadata: item.metadata,
              clusterId: item.cluster_id
            },
            similarity,
            rank: 0 // 後でソート時に設定
          })
        }
      }

      // 類似度順にソート
      results.sort((a, b) => b.similarity - a.similarity)
      results.forEach((result, index) => {
        result.rank = index + 1
      })

      return results
    } catch (error) {
      console.error('Vector search failed:', error)
      throw error
    }
  }

  // コサイン類似度計算
  private calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) {
      throw new Error('Vectors must have the same length')
    }

    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i]
      normA += vecA[i] * vecA[i]
      normB += vecB[i] * vecB[i]
    }

    normA = Math.sqrt(normA)
    normB = Math.sqrt(normB)

    if (normA === 0 || normB === 0) {
      return 0
    }

    return dotProduct / (normA * normB)
  }

  // エンティティベースの関連コンテンツ検索
  async findRelatedByEntity(entityId: string, limit: number = 5): Promise<VectorSearchResult[]> {
    const { data, error } = await this.supabase
      .from(this.vectorDBConfig.tableName)
      .select('*')
      .contains('metadata->entities', [entityId])
      .limit(limit)

    if (error) {
      throw new Error(`Entity-based search error: ${error.message}`)
    }

    return (data || []).map((item: any, index: number) => ({
      content: {
        id: item.id,
        type: item.type,
        title: item.title,
        content: item.content,
        metadata: item.metadata,
        clusterId: item.cluster_id
      },
      similarity: item.metadata?.relevanceScore || 0.8,
      rank: index + 1
    }))
  }

  // クラスター内コンテンツ検索
  async searchWithinCluster(clusterId: string, query: string, limit: number = 5): Promise<VectorSearchResult[]> {
    return this.searchSimilar(query, limit, 0.6, undefined, clusterId)
  }

  // レリバンス分析
  async analyzeContentRelevance(contentId: string): Promise<{
    entityAlignment: number
    clusterCoherence: number
    semanticStrength: number
    overallRelevance: number
  }> {
    const { data, error } = await this.supabase
      .from(this.vectorDBConfig.tableName)
      .select('*')
      .eq('id', contentId)
      .single()

    if (error || !data) {
      throw new Error('Content not found for relevance analysis')
    }

    // エンティティ整合性スコア
    const entityAlignment = data.metadata?.entities?.length > 0 ? 0.9 : 0.3

    // クラスター一貫性スコア
    const clusterCoherence = data.cluster_id ? 0.8 : 0.5

    // セマンティック強度スコア（仮想的な計算）
    const semanticStrength = data.metadata?.semanticContext?.length > 0 ? 0.85 : 0.4

    const overallRelevance = (entityAlignment + clusterCoherence + semanticStrength) / 3

    return {
      entityAlignment,
      clusterCoherence,
      semanticStrength,
      overallRelevance
    }
  }

  // データベース初期化（テーブル作成）
  async initializeVectorDB(): Promise<void> {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS ${this.vectorDBConfig.tableName} (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        metadata JSONB,
        vector vector(${this.vectorDBConfig.vectorDimension}),
        cluster_id TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS ${this.vectorDBConfig.tableName}_vector_idx 
      ON ${this.vectorDBConfig.tableName} 
      USING ivfflat (vector vector_cosine_ops);
      
      CREATE INDEX IF NOT EXISTS ${this.vectorDBConfig.tableName}_type_idx 
      ON ${this.vectorDBConfig.tableName} (type);
      
      CREATE INDEX IF NOT EXISTS ${this.vectorDBConfig.tableName}_cluster_idx 
      ON ${this.vectorDBConfig.tableName} (cluster_id);
    `

    const { error } = await this.supabase.rpc('exec_sql', { sql: createTableSQL })
    
    if (error) {
      console.error('Database initialization failed:', error)
      throw error
    }

    console.log('Vector database initialized successfully')
  }
}

// デフォルト設定
export const defaultEmbeddingConfig: EmbeddingConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  model: 'text-embedding-3-small',
  dimensions: 1536,
  batchSize: 100
}

export const defaultVectorDBConfig: VectorDBConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  tableName: 'buzzlab_vectors',
  vectorDimension: 1536
}

// シングルトンインスタンス
export const buzzKingsVectorSystem = new BuzzKingsVectorSystem(
  defaultEmbeddingConfig,
  defaultVectorDBConfig
)

export default BuzzKingsVectorSystem 
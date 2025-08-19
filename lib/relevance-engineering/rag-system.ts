/**
 * BuzzLab RAG (Retrieval-Augmented Generation) システム
 * PGVectorベースの自社専用AIアシスタント
 */

import { buzzKingsVectorSystem, VectorSearchResult } from './vector-system'
import { buzzKingsEntityMap } from './entity-mapping'
import { buzzKingsTopicClusters } from './topic-clusters'

export interface RAGQuery {
  question: string
  context?: string
  userType?: 'client' | 'prospect' | 'partner' | 'internal'
  preferredLanguage?: 'ja' | 'en'
  includeEntities?: boolean
  maxResults?: number
  confidenceThreshold?: number
}

export interface RAGResponse {
  answer: string
  sources: RAGSource[]
  confidence: number
  relatedTopics: string[]
  suggestedQuestions: string[]
  entityContext: EntityContext[]
  processingTime: number
}

export interface RAGSource {
  id: string
  title: string
  content: string
  url?: string
  type: 'page' | 'blog' | 'service' | 'entity' | 'faq' | 'cluster' | 'about' | 'component'
  relevanceScore: number
  clusterId?: string
}

export interface EntityContext {
  id: string
  name: string
  type: string
  relevance: number
  description: string
}

export interface RAGSystemConfig {
  maxContextLength: number
  defaultMaxResults: number
  confidenceThreshold: number
  entityRelevanceThreshold: number
  enableMemory: boolean
  responseStyle: 'professional' | 'casual' | 'technical'
}

class BuzzKingsRAGSystem {
  private config: RAGSystemConfig
  private conversationMemory: Map<string, RAGQuery[]> = new Map()

  constructor(config: RAGSystemConfig) {
    this.config = config
  }

  // メインのRAG処理
  async query(query: RAGQuery, sessionId?: string): Promise<RAGResponse> {
    const startTime = Date.now()

    try {
      // 1. 質問の前処理と拡張
      const expandedQuery = await this.expandQuery(query)

      // 2. ベクトル検索でコンテンツ取得
      const searchResults = await this.retrieveRelevantContent(expandedQuery)

      // 3. エンティティコンテキスト抽出
      const entityContext = this.extractEntityContext(searchResults, query.question)

      // 4. コンテキストの構築
      const context = this.buildContext(searchResults, entityContext, query)

      // 5. 回答生成
      const answer = await this.generateAnswer(query, context, searchResults)

      // 6. 関連トピックと追加質問の提案
      const relatedTopics = this.extractRelatedTopics(searchResults)
      const suggestedQuestions = this.generateSuggestedQuestions(query, searchResults)

      // 7. 会話履歴の保存
      if (sessionId && this.config.enableMemory) {
        this.saveToMemory(sessionId, query)
      }

      const response: RAGResponse = {
        answer,
        sources: this.formatSources(searchResults),
        confidence: this.calculateConfidence(searchResults, answer),
        relatedTopics,
        suggestedQuestions,
        entityContext,
        processingTime: Date.now() - startTime
      }

      return response

    } catch (error) {
      console.error('RAG処理エラー:', error)
      return this.generateErrorResponse(query, Date.now() - startTime)
    }
  }

  // 質問の拡張と最適化
  private async expandQuery(query: RAGQuery): Promise<string> {
    let expandedQuery = query.question

    // エンティティ名の正規化
    Object.values(buzzKingsEntityMap).forEach(entity => {
      const regex = new RegExp(entity.name, 'gi')
      if (expandedQuery.match(regex)) {
        expandedQuery += ` ${entity.description}`
      }
    })

    // クラスター関連キーワードの追加
    Object.values(buzzKingsTopicClusters).forEach(cluster => {
      cluster.targetKeywords.forEach(keyword => {
        if (expandedQuery.toLowerCase().includes(keyword.toLowerCase())) {
          expandedQuery += ` ${cluster.semanticKeywords.join(' ')}`
        }
      })
    })

    // コンテキストの追加
    if (query.context) {
      expandedQuery += ` コンテキスト: ${query.context}`
    }

    return expandedQuery
  }

  // 関連コンテンツの検索
  private async retrieveRelevantContent(query: string): Promise<VectorSearchResult[]> {
    const searchResults = await buzzKingsVectorSystem.searchSimilar(
      query,
      this.config.defaultMaxResults,
      this.config.confidenceThreshold
    )

    // 結果の多様性を確保（同じタイプのコンテンツが偏らないように）
    const diversifiedResults = this.diversifyResults(searchResults)

    return diversifiedResults
  }

  // 結果の多様化
  private diversifyResults(results: VectorSearchResult[]): VectorSearchResult[] {
    const diversified: VectorSearchResult[] = []
    const typeCount = new Map<string, number>()

    for (const result of results) {
      const type = result.content.type
      const currentCount = typeCount.get(type) || 0
      
      // 各タイプ最大3件まで
      if (currentCount < 3) {
        diversified.push(result)
        typeCount.set(type, currentCount + 1)
      }
    }

    return diversified
  }

  // エンティティコンテキストの抽出
  private extractEntityContext(searchResults: VectorSearchResult[], question: string): EntityContext[] {
    const entityContext: EntityContext[] = []
    const mentionedEntities = new Set<string>()

    // 検索結果からエンティティを抽出
    searchResults.forEach(result => {
      result.content.metadata.entities.forEach(entityId => {
        if (!mentionedEntities.has(entityId)) {
          const entity = buzzKingsEntityMap[entityId]
          if (entity && entity.importance >= this.config.entityRelevanceThreshold) {
            entityContext.push({
              id: entityId,
              name: entity.name,
              type: entity.type,
              relevance: entity.importance * result.similarity,
              description: entity.description
            })
            mentionedEntities.add(entityId)
          }
        }
      })
    })

    // 質問文に直接言及されているエンティティも追加
    Object.entries(buzzKingsEntityMap).forEach(([id, entity]) => {
      if (question.toLowerCase().includes(entity.name.toLowerCase()) && !mentionedEntities.has(id)) {
        entityContext.push({
          id,
          name: entity.name,
          type: entity.type,
          relevance: entity.importance,
          description: entity.description
        })
      }
    })

    return entityContext.sort((a, b) => b.relevance - a.relevance).slice(0, 5)
  }

  // コンテキストの構築
  private buildContext(
    searchResults: VectorSearchResult[], 
    entityContext: EntityContext[], 
    query: RAGQuery
  ): string {
    let context = ''

    // エンティティ情報
    if (query.includeEntities && entityContext.length > 0) {
      context += '【関連エンティティ】\n'
      entityContext.forEach(entity => {
        context += `- ${entity.name} (${entity.type}): ${entity.description}\n`
      })
      context += '\n'
    }

    // 検索結果のコンテンツ
    context += '【関連コンテンツ】\n'
    searchResults.slice(0, 5).forEach((result, index) => {
      context += `${index + 1}. ${result.content.title}\n`
      context += `${result.content.content.substring(0, 300)}...\n`
      if (result.content.metadata.url) {
        context += `URL: ${result.content.metadata.url}\n`
      }
      context += '\n'
    })

    // コンテキストの長さ制限
    if (context.length > this.config.maxContextLength) {
      context = context.substring(0, this.config.maxContextLength) + '...'
    }

    return context
  }

  // 回答生成（OpenAI APIを使用）
  private async generateAnswer(
    query: RAGQuery, 
    context: string, 
    searchResults: VectorSearchResult[]
  ): Promise<string> {
    try {
      // OpenAI APIを使用した回答生成
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // 安いモデルを使用
          messages: [
            {
              role: 'system',
              content: query.question // システムプロンプトとして質問を使用（システムプロンプトが含まれている）
            },
            {
              role: 'user',
              content: `以下の情報を参考にして回答してください：\n\n${context}`
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || 'すみません、回答を生成できませんでした。'
    } catch (error) {
      console.error('Error generating answer with OpenAI:', error)
      // フォールバック：簡易的な回答生成
      const baseAnswer = this.generateBaseAnswer(query, searchResults)
      return this.adjustAnswerStyle(baseAnswer, query.userType)
    }
  }

  // 基本回答の生成
  private generateBaseAnswer(query: RAGQuery, searchResults: VectorSearchResult[]): string {
    const topResult = searchResults[0]
    if (!topResult) {
      return '申し訳ございませんが、該当する情報が見つかりませんでした。別の表現でお試しください。'
    }

    const serviceKeywords = ['サービス', 'service', '料金', '価格', '費用']
    const aboutKeywords = ['会社', '代表', '盛啓太', 'BuzzLab', '実績']
    const howtoKeywords = ['方法', 'やり方', 'how', 'どうやって', 'どのように']

    const question = query.question.toLowerCase()

    if (serviceKeywords.some(keyword => question.includes(keyword))) {
      return this.generateServiceAnswer(searchResults)
    } else if (aboutKeywords.some(keyword => question.includes(keyword))) {
      return this.generateAboutAnswer(searchResults)
    } else if (howtoKeywords.some(keyword => question.includes(keyword))) {
      return this.generateHowToAnswer(searchResults)
    } else {
      return this.generateGeneralAnswer(searchResults)
    }
  }

  // サービス関連の回答生成
  private generateServiceAnswer(searchResults: VectorSearchResult[]): string {
    const serviceResults = searchResults.filter(r => 
      r.content.metadata.keywords.some(k => k.includes('サービス')) ||
      r.content.content.includes('サービス')
    )

    if (serviceResults.length === 0) {
      return 'BuzzLabでは、SNSマーケティングに関する包括的なサービスを提供しています。詳細については個別にご相談ください。'
    }

    let answer = 'BuzzLabのサービスについてお答えします。\n\n'
    serviceResults.slice(0, 3).forEach(result => {
      answer += `【${result.content.title}】\n`
      answer += `${result.content.content.substring(0, 200)}...\n\n`
    })

    answer += '詳細なご相談やお見積りについては、お気軽にお問い合わせください。'
    return answer
  }

  // 会社・代表者関連の回答生成
  private generateAboutAnswer(searchResults: VectorSearchResult[]): string {
    const aboutResults = searchResults.filter(r => 
      r.content.metadata.entities.includes('keita-mori') || 
      r.content.metadata.entities.includes('buzzlab')
    )

    let answer = 'BuzzLabについてお答えします。\n\n'
    
    if (aboutResults.length > 0) {
      const topResult = aboutResults[0]
      answer += topResult.content.content.substring(0, 300) + '...\n\n'
    }

    answer += '代表の盛啓太は総フォロワー20万人以上の実績を持つSNSマーケティング専門家です。'
    return answer
  }

  // ハウツー関連の回答生成
  private generateHowToAnswer(searchResults: VectorSearchResult[]): string {
    const howtoResults = searchResults.filter(r => 
      r.content.type === 'blog' || 
      r.content.content.includes('方法') ||
      r.content.content.includes('戦略')
    )

    if (howtoResults.length === 0) {
      return 'ご質問の内容について、具体的な方法やノウハウをお探しでしたら、無料相談にてお答えいたします。'
    }

    let answer = 'ご質問の方法について、以下の情報が参考になります：\n\n'
    howtoResults.slice(0, 2).forEach(result => {
      answer += `${result.content.content.substring(0, 250)}...\n\n`
    })

    answer += 'より詳細な戦略については、個別コンサルティングでご提案いたします。'
    return answer
  }

  // 一般的な回答生成
  private generateGeneralAnswer(searchResults: VectorSearchResult[]): string {
    const topResult = searchResults[0]
    let answer = `ご質問についてお答えします。\n\n`
    answer += topResult.content.content.substring(0, 300) + '...\n\n'
    
    if (searchResults.length > 1) {
      answer += '関連情報として以下もご参考ください：\n'
      searchResults.slice(1, 3).forEach(result => {
        answer += `・${result.content.title}\n`
      })
    }

    return answer
  }

  // 回答スタイルの調整
  private adjustAnswerStyle(answer: string, userType?: string): string {
    switch (userType) {
      case 'client':
        return answer + '\n\n何かご不明な点がございましたら、お気軽にお問い合わせください。'
      case 'prospect':
        return answer + '\n\n詳細なご提案については、無料相談をご利用ください。'
      case 'internal':
        return answer + '\n\n内部向け詳細情報が必要でしたら、ナレッジベースをご確認ください。'
      default:
        return answer
    }
  }

  // 関連トピックの抽出
  private extractRelatedTopics(searchResults: VectorSearchResult[]): string[] {
    const topics = new Set<string>()
    
    searchResults.forEach(result => {
      result.content.metadata.semanticContext.forEach(context => {
        topics.add(context)
      })
      
      if (result.content.clusterId) {
        const cluster = buzzKingsTopicClusters[result.content.clusterId]
        if (cluster) {
          topics.add(cluster.name)
        }
      }
    })

    return Array.from(topics).slice(0, 5)
  }

  // 追加質問の提案
  private generateSuggestedQuestions(query: RAGQuery, searchResults: VectorSearchResult[]): string[] {
    const suggestions: string[] = []
    const question = query.question.toLowerCase()

         // 検索結果に基づく提案
     searchResults.slice(0, 3).forEach(result => {
       if (result.content.content.includes('サービス') || result.content.metadata.keywords.some(k => k.includes('サービス'))) {
         suggestions.push('このサービスの料金はいくらですか？')
         suggestions.push('導入までの流れを教えてください')
       } else if (result.content.type === 'blog') {
         suggestions.push('他にも似たような記事はありますか？')
       }
     })

    // 質問タイプに基づく提案
    if (question.includes('instagram')) {
      suggestions.push('TikTokマーケティングについても知りたいです')
      suggestions.push('Instagram運用の成功事例を教えてください')
    } else if (question.includes('tiktok')) {
      suggestions.push('Instagramとの使い分けはどうすればいいですか？')
      suggestions.push('TikTokでバズる動画の作り方を教えてください')
    } else if (question.includes('料金') || question.includes('価格')) {
      suggestions.push('支払い方法について教えてください')
      suggestions.push('契約期間はどのくらいですか？')
    }

    // 一般的な提案
    if (suggestions.length < 3) {
      suggestions.push('無料相談を申し込みたいです')
      suggestions.push('BuzzLabの実績を教えてください')
      suggestions.push('どのSNSから始めるのがおすすめですか？')
    }

    return Array.from(new Set(suggestions)).slice(0, 3)
  }

  // 信頼度の計算
  private calculateConfidence(searchResults: VectorSearchResult[], answer: string): number {
    if (searchResults.length === 0) return 0.1

    const averageSimilarity = searchResults.reduce((sum, result) => sum + result.similarity, 0) / searchResults.length
    const answerLength = answer.length
    const hasMultipleSources = searchResults.length > 1

    let confidence = averageSimilarity * 0.6 // ベクトル類似度の影響
    confidence += Math.min(answerLength / 500, 0.3) // 回答の長さ（最大0.3）
    confidence += hasMultipleSources ? 0.1 : 0 // 複数ソースのボーナス

    return Math.min(confidence, 1.0)
  }

  // ソースの整形
  private formatSources(searchResults: VectorSearchResult[]): RAGSource[] {
    return searchResults.map(result => ({
      id: result.content.id,
      title: result.content.title,
      content: result.content.content.substring(0, 200) + '...',
      url: result.content.metadata.url,
      type: result.content.type,
      relevanceScore: result.similarity,
      clusterId: result.content.clusterId
    }))
  }

  // エラー応答の生成
  private generateErrorResponse(query: RAGQuery, processingTime: number): RAGResponse {
    return {
      answer: '申し訳ございませんが、一時的にサービスが利用できません。後ほど再度お試しください。',
      sources: [],
      confidence: 0,
      relatedTopics: [],
      suggestedQuestions: ['お問い合わせフォームから直接ご連絡ください'],
      entityContext: [],
      processingTime
    }
  }

  // 会話履歴の保存
  private saveToMemory(sessionId: string, query: RAGQuery): void {
    if (!this.conversationMemory.has(sessionId)) {
      this.conversationMemory.set(sessionId, [])
    }
    
    const history = this.conversationMemory.get(sessionId)!
    history.push(query)
    
    // 履歴が多すぎる場合は古いものを削除
    if (history.length > 10) {
      history.shift()
    }
  }

  // 会話履歴の取得
  getConversationHistory(sessionId: string): RAGQuery[] {
    return this.conversationMemory.get(sessionId) || []
  }

  // システム統計の取得
  async getSystemStats(): Promise<{
    totalDocuments: number
    totalQueries: number
    averageConfidence: number
    topEntities: string[]
    popularTopics: string[]
  }> {
    // 実装は簡略化
    return {
      totalDocuments: 0, // PGVectorから取得
      totalQueries: this.conversationMemory.size,
      averageConfidence: 0.85,
      topEntities: ['buzzlab', 'keita-mori', 'sns-marketing'],
      popularTopics: ['Instagram運用', 'TikTokマーケティング', 'SNS戦略']
    }
  }
}

// デフォルト設定
export const defaultRAGConfig: RAGSystemConfig = {
  maxContextLength: 4000,
  defaultMaxResults: 10,
  confidenceThreshold: 0.7,
  entityRelevanceThreshold: 0.5,
  enableMemory: true,
  responseStyle: 'professional'
}

// シングルトンインスタンス
export const buzzKingsRAGSystem = new BuzzKingsRAGSystem(defaultRAGConfig)

export default BuzzKingsRAGSystem 
/**
 * BuzzLab 構造化データ生成システム
 * JSON-LD形式でSchema.orgに準拠した構造化データを自動生成
 */

import { Entity, buzzKingsEntityMap } from './entity-mapping'
import { SemanticTriple, buzzKingsTriples } from './semantic-triples'
import { TopicCluster, buzzKingsTopicClusters } from './topic-clusters'

// 構造化データの型定義
export interface StructuredData {
  '@context': string | string[]
  '@type': string
  '@id'?: string
  [key: string]: any
}

// Schema.orgタイプマッピング
export const schemaTypeMapping: Record<string, string> = {
  'Person': 'Person',
  'Organization': 'Organization',
  'Service': 'Service',
  'Platform': 'SoftwareApplication',
  'Concept': 'Thing',
  'Location': 'Place',
  'Product': 'Product',
  'Technique': 'HowTo'
}

class BuzzKingsStructuredDataGenerator {
  private baseUrl: string = 'https://buzzlab8.jp'

  // エンティティから基本的な構造化データを生成
  generateEntityStructuredData(entityId: string): StructuredData | null {
    const entity = buzzKingsEntityMap[entityId]
    if (!entity) return null

    const schemaType = schemaTypeMapping[entity.type] || 'Thing'
    const baseData: StructuredData = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      '@id': `${this.baseUrl}/entity/${entityId}`,
      'name': entity.name,
      'description': entity.description,
      'identifier': entityId
    }

    // エンティティタイプ別の特殊化
    switch (entity.type) {
      case 'Person':
        return this.enhancePersonData(baseData, entity)
      case 'Organization':
        return this.enhanceOrganizationData(baseData, entity)
      case 'Service':
        return this.enhanceServiceData(baseData, entity)
      case 'Platform':
        return this.enhancePlatformData(baseData, entity)
      default:
        return baseData
    }
  }

  // 人物エンティティの構造化データ強化
  private enhancePersonData(baseData: StructuredData, entity: Entity): StructuredData {
    const relatedTriples = buzzKingsTriples.filter(t => t.subject === entity.id)
    
    // 職業・専門性の追加
    const expertiseTriples = relatedTriples.filter(t => t.predicate === 'expertIn')
    if (expertiseTriples.length > 0) {
      baseData.knowsAbout = expertiseTriples.map(t => ({
        '@type': 'Thing',
        'name': t.object,
        'description': t.context
      }))
    }

    // 所属組織の追加
    const orgTriples = relatedTriples.filter(t => 
      t.predicate === 'isFounderOf' || t.predicate === 'isRepresentativeOf'
    )
    if (orgTriples.length > 0) {
      baseData.worksFor = orgTriples.map(t => ({
        '@type': 'Organization',
        '@id': `${this.baseUrl}/entity/${t.object}`,
        'name': buzzKingsEntityMap[t.object]?.name || t.object
      }))
    }

    // ソーシャルメディアプロファイルの追加
    if (entity.sameAs) {
      baseData.sameAs = entity.sameAs
    }

    // 実績・成果の追加
    const achievementTriples = relatedTriples.filter(t => t.predicate === 'achieved')
    if (achievementTriples.length > 0) {
      baseData.award = achievementTriples.map(t => ({
        '@type': 'Thing',
        'name': t.object,
        'description': t.context
      }))
    }

    return baseData
  }

  // 組織エンティティの構造化データ強化
  private enhanceOrganizationData(baseData: StructuredData, entity: Entity): StructuredData {
    const relatedTriples = buzzKingsTriples.filter(t => t.subject === entity.id)
    
    // 提供サービスの追加
    const serviceTriples = relatedTriples.filter(t => 
      t.predicate === 'provides' || t.predicate === 'offers'
    )
    if (serviceTriples.length > 0) {
      baseData.hasOfferCatalog = {
        '@type': 'OfferCatalog',
        'name': 'サービス一覧',
        'itemListElement': serviceTriples.map((t, index) => ({
          '@type': 'Offer',
          'position': index + 1,
          'itemOffered': {
            '@type': 'Service',
            'name': t.object,
            'description': t.context
          }
        }))
      }
    }

    // 専門分野の追加
    const specializationTriples = relatedTriples.filter(t => t.predicate === 'specializes')
    if (specializationTriples.length > 0) {
      baseData.knowsAbout = specializationTriples.map(t => t.object)
    }

    // 運営プラットフォームの追加
    const platformTriples = relatedTriples.filter(t => t.predicate === 'operatesOn')
    if (platformTriples.length > 0) {
      baseData.serviceArea = platformTriples.map(t => ({
        '@type': 'Service',
        'name': `${t.object}運用サービス`,
        'description': t.context
      }))
    }

    // 創設者の追加
    const founderTriples = buzzKingsTriples.filter(t => 
      t.predicate === 'isFounderOf' && t.object === entity.id
    )
    if (founderTriples.length > 0) {
      baseData.founder = founderTriples.map(t => ({
        '@type': 'Person',
        '@id': `${this.baseUrl}/entity/${t.subject}`,
        'name': buzzKingsEntityMap[t.subject]?.name || t.subject
      }))
    }

    return baseData
  }

  // サービスエンティティの構造化データ強化
  private enhanceServiceData(baseData: StructuredData, entity: Entity): StructuredData {
    const relatedTriples = buzzKingsTriples.filter(t => t.subject === entity.id)
    
    // サービス提供者の追加
    const providerTriples = buzzKingsTriples.filter(t => 
      (t.predicate === 'provides' || t.predicate === 'offers') && t.object === entity.id
    )
    if (providerTriples.length > 0) {
      baseData.provider = providerTriples.map(t => ({
        '@type': 'Organization',
        '@id': `${this.baseUrl}/entity/${t.subject}`,
        'name': buzzKingsEntityMap[t.subject]?.name || t.subject
      }))
    }

    // 使用技術・戦略の追加
    const strategyTriples = relatedTriples.filter(t => t.predicate === 'usesStrategy')
    if (strategyTriples.length > 0) {
      baseData.step = strategyTriples.map((t, index) => ({
        '@type': 'HowToStep',
        'position': index + 1,
        'name': t.object,
        'description': t.context
      }))
    }

    return baseData
  }

  // プラットフォームエンティティの構造化データ強化
  private enhancePlatformData(baseData: StructuredData, entity: Entity): StructuredData {
    baseData['@type'] = 'SoftwareApplication'
    
    if (entity.sameAs && entity.sameAs.length > 0) {
      baseData.url = entity.sameAs[0]
    }

    // Wikidata IDがある場合は追加
    if (entity.wikidata) {
      baseData.sameAs = [...(baseData.sameAs || []), `https://www.wikidata.org/wiki/${entity.wikidata}`]
    }

    return baseData
  }

  // トピッククラスターの構造化データ生成
  generateClusterStructuredData(clusterId: string): StructuredData | null {
    const cluster = buzzKingsTopicClusters[clusterId]
    if (!cluster) return null

    const pillar = cluster.pillarPage
    const baseData: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${this.baseUrl}${pillar.slug}`,
      'name': pillar.title,
      'description': pillar.description,
      'url': `${this.baseUrl}${pillar.slug}`,
      'isPartOf': {
        '@type': 'WebSite',
        '@id': `${this.baseUrl}`,
        'name': 'BuzzLab',
        'url': this.baseUrl
      }
    }

    // メインエンティティの追加
    if (pillar.mainEntity && buzzKingsEntityMap[pillar.mainEntity]) {
      baseData.mainEntity = {
        '@id': `${this.baseUrl}/entity/${pillar.mainEntity}`
      }
    }

    // 対象オーディエンスの追加
    if (pillar.targetAudience.length > 0) {
      baseData.audience = pillar.targetAudience.map(audience => ({
        '@type': 'Audience',
        'audienceType': audience
      }))
    }

    // キーワードの追加
    baseData.keywords = cluster.targetKeywords.join(', ')

    // 関連コンテンツの追加
    if (cluster.clusterContent.length > 0) {
      baseData.relatedLink = cluster.clusterContent.map(content => ({
        '@type': 'WebPage',
        'name': content.title,
        'description': content.description,
        'url': `${this.baseUrl}${content.slug}`
      }))
    }

    // ブレッドクラムの生成
    baseData.breadcrumb = this.generateBreadcrumb(cluster)

    return baseData
  }

  // ブレッドクラム生成
  private generateBreadcrumb(cluster: TopicCluster): StructuredData {
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'ホーム',
        'item': this.baseUrl
      }
    ]

    let position = 2
    
    // 親クラスターがある場合は追加
    if (cluster.parentCluster) {
      const parentCluster = buzzKingsTopicClusters[cluster.parentCluster]
      if (parentCluster) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          'position': position++,
          'name': parentCluster.name,
          'item': `${this.baseUrl}${parentCluster.pillarPage.slug}`
        })
      }
    }

    // 現在のクラスター
    breadcrumbItems.push({
      '@type': 'ListItem',
      'position': position,
      'name': cluster.name,
      'item': `${this.baseUrl}${cluster.pillarPage.slug}`
    })

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbItems
    }
  }

  // FAQページの構造化データ生成
  generateFAQStructuredData(faqs: Array<{question: string, answer: string}>): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    }
  }

  // LocalBusiness構造化データ生成
  generateLocalBusinessData(): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${this.baseUrl}/#organization`,
      'name': 'BuzzLab',
      'description': 'SNSマーケティング専門会社。フォロワー増加、バズ創出、売上向上を支援する総合SNSコンサルティング企業',
      'url': this.baseUrl,
      'serviceType': 'SNSマーケティングコンサルティング',
      'areaServed': {
        '@type': 'Country',
        'name': '日本'
      },
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'SNSマーケティングサービス',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Instagram運用・集客サービス',
              'description': 'Instagramでのフォロワー増加とエンゲージメント向上を支援'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'TikTokバイラル動画制作',
              'description': 'TikTokでバズる動画の企画・制作・運用'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'SNS広告運用最適化',
              'description': 'データ分析に基づく効果的なSNS広告運用'
            }
          }
        ]
      },
      'founder': {
        '@type': 'Person',
        '@id': `${this.baseUrl}/entity/keita-mori`,
        'name': '盛啓太'
      }
    }
  }

  // 統合構造化データ生成（複数のデータを組み合わせ）
  generateIntegratedStructuredData(pageType: 'home' | 'service' | 'about' | 'cluster', pageId?: string): StructuredData[] {
    const structuredDataArray: StructuredData[] = []

    // 共通のWebSiteデータ
    structuredDataArray.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.baseUrl}/#website`,
      'name': 'BuzzLab',
      'description': 'SNSマーケティング専門のBuzzLab。プロのSNS運用で集客・売上アップを実現',
      'url': this.baseUrl,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${this.baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    })

    // 組織データ
    structuredDataArray.push(this.generateLocalBusinessData())

    // ページタイプ別のデータ追加
    switch (pageType) {
      case 'cluster':
        if (pageId && buzzKingsTopicClusters[pageId]) {
          const clusterData = this.generateClusterStructuredData(pageId)
          if (clusterData) structuredDataArray.push(clusterData)
        }
        break
      
      case 'about':
        const authorData = this.generateEntityStructuredData('keita-mori')
        if (authorData) structuredDataArray.push(authorData)
        break
    }

    return structuredDataArray
  }

  // HTML head用のJSON-LDタグ生成
  generateJSONLDTags(structuredDataArray: StructuredData[]): string[] {
    return structuredDataArray.map(data => 
      `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`
    )
  }

  // Next.js用のメタデータオブジェクト生成
  generateNextJSMetadata(pageType: string, pageId?: string): {
    structuredData: StructuredData[]
    jsonLd: string
  } {
    const structuredData = this.generateIntegratedStructuredData(pageType as any, pageId)
    const jsonLd = structuredData.map(data => JSON.stringify(data)).join('')
    
    return {
      structuredData,
      jsonLd
    }
  }
}

// シングルトンインスタンス
export const buzzKingsStructuredDataGenerator = new BuzzKingsStructuredDataGenerator()

// ユーティリティ関数
export function validateStructuredData(data: StructuredData): boolean {
  // 基本的なバリデーション
  if (!data['@context'] || !data['@type']) {
    return false
  }

  // 必須プロパティのチェック
  if (!data.name && !data.title) {
    return false
  }

  return true
}

export function optimizeStructuredDataSize(data: StructuredData): StructuredData {
  // 不要なプロパティを削除してサイズを最適化
  const optimized = { ...data }
  
  // 空の配列やオブジェクトを削除
  Object.keys(optimized).forEach(key => {
    const value = optimized[key]
    if (Array.isArray(value) && value.length === 0) {
      delete optimized[key]
    } else if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
      delete optimized[key]
    }
  })
  
  return optimized
}

export default BuzzKingsStructuredDataGenerator 
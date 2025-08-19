/**
 * BuzzLab セマンティックトリプルシステム
 * Subject-Predicate-Object構造でエンティティ関係性を定義
 */

import { Entity } from './entity-mapping'

// セマンティックトリプルの型定義
export interface SemanticTriple {
  subject: string // エンティティID
  predicate: PredicateType // 関係性の種類
  object: string // 関連エンティティIDまたは値
  confidence: number // 関係性の信頼度 (0-1)
  context?: string // コンテキスト情報
  source?: string // 情報源
}

export type PredicateType =
  // 組織関係
  | 'isFounderOf'
  | 'isRepresentativeOf'
  | 'worksFor'
  | 'isCompanyOf'
  
  // サービス関係
  | 'provides'
  | 'specializes'
  | 'offers'
  | 'uses'
  | 'implements'
  
  // プラットフォーム関係
  | 'operatesOn'
  | 'marketingOn'
  | 'hasPresenceOn'
  | 'optimizesFor'
  
  // 専門性関係
  | 'expertIn'
  | 'knownFor'
  | 'achievedIn'
  | 'focusesOn'
  
  // 成果関係
  | 'increased'
  | 'generated'
  | 'achieved'
  | 'delivered'
  
  // コンテンツ関係
  | 'creates'
  | 'produces'
  | 'optimizes'
  | 'analyzes'
  
  // 技術関係
  | 'usesStrategy'
  | 'appliesTechnique'
  | 'leverages'
  | 'employs'

// BuzzLabのセマンティックトリプルコレクション
export const buzzKingsTriples: SemanticTriple[] = [
  // 盛啓太 - 組織関係
  {
    subject: 'keita-mori',
    predicate: 'isFounderOf',
    object: 'buzzlab',
    confidence: 1.0,
    context: 'BuzzLab代表として設立',
    source: 'official-website'
  },
  {
    subject: 'keita-mori',
    predicate: 'isRepresentativeOf',
    object: 'ace-dream-llc',
    confidence: 1.0,
    context: 'Ace Dream LLC代表',
    source: 'company-profile'
  },

  // BuzzLab - サービス関係
  {
    subject: 'buzzlab',
    predicate: 'specializes',
    object: 'sns-marketing',
    confidence: 1.0,
    context: 'SNSマーケティング専門会社',
    source: 'service-description'
  },
  {
    subject: 'buzzlab',
    predicate: 'provides',
    object: 'follower-growth',
    confidence: 0.95,
    context: 'フォロワー増加サービスの提供',
    source: 'service-portfolio'
  },
  {
    subject: 'buzzlab',
    predicate: 'offers',
    object: 'buzz-creation',
    confidence: 0.95,
    context: 'バズ創出サービスの提供',
    source: 'marketing-materials'
  },

  // プラットフォーム専門性
  {
    subject: 'buzzlab',
    predicate: 'operatesOn',
    object: 'instagram',
    confidence: 0.9,
    context: 'Instagram運用サービス',
    source: 'service-offerings'
  },
  {
    subject: 'buzzlab',
    predicate: 'operatesOn',
    object: 'tiktok',
    confidence: 0.9,
    context: 'TikTok運用サービス',
    source: 'service-offerings'
  },
  {
    subject: 'buzzlab',
    predicate: 'operatesOn',
    object: 'youtube',
    confidence: 0.85,
    context: 'YouTube運用サービス',
    source: 'service-offerings'
  },

  // 盛啓太 - 専門性と実績
  {
    subject: 'keita-mori',
    predicate: 'expertIn',
    object: 'sns-marketing',
    confidence: 1.0,
    context: '総フォロワー20万人以上の実績',
    source: 'professional-bio'
  },
  {
    subject: 'keita-mori',
    predicate: 'knownFor',
    object: 'buzz-creation',
    confidence: 0.95,
    context: 'バズ創出の専門家として認知',
    source: 'industry-recognition'
  },
  {
    subject: 'keita-mori',
    predicate: 'achieved',
    object: '3億円売上',
    confidence: 1.0,
    context: 'イベント売上3億円超の実績',
    source: 'case-study'
  },

  // プラットフォーム個人アカウント
  {
    subject: 'keita-mori',
    predicate: 'hasPresenceOn',
    object: 'instagram',
    confidence: 1.0,
    context: '@keita.0406でのアカウント運用',
    source: 'social-media-profile'
  },
  {
    subject: 'keita-mori',
    predicate: 'hasPresenceOn',
    object: 'tiktok',
    confidence: 1.0,
    context: '@keita.0406でのアカウント運用',
    source: 'social-media-profile'
  },

  // サービス - 技術関係
  {
    subject: 'sns-marketing',
    predicate: 'usesStrategy',
    object: 'engagement-optimization',
    confidence: 0.9,
    context: 'エンゲージメント最適化戦略の活用',
    source: 'methodology'
  },
  {
    subject: 'sns-marketing',
    predicate: 'appliesTechnique',
    object: 'content-strategy',
    confidence: 0.9,
    context: 'コンテンツ戦略の適用',
    source: 'service-methodology'
  },

  // 成功事例関係
  {
    subject: 'buzzlab',
    predicate: 'delivered',
    object: 'brand-off-event',
    confidence: 1.0,
    context: 'ブランドオフプライスイベントの成功',
    source: 'case-study'
  },
  {
    subject: 'brand-off-event',
    predicate: 'generated',
    object: '3億円売上',
    confidence: 1.0,
    context: 'イベントでの売上実績',
    source: 'financial-report'
  },
  {
    subject: 'brand-off-event',
    predicate: 'achieved',
    object: '2万人動員',
    confidence: 1.0,
    context: 'イベント参加者数',
    source: 'attendance-record'
  },

  // マーケティング手法の関係性
  {
    subject: 'instagram-marketing',
    predicate: 'leverages',
    object: 'visual-content',
    confidence: 0.9,
    context: 'ビジュアルコンテンツの活用',
    source: 'platform-strategy'
  },
  {
    subject: 'tiktok-marketing',
    predicate: 'leverages',
    object: 'viral-content',
    confidence: 0.95,
    context: 'バイラルコンテンツの活用',
    source: 'platform-strategy'
  },

  // 業界関係性
  {
    subject: 'buzzlab',
    predicate: 'focusesOn',
    object: 'b2c-marketing',
    confidence: 0.8,
    context: 'B2Cマーケティングへの注力',
    source: 'target-market'
  },
  {
    subject: 'keita-mori',
    predicate: 'usesStrategy',
    object: 'data-driven-marketing',
    confidence: 0.9,
    context: 'データドリブンマーケティングアプローチ',
    source: 'methodology-description'
  }
]

// JSON-LD構造化データ生成
export function generateJSONLD(triples: SemanticTriple[], baseEntity: string) {
  const entity = triples.filter(t => t.subject === baseEntity)
  const context: any = {
    "@context": "https://schema.org",
    "@type": "Organization", // または Person, Service等
    "@id": `https://buzzlab8.jp/#${baseEntity}`,
  }

  // トリプルから構造化データを構築
  const structuredData = entity.reduce((acc: any, triple) => {
    switch (triple.predicate) {
      case 'provides':
      case 'offers':
        if (!acc.hasOfferCatalog) acc.hasOfferCatalog = []
        acc.hasOfferCatalog.push({
          "@type": "OfferCatalog",
          "name": triple.object,
          "description": triple.context
        })
        break
      
      case 'operatesOn':
        if (!acc.serviceArea) acc.serviceArea = []
        acc.serviceArea.push({
          "@type": "Service",
          "name": triple.object,
          "description": triple.context
        })
        break
      
      case 'expertIn':
      case 'knownFor':
        if (!acc.knowsAbout) acc.knowsAbout = []
        acc.knowsAbout.push({
          "@type": "Thing",
          "name": triple.object,
          "description": triple.context
        })
        break
      
      case 'achieved':
      case 'delivered':
        if (!acc.award) acc.award = []
        acc.award.push({
          "@type": "Thing",
          "name": triple.object,
          "description": triple.context
        })
        break
    }
    return acc
  }, context)

  return structuredData
}

// セマンティックトリプル検索
export function findTriples(
  subject?: string,
  predicate?: PredicateType,
  object?: string
): SemanticTriple[] {
  return buzzKingsTriples.filter(triple => {
    if (subject && triple.subject !== subject) return false
    if (predicate && triple.predicate !== predicate) return false
    if (object && triple.object !== object) return false
    return true
  })
}

// 関係性の強度分析
export function getRelationshipStrength(entity1: string, entity2: string): number {
  const directTriples = buzzKingsTriples.filter(
    t => (t.subject === entity1 && t.object === entity2) ||
         (t.subject === entity2 && t.object === entity1)
  )
  
  if (directTriples.length === 0) return 0
  
  // 信頼度の平均を関係性の強度とする
  return directTriples.reduce((sum, t) => sum + t.confidence, 0) / directTriples.length
}

// エンティティの中心性計算（何個のトリプルに関与しているか）
export function calculateEntityCentrality(entityId: string): number {
  const involvement = buzzKingsTriples.filter(
    t => t.subject === entityId || t.object === entityId
  ).length
  
  return involvement / buzzKingsTriples.length
}

// RDFトリプル形式での出力
export function exportAsRDF(triples: SemanticTriple[]): string {
  return triples.map(triple => {
    const subject = `<https://buzzlab8.jp/entity/${triple.subject}>`
    const predicate = `<https://buzzlab8.jp/predicate/${triple.predicate}>`
    const object = triple.object.startsWith('http') 
      ? `<${triple.object}>` 
      : `"${triple.object}"`
    
    return `${subject} ${predicate} ${object} .`
  }).join('\n')
}

export default buzzKingsTriples 
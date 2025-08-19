/**
 * BuzzLab エンティティマッピングシステム
 * レリバンスエンジニアリングの基盤となるエンティティ関係性定義
 */

// エンティティの型定義
export interface Entity {
  id: string
  name: string
  type: EntityType
  description: string
  importance: number // 0-1の重要度スコア
  kgmid?: string // Knowledge Graph Machine ID (取得可能時)
  wikidata?: string // Wikidata ID
  sameAs?: string[] // 同一エンティティへの参照
  relatedEntities: string[] // 関連エンティティのID
  semanticWeight: number // セマンティック重み
  topicRelevance: Record<string, number> // トピック別関連度
}

export type EntityType = 
  | 'Person' 
  | 'Organization' 
  | 'Service'
  | 'Platform'
  | 'Concept'
  | 'Location'
  | 'Product'
  | 'Technique'

// BuzzLabの核となるエンティティマップ
export const buzzKingsEntityMap: Record<string, Entity> = {
  // 主要エンティティ（Core Entities）
  'buzzlab': {
    id: 'buzzlab',
    name: 'BuzzLab',
    type: 'Organization',
    description: 'SNSマーケティング専門会社。フォロワー増加、バズ創出、売上向上を支援する総合SNSコンサルティング企業',
    importance: 1.0,
    sameAs: [
      'https://buzzlab8.jp',
      'https://www.buzzlab8.jp'
    ],
    relatedEntities: ['keita-mori', 'sns-marketing', 'buzz-creation', 'follower-growth'],
    semanticWeight: 1.0,
    topicRelevance: {
      'snsマーケティング': 1.0,
      'バズマーケティング': 1.0,
      'フォロワー増加': 1.0,
      'Instagram運用': 0.9,
      'TikTok運用': 0.9
    }
  },

  'keita-mori': {
    id: 'keita-mori',
    name: '盛啓太',
    type: 'Person',
    description: 'BuzzLab代表。総フォロワー20万人以上のSNSマーケティング専門家。イベント売上3億円超の実績を持つ',
    importance: 0.95,
    sameAs: [
      'https://www.instagram.com/keita.0406/',
      'https://www.tiktok.com/@keita.0406'
    ],
    relatedEntities: ['buzzlab', 'ace-dream-llc', 'sns-expert', 'influencer-marketing'],
    semanticWeight: 0.95,
    topicRelevance: {
      'SNS専門家': 1.0,
      'インフルエンサー': 0.9,
      'マーケティングコンサルタント': 0.9,
      'バズクリエイター': 1.0
    }
  },

  'ace-dream-llc': {
    id: 'ace-dream-llc',
    name: 'Ace Dream LLC',
    type: 'Organization',
    description: '盛啓太が代表を務める会社組織',
    importance: 0.8,
    relatedEntities: ['keita-mori', 'buzzlab'],
    semanticWeight: 0.8,
    topicRelevance: {
      'SNS運用会社': 0.8,
      'マーケティング会社': 0.8
    }
  },

  // サービスエンティティ（Service Entities）
  'sns-marketing': {
    id: 'sns-marketing',
    name: 'SNSマーケティング',
    type: 'Concept',
    description: 'ソーシャルメディアを活用したマーケティング手法。フォロワー獲得、エンゲージメント向上、売上増加を目的とする',
    importance: 0.9,
    wikidata: 'Q7424170', // Social media marketing
    relatedEntities: ['instagram-marketing', 'tiktok-marketing', 'youtube-marketing', 'buzz-creation'],
    semanticWeight: 0.9,
    topicRelevance: {
      'デジタルマーケティング': 1.0,
      'ソーシャルメディア': 1.0,
      'オンラインマーケティング': 1.0
    }
  },

  'buzz-creation': {
    id: 'buzz-creation',
    name: 'バズ創出',
    type: 'Technique',
    description: 'ソーシャルメディアで話題を生み出し、爆発的な拡散を実現するマーケティング技術',
    importance: 0.85,
    relatedEntities: ['viral-marketing', 'content-strategy', 'engagement-optimization'],
    semanticWeight: 0.85,
    topicRelevance: {
      'バイラルマーケティング': 1.0,
      'コンテンツマーケティング': 0.9,
      'SNSマーケティング': 0.9
    }
  },

  'follower-growth': {
    id: 'follower-growth',
    name: 'フォロワー増加',
    type: 'Concept',
    description: 'SNSアカウントのフォロワー数を戦略的に増加させる手法とその成果',
    importance: 0.8,
    relatedEntities: ['engagement-optimization', 'content-strategy', 'influencer-marketing'],
    semanticWeight: 0.8,
    topicRelevance: {
      'SNS運用': 1.0,
      'オーガニック成長': 0.9,
      'コミュニティ構築': 0.8
    }
  },

  // プラットフォームエンティティ（Platform Entities）
  'instagram': {
    id: 'instagram',
    name: 'Instagram',
    type: 'Platform',
    description: 'Meta社が運営する写真・動画共有ソーシャルネットワーキングサービス',
    importance: 0.9,
    wikidata: 'Q209330',
    sameAs: ['https://www.instagram.com'],
    relatedEntities: ['instagram-marketing', 'instagram-stories', 'instagram-reels'],
    semanticWeight: 0.9,
    topicRelevance: {
      'ビジュアルSNS': 1.0,
      '写真共有': 1.0,
      'ショート動画': 0.9
    }
  },

  'tiktok': {
    id: 'tiktok',
    name: 'TikTok',
    type: 'Platform',
    description: 'ByteDance社が運営するショート動画共有プラットフォーム',
    importance: 0.9,
    wikidata: 'Q54847',
    sameAs: ['https://www.tiktok.com'],
    relatedEntities: ['tiktok-marketing', 'short-video', 'viral-content'],
    semanticWeight: 0.9,
    topicRelevance: {
      'ショート動画': 1.0,
      'バイラルコンテンツ': 1.0,
      'Z世代マーケティング': 0.9
    }
  },

  'youtube': {
    id: 'youtube',
    name: 'YouTube',
    type: 'Platform',
    description: 'Google社が運営する動画共有プラットフォーム',
    importance: 0.85,
    wikidata: 'Q866',
    sameAs: ['https://www.youtube.com'],
    relatedEntities: ['youtube-marketing', 'video-content', 'youtube-shorts'],
    semanticWeight: 0.85,
    topicRelevance: {
      '動画マーケティング': 1.0,
      'コンテンツクリエイション': 0.9,
      'ロングフォーム動画': 1.0
    }
  },

  // 専門サービスエンティティ（Specialized Service Entities）
  'instagram-marketing': {
    id: 'instagram-marketing',
    name: 'Instagramマーケティング',
    type: 'Service',
    description: 'Instagram特化型のマーケティング戦略とサービス',
    importance: 0.8,
    relatedEntities: ['instagram', 'visual-content', 'instagram-ads'],
    semanticWeight: 0.8,
    topicRelevance: {
      'ビジュアルマーケティング': 1.0,
      'Instagram運用': 1.0,
      'SNS広告': 0.8
    }
  },

  'tiktok-marketing': {
    id: 'tiktok-marketing',
    name: 'TikTokマーケティング',
    type: 'Service',
    description: 'TikTok特化型のマーケティング戦略とバイラル手法',
    importance: 0.8,
    relatedEntities: ['tiktok', 'viral-content', 'short-video-strategy'],
    semanticWeight: 0.8,
    topicRelevance: {
      'バイラルマーケティング': 1.0,
      'TikTok運用': 1.0,
      'ショート動画戦略': 1.0
    }
  },

  // 技術・手法エンティティ（Technique Entities）
  'engagement-optimization': {
    id: 'engagement-optimization',
    name: 'エンゲージメント最適化',
    type: 'Technique',
    description: 'いいね、コメント、シェアなどのユーザーエンゲージメントを最大化する手法',
    importance: 0.7,
    relatedEntities: ['content-strategy', 'posting-timing', 'hashtag-strategy'],
    semanticWeight: 0.7,
    topicRelevance: {
      'SNS運用': 1.0,
      'コンテンツ最適化': 1.0,
      'ユーザーエンゲージメント': 1.0
    }
  },

  'content-strategy': {
    id: 'content-strategy',
    name: 'コンテンツ戦略',
    type: 'Concept',
    description: 'ターゲットオーディエンスに響く効果的なコンテンツの企画・制作・配信戦略',
    importance: 0.75,
    relatedEntities: ['visual-content', 'storytelling', 'brand-messaging'],
    semanticWeight: 0.75,
    topicRelevance: {
      'コンテンツマーケティング': 1.0,
      'ブランディング': 0.8,
      'メッセージング': 0.8
    }
  },

  // 成果・実績エンティティ（Achievement Entities）
  'brand-off-event': {
    id: 'brand-off-event',
    name: 'ブランドオフプライスイベント',
    type: 'Product',
    description: 'BuzzLabが手掛けた売上3億円超、動員2万人以上の大型イベント成功事例',
    importance: 0.7,
    relatedEntities: ['buzzlab', 'event-marketing', 'influencer-collaboration'],
    semanticWeight: 0.7,
    topicRelevance: {
      'イベントマーケティング': 1.0,
      'マーケティング成功事例': 1.0,
      '大規模集客': 0.9
    }
  }
}

// エンティティ関係性分析
export function getEntityRelationships(entityId: string): Entity[] {
  const entity = buzzKingsEntityMap[entityId]
  if (!entity) return []
  
  return entity.relatedEntities
    .map(id => buzzKingsEntityMap[id])
    .filter(Boolean)
    .sort((a, b) => b.importance - a.importance)
}

// セマンティック類似度計算
export function calculateSemanticSimilarity(entity1Id: string, entity2Id: string): number {
  const entity1 = buzzKingsEntityMap[entity1Id]
  const entity2 = buzzKingsEntityMap[entity2Id]
  
  if (!entity1 || !entity2) return 0
  
  // 直接関係の確認
  if (entity1.relatedEntities.includes(entity2Id)) return 0.8
  if (entity2.relatedEntities.includes(entity1Id)) return 0.8
  
  // トピック関連性による類似度計算
  const topics1 = Object.keys(entity1.topicRelevance)
  const topics2 = Object.keys(entity2.topicRelevance)
  const commonTopics = topics1.filter(topic => topics2.includes(topic))
  
  if (commonTopics.length === 0) return 0
  
  const similarity = commonTopics.reduce((sum, topic) => {
    const relevance1 = entity1.topicRelevance[topic] || 0
    const relevance2 = entity2.topicRelevance[topic] || 0
    return sum + (relevance1 * relevance2)
  }, 0) / commonTopics.length
  
  return Math.min(similarity, 0.7) // 間接関係の最大値を0.7に制限
}

// 重要度による階層的エンティティ取得
export function getEntitiesByImportance(threshold: number = 0.8): Entity[] {
  return Object.values(buzzKingsEntityMap)
    .filter(entity => entity.importance >= threshold)
    .sort((a, b) => b.importance - a.importance)
}

// トピック別エンティティクラスター
export function getTopicCluster(topic: string): Entity[] {
  return Object.values(buzzKingsEntityMap)
    .filter(entity => entity.topicRelevance[topic] && entity.topicRelevance[topic] > 0.5)
    .sort((a, b) => (b.topicRelevance[topic] || 0) - (a.topicRelevance[topic] || 0))
}

export default buzzKingsEntityMap 
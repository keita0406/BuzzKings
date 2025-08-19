/**
 * BuzzLab トピッククラスターシステム
 * レリバンスエンジニアリングのコンテンツ階層構造
 */

import { Entity } from './entity-mapping'
import { SemanticTriple } from './semantic-triples'

// トピッククラスターの型定義
export interface TopicCluster {
  id: string
  name: string
  type: ClusterType
  pillarPage: PillarPage
  clusterContent: ClusterContent[]
  parentCluster?: string
  subClusters: string[]
  entityRelevance: Record<string, number>
  targetKeywords: string[]
  semanticKeywords: string[]
  internalLinkingScore: number
  contentDepth: number // コンテンツの深度レベル
}

export interface PillarPage {
  title: string
  slug: string
  description: string
  mainEntity: string
  contentType: 'service' | 'guide' | 'about' | 'case-study'
  targetAudience: string[]
  primaryKeywords: string[]
  semanticContext: string[]
  estimatedWordCount: number
  contentOutline: ContentSection[]
}

export interface ClusterContent {
  title: string
  slug: string
  description: string
  relatedEntity: string
  contentType: 'blog' | 'tutorial' | 'case-study' | 'faq' | 'glossary'
  supportingKeywords: string[]
  linksToPillar: boolean
  internalLinks: string[]
  estimatedWordCount: number
}

export interface ContentSection {
  heading: string
  intent: 'informational' | 'navigational' | 'transactional' | 'commercial'
  entities: string[]
  estimatedWords: number
}

export type ClusterType = 
  | 'primary'      // メインサービス
  | 'secondary'    // サブサービス
  | 'supporting'   // サポートコンテンツ
  | 'informational' // 情報提供

// BuzzLabのトピッククラスター構造
export const buzzKingsTopicClusters: Record<string, TopicCluster> = {
  // Primary Cluster: SNSマーケティング (Core Topic)
  'sns-marketing-cluster': {
    id: 'sns-marketing-cluster',
    name: 'SNSマーケティング',
    type: 'primary',
    pillarPage: {
              title: 'SNSマーケティング完全ガイド | BuzzLab',
      slug: '/sns-marketing',
      description: 'プロが教えるSNSマーケティングの全て。Instagram、TikTok、YouTubeでの集客・売上向上の戦略とノウハウを解説',
      mainEntity: 'sns-marketing',
      contentType: 'guide',
      targetAudience: ['経営者', '事業者', 'マーケティング担当者'],
      primaryKeywords: ['SNSマーケティング', 'ソーシャルメディアマーケティング', 'SNS集客'],
      semanticContext: ['デジタルマーケティング', 'オンライン集客', 'ブランディング'],
      estimatedWordCount: 8000,
      contentOutline: [
        {
          heading: 'SNSマーケティングとは',
          intent: 'informational',
          entities: ['sns-marketing', 'social-media'],
          estimatedWords: 1000
        },
        {
          heading: 'プラットフォーム別戦略',
          intent: 'informational',
          entities: ['instagram', 'tiktok', 'youtube'],
          estimatedWords: 2000
        },
        {
          heading: '成功事例と実績',
          intent: 'commercial',
          entities: ['brand-off-event', 'buzzking'],
          estimatedWords: 1500
        },
        {
          heading: 'BuzzLabのサービス',
          intent: 'transactional',
          entities: ['buzzking', 'keita-mori'],
          estimatedWords: 1500
        }
      ]
    },
    clusterContent: [
      {
        title: 'Instagram集客の完全マニュアル',
        slug: '/instagram-marketing-guide',
        description: 'Instagram特化の集客戦略。フォロワー増加からエンゲージメント向上まで',
        relatedEntity: 'instagram-marketing',
        contentType: 'tutorial',
        supportingKeywords: ['Instagram集客', 'インスタ運用', 'フォロワー増加'],
        linksToPillar: true,
        internalLinks: ['sns-marketing', 'engagement-optimization'],
        estimatedWordCount: 4000
      },
      {
        title: 'TikTokでバズる動画の作り方',
        slug: '/tiktok-viral-strategy',
        description: 'TikTokでバイラルを起こす動画制作のコツと戦略',
        relatedEntity: 'tiktok-marketing',
        contentType: 'tutorial',
        supportingKeywords: ['TikTokバズ', 'バイラル動画', 'ショート動画'],
        linksToPillar: true,
        internalLinks: ['sns-marketing', 'buzz-creation'],
        estimatedWordCount: 3500
      }
    ],
    subClusters: ['instagram-cluster', 'tiktok-cluster', 'youtube-cluster'],
    entityRelevance: {
      'sns-marketing': 1.0,
      'buzzking': 0.9,
      'keita-mori': 0.8
    },
    targetKeywords: ['SNSマーケティング', 'ソーシャルメディア戦略', 'SNS集客'],
    semanticKeywords: ['デジタルマーケティング', 'オンライン集客', 'コンテンツマーケティング'],
    internalLinkingScore: 0.95,
    contentDepth: 1
  },

  // Secondary Cluster: Instagram
  'instagram-cluster': {
    id: 'instagram-cluster',
    name: 'Instagramマーケティング',
    type: 'secondary',
    pillarPage: {
              title: 'Instagram集客・運用サービス | BuzzLab',
      slug: '/instagram',
      description: 'Instagram専門のマーケティングサービス。フォロワー増加、エンゲージメント向上、売上アップを実現',
      mainEntity: 'instagram-marketing',
      contentType: 'service',
      targetAudience: ['Instagram運用者', 'ブランド担当者', '個人事業主'],
      primaryKeywords: ['Instagram運用', 'インスタ集客', 'Instagram広告'],
      semanticContext: ['ビジュアルマーケティング', '写真マーケティング', 'ストーリーズ活用'],
      estimatedWordCount: 6000,
      contentOutline: [
        {
          heading: 'Instagramマーケティングの重要性',
          intent: 'informational',
          entities: ['instagram', 'visual-marketing'],
          estimatedWords: 1000
        },
        {
          heading: 'フォロワー増加戦略',
          intent: 'informational',
          entities: ['follower-growth', 'engagement-optimization'],
          estimatedWords: 1500
        },
        {
          heading: 'BuzzLabの成功事例',
          intent: 'commercial',
          entities: ['buzzking', 'brand-off-event'],
          estimatedWords: 1500
        }
      ]
    },
    clusterContent: [
      {
        title: 'Instagramストーリーズ活用法',
        slug: '/instagram-stories-tips',
        description: 'エンゲージメントを高めるストーリーズの使い方',
        relatedEntity: 'instagram-stories',
        contentType: 'blog',
        supportingKeywords: ['インスタストーリーズ', 'ストーリーズ活用', 'エンゲージメント'],
        linksToPillar: true,
        internalLinks: ['instagram-cluster'],
        estimatedWordCount: 2500
      },
      {
        title: 'Instagramリール攻略ガイド',
        slug: '/instagram-reels-guide',
        description: 'リールでバズを起こすための完全ガイド',
        relatedEntity: 'instagram-reels',
        contentType: 'tutorial',
        supportingKeywords: ['インスタリール', 'リール攻略', 'ショート動画'],
        linksToPillar: true,
        internalLinks: ['instagram-cluster', 'buzz-creation'],
        estimatedWordCount: 3000
      }
    ],
    parentCluster: 'sns-marketing-cluster',
    subClusters: [],
    entityRelevance: {
      'instagram': 1.0,
      'instagram-marketing': 1.0,
      'visual-content': 0.8
    },
    targetKeywords: ['Instagram運用', 'インスタ集客', 'Instagram広告運用'],
    semanticKeywords: ['ビジュアルコンテンツ', '写真投稿', 'ハッシュタグ戦略'],
    internalLinkingScore: 0.85,
    contentDepth: 2
  },

  // Secondary Cluster: TikTok
  'tiktok-cluster': {
    id: 'tiktok-cluster',
    name: 'TikTokマーケティング',
    type: 'secondary',
    pillarPage: {
              title: 'TikTok運用・バズ創出サービス | BuzzLab',
      slug: '/tiktok',
      description: 'TikTok専門のマーケティングサービス。バイラル動画制作と戦略的運用でフォロワー急増を実現',
      mainEntity: 'tiktok-marketing',
      contentType: 'service',
      targetAudience: ['TikTok運用者', 'クリエイター', 'Z世代向けビジネス'],
      primaryKeywords: ['TikTok運用', 'TikTokマーケティング', 'バイラル動画'],
      semanticContext: ['ショート動画', 'バズマーケティング', 'クリエイティブ戦略'],
      estimatedWordCount: 5500,
      contentOutline: [
        {
          heading: 'TikTokマーケティングの効果',
          intent: 'informational',
          entities: ['tiktok', 'viral-marketing'],
          estimatedWords: 1000
        },
        {
          heading: 'バイラル動画の作り方',
          intent: 'informational',
          entities: ['buzz-creation', 'viral-content'],
          estimatedWords: 1500
        }
      ]
    },
    clusterContent: [
      {
        title: 'TikTokアルゴリズム完全解説',
        slug: '/tiktok-algorithm',
        description: 'TikTokのアルゴリズムを理解してバズを狙う方法',
        relatedEntity: 'tiktok-algorithm',
        contentType: 'blog',
        supportingKeywords: ['TikTokアルゴリズム', 'バズる方法', 'おすすめ表示'],
        linksToPillar: true,
        internalLinks: ['tiktok-cluster'],
        estimatedWordCount: 3000
      }
    ],
    parentCluster: 'sns-marketing-cluster',
    subClusters: [],
    entityRelevance: {
      'tiktok': 1.0,
      'tiktok-marketing': 1.0,
      'viral-content': 0.9
    },
    targetKeywords: ['TikTok運用', 'TikTokマーケティング', 'バイラル戦略'],
    semanticKeywords: ['ショート動画制作', 'クリエイティブ', 'エンターテインメント'],
    internalLinkingScore: 0.8,
    contentDepth: 2
  },

  // Supporting Cluster: エンゲージメント最適化
  'engagement-cluster': {
    id: 'engagement-cluster',
    name: 'エンゲージメント最適化',
    type: 'supporting',
    pillarPage: {
      title: 'SNSエンゲージメント最適化ガイド',
      slug: '/engagement-optimization',
      description: 'いいね、コメント、シェアを最大化するエンゲージメント戦略',
      mainEntity: 'engagement-optimization',
      contentType: 'guide',
      targetAudience: ['SNS運用者', 'コンテンツクリエイター'],
      primaryKeywords: ['エンゲージメント最適化', 'SNSエンゲージメント', 'ユーザー参加'],
      semanticContext: ['コミュニティ構築', 'ファンエンゲージメント', 'インタラクション'],
      estimatedWordCount: 4500,
      contentOutline: [
        {
          heading: 'エンゲージメントとは',
          intent: 'informational',
          entities: ['engagement-optimization', 'user-interaction'],
          estimatedWords: 1000
        }
      ]
    },
    clusterContent: [],
    subClusters: [],
    entityRelevance: {
      'engagement-optimization': 1.0,
      'content-strategy': 0.8
    },
    targetKeywords: ['エンゲージメント向上', 'ユーザー参加率', 'コミュニティ構築'],
    semanticKeywords: ['ファンマーケティング', 'ブランドロイヤリティ'],
    internalLinkingScore: 0.7,
    contentDepth: 3
  }
}

// クラスター関係性の分析
export function getClusterRelationships(clusterId: string): {
  parent?: TopicCluster
  children: TopicCluster[]
  siblings: TopicCluster[]
} {
  const cluster = buzzKingsTopicClusters[clusterId]
  if (!cluster) return { children: [], siblings: [] }

  const parent = cluster.parentCluster 
    ? buzzKingsTopicClusters[cluster.parentCluster] 
    : undefined

  const children = cluster.subClusters
    .map(id => buzzKingsTopicClusters[id])
    .filter(Boolean)

  const siblings = parent
    ? parent.subClusters
        .filter(id => id !== clusterId)
        .map(id => buzzKingsTopicClusters[id])
        .filter(Boolean)
    : []

  return { parent, children, siblings }
}

// 内部リンク戦略生成
export function generateInternalLinkStrategy(clusterId: string): {
  upwardLinks: string[]    // 上位クラスターへのリンク
  downwardLinks: string[]  // 下位クラスターへのリンク
  lateralLinks: string[]   // 同階層クラスターへのリンク
  contextualLinks: string[] // コンテキスト関連リンク
} {
  const { parent, children, siblings } = getClusterRelationships(clusterId)
  
  return {
    upwardLinks: parent ? [parent.pillarPage.slug] : [],
    downwardLinks: children.map(child => child.pillarPage.slug),
    lateralLinks: siblings.map(sibling => sibling.pillarPage.slug),
    contextualLinks: buzzKingsTopicClusters[clusterId].clusterContent
      .map(content => content.slug)
  }
}

// SEO最適化スコア計算
export function calculateClusterSEOScore(clusterId: string): {
  contentDepthScore: number
  internalLinkingScore: number
  entityRelevanceScore: number
  keywordCoverageScore: number
  overallScore: number
} {
  const cluster = buzzKingsTopicClusters[clusterId]
  if (!cluster) return {
    contentDepthScore: 0,
    internalLinkingScore: 0,
    entityRelevanceScore: 0,
    keywordCoverageScore: 0,
    overallScore: 0
  }

  // コンテンツの深度スコア (深いほど良い、但し3が最適)
  const contentDepthScore = Math.min(cluster.contentDepth / 3, 1)
  
  // 内部リンクスコア
  const internalLinkingScore = cluster.internalLinkingScore
  
  // エンティティ関連性スコア
  const entityRelevanceScore = Object.values(cluster.entityRelevance)
    .reduce((sum, score) => sum + score, 0) / Object.keys(cluster.entityRelevance).length
  
  // キーワードカバレッジスコア
  const totalKeywords = cluster.targetKeywords.length + cluster.semanticKeywords.length
  const keywordCoverageScore = Math.min(totalKeywords / 10, 1) // 10個で満点
  
  const overallScore = (
    contentDepthScore * 0.2 +
    internalLinkingScore * 0.3 +
    entityRelevanceScore * 0.3 +
    keywordCoverageScore * 0.2
  )

  return {
    contentDepthScore,
    internalLinkingScore,
    entityRelevanceScore,
    keywordCoverageScore,
    overallScore
  }
}

// コンテンツギャップ分析
export function analyzeContentGaps(): {
  missingClusters: string[]
  underDevelopedClusters: string[]
  recommendedContent: { cluster: string, suggestedContent: string[] }[]
} {
  const missingClusters = [
    'youtube-cluster',      // YouTube専門クラスター
    'analytics-cluster',    // 分析・測定クラスター
    'advertising-cluster'   // 広告運用クラスター
  ]

  const underDevelopedClusters = Object.entries(buzzKingsTopicClusters)
    .filter(([_, cluster]) => cluster.clusterContent.length < 3)
    .map(([id, _]) => id)

  const recommendedContent = [
    {
      cluster: 'instagram-cluster',
      suggestedContent: [
        'Instagram広告運用ガイド',
        'ハッシュタグ戦略完全版',
        'インフルエンサーコラボレーション'
      ]
    },
    {
      cluster: 'tiktok-cluster',
      suggestedContent: [
        'TikTok広告の始め方',
        'ハッシュタグチャレンジ活用法',
        'TikTokライブ配信戦略'
      ]
    }
  ]

  return {
    missingClusters,
    underDevelopedClusters,
    recommendedContent
  }
}

export default buzzKingsTopicClusters 
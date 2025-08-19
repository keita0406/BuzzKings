/**
 * BuzzLab レリバンスエンジニアリング デモデータ
 * 実際のWebサイトコンテンツをベクトル化対応形式で提供
 */

import { VectorContent } from './vector-system'

// ホームページのデモコンテンツ
export const homePageContent: VectorContent = {
  id: 'page-home',
  type: 'page',
  title: 'SNSで集客しませんか？効果的なSNSマーケティングでフォロワー増加と売上アップ | BUZZLAB',
  content: `
    BuzzLabは、SNSマーケティング専門のコンサルティング会社です。
    Instagram、TikTok、YouTubeでの効果的な集客戦略により、フォロワー増加と売上向上を実現します。
    
    代表の盛啓太は総フォロワー20万人以上の実績を持ち、イベント売上3億円超、広告費200万以下、
    総動員数2万人以上を達成した実績があります。
    
    私たちのサービス：
    - SNS分析・最適化：データドリブンなアプローチでSNSパフォーマンスを徹底分析
    - コンテンツ戦略設計：ブランドの世界観を強化しつつ、アルゴリズムに愛される投稿フォーマット構築
    - フォロワー急増キャンペーン：短期的なフォロワーブーストと長期コミュニティ化を両立
    - インフルエンサー連携・PR：ブランドと相性の良いインフルエンサーをマッチング
    - SNS広告運用最適化：AIとデータ分析で広告クリエイティブとターゲティングを高速PDCA
    - バズる動画編集・広告動画編集：編集技術による効果的な動画コンテンツ制作
  `,
  metadata: {
    entities: ['buzzlab', 'keita-mori', 'sns-marketing', 'instagram', 'tiktok', 'youtube'],
    keywords: ['SNSマーケティング', 'Instagram', 'TikTok', 'フォロワー増加', '集客', '売上アップ'],
    semanticContext: ['デジタルマーケティング', 'ソーシャルメディア', 'バズマーケティング'],
    url: '/',
    lastUpdated: new Date().toISOString(),
    relevanceScore: 1.0
  },
  clusterId: 'sns-marketing-cluster'
}

// Instagramページのデモコンテンツ
export const instagramPageContent: VectorContent = {
  id: 'page-instagram',
  type: 'page',
  title: 'Instagram集客・運用サービス | BuzzLab',
  content: `
    Instagram専門のマーケティングサービスで、フォロワー増加、エンゲージメント向上、売上アップを実現します。
    
    Instagramマーケティングの重要性：
    ビジュアル重視のプラットフォームとして、ブランドの魅力を効果的に伝えることができます。
    ストーリーズ、リール、IGTV、ショッピング機能を活用した総合的な戦略を提供します。
    
    フォロワー増加戦略：
    - アカウント最適化によるプロフィール改善
    - ハッシュタグ戦略による発見可能性向上
    - エンゲージメント最適化による関係性構築
    - ユーザー生成コンテンツ（UGC）の活用
    
    成功事例：
    ブランドオフプライスイベントでは、Instagram戦略により2万人以上の動員を実現。
    フォロワー数3万人超、売上3億円以上の成果を達成しました。
  `,
  metadata: {
    entities: ['instagram', 'instagram-marketing', 'buzzlab', 'engagement-optimization'],
    keywords: ['Instagram運用', 'インスタ集客', 'フォロワー増加', 'エンゲージメント', 'ストーリーズ', 'リール'],
    semanticContext: ['ビジュアルマーケティング', '写真共有', 'ハッシュタグ戦略'],
    url: '/instagram',
    lastUpdated: new Date().toISOString(),
    relevanceScore: 0.9
  },
  clusterId: 'instagram-cluster'
}

// TikTokページのデモコンテンツ
export const tiktokPageContent: VectorContent = {
  id: 'page-tiktok',
  type: 'page',
  title: 'TikTok運用・バズ創出サービス | BuzzLab',
  content: `
    TikTok専門のマーケティングサービス。バイラル動画制作と戦略的運用でフォロワー急増を実現します。
    
    TikTokマーケティングの効果：
    Z世代を中心とした若年層にリーチし、短時間で大きなインパクトを与えることができます。
    アルゴリズムの特性を理解した戦略的なアプローチにより、少ないフォロワーからでもバイラルを狙えます。
    
    バイラル動画の作り方：
    - トレンドを活用したコンテンツ企画
    - アルゴリズムに最適化された投稿タイミング
    - エンゲージメントを高める動画構成
    - ハッシュタグチャレンジの活用
    
    クリエイティブ戦略：
    - ショート動画制作の専門技術
    - エンターテインメント性の高いコンテンツ
    - ブランドメッセージとエンターテインメントの融合
  `,
  metadata: {
    entities: ['tiktok', 'tiktok-marketing', 'buzz-creation', 'viral-content'],
    keywords: ['TikTok運用', 'バイラル動画', 'ショート動画', 'Z世代マーケティング', 'アルゴリズム'],
    semanticContext: ['バイラルマーケティング', 'クリエイティブ戦略', 'エンターテインメント'],
    url: '/tiktok',
    lastUpdated: new Date().toISOString(),
    relevanceScore: 0.9
  },
  clusterId: 'tiktok-cluster'
}

// サービスページのデモコンテンツ
export const servicesPageContent: VectorContent = {
  id: 'page-services',
  type: 'page',
  title: 'SNSマーケティングサービス一覧 | BuzzLab',
  content: `
    BuzzLabの包括的なSNSマーケティングサービスをご紹介します。
    
    SNS分析・最適化：
    データドリブンなアプローチで、あなたのSNSパフォーマンスを徹底分析。
    最適な投稿タイミングと戦略を提案します。
    
    コンテンツ戦略設計：
    ブランドの世界観を強化しつつ、アルゴリズムに愛される投稿フォーマットとストーリーテリングを構築。
    
    フォロワー急増キャンペーン：
    短期的なフォロワーブーストと長期コミュニティ化を両立させるキャンペーンを企画・運用。
    
    インフルエンサー連携・PR：
    ブランドと相性の良いインフルエンサーをマッチングし、ROIの高いコラボレーションを実現。
    
    SNS広告運用最適化：
    AIとデータ分析で広告クリエイティブとターゲティングを高速PDCA。
    
    バズる動画編集・広告動画編集：
    プロの編集技術により、効果的な動画コンテンツを制作。
  `,
  metadata: {
    entities: ['buzzlab', 'sns-marketing', 'content-strategy', 'engagement-optimization'],
    keywords: ['SNSサービス', 'マーケティング', 'コンテンツ戦略', '広告運用', '動画編集'],
    semanticContext: ['デジタルマーケティング', 'コンサルティング', 'ブランディング'],
    url: '/services',
    lastUpdated: new Date().toISOString(),
    relevanceScore: 0.8
  },
  clusterId: 'sns-marketing-cluster'
}

// ブログ記事のデモコンテンツ
export const blogContents: VectorContent[] = [
  {
    id: 'blog-instagram-stories',
    type: 'blog',
    title: 'Instagramストーリーズ活用法：エンゲージメントを高める5つのコツ',
    content: `
      Instagramストーリーズは、フォロワーとの親密な関係構築に欠かせない機能です。
      24時間で消える投稿の特性を活かし、リアルタイムなコミュニケーションが可能です。
      
      1. インタラクティブ機能の活用
      アンケート、質問ボックス、クイズ機能を使ってフォロワーの参加を促進。
      
      2. ハイライト機能での情報整理
      重要なストーリーズをハイライトに保存し、プロフィールから簡単にアクセス可能に。
      
      3. ユーザー生成コンテンツの紹介
      フォロワーの投稿をリポストし、コミュニティ感を醸成。
      
      4. 舞台裏コンテンツの公開
      製品制作過程や日常風景を共有し、ブランドの人間性をアピール。
      
      5. 限定情報の提供
      ストーリーズ限定の情報やクーポンを提供し、フォロー継続のインセンティブを創出。
    `,
    metadata: {
      entities: ['instagram', 'instagram-stories', 'engagement-optimization'],
      keywords: ['インスタストーリーズ', 'エンゲージメント', 'ハイライト', 'インタラクティブ'],
      semanticContext: ['Instagram運用', 'コミュニティ構築', 'ファンマーケティング'],
      url: '/blog/instagram-stories-tips',
      lastUpdated: new Date().toISOString(),
      relevanceScore: 0.8
    },
    clusterId: 'instagram-cluster'
  },
  {
    id: 'blog-tiktok-algorithm',
    type: 'blog',
    title: 'TikTokアルゴリズム完全解説：バズを狙うための戦略',
    content: `
      TikTokのアルゴリズムを理解することは、バイラルコンテンツ制作の第一歩です。
      For Youページでの表示を最大化するための要素を詳しく解説します。
      
      アルゴリズムの主要要素：
      
      1. 視聴完了率
      動画を最後まで見てもらえる率が最重要指標。冒頭3秒で惹きつけることが鍵。
      
      2. エンゲージメント率
      いいね、コメント、シェア、保存の総合的な反応率。
      
      3. 投稿頻度と一貫性
      定期的な投稿により、アルゴリズムがクリエイターを優遇。
      
      4. トレンドへの参加
      ハッシュタグチャレンジや音楽トレンドへの早期参加。
      
      5. ニッチなオーディエンス
      特定のコミュニティに刺さるコンテンツが、そのコミュニティ内で拡散。
      
      バズを狙うコツ：
      - 動画の冒頭でフックを作る
      - 字幕やテキストオーバーレイを効果的に使用
      - トレンド音楽やエフェクトの活用
      - コメント促進のためのCTA
    `,
    metadata: {
      entities: ['tiktok', 'tiktok-algorithm', 'buzz-creation', 'viral-content'],
      keywords: ['TikTokアルゴリズム', 'バズ', 'For Youページ', 'エンゲージメント', 'トレンド'],
      semanticContext: ['バイラルマーケティング', 'アルゴリズム最適化', 'ショート動画戦略'],
      url: '/blog/tiktok-algorithm',
      lastUpdated: new Date().toISOString(),
      relevanceScore: 0.85
    },
    clusterId: 'tiktok-cluster'
  }
]

// FAQ用のデモコンテンツ
export const faqContent: VectorContent = {
  id: 'page-faq',
  type: 'faq',
  title: 'よくあるご質問 | BuzzLab',
  content: `
    Q: BUZZLABのサービスを利用するのに、SNSの知識は必要ですか？
    A: いいえ、SNSの専門知識は必要ありません。私たちが初心者の方にも分かりやすく、ステップバイステップでサポートいたします。
    
    Q: 結果が出るまでにどのくらい時間がかかりますか？
    A: 多くのクライアント様が1-3ヶ月以内に明確な成果を実感されています。ただし、業界や現在の状況により個人差があります。
    
    Q: どのSNSプラットフォームに対応していますか？
    A: Instagramをメインに、TikTok、YouTube、Twitter（X）、Facebook、LinkedInなど、主要なSNSプラットフォーム全てに対応しています。
    
    Q: 制作したSNSコンテンツの著作権はどうなりますか？
    A: 制作されたコンテンツの著作権は100%お客様に帰属します。制作されたコンテンツは自由にご利用いただけ、商用利用も問題ありません。
    
    Q: 料金体系について教えてください
    A: お客様のニーズに合わせた柔軟な料金プランをご用意しています。月額制のサブスクリプションプランから、単発のプロジェクトベースまで対応可能です。
  `,
  metadata: {
    entities: ['buzzlab', 'sns-marketing', 'instagram', 'tiktok', 'youtube'],
    keywords: ['FAQ', 'よくある質問', 'サービス', '料金', 'サポート'],
    semanticContext: ['カスタマーサポート', 'サービス説明', '質問回答'],
    url: '/faq',
    lastUpdated: new Date().toISOString(),
    relevanceScore: 0.7
  }
}

// 全デモコンテンツの配列
export const allDemoContents: VectorContent[] = [
  homePageContent,
  instagramPageContent,
  tiktokPageContent,
  servicesPageContent,
  faqContent,
  ...blogContents
]

// ベクトル化用の初期化データ
export const initializationData = {
  contents: allDemoContents,
  totalCount: allDemoContents.length,
  clustersRepresented: ['sns-marketing-cluster', 'instagram-cluster', 'tiktok-cluster'],
  entitiesIncluded: [
    'buzzlab', 'keita-mori', 'sns-marketing', 'instagram', 'tiktok', 
    'youtube', 'engagement-optimization', 'buzz-creation', 'viral-content'
  ]
}

// コンテンツタイプ別の統計
export const contentStatistics = {
  byType: {
    page: allDemoContents.filter(c => c.type === 'page').length,
    blog: allDemoContents.filter(c => c.type === 'blog').length,
    faq: allDemoContents.filter(c => c.type === 'faq').length
  },
  byCluster: {
    'sns-marketing-cluster': allDemoContents.filter(c => c.clusterId === 'sns-marketing-cluster').length,
    'instagram-cluster': allDemoContents.filter(c => c.clusterId === 'instagram-cluster').length,
    'tiktok-cluster': allDemoContents.filter(c => c.clusterId === 'tiktok-cluster').length
  },
  averageRelevanceScore: allDemoContents.reduce((sum, c) => sum + c.metadata.relevanceScore, 0) / allDemoContents.length
}

export default allDemoContents 
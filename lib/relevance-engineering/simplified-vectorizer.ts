/**
 * BuzzLab 簡素化ベクトル化システム
 * 既存のstaticDataとdemo-dataを活用した即座に実行可能なベクトル化
 */

import { buzzKingsVectorSystem, VectorContent } from './vector-system'
import { servicesData, achievementsData, faqsData } from '../staticData'
import { defaultAuthor } from '../authorData'
import { allDemoContents } from './demo-data'

export interface VectorizationResult {
  success: boolean
  totalContents: number
  contentsByType: Record<string, number>
  contentsByClusters: Record<string, number>
  processingTime: number
  errors: string[]
}

class SimplifiedVectorizer {
  private errors: string[] = []

  // メイン実行メソッド
  async vectorizeAllContent(): Promise<VectorizationResult> {
    const startTime = Date.now()
    this.errors = []

          console.log('🚀 BuzzLab コンテンツベクトル化開始...')

    try {
      // 1. デモデータの活用
      const demoContents = this.prepareDemoContents()
      console.log(`📄 ${demoContents.length} デモコンテンツを準備`)

      // 2. 静的データの変換
      const staticContents = this.convertStaticData()
      console.log(`📊 ${staticContents.length} 静的データを変換`)

      // 3. 著者データの変換
      const authorContents = this.convertAuthorData()
      console.log(`👤 ${authorContents.length} 著者データを変換`)

      // 4. メタデータの追加変換
      const metaContents = this.generateMetaContents()
      console.log(`🏷️  ${metaContents.length} メタコンテンツを生成`)

      // 全コンテンツを統合
      const allContents = [
        ...demoContents,
        ...staticContents,
        ...authorContents,
        ...metaContents
      ]

      // 5. バッチでPGVectorに保存
      await this.storeContentsBatch(allContents)

      const result: VectorizationResult = {
        success: true,
        totalContents: allContents.length,
        contentsByType: this.getContentsByType(allContents),
        contentsByClusters: this.getContentsByClusters(allContents),
        processingTime: Date.now() - startTime,
        errors: this.errors
      }

      console.log('✅ ベクトル化完了！', result)
      return result

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.errors.push(errorMsg)
      
      return {
        success: false,
        totalContents: 0,
        contentsByType: {},
        contentsByClusters: {},
        processingTime: Date.now() - startTime,
        errors: this.errors
      }
    }
  }

  // デモデータの準備
  private prepareDemoContents(): VectorContent[] {
    return allDemoContents.map(content => ({
      ...content,
      metadata: {
        ...content.metadata,
        lastUpdated: new Date().toISOString()
      }
    }))
  }

  // 静的データの変換
  private convertStaticData(): VectorContent[] {
    const contents: VectorContent[] = []

    // サービスデータ
    servicesData.forEach((service, index) => {
      contents.push({
        id: `service-${index}`,
        type: 'service',
        title: service.title,
        content: `${service.title}: ${service.description}\n特徴:\n${service.features?.map(f => `- ${f}`).join('\n')}`,
                 metadata: {
           entities: ['buzzlab', 'sns-marketing'],
           keywords: [service.title, ...(service.features || [])],
           semanticContext: ['サービス', 'SNSマーケティング', 'BuzzLabサービス'],
          url: `/services#service-${index}`,
          lastUpdated: new Date().toISOString(),
          relevanceScore: 0.9
        },
        clusterId: this.determineServiceCluster(service.title)
      })
    })

    // 実績データ
    achievementsData.forEach((achievement, index) => {
      contents.push({
        id: `achievement-${index}`,
        type: 'page',
        title: achievement.title,
        content: `【成功事例】${achievement.title}\n${achievement.description}\nカテゴリ: ${achievement.category}`,
                 metadata: {
           entities: ['buzzlab', 'keita-mori', 'brand-off-event'],
          keywords: [achievement.title, achievement.category, '成功事例', '実績'],
          semanticContext: ['実績', '成功事例', 'ケーススタディ'],
          url: achievement.link || `/achievements#${index}`,
          lastUpdated: new Date().toISOString(),
          relevanceScore: 0.85
        },
        clusterId: 'sns-marketing-cluster'
      })
    })

    // FAQデータ
    faqsData.forEach((faq, index) => {
      contents.push({
        id: `faq-${index}`,
        type: 'faq',
        title: `FAQ: ${faq.question}`,
        content: `質問: ${faq.question}\n回答: ${faq.answer}`,
                 metadata: {
           entities: ['buzzlab', 'sns-marketing'],
           keywords: this.extractKeywords(faq.question + ' ' + faq.answer),
          semanticContext: ['FAQ', 'よくある質問', 'サポート'],
          url: `/faq#question-${index}`,
          lastUpdated: new Date().toISOString(),
          relevanceScore: 0.7
        }
      })
    })

    return contents
  }

  // 著者データの変換
  private convertAuthorData(): VectorContent[] {
    const contents: VectorContent[] = []

    // 代表者情報
    contents.push({
      id: 'author-profile',
      type: 'about',
      title: `${defaultAuthor.name} - 代表者プロフィール`,
      content: `
        【代表者情報】
        名前: ${defaultAuthor.name}
        役職: ${defaultAuthor.title}
        会社: ${defaultAuthor.company}
        
        プロフィール:
        ${defaultAuthor.description}
        
        ソーシャルメディア:
        ${Object.entries(defaultAuthor.socialLinks || {}).map(([platform, url]) => 
          `- ${platform}: ${url}`
        ).join('\n')}
      `,
             metadata: {
         entities: ['keita-mori', 'ace-dream-llc', 'buzzlab'],
        keywords: [defaultAuthor.name, 'SNS専門家', '代表', 'プロフィール'],
        semanticContext: ['代表者', '人物情報', 'SNS専門家', '会社概要'],
        url: '/about',
        lastUpdated: new Date().toISOString(),
        relevanceScore: 1.0
      },
      clusterId: 'sns-marketing-cluster'
    })

    // SNS実績情報
    contents.push({
      id: 'sns-achievements',
      type: 'about',
      title: '盛啓太のSNS実績',
      content: `
        【SNS実績】
        - 総フォロワー数: 20万人以上
        - イベント売上: 3億円超
        - 広告費: 200万円以下
        - 動員数: 2万人以上
        
        プラットフォーム別実績:
        - Instagram: フォロワー急増とエンゲージメント最適化
        - TikTok: バイラル動画制作と戦略的運用
        - YouTube: コンテンツ最適化と収益化
      `,
      metadata: {
        entities: ['keita-mori', 'instagram', 'tiktok', 'youtube'],
        keywords: ['SNS実績', 'フォロワー', '売上', '実績'],
        semanticContext: ['実績', 'SNS専門家', '成果'],
        url: '/about#achievements',
        lastUpdated: new Date().toISOString(),
        relevanceScore: 0.95
      },
      clusterId: 'sns-marketing-cluster'
    })

    return contents
  }

  // メタコンテンツの生成
  private generateMetaContents(): VectorContent[] {
    const contents: VectorContent[] = []

    // 会社概要
    contents.push({
      id: 'company-overview',
      type: 'about',
             title: 'BuzzLab会社概要',
       content: `
         【BuzzLabについて】
        SNSマーケティング専門のコンサルティング会社です。
        
        ミッション:
        SNS×AIのハイブリッド運用で、クライアントの集客と売上を最速化する
        
        専門領域:
        - SNS分析・最適化
        - コンテンツ戦略設計  
        - フォロワー急増キャンペーン
        - インフルエンサー連携・PR
        - SNS広告運用最適化
        - バズる動画編集・広告動画編集
        
        強み:
        データドリブン×クリエイティブの融合による最先端アプローチ
      `,
             metadata: {
         entities: ['buzzlab', 'sns-marketing', 'keita-mori'],
         keywords: ['BuzzLab', '会社概要', 'SNSマーケティング', 'コンサルティング'],
        semanticContext: ['会社情報', '企業概要', 'ミッション'],
        url: '/about#company',
        lastUpdated: new Date().toISOString(),
        relevanceScore: 0.9
      },
      clusterId: 'sns-marketing-cluster'
    })

    // 対応プラットフォーム
    contents.push({
      id: 'supported-platforms',
      type: 'service',
      title: '対応SNSプラットフォーム',
      content: `
        【対応プラットフォーム】
        
        主要プラットフォーム:
        - Instagram: ビジュアル重視のマーケティング
        - TikTok: バイラル動画とZ世代リーチ
        - YouTube: 長期的なコンテンツ戦略
        
        その他対応:
        - Twitter (X): リアルタイム情報発信
        - Facebook: 幅広い年齢層へのアプローチ
        - LinkedIn: B2Bマーケティング
        
        プラットフォーム選択:
        お客様のビジネスに最適なプラットフォームをご提案
      `,
      metadata: {
        entities: ['instagram', 'tiktok', 'youtube', 'sns-marketing'],
        keywords: ['プラットフォーム', 'Instagram', 'TikTok', 'YouTube', 'SNS'],
        semanticContext: ['対応サービス', 'プラットフォーム', 'SNS種類'],
        url: '/platforms',
        lastUpdated: new Date().toISOString(),
        relevanceScore: 0.8
      }
    })

    return contents
  }

  // サービスのクラスター判定
  private determineServiceCluster(serviceTitle: string): string | undefined {
    if (serviceTitle.includes('Instagram') || serviceTitle.includes('インスタ')) {
      return 'instagram-cluster'
    }
    if (serviceTitle.includes('TikTok') || serviceTitle.includes('動画')) {
      return 'tiktok-cluster'
    }
    return 'sns-marketing-cluster'
  }

  // キーワード抽出
  private extractKeywords(text: string): string[] {
    // 日本語と英語のキーワードを抽出
    const keywords = text
      .toLowerCase()
      .replace(/[「」『』（）()]/g, ' ')
      .match(/[ぁ-ん一-龯a-z]{2,}/g) || []
    
    // 重複削除と長さフィルタ
    return Array.from(new Set(keywords))
      .filter(word => word.length >= 2 && word.length <= 20)
      .slice(0, 15)
  }

  // バッチでコンテンツを保存
  private async storeContentsBatch(contents: VectorContent[]): Promise<void> {
    const batchSize = 5 // 小さめのバッチサイズで安全に処理
    const batches = []
    
    for (let i = 0; i < contents.length; i += batchSize) {
      batches.push(contents.slice(i, i + batchSize))
    }

    console.log(`📦 ${batches.length}個のバッチで処理開始...`)

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      
      try {
        console.log(`⏳ バッチ ${i + 1}/${batches.length} 処理中... (${batch.length}件)`)
        await buzzKingsVectorSystem.vectorizeAndStoreBatch(batch)
        console.log(`✅ バッチ ${i + 1} 完了`)
        
        // バッチ間で少し待機（レート制限対策）
        if (i < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
        
      } catch (error) {
        const errorMsg = `バッチ ${i + 1} エラー: ${error instanceof Error ? error.message : 'Unknown error'}`
        console.error(`❌ ${errorMsg}`)
        this.errors.push(errorMsg)
        
        // エラーが発生しても続行
        continue
      }
    }
  }

  // タイプ別集計
  private getContentsByType(contents: VectorContent[]): Record<string, number> {
    const typeCount: Record<string, number> = {}
    
    contents.forEach(content => {
      typeCount[content.type] = (typeCount[content.type] || 0) + 1
    })
    
    return typeCount
  }

  // クラスター別集計
  private getContentsByClusters(contents: VectorContent[]): Record<string, number> {
    const clusterCount: Record<string, number> = {}
    
    contents.forEach(content => {
      if (content.clusterId) {
        clusterCount[content.clusterId] = (clusterCount[content.clusterId] || 0) + 1
      }
    })
    
    return clusterCount
  }

  // 検索・フィルタ機能
  searchContentsByType(type: string): VectorContent[] {
    // 実装は今後追加
    return []
  }

  searchContentsByCluster(clusterId: string): VectorContent[] {
    // 実装は今後追加
    return []
  }

  // 統計情報取得
  async getVectorizationStats(): Promise<{
    totalContents: number
    lastVectorization: string
    contentTypes: Record<string, number>
    clusters: Record<string, number>
  }> {
    // 簡易的な統計（実際にはPGVectorから取得）
    return {
      totalContents: 0,
      lastVectorization: new Date().toISOString(),
      contentTypes: {},
      clusters: {}
    }
  }
}

// シングルトンインスタンス
export const simplifiedVectorizer = new SimplifiedVectorizer()

// 便利な実行関数
export async function executeVectorization(): Promise<VectorizationResult> {
        console.log('🎯 BuzzLab簡素化ベクトル化実行...')
  return await simplifiedVectorizer.vectorizeAllContent()
}

export default SimplifiedVectorizer 
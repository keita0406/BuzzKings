/**
 * BuzzLab サイト全体ベクトル化システム
 * 全ページ・コンテンツを自動的にPGVectorに格納
 */

import { buzzKingsVectorSystem } from './vector-system'
import { VectorContent } from './vector-system'
import { buzzKingsEntityMap } from './entity-mapping'
import { buzzKingsTopicClusters } from './topic-clusters'
import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'

export interface SiteVectorizationConfig {
  baseUrl: string
  pagesDirectory: string
  componentsDirectory: string
  contentDirectory?: string
  excludePatterns: string[]
  includeStaticData: boolean
  batchSize: number
}

export interface PageMetadata {
  type: 'page' | 'component' | 'blog' | 'service' | 'about' | 'entity'
  category: string
  entities: string[]
  keywords: string[]
  semanticContext: string[]
  lastModified: string
  clusterId?: string
  importance: number
}

class BuzzKingsSiteVectorizer {
  private config: SiteVectorizationConfig
  private vectorizedContents: VectorContent[] = []

  constructor(config: SiteVectorizationConfig) {
    this.config = config
  }

  // サイト全体のベクトル化実行
  async vectorizeSite(): Promise<{
    totalPages: number
    vectorizedContents: VectorContent[]
    entitiesProcessed: number
    clustersProcessed: number
    success: boolean
  }> {
          console.log('🚀 BuzzLab サイト全体ベクトル化開始...')

    try {
      // 1. Next.js ページファイルを処理
      const pages = await this.processNextJSPages()
      console.log(`📄 ${pages.length} ページを処理`)

      // 2. コンポーネントファイルを処理
      const components = await this.processComponents()
      console.log(`🧩 ${components.length} コンポーネントを処理`)

      // 3. 静的データを処理
      const staticData = await this.processStaticData()
      console.log(`📊 ${staticData.length} 静的データを処理`)

      // 4. エンティティマップを処理
      const entities = await this.processEntityMap()
      console.log(`🏷️  ${entities.length} エンティティを処理`)

      // 5. トピッククラスターを処理
      const clusters = await this.processTopicClusters()
      console.log(`📁 ${clusters.length} クラスターを処理`)

      // 全コンテンツを統合
      this.vectorizedContents = [
        ...pages,
        ...components,
        ...staticData,
        ...entities,
        ...clusters
      ]

      // 6. バッチでPGVectorに保存
      await this.storeInBatches()

      console.log('✅ サイト全体ベクトル化完了！')

      return {
        totalPages: this.vectorizedContents.length,
        vectorizedContents: this.vectorizedContents,
        entitiesProcessed: entities.length,
        clustersProcessed: clusters.length,
        success: true
      }

    } catch (error) {
      console.error('❌ ベクトル化エラー:', error)
      return {
        totalPages: 0,
        vectorizedContents: [],
        entitiesProcessed: 0,
        clustersProcessed: 0,
        success: false
      }
    }
  }

  // Next.js ページファイルの処理
  private async processNextJSPages(): Promise<VectorContent[]> {
    const pagesPath = path.join(process.cwd(), this.config.pagesDirectory)
    const pageContents: VectorContent[] = []

    const processDirectory = async (dirPath: string, urlPath: string = ''): Promise<void> => {
      if (!fs.existsSync(dirPath)) return

      const items = fs.readdirSync(dirPath)

      for (const item of items) {
        const itemPath = path.join(dirPath, item)
        const stat = fs.statSync(itemPath)

        if (stat.isDirectory()) {
          await processDirectory(itemPath, `${urlPath}/${item}`)
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
          const content = await this.extractPageContent(itemPath, urlPath, item)
          if (content) {
            pageContents.push(content)
          }
        }
      }
    }

    await processDirectory(pagesPath)
    return pageContents
  }

  // ページコンテンツの抽出
  private async extractPageContent(filePath: string, urlPath: string, fileName: string): Promise<VectorContent | null> {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      
      // メタデータの抽出
      const metadata = this.extractMetadataFromFile(fileContent, filePath)
      
      // ページタイプの判定
      const pageType = this.determinePageType(urlPath, fileName, fileContent)
      
      // テキストコンテンツの抽出
      const textContent = this.extractTextFromTSX(fileContent)
      
      // タイトルの抽出
      const title = this.extractTitle(fileContent, urlPath)

      const vectorContent: VectorContent = {
        id: `page-${urlPath.replace(/\//g, '-') || 'root'}-${fileName.replace(/\.(tsx|ts)$/, '')}`,
        type: pageType,
        title: title,
        content: textContent,
        metadata: {
          entities: metadata.entities,
          keywords: metadata.keywords,
          semanticContext: metadata.semanticContext,
          url: urlPath || '/',
          lastUpdated: metadata.lastModified,
          relevanceScore: metadata.importance
        },
        clusterId: metadata.clusterId
      }

      return vectorContent

    } catch (error) {
      console.error(`ページ処理エラー: ${filePath}`, error)
      return null
    }
  }

  // コンポーネントファイルの処理
  private async processComponents(): Promise<VectorContent[]> {
    const componentsPath = path.join(process.cwd(), this.config.componentsDirectory)
    const componentContents: VectorContent[] = []

    const processComponentsDir = async (dirPath: string): Promise<void> => {
      if (!fs.existsSync(dirPath)) return

      const items = fs.readdirSync(dirPath)

      for (const item of items) {
        const itemPath = path.join(dirPath, item)
        const stat = fs.statSync(itemPath)

        if (stat.isDirectory()) {
          await processComponentsDir(itemPath)
        } else if (item.endsWith('.tsx') && !item.startsWith('.')) {
          const content = await this.extractComponentContent(itemPath, item)
          if (content) {
            componentContents.push(content)
          }
        }
      }
    }

    await processComponentsDir(componentsPath)
    return componentContents
  }

  // コンポーネントコンテンツの抽出
  private async extractComponentContent(filePath: string, fileName: string): Promise<VectorContent | null> {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const textContent = this.extractTextFromTSX(fileContent)
      const componentName = fileName.replace('.tsx', '')

      // コンポーネントの重要度判定
      const importance = this.calculateComponentImportance(componentName, textContent)
      
      if (importance < 0.3) return null // 重要度が低いコンポーネントはスキップ

      const vectorContent: VectorContent = {
        id: `component-${componentName}`,
        type: 'page',
        title: `${componentName} コンポーネント`,
        content: textContent,
        metadata: {
          entities: this.extractEntitiesFromText(textContent),
          keywords: this.extractKeywordsFromText(textContent),
          semanticContext: [`${componentName}コンポーネント`, 'UI要素'],
          url: `/components/${componentName}`,
          lastUpdated: new Date().toISOString(),
          relevanceScore: importance
        }
      }

      return vectorContent

    } catch (error) {
      console.error(`コンポーネント処理エラー: ${filePath}`, error)
      return null
    }
  }

  // 静的データの処理
  private async processStaticData(): Promise<VectorContent[]> {
    const staticContents: VectorContent[] = []

    try {
      // lib/staticData.ts からサービスデータを抽出
      const staticDataPath = path.join(process.cwd(), 'lib/staticData.ts')
      if (fs.existsSync(staticDataPath)) {
        const { servicesData, achievementsData, faqsData } = await import('../staticData')

        // サービスデータのベクトル化
        servicesData?.forEach((service: any, index: number) => {
          staticContents.push({
            id: `service-${index}`,
            type: 'page',
            title: service.title,
            content: `${service.title}: ${service.description}. 特徴: ${service.features?.join(', ')}`,
            metadata: {
              entities: ['buzzking', 'sns-marketing'],
              keywords: [service.title, ...service.features || []],
              semanticContext: ['サービス', 'SNSマーケティング'],
              url: `/service/${index}`,
              lastUpdated: new Date().toISOString(),
              relevanceScore: 0.9
            },
            clusterId: 'sns-marketing-cluster'
          })
        })

        // 実績データのベクトル化
        achievementsData?.forEach((achievement: any, index: number) => {
          staticContents.push({
            id: `achievement-${index}`,
            type: 'page',
            title: achievement.title,
            content: `${achievement.title}: ${achievement.description}. カテゴリ: ${achievement.category}`,
            metadata: {
              entities: ['buzzking', 'brand-off-event'],
              keywords: [achievement.title, achievement.category],
              semanticContext: ['実績', '成功事例'],
              url: achievement.link || `/achievement/${index}`,
              lastUpdated: new Date().toISOString(),
              relevanceScore: 0.8
            },
            clusterId: 'sns-marketing-cluster'
          })
        })

        // FAQデータのベクトル化
        faqsData?.forEach((faq: any, index: number) => {
          staticContents.push({
            id: `faq-${index}`,
            type: 'faq',
            title: faq.question,
            content: `Q: ${faq.question} A: ${faq.answer}`,
            metadata: {
              entities: ['buzzking', 'sns-marketing'],
              keywords: this.extractKeywordsFromText(faq.question + ' ' + faq.answer),
              semanticContext: ['FAQ', 'よくある質問'],
              url: `/faq#${index}`,
              lastUpdated: new Date().toISOString(),
              relevanceScore: 0.7
            }
          })
        })
      }

      // authorData.ts からも抽出
      const authorDataPath = path.join(process.cwd(), 'lib/authorData.ts')
      if (fs.existsSync(authorDataPath)) {
        const { defaultAuthor } = await import('../authorData')
        
        staticContents.push({
          id: 'author-keita-mori',
          type: 'page',
          title: `${defaultAuthor.name} - ${defaultAuthor.title}`,
          content: `${defaultAuthor.name}は${defaultAuthor.company}の${defaultAuthor.title}。${defaultAuthor.description}`,
          metadata: {
            entities: ['keita-mori', 'ace-dream-llc', 'buzzking'],
            keywords: [defaultAuthor.name, defaultAuthor.title, 'SNS専門家'],
            semanticContext: ['代表者', '人物', 'SNS専門家'],
            url: '/about',
            lastUpdated: new Date().toISOString(),
            relevanceScore: 1.0
          },
          clusterId: 'sns-marketing-cluster'
        })
      }

    } catch (error) {
      console.error('静的データ処理エラー:', error)
    }

    return staticContents
  }

  // エンティティマップの処理
  private async processEntityMap(): Promise<VectorContent[]> {
    const entityContents: VectorContent[] = []

    Object.entries(buzzKingsEntityMap).forEach(([id, entity]) => {
      entityContents.push({
        id: `entity-${id}`,
        type: 'entity',
        title: entity.name,
        content: `${entity.name} (${entity.type}): ${entity.description}. 関連: ${entity.relatedEntities.join(', ')}. トピック関連性: ${Object.keys(entity.topicRelevance).join(', ')}`,
        metadata: {
          entities: [id, ...entity.relatedEntities],
          keywords: [entity.name, entity.type, ...Object.keys(entity.topicRelevance)],
          semanticContext: ['エンティティ', entity.type, 'ナレッジグラフ'],
          url: `/entity/${id}`,
          lastUpdated: new Date().toISOString(),
          relevanceScore: entity.importance
        }
      })
    })

    return entityContents
  }

  // トピッククラスターの処理
  private async processTopicClusters(): Promise<VectorContent[]> {
    const clusterContents: VectorContent[] = []

    Object.entries(buzzKingsTopicClusters).forEach(([id, cluster]) => {
      // メインクラスターページ
      clusterContents.push({
        id: `cluster-${id}`,
        type: 'page',
        title: cluster.pillarPage.title,
        content: `${cluster.name}: ${cluster.pillarPage.description}. キーワード: ${cluster.targetKeywords.join(', ')}. セマンティック: ${cluster.semanticKeywords.join(', ')}. 対象: ${cluster.pillarPage.targetAudience.join(', ')}`,
        metadata: {
          entities: Object.keys(cluster.entityRelevance),
          keywords: [...cluster.targetKeywords, ...cluster.semanticKeywords],
          semanticContext: ['トピッククラスター', cluster.type],
          url: cluster.pillarPage.slug,
          lastUpdated: new Date().toISOString(),
          relevanceScore: cluster.internalLinkingScore
        },
        clusterId: id
      })

      // クラスター内コンテンツ
      cluster.clusterContent.forEach((content, index) => {
        clusterContents.push({
          id: `cluster-content-${id}-${index}`,
          type: 'blog',
          title: content.title,
          content: `${content.title}: ${content.description}. キーワード: ${content.supportingKeywords.join(', ')}`,
          metadata: {
            entities: [content.relatedEntity],
            keywords: content.supportingKeywords,
            semanticContext: ['クラスターコンテンツ', content.contentType],
            url: content.slug,
            lastUpdated: new Date().toISOString(),
            relevanceScore: 0.8
          },
          clusterId: id
        })
      })
    })

    return clusterContents
  }

  // バッチでPGVectorに保存
  private async storeInBatches(): Promise<void> {
    const batchSize = this.config.batchSize
    
    for (let i = 0; i < this.vectorizedContents.length; i += batchSize) {
      const batch = this.vectorizedContents.slice(i, i + batchSize)
      console.log(`📦 バッチ ${Math.floor(i / batchSize) + 1}/${Math.ceil(this.vectorizedContents.length / batchSize)} を処理中...`)
      
      try {
        await buzzKingsVectorSystem.vectorizeAndStoreBatch(batch)
        console.log(`✅ バッチ ${Math.floor(i / batchSize) + 1} 完了`)
      } catch (error) {
        console.error(`❌ バッチ ${Math.floor(i / batchSize) + 1} エラー:`, error)
        throw error
      }
    }
  }

  // ユーティリティメソッド群
  private extractMetadataFromFile(content: string, filePath: string): PageMetadata {
    const entities = this.extractEntitiesFromText(content)
    const keywords = this.extractKeywordsFromText(content)
    const semanticContext = this.extractSemanticContext(content, filePath)
    
    return {
      type: this.determinePageType('', path.basename(filePath), content),
      category: this.determineCategory(filePath),
      entities,
      keywords,
      semanticContext,
      lastModified: new Date().toISOString(),
      clusterId: this.assignCluster(entities, keywords),
      importance: this.calculateImportance(entities, keywords)
    }
  }

  private extractTextFromTSX(content: string): string {
    // TSXファイルからテキストコンテンツを抽出
    const textMatches = content.match(/>([^<]+)</g) || []
    const jsxTexts = textMatches
      .map(match => match.slice(1, -1).trim())
      .filter(text => text.length > 2 && !text.match(/^[{}\[\]();&]+$/))
      .join(' ')

    // 文字列リテラルからも抽出
    const stringMatches = content.match(/['"`]([^'"`]+)['"`]/g) || []
    const stringTexts = stringMatches
      .map(match => match.slice(1, -1))
      .filter(text => text.length > 5 && !text.includes('className') && !text.includes('src'))
      .join(' ')

    return `${jsxTexts} ${stringTexts}`.trim()
  }

  private extractEntitiesFromText(text: string): string[] {
    const entities: string[] = []
    
    Object.entries(buzzKingsEntityMap).forEach(([id, entity]) => {
      if (text.toLowerCase().includes(entity.name.toLowerCase())) {
        entities.push(id)
      }
    })

    return Array.from(new Set(entities))
  }

  private extractKeywordsFromText(text: string): string[] {
    const keywords = text
      .toLowerCase()
      .match(/[ぁ-ん一-龯a-z]{2,}/g) || []
    
    return Array.from(new Set(keywords))
      .filter(word => word.length >= 2)
      .slice(0, 10)
  }

  private extractSemanticContext(content: string, filePath: string): string[] {
    const context: string[] = []
    
    if (filePath.includes('instagram')) context.push('Instagram')
    if (filePath.includes('tiktok')) context.push('TikTok')
    if (filePath.includes('youtube')) context.push('YouTube')
    if (filePath.includes('blog')) context.push('ブログ')
    if (filePath.includes('service')) context.push('サービス')
    if (filePath.includes('about')) context.push('会社概要')
    
    return context
  }

  private determinePageType(urlPath: string, fileName: string, content: string): 'page' | 'component' | 'blog' | 'service' | 'about' | 'entity' {
    if (fileName.includes('blog') || urlPath.includes('blog')) return 'blog'
    if (fileName.includes('service') || urlPath.includes('service')) return 'service'
    if (fileName.includes('about') || urlPath.includes('about')) return 'about'
    if (urlPath.includes('entity')) return 'entity'
    return 'page'
  }

  private determineCategory(filePath: string): string {
    if (filePath.includes('instagram')) return 'Instagram'
    if (filePath.includes('tiktok')) return 'TikTok'
    if (filePath.includes('youtube')) return 'YouTube'
    if (filePath.includes('admin')) return 'Admin'
    return 'General'
  }

  private assignCluster(entities: string[], keywords: string[]): string | undefined {
    if (entities.includes('instagram') || keywords.some(k => k.includes('instagram'))) {
      return 'instagram-cluster'
    }
    if (entities.includes('tiktok') || keywords.some(k => k.includes('tiktok'))) {
      return 'tiktok-cluster'
    }
    if (entities.includes('sns-marketing') || keywords.some(k => k.includes('sns'))) {
      return 'sns-marketing-cluster'
    }
    return undefined
  }

  private calculateImportance(entities: string[], keywords: string[]): number {
    let importance = 0.5 // ベース値
    
    // 重要エンティティの存在で加点
    if (entities.includes('buzzking')) importance += 0.3
    if (entities.includes('keita-mori')) importance += 0.2
    if (entities.includes('sns-marketing')) importance += 0.2
    
    // キーワード数で調整
    importance += Math.min(keywords.length * 0.01, 0.2)
    
    return Math.min(importance, 1.0)
  }

  private calculateComponentImportance(componentName: string, content: string): number {
    const importantComponents = [
      'HeroSection', 'ServicesSection', 'ContactSection',
      'AuthorSection', 'TestimonialsSection', 'FAQSection'
    ]
    
    if (importantComponents.includes(componentName)) return 0.8
    if (content.length > 500) return 0.6
    if (content.length > 200) return 0.4
    return 0.2
  }

  private extractTitle(content: string, urlPath: string): string {
    // メタデータからタイトルを抽出
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/)
    if (titleMatch) return titleMatch[1]
    
    // export default functionの名前から推測
    const functionMatch = content.match(/export\s+default\s+function\s+(\w+)/)
    if (functionMatch) return `${functionMatch[1]} ページ`
    
    // URLパスから推測
    const pathSegments = urlPath.split('/').filter(Boolean)
    if (pathSegments.length > 0) {
      return pathSegments[pathSegments.length - 1] + ' ページ'
    }
    
          return 'BuzzLab ページ'
  }

  // 検索・取得メソッド
  getVectorizedContents(): VectorContent[] {
    return this.vectorizedContents
  }

  getContentsByType(type: string): VectorContent[] {
    return this.vectorizedContents.filter(content => content.type === type)
  }

  getContentsByCluster(clusterId: string): VectorContent[] {
    return this.vectorizedContents.filter(content => content.clusterId === clusterId)
  }
}

// デフォルト設定
export const defaultVectorizationConfig: SiteVectorizationConfig = {
  baseUrl: 'https://buzzlab8.jp',
  pagesDirectory: 'app',
  componentsDirectory: 'components',
  contentDirectory: 'content',
  excludePatterns: [
    'node_modules',
    '.next',
    '.git',
    'api/test-',
    '*.test.ts',
    '*.spec.ts'
  ],
  includeStaticData: true,
  batchSize: 10
}

// シングルトンインスタンス
export const buzzKingsSiteVectorizer = new BuzzKingsSiteVectorizer(defaultVectorizationConfig)

export default BuzzKingsSiteVectorizer 
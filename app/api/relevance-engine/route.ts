/**
 * BuzzLab レリバンスエンジニアリング API
 * Next.js App Router API エンドポイント
 */

import { NextRequest, NextResponse } from 'next/server'
import { buzzKingsRelevanceEngine } from '@/lib/relevance-engineering'

// GET: システム状態とエンティティ情報取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const entityId = searchParams.get('entityId')
    const clusterId = searchParams.get('clusterId')
    const query = searchParams.get('query')

    switch (action) {
      case 'status':
        const status = buzzKingsRelevanceEngine.getSystemStatus()
        return NextResponse.json({ success: true, data: status })

      case 'entities':
        if (entityId) {
          const entity = buzzKingsRelevanceEngine.entity.get(entityId)
          const related = buzzKingsRelevanceEngine.entity.getRelated(entityId)
          return NextResponse.json({ 
            success: true, 
            data: { entity, related } 
          })
        } else {
          const entities = buzzKingsRelevanceEngine.entity.getAll()
          return NextResponse.json({ success: true, data: entities })
        }

      case 'clusters':
        if (clusterId) {
          const cluster = buzzKingsRelevanceEngine.clusters.get(clusterId)
          const relationships = buzzKingsRelevanceEngine.clusters.getRelationships(clusterId)
          const seoScore = buzzKingsRelevanceEngine.clusters.calculateSEOScore(clusterId)
          const internalLinks = buzzKingsRelevanceEngine.clusters.generateInternalLinks(clusterId)
          
          return NextResponse.json({ 
            success: true, 
            data: { cluster, relationships, seoScore, internalLinks } 
          })
        } else {
          const clusters = buzzKingsRelevanceEngine.clusters.getAll()
          const gaps = buzzKingsRelevanceEngine.clusters.analyzeGaps()
          return NextResponse.json({ success: true, data: { clusters, gaps } })
        }

      case 'triples':
        const subject = searchParams.get('subject')
        const predicate = searchParams.get('predicate')
        const object = searchParams.get('object')
        
        const triples = buzzKingsRelevanceEngine.triples.find(subject || undefined, predicate || undefined, object || undefined)
        return NextResponse.json({ success: true, data: triples })

      case 'search':
        if (!query) {
          return NextResponse.json({ 
            success: false, 
            error: 'Query parameter is required for search' 
          }, { status: 400 })
        }
        
        const searchResults = await buzzKingsRelevanceEngine.vector.search(query, {
          limit: parseInt(searchParams.get('limit') || '10'),
          threshold: parseFloat(searchParams.get('threshold') || '0.7')
        })
        
        return NextResponse.json({ success: true, data: searchResults })

      case 'structured-data':
        const pageType = searchParams.get('pageType') || 'home'
        const pageId = searchParams.get('pageId')
        
        const structuredData = buzzKingsRelevanceEngine.structuredData.generateIntegrated(pageType, pageId || undefined)
        return NextResponse.json({ success: true, data: structuredData })

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action parameter. Available actions: status, entities, clusters, triples, search, structured-data' 
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Relevance Engine API Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST: ページ分析、コンテンツベクトル化、データ更新
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'analyze-page':
        const { pageUrl, content } = data
        if (!pageUrl || !content) {
          return NextResponse.json({ 
            success: false, 
            error: 'pageUrl and content are required for page analysis' 
          }, { status: 400 })
        }

        const analysis = await buzzKingsRelevanceEngine.analyzePageRelevance(pageUrl, content)
        return NextResponse.json({ success: true, data: analysis })

      case 'vectorize-content':
        const { contentData } = data
        if (!contentData) {
          return NextResponse.json({ 
            success: false, 
            error: 'contentData is required for vectorization' 
          }, { status: 400 })
        }

        if (Array.isArray(contentData)) {
          // バッチベクトル化
          await buzzKingsRelevanceEngine.vector.storeBatch(contentData)
          return NextResponse.json({ 
            success: true, 
            message: `${contentData.length} contents vectorized successfully` 
          })
        } else {
          // 単一コンテンツベクトル化
          await buzzKingsRelevanceEngine.vector.storeContent(contentData)
          return NextResponse.json({ 
            success: true, 
            message: 'Content vectorized successfully' 
          })
        }

      case 'analyze-relevance':
        const { contentId } = data
        if (!contentId) {
          return NextResponse.json({ 
            success: false, 
            error: 'contentId is required for relevance analysis' 
          }, { status: 400 })
        }

        const relevanceAnalysis = await buzzKingsRelevanceEngine.vector.analyzeRelevance(contentId)
        return NextResponse.json({ success: true, data: relevanceAnalysis })

      case 'generate-embeddings':
        const { texts } = data
        if (!texts || !Array.isArray(texts)) {
          return NextResponse.json({ 
            success: false, 
            error: 'texts array is required for embedding generation' 
          }, { status: 400 })
        }

        const embeddings = await buzzKingsRelevanceEngine.vector.embedBatch(texts)
        return NextResponse.json({ success: true, data: embeddings })

      case 'init-vector-db':
        await buzzKingsRelevanceEngine.vector.initDB()
        return NextResponse.json({ 
          success: true, 
          message: 'Vector database initialized successfully' 
        })

      case 'similarity-analysis':
        const { entity1, entity2 } = data
        if (!entity1 || !entity2) {
          return NextResponse.json({ 
            success: false, 
            error: 'entity1 and entity2 are required for similarity analysis' 
          }, { status: 400 })
        }

        const similarity = buzzKingsRelevanceEngine.entity.calculateSimilarity(entity1, entity2)
        const relationshipStrength = buzzKingsRelevanceEngine.triples.getRelationshipStrength(entity1, entity2)
        
        return NextResponse.json({ 
          success: true, 
          data: { similarity, relationshipStrength } 
        })

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action parameter. Available actions: analyze-page, vectorize-content, analyze-relevance, generate-embeddings, init-vector-db, similarity-analysis' 
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Relevance Engine POST API Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// PUT: エンティティやクラスターの更新
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'update-entity':
        // エンティティの更新ロジック（今後実装）
        return NextResponse.json({ 
          success: true, 
          message: 'Entity update functionality will be implemented' 
        })

      case 'update-cluster':
        // クラスターの更新ロジック（今後実装）
        return NextResponse.json({ 
          success: true, 
          message: 'Cluster update functionality will be implemented' 
        })

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action parameter for PUT request' 
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Relevance Engine PUT API Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// システム初期化用のエンドポイント
export async function PATCH(request: NextRequest) {
  try {
    await buzzKingsRelevanceEngine.initialize()
    const status = buzzKingsRelevanceEngine.getSystemStatus()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Relevance Engineering System initialized successfully',
      status 
    })

  } catch (error) {
    console.error('Relevance Engine initialization error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'System initialization failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 
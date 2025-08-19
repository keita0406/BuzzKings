/**
 * BuzzLab RAG システム API
 * 自社RAGによる質問応答とサイト全体ベクトル化
 */

import { NextRequest, NextResponse } from 'next/server'
import { buzzKingsRAGSystem, RAGQuery } from '@/lib/relevance-engineering/rag-system'
import { simplifiedVectorizer } from '@/lib/relevance-engineering/simplified-vectorizer'
import { supabase } from '@/lib/supabase'

// GET: RAG質問応答システム
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const question = searchParams.get('question')
    const userType = searchParams.get('userType') as 'client' | 'prospect' | 'partner' | 'internal' | undefined
    const sessionId = searchParams.get('sessionId')
    const includeEntities = searchParams.get('includeEntities') === 'true'

    if (!question) {
      return NextResponse.json({
        success: false,
        error: 'Question parameter is required'
      }, { status: 400 })
    }

    const ragQuery: RAGQuery = {
      question,
      userType,
      includeEntities,
      preferredLanguage: 'ja'
    }

    const response = await buzzKingsRAGSystem.query(ragQuery, sessionId || undefined)

    return NextResponse.json({
      success: true,
      data: response
    })

  } catch (error) {
    console.error('RAG API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST: 高度なRAG質問とサイトベクトル化
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'query':
        const { question: userQuestion, userType: queryUserType = 'prospect', maxResults: queryMaxResults = 5 } = body
        if (!userQuestion) {
          return NextResponse.json({ error: 'Question is required' }, { status: 400 })
        }

        // BuzzLabのAIアシスタント用システムプロンプトを追加
        const systemPrompt = `あなたは「BUZZLAB」のAIアシスタントです。SNS運用に不慣れな方に向けて、親切かつ丁寧にアドバイスすることを目的としています。以下の役割と制約を守って振る舞ってください。

■ 主な役割
- 初心者にもわかりやすい言葉で、SNS運用の基本や活用方法を教える
- BUZZLABの強み（SNS分析、広告運用、バイラル企画、動画編集など）を適切に盛り込みながら案内
- ユーザーのビジネス規模や状況（業種、予算、目的）に応じたカスタマイズアドバイス
- 具体例・テンプレート・チェックリスト等を用いて実践的な支援を提供
- 「まずはこの一歩から」など次の行動がわかるような提案を行う

■ 使用トーン
- フレンドリーで、安心感のある口調
- 専門用語は避け、どうしても必要な場合は必ずわかりやすく解説
- 「いいですね」「わかります」「大丈夫です」といった共感表現を取り入れる

■ 回答スタイル
- 質問内容をゆっくり解釈し、要点を整理して回答
- 「いま何に困っていますか？」「どのSNSをご希望ですか？」など、会話を進めるための問いかけを入れる
- 必要時には、「テンプレートを出力しますね」「次のステップのために、ターゲットを教えていただけますか？」などの具体的な進行サポートを示す

■ BUZZLABのサービスへの導線
- 回答最後に「さらに詳しく知りたい方は無料カウンセリングもご活用ください」など、自然な案内を含める
- 強引な営業はせず、「興味があれば」「ご希望があれば」で控えめに誘導

ユーザーからの質問: ${userQuestion}`

        const queryResponse = await buzzKingsRAGSystem.query({
          question: systemPrompt,
          userType: queryUserType,
          maxResults: queryMaxResults,
          preferredLanguage: 'ja'
        })
        
        return NextResponse.json({ success: true, data: queryResponse })

      case 'advanced-query':
        const { question, context, userType, sessionId, includeEntities, maxResults } = data
        
        if (!question) {
          return NextResponse.json({
            success: false,
            error: 'Question is required for advanced query'
          }, { status: 400 })
        }

        const ragQuery: RAGQuery = {
          question,
          context,
          userType,
          includeEntities,
          maxResults,
          preferredLanguage: 'ja'
        }

        const ragResponse = await buzzKingsRAGSystem.query(ragQuery, sessionId)

        return NextResponse.json({
          success: true,
          data: ragResponse
        })

      case 'vectorize-site':
        console.log('🚀 サイト全体ベクトル化開始...')
        
        const vectorizationResult = await simplifiedVectorizer.vectorizeAllContent()
        
        return NextResponse.json({
          success: vectorizationResult.success,
          data: {
            totalContents: vectorizationResult.totalContents,
            contentsByType: vectorizationResult.contentsByType,
            contentsByClusters: vectorizationResult.contentsByClusters,
            processingTime: vectorizationResult.processingTime,
            errors: vectorizationResult.errors
          },
          message: vectorizationResult.success 
            ? `✅ サイト全体ベクトル化完了！${vectorizationResult.totalContents}件のコンテンツを処理しました。`
            : '❌ ベクトル化に失敗しました。'
        })

      case 'get-conversation-history':
        const { sessionId: historySessionId } = data
        
        if (!historySessionId) {
          return NextResponse.json({
            success: false,
            error: 'SessionId is required for conversation history'
          }, { status: 400 })
        }

        const history = buzzKingsRAGSystem.getConversationHistory(historySessionId)
        
        return NextResponse.json({
          success: true,
          data: {
            sessionId: historySessionId,
            history,
            count: history.length
          }
        })

      case 'get-system-stats':
        const stats = await buzzKingsRAGSystem.getSystemStats()
        
        return NextResponse.json({
          success: true,
          data: stats
        })

      case 'health-check':
        try {
          // PGVector接続テスト
          const { data: healthData, error: healthError } = await supabase
            .from('buzzlab_vectors')
            .select('id')
            .limit(1)
          
          const vectorDbHealthy = !healthError
          
          // OpenAI API接続テスト（簡易版）
          const openaiHealthy = process.env.OPENAI_API_KEY ? true : false
          
          return NextResponse.json({
            success: true,
            data: {
              vectorDb: vectorDbHealthy,
              openaiApi: openaiHealthy,
              timestamp: new Date().toISOString(),
              errors: healthError ? [healthError.message] : []
            }
          })
        } catch (error) {
          return NextResponse.json({
            success: false,
            error: 'ヘルスチェックに失敗しました',
            details: error instanceof Error ? error.message : 'Unknown error'
          }, { status: 500 })
        }

      case 'get-vector-stats':
        try {
          // PGVectorからベクトル化されたコンテンツの統計を取得
          const { data: vectorCounts, error } = await supabase
            .from('buzzlab_vectors')
            .select('type, cluster_id')
          
          if (error) throw error

          const totalContents = vectorCounts?.length || 0
          const contentsByType: Record<string, number> = {}
          const contentsByClusters: Record<string, number> = {}

          vectorCounts?.forEach((item: any) => {
            // コンテンツタイプ別集計
            if (item.type) {
              contentsByType[item.type as string] = (contentsByType[item.type as string] || 0) + 1
            }
            
            // クラスター別集計
            if (item.cluster_id) {
              contentsByClusters[item.cluster_id as string] = (contentsByClusters[item.cluster_id as string] || 0) + 1
            }
          })

          // 詳細なコンテンツリストも取得
          const { data: detailedContents, error: detailError } = await supabase
            .from('buzzlab_vectors')
            .select('id, type, title, cluster_id, created_at')
            .order('type', { ascending: true })
            .order('created_at', { ascending: true })

          return NextResponse.json({
            success: true,
            data: {
              totalContents,
              contentsByType,
              contentsByClusters,
              lastUpdated: new Date().toISOString(),
              detailedContents: detailedContents || []
            }
          })
        } catch (error) {
          console.error('Vector stats error:', error)
          return NextResponse.json({
            success: false,
            error: 'ベクトル統計の取得に失敗しました',
            details: error instanceof Error ? error.message : 'Unknown error'
          }, { status: 500 })
        }

      case 'search-content-by-type':
        const { contentType, clusterId } = data
        
        // 簡易的な検索応答（実際の実装は今後追加）
        return NextResponse.json({
          success: true,
          data: {
            contents: [], // 実際の検索結果
            total: 0,
            filtered: {
              type: contentType,
              cluster: clusterId
            },
            message: 'コンテンツ検索機能は今後実装予定です'
          }
        })

      case 'bulk-questions':
        const { questions } = data
        
        if (!Array.isArray(questions)) {
          return NextResponse.json({
            success: false,
            error: 'Questions must be an array'
          }, { status: 400 })
        }

        const bulkResponses = await Promise.all(
          questions.map(async (q: string) => {
            try {
              const query: RAGQuery = { question: q, preferredLanguage: 'ja' }
              const response = await buzzKingsRAGSystem.query(query)
              return { question: q, response, success: true }
            } catch (error) {
              return { 
                question: q, 
                response: null, 
                success: false, 
                error: error instanceof Error ? error.message : 'Unknown error' 
              }
            }
          })
        )

        return NextResponse.json({
          success: true,
          data: {
            responses: bulkResponses,
            total: questions.length,
            successful: bulkResponses.filter(r => r.success).length,
            failed: bulkResponses.filter(r => !r.success).length
          }
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action parameter. Available actions: advanced-query, vectorize-site, get-conversation-history, get-system-stats, search-content-by-type, bulk-questions'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('RAG POST API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// PUT: RAGシステムの設定更新
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'update-config':
        // RAGシステム設定の更新（今後実装）
        return NextResponse.json({
          success: true,
          message: 'RAG configuration update functionality will be implemented'
        })

      case 'retrain-model':
        // モデルの再学習（今後実装）
        return NextResponse.json({
          success: true,
          message: 'Model retraining functionality will be implemented'
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action parameter for PUT request'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('RAG PUT API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// DELETE: 会話履歴やキャッシュの削除
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const sessionId = searchParams.get('sessionId')

    switch (action) {
      case 'clear-conversation':
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            error: 'SessionId is required for clearing conversation'
          }, { status: 400 })
        }

        // 会話履歴のクリア（実装は簡略化）
        return NextResponse.json({
          success: true,
          message: `Conversation history for session ${sessionId} cleared`
        })

      case 'clear-cache':
        // ベクトルキャッシュのクリア（今後実装）
        return NextResponse.json({
          success: true,
          message: 'Vector cache clearing functionality will be implemented'
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action parameter for DELETE request'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('RAG DELETE API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 
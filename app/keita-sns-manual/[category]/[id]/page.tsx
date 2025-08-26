/**
 * KEITA流SNSマニュアル詳細ページ（ディープリンク対応）
 * /keita-sns-manual/{category}/{id}
 */

import { notFound } from 'next/navigation'
import { keitaSNSManualData } from '@/lib/relevance-engineering/keita-sns-manual-rag'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, BookOpen, Tag, Star } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: {
    category: string
    id: string
  }
}

// カテゴリスラッグから元のカテゴリ名に変換
function categorySlugToName(slug: string): string {
  const categoryMap: Record<string, string> = {
    'プラットフォーム戦略': 'platform-strategy',
    'プラットフォーム特性': 'platform-features', 
    'バズテクニック': 'buzz-technique',
    'エンゲージメント': 'engagement',
    'ブランディング': 'branding',
    'バズ戦略': 'buzz-strategy',
    '収益化': 'monetization',
    '広告運用': 'advertising',
    'SNS戦略': 'sns-strategy',
    'ファン化': 'fan-building',
    '継続性': 'continuity',
    'アルゴリズム理解': 'algorithm-understanding',
    '投稿タイミング': 'posting-timing',
    'バズ分析': 'buzz-analysis',
    '動画制作': 'video-production',
    '投稿頻度': 'posting-frequency',
    'バズパターン': 'buzz-pattern',
    '市場戦略': 'market-strategy',
    'クロスメディア': 'cross-media',
    'ユーザー行動': 'user-behavior',
    'コンテンツ戦略': 'content-strategy',
    'フォロワー増加': 'follower-growth',
    '投稿戦略': 'posting-strategy',
    'データ分析': 'data-analysis',
    'マインドセット': 'mindset'
  }
  
  const reverseMap = Object.fromEntries(
    Object.entries(categoryMap).map(([key, value]) => [value, key])
  )
  
  return reverseMap[slug] || ''
}

export default function KeitaSNSManualDetailPage({ params }: PageProps) {
  const { category, id } = params
  
  // URLパラメータからエントリーを検索
  const entry = keitaSNSManualData.find(item => {
    const expectedCategory = categorySlugToName(category)
    return item.id === id && item.category === expectedCategory
  })
  
  if (!entry) {
    notFound()
  }
  
  // 関連エントリー（同じカテゴリ）
  const relatedEntries = keitaSNSManualData
    .filter(item => item.category === entry.category && item.id !== entry.id)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 5)
  
  // 重要度に応じたスタイル
  const getImportanceStyle = (importance: number) => {
    if (importance >= 5) return 'border-red-500 bg-red-50'
    if (importance >= 4) return 'border-orange-500 bg-orange-50' 
    return 'border-blue-500 bg-blue-50'
  }
  
  const getImportanceLabel = (importance: number) => {
    if (importance >= 5) return '最重要'
    if (importance >= 4) return '重要'
    return '基本'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <Link href="/keita-sns-manual">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              マニュアル一覧に戻る
            </Button>
          </Link>
          
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            共有
          </Button>
        </div>

        {/* メインコンテンツ */}
        <Card className={`border-2 ${getImportanceStyle(entry.importance)}`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {entry.category}
                </Badge>
                <Badge 
                  variant={entry.importance >= 5 ? 'destructive' : entry.importance >= 4 ? 'default' : 'secondary'}
                  className="ml-2"
                >
                  <Star className="h-3 w-3 mr-1" />
                  {getImportanceLabel(entry.importance)} (★{entry.importance})
                </Badge>
              </div>
              <Badge variant="outline" className="text-xs">
                ID: {entry.id}
              </Badge>
            </div>
            
            <CardTitle className="text-2xl leading-relaxed">
              {entry.content}
            </CardTitle>
            
            <CardDescription className="text-base">
              KEITA流SNSマーケティングの実践的ノウハウ
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* タグ */}
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                関連キーワード
              </h3>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* 詳細説明 */}
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-3">詳細解説</h3>
              <div className="bg-white rounded-lg p-4 border">
                <p className="text-gray-700 leading-relaxed">
                  {entry.content}
                </p>
                
                {/* 実践的なアドバイス */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 実践ポイント</h4>
                  <p className="text-blue-800 text-sm">
                    {entry.importance >= 5 && "この項目は最重要です。必ず実践し、継続的に改善していきましょう。"}
                    {entry.importance === 4 && "重要な項目です。優先度を高めて取り組むことをお勧めします。"}
                    {entry.importance <= 3 && "基本的な項目です。他の重要項目と合わせて実践しましょう。"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 関連エントリー */}
        {relatedEntries.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                関連する{entry.category}のノウハウ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {relatedEntries.map((relatedEntry) => (
                  <Link
                    key={relatedEntry.id}
                    href={`/keita-sns-manual/${category}/${relatedEntry.id}`}
                    className="block p-3 bg-white rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 line-clamp-2">
                          {relatedEntry.content}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {relatedEntry.id}
                          </Badge>
                          {relatedEntry.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge 
                        variant={relatedEntry.importance >= 5 ? 'destructive' : relatedEntry.importance >= 4 ? 'default' : 'secondary'}
                        className="ml-3"
                      >
                        ★{relatedEntry.importance}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* フッター */}
        <div className="text-center text-sm text-gray-500">
          <p>KEITA流SNSマニュアル - BuzzLab実践ノウハウ集</p>
          <p className="mt-1">継続的なSNS運用で成果を上げましょう</p>
        </div>
      </div>
    </div>
  )
}

// メタデータ生成
export async function generateMetadata({ params }: PageProps) {
  const { category, id } = params
  const expectedCategory = categorySlugToName(category)
  const entry = keitaSNSManualData.find(item => 
    item.id === id && item.category === expectedCategory
  )
  
  if (!entry) {
    return {
      title: 'ページが見つかりません | KEITA流SNSマニュアル',
      description: '指定されたページが見つかりません。'
    }
  }
  
  return {
    title: `${entry.content.substring(0, 60)}... | KEITA流SNSマニュアル`,
    description: `KEITA流${entry.category}のノウハウ: ${entry.content}`,
    keywords: [...entry.tags, 'KEITA流', 'SNSマーケティング', entry.category].join(', '),
    openGraph: {
      title: `KEITA流 ${entry.category}`,
      description: entry.content,
      type: 'article',
    }
  }
}

// 静的パス生成（ISG対応）
export async function generateStaticParams() {
  return keitaSNSManualData.map((entry) => {
    const categorySlug = entry.category.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    
    return {
      category: categorySlug,
      id: entry.id
    }
  })
} 
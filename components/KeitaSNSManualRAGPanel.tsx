'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Brain, 
  Database, 
  Search, 
  ExternalLink, 
  RefreshCw, 
  TrendingUp, 
  Star,
  Link,
  BarChart3,
  FileText,
  Clock,
  AlertCircle
} from 'lucide-react'

interface KeitaSNSStats {
  totalEntries: number
  categories: string[]
  averageImportance: number
  vectorizedCount: number
  lastUpdated: string
}

interface RealDeepLink {
  id: string
  category: string
  content: string
  deepLink: string
  importance: number
  tags: string[]
}

interface SNSSearchResult {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  importance: number
  similarity: number
  deepLink?: string
  metadata: any
}

interface KeitaSNSSearchResponse {
  results: SNSSearchResult[]
  query: string
  processingTime: number
}

export default function KeitaSNSManualRAGPanel() {
  const [stats, setStats] = useState<KeitaSNSStats | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SNSSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [lastSearchTime, setLastSearchTime] = useState<number>(0)
  const [realDeepLinks, setRealDeepLinks] = useState<RealDeepLink[]>([])
  const [loadingLinks, setLoadingLinks] = useState(false)

  // 統計情報取得
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/keita-sns-vectorize?action=stats')
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('統計情報取得エラー:', error)
    }
  }

  // 実際のディープリンク取得
  const fetchRealDeepLinks = async (limit: number = 10) => {
    setLoadingLinks(true)
    try {
      const response = await fetch(`/api/keita-sns-vectorize?query=SNS&deeplinks=true&count=${limit}`)
      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        const links: RealDeepLink[] = data.results.map((result: SNSSearchResult) => ({
          id: result.id,
          category: result.category,
          content: result.content,
          deepLink: result.deepLink || '',
          importance: result.importance,
          tags: result.tags
        }))
        setRealDeepLinks(links)
      }
    } catch (error) {
      console.error('実際のディープリンク取得エラー:', error)
    } finally {
      setLoadingLinks(false)
    }
  }

  // ベクトル検索実行
  const performSearch = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        query: searchQuery,
        deeplinks: 'true',
        count: '10'
      })
      
      if (selectedCategory && selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }

      const response = await fetch(`/api/keita-sns-vectorize?${params}`)
      const data: KeitaSNSSearchResponse = await response.json()
      
      if (data.results) {
        setSearchResults(data.results)
        setLastSearchTime(data.processingTime)
      }
    } catch (error) {
      console.error('検索エラー:', error)
    } finally {
      setLoading(false)
    }
  }

  // ベクトル化実行
  const runVectorization = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/keita-sns-vectorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      
      if (data.success) {
        alert(`✅ ベクトル化完了: ${data.data.processedCount}件処理`)
        fetchStats() // 統計情報を更新
      } else {
        alert('❌ ベクトル化エラー')
      }
    } catch (error) {
      console.error('ベクトル化エラー:', error)
      alert('❌ ベクトル化処理に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    fetchRealDeepLinks(15) // 15件の実際のディープリンクを取得
  }, [])

  const formatDate = (timestamp: string) => {
    if (timestamp === '-Infinity') return '未設定'
    return new Date(parseInt(timestamp)).toLocaleString('ja-JP')
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-500" />
            <span>KEITA流SNSマニュアルRAG</span>
            <Badge variant="outline">2nd RAG System</Badge>
          </CardTitle>
          <CardDescription>
            OpenAI Embeddings + Supabase PGVector統合システム
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats && (
              <>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalEntries}</div>
                  <div className="text-sm text-gray-600">総エントリー数</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.vectorizedCount}</div>
                  <div className="text-sm text-gray-600">ベクトル化済み</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{stats.categories.length}</div>
                  <div className="text-sm text-gray-600">カテゴリ数</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.averageImportance?.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">平均重要度</div>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              最終更新: {stats ? formatDate(stats.lastUpdated) : '読み込み中...'}
            </div>
            <div className="space-x-2">
              <Button onClick={fetchStats} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                統計更新
              </Button>
              <Button onClick={runVectorization} variant="outline" size="sm" disabled={loading}>
                <Database className="h-4 w-4 mr-1" />
                ベクトル化実行
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* タブ */}
      <Tabs defaultValue="search" className="w-full">
        <TabsList>
          <TabsTrigger value="search" className="flex items-center space-x-1">
            <Search className="h-4 w-4" />
            <span>ベクトル検索</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center space-x-1">
            <BarChart3 className="h-4 w-4" />
            <span>カテゴリ一覧</span>
          </TabsTrigger>
          <TabsTrigger value="deeplinks" className="flex items-center space-x-1">
            <Link className="h-4 w-4" />
            <span>ディープリンク</span>
          </TabsTrigger>
        </TabsList>

        {/* ベクトル検索タブ */}
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">セマンティック検索</CardTitle>
              <CardDescription>
                OpenAI Embeddingsを使用した高精度な類似度検索
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  placeholder="検索クエリを入力（例: バズ、収益化、継続）"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                />
                <Select value={selectedCategory || undefined} onValueChange={(value) => setSelectedCategory(value || '')}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="カテゴリフィルター" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全カテゴリ</SelectItem>
                    {stats?.categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={performSearch} disabled={loading || !searchQuery.trim()}>
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <Search className="h-4 w-4 mr-1" />
                  )}
                  検索
                </Button>
              </div>

              {lastSearchTime > 0 && (
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  検索時間: {lastSearchTime}ms
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <Card key={result.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{result.category}</Badge>
                            <Badge variant="secondary" className="flex items-center space-x-1">
                              <Star className="h-3 w-3" />
                              <span>{result.importance}</span>
                            </Badge>
                            <div className="text-sm text-gray-500">
                              類似度: {(result.similarity * 100).toFixed(1)}%
                            </div>
                          </div>
                          {result.deepLink && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(result.deepLink, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              詳細ページ
                            </Button>
                          )}
                        </div>
                        <h4 className="font-semibold mb-2">{result.id}</h4>
                        <p className="text-gray-700 text-sm mb-2">{result.content}</p>
                        <div className="flex flex-wrap gap-1">
                          {result.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {result.deepLink && (
                          <div className="mt-2 text-xs text-blue-600 font-mono">
                            {result.deepLink}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* カテゴリ一覧タブ */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>カテゴリ一覧</CardTitle>
              <CardDescription>
                KEITA流SNSマニュアルの全{stats?.categories.length}カテゴリ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats?.categories.map((category, index) => (
                  <Card key={category} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{category}</h4>
                      <Badge variant="outline">{index + 1}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      カテゴリID: {category.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}
                    </p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ディープリンクタブ */}
        <TabsContent value="deeplinks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link className="h-5 w-5" />
                <span>ディープリンクシステム</span>
              </CardTitle>
              <CardDescription>
                各SNSマニュアルエントリーの完全URI化された個別ページ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  ディープリンク形式
                </h4>
                <code className="text-sm bg-white p-2 rounded border block">
                  http://localhost:3001/keita-sns-manual/&#123;category&#125;/&#123;id&#125;
                </code>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">📍 実際のディープリンク</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => fetchRealDeepLinks(15)}
                      disabled={loadingLinks}
                    >
                      {loadingLinks ? (
                        <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-1" />
                      )}
                      更新
                    </Button>
                  </div>
                  
                  {loadingLinks ? (
                    <div className="text-center py-4">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-blue-500" />
                      <p className="text-sm text-gray-500 mt-2">ディープリンクを取得中...</p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm max-h-96 overflow-y-auto">
                      {realDeepLinks.slice(0, 8).map((link, index) => (
                        <div key={link.id} className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-mono text-xs text-blue-600">
                              {link.deepLink.replace('http://localhost:3001', '')}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Badge variant="outline" className="text-xs">
                                {link.category}
                              </Badge>
                              <Badge variant="secondary" className="text-xs flex items-center">
                                <Star className="h-3 w-3 mr-1" />
                                {link.importance}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-gray-700 mb-2 text-xs leading-relaxed">
                            {link.content.length > 80 ? `${link.content.substring(0, 80)}...` : link.content}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex flex-wrap gap-1">
                              {link.tags.slice(0, 3).map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(link.deepLink, '_blank')}
                              className="text-xs h-6"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              開く
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">🎯 ページ機能</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>詳細解説とアドバイス</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>重要度スコア表示</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>関連タグとキーワード</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>同カテゴリ関連エントリー</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>SEOメタデータ自動生成</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>ソーシャルシェア機能</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {realDeepLinks.length > 0 && (
                  <>
                    <Button 
                      onClick={() => window.open(realDeepLinks[0].deepLink, '_blank')}
                      className="mr-2"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      実際のページを開く
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(realDeepLinks[0].deepLink)}
                    >
                      <Link className="h-4 w-4 mr-1" />
                      URLをコピー
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
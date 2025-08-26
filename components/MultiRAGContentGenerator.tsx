'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Loader2, Search, Database, Brain, TrendingUp } from 'lucide-react'

interface GenerationRequest {
  topic: string
  targetAudience?: string
  contentType?: 'blog' | 'social' | 'guide' | 'analysis'
  length?: 'short' | 'medium' | 'long'
  tone?: 'professional' | 'casual' | 'expert'
}

interface RAGSource {
  source: string
  dataCount: number
  insights: string[]
}

interface GenerationResult {
  success: boolean
  topic: string
  generatedContent: string
  ragSources: RAGSource[]
  metadata: {
    targetAudience: string
    contentType: string
    length: string
    tone: string
    generatedAt: string
  }
}

export default function MultiRAGContentGenerator() {
  const [request, setRequest] = useState<GenerationRequest>({
    topic: '',
    targetAudience: 'SNSマーケティング担当者',
    contentType: 'blog',
    length: 'medium',
    tone: 'professional'
  })
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateContent = async () => {
    if (!request.topic.trim()) {
      setError('トピックを入力してください')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/multi-rag-content-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || 'コンテンツ生成に失敗しました')
      }
    } catch (err) {
      setError('通信エラーが発生しました')
      console.error('生成エラー:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof GenerationRequest, value: string) => {
    setRequest(prev => ({ ...prev, [field]: value }))
  }

  const ragIcons = {
    '自社データ（BuzzLab）': Database,
    'KEITA流SNSマニュアル': Brain,
    '業界動向・競合分析': TrendingUp
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          マルチRAG自動記事生成システム
        </h1>
        <p className="text-lg text-gray-600">
          3つの異なるRAGシステムから情報を統合し、高品質な記事を自動生成
        </p>
        <div className="flex justify-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Database className="h-4 w-4" />
            <span>自社データ</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Brain className="h-4 w-4" />
            <span>KEITA流マニュアル</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span>業界動向</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 入力フォーム */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>記事生成設定</span>
            </CardTitle>
            <CardDescription>
              生成したい記事の詳細を入力してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">記事トピック *</Label>
              <Input
                id="topic"
                placeholder="例: Instagramマーケティングの最新戦略"
                value={request.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="targetAudience">ターゲット読者</Label>
              <Input
                id="targetAudience"
                placeholder="例: SNSマーケティング担当者"
                value={request.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>コンテンツタイプ</Label>
                <Select
                  value={request.contentType}
                  onValueChange={(value) => handleInputChange('contentType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">ブログ記事</SelectItem>
                    <SelectItem value="social">SNS投稿</SelectItem>
                    <SelectItem value="guide">実践ガイド</SelectItem>
                    <SelectItem value="analysis">業界分析</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>記事の長さ</Label>
                <Select
                  value={request.length}
                  onValueChange={(value) => handleInputChange('length', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">短編（1000文字）</SelectItem>
                    <SelectItem value="medium">中編（1500-2000文字）</SelectItem>
                    <SelectItem value="long">長編（2500文字以上）</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>文体・トーン</Label>
              <Select
                value={request.tone}
                onValueChange={(value) => handleInputChange('tone', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">ビジネス・専門的</SelectItem>
                  <SelectItem value="casual">親しみやすい</SelectItem>
                  <SelectItem value="expert">業界専門家向け</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={generateContent}
              disabled={isLoading || !request.topic.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  記事を生成中...
                </>
              ) : (
                '記事を生成'
              )}
            </Button>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* RAGソース表示 */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>使用された情報源</CardTitle>
              <CardDescription>
                各RAGシステムから取得されたデータ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.ragSources.map((source, index) => {
                const IconComponent = ragIcons[source.source as keyof typeof ragIcons] || Database
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <IconComponent className="h-5 w-5 text-blue-500" />
                      <h4 className="font-semibold">{source.source}</h4>
                      <Badge variant="secondary">
                        {source.dataCount}件のデータ
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {source.insights.map((insight, i) => (
                        <p key={i} className="text-sm text-gray-600">
                          • {insight}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}
      </div>

      {/* 生成された記事 */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>生成された記事</CardTitle>
            <CardDescription className="flex items-center space-x-4">
              <span>トピック: {result.topic}</span>
              <Badge variant="outline">{result.metadata.contentType}</Badge>
              <Badge variant="outline">{result.metadata.length}</Badge>
              <Badge variant="outline">{result.metadata.tone}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6">
              <Textarea
                value={result.generatedContent}
                readOnly
                className="min-h-[500px] bg-white"
              />
            </div>
            <div className="mt-4 text-xs text-gray-500">
              生成日時: {new Date(result.metadata.generatedAt).toLocaleString('ja-JP')}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 
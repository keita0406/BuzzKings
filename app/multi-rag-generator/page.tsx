import MultiRAGContentGenerator from '@/components/MultiRAGContentGenerator'

export default function MultiRAGGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MultiRAGContentGenerator />
    </div>
  )
}

export const metadata = {
  title: 'マルチRAG自動記事生成 | BuzzLab',
  description: '3つのRAGシステムを統合した高度な自動記事生成システム。自社データ、KEITA流SNSマニュアル、業界動向を活用してSNSマーケティング記事を自動生成。',
  keywords: ['RAG', '自動記事生成', 'SNSマーケティング', 'AI', 'コンテンツ生成', 'BuzzLab'],
} 
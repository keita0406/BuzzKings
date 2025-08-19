// ISR（Incremental Static Regeneration）設定
export const revalidate = 3600 // 1時間ごとに再生成

// SSG用の静的パラメータ生成
export async function generateStaticParams() {
  return [{}] // Sustainableページは単一ページなので空のオブジェクト
}

// SEO最適化のためのメタデータ生成（SSG）
export async function generateMetadata() {
  return {
    title: 'サステナブル - 地球黒字化経営への取り組み | BUZZLAB',
    description: '栗山縫製グループとの協業による地球黒字化経営の実践。持続可能な社会の実現に向けて、廃棄物削減と循環型社会の構築に取り組んでいます。',
    keywords: [
      'サステナブル',
      '地球黒字化経営',
      '栗山縫製',
      '持続可能',
      '環境配慮',
      '循環型社会',
      '廃棄物削減',
      'SDGs',
      'BUZZLAB',
      'Ace Dream LLC'
    ],
    openGraph: {
      title: 'サステナブル - 地球黒字化経営への取り組み | BUZZLAB',
      description: '栗山縫製グループとの協業による地球黒字化経営の実践。持続可能な社会の実現に向けた取り組み。',
      url: 'https://buzzlab8.jp/sustainable',
      siteName: 'BUZZLAB',
      type: 'website',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'サステナブル - 地球黒字化経営への取り組み | BUZZLAB',
      description: '栗山縫製グループとの協業による地球黒字化経営の実践。',
    },
    alternates: {
      canonical: 'https://buzzlab8.jp/sustainable',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function Sustainable() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center">サステナブル</h1>
      
      {/* メインコンテンツセクション */}
      <div className="mb-12">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 shadow-lg">
          <div className="text-center space-y-6 text-lg leading-relaxed">
            <h2 className="text-2xl font-bold text-green-700 mb-4">地球黒字化経営</h2>
            <p className="text-gray-800">
              弊社は地球黒字化経営を全世界に流布している<strong>栗山縫製グループ</strong>と協業しております。
            </p>
            <p className="text-gray-800">
              地球環境にとって負債ではなく&quot;黒字&quot;をもたらす持続可能な経営を目指し、
              廃棄物の削減や地域との共生、循環型社会の実現を経営の中心に据えています。
            </p>
          </div>
        </div>
      </div>

      {/* 地球黒字化経営とは */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">地球黒字化経営とは？</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              「地球黒字化経営」とは、企業が地球環境にとって負債ではなく&quot;黒字&quot;をもたらすような持続可能な経営を目指す取り組みです。
              単に利益を追求するだけではなく、廃棄物の削減や地域との共生、循環型社会の実現を経営の中心に据える考え方です。
            </p>
            <p>
              この概念を実践しているのが、大阪府東大阪市にある<strong>栗山縫製株式会社</strong>です。
            </p>
          </div>
        </div>
      </div>

      {/* 実践例 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">栗山縫製の実践例</h2>
        <div className="space-y-8">
          {/* 廃棄布の資源転換 */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">廃棄布を資源に転換</h3>
            <p className="text-gray-700 mb-4">
              繊維業界では布の裁ち落ちや残布が20〜30％にも達しますが、栗山縫製ではそれらを廃棄せずに積極的に再利用しています。
            </p>
            
            <h4 className="text-lg font-semibold text-green-700 mb-3">再利用の例：</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                小さく裁断して機械部品の清掃用ウエスとして近隣の鉄工所に無償提供
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                芸術家や伝統工芸の「裂き織り」職人に素材として提供
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                塗装用シートとして使われた布を、偶然できたペンキ模様を活かして一点もののバッグやコートにリメイク
              </li>
            </ul>
          </div>

          {/* 効果とビジョン */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">効果とビジョン</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                これらの取り組みにより、<strong>廃棄率を以前より20％削減</strong>、将来的には<strong>50％削減</strong>を目指しています。
              </p>
              <p>
                経営者である栗山泰充氏は、「もし地球が自分の家だとしたらどうするか？」という視点から発想し、
                物の命に感謝しながら活用する「地球黒字化経営」を提唱しています。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3つの柱 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">地球黒字化経営の3つの柱</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-purple-800 mb-3">廃材を資材へ</h3>
            <p className="text-gray-700">
              廃棄物を新たな価値ある資源として活用
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-orange-800 mb-3">地域連携</h3>
            <p className="text-gray-700">
              地域の企業や職人との協働によるエコシステム構築
            </p>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-teal-800 mb-3">教育と普及</h3>
            <p className="text-gray-700">
              持続可能な経営モデルの社会への普及
            </p>
          </div>
        </div>
      </div>

      {/* キーメッセージ */}
      <div className="mb-12">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-50 to-green-50 border border-gray-300 rounded-xl p-8 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">私たちの想い</h2>
          <div className="space-y-4">
            <p className="text-xl font-semibold text-green-700">「廃材を資材に」</p>
            <p className="text-xl font-semibold text-blue-700">「物の命に感謝」</p>
            <p className="text-xl font-semibold text-purple-700">「地球に黒字を」</p>
          </div>
          <p className="text-gray-700 mt-6">
            経済活動と環境配慮の両立を実現し、持続可能な未来を築いていきます。
          </p>
        </div>
      </div>

      {/* 法的記載 */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          © 2024 Ace Dream LLC. All rights reserved.
        </p>
      </div>
    </div>
  )
} 


// ISR（Incremental Static Regeneration）設定
export const revalidate = 3600 // 1時間ごとに再生成

// SSG用の静的パラメータ生成
export async function generateStaticParams() {
  return [{}] // Aboutページは単一ページなので空のオブジェクト
}

// SEO最適化のためのメタデータ生成（SSG）
export async function generateMetadata() {
  return {
    title: 'About KEITA - Ace Dream LLC CEO / CMO 盛 啓太 | BUZZLAB',
    description: '33歳、法人3社の代表取締役。年商3億円をわずか社員3名で達成。建設業からSNS専業への転身を経て、現在はAI × SNSの新領域に挑戦中。',
    keywords: [
      'KEITA',
      '盛 啓太',
      'Ace Dream LLC',
      'SNS マーケティング',
      '建設業',
      'Instagram',
      '縫製工場',
      'ClothesArt',
      'AI × SNS',
      '地球黒字化経営'
    ],
    openGraph: {
      title: 'About KEITA - Ace Dream LLC CEO / CMO 盛 啓太',
      description: '33歳、法人3社の代表取締役。年商3億円をわずか社員3名で達成。',
      url: 'https://buzzlab8.jp/about',
      siteName: 'BUZZLAB',
      type: 'profile',
      locale: 'ja_JP',
      images: [
        {
          url: 'https://buzzlab8.jp/images/keita-avatar-new.png',
          width: 400,
          height: 400,
          alt: '盛 啓太（KEITA）プロフィール画像',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: 'About KEITA - Ace Dream LLC CEO / CMO 盛 啓太',
      description: '33歳、法人3社の代表取締役。年商3億円をわずか社員3名で達成。',
      images: ['https://buzzlab8.jp/images/keita-avatar-new.png'],
    },
    alternates: {
      canonical: 'https://buzzlab8.jp/about',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

const timeline = [
  {
    year: '高校卒業',
    title: '建設業に就職',
    description: '専門知識と溶接技術を習得'
  },
  {
    year: '21歳',
    title: '親方に抜擢され独立',
    description: '下請け個人事業主としてキャリアをスタート'
  },
  {
    year: '24歳',
    title: 'Instagramで投稿開始',
    description: '週1投稿の継続の副業で月収100万円を達成'
  },
  {
    year: '27歳',
    title: '建設業を勇退、SNS専業へ',
    description: '全国でオフプライスPOPUPを展開開始'
  },
  {
    year: '30歳',
    title: '新たなビジネスチャンス',
    description: '関西一の縫製工場と合同ブランド Clothes Art をスタート'
  },
  {
    year: '30歳',
    title: 'フォロワー20万人達成',
    description: '広告費ゼロ・バズのみで1年で実現'
  },
  {
    year: '31歳',
    title: '４店舗 OPEN',
    description: '焼肉 虎喜、Eyelash Salon Charme、Mens Salon DUDE LUB、Clothes Art 西宮店'
  },
  {
    year: '現在33歳',
    title: 'AI × SNSに挑戦中',
    description: '自社・新規事業を急速に拡大中'
  }
]

const companyInfo = {
  name: 'Ace Dream LLC',
  brandName: 'BUZZLAB',
  website: 'https://buzzlab8.jp',
  representative: '盛 啓太（KEITA）',
  established: '2020年',
  capital: '1,000万円',
  employees: '3名',
  revenue: '年商3億円',
  address: '〒663-8166 兵庫県西宮市甲子園七番町9−18 H2Oビル２F',
  phone: '080-4240-4803',
  email: 'info@buzzlab.jp',
  businessHours: '平日 9:00-18:00',
  business: [
    'SNSマーケティング事業',
    '縫製工場運営事業', 
    'ブランド企画・運営事業',
    '飲食店運営事業',
    '美容サロン運営事業',
    'コンサルティング事業'
  ]
}

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-900">
      {/* プロフィール画像とタイトル */}
      <div className="text-center mb-12">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <img
            src="/images/keita-avatar-new.png"
            alt="盛 啓太（KEITA）"
            className="w-full h-full rounded-full object-cover shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">About KEITA</h1>
        <p className="text-xl font-semibold text-gray-700 mb-6">
          {companyInfo.name} CEO / CMO 盛 啓太（KEITA）
        </p>
        
        {/* SNSリンクボタン */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <a 
            href="https://www.instagram.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
          
          <a 
            href="https://www.tiktok.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            TikTok
          </a>
          
          <a 
            href="https://www.youtube.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
          
          <a 
            href="https://www.threads.net/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.632 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.2-1.932.053-.18.094-.4.094-.639 0-.24-.04-.458-.094-.639-.24-.773-.63-1.295-1.175-1.579a2.25 2.25 0 0 0-1.095-.266c-.4 0-.776.106-1.118.315-.365.222-.695.569-.985 1.034a5.73 5.73 0 0 0-.629 1.609v.062c-.027.633-.218 1.178-.567 1.62-.33.418-.803.653-1.332.662-.595-.009-1.103-.262-1.428-.712-.343-.475-.499-1.096-.439-1.748.06-.652.308-1.262.738-1.715C9.594 7.027 10.98 6.508 12.18 6.49c.633.008 1.249.15 1.833.422.47.218.896.515 1.27.888.374.373.67.82.883 1.332.213.512.32 1.06.32 1.642 0 .474-.054.926-.162 1.356.332.046.651.117.955.213 1.004.32 1.818.82 2.424 1.488.606.668.91 1.412.91 2.234 0 .858-.274 1.638-.823 2.34-.549.701-1.305 1.235-2.268 1.602-1.072.408-2.246.612-3.52.612z"/>
            </svg>
            Threads
          </a>
          
          <a 
            href="https://twitter.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X
          </a>
          
          <a 
            href="https://www.linkedin.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* 詳細説明 */}
      <div className="mb-12">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-xl p-8 shadow-lg">
          <div className="text-center space-y-6 text-lg leading-relaxed">
            <p className="text-gray-800">
              33歳、法人3社の代表取締役。年商3億円をわずか社員3名で達成。<br />
              高校卒業後に建設業で独立し、24歳からInstagramで発信を開始。<br />
              週1投稿で月収100万円を突破し、27歳で建設業を勇退。SNS専業へ転身。
            </p>
            
            <div className="border-t border-gray-300 pt-6">
              <p className="text-gray-800">
                地球黒字化経営を掲げ、大企業と有名ブランドの商品を縫う
                <span className="font-semibold text-purple-700"> 関西有数の縫製工場 </span>
                と、自社ブランド
                <span className="font-semibold text-blue-700"> ClothesArt® </span>
                を設立。広告費ゼロでフォロワー20万人を達成。
              </p>
            </div>
            
            <div className="border-t border-gray-300 pt-6">
              <p className="text-gray-800">
                その後、自社飲食店「焼肉虎喜」や美容サロン「Charme」を開業。<br />
                実店舗集客・POPUPイベントの成功事例を活かし、SNSコンサルティングを展開。
              </p>
            </div>
            
            <div className="border-t border-gray-300 pt-6">
              <p className="text-gray-800 font-medium">
                現在は<strong className="text-indigo-700 text-xl">「AI × SNS」</strong>に挑戦し、<br />
                事業拡大と新規プロジェクトの準備を進めている。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 経歴タイムライン */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">経歴</h2>
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start gap-6 p-6 bg-gray-50 rounded-lg">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm text-center leading-tight">
                  {item.year}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 企業理念 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">企業理念</h2>
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-8 shadow-lg text-center">
          <div className="space-y-4">
            <p className="text-2xl font-bold text-gray-800 leading-relaxed">
              未来の世の中の人に必要なもの届け
            </p>
            <p className="text-2xl font-bold text-purple-700 leading-relaxed">
              未来の当たり前を創造する会社
            </p>
          </div>
        </div>
      </div>

      {/* 会社概要 */}
      <div className="border-t pt-12">
        <h2 className="text-3xl font-bold mb-8 text-center">会社概要</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <table className="w-full">
            <tbody className="space-y-4">
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700 w-1/3">会社名</td>
                <td className="py-3 px-4">{companyInfo.name}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">ブランド名</td>
                <td className="py-3 px-4">{companyInfo.brandName}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">ウェブサイト</td>
                <td className="py-3 px-4">
                  <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                    {companyInfo.website}
                  </a>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">代表取締役</td>
                <td className="py-3 px-4">{companyInfo.representative}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">設立</td>
                <td className="py-3 px-4">{companyInfo.established}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">資本金</td>
                <td className="py-3 px-4">{companyInfo.capital}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">従業員数</td>
                <td className="py-3 px-4">{companyInfo.employees}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">売上高</td>
                <td className="py-3 px-4">{companyInfo.revenue}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">所在地</td>
                <td className="py-3 px-4">{companyInfo.address}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">電話番号</td>
                <td className="py-3 px-4">{companyInfo.phone}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">メールアドレス</td>
                <td className="py-3 px-4">
                  <a href={`mailto:${companyInfo.email}`} className="text-blue-600 hover:text-blue-800 underline">
                    {companyInfo.email}
                  </a>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-semibold text-gray-700">営業時間</td>
                <td className="py-3 px-4">{companyInfo.businessHours}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-gray-700 align-top">事業内容</td>
                <td className="py-3 px-4">
                  <ul className="list-disc list-inside space-y-1">
                    {companyInfo.business.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 個人情報保護・法的情報 */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center">個人情報の取り扱いについて</h2>
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-gray-700 leading-relaxed mb-4">
            当社では、個人情報の保護に関する法律及び関連法令等を遵守し、
            お客様の個人情報を適切に取り扱っております。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            SNSマーケティングサービス、コンサルティング業務等において収集した個人情報は、
            サービス提供及び品質向上のためのみに使用し、適切なセキュリティ対策を講じて管理いたします。
          </p>
          <div className="text-center">
            <a 
              href="/privacy" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              プライバシーポリシーを確認する
            </a>
          </div>
        </div>
      </div>

      {/* 法的記載 */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          © 2024 {companyInfo.name}. All rights reserved.<br />
          当サイトの内容、テキスト、画像等の無断転載・無断使用を固く禁じます。
        </p>
      </div>
    </div>
  )
} 
'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const followerData = [
  { month: '開始', followers: 0 },
  { month: '1ヶ月', followers: 300 },
  { month: '2ヶ月', followers: 600 },
  { month: '3ヶ月', followers: 900 },
  { month: '4ヶ月', followers: 1200 },
  { month: '5ヶ月', followers: 1500 },
  { month: '6ヶ月', followers: 1800 },
  { month: '7ヶ月', followers: 2100 },
  { month: '8ヶ月', followers: 2400 },
  { month: '9ヶ月', followers: 2700 },
  { month: '10ヶ月', followers: 3000 },
  { month: '11ヶ月', followers: 3300 },
  { month: '12ヶ月', followers: 3600 }
]

const phases = [
  {
    month: '1ヶ月目',
    phase: '基盤構築フェーズ',
    title: 'SNS構築・LP作り',
    color: 'green',
    tasks: [
      'ターゲット設定と戦略立案',
      'アカウント最適化',
      '集客用LPデザイン',
      '初期コンテンツ作成'
    ]
  },
  {
    month: '2ヶ月目',
    phase: '集客強化フェーズ',
    title: '広告戦略・バズ集客',
    color: 'blue',
    tasks: [
      '地域ターゲティング広告',
      'バズるショート動画制作',
      'コンテンツカレンダー運用',
      '相互コミュニケーション強化'
    ]
  },
  {
    month: '3ヶ月目',
    phase: '収益化フェーズ',
    title: '売り上げUP施策',
    color: 'purple',
    tasks: [
      'フォロワーの顧客転換',
      'リピーター獲得施策',
      'セールスファネル構築',
      '特別キャンペーン実施'
    ]
  },
  {
    month: '4ヶ月目以降',
    phase: '継続成長フェーズ',
    title: '持続可能な成長サイクル',
    color: 'orange',
    tasks: [
      'コンテンツの最適化',
      '広告ROI分析と改善',
      'ブランドロイヤリティ強化',
      '新規販路・コラボ展開'
    ]
  }
]

const concepts = [
  { icon: '🎬', text: 'ショート動画でバズらせ' },
  { icon: '👥', text: 'フォロワーを増やし' },
  { icon: '👑', text: 'アカウントブランディングを確立' },
  { icon: '📈', text: 'SNS広告で即時売り上げUPを狙います' }
]

export default function FollowerGrowthSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4 relative">
              <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                SNSフォロワー増加スケジュール
              </span>
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-pink-500 mt-2"></div>
            </h2>
            <p className="text-xl text-gray-600 font-serif">年間3000人・月300人以上の成長を実現するロードマップ（広告費月3万前後）</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-pink-500">3,000+</div>
            <p className="text-gray-600">1年後の増加目標</p>
          </div>
        </div>

        {/* グラフエリア */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">フォロワー増加推移</h3>
              <p className="text-gray-600">毎月安定した成長を実現</p>
            </div>
            <div className="text-pink-500 text-lg font-semibold">#フォロワー増加計画</div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={followerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                  tickFormatter={(value) => `${value}人`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}人`, 'フォロワー数']}
                  labelStyle={{ color: '#333' }}
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#E1306C" 
                  strokeWidth={3}
                  dot={{ fill: '#E1306C', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#E1306C', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 月別ステップカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {phases.map((phase, index) => {
            const getColorClasses = (color: string) => {
              switch (color) {
                case 'green':
                  return {
                    border: 'border-green-500',
                    badge: 'bg-green-100 text-green-800',
                    check: 'text-green-500'
                  }
                case 'blue':
                  return {
                    border: 'border-blue-500',
                    badge: 'bg-blue-100 text-blue-800',
                    check: 'text-blue-500'
                  }
                case 'purple':
                  return {
                    border: 'border-purple-500',
                    badge: 'bg-purple-100 text-purple-800',
                    check: 'text-purple-500'
                  }
                case 'orange':
                  return {
                    border: 'border-orange-500',
                    badge: 'bg-orange-100 text-orange-800',
                    check: 'text-orange-500'
                  }
                default:
                  return {
                    border: 'border-gray-500',
                    badge: 'bg-gray-100 text-gray-800',
                    check: 'text-gray-500'
                  }
              }
            }
            
            const colors = getColorClasses(phase.color)
            
            return (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${colors.border} hover:shadow-xl transition-shadow duration-300`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{phase.month}</h3>
                <div className={`${colors.badge} px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4`}>
                  {phase.phase}
                </div>
                <h4 className="font-bold text-gray-700 mb-3">{phase.title}</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start">
                      <span className={`${colors.check} mr-2 mt-0.5`}>✓</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* コンセプトメッセージ */}
        <div className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
              KEITAの戦略的アプローチ
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {concepts.map((concept, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  {concept.icon}
                </div>
                <span className="font-bold text-white text-lg">{concept.text}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-black italic text-lg font-serif">
            ※KEITAが実践してきた、影響力構築と収益化を両立させる独自メソッド
          </p>
        </div>
      </div>
    </section>
  )
} 
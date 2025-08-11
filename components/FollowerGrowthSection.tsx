'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { MotionDiv } from './ClientMotionWrapper'
import React from 'react'

interface FollowerData {
  month: string
  followers: number
}

interface GrowthPhase {
  month: string
  phase: string
  title: string
  color: string
  tasks: string[]
}

interface FollowerGrowthSectionProps {
  followerData: FollowerData[]
  phases: GrowthPhase[]
}

// カスタムLabel コンポーネント
const CustomLabel = (props: any) => {
  const { x, y, value } = props
  return (
    <text 
      x={x} 
      y={y - 10} 
      fill="#1f2937" 
      textAnchor="middle" 
      fontSize="13" 
      fontWeight="bold"
    >
      {`${value}人`}
    </text>
  )
}

// カスタムAxis コンポーネントで警告を抑制
const CustomXAxis = React.forwardRef<any, any>((props, ref) => (
  <XAxis
    ref={ref}
    dataKey="month"
    axisLine={{ stroke: '#6b7280' }}
    tickLine={{ stroke: '#6b7280' }}
    tick={{ 
      fontSize: 12, 
      fill: '#1f2937', 
      fontWeight: 'bold',
      textAnchor: 'middle'
    }}
    interval={0}
    height={60}
    {...props}
  />
))
CustomXAxis.displayName = 'CustomXAxis'

const CustomYAxis = React.forwardRef<any, any>((props, ref) => (
  <YAxis
    ref={ref}
    stroke="#1f2937"
    fontSize={14}
    tick={{ fontSize: 14, fill: '#1f2937', fontWeight: 'bold' }}
    axisLine={{ stroke: '#6b7280' }}
    tickLine={{ stroke: '#6b7280' }}
    tickFormatter={(value) => `${value}人`}
    domain={[0, 3600]}
    ticks={[0, 900, 1800, 2700]}
    {...props}
  />
))
CustomYAxis.displayName = 'CustomYAxis'

export default function FollowerGrowthSection({ followerData, phases }: FollowerGrowthSectionProps) {
  const getColorClass = (color: string) => {
    const colorMap = {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      indigo: 'bg-indigo-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-500'
  }

  return (
    <section id="growth-schedule" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header - Simplified */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">SNSフォロワー増加スケジュール</span>
          </h2>
        </div>

        {/* Chart Section */}
        <div className="mb-16">
          {/* Chart Info - Left aligned above chart */}
          <div className="text-left mb-6">
            <p className="text-lg text-gray-600 mb-2">
              年間3000人・月300人以上の成長を実現するロードマップ（広告費月3万前後）
            </p>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-4xl md:text-5xl font-bold gradient-text">3,000+</span>
              <p className="text-base text-gray-600">1年後の増加目標</p>
            </div>
            <h3 className="text-2xl font-bold">
              <span className="gradient-text">フォロワー増加推移</span>
            </h3>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={followerData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <CustomXAxis />
                  <CustomYAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    formatter={(value) => [`${value}人`, 'フォロワー数']}
                    labelStyle={{ color: '#374151' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="followers" 
                    stroke="#ec4899" 
                    strokeWidth={4}
                    dot={{ fill: '#ec4899', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#ec4899', strokeWidth: 2 }}
                  >
                    <LabelList 
                      dataKey="followers" 
                      position="top" 
                      content={CustomLabel}
                    />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Growth Phases - Compact 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-3">
                <div className={`w-3 h-3 ${getColorClass(phase.color)} rounded-full mr-2`}></div>
                <div>
                  {/* Phase Info - Compact */}
                  <h3 className="text-sm font-bold text-gray-900">{phase.month}</h3>
                  <p className="text-xs text-gray-600">{phase.phase}</p>
                </div>
              </div>
              
              {/* Title - Compact */}
              <h4 className="text-base font-bold mb-3 gradient-text leading-tight">
                {phase.title}
              </h4>
              
              {/* Tasks - Compact */}
              <ul className="space-y-1">
                {phase.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
                    <span className="text-gray-700 text-xs leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Strategy Section - Client Animations */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-6">KEITAの戦略的アプローチ</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">🎬</div>
                <p className="font-semibold">ショート動画でバズらせ</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">👥</div>
                <p className="font-semibold">フォロワーを増やし</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">👑</div>
                <p className="font-semibold">アカウントブランディングを確立</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">📈</div>
                <p className="font-semibold">SNS広告で即時売り上げUPを狙います</p>
              </div>
            </div>
            <p className="mt-6 text-lg opacity-90">
              ※KEITAが実践してきた、影響力構築と収益化を両立させる独自メソッド
            </p>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
} 
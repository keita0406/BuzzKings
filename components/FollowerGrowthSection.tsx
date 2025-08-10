'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
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

// カスタムAxis コンポーネントで警告を抑制
const CustomXAxis = React.forwardRef<any, any>((props, ref) => (
  <XAxis
    ref={ref}
    dataKey="month"
    stroke="#6b7280"
    fontSize={12}
    tick={{ fontSize: 12 }}
    axisLine={{ stroke: '#6b7280' }}
    tickLine={{ stroke: '#6b7280' }}
    {...props}
  />
))
CustomXAxis.displayName = 'CustomXAxis'

const CustomYAxis = React.forwardRef<any, any>((props, ref) => (
  <YAxis
    ref={ref}
    stroke="#6b7280"
    fontSize={12}
    tick={{ fontSize: 12 }}
    axisLine={{ stroke: '#6b7280' }}
    tickLine={{ stroke: '#6b7280' }}
    tickFormatter={(value) => `${value}人`}
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
        {/* Section Header - SSR */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">SNSフォロワー増加スケジュール</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            年間3000人・月300人以上の成長を実現するロードマップ（広告費月3万前後）
          </p>
          <div className="mt-8">
            <span className="text-6xl md:text-7xl font-bold gradient-text">3,000+</span>
            <p className="text-lg text-gray-600 mt-2">1年後の増加目標</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="gradient-text">フォロワー増加推移</span>
          </h3>
          <p className="text-center text-gray-600 mb-8">毎月安定した成長を実現</p>
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={followerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                    stroke="url(#colorGradient)" 
                    strokeWidth={4}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2 }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">#フォロワー増加計画</p>
        </div>

        {/* Growth Phases - SSR Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className={`w-4 h-4 ${getColorClass(phase.color)} rounded-full mr-4`}></div>
                <div>
                  {/* Phase Info - SEO重要 */}
                  <h3 className="text-lg font-bold text-gray-900">{phase.month}</h3>
                  <p className="text-sm text-gray-600">{phase.phase}</p>
                </div>
              </div>
              
              {/* Title - SEO重要 */}
              <h4 className="text-xl font-bold mb-4 gradient-text">
                {phase.title}
              </h4>
              
              {/* Tasks - SEO重要 */}
              <ul className="space-y-3">
                {phase.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{task}</span>
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
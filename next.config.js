/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  
  // SSG/ISR最適化設定
  output: 'standalone', // スタンドアロンビルド（最適化）
  generateBuildId: async () => {
    // ビルドIDをタイムスタンプで生成（ISR用）
    return `build_${Date.now()}`
  },
  
  webpack: (config, { dev, isServer }) => {
    // Supabaseの警告を抑制
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    // Critical dependency警告を抑制
    config.module.exprContextCritical = false

    // React 18 defaultProps警告を抑制
    if (dev && !isServer) {
      const originalEmit = config.infrastructureLogging?.level !== 'error'
      config.infrastructureLogging = {
        level: 'error',
      }
    }

    return config
  },
  
  // プロダクションビルド時の最適化
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  // SSG用の静的最適化
  trailingSlash: false,
  
  // 警告を抑制
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // ISR用のキャッシュ設定
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig

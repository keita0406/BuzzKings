/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
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
  // 警告を抑制
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
}

module.exports = nextConfig

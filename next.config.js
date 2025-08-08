/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // 管理画面の動的ルートのため一時的にコメントアウト
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  }
};

module.exports = nextConfig;

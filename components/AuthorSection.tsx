'use client'

import Image from 'next/image'
import { AuthorInfo, defaultAuthor, generateAuthorStructuredData } from '@/lib/authorData'

interface AuthorSectionProps {
  author?: AuthorInfo
  showStructuredData?: boolean
}

export default function AuthorSection({ 
  author = defaultAuthor, 
  showStructuredData = true 
}: AuthorSectionProps) {
  
  // 構造化データの生成
  const structuredData = generateAuthorStructuredData(author)

  return (
    <>
      {showStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-8 mt-12 border border-gray-200 dark:border-gray-600">
        <div className="flex items-start space-x-6">
          {/* プロフィール画像 */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 md:w-28 md:h-28">
              <Image
                src={author.profileImage}
                alt={`${author.name}のプロフィール写真`}
                fill
                className="rounded-full object-cover ring-4 ring-white dark:ring-gray-600 shadow-lg"
                sizes="(max-width: 768px) 96px, 112px"
              />
              {/* 監修者バッジ */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                監修者
              </div>
            </div>
          </div>

          {/* 監修者情報 */}
          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {author.name}
              </h3>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {author.company} {author.title}
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {author.description}
            </p>

            {/* ソーシャルリンク */}
            {author.socialLinks && (
              <div className="flex flex-nowrap gap-2 overflow-x-auto">
                {author.socialLinks.instagram && (
                  <a
                    href={author.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2.5 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-medium rounded hover:from-pink-600 hover:to-purple-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                )}

                {author.socialLinks.tiktok && (
                  <a
                    href={author.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2.5 py-1.5 bg-gradient-to-r from-pink-600 to-red-500 text-white text-xs font-medium rounded hover:from-pink-700 hover:to-red-600 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                    TikTok
                  </a>
                )}

                {author.socialLinks.youtube && (
                  <a
                    href={author.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2.5 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium rounded hover:from-red-600 hover:to-red-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                )}

                {author.socialLinks.threads && (
                  <a
                    href={author.socialLinks.threads}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2.5 py-1.5 bg-gradient-to-r from-black to-gray-800 text-white text-xs font-medium rounded hover:from-gray-800 hover:to-gray-900 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017C1.5 8.417 2.35 5.563 3.995 3.512 5.845 1.208 8.598.027 12.179.003h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-.542-1.864-1.454-3.254-2.714-4.13-1.328-1.025-3.107-1.547-5.281-1.555h-.01c-2.894.018-5.101.916-6.556 2.669C4.756 6.405 4.027 8.781 4.005 12.009c.022 3.227.751 5.602 2.167 7.058 1.455 1.753 3.662 2.651 6.556 2.669h.009c1.664-.006 3.099-.343 4.381-1.03.558-.3 1.088-.63 1.581-1.006l1.178 1.832c-.608.472-1.259.897-1.934 1.253-1.63.863-3.445 1.301-5.395 1.301l-.362-.018zM12 8.069c-2.168 0-3.93 1.762-3.93 3.93s1.762 3.93 3.93 3.93 3.93-1.762 3.93-3.93-1.762-3.93-3.93-3.93zm0 1.738c1.209 0 2.192.983 2.192 2.192s-.983 2.192-2.192 2.192-2.192-.983-2.192-2.192.983-2.192 2.192-2.192z"/>
                    </svg>
                    Threads
                  </a>
                )}
                
                {author.socialLinks.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2.5 py-1.5 bg-gradient-to-r from-black to-gray-800 text-white text-xs font-medium rounded hover:from-gray-800 hover:to-gray-900 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X
                  </a>
                )}

                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2.5 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-medium rounded hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 無料相談CTA */}
        <div className="mt-6 p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                💡 無料1on1相談受付中
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                SNSマーケティングのご相談をお気軽に
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              相談する
            </a>
          </div>
        </div>
      </div>
    </>
  )
} 
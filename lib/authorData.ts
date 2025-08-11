// 監修者情報の型定義
export interface AuthorInfo {
  name: string
  title: string
  company: string
  description: string
  profileImage: string
  socialLinks?: {
    instagram?: string
    youtube?: string
    twitter?: string
    tiktok?: string
    threads?: string
    linkedin?: string
  }
}

// デフォルトの監修者情報
export const defaultAuthor: AuthorInfo = {
  name: "盛　啓太",
  title: "代表　総フォロワー20万人以上",
  company: "Ace Dream LLC",
  description: "SNS×AIのハイブリッド運用で集客と売上を最速化。イベント売上3億円超（広告200万以下／動員2万人）や飲食・美容の黒字化を支援。分析／戦略／PR／広告／バズ動画まで一気通貫。無料1on1相談受付中。",
  profileImage: "/images/keita-avatar-new.png",
  socialLinks: {
    instagram: "https://www.instagram.com/keita.0406/",
    tiktok: "https://www.tiktok.com/@keita.0406?lang=ja-JP",
    youtube: "https://www.youtube.com/@keita-rd9gg",
    threads: "https://www.threads.com/@keita.0406?hl=ja",
    twitter: "https://x.com/0406Keita",
    linkedin: "https://www.linkedin.com/in/keita-mori-adl"
  }
}

// HTMLテンプレートの生成
export const generateAuthorSectionHTML = (author: AuthorInfo = defaultAuthor): string => {
  return `
<!-- 監修者セクション（自動挿入） -->
<div class="author-section" style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 1rem; border: 1px solid #d1d5db;">
  <div style="display: flex; align-items: flex-start; gap: 1.5rem;">
    <div style="flex-shrink: 0; position: relative;">
      <img src="${author.profileImage}" alt="${author.name}のプロフィール写真" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="position: absolute; top: -8px; right: -8px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 1rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        監修者
      </div>
    </div>
    <div style="flex: 1; min-width: 0;">
      <div style="margin-bottom: 1rem;">
        <h3 style="font-size: 1.5rem; font-weight: bold; color: #111827; margin: 0 0 0.25rem 0;">${author.name}</h3>
        <p style="font-size: 1.125rem; font-weight: 600; color: #3b82f6; margin: 0;">${author.company} ${author.title}</p>
      </div>
      <p style="color: #374151; line-height: 1.6; margin: 0 0 1rem 0;">${author.description}</p>
      <div style="display: flex; flex-wrap: nowrap; gap: 0.5rem; justify-content: flex-start;">
        ${author.socialLinks?.instagram ? `
        <a href="${author.socialLinks.instagram}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; padding: 6px 10px; background: linear-gradient(135deg, #E4405F, #C13584); color: white; text-decoration: none; font-size: 11px; font-weight: 500; border-radius: 0.4rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <svg style="width: 12px; height: 12px; margin-right: 4px;" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Instagram
        </a>` : ''}
        ${author.socialLinks?.tiktok ? `
        <a href="${author.socialLinks.tiktok}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; padding: 6px 10px; background: linear-gradient(135deg, #FF0050, #FE2C55); color: white; text-decoration: none; font-size: 11px; font-weight: 500; border-radius: 0.4rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <svg style="width: 12px; height: 12px; margin-right: 4px;" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
          TikTok
        </a>` : ''}
        ${author.socialLinks?.youtube ? `
        <a href="${author.socialLinks.youtube}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; padding: 6px 10px; background: linear-gradient(135deg, #FF0000, #CC0000); color: white; text-decoration: none; font-size: 11px; font-weight: 500; border-radius: 0.4rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <svg style="width: 12px; height: 12px; margin-right: 4px;" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          YouTube
        </a>` : ''}
        ${author.socialLinks?.threads ? `
        <a href="${author.socialLinks.threads}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; padding: 6px 10px; background: linear-gradient(135deg, #000000, #333333); color: white; text-decoration: none; font-size: 11px; font-weight: 500; border-radius: 0.4rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <svg style="width: 12px; height: 12px; margin-right: 4px;" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017C1.5 8.417 2.35 5.563 3.995 3.512 5.845 1.208 8.598.027 12.179.003h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-.542-1.864-1.454-3.254-2.714-4.13-1.328-1.025-3.107-1.547-5.281-1.555h-.01c-2.894.018-5.101.916-6.556 2.669C4.756 6.405 4.027 8.781 4.005 12.009c.022 3.227.751 5.602 2.167 7.058 1.455 1.753 3.662 2.651 6.556 2.669h.009c1.664-.006 3.099-.343 4.381-1.03.558-.3 1.088-.63 1.581-1.006l1.178 1.832c-.608.472-1.259.897-1.934 1.253-1.63.863-3.445 1.301-5.395 1.301l-.362-.018zM12 8.069c-2.168 0-3.93 1.762-3.93 3.93s1.762 3.93 3.93 3.93 3.93-1.762 3.93-3.93-1.762-3.93-3.93-3.93zm0 1.738c1.209 0 2.192.983 2.192 2.192s-.983 2.192-2.192 2.192-2.192-.983-2.192-2.192.983-2.192 2.192-2.192z"/>
          </svg>
          Threads
        </a>` : ''}
        ${author.socialLinks?.twitter ? `
        <a href="${author.socialLinks.twitter}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; padding: 6px 10px; background: linear-gradient(135deg, #000000, #333333); color: white; text-decoration: none; font-size: 11px; font-weight: 500; border-radius: 0.4rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <svg style="width: 12px; height: 12px; margin-right: 4px;" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.080l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X
        </a>` : ''}
        ${author.socialLinks?.linkedin ? `
        <a href="${author.socialLinks.linkedin}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; padding: 6px 10px; background: linear-gradient(135deg, #0077B5, #005885); color: white; text-decoration: none; font-size: 11px; font-weight: 500; border-radius: 0.4rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <svg style="width: 12px; height: 12px; margin-right: 4px;" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>` : ''}
      </div>
    </div>
  </div>

  <!-- 無料相談CTA -->
  <div style="margin-top: 1.5rem; padding: 1rem; background: white; border-radius: 0.75rem; border: 1px solid #d1d5db;">
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
      <div>
        <p style="font-weight: 600; color: #111827; margin: 0 0 0.25rem 0;">💡 無料1on1相談受付中</p>
        <p style="font-size: 14px; color: #6b7280; margin: 0;">SNSマーケティングのご相談をお気軽に</p>
      </div>
      <a href="#contact" style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 8px 24px; border-radius: 0.5rem; font-weight: 500; text-decoration: none; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        相談する
      </a>
    </div>
  </div>
</div>
`
}

// 構造化データの生成
export const generateAuthorStructuredData = (author: AuthorInfo = defaultAuthor) => {
  return {
    "@type": "Person",
    "name": author.name,
    "jobTitle": author.title,
    "worksFor": {
      "@type": "Organization",
      "name": author.company
    },
    "description": author.description,
    "image": author.profileImage,
    "sameAs": author.socialLinks ? Object.values(author.socialLinks).filter(Boolean) : []
  }
} 
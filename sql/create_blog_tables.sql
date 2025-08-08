-- ブログCMS用テーブル作成スクリプト

-- 管理者ユーザーテーブル
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- カテゴリテーブル
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3b82f6',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ブログ記事テーブル
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_description VARCHAR(300),
  thumbnail_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- タグテーブル
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 記事とタグの中間テーブル
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- RLS (Row Level Security) 設定
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- 管理者用のポリシー
CREATE POLICY "管理者は全てのデータにアクセス可能" ON admin_users
  FOR ALL USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "カテゴリは認証済みユーザーのみ変更可能" ON blog_categories
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "記事は認証済みユーザーのみ変更可能" ON blog_posts
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "タグは認証済みユーザーのみ変更可能" ON blog_tags
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- 公開記事は誰でも閲覧可能
CREATE POLICY "公開記事は誰でも閲覧可能" ON blog_posts
  FOR SELECT USING (status = 'published');

-- 初期データ挿入
INSERT INTO blog_categories (name, slug, description, color, sort_order) VALUES
  ('最新ニュース', 'news', 'SNS業界の最新動向・トレンド情報', '#ef4444', 1),
  ('SNS戦略', 'strategy', 'SNSマーケティング戦略・分析手法', '#3b82f6', 2),
  ('コンテンツ制作', 'content', '投稿作成・動画編集のノウハウ', '#10b981', 3),
  ('広告運用', 'advertising', 'SNS広告・キャンペーン運用', '#f59e0b', 4),
  ('インフルエンサー', 'influencer', 'インフルエンサーマーケティング', '#8b5cf6', 5),
  ('実績・事例', 'case-studies', '成功事例・ケーススタディ', '#06b6d4', 6)
ON CONFLICT (slug) DO NOTHING;

-- 管理者ユーザー作成（パスワード: BuzzLab2025Admin!）
INSERT INTO admin_users (email, password_hash, name, role) VALUES
  ('admin@buzzlab.com', '$2b$10$XPO1JEaF6ABlOWZYIm4J7.k5rZ8BqFg5LNB2NwMhGRJ6GyMVJX1.K', 'BUZZLAB Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 更新時刻自動更新関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 更新時刻トリガー設定
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 
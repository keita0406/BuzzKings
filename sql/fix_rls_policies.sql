-- RLSポリシーの修正

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "カテゴリは認証済みユーザーのみ変更可能" ON blog_categories;
DROP POLICY IF EXISTS "記事は認証済みユーザーのみ変更可能" ON blog_posts;
DROP POLICY IF EXISTS "タグは認証済みユーザーのみ変更可能" ON blog_tags;
DROP POLICY IF EXISTS "管理者は全てのデータにアクセス可能" ON admin_users;

-- より簡単なポリシーに変更

-- カテゴリは誰でも読み取り可能、認証済みユーザーのみ変更可能
CREATE POLICY "カテゴリは誰でも読み取り可能" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "カテゴリは認証済みユーザーのみ変更可能" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- 記事は誰でも公開記事を読み取り可能、認証済みユーザーのみ変更可能
CREATE POLICY "記事は認証済みユーザーのみ変更可能" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- タグは誰でも読み取り可能、認証済みユーザーのみ変更可能
CREATE POLICY "タグは誰でも読み取り可能" ON blog_tags
  FOR SELECT USING (true);

CREATE POLICY "タグは認証済みユーザーのみ変更可能" ON blog_tags
  FOR ALL USING (auth.role() = 'authenticated');

-- 管理者ユーザーは認証済みユーザーのみアクセス可能
CREATE POLICY "管理者ユーザーは認証済みユーザーのみアクセス可能" ON admin_users
  FOR ALL USING (auth.role() = 'authenticated'); 
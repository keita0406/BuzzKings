-- ストレージポリシー修正（一時的な解決策）

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "認証済みユーザーは画像をアップロード可能" ON storage.objects;
DROP POLICY IF EXISTS "認証済みユーザーは画像を更新可能" ON storage.objects;
DROP POLICY IF EXISTS "認証済みユーザーは画像を削除可能" ON storage.objects;
DROP POLICY IF EXISTS "ブログ画像は誰でも閲覧可能" ON storage.objects;

-- 新しいポリシー（管理者向けに緩和）
CREATE POLICY "ブログ画像は誰でも閲覧可能" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

-- 一時的に誰でもアップロード可能にする（管理画面用）
CREATE POLICY "blog-imagesバケットへのアップロード許可" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "blog-imagesバケットの更新許可" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-images');

CREATE POLICY "blog-imagesバケットの削除許可" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images');

-- バケット自体の設定確認・更新
UPDATE storage.buckets 
SET public = true 
WHERE id = 'blog-images'; 
-- ブログ画像用ストレージバケット作成

-- blog-imagesバケットを作成
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- バケットのポリシー設定
CREATE POLICY "ブログ画像は誰でも閲覧可能" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "認証済みユーザーは画像をアップロード可能" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "認証済みユーザーは画像を更新可能" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'blog-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "認証済みユーザーは画像を削除可能" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-images' 
    AND auth.role() = 'authenticated'
  ); 
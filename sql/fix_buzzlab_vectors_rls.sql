-- buzzlab_vectors テーブルのRLSポリシー修正
-- KEITA流SNSマニュアルベクトル化用

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Allow read access for all users" ON public.buzzlab_vectors;
DROP POLICY IF EXISTS "Allow insert access for authenticated users" ON public.buzzlab_vectors;
DROP POLICY IF EXISTS "Allow update access for authenticated users" ON public.buzzlab_vectors;
DROP POLICY IF EXISTS "Allow delete access for authenticated users" ON public.buzzlab_vectors;

-- より緩い新しいポリシーを作成

-- 読み取りは誰でも可能
CREATE POLICY "Public read access for buzzlab_vectors" 
ON public.buzzlab_vectors FOR SELECT 
TO authenticated, anon 
USING (true);

-- 挿入・更新・削除はサービスロールとanonユーザーに許可
CREATE POLICY "Allow all operations for service role" 
ON public.buzzlab_vectors FOR ALL 
TO authenticated, anon
USING (true)
WITH CHECK (true);

-- サービスロールに全権限を付与
GRANT ALL ON public.buzzlab_vectors TO service_role;
GRANT ALL ON public.buzzlab_vectors TO anon;

-- または、完全にRLSを無効化する場合（開発用）
-- ALTER TABLE public.buzzlab_vectors DISABLE ROW LEVEL SECURITY;

-- 確認用クエリ
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'buzzlab_vectors'; 
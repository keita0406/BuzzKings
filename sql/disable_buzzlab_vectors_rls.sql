-- 開発環境用: buzzlab_vectors テーブルのRLSを一時的に無効化
-- KEITA流SNSマニュアルベクトル化テスト用

-- RLSを無効化
ALTER TABLE public.buzzlab_vectors DISABLE ROW LEVEL SECURITY;

-- 確認
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'buzzlab_vectors';

-- 必要に応じて再有効化する場合のコマンド（コメントアウト）
-- ALTER TABLE public.buzzlab_vectors ENABLE ROW LEVEL SECURITY; 
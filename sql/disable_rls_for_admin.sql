-- 管理画面用にRLSポリシーを一時的に無効化

-- blog_postsテーブルのRLS無効化
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- blog_post_tagsテーブルのRLS無効化  
ALTER TABLE blog_post_tags DISABLE ROW LEVEL SECURITY;

-- blog_tagsテーブルのRLS無効化
ALTER TABLE blog_tags DISABLE ROW LEVEL SECURITY;

-- blog_categoriesテーブルのRLS無効化（既に無効の可能性あり）
ALTER TABLE blog_categories DISABLE ROW LEVEL SECURITY;

-- admin_usersテーブルのRLS無効化
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- 念のため、既存のポリシーを一旦削除
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blog_posts;

DROP POLICY IF EXISTS "Enable read access for all users" ON blog_categories;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_categories;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blog_categories;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blog_categories;

DROP POLICY IF EXISTS "Enable read access for all users" ON blog_tags;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_tags;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blog_tags;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blog_tags;

DROP POLICY IF EXISTS "Enable read access for all users" ON blog_post_tags;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_post_tags;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blog_post_tags;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blog_post_tags;

DROP POLICY IF EXISTS "Enable read access for all users" ON admin_users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON admin_users;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON admin_users;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON admin_users; 
-- シンプルな管理者ユーザー作成

-- 既存のadmin_usersテーブルを確認・更新
DELETE FROM admin_users WHERE email = 'admin@buzzlab.com';

-- 新しい管理者ユーザーを作成
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@buzzlab.com', '$2b$10$XPO1JEaF6ABlOWZYIm4J7.k5rZ8BqFg5LNB2NwMhGRJ6GyMVJX1.K', 'BUZZLAB Admin', 'admin');

-- 確認
SELECT * FROM admin_users WHERE email = 'admin@buzzlab.com'; 
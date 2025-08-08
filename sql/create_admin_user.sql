-- 管理者ユーザーをSupabase Authに作成

-- 1. auth.usersテーブルに管理者ユーザーを挿入
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@buzzlab.com',
  crypt('BuzzLab2025Admin!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "BUZZLAB Admin"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
)
ON CONFLICT (email) DO NOTHING;

-- 2. auth.identitiesテーブルにアイデンティティを追加
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT
  gen_random_uuid(),
  u.id,
  jsonb_build_object(
    'sub', u.id::text,
    'email', u.email
  ),
  'email',
  NOW(),
  NOW(),
  NOW()
FROM auth.users u
WHERE u.email = 'admin@buzzlab.com'
AND NOT EXISTS (
  SELECT 1 FROM auth.identities i WHERE i.user_id = u.id AND i.provider = 'email'
);

-- 3. admin_usersテーブルにも対応するレコードを作成
INSERT INTO public.admin_users (
  id,
  email,
  password_hash,
  name,
  role,
  created_at,
  updated_at
)
SELECT
  u.id,
  u.email,
  u.encrypted_password,
  'BUZZLAB Admin',
  'admin',
  NOW(),
  NOW()
FROM auth.users u
WHERE u.email = 'admin@buzzlab.com'
ON CONFLICT (email) DO UPDATE SET
  id = EXCLUDED.id,
  password_hash = EXCLUDED.password_hash,
  updated_at = NOW(); 
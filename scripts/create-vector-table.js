const { createClient } = require('@supabase/supabase-js')

async function createVectorTable() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xwhqrgpkvtcmkuvasrzq.supabase.co'
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3aHFyZ3BrdnRjbWt1dmFzcnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NjkzMTIsImV4cCI6MjA3MDI0NTMxMn0.86ykCJyZZRItj2Ep7B-ygAcUgNPquMch7EF49bEv6xA'

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log('🚀 PGVector拡張とテーブル作成開始...')

  try {
    // Step 1: Enable vector extension
    console.log('📦 vector拡張を有効化...')
    const { error: extensionError } = await supabase.rpc('sql', {
      query: 'CREATE EXTENSION IF NOT EXISTS vector;'
    })

    if (extensionError) {
      console.log('⚠️  拡張作成エラー（既に存在する可能性）:', extensionError.message)
    } else {
      console.log('✅ vector拡張が有効化されました')
    }

    // Step 2: Create buzzlab_vectors table
    console.log('🗄️  buzzlab_vectorsテーブル作成中...')
    
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS public.buzzlab_vectors (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        metadata JSONB NOT NULL DEFAULT '{}',
        vector vector(1536) NOT NULL,
        cluster_id TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `

    const { error: tableError } = await supabase.rpc('sql', {
      query: createTableSQL
    })

    if (tableError) {
      console.error('❌ テーブル作成エラー:', tableError)
    } else {
      console.log('✅ buzzlab_vectorsテーブルが作成されました')
    }

    // Step 3: Create index for vector similarity search
    console.log('🔍 ベクトル検索用インデックス作成中...')
    
    const createIndexSQL = `
      CREATE INDEX IF NOT EXISTS buzzlab_vectors_vector_idx 
      ON public.buzzlab_vectors 
      USING ivfflat (vector vector_cosine_ops) 
      WITH (lists = 100);
    `

    const { error: indexError } = await supabase.rpc('sql', {
      query: createIndexSQL
    })

    if (indexError) {
      console.log('⚠️  インデックス作成エラー（既に存在する可能性）:', indexError.message)
    } else {
      console.log('✅ ベクトル検索用インデックスが作成されました')
    }

    // Step 4: Enable RLS and create policies
    console.log('🔒 RLS設定中...')
    
    const rlsSQL = `
      ALTER TABLE public.buzzlab_vectors ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY IF NOT EXISTS "Allow read access for all users" 
      ON public.buzzlab_vectors FOR SELECT 
      TO authenticated, anon 
      USING (true);
      
      CREATE POLICY IF NOT EXISTS "Allow insert access for authenticated users" 
      ON public.buzzlab_vectors FOR INSERT 
      TO authenticated 
      WITH CHECK (true);
      
      CREATE POLICY IF NOT EXISTS "Allow update access for authenticated users" 
      ON public.buzzlab_vectors FOR UPDATE 
      TO authenticated 
      USING (true);
    `

    const { error: rlsError } = await supabase.rpc('sql', {
      query: rlsSQL
    })

    if (rlsError) {
      console.log('⚠️  RLS設定エラー（既に存在する可能性）:', rlsError.message)
    } else {
      console.log('✅ RLS設定が完了しました')
    }

    // Step 5: Verify table creation
    console.log('🔍 テーブル確認中...')
    
    const { data: tables, error: checkError } = await supabase
      .from('buzzlab_vectors')
      .select('count(*)')
      .limit(0)

    if (checkError) {
      console.error('❌ テーブル確認エラー:', checkError)
    } else {
      console.log('✅ buzzlab_vectorsテーブルが正常に作成されました！')
    }

    console.log('🎉 PGVectorセットアップが完了しました！')

  } catch (error) {
    console.error('❌ セットアップエラー:', error)
  }
}

createVectorTable() 
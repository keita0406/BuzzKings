-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create buzzlab_vectors table for storing BuzzLab content embeddings
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

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS buzzlab_vectors_vector_idx 
ON public.buzzlab_vectors 
USING ivfflat (vector vector_cosine_ops) 
WITH (lists = 100);

-- Create additional indexes for common queries
CREATE INDEX IF NOT EXISTS buzzlab_vectors_type_idx ON public.buzzlab_vectors(type);
CREATE INDEX IF NOT EXISTS buzzlab_vectors_cluster_id_idx ON public.buzzlab_vectors(cluster_id);
CREATE INDEX IF NOT EXISTS buzzlab_vectors_created_at_idx ON public.buzzlab_vectors(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.buzzlab_vectors ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
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

CREATE POLICY IF NOT EXISTS "Allow delete access for authenticated users" 
ON public.buzzlab_vectors FOR DELETE 
TO authenticated 
USING (true);

-- Grant permissions
GRANT ALL ON public.buzzlab_vectors TO authenticated;
GRANT SELECT ON public.buzzlab_vectors TO anon;

-- Create function for vector similarity search
CREATE OR REPLACE FUNCTION public.match_buzzlab_vectors(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.78,
  match_count int DEFAULT 10,
  filter_type text DEFAULT NULL,
  filter_cluster_id text DEFAULT NULL
)
RETURNS TABLE (
  id text,
  type text,
  title text,
  content text,
  metadata jsonb,
  cluster_id text,
  similarity float,
  created_at timestamptz
)
LANGUAGE sql STABLE
AS $$
  SELECT
    buzzlab_vectors.id,
    buzzlab_vectors.type,
    buzzlab_vectors.title,
    buzzlab_vectors.content,
    buzzlab_vectors.metadata,
    buzzlab_vectors.cluster_id,
    1 - (buzzlab_vectors.vector <=> query_embedding) AS similarity,
    buzzlab_vectors.created_at
  FROM buzzlab_vectors
  WHERE 
    (filter_type IS NULL OR buzzlab_vectors.type = filter_type)
    AND (filter_cluster_id IS NULL OR buzzlab_vectors.cluster_id = filter_cluster_id)
    AND 1 - (buzzlab_vectors.vector <=> query_embedding) > match_threshold
  ORDER BY buzzlab_vectors.vector <=> query_embedding
  LIMIT match_count;
$$;

-- Create function for hybrid search (text + vector)
CREATE OR REPLACE FUNCTION public.search_buzzlab_content(
  search_query text,
  query_embedding vector(1536) DEFAULT NULL,
  match_threshold float DEFAULT 0.75,
  match_count int DEFAULT 10,
  filter_type text DEFAULT NULL
)
RETURNS TABLE (
  id text,
  type text,
  title text,
  content text,
  metadata jsonb,
  cluster_id text,
  text_rank float,
  vector_similarity float,
  combined_score float,
  created_at timestamptz
)
LANGUAGE sql STABLE
AS $$
  SELECT
    buzzlab_vectors.id,
    buzzlab_vectors.type,
    buzzlab_vectors.title,
    buzzlab_vectors.content,
    buzzlab_vectors.metadata,
    buzzlab_vectors.cluster_id,
    ts_rank(to_tsvector('japanese', buzzlab_vectors.title || ' ' || buzzlab_vectors.content), plainto_tsquery('japanese', search_query)) AS text_rank,
    CASE 
      WHEN query_embedding IS NOT NULL THEN 1 - (buzzlab_vectors.vector <=> query_embedding)
      ELSE 0.0
    END AS vector_similarity,
    CASE 
      WHEN query_embedding IS NOT NULL THEN 
        (ts_rank(to_tsvector('japanese', buzzlab_vectors.title || ' ' || buzzlab_vectors.content), plainto_tsquery('japanese', search_query)) * 0.4) +
        ((1 - (buzzlab_vectors.vector <=> query_embedding)) * 0.6)
      ELSE ts_rank(to_tsvector('japanese', buzzlab_vectors.title || ' ' || buzzlab_vectors.content), plainto_tsquery('japanese', search_query))
    END AS combined_score,
    buzzlab_vectors.created_at
  FROM buzzlab_vectors
  WHERE 
    (filter_type IS NULL OR buzzlab_vectors.type = filter_type)
    AND (
      to_tsvector('japanese', buzzlab_vectors.title || ' ' || buzzlab_vectors.content) @@ plainto_tsquery('japanese', search_query)
      OR (query_embedding IS NOT NULL AND 1 - (buzzlab_vectors.vector <=> query_embedding) > match_threshold)
    )
  ORDER BY combined_score DESC
  LIMIT match_count;
$$; 
-- 1. 기존 albums 테이블에 views 컬럼 추가 (없는 경우에만)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='albums' AND column_name='views') THEN
        ALTER TABLE albums ADD COLUMN views INTEGER DEFAULT 0;
    END IF;
END $$;

-- 2. qts 테이블 생성
CREATE TABLE IF NOT EXISTS qts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    book TEXT NOT NULL,
    chapter TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    views INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. qts 테이블 RLS 정책 설정
ALTER TABLE qts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public qts are viewable by everyone." ON qts;
DROP POLICY IF EXISTS "Authenticated users can insert qts" ON qts;
DROP POLICY IF EXISTS "Authenticated users can update qts" ON qts;
DROP POLICY IF EXISTS "Authenticated users can delete qts" ON qts;

CREATE POLICY "Public qts are viewable by everyone." ON qts FOR SELECT USING (is_public = true);
CREATE POLICY "Authenticated users can insert qts" ON qts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update qts" ON qts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete qts" ON qts FOR DELETE USING (auth.role() = 'authenticated');

-- 4. 조회수 증가용 RPC 함수 생성 (일반 유저도 조회수를 증가시킬 수 있도록 SECURITY DEFINER 사용)
CREATE OR REPLACE FUNCTION increment_view_count(table_name text, row_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF table_name = 'albums' THEN
    UPDATE albums SET views = COALESCE(views, 0) + 1 WHERE id = row_id;
  ELSIF table_name = 'qts' THEN
    UPDATE qts SET views = COALESCE(views, 0) + 1 WHERE id = row_id;
  END IF;
END;
$$;

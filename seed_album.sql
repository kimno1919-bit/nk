-- 1. 앨범(albums) 테이블 생성
CREATE TABLE IF NOT EXISTS albums (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    media_url TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE albums ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public albums are viewable by everyone." ON albums;
DROP POLICY IF EXISTS "Authenticated users can insert albums" ON albums;
DROP POLICY IF EXISTS "Authenticated users can update albums" ON albums;
DROP POLICY IF EXISTS "Authenticated users can delete albums" ON albums;

CREATE POLICY "Public albums are viewable by everyone." ON albums FOR SELECT USING (is_public = true);
CREATE POLICY "Authenticated users can insert albums" ON albums FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update albums" ON albums FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete albums" ON albums FOR DELETE USING (auth.role() = 'authenticated');

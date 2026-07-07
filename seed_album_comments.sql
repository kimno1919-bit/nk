-- 1. albums 테이블에 좋아요(likes) 컬럼 추가
ALTER TABLE albums ADD COLUMN IF NOT EXISTS likes INT DEFAULT 0;

-- 2. 앨범 좋아요 증가 함수 (RPC)
CREATE OR REPLACE FUNCTION increment_album_like(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE albums SET likes = COALESCE(likes, 0) + 1 WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. album_comments 테이블 생성
CREATE TABLE IF NOT EXISTS album_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    password TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. RLS 정책 설정
ALTER TABLE album_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view comments" ON album_comments;
DROP POLICY IF EXISTS "Public can insert comments" ON album_comments;
DROP POLICY IF EXISTS "Authenticated admins can delete comments" ON album_comments;

CREATE POLICY "Public can view comments" ON album_comments FOR SELECT USING (true);
CREATE POLICY "Public can insert comments" ON album_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated admins can delete comments" ON album_comments FOR DELETE USING (auth.role() = 'authenticated');

-- 5. 비밀번호로 댓글 삭제하는 함수 (RPC)
CREATE OR REPLACE FUNCTION delete_album_comment_with_password(comment_id UUID, p_password TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    v_password TEXT;
BEGIN
    SELECT password INTO v_password FROM album_comments WHERE id = comment_id;
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    IF v_password = p_password THEN
        DELETE FROM album_comments WHERE id = comment_id;
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. 스키마 캐시 강제 새로고침
NOTIFY pgrst, 'reload schema';

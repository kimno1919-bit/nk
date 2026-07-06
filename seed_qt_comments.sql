-- 1. qts 테이블에 좋아요(likes) 컬럼 추가
ALTER TABLE qts ADD COLUMN IF NOT EXISTS likes INT DEFAULT 0;

-- 2. 좋아요 증가 함수 (RPC)
CREATE OR REPLACE FUNCTION increment_qt_like(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE qts SET likes = COALESCE(likes, 0) + 1 WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. qt_comments 테이블 생성
CREATE TABLE IF NOT EXISTS qt_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    qt_id UUID REFERENCES qts(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    password TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. RLS 정책 설정
ALTER TABLE qt_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view comments" ON qt_comments;
DROP POLICY IF EXISTS "Public can insert comments" ON qt_comments;
DROP POLICY IF EXISTS "Authenticated admins can delete comments" ON qt_comments;

CREATE POLICY "Public can view comments" ON qt_comments FOR SELECT USING (true);
CREATE POLICY "Public can insert comments" ON qt_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated admins can delete comments" ON qt_comments FOR DELETE USING (auth.role() = 'authenticated');

-- 5. 비밀번호로 댓글 삭제하는 함수 (RPC)
-- 퍼블릭 사용자가 자기 비밀번호를 맞추면 삭제 가능하도록 함
CREATE OR REPLACE FUNCTION delete_qt_comment_with_password(comment_id UUID, p_password TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  matched BOOLEAN;
BEGIN
  -- 비밀번호가 일치하는지 확인
  SELECT EXISTS (
    SELECT 1 FROM qt_comments WHERE id = comment_id AND password = p_password
  ) INTO matched;

  IF matched THEN
    DELETE FROM qt_comments WHERE id = comment_id;
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

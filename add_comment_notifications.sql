-- 1. 각 댓글 테이블에 is_read 컬럼 추가
ALTER TABLE qt_comments ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;
ALTER TABLE album_comments ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;
ALTER TABLE notice_comments ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- 2. 모든 댓글을 모아서 볼 수 있는 뷰(View) 생성
CREATE OR REPLACE VIEW all_comments_view AS
SELECT 
    id,
    'qt' as board_type,
    qt_id as post_id,
    author,
    content,
    created_at,
    is_read
FROM qt_comments
UNION ALL
SELECT 
    id,
    'album' as board_type,
    album_id as post_id,
    author,
    content,
    created_at,
    is_read
FROM album_comments
UNION ALL
SELECT 
    id,
    'notice' as board_type,
    notice_id as post_id,
    author,
    content,
    created_at,
    is_read
FROM notice_comments;

-- 3. 관리자가 댓글을 읽음 처리하는 함수(RPC)
CREATE OR REPLACE FUNCTION mark_comment_as_read(p_comment_id UUID, p_board_type TEXT)
RETURNS void AS $$
BEGIN
    IF p_board_type = 'qt' THEN
        UPDATE qt_comments SET is_read = TRUE WHERE id = p_comment_id;
    ELSIF p_board_type = 'album' THEN
        UPDATE album_comments SET is_read = TRUE WHERE id = p_comment_id;
    ELSIF p_board_type = 'notice' THEN
        UPDATE notice_comments SET is_read = TRUE WHERE id = p_comment_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. 캐시 강제 갱신
NOTIFY pgrst, 'reload schema';

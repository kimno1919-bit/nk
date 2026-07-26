-- 1. Add views and likes columns to notices table
ALTER TABLE notices ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;
ALTER TABLE notices ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;

-- 2. Create notice_comments table
CREATE TABLE IF NOT EXISTS notice_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    notice_id UUID REFERENCES notices(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    password TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Set up Row Level Security (RLS) for notice_comments
ALTER TABLE notice_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public notice_comments are viewable by everyone." ON notice_comments;
CREATE POLICY "Public notice_comments are viewable by everyone."
ON notice_comments FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Anyone can insert notice_comments." ON notice_comments;
CREATE POLICY "Anyone can insert notice_comments."
ON notice_comments FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can delete their notice_comment if they know the password." ON notice_comments;
CREATE POLICY "Anyone can delete their notice_comment if they know the password."
ON notice_comments FOR DELETE
USING (true);

-- 4. Create function to delete comment with password check
CREATE OR REPLACE FUNCTION delete_notice_comment_with_password(comment_id UUID, p_password TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  v_password TEXT;
BEGIN
  SELECT password INTO v_password FROM notice_comments WHERE id = comment_id;
  IF v_password IS NOT NULL AND v_password = p_password THEN
    DELETE FROM notice_comments WHERE id = comment_id;
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Update increment_view_count to include 'notices'
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
  ELSIF table_name = 'notices' THEN
    UPDATE notices SET views = COALESCE(views, 0) + 1 WHERE id = row_id;
  END IF;
END;
$$;

-- 6. Create increment_notice_like function
CREATE OR REPLACE FUNCTION increment_notice_like(row_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE notices SET likes = COALESCE(likes, 0) + 1 WHERE id = row_id;
END;
$$;

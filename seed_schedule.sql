-- 1. schedules 테이블 생성
CREATE TABLE IF NOT EXISTS schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    time TEXT,
    category TEXT NOT NULL CHECK (category IN ('정기모임', '행사')),
    title TEXT NOT NULL,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. RLS 정책 설정
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public schedules are viewable by everyone." ON schedules;
DROP POLICY IF EXISTS "Authenticated users can insert schedules" ON schedules;
DROP POLICY IF EXISTS "Authenticated users can update schedules" ON schedules;
DROP POLICY IF EXISTS "Authenticated users can delete schedules" ON schedules;

CREATE POLICY "Public schedules are viewable by everyone." ON schedules FOR SELECT USING (is_public = true);
CREATE POLICY "Authenticated users can insert schedules" ON schedules FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update schedules" ON schedules FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete schedules" ON schedules FOR DELETE USING (auth.role() = 'authenticated');

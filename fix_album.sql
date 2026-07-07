-- 1. 혹시라도 누락되었을지 모를 컬럼 추가
ALTER TABLE albums ADD COLUMN IF NOT EXISTS media_urls JSONB;

-- 2. Supabase API 서버 스키마 캐시 강제 새로고침 (매우 중요!)
NOTIFY pgrst, reload_schema;

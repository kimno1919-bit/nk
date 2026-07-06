-- albums 테이블에 여러 장의 미디어 URL을 저장할 JSONB 컬럼 추가
ALTER TABLE albums ADD COLUMN IF NOT EXISTS media_urls JSONB DEFAULT '[]'::jsonb;

-- 기존 데이터를 보존하기 위해, media_url 값이 있고 media_urls가 비어있을 경우 마이그레이션 처리
UPDATE albums 
SET media_urls = jsonb_build_array(media_url) 
WHERE media_url IS NOT NULL AND (media_urls IS NULL OR jsonb_array_length(media_urls) = 0);

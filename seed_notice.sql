-- notices 테이블에 이미지 URL을 저장할 컬럼 추가
ALTER TABLE notices ADD COLUMN IF NOT EXISTS image_url TEXT;

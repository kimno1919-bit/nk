-- 장/절 순서대로 날짜를 자동으로 싹 다 고쳐주는 마법의 쿼리 (절 숫자까지 완벽 정렬!)
-- 2026년 7월 7일부터 순서대로 하루씩 더해서 날짜를 다시 세팅합니데이.

WITH sorted_qts AS (
  SELECT id,
         -- 1. 장 숫자 추출 ('6장'에서 6)
         -- 2. 시작 절 숫자 추출 ('6장 13-20절'에서 13)
         -- 3. 전체 글자 정렬
         ROW_NUMBER() OVER (
           ORDER BY 
             CAST(SUBSTRING(chapter FROM '^(\d+)') AS INTEGER) ASC,
             CAST(NULLIF(SUBSTRING(chapter FROM '장\s*(\d+)'), '') AS INTEGER) ASC,
             chapter ASC
         ) as rn
  FROM qts
  WHERE book = '히브리서'
)
UPDATE qts
-- 2026년 7월 7일을 시작으로, 순서대로 하루씩 업데이트 (히브리서)
SET date = '2026-07-07'::DATE + (sorted_qts.rn - 1) * INTERVAL '1 day'
FROM sorted_qts
WHERE qts.id = sorted_qts.id;

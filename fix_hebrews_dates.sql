-- 히브리서 장/절 순서대로 날짜를 자동으로 싹 다 고쳐주는 마법의 쿼리!
-- 2026년 7월 7일부터 순서대로 하루씩 더해서 날짜를 다시 세팅합니데이.

WITH sorted_qts AS (
  SELECT id,
         -- 장 숫자만 뽑아내서 정렬하고, 그 다음 전체 글자로 정렬해서 순서(1, 2, 3...)를 매김
         ROW_NUMBER() OVER (
           ORDER BY 
             CAST(SUBSTRING(chapter FROM '^(\d+)') AS INTEGER) ASC,
             chapter ASC
         ) as rn
  FROM qts
  WHERE book = '히브리서'
)
UPDATE qts
-- 2026년 7월 7일을 시작으로, 순서대로 하루씩 더해서 날짜를 업데이트 (오늘까지 딱 20개!)
SET date = '2026-07-07'::DATE + (sorted_qts.rn - 1) * INTERVAL '1 day'
FROM sorted_qts
WHERE qts.id = sorted_qts.id;

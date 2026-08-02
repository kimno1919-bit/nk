-- 장/절 순서대로 날짜를 자동으로 싹 다 고쳐주는 마법의 쿼리 (빌레몬서 & 히브리서)

-- 먼저 책 이름 뒤에 붙은 공백(스페이스바)을 싹 다 지워줍니다
UPDATE qts SET book = TRIM(book) WHERE book LIKE '% ';

-- 1. 빌레몬서 날짜 업데이트 (2026년 6월 10일부터)
WITH sorted_philemon AS (
  SELECT id,
         ROW_NUMBER() OVER (
           ORDER BY 
             CAST(SUBSTRING(chapter FROM '([0-9]+)') AS INTEGER) ASC NULLS FIRST,
             CAST(SUBSTRING(chapter FROM '[^0-9]*[0-9]+[^0-9]+([0-9]+)') AS INTEGER) ASC NULLS FIRST,
             chapter ASC
         ) as rn
  FROM qts
  WHERE book = '빌레몬서'
)
UPDATE qts
SET date = '2026-06-10'::DATE + (sorted_philemon.rn - 1) * INTERVAL '1 day'
FROM sorted_philemon
WHERE qts.id = sorted_philemon.id;

-- 2. 히브리서 날짜 업데이트 (2026년 7월 2일부터)
WITH sorted_hebrews AS (
  SELECT id,
         ROW_NUMBER() OVER (
           ORDER BY 
             CAST(SUBSTRING(chapter FROM '([0-9]+)') AS INTEGER) ASC NULLS FIRST,
             CAST(SUBSTRING(chapter FROM '[^0-9]*[0-9]+[^0-9]+([0-9]+)') AS INTEGER) ASC NULLS FIRST,
             chapter ASC
         ) as rn
  FROM qts
  WHERE book = '히브리서'
)
UPDATE qts
SET date = '2026-07-02'::DATE + (sorted_hebrews.rn - 1) * INTERVAL '1 day'
FROM sorted_hebrews
WHERE qts.id = sorted_hebrews.id;

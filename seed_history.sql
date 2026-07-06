-- 1. 공지사항 테이블 생성
CREATE TABLE IF NOT EXISTS notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    category TEXT DEFAULT '일반',
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 연혁 테이블 생성
CREATE TABLE IF NOT EXISTS histories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    year INTEGER NOT NULL,
    month TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    category TEXT DEFAULT '기타',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. RLS(Row Level Security) 활성화
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE histories ENABLE ROW LEVEL SECURITY;

-- 4. 정책(Policies) 설정 (에러 방지를 위해 기존 정책이 있다면 삭제하는 로직 추가)
DROP POLICY IF EXISTS "Public notices are viewable by everyone." ON notices;
DROP POLICY IF EXISTS "Public histories are viewable by everyone." ON histories;
DROP POLICY IF EXISTS "Authenticated users can insert notices" ON notices;
DROP POLICY IF EXISTS "Authenticated users can update notices" ON notices;
DROP POLICY IF EXISTS "Authenticated users can delete notices" ON notices;
DROP POLICY IF EXISTS "Authenticated users can insert histories" ON histories;
DROP POLICY IF EXISTS "Authenticated users can update histories" ON histories;
DROP POLICY IF EXISTS "Authenticated users can delete histories" ON histories;

CREATE POLICY "Public notices are viewable by everyone." ON notices FOR SELECT USING (is_public = true);
CREATE POLICY "Public histories are viewable by everyone." ON histories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert notices" ON notices FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update notices" ON notices FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete notices" ON notices FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert histories" ON histories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update histories" ON histories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete histories" ON histories FOR DELETE USING (auth.role() = 'authenticated');

-- 5. 연혁 초기 데이터 삽입
INSERT INTO histories (year, month, category, title, content, sort_order) VALUES
(2026, '05', 'QT', '[3331 생명의 QT] 빌립보서', NULL, 1),
(2026, '05', 'QT', '[3331 생명의 QT] 골로새서', NULL, 2),
(2026, '04', 'QT', '[3331 생명의 QT] 에베소서', NULL, 3),
(2026, '04', 'QT', '[3331 생명의 QT] 갈라디아서', NULL, 4),
(2026, '03', '캠프', '리더십 캠프', NULL, 5),
(2026, '03', 'QT', '[3331 생명의 QT] 고린도후서', NULL, 6),
(2026, '03', 'QT', '[3331 생명의 QT] 고린도전서', NULL, 7),
(2026, '02', '봉사', '사랑의 연탄 봉사활동', NULL, 8),
(2026, '01', 'QT', '[3331 생명의 QT] 고린도전서', NULL, 9),
(2026, '상시', '전도', '매주 마포대교, 한강대교 노방전도', NULL, 10),
(2026, '상시', '행사', '매주 기도모임', NULL, 11),
(2025, '12', 'QT', '[3331 생명의 QT] 로마서', NULL, 1),
(2025, '11', '행사', '석OO 감독 독립영화 초연 시사회', NULL, 2),
(2025, '09', 'QT', '[3331 생명의 QT] 사도행전', NULL, 3),
(2025, '09', 'QT', '[3331 생명의 QT] 사도행전', NULL, 4),
(2025, '05', '전도', '일본 전도와 여행', NULL, 5),
(2025, '05', 'QT', '[3331 생명의 QT] 누가복음', NULL, 6),
(2025, '01', '봉사', '사랑의 연탄 봉사활동', NULL, 7),
(2025, '01', 'QT', '[3331 생명의 QT] 출애굽기', NULL, 8),
(2025, '상시', '전도', '매주 마포대교, 한강대교 노방전도', NULL, 9),
(2025, '상시', '행사', '매주 기도모임', NULL, 10),
(2025, '상시', '행사', 'NKFC 남북청년 축구팀 운영', NULL, 11),
(2024, '12', '행사', '제6회 남북청년 체육대회 개회(등산)', NULL, 1),
(2024, '08', 'QT', '[3331 생명의 QT] 창세기', NULL, 2),
(2024, '07', '캠프', '리더십 캠프', NULL, 3),
(2024, '06', 'QT', '[3331 생명의 QT] 요한일서, 요한이서, 요한삼서, 요한계시록', NULL, 4),
(2024, '05', 'QT', '[3331 생명의 QT] 야고보서, 베드로전서, 베드로후서', NULL, 5),
(2024, '04', '행사', '캠핑&풋살&바베큐 행사 개최', NULL, 6),
(2024, '04', 'QT', '[3331 생명의 QT] 빌레몬서, 히브리서', NULL, 7),
(2024, '03', 'QT', '[3331 생명의 QT] 데살로니가후서, 디모데전서, 디모데후서, 디도서', NULL, 8),
(2024, '02', 'QT', '[3331 생명의 QT] 빌립보서, 골로새서, 데살로니가전서', NULL, 9),
(2024, '01', '행사', '일상 회복 및 누림을 위한 남북청년 낚시 교제', NULL, 10),
(2024, '01', '봉사', '사랑의 연탄 봉사활동', NULL, 11),
(2024, '01', 'QT', '[3331 생명의 QT] 갈라디아서, 에베소서', NULL, 12),
(2024, '상시', '행사', '매주 기도모임', NULL, 13),
(2024, '상시', '전도', '매일 마포대교, 한강대교 노방전도', NULL, 14),
(2024, '상시', '행사', 'NKFC 남북청년 축구팀 운영', NULL, 15),
(2023, '12', '행사', '제5회 남북청년 체육대회 개회', NULL, 1),
(2023, '12', 'QT', '[3331 생명의 QT] 고린도후서', NULL, 2),
(2023, '10', '행사', '일상 회복 및 누림을 위한 남북청년 낚시 교제', NULL, 3),
(2023, '10', 'QT', '[3331 생명의 QT] 고린도전서', NULL, 4),
(2023, '09', '행사', '캠핑&풋살&바베큐 행사 개최', NULL, 5),
(2023, '09', 'QT', '[3331 생명의 QT] 로마서', NULL, 6),
(2023, '06', 'QT', '[3331 생명의 QT] 사도행전', NULL, 7),
(2023, '05', '행사', '캠핑&풋살&바베큐 행사 개최', NULL, 8),
(2023, '03', 'QT', '[3331 생명의 QT] 요한복음', NULL, 9),
(2023, '상시', '행사', '매주 기도모임', NULL, 10),
(2023, '상시', '전도', '매일 마포대교 노방전도', NULL, 11),
(2023, '상시', '행사', 'NKFC 남북청년 축구팀 운영', NULL, 12),
(2022, '12', '행사', '제4회 남북청년 체육대회 개회', NULL, 1),
(2022, '10', 'QT', '시편 통독', NULL, 2),
(2022, '10', '행사', '박해민, 김재현, 정대한 침례식', NULL, 3),
(2022, '10', '행사', '[예수님의 십자가를 생각하며] 싸이클 여행 서울-양평', NULL, 4),
(2022, '09', '행사', '캠핑&풋살&바베큐 행사 개최', NULL, 5),
(2022, '09', '행사', '박성재 선교사님 간증 예배', NULL, 6),
(2022, '08', '행사', '일상 회복 및 누림을 위한 낚시 교제', NULL, 7),
(2022, '07', 'QT', '사도바울 서신서 통독', NULL, 8),
(2022, '04', '행사', '일상 회복 및 누림이 있는 낚시 교제', NULL, 9),
(2022, '02', '봉사', '사랑의 연탄 봉사활동', NULL, 10),
(2022, '상시', '기타', '신흥재정학교 재정교육 실시', NULL, 11),
(2022, '상시', '행사', '매주 기도모임', NULL, 12),
(2022, '상시', '행사', 'NKFC 남북청년 축구팀 운영', NULL, 13),
(2021, '07', '행사', '[예수님의 십자가를 생각하며] 싸이클 국토종주 서울-문경', NULL, 1),
(2021, '06', '행사', '[예수님의 십자가를 생각하며] 싸이클 국토종주 서울-춘천', NULL, 2),
(2021, '04', '행사', '코로나 극복을 위한 낚시 교제', NULL, 3),
(2021, '02', '봉사', '사랑의 연탄 봉사활동', NULL, 4),
(2021, '상시', '기타', '신흥재정학교 재정교육 실시', NULL, 5),
(2021, '상시', '행사', '매주 기도모임', NULL, 6),
(2021, '상시', '행사', 'NKFC 남북청년 축구팀 운영', NULL, 7),
(2020, '11', '행사', '컴패션 버추얼 런(10km, 20km) 마라톤 실시', NULL, 1),
(2020, '10', '행사', '코로나 극복을 위한 낚시 교제', NULL, 2),
(2020, '03', '행사', '코로나 극복을 위한 온라인 NKFC Mission 챌린지', NULL, 3),
(2020, '02', '기타', 'NKFC Mission 단장 임명식', NULL, 4),
(2020, '01', '봉사', '사랑의 연탄 봉사활동', NULL, 5),
(2020, '상시', '행사', '매주 기도모임', NULL, 6),
(2020, '상시', '행사', 'NKFC 남북청년 축구팀 운영', NULL, 7),
(2019, '09', '행사', '제3회 남북 청년 연합 풋살대회 "THE ONE" 개최', NULL, 1),
(2019, '상시', '봉사', '사랑의 연탄 봉사활동', NULL, 2),
(2019, '상시', '행사', '매주 기도모임', NULL, 3),
(2019, '상시', '행사', 'NKFC 남북청년 축구팀 운영', NULL, 4),
(2018, '12', '행사', '제3회 남북청년 체육대회 개회', NULL, 1),
(2018, '10', '행사', '제2회 남북 청년 연합 풋살대회 "THE ONE" 개최', NULL, 2),
(2018, '상시', '기타', '축구를 좋아하는 새로운 새터민 청년들과 만남 그리고 연합', '정대한, 김강유, 임평 등. 조 여호수아 선교사는 김재현 간사, 새터민 청년 멤버와 함께 기도 중 스포츠 선교의 비전을 소망하며 NKFC M 시작', 3),
(2018, '상시', '행사', '매주 기도모임', NULL, 4),
(2018, '상시', '행사', 'NKFC 남북청년 축구팀 운영', NULL, 5),
(2017, '12', '행사', '제2회 남북청년 체육대회 개회', NULL, 1),
(2017, '09', '행사', '제1회 남북 청년 연합 풋살대회 "THE ONE" 개최', NULL, 2),
(2017, '상시', '행사', '매주 기도모임', NULL, 3),
(2015, '상시', '기타', '남한 청년 중심으로 구성된 선교동아리(오지랖)과 연합', NULL, 1),
(2015, '상시', '기타', '무료영어 교실로 알게 된 탈북청년들과 오지랖 모임의 남한 청년들과의 기도 모임과 교제 시작', NULL, 2),
(2015, '상시', '행사', '1회 남북 청년 체육대회 개최', NULL, 3),
(2011, '상시', '기타', '기독교한국침례회 해외 선교회(FMB) 소속으로 국내 탈북민 선교사역 시작함', NULL, 1),
(2011, '상시', '기타', '새터민 맞춤용 무료 영어교실 오픈', NULL, 2),
(2011, '상시', '전도', '복음 증거 및 구제 활동', NULL, 3),
(2010, '상시', '기타', '조 여호수아 선교사 미국(주님의 기쁨교회)에서 북한 선교사로 파송', NULL, 1);

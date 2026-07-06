import { Card } from "@/components/Card";

const HISTORY_DATA = [
  {
    year: 2026,
    months: [
      { month: "05", title: "[3331 생명의 QT] 빌립보서", category: "QT" },
      { month: "05", title: "[3331 생명의 QT] 골로새서", category: "QT" },
      { month: "04", title: "[3331 생명의 QT] 에베소서", category: "QT" },
      { month: "04", title: "[3331 생명의 QT] 갈라디아서", category: "QT" },
      { month: "03", title: "리더십 캠프", category: "캠프" },
      { month: "03", title: "[3331 생명의 QT] 고린도후서", category: "QT" },
      { month: "03", title: "[3331 생명의 QT] 고린도전서", category: "QT" },
      { month: "02", title: "사랑의 연탄 봉사활동", category: "봉사" },
      { month: "01", title: "[3331 생명의 QT] 고린도전서", category: "QT" },
      { month: "상시", title: "매주 마포대교, 한강대교 노방전도", category: "전도" },
      { month: "상시", title: "매주 기도모임", category: "행사" }
    ]
  },
  {
    year: 2025,
    months: [
      { month: "12", title: "[3331 생명의 QT] 로마서", category: "QT" },
      { month: "11", title: "석OO 감독 독립영화 초연 시사회", category: "행사" },
      { month: "09", title: "[3331 생명의 QT] 사도행전", category: "QT" },
      { month: "09", title: "[3331 생명의 QT] 사도행전", category: "QT" },
      { month: "05", title: "일본 전도와 여행", category: "전도" },
      { month: "05", title: "[3331 생명의 QT] 누가복음", category: "QT" },
      { month: "01", title: "사랑의 연탄 봉사활동", category: "봉사" },
      { month: "01", title: "[3331 생명의 QT] 출애굽기", category: "QT" },
      { month: "상시", title: "매주 마포대교, 한강대교 노방전도", category: "전도" },
      { month: "상시", title: "매주 기도모임", category: "행사" },
      { month: "상시", title: "NKFC 남북청년 축구팀 운영", category: "행사" }
    ]
  },
  {
    year: 2024,
    months: [
      { month: "12", title: "제6회 남북청년 체육대회 개회(등산)", category: "행사" },
      { month: "08", title: "[3331 생명의 QT] 창세기", category: "QT" },
      { month: "07", title: "리더십 캠프", category: "캠프" },
      { month: "06", title: "[3331 생명의 QT] 요한일서, 요한이서, 요한삼서, 요한계시록", category: "QT" },
      { month: "05", title: "[3331 생명의 QT] 야고보서, 베드로전서, 베드로후서", category: "QT" },
      { month: "04", title: "캠핑&풋살&바베큐 행사 개최", category: "행사" },
      { month: "04", title: "[3331 생명의 QT] 빌레몬서, 히브리서", category: "QT" },
      { month: "03", title: "[3331 생명의 QT] 데살로니가후서, 디모데전서, 디모데후서, 디도서", category: "QT" },
      { month: "02", title: "[3331 생명의 QT] 빌립보서, 골로새서, 데살로니가전서", category: "QT" },
      { month: "01", title: "일상 회복 및 누림을 위한 남북청년 낚시 교제", category: "행사" },
      { month: "01", title: "사랑의 연탄 봉사활동", category: "봉사" },
      { month: "01", title: "[3331 생명의 QT] 갈라디아서, 에베소서", category: "QT" },
      { month: "상시", title: "매주 기도모임", category: "행사" },
      { month: "상시", title: "매일 마포대교, 한강대교 노방전도", category: "전도" },
      { month: "상시", title: "NKFC 남북청년 축구팀 운영", category: "행사" }
    ]
  },
  {
    year: 2023,
    months: [
      { month: "12", title: "제5회 남북청년 체육대회 개회", category: "행사" },
      { month: "12", title: "[3331 생명의 QT] 고린도후서", category: "QT" },
      { month: "10", title: "일상 회복 및 누림을 위한 남북청년 낚시 교제", category: "행사" },
      { month: "10", title: "[3331 생명의 QT] 고린도전서", category: "QT" },
      { month: "09", title: "캠핑&풋살&바베큐 행사 개최", category: "행사" },
      { month: "09", title: "[3331 생명의 QT] 로마서", category: "QT" },
      { month: "06", title: "[3331 생명의 QT] 사도행전", category: "QT" },
      { month: "05", title: "캠핑&풋살&바베큐 행사 개최", category: "행사" },
      { month: "03", title: "[3331 생명의 QT] 요한복음", category: "QT" },
      { month: "상시", title: "매주 기도모임", category: "행사" },
      { month: "상시", title: "매일 마포대교 노방전도", category: "전도" },
      { month: "상시", title: "NKFC 남북청년 축구팀 운영", category: "행사" }
    ]
  },
  {
    year: 2022,
    months: [
      { month: "12", title: "제4회 남북청년 체육대회 개회", category: "행사" },
      { month: "10", title: "시편 통독", "category": "QT" },
      { month: "10", title: "박해민, 김재현, 정대한 침례식", category: "행사" },
      { month: "10", title: "[예수님의 십자가를 생각하며] 싸이클 여행 서울-양평", category: "행사" },
      { month: "09", title: "캠핑&풋살&바베큐 행사 개최", category: "행사" },
      { month: "09", title: "박성재 선교사님 간증 예배", category: "행사" },
      { month: "08", title: "일상 회복 및 누림을 위한 낚시 교제", category: "행사" },
      { month: "07", title: "사도바울 서신서 통독", category: "QT" },
      { month: "04", title: "일상 회복 및 누림이 있는 낚시 교제", category: "행사" },
      { month: "02", title: "사랑의 연탄 봉사활동", category: "봉사" },
      { month: "상시", title: "신흥재정학교 재정교육 실시", category: "기타" },
      { month: "상시", title: "매주 기도모임", category: "행사" },
      { month: "상시", title: "NKFC 남북청년 축구팀 운영", category: "행사" }
    ]
  },
  {
    year: 2021,
    months: [
      { month: "07", title: "[예수님의 십자가를 생각하며] 싸이클 국토종주 서울-문경", category: "행사" },
      { month: "06", title: "[예수님의 십자가를 생각하며] 싸이클 국토종주 서울-춘천", category: "행사" },
      { month: "04", title: "코로나 극복을 위한 낚시 교제", category: "행사" },
      { month: "02", title: "사랑의 연탄 봉사활동", category: "봉사" },
      { month: "상시", title: "신흥재정학교 재정교육 실시", category: "기타" },
      { month: "상시", title: "매주 기도모임", category: "행사" },
      { month: "상시", title: "NKFC 남북청년 축구팀 운영", category: "행사" }
    ]
  },
  {
    year: 2020,
    months: [
      { month: "11", title: "컴패션 버추얼 런(10km, 20km) 마라톤 실시", category: "행사" },
      { month: "10", title: "코로나 극복을 위한 낚시 교제", category: "행사" },
      { month: "03", title: "코로나 극복을 위한 온라인 NKFC Mission 챌린지", category: "행사" },
      { month: "02", title: "NKFC Mission 단장 임명식", category: "기타" },
      { month: "01", title: "사랑의 연탄 봉사활동", category: "봉사" },
      { month: "상시", title: "매주 기도모임", category: "행사" },
      { month: "상시", title: "NKFC 남북청년 축구팀 운영", category: "행사" }
    ]
  },
  {
    year: 2019,
    months: [
      { month: "09", title: "제3회 남북 청년 연합 풋살대회 \"THE ONE\" 개최", category: "행사" },
      { month: "상시", title: "사랑의 연탄 봉사활동", category: "봉사" },
      { month: "상시", title: "매주 기도모임", category: "행사" },
      { month: "상시", title: "NKFC 남북청년 축구팀 운영", category: "행사" }
    ]
  },
  {
    year: 2018,
    months: [
      { month: "12", title: "제3회 남북청년 체육대회 개회", category: "행사" },
      { month: "10", title: "제2회 남북 청년 연합 풋살대회 \"THE ONE\" 개최", category: "행사" },
      { month: "상시", title: "축구를 좋아하는 새로운 새터민 청년들과 만남 그리고 연합", content: "정대한, 김강유, 임평 등. 조 여호수아 선교사는 김재현 간사, 새터민 청년 멤버와 함께 기도 중 스포츠 선교의 비전을 소망하며 NKFC M 시작", category: "기타" },
      { month: "상시", title: "매주 기도모임", category: "행사" },
      { month: "상시", title: "NKFC 남북청년 축구팀 운영", category: "행사" }
    ]
  },
  {
    year: 2017,
    months: [
      { month: "12", title: "제2회 남북청년 체육대회 개회", category: "행사" },
      { month: "09", title: "제1회 남북 청년 연합 풋살대회 \"THE ONE\" 개최", category: "행사" },
      { month: "상시", title: "매주 기도모임", category: "행사" }
    ]
  },
  {
    year: 2015,
    months: [
      { month: "상시", title: "남한 청년 중심으로 구성된 선교동아리(오지랖)과 연합", category: "기타" },
      { month: "상시", title: "무료영어 교실로 알게 된 탈북청년들과 오지랖 모임의 남한 청년들과의 기도 모임과 교제 시작", category: "기타" },
      { month: "상시", title: "1회 남북 청년 체육대회 개최", category: "행사" }
    ]
  },
  {
    year: 2011,
    months: [
      { month: "상시", title: "기독교한국침례회 해외 선교회(FMB) 소속으로 국내 탈북민 선교사역 시작함", category: "기타" },
      { month: "상시", title: "새터민 맞춤용 무료 영어교실 오픈", category: "기타" },
      { month: "상시", title: "복음 증거 및 구제 활동", category: "전도" }
    ]
  },
  {
    year: 2010,
    months: [
      { month: "상시", title: "조 여호수아 선교사 미국(주님의 기쁨교회)에서 북한 선교사로 파송", category: "기타" }
    ]
  }
];

const CATEGORY_COLORS: Record<string, string> = {
  "QT": "bg-pine-green/10 text-pine-green",
  "봉사": "bg-terracotta/10 text-terracotta",
  "전도": "bg-deep-navy/10 text-deep-navy",
  "행사": "bg-ink-2/10 text-ink-2",
  "캠프": "bg-warm-sand text-deep-navy",
  "기타": "bg-line-gray/30 text-ink",
};

export default function HistoryPage() {
  const years = HISTORY_DATA.map(d => d.year);

  return (
    <div className="flex flex-col w-full pb-24 bg-paper-cream min-h-screen">
      {/* 헤더 영역 */}
      <section className="pt-24 pb-16 px-5 text-center">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-deep-navy mb-6">연혁</h1>
        <p className="text-ink-2 text-lg max-w-2xl mx-auto leading-relaxed">
          2010년부터 이어온 남북청년연합선교회의 발자취입니다.
        </p>
      </section>

      <div className="mx-auto max-w-[1200px] w-full px-5 flex flex-col md:flex-row gap-12 relative items-start">
        
        {/* 메인 타임라인 콘텐츠 */}
        <div className="flex-1 max-w-[800px] mx-auto md:mx-0">
          <div className="space-y-24">
            {HISTORY_DATA.map((yearData) => (
              <section key={yearData.year} id={`year-${yearData.year}`} className="scroll-mt-32">
                <h2 className="font-serif font-bold text-5xl sm:text-[80px] text-deep-navy/10 mb-12 border-b border-line-gray pb-2 leading-none">
                  {yearData.year}
                </h2>
                <div className="space-y-12">
                  {yearData.months.map((item, idx) => (
                    <div key={idx} className="flex gap-4 sm:gap-8 group">
                      {/* 타임라인 라인 */}
                      <div className="flex flex-col items-center min-w-[40px] sm:min-w-[60px] pt-1">
                        <span className="font-bold text-lg sm:text-2xl text-terracotta">{item.month}</span>
                        <div className="w-[1px] h-full bg-line-gray group-hover:bg-deep-navy/30 transition-colors mt-4"></div>
                      </div>
                      
                      {/* 카드 내용 */}
                      <Card className="flex-1 hover:border-deep-navy/30 transition-colors !p-6 sm:!p-8">
                        <span className={`inline-block px-2.5 py-1 text-[13px] font-bold rounded mb-4 ${CATEGORY_COLORS[item.category] || CATEGORY_COLORS["기타"]}`}>
                          {item.category}
                        </span>
                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-deep-navy mb-3 break-keep">{item.title}</h3>
                        {item.content && (
                          <p className="text-ink-2 leading-relaxed text-[15px] sm:text-[16px] break-keep">{item.content}</p>
                        )}
                      </Card>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* 우측 사이드바 (연도 앵커) */}
        <div className="hidden md:block sticky top-32 w-24 shrink-0 pt-4">
          <span className="block text-xs font-bold text-ink-2 tracking-widest mb-6">YEAR</span>
          <ul className="space-y-4">
            {years.map(year => (
              <li key={year}>
                <a href={`#year-${year}`} className="text-xl font-serif font-bold text-ink-2/40 hover:text-deep-navy transition-colors">
                  {year}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

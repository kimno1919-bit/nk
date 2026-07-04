import { Card } from "@/components/Card";

const HISTORY_DATA = [
  {
    year: 2026,
    months: [
      {
        month: "07",
        title: "남북청년연합선교회 홈페이지 리뉴얼 론칭",
        category: "행사",
        content: "새로운 사역 프레임(돌봄·양육·일꾼 세우기)에 맞춘 홈페이지 론칭",
      },
      {
        month: "05",
        title: "남북청년 연합 체육대회",
        category: "행사",
        content: "사당동 인근 체육관에서 50명의 청년들이 모여 친교의 시간을 가졌습니다.",
      }
    ]
  },
  {
    year: 2025,
    months: [
      {
        month: "12",
        title: "겨울 연탄 나눔 봉사",
        category: "봉사",
        content: "어려운 이웃을 위해 남북 청년들이 함께 연탄 2,000장을 배달했습니다.",
      },
      {
        month: "상시",
        title: "한강대교 노방전도",
        category: "전도",
        content: "매주 토요일, 한강대교에서 복음을 전합니다.",
      }
    ]
  },
  {
    year: 2018,
    months: [
      {
        month: "01",
        title: "남북청년연합선교회 정식 출범",
        category: "행사",
        content: "2015년부터 시작된 남북청년 연합 모임이 정식 단체로 출범했습니다.",
      }
    ]
  },
  {
    year: 2010,
    months: [
      {
        month: "01",
        title: "조여호수아 선교사 파송",
        category: "기타",
        content: "기독교한국침례회 해외선교회(FMB) 소속 선교사로 파송되었습니다.",
      }
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

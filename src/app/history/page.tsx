import { Card } from "@/components/Card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/Button";

const CATEGORY_COLORS: Record<string, string> = {
  "QT": "bg-pine-green/10 text-pine-green",
  "봉사": "bg-terracotta/10 text-terracotta",
  "전도": "bg-deep-navy/10 text-deep-navy",
  "행사": "bg-ink-2/10 text-ink-2",
  "캠프": "bg-warm-sand text-deep-navy",
  "기타": "bg-line-gray/30 text-ink",
};

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: histories } = await supabase
    .from("histories")
    .select("*")
    .order("year", { ascending: false })
    .order("sort_order", { ascending: true });

  const groupedHistories: Record<number, any[]> = {};
  if (histories) {
    histories.forEach((h) => {
      if (!groupedHistories[h.year]) {
        groupedHistories[h.year] = [];
      }
      groupedHistories[h.year].push(h);
    });
  }

  const years = Object.keys(groupedHistories).map(Number).sort((a, b) => b - a);

  return (
    <div className="flex flex-col w-full pb-24 bg-paper-cream min-h-screen">
      <section className="pt-24 pb-16 px-5 text-center">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-deep-navy mb-6">연혁</h1>
        <p className="text-ink-2 text-lg max-w-2xl mx-auto leading-relaxed">
          2010년부터 이어온 남북청년연합선교회의 발자취입니다.
        </p>
      </section>

      <div className="mx-auto max-w-[1200px] w-full px-5 flex flex-col md:flex-row gap-12 relative items-start">
        
        <div className="flex-1 max-w-[800px] mx-auto md:mx-0 w-full">
          <div className="flex justify-end mb-6">
            <Link href="/admin/history/write">
              <Button variant="secondary" className="!px-6">관리자 글쓰기</Button>
            </Link>
          </div>
          {/* 모바일 전용 Sticky 연도 내비게이션 */}
          <div className="md:hidden sticky top-16 z-20 bg-paper-cream/90 backdrop-blur-md border-b border-line-gray py-3 px-2 -mx-5 mb-8 flex gap-6 overflow-x-auto">
            {years.map(year => (
              <a key={year} href={`#year-${year}`} className="font-serif font-bold text-lg text-ink-2 hover:text-deep-navy shrink-0 transition-colors">
                {year}
              </a>
            ))}
          </div>

          <div className="space-y-24">
            {years.map((year) => (
              <section key={year} id={`year-${year}`} className="scroll-mt-32">
                <h2 className="font-serif font-bold text-5xl sm:text-[80px] text-deep-navy/10 mb-12 border-b border-line-gray pb-2 leading-none">
                  {year}
                </h2>
                <div className="space-y-12">
                  {groupedHistories[year].map((item, idx) => (
                    <div key={idx} className="flex gap-4 sm:gap-8 group">
                      <div className="flex flex-col items-center min-w-[40px] sm:min-w-[60px] pt-1">
                        <span className="font-bold text-lg sm:text-2xl text-terracotta">{item.month}</span>
                        <div className="w-[1px] h-full bg-line-gray group-hover:bg-deep-navy/30 transition-colors mt-4"></div>
                      </div>
                      
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

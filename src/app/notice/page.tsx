import Link from "next/link";
import { Button } from "@/components/Button";
import { createClient } from "@/utils/supabase/server";

export default async function NoticePage() {
  const supabase = await createClient();
  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col w-full pb-24 min-h-screen bg-paper-cream">
      <section className="pt-24 pb-16 px-5 text-center">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-deep-navy mb-6">공지사항</h1>
        <p className="text-ink-2 text-lg max-w-2xl mx-auto leading-relaxed">
          남북청년연합선교회의 새로운 소식과 주요 일정을 확인하세요.
        </p>
      </section>

      <div className="mx-auto max-w-[1200px] w-full px-5 mt-8 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* 좌측: 게시판 (모바일 상단) */}
        <div className="flex-[1.15] w-full bg-white rounded-xl border border-line-gray overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between border-b border-line-gray bg-warm-sand/30 pr-4">
            <div className="flex">
              <button className="px-6 py-4 font-bold text-deep-navy border-b-2 border-deep-navy text-[15px]">전체</button>
              <button className="px-6 py-4 font-bold text-ink-2 hover:text-deep-navy transition-colors text-[15px]">공지</button>
              <button className="px-6 py-4 font-bold text-ink-2 hover:text-deep-navy transition-colors text-[15px]">행사</button>
            </div>
            <Link href="/admin/notice/write">
              <Button variant="primary" className="!py-1.5 !px-4 !text-sm">관리자 글쓰기</Button>
            </Link>
          </div>
          <div className="divide-y divide-line-gray">
            {notices && notices.length > 0 ? (
              notices.map((item) => (
                <div key={item.id} className="p-6 hover:bg-paper-cream/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 text-[12px] font-bold rounded ${item.category === '공지' ? 'bg-terracotta/10 text-terracotta' : 'bg-deep-navy/10 text-deep-navy'}`}>
                      {item.category}
                    </span>
                    <span className="text-[13px] text-ink-2">{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold text-[17px] text-ink group-hover:text-deep-navy transition-colors">{item.title}</h3>
                  {item.content && <p className="mt-2 text-sm text-ink-2 line-clamp-2">{item.content}</p>}
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-ink-2">등록된 게시글이 없습니다.</div>
            )}
          </div>
        </div>

        {/* 우측: 캘린더 (모바일 하단) */}
        <div className="flex-1 w-full bg-white rounded-xl border border-line-gray p-6 sm:p-8">
          <h2 className="font-serif font-bold text-2xl text-deep-navy mb-6">주요 일정</h2>
          
          <div className="flex items-center justify-between mb-6">
            <button className="text-ink-2 hover:text-deep-navy font-bold">&larr;</button>
            <span className="font-bold text-lg text-ink">2026년 7월</span>
            <button className="text-ink-2 hover:text-deep-navy font-bold">&rarr;</button>
          </div>
          
          {/* 캘린더 그리드 임시 UI */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
            <span className="text-terracotta font-bold py-2">일</span>
            <span className="font-bold py-2">월</span>
            <span className="font-bold py-2">화</span>
            <span className="font-bold py-2">수</span>
            <span className="font-bold py-2">목</span>
            <span className="font-bold py-2">금</span>
            <span className="font-bold py-2">토</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {Array.from({length: 31}).map((_, i) => (
              <div key={i} className="aspect-square flex flex-col items-center justify-start pt-2 border border-line-gray/20 rounded hover:bg-paper-cream cursor-pointer relative">
                <span className={i === 0 ? "text-terracotta font-bold" : "text-ink-2"}>{i + 1}</span>
                {i % 7 === 3 && <span className="w-1.5 h-1.5 rounded-full bg-deep-navy mt-1"></span>}
                {i === 15 && <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1"></span>}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-line-gray">
            <h3 className="font-bold text-[15px] mb-4 text-ink">정기 모임</h3>
            <ul className="space-y-3 text-[14px]">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-deep-navy"></span>수요일 19:30 - 수요 기도모임</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-terracotta"></span>토요일 14:00 - 한강대교 전도</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { createClient } from "@/utils/supabase/client";

export default function NoticePage() {
  const supabase = createClient();
  
  // 상태 관리
  const [notices, setNotices] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("전체");
  const [currentDate, setCurrentDate] = useState(new Date());

  // 데이터 불러오기
  useEffect(() => {
    const fetchNotices = async () => {
      let query = supabase.from("notices").select("*").eq("is_public", true).order("created_at", { ascending: false });
      if (activeTab !== "전체") {
        query = query.eq("category", activeTab);
      }
      const { data } = await query;
      if (data) setNotices(data);
    };

    const fetchSchedules = async () => {
      // 캘린더에 표시하기 위해 전체 일정을 가져오거나 현재 달만 가져올 수 있음 (여기선 단순화를 위해 전체 호출)
      const { data } = await supabase.from("schedules").select("*").eq("is_public", true).order("date", { ascending: true });
      if (data) setSchedules(data);
    };

    fetchNotices();
    fetchSchedules();
  }, [activeTab, supabase]);

  // 캘린더 로직
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 현재 달의 일정 필터링
  const currentMonthSchedules = schedules.filter(s => {
    const d = new Date(s.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

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
              {['전체', '공지', '행사'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-bold text-[15px] transition-colors ${activeTab === tab ? 'text-deep-navy border-b-2 border-deep-navy' : 'text-ink-2 hover:text-deep-navy'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Link href="/admin/notice/write">
              <Button variant="primary" className="!py-1.5 !px-4 !text-sm">관리자 글쓰기</Button>
            </Link>
          </div>
          <div className="divide-y divide-line-gray min-h-[300px]">
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
            <button onClick={prevMonth} className="text-ink-2 hover:text-deep-navy font-bold p-2">&larr;</button>
            <span className="font-bold text-lg text-ink">{year}년 {month + 1}월</span>
            <button onClick={nextMonth} className="text-ink-2 hover:text-deep-navy font-bold p-2">&rarr;</button>
          </div>
          
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
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            {days.map((day) => {
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const daySchedules = schedules.filter(s => s.date === dateStr);
              const hasRegular = daySchedules.some(s => s.category === '정기모임');
              const hasEvent = daySchedules.some(s => s.category === '행사');
              const isSunday = new Date(year, month, day).getDay() === 0;

              return (
                <div key={day} className="aspect-square flex flex-col items-center justify-start pt-2 border border-line-gray/20 rounded hover:bg-paper-cream cursor-pointer relative">
                  <span className={isSunday ? "text-terracotta font-bold" : "text-ink-2"}>{day}</span>
                  <div className="flex gap-1 mt-1">
                    {hasEvent && <span className="w-1.5 h-1.5 rounded-full bg-deep-navy"></span>}
                    {hasRegular && <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-line-gray">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[15px] text-ink">이번 달 일정</h3>
              <Link href="/admin/schedule/write" className="text-xs font-bold text-terracotta hover:underline">일정 추가</Link>
            </div>
            
            {currentMonthSchedules.length > 0 ? (
              <ul className="space-y-3 text-[14px]">
                {currentMonthSchedules.map((s) => (
                  <li key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <div className="flex items-center gap-2 w-[110px] shrink-0">
                      <span className={`w-2 h-2 rounded-full ${s.category === '정기모임' ? 'bg-terracotta' : 'bg-deep-navy'}`}></span>
                      <span className="font-bold text-ink-2">
                        {new Date(s.date).getDate()}일
                        {s.time && ` (${s.time})`}
                      </span>
                    </div>
                    <span className="text-ink">{s.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-2 text-center py-4">예정된 일정이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

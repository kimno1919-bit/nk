"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { createClient } from "@/utils/supabase/client";
import { QtComments } from "./QtComments";

const BIBLE_BOOKS = [
  "창세기", "출애굽기", "레위기", "민수기", "신명기", "여호수아", "사사기", "룻기", "사무엘상", "사무엘하", "열왕기상", "열왕기하", "역대상", "역대하", "에스라", "느헤미야", "에스더", "욥기", "시편", "잠언", "전도서", "아가", "이사야", "예레미야", "예레미야애가", "에스겔", "다니엘", "호세아", "요엘", "아모스", "오바댜", "요나", "미가", "나훔", "하박국", "스바냐", "학개", "스가랴", "말라기",
  "마태복음", "마가복음", "누가복음", "요한복음", "사도행전", "로마서", "고린도전서", "고린도후서", "갈라디아서", "에베소서", "빌립보서", "골로새서", "데살로니가전서", "데살로니가후서", "디모데전서", "디모데후서", "디도서", "빌레몬서", "히브리서", "야고보서", "베드로전서", "베드로후서", "요한일서", "요한이서", "요한삼서", "유다서", "요한계시록"
];

export default function QtPage() {
  const supabase = createClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [qts, setQts] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState("모든 성경");
  const [selectedChapter, setSelectedChapter] = useState("모든 장");
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    const fetchQts = async () => {
      const { data } = await supabase
        .from("qts")
        .select("*, qt_comments(count)")
        .eq("is_public", true)
        .order("date", { ascending: false });
      if (data) setQts(data);
    };
    fetchQts();

    // 메인 화면이나 공유된 링크로 들어왔을 때 해당 글 자동 열기
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const idParam = urlParams.get("id");
      if (idParam) {
        setExpandedId(idParam);
      }
    }
  }, [supabase]);

  const toggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      // 조회수 증가 RPC 호출
      await supabase.rpc("increment_view_count", { table_name: "qts", row_id: id });
      // 로컬 상태 즉시 업데이트
      setQts((prev) => prev.map((qt) => qt.id === id ? { ...qt, views: (qt.views || 0) + 1 } : qt));
    }
  };

  const handleLike = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // 카드 확장을 방지
    await supabase.rpc("increment_qt_like", { row_id: id });
    setQts((prev) => prev.map((qt) => qt.id === id ? { ...qt, likes: (qt.likes || 0) + 1 } : qt));
  };

  const handleShare = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/qt?id=${id}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다. 카카오톡이나 문자 메시지로 공유해보세요!");
    } catch (err) {
      alert("링크 복사에 실패했습니다.");
    }
  };

  const availableBooks = Array.from(new Set(qts.map(qt => qt.book)))
    .filter(Boolean)
    .sort((a: any, b: any) => {
      const indexA = BIBLE_BOOKS.indexOf(a);
      const indexB = BIBLE_BOOKS.indexOf(b);
      // 배열에 없는 값이면 뒤로 보냄
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  const availableChapters = Array.from(new Set(
    qts.filter(qt => qt.book === selectedBook).map(qt => qt.chapter)
  ))
    .filter(Boolean)
    .sort((a: any, b: any) => {
      const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
      const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
      return numA - numB;
    });

  const filteredQts = qts.filter(qt => {
    if (selectedBook !== "모든 성경" && qt.book !== selectedBook) return false;
    if (selectedChapter !== "모든 장" && qt.chapter !== selectedChapter) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-24 min-h-screen">
      <section className="bg-paper-cream pt-24 pb-16 px-5 text-center border-b border-line-gray">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-deep-navy mb-6">3331 생명의 QT</h1>
        <p className="text-ink-2 text-lg max-w-2xl mx-auto leading-relaxed">
          하루 10구절씩 묵상합니다.<br />
          말씀으로 삶의 기준을 세우는 경건의 훈련입니다.
        </p>
      </section>

      <div className="mx-auto max-w-[1000px] w-full px-5 mt-16">
        {/* 필터 및 글쓰기 영역 */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-line-gray">
          <div className="flex flex-wrap gap-4">
            <select 
              value={selectedBook}
              onChange={(e) => {
                setSelectedBook(e.target.value);
                setSelectedChapter("모든 장"); // 성경 변경 시 장 초기화
                setDisplayCount(10); // 필터 변경 시 표시 개수 초기화
              }}
              className="px-4 py-2 bg-white border border-line-gray rounded text-[15px] text-ink font-medium focus:outline-none focus:border-deep-navy transition-colors min-w-[120px]"
            >
              <option value="모든 성경">모든 성경</option>
              {availableBooks.map(book => (
                <option key={book} value={book}>{book}</option>
              ))}
            </select>
            
            {selectedBook !== "모든 성경" && availableChapters.length > 0 && (
              <select 
                value={selectedChapter}
                onChange={(e) => {
                  setSelectedChapter(e.target.value);
                  setDisplayCount(10);
                }}
                className="px-4 py-2 bg-white border border-line-gray rounded text-[15px] text-ink font-medium focus:outline-none focus:border-deep-navy transition-colors min-w-[100px]"
              >
                <option value="모든 장">모든 장</option>
                {availableChapters.map(chapter => (
                  <option key={chapter} value={chapter}>{chapter.includes('장') ? chapter : `${chapter}장`}</option>
                ))}
              </select>
            )}
          </div>
          <Link href="/admin/qt">
            <Button variant="secondary" className="!px-6">관리자 글쓰기</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredQts.length > 0 ? filteredQts.slice(0, displayCount).map((qt) => {
            const isExpanded = expandedId === qt.id;
            // 앞부분 100자 정도만 요약으로 보여줌
            const summary = qt.content ? qt.content.slice(0, 100) + (qt.content.length > 100 ? "..." : "") : "";
            
            return (
              <div key={qt.id} onClick={() => toggleExpand(qt.id)} className={`cursor-pointer transition-all duration-300 ${isExpanded ? 'md:col-span-2' : ''}`}>
                <Card bg="white" className="hover:border-deep-navy/40 transition-colors flex flex-col h-full !p-6 sm:!p-8 group shadow-sm hover:shadow-md">
                  <div className="flex justify-between items-center mb-5">
                    <span className="px-3 py-1 bg-pine-green/10 text-pine-green text-[13px] font-bold rounded">
                      {qt.book} {qt.chapter}
                    </span>
                    <span className="text-[13px] text-ink-2 font-medium">{qt.date}</span>
                  </div>
                  <h3 className={`font-serif font-bold text-deep-navy group-hover:text-terracotta transition-colors mb-4 ${isExpanded ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                    {qt.title}
                  </h3>
                  
                  <div className={`text-ink flex-1 whitespace-pre-wrap break-keep ${isExpanded ? 'text-[15px] sm:text-[16px] leading-loose pb-6' : 'text-[15px] leading-relaxed mb-6 line-clamp-3 text-ink-2'}`}>
                    {isExpanded ? qt.content : summary}
                  </div>

                  <div className="mt-auto pt-5 border-t border-line-gray/50 flex justify-between items-center">
                    {isExpanded ? (
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => handleLike(e, qt.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-warm-sand/50 hover:bg-terracotta/10 text-terracotta font-bold text-sm rounded-full transition-colors"
                        >
                          👍 좋아요 {qt.likes || 0}
                        </button>
                        <button 
                          onClick={(e) => handleShare(e, qt.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-pine-green/10 hover:bg-pine-green/20 text-pine-green font-bold text-sm rounded-full transition-colors"
                        >
                          🔗 공유하기
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-bold text-ink-2 group-hover:text-terracotta transition-colors flex items-center gap-1">
                          본문 읽기 ▼
                        </span>
                        <div className="flex gap-3 text-[13px] text-ink-2 font-medium">
                          <span>조회 {qt.views || 0}</span>
                          <span>👍 {qt.likes || 0}</span>
                          <span>💬 {qt.qt_comments?.[0]?.count || 0}</span>
                        </div>
                      </>
                    )}
                    {isExpanded && (
                       <span className="text-sm font-bold text-ink-2 hover:text-deep-navy transition-colors">
                         접기 ▲
                       </span>
                    )}
                  </div>
                  {isExpanded && (
                    <div onClick={(e) => e.stopPropagation()} className="cursor-auto">
                      <QtComments qtId={qt.id} />
                    </div>
                  )}
                </Card>
              </div>
            );
          }) : (
            <div className="col-span-full py-20 text-center text-ink-2 text-lg">
              선택하신 성경 본문에 해당하는 묵상 글이 없습니다.
            </div>
          )}
        </div>

        {/* 더보기 버튼 */}
        {filteredQts.length > displayCount && (
          <div className="mt-12 flex justify-center">
            <Button 
              variant="secondary" 
              className="!px-12 !py-4 font-bold text-lg shadow-sm hover:shadow-md transition-all"
              onClick={() => setDisplayCount(prev => prev + 10)}
            >
              더보기 ▼
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

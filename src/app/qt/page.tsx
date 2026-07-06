"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

const QT_DATA = [
  {
    id: "2026-05-13-philippians-1",
    date: "2026-05-13",
    book: "빌립보서",
    chapter: "1장",
    title: "바울의 기도와 복음의 진전",
    summary: "내가 너희를 생각할 때마다 나의 하나님께 감사하며 간구할 때마다 너희 무리를 위하여 기쁨으로 항상 간구함은...",
    content: "내가 너희를 생각할 때마다 나의 하나님께 감사하며\n간구할 때마다 너희 무리를 위하여 기쁨으로 항상 간구함은\n너희가 첫날부터 이제까지 복음을 위한 일에 참여하고 있기 때문이라\n너희 안에서 착한 일을 시작하신 이가 그리스도 예수의 날까지 이루실 줄을 우리는 확신하노라\n\n(빌립보서 1장 3절~6절)"
  },
  {
    id: "2026-05-12-ephesians-6",
    date: "2026-05-12",
    book: "에베소서",
    chapter: "6장",
    title: "하나님의 전신 갑주를 입으라",
    summary: "끝으로 너희가 주 안에서와 그 힘의 능력으로 강건하여지고 마귀의 간계를 능히 대적하기 위하여...",
    content: "끝으로 너희가 주 안에서와 그 힘의 능력으로 강건하여지고\n마귀의 간계를 능히 대적하기 위하여 하나님의 전신 갑주를 입으라\n우리의 씨름은 혈과 육을 상대하는 것이 아니요 통치자들과 권세들과 이 어둠의 세상 주관자들과 하늘에 있는 악의 영들을 상대함이라\n그러므로 하나님의 전신 갑주를 취하라 이는 악한 날에 너희가 능히 대적하고 모든 일을 행한 후에 서기 위함이라\n\n(에베소서 6장 10절~13절)"
  },
  {
    id: "2026-05-11-ephesians-5",
    date: "2026-05-11",
    book: "에베소서",
    chapter: "5장",
    title: "빛의 자녀들처럼 행하라",
    summary: "그러므로 사랑을 받는 자녀 같이 너희는 하나님을 본받는 자가 되고 그리스도께서 너희를 사랑하신 것 같이...",
    content: "그러므로 사랑을 받는 자녀 같이 너희는 하나님을 본받는 자가 되고\n그리스도께서 너희를 사랑하신 것 같이 너희도 사랑 가운데서 행하라 그는 우리를 위하여 자신을 버리사 향기로운 제물과 희생제물로 하나님께 드리셨느니라\n\n(에베소서 5장 1절~2절)"
  }
];

export default function QtPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

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
          <div className="flex gap-4">
            <select className="px-4 py-2 bg-white border border-line-gray rounded text-sm text-ink font-medium focus:outline-none focus:border-deep-navy transition-colors">
              <option>모든 성경</option>
              <option>창세기</option>
              <option>마태복음</option>
              <option>에베소서</option>
              <option>빌립보서</option>
            </select>
            <select className="px-4 py-2 bg-white border border-line-gray rounded text-sm text-ink font-medium focus:outline-none focus:border-deep-navy transition-colors">
              <option>2026년</option>
              <option>2025년</option>
            </select>
          </div>
          <Link href="/qt/write" onClick={(e) => {
            if(!confirm('글쓰기는 관리자만 가능합니다. 계속하시겠습니까?')) {
              e.preventDefault();
            }
          }}>
            <Button variant="secondary" className="!px-6">글쓰기</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QT_DATA.map((qt) => {
            const isExpanded = expandedId === qt.id;
            return (
              <div key={qt.id} onClick={() => toggleExpand(qt.id)} className="cursor-pointer">
                <Card bg="white" className="hover:border-deep-navy/40 transition-colors flex flex-col h-full !p-6 group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-2.5 py-1 bg-pine-green/10 text-pine-green text-[12px] font-bold rounded">{qt.book} {qt.chapter}</span>
                    <span className="text-[13px] text-ink-2 font-medium">{qt.date}</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-deep-navy mb-3 group-hover:text-terracotta transition-colors">{qt.title}</h3>
                  <div className="text-ink-2 text-[15px] leading-relaxed mb-6 flex-1 whitespace-pre-wrap">
                    {isExpanded ? qt.content : qt.summary}
                  </div>
                  <span className="text-sm font-bold text-ink-2 group-hover:text-terracotta transition-colors flex items-center gap-1 mt-auto pt-4 border-t border-line-gray/50">
                    {isExpanded ? "접기 ▲" : "본문 읽기 ▼"}
                  </span>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { Card } from "@/components/Card";
import Link from "next/link";

const QT_DATA = [
  {
    id: "2026-05-13-philippians-1",
    date: "2026-05-13",
    book: "빌립보서",
    chapter: "1장",
    title: "바울의 기도와 복음의 진전",
    summary: "내가 너희를 생각할 때마다 나의 하나님께 감사하며 간구할 때마다 너희 무리를 위하여 기쁨으로 항상 간구함은...",
  },
  {
    id: "2026-05-12-ephesians-6",
    date: "2026-05-12",
    book: "에베소서",
    chapter: "6장",
    title: "하나님의 전신 갑주를 입으라",
    summary: "끝으로 너희가 주 안에서와 그 힘의 능력으로 강건하여지고 마귀의 간계를 능히 대적하기 위하여...",
  },
  {
    id: "2026-05-11-ephesians-5",
    date: "2026-05-11",
    book: "에베소서",
    chapter: "5장",
    title: "빛의 자녀들처럼 행하라",
    summary: "그러므로 사랑을 받는 자녀 같이 너희는 하나님을 본받는 자가 되고 그리스도께서 너희를 사랑하신 것 같이...",
  }
];

export default function QtPage() {
  return (
    <div className="flex flex-col w-full pb-24 min-h-screen">
      <section className="bg-paper-cream pt-24 pb-16 px-5 text-center border-b border-line-gray">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-deep-navy mb-6">3331 생명의 QT</h1>
        <p className="text-ink-2 text-lg max-w-2xl mx-auto leading-relaxed">
          하루 3장씩 3번 반복, 1장 필사.<br />
          말씀으로 삶의 기준을 세우는 경건의 훈련입니다.
        </p>
      </section>

      <div className="mx-auto max-w-[1000px] w-full px-5 mt-16">
        {/* 필터 임시 UI */}
        <div className="flex flex-wrap gap-4 mb-10 pb-6 border-b border-line-gray">
          <select className="px-4 py-2 bg-white border border-line-gray rounded text-sm text-ink font-medium focus:outline-none focus:border-deep-navy">
            <option>모든 성경</option>
            <option>창세기</option>
            <option>마태복음</option>
            <option>에베소서</option>
            <option>빌립보서</option>
          </select>
          <select className="px-4 py-2 bg-white border border-line-gray rounded text-sm text-ink font-medium focus:outline-none focus:border-deep-navy">
            <option>2026년</option>
            <option>2025년</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {QT_DATA.map((qt) => (
            <Card key={qt.id} bg="white" className="hover:border-deep-navy/40 transition-colors flex flex-col h-full !p-6 group cursor-pointer">
              <div className="flex justify-between items-center mb-4">
                <span className="px-2.5 py-1 bg-pine-green/10 text-pine-green text-[12px] font-bold rounded">{qt.book} {qt.chapter}</span>
                <span className="text-[13px] text-ink-2 font-medium">{qt.date}</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-deep-navy mb-3 group-hover:text-terracotta transition-colors">{qt.title}</h3>
              <p className="text-ink-2 text-[15px] leading-relaxed line-clamp-3 mb-6 flex-1">
                {qt.summary}
              </p>
              <span className="text-sm font-bold text-ink-2 group-hover:text-terracotta transition-colors flex items-center gap-1">
                본문 읽기 <span aria-hidden="true">&rarr;</span>
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

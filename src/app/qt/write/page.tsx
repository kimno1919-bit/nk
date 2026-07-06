"use client";
import { Button } from "@/components/Button";
import { useState } from "react";

export default function QtWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [book, setBook] = useState("창세기");
  const [chapter, setChapter] = useState("1장");

  return (
    <div className="flex flex-col w-full pb-24 min-h-screen bg-paper-cream">
      <section className="pt-24 pb-16 px-5 text-center border-b border-line-gray bg-white">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-deep-navy mb-4">QT 묵상 작성</h1>
        <p className="text-ink-2 text-lg">오늘 주신 말씀을 묵상하고 기록합니다.</p>
      </section>

      <div className="mx-auto max-w-[800px] w-full px-5 mt-12">
        <div className="bg-white p-8 rounded-xl border border-line-gray shadow-sm">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold text-ink mb-2">성경</label>
                <select 
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
                  className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
                >
                  <option>창세기</option>
                  <option>시편</option>
                  <option>마태복음</option>
                  <option>에베소서</option>
                  <option>빌립보서</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-ink mb-2">장</label>
                <input 
                  type="text" 
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="예: 1장"
                  className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-2">묵상 제목</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="묵상한 내용의 핵심 주제를 적어주세요."
                className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-2">묵상 내용 (본문 및 적용)</label>
              <textarea 
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="하루 3장씩 3번 반복, 1장 필사하며 깨달은 바를 자유롭게 작성해주세요."
                className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors resize-none"
              ></textarea>
            </div>
            
            <div className="pt-4 flex justify-end gap-3">
              <Button variant="tertiary" onClick={() => window.history.back()}>취소</Button>
              <Button variant="primary" onClick={() => alert("저장 기능은 백엔드 연동 후 활성화됩니다.")}>저장하기</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

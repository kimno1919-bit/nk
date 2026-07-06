"use client";
import { Button } from "@/components/Button";
import { useState } from "react";

export default function NoticeWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("공지");

  return (
    <div className="flex flex-col w-full pb-24 min-h-screen bg-paper-cream">
      <section className="pt-24 pb-16 px-5 text-center border-b border-line-gray bg-white">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-deep-navy mb-4">공지사항 작성</h1>
        <p className="text-ink-2 text-lg">새로운 소식이나 주요 일정을 등록합니다.</p>
      </section>

      <div className="mx-auto max-w-[800px] w-full px-5 mt-12">
        <div className="bg-white p-8 rounded-xl border border-line-gray shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-ink mb-2">분류</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-1/3 px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
              >
                <option>공지</option>
                <option>행사</option>
                <option>결과보고</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-2">제목</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="공지사항 제목을 입력해주세요."
                className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-2">내용</label>
              <textarea 
                rows={15}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="공지할 내용을 상세히 적어주세요."
                className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors resize-none"
              ></textarea>
            </div>
            
            <div className="pt-2">
              <label className="block text-sm font-bold text-ink mb-2">사진 및 동영상 첨부 (선택)</label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-line-gray border-dashed rounded-lg cursor-pointer bg-paper-cream hover:bg-line-gray/20 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-3 text-ink-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-ink-2"><span className="font-semibold">클릭하여 업로드</span> 하거나 파일을 끌어다 놓으세요</p>
                        <p className="text-xs text-ink-2/70">SVG, PNG, JPG or MP4, MOV (MAX. 50MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" multiple accept="image/*,video/*" />
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="tertiary" onClick={() => window.history.back()}>취소</Button>
              <Button variant="primary" onClick={() => alert("저장 기능은 백엔드 연동 후 활성화됩니다.")}>등록하기</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

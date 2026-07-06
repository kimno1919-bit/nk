"use client";

import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";

function QtForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const supabase = createClient();

  // 오늘 날짜 기본값 세팅 (YYYY-MM-DD 형식)
  const today = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(today);
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchQt = async () => {
        const { data } = await supabase.from("qts").select("*").eq("id", id).single();
        if (data) {
          setDate(data.date);
          setBook(data.book);
          setChapter(data.chapter);
          setTitle(data.title);
          setContent(data.content || "");
          setIsPublic(data.is_public);
        }
      };
      fetchQt();
    }
  }, [id, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { date, book, chapter, title, content, is_public: isPublic };

    if (id) {
      await supabase.from("qts").update(payload).eq("id", id);
    } else {
      await supabase.from("qts").insert([payload]);
    }

    setLoading(false);
    router.push("/admin/qt");
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      setLoading(true);
      await supabase.from("qts").delete().eq("id", id);
      router.push("/admin/qt");
      router.refresh();
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">
          QT {id ? "수정" : "등록"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-line-gray shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-ink mb-2">묵상 일자</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-2">성경책 (예: 히브리서)</label>
            <input 
              type="text" 
              value={book}
              onChange={(e) => setBook(e.target.value)}
              placeholder="직접 입력하세요"
              required
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-2">장/절 (예: 4장 1-10절)</label>
            <input 
              type="text" 
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="직접 입력하세요"
              required
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-2">제목</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-2">본문 및 묵상 내용</label>
          <textarea 
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="긴 텍스트를 자유롭게 작성하세요."
            required
            className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors resize-y leading-relaxed"
          ></textarea>
        </div>

        <div className="pt-4 flex justify-between border-t border-line-gray mt-6 pt-6">
          <div>
            {id && (
              <Button type="button" variant="tertiary" onClick={handleDelete} disabled={loading}>
                삭제
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="tertiary" onClick={() => router.push("/admin/qt")}>취소</Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "저장 중..." : "저장하기"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AdminQtWritePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QtForm />
    </Suspense>
  );
}

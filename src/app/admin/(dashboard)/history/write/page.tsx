"use client";

import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";

function HistoryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const supabase = createClient();

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState("01");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("기타");
  const [sortOrder, setSortOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchHistory = async () => {
        const { data, error } = await supabase.from("histories").select("*").eq("id", id).single();
        if (data) {
          setYear(data.year);
          setMonth(data.month);
          setTitle(data.title);
          setContent(data.content || "");
          setCategory(data.category);
          setSortOrder(data.sort_order);
        }
      };
      fetchHistory();
    }
  }, [id, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { year, month, title, content, category, sort_order: sortOrder };

    if (id) {
      await supabase.from("histories").update(payload).eq("id", id);
    } else {
      await supabase.from("histories").insert([payload]);
    }

    setLoading(false);
    router.push("/admin/history");
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      setLoading(true);
      await supabase.from("histories").delete().eq("id", id);
      router.push("/admin/history");
      router.refresh();
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">
          연혁 {id ? "수정" : "작성"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-line-gray shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-ink mb-2">연도</label>
            <input 
              type="number" 
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              required
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-2">월</label>
            <input 
              type="text" 
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              placeholder="ex) 01, 10, 상시"
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-ink mb-2">카테고리</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
            >
              <option value="QT">QT</option>
              <option value="봉사">봉사</option>
              <option value="전도">전도</option>
              <option value="캠프">캠프</option>
              <option value="행사">행사</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-2">정렬 순서</label>
            <input 
              type="number" 
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
              placeholder="기본값: 0 (낮은 순서가 먼저 나옴)"
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
          <label className="block text-sm font-bold text-ink mb-2">내용 (선택)</label>
          <textarea 
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors resize-none"
          ></textarea>
        </div>

        <div className="pt-4 flex justify-between">
          <div>
            {id && (
              <Button type="button" variant="tertiary" onClick={handleDelete} disabled={loading}>
                삭제
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="tertiary" onClick={() => router.push("/admin/history")}>취소</Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "저장 중..." : "저장하기"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AdminHistoryWritePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HistoryForm />
    </Suspense>
  );
}

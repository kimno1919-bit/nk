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
  const [category, setCategory] = useState("기타");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchHistory = async () => {
        const { data, error } = await supabase.from("histories").select("*").eq("id", id).single();
        if (data) {
          setYear(data.year);
          setMonth(data.month);
          setCategory(data.category || "기타");
          setTitle(data.title);
          setContent(data.content || "");
          setSortOrder(data.sort_order || 0);
        }
      };
      fetchHistory();
    }
  }, [id, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { 
      year, 
      month, 
      category, 
      title, 
      content,
      sort_order: sortOrder
    };

    let error;
    if (id) {
      const res = await supabase.from("histories").update(payload).eq("id", id);
      error = res.error;
    } else {
      const res = await supabase.from("histories").insert([payload]);
      error = res.error;
    }

    setLoading(false);

    if (error) {
      alert("저장 중 오류가 발생했습니다: " + error.message);
      return;
    }

    router.push("/admin/history");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("정말 이 연혁을 삭제하시겠습니까?")) return;
    
    setLoading(true);
    const { error } = await supabase.from("histories").delete().eq("id", id);
    setLoading(false);

    if (error) {
      alert("삭제 중 오류가 발생했습니다: " + error.message);
      return;
    }

    router.push("/admin/history");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">
          {id ? "연혁 수정" : "새 연혁 작성"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-line-gray rounded-xl p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-ink mb-2">연도 *</label>
            <input 
              type="number" 
              required 
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full border border-line-gray rounded px-4 py-3 focus:outline-none focus:border-terracotta"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-2">월 * (상시, 01, 12 등)</label>
            <input 
              type="text" 
              required 
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full border border-line-gray rounded px-4 py-3 focus:outline-none focus:border-terracotta"
              placeholder="예: 05, 상시"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-ink mb-2">카테고리</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-line-gray rounded px-4 py-3 focus:outline-none focus:border-terracotta"
            >
              <option value="QT">QT</option>
              <option value="행사">행사</option>
              <option value="전도">전도</option>
              <option value="봉사">봉사</option>
              <option value="캠프">캠프</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-2">정렬 순서 (숫자가 낮을수록 위로)</label>
            <input 
              type="number" 
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full border border-line-gray rounded px-4 py-3 focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-2">제목 *</label>
          <input 
            type="text" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-line-gray rounded px-4 py-3 focus:outline-none focus:border-terracotta"
            placeholder="예: 제6회 남북청년 체육대회"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-2">내용 (선택)</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full border border-line-gray rounded px-4 py-3 focus:outline-none focus:border-terracotta"
            placeholder="세부 내용을 입력하세요."
          />
        </div>

        <div className="pt-4 flex justify-between">
          <div>
            {id && (
              <button 
                type="button" 
                onClick={handleDelete}
                disabled={loading}
                className="text-red-500 hover:underline font-bold px-4 py-3"
              >
                삭제하기
              </button>
            )}
          </div>
          <div className="flex gap-4">
            <Button type="button" variant="tertiary" onClick={() => router.push("/admin/history")}>
              취소
            </Button>
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

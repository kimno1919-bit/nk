"use client";

import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";

function ScheduleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const supabase = createClient();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("정기모임");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchSchedule = async () => {
        const { data } = await supabase.from("schedules").select("*").eq("id", id).single();
        if (data) {
          setDate(data.date);
          setTime(data.time || "");
          setCategory(data.category);
          setTitle(data.title);
        }
      };
      fetchSchedule();
    }
  }, [id, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { date, time, category, title };

    if (id) {
      await supabase.from("schedules").update(payload).eq("id", id);
    } else {
      await supabase.from("schedules").insert([payload]);
    }

    setLoading(false);
    router.push("/admin/schedule");
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      setLoading(true);
      await supabase.from("schedules").delete().eq("id", id);
      router.push("/admin/schedule");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">
          일정 {id ? "수정" : "등록"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-line-gray shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[15px] font-bold text-ink mb-2">구분</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors text-[16px]"
            >
              <option value="정기모임">정기모임 (달력에 빨간점)</option>
              <option value="행사">행사 (달력에 파란점)</option>
            </select>
          </div>
          <div>
            <label className="block text-[15px] font-bold text-ink mb-2">일자</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors text-[16px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-[15px] font-bold text-ink mb-2">제목 (내용)</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 수요 기도모임, 리더십 캠프 등"
              required
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors text-[16px]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[15px] font-bold text-ink mb-2">시간 (선택)</label>
            <input 
              type="text" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="예: 19:30, 오후 2시"
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors text-[16px]"
            />
          </div>
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
            <Button type="button" variant="tertiary" onClick={() => router.push("/admin/schedule")}>취소</Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "저장 중..." : "저장하기"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AdminScheduleWritePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleForm />
    </Suspense>
  );
}

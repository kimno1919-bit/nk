"use client";

import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";

function NoticeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("일반");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchNotice = async () => {
        const { data, error } = await supabase.from("notices").select("*").eq("id", id).single();
        if (data) {
          setTitle(data.title);
          setContent(data.content || "");
          setCategory(data.category);
          setIsPublic(data.is_public);
        }
      };
      fetchNotice();
    }
  }, [id, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { title, content, category, is_public: isPublic };

    if (id) {
      await supabase.from("notices").update(payload).eq("id", id);
    } else {
      await supabase.from("notices").insert([payload]);
    }

    setLoading(false);
    router.push("/admin/notice");
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      setLoading(true);
      await supabase.from("notices").delete().eq("id", id);
      router.push("/admin/notice");
      router.refresh();
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">
          공지사항 {id ? "수정" : "작성"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-line-gray shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-ink mb-2">카테고리</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
            >
              <option value="일반">일반</option>
              <option value="행사">행사</option>
              <option value="사역">사역</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-2">공개 여부</label>
            <select 
              value={isPublic ? "true" : "false"}
              onChange={(e) => setIsPublic(e.target.value === "true")}
              className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
            >
              <option value="true">공개</option>
              <option value="false">비공개</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-2">제목</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="공지사항 제목을 입력하세요."
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

        <div className="pt-4 flex justify-between">
          <div>
            {id && (
              <Button type="button" variant="tertiary" onClick={handleDelete} disabled={loading}>
                삭제
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="tertiary" onClick={() => router.push("/admin/notice")}>취소</Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "저장 중..." : "저장하기"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AdminNoticeWritePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NoticeForm />
    </Suspense>
  );
}

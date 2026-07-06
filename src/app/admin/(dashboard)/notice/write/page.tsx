"use client";

import { useState, useEffect, Suspense, useRef } from "react";
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
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      const fetchNotice = async () => {
        const { data, error } = await supabase.from("notices").select("*").eq("id", id).single();
        if (data) {
          setTitle(data.title);
          setContent(data.content || "");
          setCategory(data.category);
          setIsPublic(data.is_public);
          setImageUrl(data.image_url || "");
          if (data.created_at) {
            setDate(data.created_at.split('T')[0]);
          }
        }
      };
      fetchNotice();
    }
  }, [id, supabase]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) {
        alert("업로드 실패: Storage 버킷 'media'가 존재하지 않거나 권한이 없습니다.");
        return;
      }

      const { data } = supabase.storage.from("media").getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: any = { 
      title, 
      content, 
      category, 
      is_public: isPublic,
      image_url: imageUrl,
      created_at: new Date(date).toISOString() 
    };

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
        
        <div>
          <label className="block text-sm font-bold text-ink mb-2">이미지 업로드 (선택사항)</label>
          <div className="flex items-center gap-4 mb-4">
             <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
               {uploading ? "업로드 중..." : "이미지 파일 선택"}
             </Button>
             <input 
               type="file" 
               accept="image/*"
               className="hidden"
               ref={fileInputRef}
               onChange={handleFileUpload}
             />
          </div>
          {imageUrl && (
            <div className="w-48 h-48 rounded overflow-hidden border border-line-gray relative bg-paper-cream group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
              <button 
                type="button" 
                onClick={() => setImageUrl("")}
                className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold text-xs shadow"
              >
                X
              </button>
            </div>
          )}
        </div>

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
          <label className="block text-sm font-bold text-ink mb-2">작성일자 (과거 게시물 등록용)</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
          />
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

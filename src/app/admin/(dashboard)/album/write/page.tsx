"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";

function AlbumForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      const fetchAlbum = async () => {
        const { data, error } = await supabase.from("albums").select("*").eq("id", id).single();
        if (data) {
          setTitle(data.title);
          setContent(data.content || "");
          setMediaUrl(data.media_url || "");
          setIsPublic(data.is_public);
        }
      };
      fetchAlbum();
    }
  }, [id, supabase]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image or video to upload.");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) {
        // If bucket doesn't exist or RLS fails
        alert("업로드 실패: Storage 버킷 'media'가 존재하지 않거나 권한이 없습니다.");
        throw uploadError;
      }

      const { data } = supabase.storage.from("media").getPublicUrl(filePath);
      setMediaUrl(data.publicUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { title, content, media_url: mediaUrl, is_public: isPublic };

    if (id) {
      await supabase.from("albums").update(payload).eq("id", id);
    } else {
      await supabase.from("albums").insert([payload]);
    }

    setLoading(false);
    router.push("/admin/album");
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      setLoading(true);
      await supabase.from("albums").delete().eq("id", id);
      router.push("/admin/album");
      router.refresh();
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">
          앨범 {id ? "수정" : "등록"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-line-gray shadow-sm">
        
        <div>
          <label className="block text-sm font-bold text-ink mb-2">사진 / 동영상 업로드</label>
          <div className="flex items-center gap-4 mb-4">
             <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
               {uploading ? "업로드 중..." : "미디어 파일 선택"}
             </Button>
             <input 
               type="file" 
               accept="image/*, video/*"
               className="hidden"
               ref={fileInputRef}
               onChange={handleFileUpload}
             />
          </div>
          {mediaUrl && (
            <div className="w-48 h-48 rounded overflow-hidden border border-line-gray relative bg-paper-cream">
              {mediaUrl.match(/\.(mp4|webm)$/i) ? (
                 <video src={mediaUrl} className="w-full h-full object-cover" controls />
              ) : (
                 // eslint-disable-next-line @next/next/no-img-element
                 <img src={mediaUrl} alt="preview" className="w-full h-full object-cover" />
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
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
            className="w-full px-4 py-3 bg-paper-cream border border-line-gray rounded focus:outline-none focus:border-deep-navy transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-2">내용</label>
          <textarea 
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="사진/영상에 대한 설명을 자유롭게 남겨주세요."
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
            <Button type="button" variant="tertiary" onClick={() => router.push("/admin/album")}>취소</Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "저장 중..." : "저장하기"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AdminAlbumWritePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AlbumForm />
    </Suspense>
  );
}

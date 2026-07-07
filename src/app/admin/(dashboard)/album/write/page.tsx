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
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
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
          
          // media_urls(배열)가 있으면 우선 적용, 없으면 이전 방식인 media_url로 마이그레이션 적용
          if (data.media_urls && data.media_urls.length > 0) {
            setMediaUrls(data.media_urls);
          } else if (data.media_url) {
            setMediaUrls([data.media_url]);
          }
          
          setIsPublic(data.is_public);
          if (data.created_at) setDate(data.created_at.split('T')[0]);
        }
      };
      fetchAlbum();
    }
  }, [id, supabase]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const newUrls: string[] = [];
      const files = Array.from(e.target.files);

      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(filePath, file);

        if (uploadError) {
          alert(`업로드 실패 (${file.name}): Storage 버킷 'media'가 존재하지 않거나 권한이 없습니다.`);
          continue;
        }

        const { data } = supabase.storage.from("media").getPublicUrl(filePath);
        newUrls.push(data.publicUrl);
      }

      setMediaUrls(prev => [...prev, ...newUrls]);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeMedia = (index: number) => {
    setMediaUrls(prev => prev.filter((_, i) => i !== index));
  };

  const setAsThumbnail = (index: number) => {
    if (index === 0) return;
    setMediaUrls(prev => {
      const newUrls = [...prev];
      const temp = newUrls[0];
      newUrls[0] = newUrls[index];
      newUrls[index] = temp;
      return newUrls;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: any = { 
      title, 
      content, 
      media_urls: mediaUrls, 
      media_url: mediaUrls[0] || null, // 하위 호환을 위해 첫 번째 이미지는 media_url에도 저장
      is_public: isPublic,
      created_at: new Date(date).toISOString()
    };

    let error;
    if (id) {
      const res = await supabase.from("albums").update(payload).eq("id", id);
      error = res.error;
    } else {
      const res = await supabase.from("albums").insert([payload]);
      error = res.error;
    }

    setLoading(false);

    if (error) {
      alert("저장 중 오류가 발생했습니다: " + error.message);
      return;
    }

    router.refresh();
    router.push("/admin/album");
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
               {uploading ? "업로드 중..." : "미디어 파일 선택 (여러 장 가능)"}
             </Button>
             <input 
               type="file" 
               accept="image/*, video/*"
               multiple
               className="hidden"
               ref={fileInputRef}
               onChange={handleFileUpload}
             />
          </div>
          
          {mediaUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mediaUrls.map((url, idx) => (
                <div key={idx} className={`relative group border-2 rounded-xl overflow-hidden aspect-square ${idx === 0 ? 'border-terracotta shadow-md' : 'border-line-gray/50 hover:border-deep-navy/30'}`}>
                  {idx === 0 && (
                    <div className="absolute top-0 left-0 bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-br z-10 shadow-sm flex items-center gap-1">
                      👑 대표사진
                    </div>
                  )}
                  {url.match(/\.(mp4|webm)$/i) ? (
                    <video src={url} className="w-full h-full object-cover" muted />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={url} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                  )}
                  
                  {/* 상단 버튼 컨테이너 (호버 시 표시) */}
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between px-1.5 pt-1.5 z-20">
                    {idx !== 0 ? (
                      <button 
                        type="button"
                        onClick={() => setAsThumbnail(idx)}
                        className="text-[10px] bg-black/60 hover:bg-terracotta text-white font-bold px-2 py-1 rounded transition-colors"
                        title="대표사진으로 설정"
                      >
                        대표 지정
                      </button>
                    ) : (
                      <div></div>
                    )}
                    <button 
                      type="button"
                      onClick={() => removeMedia(idx)}
                      className="bg-red-500/80 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] transition-colors"
                      title="사진 삭제"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
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

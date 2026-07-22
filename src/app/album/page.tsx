"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { AlbumComments } from "./AlbumComments";

export default function AlbumPage() {
  const supabase = createClient();
  const [albums, setAlbums] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      const { data } = await supabase
        .from("albums")
        .select("*, album_comments(count)")
        .eq("is_public", true)
        .order("created_at", { ascending: false });
      if (data) setAlbums(data);
      setIsLoading(false);
    };
    fetchAlbums();
  }, [supabase]);

  const handleAlbumClick = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      await supabase.rpc("increment_view_count", { table_name: "albums", row_id: id });
      setAlbums(prev => prev.map(a => a.id === id ? { ...a, views: (a.views || 0) + 1 } : a));
    }
  };

  const nextImage = (e: React.MouseEvent, id: string, maxLength: number) => {
    e.stopPropagation();
    setImageIndices(prev => ({ ...prev, [id]: ((prev[id] || 0) + 1) % maxLength }));
  };

  const prevImage = (e: React.MouseEvent, id: string, maxLength: number) => {
    e.stopPropagation();
    setImageIndices(prev => ({ ...prev, [id]: ((prev[id] || 0) - 1 + maxLength) % maxLength }));
  };

  const handleLike = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await supabase.rpc("increment_album_like", { row_id: id });
    setAlbums(prev => prev.map(a => a.id === id ? { ...a, likes: (a.likes || 0) + 1 } : a));
  };

  const handleShare = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/album?id=${id}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다. 카카오톡이나 문자 메시지로 공유해보세요!");
    } catch (err) {
      alert("링크 복사에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 min-h-screen bg-paper-cream">
      <section className="pt-24 pb-16 px-5 text-center">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-deep-navy mb-6">앨범</h1>
        <p className="text-ink-2 text-lg max-w-2xl mx-auto leading-relaxed">
          남북청년연합선교회의 따뜻한 나눔과 활동 모습을 사진과 영상으로 만나보세요.
        </p>
      </section>

      <div className="mx-auto max-w-[1200px] w-full px-5 mt-4">
        <div className="flex justify-end mb-6">
          <Link href="/admin/album/write">
            <Button variant="secondary" className="!px-6">관리자 글쓰기</Button>
          </Link>
        </div>
        {isLoading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-deep-navy border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-ink-2 font-medium">로딩 중...</p>
          </div>
        ) : albums && albums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => {
              const isExpanded = expandedId === album.id;
              
              return (
                <div 
                  key={album.id} 
                  onClick={() => handleAlbumClick(album.id)}
                  className={`bg-white rounded-xl border border-line-gray overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col ${isExpanded ? 'lg:col-span-2 sm:col-span-2' : 'h-full'}`}
                >
                  <div className={`w-full bg-line-gray/30 relative overflow-hidden flex-shrink-0 ${isExpanded ? 'h-[500px]' : 'aspect-square'}`}>
                    {(() => {
                      const urls = (album.media_urls && album.media_urls.length > 0) 
                        ? album.media_urls 
                        : (album.media_url ? [album.media_url] : []);
                      
                      if (urls.length === 0) {
                        return <div className="w-full h-full flex items-center justify-center text-ink-2/50 font-bold">No Image</div>;
                      }

                      const currentIndex = imageIndices[album.id] || 0;
                      const currentUrl = urls[currentIndex];
                      const isVideo = currentUrl.match(/\.(mp4|webm)$/i);

                      return (
                        <>
                          {isVideo ? (
                            <video src={currentUrl} className="w-full h-full object-cover" controls={isExpanded} autoPlay={isExpanded} muted={!isExpanded} />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={currentUrl} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          )}
                          
                          {/* 화살표 내비게이션 (여러 장일 경우 항상 표시) */}
                          {urls.length > 1 && (
                            <>
                              <button 
                                onClick={(e) => prevImage(e, album.id, urls.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-10"
                              >
                                &#10094;
                              </button>
                              <button 
                                onClick={(e) => nextImage(e, album.id, urls.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-10"
                              >
                                &#10095;
                              </button>
                              {/* 인디케이터 */}
                              <div className="absolute bottom-4 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 text-white text-[11px] px-3 py-1 rounded-full font-bold z-10 tracking-widest">
                                {currentIndex + 1} / {urls.length}
                              </div>
                            </>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-5">
                      <span className="px-3 py-1 bg-pine-green/10 text-pine-green text-[13px] font-bold rounded">
                        {new Date(album.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className={`font-serif font-bold text-deep-navy group-hover:text-terracotta transition-colors mb-4 ${isExpanded ? 'text-2xl sm:text-3xl' : 'text-xl line-clamp-2'}`}>
                      {album.title}
                    </h3>
                    
                    {album.content && (
                      <div className={`text-ink flex-1 whitespace-pre-wrap break-keep ${isExpanded ? 'text-[15px] sm:text-[16px] leading-loose pb-6' : 'text-[15px] leading-relaxed mb-6 line-clamp-3 text-ink-2'}`}>
                        {album.content}
                      </div>
                    )}

                    <div className="mt-auto pt-5 border-t border-line-gray/50 flex justify-between items-center">
                      {isExpanded ? (
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => handleLike(e, album.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-warm-sand/50 hover:bg-terracotta/10 text-terracotta font-bold text-sm rounded-full transition-colors"
                          >
                            👍 좋아요 {album.likes || 0}
                          </button>
                          <button 
                            onClick={(e) => handleShare(e, album.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-pine-green/10 hover:bg-pine-green/20 text-pine-green font-bold text-sm rounded-full transition-colors"
                          >
                            🔗 공유하기
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-sm font-bold text-ink-2 group-hover:text-terracotta transition-colors flex items-center gap-1">
                            자세히 보기 ▼
                          </span>
                          <div className="flex gap-3 text-[13px] text-ink-2 font-medium">
                            <span>조회 {album.views || 0}</span>
                            <span>👍 {album.likes || 0}</span>
                            <span>💬 {album.album_comments?.[0]?.count || 0}</span>
                          </div>
                        </>
                      )}
                      {isExpanded && (
                         <span className="text-sm font-bold text-ink-2 hover:text-deep-navy transition-colors">
                           접기 ▲
                         </span>
                      )}
                    </div>

                    {isExpanded && (
                      <div onClick={(e) => e.stopPropagation()} className="cursor-auto">
                        <AlbumComments albumId={album.id} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-xl border border-line-gray shadow-sm">
            <p className="text-ink-2 font-medium">등록된 앨범이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

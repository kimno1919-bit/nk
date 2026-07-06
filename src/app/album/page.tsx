"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

export default function AlbumPage() {
  const supabase = createClient();
  const [albums, setAlbums] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchAlbums = async () => {
      const { data } = await supabase
        .from("albums")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });
      if (data) setAlbums(data);
    };
    fetchAlbums();
  }, [supabase]);

  const handleAlbumClick = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setCurrentImageIndex(0);
    } else {
      setExpandedId(id);
      setCurrentImageIndex(0);
      await supabase.rpc("increment_view_count", { table_name: "albums", row_id: id });
      setAlbums(prev => prev.map(a => a.id === id ? { ...a, views: (a.views || 0) + 1 } : a));
    }
  };

  const nextImage = (e: React.MouseEvent, maxLength: number) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % maxLength);
  };

  const prevImage = (e: React.MouseEvent, maxLength: number) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + maxLength) % maxLength);
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
        {albums && albums.length > 0 ? (
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

                      const currentUrl = isExpanded ? urls[currentImageIndex] : urls[0];
                      const isVideo = currentUrl.match(/\.(mp4|webm)$/i);

                      return (
                        <>
                          {isVideo ? (
                            <video src={currentUrl} className="w-full h-full object-cover" controls={isExpanded} autoPlay={isExpanded} muted={!isExpanded} />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={currentUrl} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          )}
                          
                          {/* 화살표 내비게이션 (확장되었고 여러 장일 경우에만) */}
                          {isExpanded && urls.length > 1 && (
                            <>
                              <button 
                                onClick={(e) => prevImage(e, urls.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                              >
                                &#10094;
                              </button>
                              <button 
                                onClick={(e) => nextImage(e, urls.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                              >
                                &#10095;
                              </button>
                              {/* 인디케이터 */}
                              <div className="absolute bottom-4 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                                {currentImageIndex + 1} / {urls.length}
                              </div>
                            </>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[12px] font-bold text-ink-2">{new Date(album.created_at).toLocaleDateString()}</span>
                      <span className="text-[12px] font-bold text-ink-2">👁️ {album.views || 0}</span>
                    </div>
                    <h3 className={`font-bold text-ink group-hover:text-deep-navy transition-colors mb-3 leading-snug ${isExpanded ? 'text-2xl' : 'text-lg line-clamp-2'}`}>
                      {album.title}
                    </h3>
                    {album.content && (
                      <p className={`text-ink-2 whitespace-pre-wrap leading-relaxed ${isExpanded ? 'text-base' : 'text-sm line-clamp-3 mt-auto'}`}>
                        {album.content}
                      </p>
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

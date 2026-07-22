"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabasePublic } from "@/utils/supabase/public";

function LoadingSkeleton({ height }: { height: string }) {
  return <div className={`w-full ${height} bg-line-gray/20 animate-pulse rounded-xl`}></div>;
}

export function LatestAlbums() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      const { data } = await supabasePublic
        .from("albums")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(4);
      if (data) setAlbums(data);
      setIsLoading(false);
    };
    fetchAlbums();
  }, []);

  if (isLoading) {
    return (
      <>
        <LoadingSkeleton height="h-[300px]" />
        <LoadingSkeleton height="h-[300px]" />
        <LoadingSkeleton height="h-[300px]" />
        <LoadingSkeleton height="h-[300px]" />
      </>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="col-span-full text-ink-2 text-center py-12 bg-paper-cream border border-line-gray rounded-xl shadow-sm">
        등록된 앨범이 없습니다.
      </div>
    );
  }

  return (
    <>
      {albums.map((album) => {
        const urls = (album.media_urls && album.media_urls.length > 0) 
          ? album.media_urls 
          : (album.media_url ? [album.media_url] : []);
        const thumbnail = urls[0];

        return (
          <Link href={`/album?id=${album.id}`} key={album.id} className="block group h-full">
            <div className="bg-white rounded-xl border border-line-gray overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="w-full aspect-square bg-line-gray/30 relative overflow-hidden flex-shrink-0">
                {thumbnail ? (
                  thumbnail.match(/\.(mp4|webm)$/i) ? (
                    <div className="w-full h-full flex items-center justify-center bg-black/10">
                      <span className="text-4xl">▶️</span>
                    </div>
                  ) : (
                    <img src={thumbnail} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-2/50 font-bold">No Image</div>
                )}
                {urls.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded font-bold">
                    +{urls.length - 1}
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-[12px] font-bold text-ink-2 mb-2">{new Date(album.created_at).toLocaleDateString()}</span>
                <h4 className="font-serif font-bold text-lg text-ink group-hover:text-deep-navy transition-colors line-clamp-2">
                  {album.title}
                </h4>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

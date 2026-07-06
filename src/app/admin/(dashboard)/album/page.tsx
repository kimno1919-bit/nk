import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/Button";

export default async function AdminAlbumPage() {
  const supabase = await createClient();
  const { data: albums, error } = await supabase
    .from("albums")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">앨범 관리</h2>
        <Link href="/admin/album/write">
          <Button variant="primary">새 앨범 등록</Button>
        </Link>
      </div>

      <div className="bg-white border border-line-gray rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-ink-2">
          <thead className="bg-paper-cream border-b border-line-gray font-bold text-ink">
            <tr>
              <th className="px-6 py-4 w-24">미디어</th>
              <th className="px-6 py-4">제목</th>
              <th className="px-6 py-4">공개여부</th>
              <th className="px-6 py-4">작성일</th>
              <th className="px-6 py-4 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {albums && albums.length > 0 ? (
              albums.map((album) => (
                <tr key={album.id} className="border-b border-line-gray hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {album.media_url ? (
                      <div className="w-12 h-12 rounded bg-line-gray/30 overflow-hidden">
                        {album.media_url.match(/\.(mp4|webm)$/i) ? (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold bg-deep-navy text-white">비디오</div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={album.media_url} alt="thumbnail" className="w-full h-full object-cover" />
                        )}
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded bg-line-gray flex items-center justify-center text-[10px] text-white">N/A</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-ink">{album.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${album.is_public ? 'bg-pine-green/10 text-pine-green' : 'bg-line-gray text-ink-2'}`}>
                      {album.is_public ? "공개" : "비공개"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(album.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/album/write?id=${album.id}`} className="text-terracotta hover:underline font-medium">수정</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-ink-2">
                  등록된 앨범이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

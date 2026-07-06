import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/Button";

export default async function AdminNoticePage() {
  const supabase = await createClient();
  const { data: notices, error } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">공지사항 관리</h2>
        <Link href="/admin/notice/write">
          <Button variant="primary">새 공지사항 작성</Button>
        </Link>
      </div>

      <div className="bg-white border border-line-gray rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-ink-2">
          <thead className="bg-paper-cream border-b border-line-gray font-bold text-ink">
            <tr>
              <th className="px-6 py-4">카테고리</th>
              <th className="px-6 py-4">제목</th>
              <th className="px-6 py-4">공개여부</th>
              <th className="px-6 py-4">작성일</th>
              <th className="px-6 py-4 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {notices && notices.length > 0 ? (
              notices.map((notice) => (
                <tr key={notice.id} className="border-b border-line-gray hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{notice.category}</td>
                  <td className="px-6 py-4 font-medium text-ink">{notice.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${notice.is_public ? 'bg-pine-green/10 text-pine-green' : 'bg-line-gray text-ink-2'}`}>
                      {notice.is_public ? "공개" : "비공개"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(notice.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/notice/write?id=${notice.id}`} className="text-terracotta hover:underline font-medium">수정</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-ink-2">
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

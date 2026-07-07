import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/Button";

export default async function AdminHistoryPage() {
  const supabase = await createClient();
  const { data: histories, error } = await supabase
    .from("histories")
    .select("*")
    .order("year", { ascending: false })
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">연혁 관리</h2>
        <Link href="/admin/history/write">
          <Button variant="primary">새 연혁 작성</Button>
        </Link>
      </div>

      <div className="bg-white border border-line-gray rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-ink-2">
          <thead className="bg-paper-cream border-b border-line-gray font-bold text-ink">
            <tr>
              <th className="px-6 py-4">연도</th>
              <th className="px-6 py-4">월</th>
              <th className="px-6 py-4">카테고리</th>
              <th className="px-6 py-4">제목</th>
              <th className="px-6 py-4">정렬순서</th>
              <th className="px-6 py-4 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {histories && histories.length > 0 ? (
              histories.map((history) => (
                <tr key={history.id} className="border-b border-line-gray hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{history.year}</td>
                  <td className="px-6 py-4">{history.month}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs font-bold bg-line-gray/30 text-ink">
                      {history.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-ink">{history.title}</td>
                  <td className="px-6 py-4">{history.sort_order}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/history/write?id=${history.id}`} className="text-terracotta hover:underline font-medium">수정</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-ink-2">
                  등록된 연혁이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

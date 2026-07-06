import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/Button";

export default async function AdminQtPage() {
  const supabase = await createClient();
  const { data: qts } = await supabase
    .from("qts")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">QT 관리</h2>
        <Link href="/admin/qt/write">
          <Button variant="primary">새 QT 등록</Button>
        </Link>
      </div>

      <div className="bg-white border border-line-gray rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-ink-2">
          <thead className="bg-paper-cream border-b border-line-gray font-bold text-ink">
            <tr>
              <th className="px-6 py-4">묵상일자</th>
              <th className="px-6 py-4">성경</th>
              <th className="px-6 py-4">제목</th>
              <th className="px-6 py-4">조회수</th>
              <th className="px-6 py-4 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {qts && qts.length > 0 ? (
              qts.map((qt) => (
                <tr key={qt.id} className="border-b border-line-gray hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{qt.date}</td>
                  <td className="px-6 py-4">{qt.book} {qt.chapter}</td>
                  <td className="px-6 py-4 text-ink font-medium">{qt.title}</td>
                  <td className="px-6 py-4">{qt.views || 0}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/qt/write?id=${qt.id}`} className="text-terracotta hover:underline font-medium">수정</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-ink-2">
                  등록된 QT가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/Button";

export default async function AdminSchedulePage() {
  const supabase = await createClient();
  const { data: schedules } = await supabase
    .from("schedules")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">일정 관리</h2>
        <Link href="/admin/schedule/write">
          <Button variant="primary">새 일정 등록</Button>
        </Link>
      </div>

      <div className="bg-white border border-line-gray rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-[15px] text-ink-2">
          <thead className="bg-paper-cream border-b border-line-gray font-bold text-ink">
            <tr>
              <th className="px-6 py-4">일자</th>
              <th className="px-6 py-4">구분</th>
              <th className="px-6 py-4">시간</th>
              <th className="px-6 py-4">제목</th>
              <th className="px-6 py-4 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {schedules && schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr key={schedule.id} className="border-b border-line-gray hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{schedule.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${schedule.category === '정기모임' ? 'bg-terracotta/10 text-terracotta' : 'bg-deep-navy/10 text-deep-navy'}`}>
                      {schedule.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{schedule.time || "-"}</td>
                  <td className="px-6 py-4 text-ink font-medium">{schedule.title}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/schedule/write?id=${schedule.id}`} className="text-terracotta hover:underline font-medium">수정</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-ink-2">
                  등록된 일정이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

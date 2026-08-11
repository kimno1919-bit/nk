"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/Pagination";

function AdminScheduleContent() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [schedules, setSchedules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(urlPage);
  const ITEMS_PER_PAGE = 15;

  const updateUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      
      const { count } = await supabase
        .from("schedules")
        .select("*", { count: "exact", head: true });
        
      setTotalCount(count || 0);

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error } = await supabase
        .from("schedules")
        .select("*")
        .order("date", { ascending: false })
        .range(from, to);

      if (data) setSchedules(data);
      setIsLoading(false);
    };
    fetchSchedules();
  }, [supabase, currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">일정 관리</h2>
        <Link href={`/admin/schedule/write?page=${currentPage}`}>
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
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-ink-2">
                  <div className="w-6 h-6 border-2 border-deep-navy border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  데이터를 불러오는 중입니다...
                </td>
              </tr>
            ) : schedules.length > 0 ? (
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
                    <Link href={`/admin/schedule/write?id=${schedule.id}&page=${currentPage}`} className="text-terracotta hover:underline font-medium">수정</Link>
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
      
      {!isLoading && totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            updateUrl(page);
          }}
        />
      )}
    </div>
  );
}

export default function AdminSchedulePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
      <AdminScheduleContent />
    </Suspense>
  );
}

"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/Pagination";

function AdminHistoryContent() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [histories, setHistories] = useState<any[]>([]);
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
    const fetchHistories = async () => {
      setIsLoading(true);
      
      const { count } = await supabase
        .from("histories")
        .select("*", { count: "exact", head: true });
        
      setTotalCount(count || 0);

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error } = await supabase
        .from("histories")
        .select("*")
        .order("year", { ascending: false })
        .order("sort_order", { ascending: true })
        .range(from, to);

      if (data) setHistories(data);
      setIsLoading(false);
    };
    fetchHistories();
  }, [supabase, currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">연혁 관리</h2>
        <Link href={`/admin/history/write?page=${currentPage}`}>
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
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-ink-2">
                  <div className="w-6 h-6 border-2 border-deep-navy border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  데이터를 불러오는 중입니다...
                </td>
              </tr>
            ) : histories.length > 0 ? (
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
                    <Link href={`/admin/history/write?id=${history.id}&page=${currentPage}`} className="text-terracotta hover:underline font-medium">수정</Link>
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

export default function AdminHistoryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
      <AdminHistoryContent />
    </Suspense>
  );
}

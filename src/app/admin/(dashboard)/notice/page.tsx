"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/Pagination";

function AdminNoticeContent() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [notices, setNotices] = useState<any[]>([]);
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
    const fetchNotices = async () => {
      setIsLoading(true);
      
      const { count } = await supabase
        .from("notices")
        .select("*", { count: "exact", head: true });
        
      setTotalCount(count || 0);

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (data) setNotices(data);
      setIsLoading(false);
    };
    fetchNotices();
  }, [supabase, currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">공지사항 관리</h2>
        <Link href={`/admin/notice/write?page=${currentPage}`}>
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
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-ink-2">
                  <div className="w-6 h-6 border-2 border-deep-navy border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  데이터를 불러오는 중입니다...
                </td>
              </tr>
            ) : notices.length > 0 ? (
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
                    <Link href={`/admin/notice/write?id=${notice.id}&page=${currentPage}`} className="text-terracotta hover:underline font-medium">수정</Link>
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

export default function AdminNoticePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
      <AdminNoticeContent />
    </Suspense>
  );
}

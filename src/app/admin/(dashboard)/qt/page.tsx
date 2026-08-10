"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/Pagination";

const BIBLE_BOOKS = [
  "창세기", "출애굽기", "레위기", "민수기", "신명기", "여호수아", "사사기", "룻기", "사무엘상", "사무엘하", "열왕기상", "열왕기하", "역대상", "역대하", "에스라", "느헤미야", "에스더", "욥기", "시편", "잠언", "전도서", "아가", "이사야", "예레미야", "예레미야애가", "에스겔", "다니엘", "호세아", "요엘", "아모스", "오바댜", "요나", "미가", "나훔", "하박국", "스바냐", "학개", "스가랴", "말라기",
  "마태복음", "마가복음", "누가복음", "요한복음", "사도행전", "로마서", "고린도전서", "고린도후서", "갈라디아서", "에베소서", "빌립보서", "골로새서", "데살로니가전서", "데살로니가후서", "디모데전서", "디모데후서", "디도서", "빌레몬서", "히브리서", "야고보서", "베드로전서", "베드로후서", "요한일서", "요한이서", "요한삼서", "유다서", "요한계시록"
];

function AdminQtContent() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [qts, setQts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination & Filter state from URL
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const urlBook = searchParams.get("book") || "모든 성경";

  const [currentPage, setCurrentPage] = useState(urlPage);
  const [selectedBook, setSelectedBook] = useState(urlBook);
  const ITEMS_PER_PAGE = 20;

  // Sync state to URL helper
  const updateUrl = (page: number, book: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("book", book);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchQts = async () => {
      let allData: any[] = [];
      let from = 0;
      const limit = 1000;
      let hasMore = true;

      while (hasMore) {
        // 본문(content)을 제외한 메타데이터만 빠르게 불러옵니다.
        const { data, error } = await supabase
          .from("qts")
          .select("id, date, book, chapter, title, views")
          .order("date", { ascending: false })
          .range(from, from + limit - 1);
          
        if (error || !data || data.length === 0) {
          hasMore = false;
        } else {
          allData = [...allData, ...data];
          from += limit;
          if (data.length < limit) hasMore = false;
        }
      }
        
      setQts(allData);
      setIsLoading(false);
    };
    fetchQts();
  }, [supabase]);

  // 성경 필터 정렬
  const availableBooks = Array.from(new Set(qts.map(qt => qt.book)))
    .filter(Boolean)
    .sort((a: any, b: any) => {
      const indexA = BIBLE_BOOKS.indexOf(a);
      const indexB = BIBLE_BOOKS.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  // 필터 적용
  const filteredQts = qts.filter(qt => {
    if (selectedBook !== "모든 성경" && qt.book !== selectedBook) return false;
    return true;
  });

  // 페이지네이션 적용
  const totalPages = Math.ceil(filteredQts.length / ITEMS_PER_PAGE);
  const currentData = filteredQts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h2 className="font-serif font-bold text-3xl text-deep-navy">QT 관리</h2>
        <div className="flex items-center gap-4">
          <select 
            value={selectedBook}
            onChange={(e) => {
              const newBook = e.target.value;
              setSelectedBook(newBook);
              setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
              updateUrl(1, newBook);
            }}
            className="px-4 py-2 bg-white border border-line-gray rounded text-[15px] text-ink font-medium focus:outline-none focus:border-deep-navy transition-colors min-w-[120px]"
          >
            <option value="모든 성경">모든 성경</option>
            {availableBooks.map(book => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
          <Link href={`/admin/qt/write?page=${currentPage}&book=${selectedBook}`}>
            <Button variant="primary">새 QT 등록</Button>
          </Link>
        </div>
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
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-ink-2">
                  <div className="w-6 h-6 border-2 border-deep-navy border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  데이터를 불러오는 중입니다...
                </td>
              </tr>
            ) : currentData.length > 0 ? (
              currentData.map((qt) => (
                <tr key={qt.id} className="border-b border-line-gray hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{qt.date}</td>
                  <td className="px-6 py-4">{qt.book} {qt.chapter}</td>
                  <td className="px-6 py-4 text-ink font-medium">{qt.title}</td>
                  <td className="px-6 py-4">{qt.views || 0}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/qt/write?id=${qt.id}&page=${currentPage}&book=${selectedBook}`} className="text-terracotta hover:underline font-medium">수정</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-ink-2">
                  해당하는 QT가 없습니다.
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
            updateUrl(page, selectedBook);
          }}
        />
      )}
    </div>
  );
}

export default function AdminQtPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
      <AdminQtContent />
    </Suspense>
  );
}

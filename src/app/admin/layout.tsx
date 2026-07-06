import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-ink">
      {/* Sidebar */}
      <aside className="w-64 bg-deep-navy text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-serif font-bold text-2xl">관리자 페이지</h2>
          <p className="text-white/60 text-sm mt-1">NK Mission Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded hover:bg-white/10 transition-colors font-medium">대시보드</Link>
          <Link href="/admin/notice" className="block px-4 py-3 rounded hover:bg-white/10 transition-colors font-medium">공지사항 관리</Link>
          <Link href="/admin/album" className="block px-4 py-3 rounded hover:bg-white/10 transition-colors font-medium">앨범 관리</Link>
          <Link href="/admin/history" className="block px-4 py-3 rounded hover:bg-white/10 transition-colors font-medium">연혁 관리</Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="block px-4 py-3 rounded hover:bg-white/10 transition-colors text-sm text-center text-white/80">
            홈페이지로 돌아가기
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-line-gray flex items-center justify-between px-8 shrink-0">
          <h1 className="font-bold text-xl text-deep-navy">관리자 시스템</h1>
          {/* 로그아웃 버튼은 나중에 구현 */}
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

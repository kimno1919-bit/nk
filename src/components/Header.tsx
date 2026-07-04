import Link from 'next/link';
import { Button } from './Button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line-gray bg-paper-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          {/* 로고 임시 영역 */}
          <div className="h-[34px] w-[34px] bg-deep-navy flex items-center justify-center rounded-sm text-white font-bold text-xs shrink-0">
            로고
          </div>
          <span className="font-serif font-bold text-[22px] text-deep-navy hidden sm:inline-block tracking-tight">남북청년연합선교회</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 font-sans font-medium text-[16px] text-ink-2">
          <Link href="/about" className="hover:text-deep-navy transition-colors">소개</Link>
          <Link href="/history" className="hover:text-deep-navy transition-colors">연혁</Link>
          <Link href="/ministry" className="hover:text-deep-navy transition-colors">사역</Link>
          <Link href="/qt" className="hover:text-deep-navy transition-colors">3331 QT</Link>
          <Link href="/notice" className="hover:text-deep-navy transition-colors">공지사항</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {/* 모바일 햄버거 메뉴 버튼 임시 생략, 추후 구현 가능 */}
          <Link href="/support">
            <Button variant="primary" className="!py-2 !px-4 !text-[14px] sm:!text-[15px]">후원하기</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

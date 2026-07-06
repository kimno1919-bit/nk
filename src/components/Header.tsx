"use client";

import Link from 'next/link';
import { Button } from './Button';
import { useState } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-line-gray bg-paper-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-6">
          
          {/* 모바일 햄버거 버튼 (좌측) */}
          <button 
            className="md:hidden p-2 -ml-2 text-deep-navy" 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* 로고 영역 (데스크탑: 좌측, 모바일: 중앙) */}
          <Link href="/" className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            {/* 실제 로고 이미지 적용 (사용자가 public/images/logo.png 배치 시 표시됨) */}
            <div className="relative h-[34px] w-[34px] hidden md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            {/* 모바일 텍스트 로고 항상 노출 */}
            <span className="font-serif font-bold text-[20px] md:text-[22px] text-deep-navy tracking-tight whitespace-nowrap">남북청년연합선교회</span>
          </Link>
          
          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex gap-8 font-sans font-medium text-[16px] text-ink-2">
            <Link href="/about" className="hover:text-deep-navy transition-colors">소개</Link>
            <Link href="/history" className="hover:text-deep-navy transition-colors">연혁</Link>
            <Link href="/ministry" className="hover:text-deep-navy transition-colors">사역</Link>
            <Link href="/album" className="hover:text-deep-navy transition-colors">앨범</Link>
            <Link href="/qt" className="hover:text-deep-navy transition-colors">3331 QT</Link>
            <Link href="/notice" className="hover:text-deep-navy transition-colors">공지사항</Link>
          </nav>
          
          {/* 우측 영역 (후원하기 버튼) */}
          <div className="flex items-center gap-4">
            <Link href="/support">
              <Button variant="primary" className="!py-2 !px-3 sm:!px-4 !text-[13px] sm:!text-[15px]">후원하기</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 모바일 사이드바 오버레이 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          {/* 반투명 배경 */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          
          {/* 사이드바 메뉴 패널 (따뜻한 색감: bg-paper-cream) */}
          <div className="relative w-64 h-full bg-paper-cream shadow-xl flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between p-5 border-b border-line-gray">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-serif font-bold text-lg text-deep-navy">메뉴</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-ink-2 hover:text-deep-navy">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-5 gap-6 text-lg font-bold text-ink-2">
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>소개</Link>
              <Link href="/history" onClick={() => setIsMobileMenuOpen(false)}>연혁</Link>
              <Link href="/ministry" onClick={() => setIsMobileMenuOpen(false)}>사역</Link>
              <Link href="/album" onClick={() => setIsMobileMenuOpen(false)}>앨범</Link>
              <Link href="/qt" onClick={() => setIsMobileMenuOpen(false)}>3331 QT</Link>
              <Link href="/notice" onClick={() => setIsMobileMenuOpen(false)}>공지사항</Link>
            </nav>
            <div className="mt-auto p-5 border-t border-line-gray">
              <Link href="/support" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">후원하기</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

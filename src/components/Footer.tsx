import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-deep-navy text-white mt-auto">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif font-bold text-[20px] tracking-tight">남북청년연합선교회</span>
            </div>
            <p className="text-white/80 font-sans text-[15px] leading-relaxed mb-4">
              남과 북의 청년, 복음 안에서.<br />
              지역사회 봉사와 세계 복음화를 꿈꾸는 남북청년연합선교 단체입니다.
            </p>
            <p className="text-white/60 font-sans text-[14px] leading-relaxed">
              대표: 조여호수아 선교사<br />
              소속: 기독교한국침례회 해외선교회(FMB)<br />
              전화: 010-9064-2242<br />
              이메일: kimno1919@gmail.com<br />
              소재지: 서울 강남구 학동로101길 26 청담삼익쇼핑상가 304-1호
            </p>
          </div>
          
          <div>
            <h3 className="font-serif font-bold text-[18px] mb-5 text-warm-sand">바로가기</h3>
            <ul className="space-y-3 font-sans text-[15px] text-white/80">
              <li><Link href="/about" className="hover:text-white transition-colors">기관 소개</Link></li>
              <li><Link href="/history" className="hover:text-white transition-colors">연혁</Link></li>
              <li><Link href="/ministry" className="hover:text-white transition-colors">사역 안내</Link></li>
              <li><Link href="/qt" className="hover:text-white transition-colors">3331 생명의 QT</Link></li>
              <li><Link href="/notice" className="hover:text-white transition-colors">공지사항</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-bold text-[18px] mb-5 text-warm-sand">후원 안내</h3>
            <p className="font-sans text-[15px] text-white/80 leading-relaxed mb-3">
              정기 후원 및 일시 후원과 관련하여 궁금하신 점이 있다면 언제든 문의해 주세요.
            </p>
            <p className="font-sans text-[15px] text-white/80 leading-relaxed mb-4">
              <span className="block font-medium text-white mb-1">카카오뱅크 3333-14-1526995</span>
              예금주: 김재현 (남북청년연합선교회)
            </p>
            <Link href="/support" className="inline-block text-[14px] text-warm-sand underline underline-offset-4 hover:text-white transition-colors">
              재정 사용 안내 보기
            </Link>
          </div>
        </div>
        
        <div className="mt-16 border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-white/60 font-sans">
          <p>© 2026 NK Youth Mission. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
            <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

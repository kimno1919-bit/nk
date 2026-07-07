"use client";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useState } from "react";

export default function SupportPage() {
  const [copied, setCopied] = useState(false);
  const accountInfo = "3333-14-1526995";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountInfo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("클립보드 복사에 실패했습니다. 수동으로 복사해주세요.");
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 min-h-screen bg-paper-cream">
      <section className="bg-deep-navy pt-24 pb-20 px-5 text-center text-white">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl mb-6">후원 안내</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
          여러분의 귀한 후원이 모여 남북 청년들을 영적 리더로 세우는 밑거름이 됩니다.<br />
          사역은 후원으로 이어집니다.
        </p>
      </section>

      <div className="mx-auto max-w-[800px] w-full px-5 -mt-10 relative z-10">
        <Card className="!p-8 sm:!p-12 shadow-lg shadow-black/5 text-center bg-white border-line-gray">
          <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-sm font-bold rounded mb-6 tracking-widest">DONATION ACCOUNT</span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-deep-navy mb-8">후원 계좌</h2>
          
          <div className="bg-warm-sand/50 rounded-xl p-8 mb-8 border border-line-gray">
            <p className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-2">카카오뱅크 {accountInfo}</p>
            <p className="text-ink-2 font-medium">예금주: 김재현 (남북청년연합선교회)</p>
          </div>

          <Button 
            onClick={handleCopy} 
            variant="primary" 
            className="w-full sm:w-auto min-w-[200px] !h-14 !text-lg"
          >
            {copied ? "복사 완료!" : "계좌번호 복사하기"}
          </Button>
        </Card>

        <div className="mt-16 space-y-12">
          <section>
            <h3 className="font-serif font-bold text-2xl text-deep-navy mb-6">재정 사용 안내</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 p-6 bg-white rounded border border-line-gray">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                  <span className="text-terracotta font-bold text-sm">01</span>
                </div>
                <div>
                  <h4 className="font-bold text-ink text-lg mb-2">돌봄 사역 지원</h4>
                  <p className="text-ink-2 leading-relaxed">탈북 청년들의 안정적인 정착을 돕고 친교 모임을 위한 식비 및 장소 대관료로 사용됩니다.</p>
                </div>
              </li>
              <li className="flex gap-4 p-6 bg-white rounded border border-line-gray">
                <div className="w-10 h-10 rounded-full bg-deep-navy/10 flex items-center justify-center shrink-0">
                  <span className="text-deep-navy font-bold text-sm">02</span>
                </div>
                <div>
                  <h4 className="font-bold text-ink text-lg mb-2">양육 사역 지원</h4>
                  <p className="text-ink-2 leading-relaxed">3331 생명의 큐티 교재 제작 및 리더십 캠프, 말씀 훈련 프로그램 운영비로 사용됩니다.</p>
                </div>
              </li>
              <li className="flex gap-4 p-6 bg-white rounded border border-line-gray">
                <div className="w-10 h-10 rounded-full bg-pine-green/10 flex items-center justify-center shrink-0">
                  <span className="text-pine-green font-bold text-sm">03</span>
                </div>
                <div>
                  <h4 className="font-bold text-ink text-lg mb-2">선교 및 전도 지원</h4>
                  <p className="text-ink-2 leading-relaxed">국내외 단기 선교 파송 및 노방 전도 시 필요한 물품 구입비로 사용됩니다.</p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-serif font-bold text-2xl text-deep-navy mb-6">후원 문의</h3>
            <div className="bg-white p-8 rounded border border-line-gray">
              <p className="text-ink-2 leading-relaxed mb-4">
                정기 후원 및 일시 후원과 관련하여 궁금하신 점이 있다면 언제든 문의해 주세요.
              </p>
              <div className="space-y-2 font-medium text-ink">
                <p>전화: <span className="text-ink-2 ml-2">010-9064-2242</span></p>
                <p>이메일: <span className="text-ink-2 ml-2">kimno1919@gmail.com</span></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/Button";

export function CopyAccountButton() {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("3333-14-1526995");
      alert("카카오뱅크 3333-14-1526995 계좌번호가 복사되었습니다.");
    } catch (err) {
      alert("복사에 실패했습니다. 브라우저에서 클립보드 접근을 허용해주세요.");
    }
  };

  return (
    <Button 
      onClick={handleCopy} 
      variant="primary" 
      className="shrink-0 w-full sm:w-auto !py-3.5 !px-6 text-[15px] font-bold"
    >
      계좌번호 복사
    </Button>
  );
}

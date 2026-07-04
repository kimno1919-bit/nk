import { Card } from "@/components/Card";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function MinistryIndex() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-24 space-y-24">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-serif font-bold text-3xl text-deep-navy mb-6">관계가 곧 복음의 시작입니다.</h2>
        <p className="text-ink-2 leading-relaxed text-lg break-keep">
          남북청년연합선교회는 세 가지의 큰 축으로 청년들을 섬기고 훈련합니다.<br className="hidden sm:block" />
          서로를 돌보며 교제하고, 말씀과 기도로 양육받아, 세상으로 나아가는 일꾼을 세웁니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card bg="white" className="flex flex-col h-full !p-8">
          <span className="text-pine-green font-bold text-sm tracking-widest mb-4">CARE</span>
          <h3 className="font-serif font-bold text-3xl text-deep-navy mb-5">돌봄</h3>
          <p className="text-ink-2 leading-relaxed mb-8 flex-1">친교 모임, 스포츠 활동, 심방, 나눔</p>
          <Link href="/ministry/care">
            <Button variant="tertiary" className="w-full">자세히 보기</Button>
          </Link>
        </Card>
        <Card bg="white" className="flex flex-col h-full !p-8">
          <span className="text-pine-green font-bold text-sm tracking-widest mb-4">TRAINING</span>
          <h3 className="font-serif font-bold text-3xl text-deep-navy mb-5">양육</h3>
          <p className="text-ink-2 leading-relaxed mb-8 flex-1">기도 훈련, 3331 큐티, 봉사 활동</p>
          <Link href="/ministry/training">
            <Button variant="tertiary" className="w-full">자세히 보기</Button>
          </Link>
        </Card>
        <Card bg="white" className="flex flex-col h-full !p-8">
          <span className="text-pine-green font-bold text-sm tracking-widest mb-4">MISSION</span>
          <h3 className="font-serif font-bold text-3xl text-deep-navy mb-5">일꾼 세우기</h3>
          <p className="text-ink-2 leading-relaxed mb-8 flex-1">국내 전도, 해외 전도</p>
          <Link href="/ministry/mission">
            <Button variant="tertiary" className="w-full">자세히 보기</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

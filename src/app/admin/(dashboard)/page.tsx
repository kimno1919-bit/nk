import { Card } from "@/components/Card";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif font-bold text-3xl text-deep-navy mb-2">대시보드</h2>
        <p className="text-ink-2">남북청년연합선교회 관리자 시스템에 오신 것을 환영합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="!p-8 hover:border-deep-navy/30 transition-colors">
          <h3 className="font-bold text-xl text-ink mb-4">공지사항 관리</h3>
          <p className="text-ink-2 mb-6 leading-relaxed">
            새로운 공지사항을 작성하거나 기존 공지사항을 수정/삭제합니다.
          </p>
          <Link href="/admin/notice">
            <Button variant="primary" className="w-full">공지사항 관리 바로가기</Button>
          </Link>
        </Card>

        <Card className="!p-8 hover:border-deep-navy/30 transition-colors">
          <h3 className="font-bold text-xl text-ink mb-4">연혁 관리</h3>
          <p className="text-ink-2 mb-6 leading-relaxed">
            단체의 발자취를 연도별로 정리하고 관리합니다.
          </p>
          <Link href="/admin/history">
            <Button variant="secondary" className="w-full">연혁 관리 바로가기</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

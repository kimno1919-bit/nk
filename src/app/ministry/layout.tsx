import { MinistryTabs } from "./MinistryTabs";

export default function MinistryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-paper-cream">
      <section className="pt-20 pb-16 px-5 text-center bg-deep-navy text-white">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl mb-6">사역 안내</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
          돌봄, 양육, 일꾼 세우기의 3대 사역을 통해 하나님 나라를 확장해 나갑니다.
        </p>
      </section>
      <MinistryTabs />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

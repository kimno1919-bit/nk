import Image from "next/image";

export default function MinistryMissionPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-5 py-24">
      <div className="mb-16">
        <span className="text-pine-green font-bold text-sm tracking-widest mb-4 block">MISSION</span>
        <h2 className="font-serif font-bold text-4xl text-deep-navy mb-6">일꾼 세우기</h2>
        <p className="text-ink-2 leading-relaxed text-lg break-keep max-w-2xl">
          남북청년들은 복음의 길 위에 섭니다. 국내 전도와 해외 전도로 복음을 전하며 영적 리더로 성장합니다.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <h3 className="font-serif font-bold text-2xl text-deep-navy mb-4">주요 활동</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="bg-white p-6 rounded border border-line-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default flex flex-col">
              <div className="relative w-full h-48 rounded mb-4 overflow-hidden border border-line-gray/50">
                <Image src="/images/mission-domestic.jpg" alt="국내 전도" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-ink mb-2 text-lg">국내 전도</h4>
              <p className="text-ink-2 text-sm leading-relaxed">한강 대교, 마포 대교 등에서 노방 전도를 통해 생명을 살리는 사역을 감당합니다.</p>
            </li>
            <li className="bg-white p-6 rounded border border-line-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default flex flex-col">
              <div className="relative w-full h-48 rounded mb-4 overflow-hidden border border-line-gray/50">
                <Image src="/images/mission-overseas.jpg" alt="해외 전도" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-ink mb-2 text-lg">해외 전도</h4>
              <p className="text-ink-2 text-sm leading-relaxed">열방을 향해 나아가 복음을 전파하며 세계 선교의 비전을 품습니다.</p>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-serif font-bold text-2xl text-deep-navy mb-6">전도 사역 현장</h3>
          <div className="rounded-xl overflow-hidden shadow-lg border border-line-gray relative h-[400px] w-full group">
            <Image 
              src="/images/mission.jpg" 
              alt="전도 사역 현장" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-medium text-lg drop-shadow-md">열방을 향해 생명의 복음을 들고 나아가는 발걸음</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

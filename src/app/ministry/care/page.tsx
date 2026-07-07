import Image from "next/image";

export default function MinistryCarePage() {
  return (
    <div className="mx-auto max-w-[1000px] px-5 py-24">
      <div className="mb-16">
        <span className="text-pine-green font-bold text-sm tracking-widest mb-4 block">CARE</span>
        <h2 className="font-serif font-bold text-4xl text-deep-navy mb-6">돌봄</h2>
        <p className="text-ink-2 leading-relaxed text-lg break-keep max-w-2xl">
          남한과 북녘에서 온 청년들이 서로의 자리에 앉아 밥을 먹고, 뛰고, 이야기를 나눕니다. 관계가 곧 복음의 시작입니다.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <h3 className="font-serif font-bold text-2xl text-deep-navy mb-4">주요 활동</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="bg-white p-6 rounded border border-line-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default flex flex-col">
              <div className="relative w-full h-48 rounded mb-4 overflow-hidden border border-line-gray/50">
                <Image src="/images/care-fellowship.jpg" alt="친교 모임" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-ink mb-2 text-lg">친교 모임</h4>
              <p className="text-ink-2 text-sm leading-relaxed">정기적인 식사와 교제를 통해 서로의 삶을 나눕니다.</p>
            </li>
            <li className="bg-white p-6 rounded border border-line-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default flex flex-col">
              <div className="relative w-full h-48 rounded mb-4 overflow-hidden border border-line-gray/50">
                <Image src="/images/care-sports.jpg" alt="스포츠 활동" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-ink mb-2 text-lg">스포츠 활동</h4>
              <p className="text-ink-2 text-sm leading-relaxed">축구, 등산, 낚시 등의 스포츠 모임을 통해 힐링과 기쁨을 누리는 교제를 이어갑니다.</p>
            </li>
            <li className="bg-white p-6 rounded border border-line-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default flex flex-col">
              <div className="relative w-full h-48 rounded mb-4 overflow-hidden border border-line-gray/50">
                <Image src="/images/care-visitation.jpg" alt="심방 및 나눔" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-ink mb-2 text-lg">심방 및 나눔</h4>
              <p className="text-ink-2 text-sm leading-relaxed">도움이 필요한 청년들을 찾아가 위로하고 필요한 것을 나눕니다.</p>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-serif font-bold text-2xl text-deep-navy mb-6">돌봄 사역 현장</h3>
          <div className="rounded-xl overflow-hidden shadow-lg border border-line-gray relative h-[400px] w-full group">
            <Image 
              src="/images/care.jpg" 
              alt="돌봄 사역 현장" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-medium text-lg drop-shadow-md">따뜻한 교제와 나눔이 있는 돌봄의 시간</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

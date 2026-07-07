import Image from "next/image";

export default function MinistryTrainingPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-5 py-24">
      <div className="mb-16">
        <span className="text-pine-green font-bold text-sm tracking-widest mb-4 block">TRAINING</span>
        <h2 className="font-serif font-bold text-4xl text-deep-navy mb-6">양육</h2>
        <p className="text-ink-2 leading-relaxed text-lg break-keep max-w-2xl">
          기도로 뿌리내리고 말씀으로 자라나 마음을 움직입니다. 기도모임과 3331 생명의 큐티를 통해 훈련의 과정을 거칩니다.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <h3 className="font-serif font-bold text-2xl text-deep-navy mb-4">주요 활동</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="bg-white p-6 rounded border border-line-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default flex flex-col">
              <div className="relative w-full h-48 rounded mb-4 overflow-hidden border border-line-gray/50">
                <Image src="/images/training-prayer.jpg" alt="기도 모임" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-ink mb-2 text-lg">기도 모임</h4>
              <p className="text-ink-2 text-sm leading-relaxed">매주 수요일 기도모임을 통해 말씀을 나누고 함께 기도합니다.</p>
            </li>
            <li className="bg-white p-6 rounded border border-line-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default flex flex-col">
              <div className="relative w-full h-48 rounded mb-4 overflow-hidden border border-line-gray/50">
                <Image src="/images/training-word.jpg" alt="말씀 훈련 (3331 큐티)" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-ink mb-2 text-lg">말씀 훈련 (3331 큐티)</h4>
              <p className="text-ink-2 text-sm leading-relaxed">하루 10구절씩 묵상합니다.</p>
            </li>
            <li className="bg-white p-6 rounded border border-line-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default flex flex-col">
              <div className="relative w-full h-48 rounded mb-4 overflow-hidden border border-line-gray/50">
                <Image src="/images/training-volunteer.jpg" alt="봉사 활동" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-ink mb-2 text-lg">봉사 활동</h4>
              <p className="text-ink-2 text-sm leading-relaxed">매년 연탄봉사를 통해 예수님의 따뜻한 온기를 전합니다.</p>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-serif font-bold text-2xl text-deep-navy mb-6">양육 사역 현장</h3>
          <div className="rounded-xl overflow-hidden shadow-lg border border-line-gray relative h-[400px] w-full group">
            <Image 
              src="/images/training.jpg" 
              alt="양육 사역 현장" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-medium text-lg drop-shadow-md">기도와 말씀으로 채워가는 경건의 훈련</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

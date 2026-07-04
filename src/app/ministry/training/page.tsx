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
            <li className="bg-white p-6 rounded border border-line-gray">
              <h4 className="font-bold text-ink mb-2 text-lg">기도 훈련</h4>
              <p className="text-ink-2 text-sm leading-relaxed">매주 수요일 기도모임을 통해 중보 기도의 힘을 배웁니다.</p>
            </li>
            <li className="bg-white p-6 rounded border border-line-gray">
              <h4 className="font-bold text-ink mb-2 text-lg">말씀 훈련 (3331 큐티)</h4>
              <p className="text-ink-2 text-sm leading-relaxed">하루 3장씩 3번 반복, 1장 필사하는 생명의 큐티로 말씀을 깊이 묵상합니다.</p>
            </li>
            <li className="bg-white p-6 rounded border border-line-gray">
              <h4 className="font-bold text-ink mb-2 text-lg">봉사 활동</h4>
              <p className="text-ink-2 text-sm leading-relaxed">연탄 나눔 등 지역 사회를 섬기며 예수님의 사랑을 실천합니다.</p>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-serif font-bold text-2xl text-deep-navy mb-4">활동 갤러리</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 임시 갤러리 플레이스홀더 */}
            <div className="aspect-[4/3] bg-line-gray/30 rounded flex items-center justify-center text-ink-2 text-sm">이미지 1</div>
            <div className="aspect-[4/3] bg-line-gray/30 rounded flex items-center justify-center text-ink-2 text-sm">이미지 2</div>
            <div className="aspect-[4/3] bg-line-gray/30 rounded flex items-center justify-center text-ink-2 text-sm">이미지 3</div>
          </div>
        </section>
      </div>
    </div>
  );
}

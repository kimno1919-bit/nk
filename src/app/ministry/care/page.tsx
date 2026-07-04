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
            <li className="bg-white p-6 rounded border border-line-gray">
              <h4 className="font-bold text-ink mb-2 text-lg">친교 모임</h4>
              <p className="text-ink-2 text-sm leading-relaxed">정기적인 식사와 교제를 통해 서로의 삶을 나눕니다.</p>
            </li>
            <li className="bg-white p-6 rounded border border-line-gray">
              <h4 className="font-bold text-ink mb-2 text-lg">스포츠 활동</h4>
              <p className="text-ink-2 text-sm leading-relaxed">NKFC 남북청년 축구팀 등 스포츠를 통한 건강한 교류를 이어갑니다.</p>
            </li>
            <li className="bg-white p-6 rounded border border-line-gray">
              <h4 className="font-bold text-ink mb-2 text-lg">심방 및 나눔</h4>
              <p className="text-ink-2 text-sm leading-relaxed">어려움에 처한 청년들을 찾아가 위로하고 필요한 것을 나눕니다.</p>
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

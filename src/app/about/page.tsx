import { Card } from "@/components/Card";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full pb-24">
      {/* 헤더 영역 */}
      <section className="bg-deep-navy text-white pt-24 pb-16 px-5 text-center">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl mb-6">기관 소개</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
          하나님의 사랑을 실천하며 영혼 사랑과 섬김, 나눔, 화합으로 지역사회 봉사와 세계 복음화를 꿈꾸는 남북청년연합선교 단체입니다.
        </p>
      </section>

      <div className="mx-auto max-w-[800px] w-full px-5 mt-16 space-y-24">
        
        {/* 대표 인사말 */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-terracotta font-bold tracking-widest text-sm">GREETING</span>
            <div className="h-[1px] flex-1 bg-line-gray"></div>
          </div>
          <h2 className="font-serif font-bold text-3xl text-deep-navy mb-8">대표 인사말</h2>
          <div className="space-y-6 text-[17px] text-ink-2 leading-[1.8] break-keep">
            <p>
              현재 남북 분단 70년의 아픔의 현실 속에서, 북녘땅에는 독재 체제와 경제적 어려움으로 백성들이 고통을 당하고 있습니다. 하나님은 환경을 통하여 현재 3만 5천 명의 새터민을 남한에 이미 보내셨습니다. 그들은 북한에 복음을 가장 쉽게 전할 복음의 통로이며, 요셉처럼 고향의 가족들을 살리기 위해 먼저 건너온 마중물입니다.
            </p>
            <p>
              이 홈페이지는 남북 청년들의 영적 놀이터가 될 것입니다. 누구나 오셔서 쉬고 놀면서 함께 복음 안에서 통일의 기쁨을 누리는 특권을 드리고 싶습니다.
            </p>
          </div>
          <div className="mt-10 text-right">
            <span className="block text-ink font-bold text-lg">남북청년연합선교회 대표</span>
            <span className="block font-serif font-bold text-2xl text-deep-navy mt-1">조여호수아 선교사</span>
          </div>
        </section>

        {/* 비전 및 미션 */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-terracotta font-bold tracking-widest text-sm">VISION & MISSION</span>
            <div className="h-[1px] flex-1 bg-line-gray"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card bg="warm-sand" className="!p-8">
              <h3 className="font-serif font-bold text-2xl text-deep-navy mb-4">비전 (Vision)</h3>
              <p className="text-ink-2 leading-relaxed text-[16px] break-keep">
                남과 북의 청년들이 복음 안에서 하나되어 통일 한국의 영적 리더로 세워지는 것을 꿈꿉니다.
              </p>
            </Card>
            <Card bg="warm-sand" className="!p-8">
              <h3 className="font-serif font-bold text-2xl text-deep-navy mb-4">미션 (Mission)</h3>
              <p className="text-ink-2 leading-relaxed text-[16px] break-keep">
                돌봄과 양육을 통해 예수 그리스도의 제자로 훈련하고, 전도와 봉사로 세상에 사랑을 실천합니다.
              </p>
            </Card>
          </div>
        </section>

        {/* 대표 성구 */}
        <section className="bg-paper-cream border border-line-gray rounded-xl p-10 sm:p-16 text-center">
          <span className="text-pine-green font-bold text-sm tracking-widest mb-6 block">REPRESENTATIVE VERSE</span>
          <p className="font-serif italic text-2xl sm:text-3xl text-deep-navy leading-relaxed break-keep">
            "하늘에 있는 것이나 땅에 있는 것이 다 그리스도 안에서 통일되게 하려 하심이라"
          </p>
          <span className="block mt-8 text-ink-2 font-medium text-lg">— 에베소서 1:10</span>
        </section>

        {/* 오시는 길 */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-terracotta font-bold tracking-widest text-sm">LOCATION</span>
            <div className="h-[1px] flex-1 bg-line-gray"></div>
          </div>
          <h2 className="font-serif font-bold text-3xl text-deep-navy mb-8">오시는 길</h2>
          <div className="w-full h-[400px] bg-line-gray/30 rounded-xl flex items-center justify-center text-ink-2 mb-6 border border-line-gray">
            {/* 실제 지도 임베드 시 iframe으로 교체 */}
            <p>지도 임베드 영역 (서울특별시 사당동 성전)</p>
          </div>
          <div className="bg-warm-sand/50 p-6 rounded-lg border border-line-gray">
            <h4 className="font-bold text-lg text-ink mb-2">남북청년연합선교회 (사당동 성전)</h4>
            <p className="text-ink-2 leading-relaxed">
              서울특별시 사당동 OOO-OO<br />
              <span className="text-sm mt-2 block opacity-80">* 대중교통 이용 시 4호선 사당역 X번 출구에서 도보 10분</span>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

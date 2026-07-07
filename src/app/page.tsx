import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: latestQts } = await supabase
    .from("qts")
    .select("*")
    .eq("is_public", true)
    .order("date", { ascending: false })
    .limit(3);
  const { data: latestAlbums } = await supabase
    .from("albums")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="bg-paper-cream px-5 py-20 sm:py-32">
        <div className="mx-auto max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h1 className="font-serif font-bold text-4xl sm:text-[56px] text-deep-navy leading-[1.3] tracking-tight">
              남과 북의 청년,<br />
              복음 안에서.
            </h1>
            <p className="text-lg sm:text-xl text-ink-2 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              먼저 건너온 청년들과 남한의 청년들이 함께 걷습니다.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Link href="/ministry">
                <Button variant="secondary" className="h-14 px-8 text-lg">사역 둘러보기</Button>
              </Link>
              <Link href="/support">
                <Button variant="primary" className="h-14 px-8 text-lg">후원하기</Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
            <div className="border-l-4 border-terracotta pl-6 lg:pl-8 py-2">
              <p className="font-serif italic text-2xl sm:text-[28px] text-deep-navy leading-relaxed break-keep">
                "하늘에 있는 것이나 땅에 있는 것이 다 그리스도 안에서 통일되게 하려 하심이라"
              </p>
              <p className="mt-6 text-ink-2 font-medium text-lg">— 에베소서 1장 10절</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 핵심 사역 3분할 */}
      <section className="py-24 px-5 bg-white">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-[40px] text-deep-navy mb-4">핵심 사역</h2>
            <p className="text-ink-2 text-lg">남북청년연합선교회의 세 가지 주요 사역 방향입니다.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Link href="/ministry/care" className="block h-full group">
              <Card bg="warm-sand" className="flex flex-col h-full !p-8 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                <span className="text-pine-green font-bold text-sm mb-4 tracking-widest uppercase">01. Care</span>
                <h3 className="font-serif font-bold text-3xl text-deep-navy mb-5 group-hover:text-terracotta transition-colors">돌봄</h3>
                <p className="text-ink-2 leading-relaxed mb-8 flex-1 text-[16px]">
                  남한과 북녘에서 온 청년들이 서로의 자리에 앉아 밥을 먹고, 뛰고, 이야기를 나눕니다. 관계가 곧 복음의 시작입니다.
                </p>
                <ul className="space-y-3 text-[15px] text-ink font-medium">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span> 친교 모임</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span> 스포츠 활동</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span> 심방 및 나눔</li>
                </ul>
              </Card>
            </Link>
            <Link href="/ministry/training" className="block h-full group">
              <Card bg="warm-sand" className="flex flex-col h-full !p-8 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                <span className="text-pine-green font-bold text-sm mb-4 tracking-widest uppercase">02. Training</span>
                <h3 className="font-serif font-bold text-3xl text-deep-navy mb-5 group-hover:text-deep-navy/70 transition-colors">양육</h3>
                <p className="text-ink-2 leading-relaxed mb-8 flex-1 text-[16px]">
                  기도로 뿌리내리고 말씀으로 자라나 마음을 움직입니다. 기도모임과 3331 생명의 큐티를 통해 훈련의 과정을 거칩니다.
                </p>
                <ul className="space-y-3 text-[15px] text-ink font-medium">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-deep-navy shrink-0"></span> 기도 모임</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-deep-navy shrink-0"></span> 말씀 훈련 (3331 큐티)</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-deep-navy shrink-0"></span> 봉사 활동 (연탄 나눔 등)</li>
                </ul>
              </Card>
            </Link>
            <Link href="/ministry/mission" className="block h-full group">
              <Card bg="warm-sand" className="flex flex-col h-full !p-8 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                <span className="text-pine-green font-bold text-sm mb-4 tracking-widest uppercase">03. Mission</span>
                <h3 className="font-serif font-bold text-3xl text-deep-navy mb-5 group-hover:text-pine-green transition-colors">일꾼 세우기</h3>
                <p className="text-ink-2 leading-relaxed mb-8 flex-1 text-[16px]">
                  남북청년들은 복음의 길 위에 섭니다. 국내 전도와 해외 전도로 복음을 전합니다.
                </p>
                <ul className="space-y-3 text-[15px] text-ink font-medium">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-pine-green shrink-0"></span> 국내 전도 (한강 대교 등)</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-pine-green shrink-0"></span> 해외 전도</li>
                </ul>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 최근 사역 활동 (연혁) & 4. 3331 QT 프리뷰 */}
      <section className="py-24 px-5 bg-paper-cream border-t border-line-gray">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* 최근 사역 활동 */}
          <div>
            <div className="flex items-end justify-between mb-10 border-b border-line-gray pb-4">
              <h2 className="font-serif font-bold text-[28px] text-deep-navy">최근 사역 활동</h2>
              <Link href="/history" className="text-sm font-medium text-ink-2 hover:text-deep-navy flex items-center gap-1 transition-colors">
                전체 보기 <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="space-y-8">
              {/* 항목 1 */}
              <div className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-line-gray group-hover:bg-deep-navy transition-colors mt-1.5"></div>
                  <div className="w-[1px] h-full bg-line-gray group-hover:bg-deep-navy/30 transition-colors mt-2"></div>
                </div>
                <div className="pb-2">
                  <span className="text-[13px] text-terracotta font-bold tracking-wider">2026. 03</span>
                  <h4 className="text-[18px] font-bold text-ink mt-1.5">리더십 캠프</h4>
                  <p className="text-ink-2 mt-2 text-[15px] leading-relaxed">남북 청년 리더들이 모여 훈련과 교제를 나누는 캠프를 진행했습니다.</p>
                </div>
              </div>

              {/* 항목 2 */}
              <div className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-line-gray group-hover:bg-deep-navy transition-colors mt-1.5"></div>
                  <div className="w-[1px] h-full bg-line-gray group-hover:bg-deep-navy/30 transition-colors mt-2"></div>
                </div>
                <div className="pb-2">
                  <span className="text-[13px] text-terracotta font-bold tracking-wider">2026. 02</span>
                  <h4 className="text-[18px] font-bold text-ink mt-1.5">사랑의 연탄 봉사활동</h4>
                  <p className="text-ink-2 mt-2 text-[15px] leading-relaxed">추운 겨울, 이웃들에게 따뜻한 연탄과 예수님의 사랑을 전했습니다.</p>
                </div>
              </div>

              {/* 항목 3 */}
              <div className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-line-gray group-hover:bg-deep-navy transition-colors mt-1.5"></div>
                  <div className="w-[1px] h-full bg-line-gray group-hover:bg-deep-navy/30 transition-colors mt-2"></div>
                </div>
                <div className="pb-2">
                  <span className="text-[13px] text-terracotta font-bold tracking-wider">2025. 11</span>
                  <h4 className="text-[18px] font-bold text-ink mt-1.5">석OO 감독 독립영화 초연 시사회</h4>
                  <p className="text-ink-2 mt-2 text-[15px] leading-relaxed">청년들이 함께 모여 문화 활동과 교제를 가졌습니다.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3331 QT 프리뷰 */}
          <div>
            <div className="flex items-end justify-between mb-10 border-b border-line-gray pb-4">
              <h2 className="font-serif font-bold text-[28px] text-deep-navy">3331 생명의 QT</h2>
              <Link href="/qt" className="text-sm font-medium text-ink-2 hover:text-deep-navy flex items-center gap-1 transition-colors">
                아카이브 <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {latestQts && latestQts.length > 0 ? (
                latestQts.map((qt) => (
                  <Link href={`/qt?id=${qt.id}`} key={qt.id} className="block">
                    <Card className="hover:border-deep-navy transition-colors cursor-pointer group !p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="px-2.5 py-1 bg-pine-green/10 text-pine-green text-[13px] font-bold rounded">{qt.book} {qt.chapter}</span>
                        <span className="text-[13px] text-ink-2">{qt.date}</span>
                      </div>
                      <h4 className="font-serif font-bold text-xl text-ink group-hover:text-deep-navy transition-colors">
                        {qt.title}
                      </h4>
                      <p className="text-ink-2 text-[15px] mt-3 line-clamp-2 leading-relaxed">
                        {qt.content}
                      </p>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="text-ink-2 text-center py-8 bg-white border border-line-gray rounded-xl shadow-sm">
                  등록된 QT 묵상글이 없습니다.
                </div>
              )}
            </div>
          </div>
          
        </div>
      </section>

      {/* 최근 앨범 프리뷰 */}
      <section className="py-24 px-5 bg-white border-t border-line-gray">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-end justify-between mb-10 pb-4 border-b border-line-gray">
            <h2 className="font-serif font-bold text-[28px] text-deep-navy">사역 앨범</h2>
            <Link href="/album" className="text-sm font-medium text-ink-2 hover:text-deep-navy flex items-center gap-1 transition-colors">
              전체 보기 <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestAlbums && latestAlbums.length > 0 ? (
              latestAlbums.map((album) => {
                const urls = (album.media_urls && album.media_urls.length > 0) 
                  ? album.media_urls 
                  : (album.media_url ? [album.media_url] : []);
                const thumbnail = urls[0];

                return (
                  <Link href={`/album?id=${album.id}`} key={album.id} className="block group h-full">
                    <div className="bg-white rounded-xl border border-line-gray overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                      <div className="w-full aspect-square bg-line-gray/30 relative overflow-hidden flex-shrink-0">
                        {thumbnail ? (
                          thumbnail.match(/\.(mp4|webm)$/i) ? (
                            <div className="w-full h-full flex items-center justify-center bg-black/10">
                              <span className="text-4xl">▶️</span>
                            </div>
                          ) : (
                            <img src={thumbnail} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-ink-2/50 font-bold">No Image</div>
                        )}
                        {urls.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded font-bold">
                            +{urls.length - 1}
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <span className="text-[12px] font-bold text-ink-2 mb-2">{new Date(album.created_at).toLocaleDateString()}</span>
                        <h4 className="font-serif font-bold text-lg text-ink group-hover:text-deep-navy transition-colors line-clamp-2">
                          {album.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-ink-2 text-center py-12 bg-paper-cream border border-line-gray rounded-xl shadow-sm">
                등록된 앨범이 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. 후원 CTA 섹션 */}
      <section className="bg-deep-navy text-white py-24 px-5">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="font-serif font-bold text-3xl sm:text-[40px] mb-6 tracking-tight">사역은 후원으로 이어집니다.</h2>
          <p className="text-white/80 text-[17px] mb-12 leading-relaxed break-keep">
            여러분의 소중한 후원이 남과 북의 청년들을 복음 안에서 하나 되게 하고, <br className="hidden sm:block" />
            이 땅의 작은 예수로 세워가는 귀한 밑거름이 됩니다.
          </p>
          
          <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 inline-block w-full sm:w-auto text-left">
            <span className="block text-warm-sand text-[13px] font-bold tracking-wider mb-3">후원 계좌 안내</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-8 justify-between">
              <div>
                <p className="text-[26px] font-bold tracking-tight mb-1">카카오뱅크 3333-14-1526995</p>
                <p className="text-white/70 text-[15px]">예금주: 김재현 (남북청년연합선교회)</p>
              </div>
              <Button variant="primary" className="shrink-0 w-full sm:w-auto !py-3.5 !px-6 text-[15px]">계좌번호 복사</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

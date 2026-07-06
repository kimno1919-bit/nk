import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const notoSerifKr = Noto_Serif_KR({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-noto-serif-kr",
});

export const metadata: Metadata = {
  title: "남북청년연합선교회 (NK Mission)",
  description: "남과 북의 청년, 복음 안에서. 지역사회 봉사와 세계 복음화를 꿈꾸는 남북청년연합선교 단체입니다.",
  keywords: ["남북청년연합선교회", "청년선교", "NK Mission", "북한선교", "통일선교", "크리스천 청년"],
  openGraph: {
    title: "남북청년연합선교회 (NK Mission)",
    description: "남과 북의 청년, 복음 안에서. 지역사회 봉사와 세계 복음화를 꿈꾸는 남북청년연합선교 단체입니다.",
    url: "https://nkmission.kr",
    siteName: "남북청년연합선교회",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "남북청년연합선교회 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "남북청년연합선교회 (NK Mission)",
    description: "남과 북의 청년, 복음 안에서. 지역사회 봉사와 세계 복음화를 꿈꾸는 남북청년연합선교 단체입니다.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  verification: {
    other: {
      "naver-site-verification": "1e7906d5ff1fd79a190244b5e7494dae76f09c6c",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSerifKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-paper-cream text-ink">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

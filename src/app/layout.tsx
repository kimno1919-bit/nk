import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import Script from "next/script";
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
    google: "gkodYQ4e5bcAJvmfwUN4At7mUPFsvgELvDNnNIGqVT0",
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
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TRNS6FPT');
          `}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FEFQ2NBRLG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FEFQ2NBRLG');
          `}
        </Script>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xilkaxciso");
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-sans bg-paper-cream text-ink">
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TRNS6FPT"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

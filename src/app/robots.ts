import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // 관리자 페이지는 검색 로봇이 못 들어오게 막음
    },
    sitemap: 'https://nkmission.kr/sitemap.xml',
  };
}

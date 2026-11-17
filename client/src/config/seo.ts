import { company } from "./company";

/**
 * ============================================================================
 * [중앙 집중형 SEO 관리 설정 파일 — 선진건설(주)]
 * 정식 도메인 연결, 검색엔진(네이버·구글·Bing) 소유권 인증 코드 등록,
 * 페이지별 검색 제목·설명·키워드·색인 여부 수정은 모두 이 파일 한 곳에서 관리합니다.
 * 웹사이트 접속 주소 뒤에 `?seo=1`을 붙이면 화면 내 [SEO 진단 인스펙터]가 열립니다.
 * ============================================================================
 */
export const seoConfig = {
  // 정식 도메인 연결 시 아래 주소만 변경하면 전체 canonical, sitemap.xml, rss.xml, robots.txt가 일괄 갱신됩니다.
  siteUrl: "https://eumditravel-oss.github.io/sample_site1/",
  siteName: company.name,
  locale: "ko_KR",
  language: "ko",
  lastModified: "2026-11-17",
  ogImage: "social-preview.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "선진건설(주) — 도로경계·보행포장·우수배수·부대토목 정밀시공 전문기업",
  defaultKeywords: [
    "선진건설",
    "선진건설(주)",
    "부대토목",
    "화강경계석시공",
    "보도블록시공",
    "투수블록포장",
    "점자블록시공",
    "U형측구시공",
    "배수로정비",
    "보강토옹벽보수",
  ],
  // 검색엔진 웹마스터 도구 소유권 확인 메타태그 코드 (발급받은 content 값만 입력하면 전 페이지 <head>에 자동 삽입)
  verification: {
    naver: null as string | null, // 예: "a1b2c3d4e5f6..." (네이버 서치어드바이저)
    google: null as string | null, // 예: "xyz123..." (Google Search Console)
    bing: null as string | null, // 예: "123ABC..." (Bing Webmaster Tools)
  },
} as const;

export const siteUrl = seoConfig.siteUrl;

export type SeoPageEntry = {
  title: string;
  description: string;
  keywords: string[];
  heading: string;
  breadcrumb: string;
  indexable: boolean;
  priority: string;
  changefreq: "weekly" | "monthly" | "yearly";
};

export const seoPages: Record<string, SeoPageEntry> = {
  "/": {
    title: "도시기반·도로경계·보행포장·배수관로 정밀시공 전문기업",
    description:
      "기초 측량부터 마감 검측까지 현장 기준을 지키는 도로경계·보행로 정비·우수배수·부대토목 전문건설기업 선진건설(주) 공식 웹사이트입니다.",
    keywords: ["선진건설", "도로경계석시공", "보행로포장", "우수배수로시공", "단지부대토목"],
    heading: "기초부터 마감선까지 현장 기준을 지키는 정밀 시공",
    breadcrumb: "홈",
    indexable: true,
    priority: "1.0",
    changefreq: "weekly",
  },
  "/company": {
    title: "회사소개 및 시공역량",
    description:
      "현장 조건을 먼저 실측 진단하고 기초·기층 다짐부터 시방 기준에 맞춰 정밀 시공하는 선진건설(주) 기업 개요와 3대 핵심 역량을 소개합니다.",
    keywords: ["선진건설 회사소개", "토목전문건설", "현장실측시공", "기초다짐시공"],
    heading: "회사소개",
    breadcrumb: "회사소개",
    indexable: true,
    priority: "0.9",
    changefreq: "monthly",
  },
  "/location": {
    title: "오시는길 및 현장 출장 실측 안내",
    description:
      "선진건설(주) 사업장 안내와 공공 가로·아파트 단지·공장·상업시설 등 주요 현장 방문 실측 및 시공 대응 절차를 안내합니다.",
    keywords: ["선진건설 오시는길", "현장출장실측", "토목보수상담", "단지보수시공"],
    heading: "오시는길",
    breadcrumb: "오시는길",
    indexable: true,
    priority: "0.8",
    changefreq: "monthly",
  },
  "/services/scope": {
    title: "전문 공정 범위 — 경계·포장·배수·유지보수",
    description:
      "화강경계석·도로 연석 시공, 투수·점자블록 보행포장, U형 측구·그레이팅 우수배수, 옹벽·외부기반 유지보수 등 4대 전문 시공 범위를 확인하세요.",
    keywords: ["화강경계석교체", "보도블록보수", "스틸그레이팅시공", "U형측구설치", "아스콘부분보수"],
    heading: "공정 범위",
    breadcrumb: "전문 공정 범위",
    indexable: true,
    priority: "0.9",
    changefreq: "monthly",
  },
  "/services/promise": {
    title: "고객과의 약속 및 현장 안전수칙",
    description:
      "포함·별도 내역의 투명한 사전 안내, 운영 단지 내 보행·차량 통행 안전 5대 수칙, 단계별 마감 검측을 실천하는 선진건설(주) 운영 원칙입니다.",
    keywords: ["토목견적기준", "현장안전관리", "보행자안전통로", "책임시공원칙"],
    heading: "고객과의 약속",
    breadcrumb: "고객과의 약속",
    indexable: true,
    priority: "0.8",
    changefreq: "monthly",
  },
  "/gallery": {
    title: "기술 및 시공 아카이브",
    description:
      "화강경계석 선형 유도, 투수블록 보조기층 다짐, 무장애(BF) 점자블록, U형 측구 배수 구배 등 공종별 핵심 시공 디테일과 검측 기준을 소개합니다.",
    keywords: ["경계석시공기준", "투수블록기층다짐", "무장애점자블록", "측구배수구배", "광파기검측"],
    heading: "기술 소개",
    breadcrumb: "기술 소개",
    indexable: true,
    priority: "0.8",
    changefreq: "monthly",
  },
  "/notices": {
    title: "공지사항 및 시공 품질 안내",
    description:
      "온라인 견적 문의 준비 사항, 우기·동절기 외부 포장 품질관리 기준, 통행 안전 운영 원칙 등 선진건설(주) 주요 안내 사항을 전합니다.",
    keywords: ["선진건설 공지사항", "토목시공안내", "동절기포장관리", "견적문의안내"],
    heading: "공지사항",
    breadcrumb: "공지사항",
    indexable: true,
    priority: "0.7",
    changefreq: "weekly",
  },
  "/notices/pre-check": {
    title: "상담 전 확인사항 체크리스트",
    description:
      "신속하고 정확한 현장 실측과 견적 검토를 위해 상담 신청 전 확인하면 좋은 현장 위치, 진입폭, 급수·전기 여건 등 자가 체크리스트입니다.",
    keywords: ["토목견적체크리스트", "현장실측준비", "보도블록견적문의", "배수로공사문의"],
    heading: "상담 전 확인사항",
    breadcrumb: "상담 전 확인사항",
    indexable: true,
    priority: "0.7",
    changefreq: "monthly",
  },
  "/consultation": {
    title: "온라인 견적·실측 상담 신청",
    description:
      "현장 위치, 필요 공정, 개략 수량과 희망 일정을 정리해 서버 저장 없이 안전하게 문의 초안을 작성하는 선진건설(주) 온라인상담 창구입니다.",
    keywords: ["선진건설 상담신청", "토목공사견적문의", "경계석견적", "보도블록시공문의"],
    heading: "온라인상담",
    breadcrumb: "온라인상담",
    indexable: true,
    priority: "0.8",
    changefreq: "monthly",
  },
  "/privacy": {
    title: "개인정보처리방침",
    description: "개인정보 보호법 제30조에 따른 선진건설(주) 공식 웹사이트 개인정보처리방침 법정 고시 안내입니다.",
    keywords: ["선진건설 개인정보처리방침"],
    heading: "개인정보처리방침",
    breadcrumb: "개인정보처리방침",
    indexable: false,
    priority: "0.3",
    changefreq: "yearly",
  },
  "/terms": {
    title: "이용약관",
    description: "선진건설(주) 공식 웹사이트 이용 조건, 권리·의무 및 책임 기준을 규정한 이용약관 고시입니다.",
    keywords: ["선진건설 이용약관"],
    heading: "이용약관",
    breadcrumb: "이용약관",
    indexable: false,
    priority: "0.3",
    changefreq: "yearly",
  },
  "/email-policy": {
    title: "이메일무단수집거부",
    description: "정보통신망법 제50조의2에 따른 선진건설(주) 웹사이트 이메일 주소 무단수집 거부 공식 고지입니다.",
    keywords: ["이메일무단수집거부"],
    heading: "이메일무단수집거부",
    breadcrumb: "이메일무단수집거부",
    indexable: false,
    priority: "0.3",
    changefreq: "yearly",
  },
};

export const seoAliases: Record<string, string> = {
  "/services": "/services/scope",
  "/consultation/list": "/consultation",
};

export function seoForPath(path: string) {
  const normalized = path.replace(/\/+$/, "") || "/";
  const canonicalPath = seoAliases[normalized] ?? normalized;
  const page = seoPages[canonicalPath];
  if (!page) return null;
  const isAlias = normalized !== canonicalPath;
  const url = canonicalPath === "/" ? siteUrl : `${siteUrl}${canonicalPath.slice(1)}/`;
  const ogImageUrl = `${siteUrl}${seoConfig.ogImage}`;
  const robots =
    page.indexable && !isAlias
      ? "index,follow,max-image-preview:large,max-snippet:-1"
      : page.indexable
        ? "index,follow"
        : "noindex,follow";
  return {
    ...page,
    routePath: normalized,
    canonicalPath,
    url,
    ogImageUrl,
    robots,
    keywordString: Array.from(new Set([...page.keywords, ...seoConfig.defaultKeywords])).join(", "),
    pageTitle: `${page.title} | ${company.name}`,
  };
}

export function indexableRoutes() {
  return Object.entries(seoPages)
    .filter(([, entry]) => entry.indexable)
    .map(([route]) => route);
}

export function structuredData(page: NonNullable<ReturnType<typeof seoForPath>>) {
  const orgId = `${siteUrl}#organization`;
  const siteId = `${siteUrl}#website`;

  const orgNode: Record<string, unknown> = {
    "@type": "GeneralContractor",
    "@id": orgId,
    name: company.name,
    legalName: company.legalName,
    alternateName: company.nameEn,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}seonjin-logo.png`,
    },
    image: page.ogImageUrl,
    knowsAbout: [
      "경계·도로 구조물 시공 (화강경계석·콘크리트 연석)",
      "보행환경·블록 포장 정비 (투수블록·인터로킹·무장애 점자블록)",
      "우수·배수로 및 관로 부대토목 (U형 측구·스틸그레이팅·집수정)",
      "외부 기반시설·옹벽 유지보수",
    ],
  };

  if (company.phone) orgNode.telephone = company.phone;
  if (company.email) orgNode.email = company.email;
  if (company.ceo) orgNode.founder = company.ceo;
  if (company.businessNumber) orgNode.taxID = company.businessNumber;
  if (company.address) {
    orgNode.address = {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressCountry: "KR",
    };
  }

  const breadcrumbItems: Array<{ "@type": string; position: number; name: string; item: string }> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "홈",
      item: siteUrl,
    },
  ];
  if (page.canonicalPath !== "/") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: page.breadcrumb,
      item: page.url,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      orgNode,
      {
        "@type": "WebSite",
        "@id": siteId,
        name: company.name,
        alternateName: company.nameEn,
        url: siteUrl,
        publisher: { "@id": orgId },
        inLanguage: "ko-KR",
      },
      {
        "@type": "WebPage",
        "@id": `${page.url}#webpage`,
        url: page.url,
        name: page.pageTitle,
        description: page.description,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        breadcrumb: { "@id": `${page.url}#breadcrumb` },
        inLanguage: "ko-KR",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${page.url}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
    ],
  };
}

import { company } from "./company";

export const siteUrl = "https://eumditravel-oss.github.io/sample_site1/";

export const seoPages: Record<string, { title: string; description: string; heading: string }> = {
  "/": {
    title: "도시기반·도로경계·보행포장·배수관로 정밀시공 전문기업",
    description: "기초 측량부터 마감 검측까지 현장 기준을 지키는 도로경계·보행로 정비·배수관로·부대토목 전문 선진건설(주)",
    heading: "기초부터 마감선까지 현장 기준을 지키는 정밀 시공",
  },
  "/company": {
    title: "회사소개",
    description: "현장 조건을 먼저 진단하고 시방 기준에 맞춰 정밀 시공하는 선진건설(주) 기업 소개 및 개요",
    heading: "회사소개",
  },
  "/location": {
    title: "오시는길 및 현장 대응 안내",
    description: "선진건설(주) 사업장 위치 안내 및 현장 방문 실측·상담 진행 절차",
    heading: "오시는길",
  },
  "/services/scope": {
    title: "전문 공정 범위",
    description: "경계 구조물, 보행로·블록 포장, 우수·배수로 정비, 외부 기반시설 보수 등 선진건설(주) 시공 범위 안내",
    heading: "공정 범위",
  },
  "/services/promise": {
    title: "고객과의 약속 및 안전기준",
    description: "투명한 견적 기준, 통행 안전 보호 및 단계별 마감 검측을 실천하는 선진건설(주) 운영 원칙",
    heading: "고객과의 약속",
  },
  "/gallery": {
    title: "기술 및 시공 가이드",
    description: "공종별 핵심 시공 디테일과 현장 검측 포인트를 소개하는 선진건설(주) 기술 아카이브",
    heading: "기술 소개",
  },
  "/notices": {
    title: "공지사항 및 시공 안내",
    description: "견적 문의 준비 사항, 계절별 품질관리 기준 및 현장 안전 운영 안내를 전하는 선진건설(주) 게시판",
    heading: "공지사항",
  },
  "/notices/pre-check": {
    title: "상담 전 확인사항",
    description: "신속하고 정확한 현장 실측·견적 검토를 위해 상담 전 확인하면 좋은 자가 체크리스트",
    heading: "상담 전 확인사항",
  },
  "/consultation": {
    title: "온라인 견적·상담 신청",
    description: "현장 위치, 필요 공정, 희망 일정을 정리해 안전하게 문의 초안을 작성하는 선진건설(주) 온라인상담",
    heading: "온라인상담",
  },
  "/privacy": {
    title: "개인정보처리방침",
    description: "개인정보 보호법 제30조에 따른 선진건설(주) 웹사이트 개인정보처리방침 법정 고시",
    heading: "개인정보처리방침",
  },
  "/terms": {
    title: "이용약관",
    description: "선진건설(주) 웹사이트 이용 조건, 권리·의무 및 면책 기준을 규정한 이용약관",
    heading: "이용약관",
  },
  "/email-policy": {
    title: "이메일무단수집거부",
    description: "정보통신망법 제50조의2에 따른 선진건설(주) 웹사이트 이메일 주소 무단수집 거부 고지",
    heading: "이메일무단수집거부",
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
  const url = canonicalPath === "/" ? siteUrl : `${siteUrl}${canonicalPath.slice(1)}/`;
  return { ...page, canonicalPath, url, pageTitle: `${page.title} | ${company.name}` };
}

export function structuredData(page: NonNullable<ReturnType<typeof seoForPath>>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${siteUrl}#website`, name: company.name, url: siteUrl, inLanguage: "ko" },
      {
        "@type": "WebPage",
        "@id": `${page.url}#webpage`,
        url: page.url,
        name: page.pageTitle,
        description: page.description,
        isPartOf: { "@id": `${siteUrl}#website` },
        inLanguage: "ko",
      },
    ],
  };
}

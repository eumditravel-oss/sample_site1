# 선진건설(주) 공식 웹사이트

선진건설(주)의 도로·경계 구조물 시공, 보행환경·블록 포장 정비, 우수·배수관로 부대토목 및 외부 기반시설 유지보수 역량을 소개하는 반응형 기업 웹사이트입니다.

## 실행

```bash
pnpm install
pnpm dev
```

## 검증 및 빌드

```bash
pnpm check
pnpm test
pnpm build
pnpm seo:audit
```

## 웹사이트 내 SEO 관리 및 정적 프리렌더링 구조

- **중앙 집중형 SEO 설정 (`client/src/config/seo.ts`)**: 정식 도메인(`siteUrl`), 검색엔진 웹마스터 소유권 확인 코드(`verification.naver`, `verification.google`, `verification.bing`), 기본 키워드, 소셜 미리보기 이미지(`social-preview.jpg`), 페이지별 제목·설명·키워드·색인 여부(`indexable`)를 이 파일 한 곳에서 일괄 관리합니다.
- **웹사이트 내 실시간 SEO 인스펙터 (`?seo=1`)**: 웹사이트 어느 페이지에서든 URL 뒤에 `?seo=1`을 붙여 접속하면 우측 하단에 **실시간 SEO 진단 인스펙터 패널**이 열립니다(세션 유지, `?seo=0` 또는 닫기 버튼으로 해제). 일반 방문자나 검색 로봇에게는 렌더링되지 않으며, 검색결과(SERP) 미리보기, 제목·설명 글자 수, H1 유일성, 이미지 `alt` 누락 여부, JSON-LD 스키마, `sitemap.xml` / `rss.xml` / `robots.txt` 바로 열기·복사 기능을 제공합니다.
- **자동 생성 산출물 (`scripts/prerender.mjs`)**: 빌드 시 전체 라우트의 정적 HTML, 페이지별 메타데이터, 4종 `@graph` JSON-LD(`GeneralContractor`, `WebSite`, `WebPage`, `BreadcrumbList`), `sitemap.xml`(색인 대상 9개 비즈니스 페이지), `rss.xml`(네이버 서치어드바이저 제출용 RSS 2.0 피드), `robots.txt`, `404.html`을 `dist/public`에 자동 생성합니다. 법적 고지 페이지(`/privacy`, `/terms`, `/email-policy`)는 자동으로 `noindex,follow` 처리되어 검색 품질을 보호합니다.
- **기업 식별정보 연동 (`client/src/config/company.ts`)**: 의뢰인 확정 자료(대표자, 사업자등록번호, 전문건설업 면허, 대표 전화번호, 공식 이메일, 도로명 주소 등)를 입력하면 푸터·문의양식·개인정보처리방침뿐 아니라 JSON-LD 구조화 데이터(`telephone`, `email`, `taxID`, `PostalAddress`)에도 자동으로 반영됩니다.

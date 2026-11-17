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
```

## 정적 프리렌더링 및 배포 구조

- 빌드 시 `scripts/prerender.mjs`가 전체 라우트(`/`, `/company`, `/location`, `/services/scope`, `/services/promise`, `/gallery`, `/notices`, `/notices/pre-check`, `/consultation`, `/privacy`, `/terms`, `/email-policy`)의 정적 HTML, 메타데이터, JSON-LD 구조화 데이터, `404.html`, `sitemap.xml`을 `dist/public`에 생성합니다.
- 업체 고유 정보(대표자, 사업자등록번호, 전문건설업 등록번호, 대표 전화번호, 공식 수신 이메일, 도로명 주소, 개인정보 보호책임자 등)는 `client/src/config/company.ts` 한 곳에서 관리하며, 의뢰인 자료 확정 시 해당 파일만 갱신하면 푸터·문의양식·개인정보처리방침 등 전 페이지에 일괄 반영됩니다.

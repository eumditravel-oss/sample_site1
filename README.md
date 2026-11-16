# GitHub Pages 정적 배포

이 저장소는 `.github/workflows/deploy-pages.yml`을 통해 이미 생성된 정적 파일만 GitHub Pages에 배포합니다. 서버·DB·환경변수·pnpm 빌드는 필요하지 않습니다.

## 배포 방법

1. 정적 사이트를 수정할 때는 저장소 루트의 `index.html`, `404.html`, `assets/`, `media/`를 함께 갱신합니다.
2. 변경 사항을 `main` 브랜치에 반영하면 `Deploy GitHub Pages` 워크플로가 자동 실행됩니다.
3. 저장소의 **Settings → Pages → Build and deployment**는 **GitHub Actions**로 설정합니다.
4. 배포 주소의 홈은 `/#/`, 내부 페이지는 예를 들어 `/#/services/scope`처럼 열립니다.

## 배포되는 정적 구성

- `index.html`: 사이트 진입점
- `404.html`: 새로고침과 잘못된 직접 경로를 위한 대체 진입점
- `assets/`: 빌드된 JavaScript와 CSS
- `media/`: 현장 사진과 브랜드 마크
- `legal/`: 개인정보처리방침, 이용약관, 이메일 안내의 임시 안내 페이지와 공통 스타일
- `sitemap.xml`: 현재 독립적으로 제공되는 홈 URL만 포함하는 사이트맵
- `.nojekyll`: 워크플로가 배포 패키지에 자동 생성하며 Jekyll 변환을 건너뜁니다.

> GitHub Pages에서는 일반 경로 대신 해시 경로를 사용하므로, 서버 라우팅 설정 없이도 모든 내부 페이지가 열립니다.

## 반응형 수정과 소스 관계

기존 공개 사이트 번들 `assets/index-4kXMWrML.js`는 현재 저장된 `client/src`와 일치하지 않습니다. 예를 들어 공개 번들은 해시 라우팅과 공지 상세 화면을 사용하지만 현재 `client/src`는 다른 라우팅과 상담 구현을 사용합니다. 따라서 단순히 현재 소스를 다시 빌드해 배포 파일을 덮어쓰면 기존 공개 사이트의 동작이 달라질 수 있습니다.

반응형 보완은 기존 번들을 유지하면서 다음 파일을 `index.html`에서 불러오는 방식으로 적용합니다.

- `assets/mobile-menu-accessibility.js`, `assets/mobile-menu-accessibility.css`: 화면 전체 메뉴와 키보드·포커스 관리. 메뉴 링크는 공개 화면의 기존 내비게이션에서 읽습니다.
- `assets/home-responsive-audit.js`, `assets/home-responsive-audit.css`: 시공 상세 팝업, 폼과 주요 조작 영역.
- `assets/responsive-notices.css`: 좁은 화면의 공지 목록과 검색·필터 조작 영역.

홈 슬라이드의 자동 재생 제어는 일치하는 원본 소스가 없어 기존 번들에서 정확히 지정된 부분만 수정한 `assets/index-ux-hero.js`로 제공합니다. 원본 번들은 그대로 보존하며, `node scripts/build-published-hero-ux.mjs`로 수정본을 재생성할 수 있습니다. 스크립트는 기존 번들의 해시와 수정 위치를 검사하므로, 원본 번들이 변경되면 수정 위치와 동작을 다시 검토해야 합니다. `assets/hero-controls.css`는 재생 제어의 화면 배치를 담당합니다.

향후 번들을 다시 빌드하기 전에는 실제 공개 버전과 일치하는 원본 소스를 확보하거나 두 구현의 기능 차이를 먼저 통합해야 합니다.

## 푸터 안내 페이지

푸터의 세 안내 링크는 `legal/` 아래의 독립 페이지로 연결됩니다. 상담 작성 중 입력 내용이 사라지지 않도록 새 창에서 열리며, 이전 `#privacy`, `#terms`, `#email` 주소는 `assets/legacy-legal-redirect.js`에서 해당 페이지로 연결합니다. JavaScript를 끈 홈 화면에서도 안내 페이지로 이동할 수 있습니다.

현재 세 페이지는 업체의 실제 방침과 약관을 확인하기 전까지 준비 상태만 보여줍니다. 공개 운영 전 업체에서 제공한 개인정보처리방침, 이용약관, 이메일 안내 문안과 관련 연락처를 확인한 뒤 실제 운영 방식에 맞춰 교체해야 합니다. 준비 중인 안내 페이지에는 `noindex`가 설정되어 있으며 사이트맵에는 포함하지 않습니다.

## 검색 노출 참고 사항

홈의 표준 URL과 검색·공유 설명은 `index.html`에서 관리합니다. 이 사이트의 회사명과 사진·사업 정보는 교체용 예시이므로 실제 정보가 확인되기 전에는 업체 주소, 전화번호, 사업 이력 등을 구조화 데이터에 추가하지 않습니다.

현재 내부 페이지는 `/#/company`처럼 해시로 이동하기 때문에 검색엔진이 각 화면을 독립 URL로 수집·색인하는 데 한계가 있습니다. `sitemap.xml`에는 독립적으로 제공되는 홈 URL만 넣었습니다. 개별 페이지의 검색 노출을 개선하려면 공개 버전에 해당하는 원본을 확보하고, 별도 HTTP URL과 적절한 페이지별 HTML·메타데이터를 제공하도록 라우팅을 재구성해야 합니다.

GitHub Pages 프로젝트 주소의 `/sample_site1/robots.txt`는 `github.io` 호스트 루트의 robots.txt가 아니므로 크롤러 정책으로 간주하면 안 됩니다. 사이트맵은 소유권 확인 후 Search Console에서 직접 제출할 수 있습니다. 메타데이터나 구조화 데이터 추가가 검색 순위, 색인 또는 AI 답변 노출을 보장하지는 않습니다.

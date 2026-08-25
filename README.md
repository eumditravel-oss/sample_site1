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
- `.nojekyll`: 워크플로가 배포 패키지에 자동 생성하며 Jekyll 변환을 건너뜁니다.

> GitHub Pages에서는 일반 경로 대신 해시 경로를 사용하므로, 서버 라우팅 설정 없이도 모든 내부 페이지가 열립니다.

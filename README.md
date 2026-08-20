# GitHub Pages 정적 배포 패키지

이 폴더의 **내용 전체**를 GitHub 저장소 최상위에 업로드하면 됩니다. 서버·DB·환경변수·빌드 명령은 필요하지 않습니다.

## 업로드 방법

1. 이 폴더 안의 파일과 폴더를 모두 GitHub 저장소 루트에 업로드합니다. 폴더 자체를 한 단계 더 중첩하지 않습니다.
2. GitHub 저장소의 **Settings → Pages**로 이동합니다.
3. **Build and deployment**에서 **Deploy from a branch**를 선택합니다.
4. Branch는 **main**, Folder는 **/(root)**를 선택하고 저장합니다.
5. 배포 주소에서 홈은 `/#/`, 내부 페이지는 예를 들어 `/#/services/scope`처럼 열립니다.

## 기존 소스 프로젝트를 올린 저장소인 경우

기존 저장소에 `client/`, `server/`, `package.json` 또는 `.github/workflows/deploy-pages.yml`이 남아 있으면 Pages가 정적 파일 대신 Node 빌드를 시도해 실패할 수 있습니다. 이 패키지를 적용할 때는 기존 파일을 모두 지우고, **이 ZIP을 풀었을 때 보이는 파일만** 저장소 루트에 올리세요. 특히 `.github/workflows/deploy-pages.yml`은 삭제하고, Pages 설정은 **Deploy from a branch → main → /(root)**로 지정합니다.

## 포함된 정적 구성

- `index.html`: 사이트 진입점
- `404.html`: 새로고침과 잘못된 직접 경로를 위한 대체 진입점
- `assets/`: 빌드된 JavaScript와 CSS
- `media/`: 현장 사진과 브랜드 마크
- `.nojekyll`: GitHub Pages가 밑줄 파일을 제외하지 않도록 하는 설정

> GitHub Pages에서는 일반 경로 대신 해시 경로를 사용하므로, 서버 라우팅 설정 없이도 모든 내부 페이지가 열립니다.

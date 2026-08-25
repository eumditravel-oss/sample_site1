# 선진건설 GitHub Pages 사이트

이 저장소는 `client/src`를 단일 진실원천으로 사용합니다. 루트에 수동 빌드 파일을 유지하지 않으며 GitHub Actions가 소스에서 `dist/`를 생성해 Pages에 배포합니다.

## 로컬 실행

```bash
pnpm install
pnpm dev
```

## 검증

```bash
pnpm check
pnpm test
pnpm build
pnpm preview
```

## 샘플 콘텐츠와 실제 회사 정보 설정

회사명 외에 대표전화, 이메일, 주소, 상담 가능 시간은 아직 확정값이 없습니다. 실제 자료를 받기 전까지 기존 이미지와 샘플 연락처·주소·현장사례가 화면 구성 확인용으로 표시됩니다. 샘플 정보는 전화, 메일 전송, 외부 지도 링크에 사용하지 않습니다.

실제 값이 확정되면 `client/src/config/company.ts`의 `company`를 수정하고 `contentMode`를 `production`으로 변경합니다. 현장사례는 `client/src/data/projects.ts`에서 실제 사진과 프로젝트 정보로 교체합니다.

원본 고해상도 이미지는 루트 `media/`에 보존하며, 웹에 최적화된 공개 이미지는 `client/public/media/`에서 사용합니다.

## 배포

`main` 브랜치 변경 시 `.github/workflows/deploy-pages.yml`이 의존성 설치, 타입 검사, 테스트, 정적 빌드를 수행한 뒤 `dist/`만 GitHub Pages에 배포합니다.

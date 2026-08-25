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

## 실제 회사 정보 설정

회사명 외에 대표전화, 이메일, 주소, 상담 가능 시간은 아직 확정값이 없습니다. 실제 값이 확정되면 `client/src/config/company.ts`만 수정합니다. 값이 비어 있는 항목은 화면에서 실제 정보처럼 표시되지 않습니다.

## 배포

`main` 브랜치 변경 시 `.github/workflows/deploy-pages.yml`이 의존성 설치, 타입 검사, 테스트, 정적 빌드를 수행한 뒤 `dist/`만 GitHub Pages에 배포합니다.

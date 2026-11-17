import { existsSync, readFileSync } from "node:fs";

const read = (file) => readFileSync(file, "utf8");

const required = [
  "client/public/seonjin-logo.png",
  "client/public/seonjin-logo-white.png",
  "client/public/seonjin-01.jpg",
  "client/public/seonjin-02.jpg",
  "client/public/seonjin-03.jpg",
  "client/public/seonjin-04.jpg",
  "client/public/seonjin-05.jpg",
  "client/public/seonjin-06.jpg",
  "client/src/config/company.ts",
  "client/src/config/seo.ts",
  "client/src/seonjin.css",
  "client/src/pages/Privacy.tsx",
  "client/src/pages/Terms.tsx",
  "client/src/pages/EmailPolicy.tsx",
];

for (const file of required) {
  if (!existsSync(file)) throw new Error(`Missing required Seonjin file: ${file}`);
}

const sourceFiles = [
  "client/src/App.tsx",
  "client/src/components/SiteShell.tsx",
  "client/src/pages/Home.tsx",
  "client/src/pages/Company.tsx",
  "client/src/pages/Location.tsx",
  "client/src/pages/Consultation.tsx",
  "client/src/pages/Privacy.tsx",
  "client/src/pages/Terms.tsx",
  "client/src/pages/EmailPolicy.tsx",
].map(read).join("\n");

const forbidden = [
  "010-0000-0000",
  "contact@oo-construction.co.kr",
  "서울특별시 ○○구",
  "예시 브랜드입니다",
  "교체 전용 예시입니다",
];

for (const token of forbidden) {
  if (sourceFiles.includes(token)) throw new Error(`Forbidden placeholder/example token remains: ${token}`);
}

console.log("SITE 1 (Seonjin) source integrity, legal pages, and placeholder-free checks passed.");

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const dist = path.resolve("dist/public");
if (!existsSync(path.join(dist, "index.html"))) {
  console.error("dist/public 이 없습니다. 먼저 pnpm build 를 실행해 주세요.");
  process.exit(1);
}

const checkFiles = ["sitemap.xml", "rss.xml", "robots.txt", "404.html", "social-preview.jpg", "favicon.png"];
for (const f of checkFiles) {
  if (!existsSync(path.join(dist, f))) {
    throw new Error(`필수 SEO 산출물 누락: dist/public/${f}`);
  }
}

const sitemap = readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (urls.some((u) => /\/(privacy|terms|email-policy)\//.test(u))) {
  throw new Error("법적 고지 페이지(noindex)가 sitemap.xml에 포함되어 있습니다.");
}

const rss = readFileSync(path.join(dist, "rss.xml"), "utf8");
if (!rss.includes("<rss version=\"2.0\"") || !rss.includes("<item>")) {
  throw new Error("rss.xml 형식이 올바르지 않습니다.");
}

const robotsTxt = readFileSync(path.join(dist, "robots.txt"), "utf8");
if (!robotsTxt.includes("User-agent: Yeti") || !robotsTxt.includes("Sitemap:")) {
  throw new Error("robots.txt 필수 규칙이 누락되었습니다.");
}

console.log(`=== 선진건설(주) SEO 산출물 감사 결과 ===`);
console.log(`- sitemap.xml 수록 URL: ${urls.length}개`);
console.log(`- rss.xml 생성 완료: O`);
console.log(`- robots.txt 생성 완료: O`);

const routes = [
  "",
  "company",
  "location",
  "services/scope",
  "services/promise",
  "gallery",
  "notices",
  "notices/pre-check",
  "consultation",
  "privacy",
  "terms",
  "email-policy",
];

for (const r of routes) {
  const htmlPath = r ? path.join(dist, r, "index.html") : path.join(dist, "index.html");
  const html = readFileSync(htmlPath, "utf8");
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1] ?? "";
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/)?.[1] ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const h1Count = [...html.matchAll(/<h1[\s>]/g)].length;
  const jsonLdRaw = html.match(/<script id="seo-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  if (!title || !desc || !robots || !canonical || h1Count !== 1 || !jsonLdRaw) {
    throw new Error(`[/${r}] 필수 SEO 태그 또는 JSON-LD 검증 실패 (H1=${h1Count})`);
  }
  const parsed = JSON.parse(jsonLdRaw);
  if (!Array.isArray(parsed["@graph"]) || parsed["@graph"].length < 4) {
    throw new Error(`[/${r}] JSON-LD @graph 구성 부족`);
  }
  console.log(`  [/${r}] H1=${h1Count} | Title(${title.length}자) | Desc(${desc.length}자) | Robots=${robots}`);
}

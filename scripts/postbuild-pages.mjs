import { writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const repository = process.env.GITHUB_REPOSITORY?.split("/").pop();
const basePath = process.env.GITHUB_ACTIONS === "true" && repository ? `/${repository}` : "";
const notFound = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>페이지 이동 중 | 선진건설</title>
    <script>
      (function () {
        var path = window.location.pathname;
        var base = ${JSON.stringify(basePath)};
        var route = base && path.indexOf(base + "/") === 0 ? path.slice(base.length) : path;
        route = route || "/";
        window.location.replace(base + "/#" + route + window.location.search);
      })();
    </script>
  </head>
  <body></body>
</html>`;

await writeFile(path.join(distDir, "404.html"), notFound, "utf8");
await writeFile(path.join(distDir, ".nojekyll"), "", "utf8");
console.log("GitHub Pages files generated: 404.html, .nojekyll");

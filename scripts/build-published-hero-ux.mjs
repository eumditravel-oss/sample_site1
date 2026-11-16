// The published bundle has no matching checked-in React source. Generate a
// separate, narrowly patched copy so the original remains available. A hash
// and exact-match guards prevent applying this patch to a different bundle.
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const input = "assets/index-4kXMWrML.js";
const output = "assets/index-ux-hero.js";
const expectedHash = "189cc1d9a6a8d41c72922196dac3cfbe44db03eb489268b14b363fa2ae9b8c4d";
let source = await readFile(input, "utf8");
const hash = createHash("sha256").update(source).digest("hex");
if (hash !== expectedHash) throw new Error("Published bundle differs from the version this patch was verified against.");

function replaceOnce(before, after) {
  if (source.split(before).length !== 2) throw new Error("Published bundle patch target is missing or ambiguous.");
  source = source.replace(before, after);
}

const timer = 'return b.useEffect(()=>{const v=window.setInterval(()=>s(y=>(y+1)%ja.length),5200);return()=>window.clearInterval(v)},[]),u.jsxs("section"';
const accessibleTimer = 'const [site1HeroAutoPlay,setSite1HeroAutoPlay]=b.useState(()=>!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);return b.useEffect(()=>{const motion=window.matchMedia?.("(prefers-reduced-motion: reduce)");if(!motion)return;const onMotionChange=e=>{if(e.matches)setSite1HeroAutoPlay(false)};if(motion.addEventListener)motion.addEventListener("change",onMotionChange);else motion.addListener(onMotionChange);return()=>{if(motion.removeEventListener)motion.removeEventListener("change",onMotionChange);else motion.removeListener(onMotionChange)}},[]),b.useEffect(()=>{if(!site1HeroAutoPlay)return;const v=window.setInterval(()=>{if(!document.hidden&&!document.querySelector(\'.hero-work-modal[data-state="open"]\'))s(y=>(y+1)%ja.length)},5200);return()=>window.clearInterval(v)},[site1HeroAutoPlay]),u.jsxs("section"';
replaceOnce(timer, accessibleTimer);

// The indicators are independent buttons rather than a tab widget. Expose
// their selected state without requiring unimplemented tab-arrow navigation.
replaceOnce('className:"hero__dots",role:"tablist","aria-label":"메인 비주얼 선택"', 'className:"hero__dots",role:"group","aria-label":"메인 비주얼 선택"');
replaceOnce('"aria-label":`${y+1}번 메인 비주얼`,"aria-selected":y===l', '"aria-label":`${y+1}번 메인 비주얼`,"aria-pressed":y===l');

const counter = 'u.jsxs("p",{"data-loc":"client/src/components/HomeSections.tsx:170",className:"hero__counter"';
const pauseButton = 'u.jsx("button",{type:"button",className:"hero__play-toggle","aria-label":"메인 슬라이드 자동 전환","aria-pressed":site1HeroAutoPlay,onClick:()=>setSite1HeroAutoPlay(v=>!v),children:site1HeroAutoPlay?"일시정지":"재생"}),';
replaceOnce(counter, pauseButton + counter);

await writeFile(output, source, "utf8");
console.log(`Created ${output} from the verified published bundle.`);

// Usage (from /data so playwright resolves): node "project/Agent Progress save/scripts/mobile-audit.mjs" <outDir> [width]
// Needs `npm start` on :3000. Full-page mobile screenshots + list of elements wider than viewport.
import { chromium } from "playwright";
const out = process.argv[2] || "."; const W = +(process.argv[3] || 390);
const pages = [["home","/"],["shop","/shop"],["product","/product/bose-qc2"],["cart","/cart"],["checkout","/checkout"],["faq","/faq"],["about","/about"],["contact","/contact"]];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || "/usr/local/bin/chromium", args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--no-sandbox"] });
const ctx = await browser.newContext({ viewport: { width: W, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
for (const [name, path] of pages) {
  try {
    await page.goto("http://localhost:3000" + path, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(name === "home" || name === "product" ? 8000 : 1500);
    const info = await page.evaluate((W) => {
      const res = []; const de = document.documentElement;
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > W + 1 || r.left < -1)) {
          const cs = getComputedStyle(el); if (cs.position === "fixed" && cs.visibility === "hidden") continue;
          res.push(`${el.tagName.toLowerCase()}.${String(el.className?.baseVal ?? el.className).slice(0,60)} L${Math.round(r.left)} R${Math.round(r.right)}`);
        }
      }
      return { scrollW: de.scrollWidth, bodyW: document.body.scrollWidth, over: res.slice(0, 12) };
    }, W);
    console.log(name, JSON.stringify(info));
    await page.screenshot({ path: `${out}/m-${name}.png`, fullPage: true });
    await page.screenshot({ path: `${out}/m-${name}-top.png` });
  } catch (e) { console.log("fail", name, String(e).slice(0, 150)); }
}
await page.close(); await browser.close(); process.exit(0);

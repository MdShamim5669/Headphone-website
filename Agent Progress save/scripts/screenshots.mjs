// Usage (from /data or a dir with playwright installed): node screenshots.mjs <outDir>
// Needs `npm start` running on http://localhost:3000
import { chromium } from "playwright";
const out = process.argv[2] || ".";
const pages = [["home", "/"], ["shop", "/shop"], ["product", "/product/bose-qc2"], ["cart", "/cart"], ["checkout", "/checkout"], ["faq", "/faq"], ["404", "/nope"]];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || "/usr/local/bin/chromium", args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--no-sandbox"] });
for (const [vpName, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport: vp });
  for (const [name, path] of pages) {
    if (vpName === "mobile" && !["home", "product", "shop"].includes(name)) continue;
    try {
      await page.goto("http://localhost:3000" + path, { waitUntil: "load", timeout: 30000 });
      await page.waitForTimeout(name === "home" || name === "product" ? 6000 : 1500);
      await page.screenshot({ path: `${out}/${vpName}-${name}.png` });
      console.log("ok", vpName, name);
    } catch (e) { console.log("fail", vpName, name, String(e).slice(0, 120)); }
  }
  await page.close();
}
await browser.close(); process.exit(0);

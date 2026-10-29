// Screenshots of the running dev server, using the installed Microsoft Edge.
// Scrolls through the page first so lazy images load and scroll animations play, like a real visit.
//
//   node scripts/screenshot.mjs [path] [sizes] [outDir] [--sections]
//   node scripts/screenshot.mjs / 1440,1024,390 screenshots
//   node scripts/screenshot.mjs / 1920x850,1366x650 screenshots --sections
//
// A size is WIDTH or WIDTHxHEIGHT (window size without browser bars). Without --sections it saves one
// full-page image per size; with --sections it saves what's on screen when each <section id> is
// scrolled to the top (just under the sticky nav), i.e. what a visitor sees.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const sectionsMode = args.includes("--sections");
const [route = "/", sizeArg = "1440,1024,390", outDir = "screenshots"] = args.filter((a) => !a.startsWith("--"));
const base = process.env.BASE_URL ?? "http://localhost:3000";
const sizes = sizeArg.split(",").map((s) => {
  const [w, h] = s.split("x").map(Number);
  return { width: w, height: h || (w < 768 ? 844 : 900) };
});
fs.mkdirSync(outDir, { recursive: true });
const slug = route === "/" ? "home" : route.replace(/\W+/g, "-").replace(/^-|-$/g, "");

const browser = await chromium.launch({ channel: "msedge" });
try {
  for (const { width, height } of sizes) {
    const mobile = width < 768;
    const page = await browser.newPage({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile });
    await page.goto(base + route, { waitUntil: "networkidle" });

    // Scroll down in steps so lazy images load and reveal animations run, then back to the top.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 400) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))));
    await page.waitForTimeout(900);

    const tag = `${width}x${height}`;
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const warn = overflow > 0 ? `  <-- horizontal overflow ${overflow}px` : "";

    if (!sectionsMode) {
      const file = path.join(outDir, `${slug}-${width}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(file, warn);
    } else {
      const ids = await page.evaluate(() => [...document.querySelectorAll("main section[id]")].map((s) => s.id));
      for (const id of ids) {
        const info = await page.evaluate((sid) => {
          const el = document.getElementById(sid);
          const nav = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
          window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - (sid === "home" ? nav : 64));
          return { h: Math.round(el.getBoundingClientRect().height) };
        }, id);
        await page.waitForTimeout(450);
        const file = path.join(outDir, `${slug}-${tag}-${id}.png`);
        await page.screenshot({ path: file });
        const fits = info.h + (id === "home" ? 84 : 64) <= height ? "fits" : `taller than screen by ${info.h + (id === "home" ? 84 : 64) - height}px`;
        console.log(file, `section ${info.h}px, ${fits}`, warn);
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}

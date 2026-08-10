#!/usr/bin/env node
/**
 * Render a branded HTML page to PNG and/or PDF at exact pixel dimensions.
 *
 * Designing in HTML and rasterising is what makes a poster and its web version
 * genuinely the same artefact rather than two hand-matched approximations — the
 * tokens in assets/tokens.css drive both.
 *
 * Requires playwright (the repo already carries @playwright/test). Chromium is
 * usually preinstalled; if not, run `npx playwright install chromium`.
 *
 * Usage:
 *   node scripts/render.mjs poster.html --out build/poster --preset a3
 *   node scripts/render.mjs poster.html --out build/short --preset short --png
 *   node scripts/render.mjs poster.html --out build/x --width 1080 --height 1350
 *
 * Presets: a3, a4, portrait, square, short, deck
 */

import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const PRESETS = {
  a3: { width: 3508, height: 4961, scale: 1, note: "A3 @300dpi" },
  a4: { width: 2480, height: 3508, scale: 1, note: "A4 @300dpi" },
  portrait: { width: 1080, height: 1350, scale: 1, note: "social portrait" },
  square: { width: 1080, height: 1080, scale: 1, note: "social square" },
  short: { width: 1080, height: 1920, scale: 1, note: "story / reel / short" },
  deck: { width: 1920, height: 1080, scale: 1, note: "16:9 slide" },
};

/**
 * Launch Chromium, tolerating the common case where the installed playwright
 * expects a different browser build than the one present on the machine (CI
 * images and devcontainers pin browsers independently of the npm package).
 * Rather than telling the user to reinstall, find a usable binary.
 */
async function launchChromium(chromium) {
  try {
    return await chromium.launch();
  } catch (err) {
    const explicit = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
    const candidates = explicit ? [explicit] : discoverChromium();
    for (const executablePath of candidates) {
      try {
        return await chromium.launch({ executablePath });
      } catch { /* try the next one */ }
    }
    throw new Error(
      `${err.message}\n\nNo usable Chromium found. Either run ` +
        "`npx playwright install chromium`, or point PLAYWRIGHT_CHROMIUM_EXECUTABLE " +
        "at an existing Chrome/Chromium binary."
    );
  }
}

function discoverChromium() {
  const found = [];
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (root && fs.existsSync(root)) {
    for (const dir of fs.readdirSync(root)) {
      if (!dir.startsWith("chromium")) continue;
      for (const rel of [
        "chrome-linux/chrome",
        "chrome-linux/headless_shell",
        "chrome-mac/Chromium.app/Contents/MacOS/Chromium",
        "chrome-win/chrome.exe",
      ]) {
        const p = path.join(root, dir, rel);
        if (fs.existsSync(p)) found.push(p);
      }
    }
  }
  for (const p of [
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ]) {
    if (fs.existsSync(p)) found.push(p);
  }
  return found;
}

function parseArgs(argv) {
  const args = { png: false, pdf: false };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--out") args.out = argv[++i];
    else if (a === "--preset") args.preset = argv[++i];
    else if (a === "--width") args.width = Number(argv[++i]);
    else if (a === "--height") args.height = Number(argv[++i]);
    else if (a === "--scale") args.scale = Number(argv[++i]);
    else if (a === "--transparent") args.transparent = true;
    else if (a === "--png") args.png = true;
    else if (a === "--pdf") args.pdf = true;
    else if (a.startsWith("--")) throw new Error(`Unknown flag: ${a}`);
    else rest.push(a);
  }
  args.input = rest[0];
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.input) {
    console.error("Usage: node scripts/render.mjs <input.html> --out <base> [--preset a3|a4|portrait|square|short|deck] [--png] [--pdf]");
    console.error("Presets:");
    for (const [k, v] of Object.entries(PRESETS)) {
      console.error(`  ${k.padEnd(9)} ${v.width}x${v.height}  ${v.note}`);
    }
    process.exit(1);
  }

  const inputPath = path.resolve(args.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`Input not found: ${inputPath}`);
    process.exit(1);
  }

  const preset = args.preset ? PRESETS[args.preset] : null;
  if (args.preset && !preset) {
    console.error(`Unknown preset "${args.preset}". Options: ${Object.keys(PRESETS).join(", ")}`);
    process.exit(1);
  }

  const width = args.width ?? preset?.width ?? 1080;
  const height = args.height ?? preset?.height ?? 1350;
  const scale = args.scale ?? preset?.scale ?? 1;

  // Default to PNG when neither is asked for; PDF is opt-in because it is only
  // wanted for print handoff.
  const wantPng = args.png || !args.pdf;
  const wantPdf = args.pdf;

  const outBase = path.resolve(args.out ?? inputPath.replace(/\.html?$/i, ""));
  fs.mkdirSync(path.dirname(outBase), { recursive: true });

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    try {
      ({ chromium } = await import("@playwright/test"));
    } catch {
      console.error("playwright is not installed. Run `npm install` (or `bun install`) first.");
      process.exit(1);
    }
  }

  const browser = await launchChromium(chromium);
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: scale,
  });

  await page.goto(pathToFileURL(inputPath).href, { waitUntil: "networkidle" });
  // Webfonts resolve after load; rasterising before they settle produces a
  // fallback-font poster that looks almost right, which is the worst outcome.
  await page.evaluate(() => document.fonts.ready);

  const written = [];
  if (wantPng) {
    const out = `${outBase}.png`;
    // --transparent keeps the page background out of the PNG, so type and marks
    // can be rendered as an overlay to composite onto existing artwork.
    await page.screenshot({
      path: out,
      clip: { x: 0, y: 0, width, height },
      omitBackground: Boolean(args.transparent),
    });
    written.push(out);
  }
  if (wantPdf) {
    const out = `${outBase}.pdf`;
    await page.pdf({
      path: out,
      width: `${width}px`,
      height: `${height}px`,
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    written.push(out);
  }

  await browser.close();
  console.log(`${width}x${height} @${scale}x`);
  for (const w of written) console.log(`  wrote ${w}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

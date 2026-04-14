#!/usr/bin/env node
import fs from "node:fs";
import fsp from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DEFAULT_HTML = path.resolve(__dirname, "../dist/deck-filled.html");

export function resolveHtmlAndOut(argv, defaultOutDirName) {
  const args = argv.slice(2);
  const flags = new Set(args.filter((arg) => arg.startsWith("--")));
  const positional = args.filter((arg) => !arg.startsWith("--"));
  const htmlPath = path.resolve(positional[0] || DEFAULT_HTML);
  const outDir = path.resolve(
    positional[1] || path.join(path.dirname(htmlPath), defaultOutDirName)
  );
  return { htmlPath, outDir, flags };
}

export function guessServeRoot(htmlPath) {
  const dir = path.dirname(htmlPath);
  if (path.basename(dir) === "dist") return path.dirname(dir);
  return dir;
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".js" || ext === ".mjs") return "text/javascript; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".woff") return "font/woff";
  if (ext === ".woff2") return "font/woff2";
  return "application/octet-stream";
}

function createStaticServer(rootDir) {
  return http.createServer(async (req, res) => {
    try {
      const reqPath = decodeURIComponent(String(req.url || "/").split("?")[0]);
      const relPath = reqPath === "/" ? "index.html" : reqPath.replace(/^\/+/, "");
      const filePath = path.resolve(rootDir, relPath);
      const relative = path.relative(rootDir, filePath);
      if (relative.startsWith("..") || path.isAbsolute(relative)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      const stat = await fsp.stat(filePath);
      if (stat.isDirectory()) {
        res.writeHead(403);
        res.end("Directory listing disabled");
        return;
      }
      res.writeHead(200, { "Content-Type": contentType(filePath) });
      fs.createReadStream(filePath).pipe(res);
    } catch (_err) {
      res.writeHead(404);
      res.end("Not found");
    }
  });
}

export async function ensurePlaywright() {
  try {
    return await import("playwright");
  } catch (_err) {
    throw new Error(
      [
        "Playwright nao esta instalado neste ambiente.",
        "Instale antes de usar este script:",
        "  npm install -D playwright",
        "Depois rode:",
        "  npx playwright install chromium"
      ].join("\n")
    );
  }
}

export async function ensurePptxGenJS() {
  try {
    const mod = await import("pptxgenjs");
    return mod.default || mod;
  } catch (_err) {
    throw new Error(
      [
        "pptxgenjs nao esta instalado neste ambiente.",
        "Instale antes de usar este script:",
        "  npm install -D pptxgenjs"
      ].join("\n")
    );
  }
}

async function waitForDeckReady(page, deckUrl) {
  await page.goto(deckUrl, { waitUntil: "networkidle" });
  await page.waitForSelector(".deck > section.slide");
  await page.evaluate(async function () {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });
}

export async function withDeckPage(htmlPath, callback) {
  if (!fs.existsSync(htmlPath)) {
    throw new Error("HTML nao encontrado: " + htmlPath);
  }

  const serveRoot = guessServeRoot(htmlPath);
  const relHtml = path.relative(serveRoot, htmlPath).split(path.sep).join("/");
  const server = createStaticServer(serveRoot);
  const port = await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", function () {
      const addr = server.address();
      resolve(addr && typeof addr === "object" ? addr.port : 0);
    });
  });

  const deckUrl = "http://127.0.0.1:" + port + "/" + relHtml;
  const playwright = await ensurePlaywright();
  const browser = await playwright.chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await waitForDeckReady(page, deckUrl);
    return await callback({ page, deckUrl, serveRoot });
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }
}

export async function readManifest(page) {
  return page.evaluate(function () {
    return window.__DECK_EXPORT_MANIFEST__ || [];
  });
}

export async function screenshotSlides(page, outDir, options = {}) {
  await fsp.mkdir(outDir, { recursive: true });
  const slides = await page.$$(".deck > section.slide");
  const files = [];
  for (let i = 0; i < slides.length; i += 1) {
    const fileName = "slide-" + String(i + 1).padStart(2, "0") + "." + (options.ext || "png");
    const target = path.join(outDir, fileName);
    await slides[i].screenshot({
      path: target,
      type: options.type || "png",
      quality: options.type === "jpeg" ? options.quality || 90 : undefined
    });
    files.push(target);
  }
  return files;
}

export async function captureSlideDataUrls(page, options = {}) {
  const slides = await page.$$(".deck > section.slide");
  const out = [];
  for (let i = 0; i < slides.length; i += 1) {
    const type = options.type || "png";
    const buffer = await slides[i].screenshot({
      type,
      quality: type === "jpeg" ? options.quality || 90 : undefined
    });
    out.push("data:image/" + type + ";base64," + buffer.toString("base64"));
  }
  return out;
}

export async function writeManifest(outDir, deckUrl, manifest) {
  await fsp.mkdir(outDir, { recursive: true });
  const target = path.join(outDir, "manifest.json");
  await fsp.writeFile(
    target,
    JSON.stringify(
      {
        deckUrl,
        generatedAt: new Date().toISOString(),
        slides: manifest
      },
      null,
      2
    ),
    "utf8"
  );
  return target;
}

export async function applyPdfExportStyles(page) {
  await page.addStyleTag({
    content: `
      @page { size: 1280px 720px; margin: 0; }
      html, body { margin: 0 !important; padding: 0 !important; background: #ffffff !important; }
      .export-toolbar { display: none !important; }
      .deck {
        max-width: none !important;
        width: 1280px !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .slide {
        width: 1280px !important;
        height: 720px !important;
        aspect-ratio: auto !important;
        margin: 0 !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        break-after: page !important;
        page-break-after: always !important;
      }
    `
  });
}

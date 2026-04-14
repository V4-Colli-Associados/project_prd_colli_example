#!/usr/bin/env node
/**
 * Exporta o deck para PPTX final hibrido usando Chromium real:
 * - slides rasterizados via screenshot real do browser
 * - slides editaveis via API exposta pelo proprio deck no browser
 *
 * Uso:
 *   node scripts/deck-export-pptx-hybrid.mjs [dist/deck-filled.html] [out.pptx]
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  captureSlideDataUrls,
  readManifest,
  resolveHtmlAndOut,
  withDeckPage
} from "./deck-browser-core.mjs";

function stripDataPrefix(base64Like) {
  return String(base64Like || "").replace(/^data:.*?;base64,/, "");
}

export async function exportDeckPptxHybrid(page, targetPptx) {
  const manifest = await readManifest(page);
  const rasterDataUrls = await captureSlideDataUrls(page, { type: "png" });

  const imagesByIndex = {};
  manifest.forEach((slide) => {
    if (slide && slide.resolvedMode === "raster") {
      imagesByIndex[String(slide.index)] = rasterDataUrls[slide.index];
    }
  });

  const result = await page.evaluate(async function (payload) {
    if (!window.__DECK_EXPORT_API__ || !window.__DECK_EXPORT_API__.buildHybridPptx) {
      throw new Error("API de export hibrido nao disponivel no deck.");
    }
    return window.__DECK_EXPORT_API__.buildHybridPptx(payload);
  }, {
    imagesByIndex,
    title: await page.title()
  });

  const base64 = stripDataPrefix(result && result.base64);
  await fs.mkdir(path.dirname(targetPptx), { recursive: true });
  await fs.writeFile(targetPptx, Buffer.from(base64, "base64"));
  return { manifest, stats: result && result.stats ? result.stats : null };
}

async function main() {
  const { htmlPath, outDir } = resolveHtmlAndOut(process.argv, "browser-pptx-hybrid");
  const targetPptx = outDir.endsWith(".pptx") ? outDir : path.join(outDir, "deck_final_hibrido.pptx");

  await withDeckPage(htmlPath, async ({ page }) => {
    const result = await exportDeckPptxHybrid(page, targetPptx);
    if (result.stats) {
      console.log("Slides editaveis:", result.stats.editable);
      console.log("Slides raster:", result.stats.raster);
      console.log("Fallbacks:", result.stats.fallback);
    }
  });

  console.log("PPTX final hibrido gerado:", targetPptx);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}

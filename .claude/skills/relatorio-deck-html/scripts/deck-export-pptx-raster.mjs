#!/usr/bin/env node
/**
 * Exporta o deck para PPTX imagem usando Chromium real + PptxGenJS.
 *
 * Uso:
 *   node scripts/deck-export-pptx-raster.mjs [dist/deck-filled.html] [out.pptx]
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ensurePptxGenJS,
  resolveHtmlAndOut,
  screenshotSlides,
  withDeckPage
} from "./deck-browser-core.mjs";

export async function exportDeckPptxRaster(page, pptxPath) {
  const tmpDir = path.join(path.dirname(pptxPath), ".deck-raster-slides");
  const files = await screenshotSlides(page, tmpDir, { type: "png", ext: "png" });
  const PptxGenJS = await ensurePptxGenJS();
  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_16x9";
  pres.title = await page.title();

  for (const filePath of files) {
    const slide = pres.addSlide();
    slide.addImage({ path: filePath, x: 0, y: 0, w: 10, h: 5.625 });
  }

  await pres.writeFile({ fileName: pptxPath });
  return { slideImagesDir: tmpDir, slideCount: files.length };
}

async function main() {
  const { htmlPath, outDir } = resolveHtmlAndOut(process.argv, "browser-pptx");
  const targetPptx = outDir.endsWith(".pptx") ? outDir : path.join(outDir, "deck_imagem_browser.pptx");

  await withDeckPage(htmlPath, async ({ page }) => {
    const result = await exportDeckPptxRaster(page, targetPptx);
    console.log("Slides raster temporarios:", result.slideImagesDir);
    console.log("Total de slides:", result.slideCount);
  });

  console.log("PPTX imagem gerado:", targetPptx);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}

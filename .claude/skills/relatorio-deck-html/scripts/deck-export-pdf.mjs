#!/usr/bin/env node
/**
 * Exporta o deck para PDF usando Chromium real.
 *
 * Uso:
 *   node scripts/deck-export-pdf.mjs [dist/deck-filled.html] [out.pdf]
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  applyPdfExportStyles,
  resolveHtmlAndOut,
  withDeckPage
} from "./deck-browser-core.mjs";

export async function exportDeckPdf(page, pdfPath) {
  await applyPdfExportStyles(page);
  await page.emulateMedia({ media: "screen" });
  await page.pdf({
    path: pdfPath,
    width: "1280px",
    height: "720px",
    printBackground: true,
    margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
    preferCSSPageSize: false
  });
}

async function main() {
  const { htmlPath, outDir } = resolveHtmlAndOut(process.argv, "browser-pdf");
  const targetPdf = outDir.endsWith(".pdf") ? outDir : path.join(outDir, "deck.pdf");

  await withDeckPage(htmlPath, async ({ page }) => {
    await exportDeckPdf(page, targetPdf);
  });

  console.log("PDF gerado:", targetPdf);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}

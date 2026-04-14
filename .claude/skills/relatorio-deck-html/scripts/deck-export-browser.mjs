#!/usr/bin/env node
/**
 * Snapshot e QA do deck no browser real.
 */
import path from "node:path";
import {
  readManifest,
  resolveHtmlAndOut,
  screenshotSlides,
  withDeckPage,
  writeManifest
} from "./deck-browser-core.mjs";

async function main() {
  const { htmlPath, outDir, flags } = resolveHtmlAndOut(process.argv, "browser-export");
  const wantPdf = flags.has("--pdf");

  await withDeckPage(htmlPath, async ({ page, deckUrl }) => {
    const manifest = await readManifest(page);
    await writeManifest(outDir, deckUrl, manifest);
    await screenshotSlides(page, outDir, { type: "png", ext: "png" });

    if (wantPdf) {
      const pdfMod = await import("./deck-export-pdf.mjs");
      await pdfMod.exportDeckPdf(page, path.join(outDir, "deck-browser.pdf"));
    }
  });

  console.log("Export browser concluido:", outDir);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

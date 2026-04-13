#!/usr/bin/env node
/**
 * Motor central: preenche template HTML do deck (%%CHAVE%%) a partir de JSON.
 * Chamado pelo wrapper em cada skill (ex.: relatorio-deck-html/scripts/fill-deck.mjs).
 *
 * Uso:
 *   node scripts/skill-tools/deck-fill.mjs <dados.json> <template.html> <saida.html>
 *
 * JSON: "replace" (escape HTML) e "raw" (HTML literal). Ver SCHEMA-DECK.md na skill.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Raiz do repo: scripts/skill-tools → .. → scripts → .. → projeto */
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const DEFAULT_LOGO_SRC = "../../../../app/public/logov4.webp";
const DEFAULT_LOGO_FILE = path.join(REPO_ROOT, "app", "public", "logov4.webp");
const FALLBACK_LOGO_DATA_URL =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="36" viewBox="0 0 120 36"><rect width="120" height="36" rx="6" fill="#1a1a1a"/><text x="60" y="22" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="11" font-weight="700">V4</text></svg>'
  );

function mimeForImageExt(ext) {
  const e = String(ext).toLowerCase();
  if (e === ".png") return "image/png";
  if (e === ".jpg" || e === ".jpeg") return "image/jpeg";
  if (e === ".gif") return "image/gif";
  if (e === ".svg") return "image/svg+xml";
  return "image/webp";
}

function resolveLogoSrcForHtml(logoSrcRaw, outPath) {
  const v = String(logoSrcRaw ?? "").trim();
  if (/^data:/i.test(v) || /^https?:\/\//i.test(v)) {
    return v;
  }
  const candidates = [];
  if (v && v !== DEFAULT_LOGO_SRC) {
    if (path.isAbsolute(v)) candidates.push(v);
    else candidates.push(path.resolve(path.dirname(outPath), v));
  }
  candidates.push(DEFAULT_LOGO_FILE);
  for (const p of candidates) {
    if (p && fs.existsSync(p)) {
      const buf = fs.readFileSync(p);
      const mime = mimeForImageExt(path.extname(p));
      const b64 = buf.toString("base64");
      return `data:${mime};base64,${b64}`;
    }
  }
  return FALLBACK_LOGO_DATA_URL;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function applyReplacements(html, map, { escape = true } = {}) {
  let out = html;
  for (const [key, val] of Object.entries(map)) {
    const token = `%%${key}%%`;
    const str = val == null ? "" : String(val);
    const repl = escape ? escapeHtml(str) : str;
    if (!out.includes(token)) {
      console.warn(`Aviso: token nao encontrado no template: ${token}`);
    }
    out = out.split(token).join(repl);
  }
  return out;
}

function main() {
  const jsonPath = path.resolve(process.argv[2] || "");
  const tplPath = path.resolve(process.argv[3] || "");
  const outPath = path.resolve(process.argv[4] || "");

  if (!jsonPath || !tplPath || !outPath) {
    console.error("Uso: node scripts/skill-tools/deck-fill.mjs <dados.json> <template.html> <saida.html>");
    process.exit(1);
  }

  if (!fs.existsSync(jsonPath)) {
    console.error("Erro: JSON inexistente:", jsonPath);
    process.exit(1);
  }
  if (!fs.existsSync(tplPath)) {
    console.error("Erro: template inexistente:", tplPath);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const rawIn = { ...(data.raw ?? {}) };
  let replace =
    data.replace != null
      ? { ...data.replace }
      : Object.fromEntries(Object.entries(data).filter(([k]) => k !== "raw"));

  const explicitLogo =
    rawIn.LOGO_SRC != null && String(rawIn.LOGO_SRC).trim() !== ""
      ? String(rawIn.LOGO_SRC).trim()
      : null;
  delete rawIn.LOGO_SRC;

  if (!String(replace.LOGO_SRC ?? "").trim()) {
    replace.LOGO_SRC = DEFAULT_LOGO_SRC;
  }
  const logoFinal = explicitLogo ?? resolveLogoSrcForHtml(replace.LOGO_SRC, outPath);
  delete replace.LOGO_SRC;

  const rawMerged = { ...rawIn, LOGO_SRC: logoFinal };

  let html = fs.readFileSync(tplPath, "utf8");

  const rawKeys = new Set(Object.keys(rawMerged));
  const replaceOnly = Object.fromEntries(
    Object.entries(replace).filter(([k]) => !rawKeys.has(k))
  );

  html = applyReplacements(html, replaceOnly, { escape: true });
  html = applyReplacements(html, rawMerged, { escape: false });

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, "utf8");
  console.log(`Gerado: ${outPath}`);
}

main();

#!/usr/bin/env node
/**
 * Wrapper: delega para scripts/skill-tools/deck-fill.mjs (logica centralizada).
 *
 * Uso (a partir desta pasta skill):
 *   node scripts/fill-deck.mjs examples/exemplo-proposta-comercial-fake.json
 *
 * Uso (caminhos explicitos):
 *   node scripts/fill-deck.mjs <dados.json> [template.html] [saida.html]
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "../../../..");
const CORE = path.join(PROJECT_ROOT, "scripts/skill-tools/deck-fill.mjs");

const jsonPath = path.resolve(
  process.argv[2] || path.join(__dirname, "../examples/exemplo-proposta-comercial-fake.json")
);
const tplPath = path.resolve(
  process.argv[3] || path.join(__dirname, "../assets/deck-base.html")
);
const outPath = path.resolve(
  process.argv[4] || path.join(__dirname, "../dist/deck-filled.html")
);

const r = spawnSync(process.execPath, [CORE, jsonPath, tplPath, outPath], {
  stdio: "inherit",
  cwd: PROJECT_ROOT
});
process.exit(r.status === null ? 1 : r.status);

#!/usr/bin/env bash
# =============================================================================
# sync-skills.sh — Espelha TODAS as skills a partir da fonte Claude.
#
# FONTE (editar apenas aqui):
#   <raiz-do-repo>/.claude/skills/
#
# DESTINOS (sobrescritos por este script — nao editar à mao):
#   .cursor/skills/
#   .agents/skills/
#   .codex/skills/
#
# QUANDO CHAMAR
#   • Ao adicionar uma nova skill: criar .claude/skills/<nome>/ (min. SKILL.md) e rodar este script.
#   • Ao modificar qualquer ficheiro dentro de .claude/skills/ (texto, scripts, assets, exemplos).
#   • Ao remover ou renomear uma skill em .claude/skills/ (os espelhos passam a refletir o mesmo).
#   • Antes de commit / PR que toque em skills (garante que as quatro arvores ficam identicas).
#
# NAO use este script para copiar no sentido inverso: Cursor/Codex/Agents nunca sao fonte.
#
# USO
#   bash scripts/sync-skills.sh
#   bash scripts/sync-skills.sh --dry-run
#   bash scripts/sync-skills.sh --help
#
# =============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/.claude/skills"
DESTS=(
  "$ROOT/.cursor/skills"
  "$ROOT/.agents/skills"
  "$ROOT/.codex/skills"
)

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cat <<'EOF'
sync-skills.sh — Espelha TODAS as skills a partir da fonte Claude.

  Fonte (unica):     .claude/skills/
  Destinos: .cursor/skills/  .agents/skills/  .codex/skills/

Quando rodar
  • Nova skill ou pasta nova em .claude/skills/<nome>/
  • Qualquer edicao em ficheiros dentro de .claude/skills/
  • Remocao ou renomeacao de skill na fonte
  • Antes de commit/PR que inclua mudancas em skills

Uso
  bash scripts/sync-skills.sh
  bash scripts/sync-skills.sh --dry-run
  bash scripts/sync-skills.sh --help

Nao edite os destinos à mao; serao sobrescritos. Nunca copie do espelho de volta para .claude.
EOF
  exit 0
fi

if [[ ! -d "$SRC" ]]; then
  echo "Erro: pasta fonte inexistente: $SRC" >&2
  exit 1
fi

if [[ "${1:-}" == "--dry-run" ]]; then
  echo "[dry-run] Fonte: $SRC"
  echo "[dry-run] Pastas de skill (primeiro nivel):"
  find "$SRC" -mindepth 1 -maxdepth 1 -type d | sort | sed "s|^$SRC/|  |" || true
  for dest in "${DESTS[@]}"; do
    echo "[dry-run] Sincronizaria: $SRC/ -> $dest/"
  done
  exit 0
fi

if [[ -n "${1:-}" ]]; then
  echo "Argumento desconhecido: $1 (use --help ou --dry-run)" >&2
  exit 1
fi

for dest in "${DESTS[@]}"; do
  mkdir -p "$dest"
  rm -rf "${dest:?}/"*
  cp -a "$SRC"/. "$dest"/
done

echo "OK: espelho atualizado — fonte .claude/skills -> .cursor/skills, .agents/skills, .codex/skills"

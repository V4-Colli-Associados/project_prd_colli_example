# skill-tools — scripts partilhados entre skills

**Proposito:** Centralizar logica de geracao que **nao precisa** de viver duplicada em cada pasta `.claude/skills/<nome>/scripts/`.

**Ultima atualizacao:** 2026-04-13

---

## Porque existe

- **Uma fonte de verdade** para o preenchimento de templates (tokens `%%CHAVE%%`, logo em `data:`, etc.).
- **Wrappers finos** nas skills mantem caminhos previsiveis (`examples/`, `assets/`, `dist/`) e continuam a funcionar com `cd .claude/skills/<skill> && node scripts/...`.
- **Nao entra no espelho** `sync-skills.sh`: fica em `scripts/skill-tools/` na raiz do repo, fora de `.claude/skills/`.

---

## Ferramentas

| Ficheiro | Descricao |
|----------|-----------|
| **`deck-fill.mjs`** | Preenche HTML do deck a partir de JSON (3 argumentos: json, template, saida). |

### Uso direto (raiz do repo)

```bash
node scripts/skill-tools/deck-fill.mjs \
  .claude/skills/relatorio-deck-html/examples/exemplo-proposta-comercial-fake.json \
  .claude/skills/relatorio-deck-html/assets/deck-base.html \
  .claude/skills/relatorio-deck-html/dist/deck-filled.html
```

### Via wrapper da skill (recomendado)

```bash
cd .claude/skills/relatorio-deck-html
node scripts/fill-deck.mjs examples/exemplo-proposta-comercial-fake.json
```

---

## Adicionar novas ferramentas partilhadas

1. Coloque o `.mjs` (ou outro runner) aqui em `scripts/skill-tools/`.
2. Documente neste README.
3. Na skill, mantenha apenas um **wrapper** que delega (ou `import` se fizer sentido).
4. Atualize `scripts/README.md` e, se aplicavel, `docs/08-AI-TOOL-CONFIG.md`.

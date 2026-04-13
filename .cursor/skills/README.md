# Skills do projeto (espelhadas)

O **mesmo conteudo** esta versionado em **quatro pastas**, para cada ferramenta encontrar skills no path que ela prioriza:

| Pasta | Uso tipico |
|-------|------------|
| `.claude/skills/` | Claude Code |
| `.cursor/skills/` | Cursor Agent |
| `.agents/skills/` | OpenAI Codex / interop |
| `.codex/skills/` | OpenAI Codex (layout de projeto) |

## Espelho: `scripts/sync-skills.sh`

| | |
|--|--|
| **Fonte (unica)** | `.claude/skills/` — crie e edite skills apenas aqui |
| **Destinos** | `.cursor/skills/`, `.agents/skills/`, `.codex/skills/` — **sobrescritos** pelo script; nao edite à mao |

**Chame o script sempre que** adicionar, modificar, renomear ou remover uma skill (ou qualquer ficheiro dentro de `.claude/skills/`), e **antes de commit / PR** que toque em skills.

```bash
bash scripts/sync-skills.sh           # copia a arvore inteira para os tres espelhos
bash scripts/sync-skills.sh --dry-run # mostra o que seria sincronizado, sem escrever
bash scripts/sync-skills.sh --help    # resumo e quando rodar
```

Documentacao do fluxo: comentario no topo de `scripts/sync-skills.sh`, `scripts/README.md` e `docs/08-AI-TOOL-CONFIG.md`.

**Scripts partilhados (fora do espelho):** `scripts/skill-tools/` — motores reutilizaveis; cada skill pode ter um wrapper em `scripts/` que delega (ex. preenchimento do deck HTML). Ver `scripts/skill-tools/README.md`.

Metodologia e guias longos continuam em `docs/guides/` e `docs/templates/`.

Documentacao geral: `docs/08-AI-TOOL-CONFIG.md` · Claude: [Claude directory — skills](https://code.claude.com/docs/en/claude-directory#ce-skills)

## Skills padrao deste starter

| Pasta | Uso |
|-------|-----|
| `sabatina-prd/` | Perguntas antes de executar; PRD final com decisao skill vs interface |
| `onboarding-vibe-coding/` | Conceitos basicos e como comecar |
| `organizar-temp-repositorio/` | Mover lixo `.md` (direcionamento, relatorios de sessao) para `temp/` |
| `relatorio-deck-html/` | Deck HTML (`assets/` + wrapper `scripts/fill-deck.mjs` + JSON); motor central `scripts/skill-tools/deck-fill.mjs`; export PDF/PPTX na barra do HTML; OOXML avancado via skill `pptx` |

## Skills de documento (Anthropic, copiadas do upstream)

| Pasta | Formatos | Notas |
|-------|-----------|--------|
| `docx/` | Word | Criar/editar/analisar `.docx`; ver `SKILL.md` e scripts em `scripts/` |
| `pptx/` | PowerPoint | Ler/editar/criar `.pptx`; comandos `python` devem rodar com **cwd** na pasta `pptx/` quando usam `scripts/...` relativos |
| `xlsx/` | Excel | Planilhas `.xlsx` |
| `pdf/` | PDF | Leitura/manipulacao de PDF conforme a skill |

**Atribuicao e licenca:** `docs/references/ANTHROPIC-DOCUMENT-SKILLS.md`. **Dependencias** (pandoc, markitdown, LibreOffice, etc.): ver cada `SKILL.md`.

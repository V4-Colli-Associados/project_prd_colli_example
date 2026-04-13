# Scripts de Automacao
**Proposito**: Diretorio para scripts de automacao, setup e utilitarios do projeto
**Ultima Atualizacao:** 2026-04-13

> **Documentos relacionados:**
> - `docs/00-DOC-STANDARDS.md` — Padroes de documentacao do projeto

---

## Sobre Este Diretorio

Este diretorio contem scripts de automacao para o projeto. Adicione aqui:

- **Scripts de setup** — configuracao de ambiente local, instalacao de dependencias
- **Geradores de dados** — seed data para banco de dados, fixtures para testes
- **Helpers de deploy** — scripts de build, deploy e release
- **Utilitarios** — scripts auxiliares para tarefas repetitivas do dia a dia

## Scripts incluidos

| Script / pasta | Proposito |
|----------------|-----------|
| **`sync-skills.sh`** | **Espelho de skills:** copia **toda** `.claude/skills/` → `.cursor/skills/`, `.agents/skills/`, `.codex/skills/` (fonte unica = Claude) |
| **`skill-tools/`** | **Scripts partilhados entre skills** (fora do espelho): ver `skill-tools/README.md` — hoje: `deck-fill.mjs` (preenche templates `%%CHAVE%%` do deck HTML). Wrappers finos ficam em cada skill (ex. `relatorio-deck-html/scripts/fill-deck.mjs`). |
| `deck-report/README.md` | Apenas redirecionamento — o deck HTML esta em `*/skills/relatorio-deck-html/` (`assets/`, `examples/`) |

### `sync-skills.sh` (espelho de skills)

- **Fonte:** `.claude/skills/` (criar e editar skills apenas aqui).
- **Destinos:** os tres caminhos acima; conteudo anterior de cada espelho e **apagado** e substituido pela copia da fonte.
- **Quando rodar:** ao **adicionar**, **modificar**, **renomear** ou **remover** qualquer skill ou ficheiro em `.claude/skills/`; **antes de commit/PR** que inclua skills.
- **Opcoes:** `--dry-run` (lista pastas de skill sem escrever), `--help`.

Comentario longo no proprio script e em `docs/08-AI-TOOL-CONFIG.md` (secao **Espelho de skills**).

Skills **docx / pptx / xlsx / pdf** (pasta em cada `*/skills/`) trazem scripts Python e pedem ferramentas como `pandoc`, `markitdown`, LibreOffice conforme cada `SKILL.md`. Ver `docs/references/ANTHROPIC-DOCUMENT-SKILLS.md`.

---

## Convencoes

### Nomeacao

- Use `kebab-case` para nomes de arquivos: `setup-local.sh`, `seed-database.ts`
- Prefixe com a categoria quando houver muitos scripts: `setup-`, `seed-`, `deploy-`

### Documentacao

Todo script deve incluir no inicio do arquivo:

1. **Descricao** — o que o script faz (1-2 linhas)
2. **Uso** — comando para executar com exemplos
3. **Pre-requisitos** — dependencias necessarias

Exemplo:

```bash
#!/bin/bash
# Descricao: Configura o ambiente local de desenvolvimento
# Uso: ./scripts/setup-local.sh
# Pre-requisitos: Node.js >= 18, pnpm
```

### Permissoes

Scripts shell (`.sh`) devem ter permissao de execucao:

```bash
chmod +x scripts/nome-do-script.sh
```

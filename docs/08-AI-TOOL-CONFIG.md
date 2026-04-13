# Configuracao de ferramentas de IA no repositorio
**Proposito:** Mapa dos arquivos e pastas que **diferentes produtos** esperam para instrucoes, regras e skills — evitando adivinhar nomes (`AGENTS` vs `AGENT`, etc.).
**Ultima Atualizacao:** 2026-04-13

---

## Arquivos na raiz (gemeos deste starter)

| Arquivo | Quem usa (tipico) | Notas |
|---------|-------------------|--------|
| **`AGENTS.md`** | OpenAI **Codex**, **Cursor** Agent, varias ferramentas “agent-first” | Convencao emergente; Codex concatena da raiz ate o diretorio atual. Ver [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md/) e [agents.md](https://agents.md/). |
| **`CLAUDE.md`** | **Claude Code** (Anthropic) | Carregado por sessao; pode coexistir com `AGENTS.md`. Overrides pessoais: `CLAUDE.local.md` (nao commitar). |

Neste repo, **`AGENTS.md` e `CLAUDE.md` sao gemeos**: mesmo contexto de projeto; o primeiro e agnosto de ferramenta, o segundo menciona detalhes Claude (`.claude/`, `CLAUDE.local.md`).

O nome padrao e **`AGENTS.md`** (com S), nao `AGENT.md`.

---

## Por ferramenta (resumo)

### Claude Code

- **Instrucoes:** `CLAUDE.md` (projeto), `~/.claude/CLAUDE.md` (global), `CLAUDE.local.md` (local opcional).
- **Diretorio `.claude/`** (commitavel no projeto): `skills/**/SKILL.md`, `rules/*.md`, `settings.json`, `commands/`, `agents/`, `.mcp.json`, etc. Referencia oficial: [Explore the .claude directory](https://code.claude.com/docs/en/claude-directory).

### OpenAI Codex

- **Instrucoes:** `AGENTS.md` / `AGENTS.override.md` no repo; opcional global em `~/.codex/`.
- **Skills / plugins:** formato de skill com `SKILL.md`; plugins com manifest `.codex-plugin/plugin.json`. Ver [Agent Skills](https://developers.openai.com/codex/skills/) e [Plugins](https://developers.openai.com/codex/plugins/).

### Cursor

- **Instrucoes:** `AGENTS.md` na raiz **ou** regras em **`.cursor/rules/*.mdc`** (frontmatter: `alwaysApply`, `globs`, etc.). Ver [Rules | Cursor Docs](https://cursor.com/docs/context/rules).
- **Agent Skills:** descobertos em `.cursor/skills/`, `.agents/skills/`, e compatibilidade com `.claude/skills/`, `.codex/skills/` (tambem versoes globais em `~/.cursor/skills/`, etc.). Ver [Agent Skills | Cursor Docs](https://cursor.com/docs/context/skills).

### GitHub Copilot (VS Code / editor)

- **Custom instructions** por workspace ou usuario (formato e caminhos evoluem com o produto). Custom agents podem usar definicoes em **`.github/`** conforme a documentacao atual do Copilot. Nao e o mesmo arquivo que `AGENTS.md` do Codex — consulte [GitHub Docs — Copilot](https://docs.github.com/copilot) para o fluxo vigente.

### Google Antigravity / Gemini (ecossistema Google)

- Ferramentas novas costumam aceitar **`AGENTS.md`** para portabilidade; alguns guias citam **`GEMINI.md`** como arquivo nativo. Valide na documentacao oficial do produto que voce instalou (nomes mudam rapido).

---

## Formato de skill (multiplas ferramentas)

Padrao comum: **um diretorio por skill** com **`SKILL.md`** obrigatorio na raiz desse diretorio; opcionais: `scripts/`, `references/`, `assets/`.

**Neste starter**, as skills padrao estao **espelhadas em quatro pastas com o mesmo conteudo**:

```text
.claude/skills/<nome>/SKILL.md
.cursor/skills/<nome>/SKILL.md
.agents/skills/<nome>/SKILL.md
.codex/skills/<nome>/SKILL.md
```

### Espelho de skills (`sync-skills.sh`)

| Papel | Caminho |
|-------|---------|
| **Fonte (Claude)** | `.claude/skills/` — unico sitio onde se cria ou edita skills no repo |
| **Espelhos** | `.cursor/skills/`, `.agents/skills/`, `.codex/skills/` |

O script **`scripts/sync-skills.sh`** copia **toda** a arvore `.claude/skills/` para cada espelho (apaga conteudo anterior do espelho e recopia). Isto garante que Claude Code, Cursor, Codex e variante `.agents` veem o **mesmo** conjunto de skills.

**Quando executar (obrigatorio):**

1. Apos **adicionar** uma nova pasta `.claude/skills/<nome>/` (minimo: `SKILL.md`).
2. Apos **alterar** qualquer ficheiro sob `.claude/skills/` (inclui `scripts/`, `assets/`, `references/` dentro de cada skill).
3. Apos **remover ou renomear** uma skill na fonte.
4. **Antes de commitar** mudancas relacionadas a skills, para o PR incluir fonte + tres espelhos alinhados.

```bash
bash scripts/sync-skills.sh
bash scripts/sync-skills.sh --dry-run   # opcional: inspecionar sem escrever
bash scripts/sync-skills.sh --help
```

**Nao** editar os espelhos diretamente — serao sobrescritos. **Nao** usar o script para copiar do espelho de volta para `.claude/`.

### Scripts partilhados (`scripts/skill-tools/`)

Logica de geracao que **nao** precisa ser duplicada em cada pasta `.claude/skills/<nome>/scripts/` deve viver na raiz do repo em **`scripts/skill-tools/`** (esta pasta **nao** e copiada pelo `sync-skills.sh`).

| Ficheiro | Uso |
|----------|-----|
| `skill-tools/deck-fill.mjs` | Preenche `relatorio-deck-html` (e futuros templates semelhantes) a partir de JSON. |
| `skill-tools/README.md` | Convencoes e como adicionar novas ferramentas. |

Cada skill expoe um **wrapper** curto (ex. `node scripts/fill-deck.mjs`) que delega para o motor central — assim o espelho continua autocontido para quem navega a skill, mas a fonte de verdade do algoritmo e unica.

**Metodologia vibe coding (texto longo, PRDs, templates)** continua em **`docs/guides/`**, **`docs/templates/`** — isso nao substitui skills nativas; sao camadas diferentes (ver `docs/00-DOC-STANDARDS.md`).

---

## Pastas de skills neste starter

| Caminho | Uso tipico |
|---------|------------|
| `.claude/skills/` | Claude Code — **fonte de edicao** no repo |
| `.cursor/skills/` | Cursor Agent (espelho) |
| `.agents/skills/` | OpenAI Codex / interop (espelho) |
| `.codex/skills/` | OpenAI Codex (espelho) |
| `.cursor/rules/` | Regras Cursor (`*.mdc`), nao confundir com skills |

Cada arvore `*/skills/` inclui `README.md` e as mesmas quatro skills listadas abaixo.

### Skills padrao (identicas nas quatro pastas)

| Skill | Proposito |
|-------|-----------|
| `sabatina-prd` | Sabatina com perguntas; PRD completo; entregavel primario skill vs interface |
| `onboarding-vibe-coding` | Onboarding: conceitos basicos e como comecar |
| `organizar-temp-repositorio` | Organizar arquivos; mover `.md` descartavel (direcionamento, relatorio de sessao) para `temp/` |
| `relatorio-deck-html` | Deck em HTML (`assets/`, wrapper `scripts/fill-deck.mjs`, JSON); motor `scripts/skill-tools/deck-fill.mjs`; `.pptx` via barra do HTML ou skill `pptx` |
| `docx` | Word — skill Anthropic no repo; ver `docs/references/ANTHROPIC-DOCUMENT-SKILLS.md` |
| `pptx` | PowerPoint — idem |
| `xlsx` | Excel — idem |
| `pdf` | PDF — idem |

---

## Precedencia e manutencao

1. **Skills:** um unico conteudo logico; as quatro pastas devem permanecer **iguais** — apos qualquer mudanca em `.claude/skills/`, rode `bash scripts/sync-skills.sh` (ver secao **Espelho de skills** acima).
2. **Mantenha `AGENTS.md` e `CLAUDE.md` alinhados** em stack, comandos e links de docs.
3. Para detalhes de merge e limites de tamanho no Codex, ver [Project instructions discovery](https://developers.openai.com/codex/config-advanced#project-instructions-discovery).

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

Exemplo:

```text
.claude/skills/minha-skill/SKILL.md
.cursor/skills/minha-skill/SKILL.md
```

**Metodologia vibe coding (texto longo, PRDs, templates)** continua em **`docs/guides/`**, **`docs/templates/`** — isso nao substitui skills nativas; sao camadas diferentes (ver `docs/00-DOC-STANDARDS.md`).

---

## Pastas criadas neste starter (podem ficar vazias)

| Caminho | Uso |
|---------|-----|
| `.claude/skills/` | Skills Claude Code (projeto) |
| `.cursor/rules/` | Regras Cursor (ex.: `*.mdc`) |
| `.cursor/skills/` | Skills Cursor Agent |
| `.agents/skills/` | Skills no formato esperado por Codex/Cursor em alguns setups |

Cada pasta contem um `README.md` explicando o papel; nao e obrigatorio manter skills versionadas ate voce precisar.

### Skills padrao versionadas (`.claude/skills/`)

| Skill | Proposito |
|-------|-----------|
| `sabatina-prd` | Sabatina com perguntas; PRD completo; entregavel primario skill vs interface |
| `onboarding-vibe-coding` | Onboarding: conceitos basicos e como comecar |
| `organizar-temp-repositorio` | Organizar arquivos; mover `.md` descartavel (direcionamento, relatorio de sessao) para `temp/` |

---

## Precedencia e duplicacao

1. **Nao duplique** o mesmo playbook em cinco pastas; escolha a ferramenta principal do time e **link** nos READMEs.
2. **Mantenha `AGENTS.md` e `CLAUDE.md` alinhados** em stack, comandos e links de docs.
3. Para detalhes de merge e limites de tamanho no Codex, ver [Project instructions discovery](https://developers.openai.com/codex/config-advanced#project-instructions-discovery).

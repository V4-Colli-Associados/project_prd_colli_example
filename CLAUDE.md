# Vibe Coding Starter Kit — Claude Code

**CLAUDE.md** — instrucoes de projeto carregadas pelo **Claude Code** (Anthropic) em cada sessao. E o gemeo operacional de **`AGENTS.md`** na mesma raiz: o conteudo de negocio (stack, docs, convencoes) deve permanecer **alinhado** entre os dois; edite os dois quando mudar regras globais.

**Preferencias locais (nao commitar):** crie `CLAUDE.local.md` na raiz para overrides pessoais; adicione ao `.gitignore` se ainda nao estiver. Ver [Claude directory](https://code.claude.com/docs/en/claude-directory).

**Pastas Claude no projeto:** `.claude/skills/`, `.claude/rules/`, opcionalmente `settings.json` — descritas em `docs/08-AI-TOOL-CONFIG.md`.

---

## Sobre o projeto

Starter kit **vibe coding**: documentacao antes de codigo; app React em `app/` como guia interativo da metodologia e da estrutura de pastas.

## Stack (`app/`)

React 19, Vite, TypeScript (strict), Tailwind CSS v4, shadcn/ui, fonte Geist.

## Comandos uteis

```bash
cd app && npm install && npm run dev    # desenvolvimento — http://localhost:5173
cd app && npm run build && npm run lint
```

## Estrutura relevante

| Caminho | Papel |
|---------|--------|
| `app/` | Aplicacao React (codigo) |
| `docs/` | Fundamentos, ADRs, guias de metodologia (incl. skills em texto longo) |
| `plans/` | Planejamento operacional |
| `scripts/` | Automacao |
| `temp/` | Artefatos descartaveis (git-ignored) |

## Leitura obrigatoria antes de mudancas amplas

1. `docs/00-DOC-STANDARDS.md` — precedencia, o que documentar, **Skill versus interface**
2. `docs/05-ARCHITECTURE-DECISIONS.md` — ADRs e hipoteses ativas
3. `docs/02-DESIGN-SYSTEM.md` — se tocar em UI

## Convencoes (app/)

- TypeScript strict; evitar `any`
- Conteudo do guia da pagina: `app/src/data/guide.ts` (dados separados da UI)
- Evitar editar `app/src/components/ui/` (shadcn) sem necessidade clara
- Decisao tecnica nova relevante: registrar em ADR
- Rascunhos e lixo: `temp/`

## O que evitar

- Escopo alem do pedido; refatoracoes nao solicitadas
- Commitar secrets (`.env`, chaves)
- Desalinhamento duradouro entre `CLAUDE.md` e `AGENTS.md`

## Skills: ferramenta vs metodologia

- **Skills nativas (Claude Code):** diretorio `.claude/skills/<nome>/SKILL.md` — ver `docs/08-AI-TOOL-CONFIG.md`
- **Guias longos / metodologia:** `docs/guides/`, `docs/templates/`, `docs/references/`

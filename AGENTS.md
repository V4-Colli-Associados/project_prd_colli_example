# Vibe Coding Starter Kit — Instrucoes para agentes

**AGENTS.md** (raiz do repositorio) — convencao portatil usada por varias ferramentas (OpenAI **Codex**, **Cursor** Agent, e outras que leem o mesmo arquivo). Markdown livre; nao ha campos obrigatorios. Complemente com regras por ferramenta em `.cursor/rules/`, `.claude/`, etc. — ver `docs/08-AI-TOOL-CONFIG.md`.

**Par deste arquivo:** `CLAUDE.md` na mesma raiz (foco **Claude Code**). Mantenha os dois alinhados ao atualizar contexto de projeto.

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
- Duplicar vies entre `AGENTS.md` e `CLAUDE.md` sem necessidade — atualize ambos quando mudar regras globais do repo

## Skills: ferramenta vs metodologia

- **Skills nativas da IA** (invocaveis no agente, pastas tipo `.claude/skills/`, `.cursor/skills/`): ver `docs/08-AI-TOOL-CONFIG.md`
- **Guias longos / metodologia** para humanos e para copiar em prompts: `docs/guides/`, `docs/templates/`, `docs/references/`

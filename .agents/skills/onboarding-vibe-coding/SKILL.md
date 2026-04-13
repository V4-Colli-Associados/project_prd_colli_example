---
name: onboarding-vibe-coding
description: >-
  Onboarding ao starter vibe coding: conceitos basicos (docs antes de codigo,
  AGENTS.md/CLAUDE.md, plans, temp, skill vs interface), estrutura de pastas e
  como comecar. Use quando o usuario for novo no repositorio ou na metodologia.
---

# Skill: Onboarding — Vibe Coding Starter

## Objetivo

Dar uma visao **curta e acionavel** do que e este repo e como comecar sem se perder em detalhes.

## O que explicar (ordem sugerida)

### 1. Ideia central

- **Documentacao antes de codigo** no dia 1; depois a proporcao inverte.
- O repositorio e a **fonte de verdade** para humanos e para agentes: o que nao esta escrito, a IA inventa.

### 2. Arquivos de contexto para IA (raiz)

- **`AGENTS.md`** — instrucoes para varias ferramentas (Codex, Cursor, etc.).
- **`CLAUDE.md`** — mesmo espirito, foco Claude Code; manter alinhado ao `AGENTS.md`.
- **`app/CLAUDE.md`** — so o escopo do app React.
- Mapa completo: `docs/08-AI-TOOL-CONFIG.md`.

### 3. Pastas que importam

| Pasta | Papel |
|-------|--------|
| `docs/` | Fundamentos, ADRs, guias, templates (memoria do projeto) |
| `plans/` | PRDs em andamento, backlog, sprints |
| `app/` | Aplicacao React (guia interativo + codigo) |
| `temp/` | Lixo controlado — rascunhos, relatorios de sessao **descartaveis** (git-ignored na pratica de uso) |
| `*/skills/` | Skills operacionais (`.claude`, `.cursor`, `.agents`, `.codex` — mesmo conteudo; ver `skills/README.md`) |

### 4. Skill versus interface

- Antes de pedir tela: sera que um **playbook** (skill ou `docs/guides/`) resolve?
- Criterios: `docs/00-DOC-STANDARDS.md` (secao **Skill versus interface**).

### 5. Ciclo pratico

1. Ler `docs/00-DOC-STANDARDS.md`
2. Ajustar `AGENTS.md` / `CLAUDE.md` se o projeto mudou
3. PRD ou plano em `plans/in-progress/`
4. So entao pedir implementacao em `app/` (ou nova skill)

### 6. Comandos do app

```bash
cd app && npm install && npm run dev
```

## Tom

- Encorajar; evitar jargao sem definir.
- Oferecer **um** proximo passo concreto (ex.: “abra `docs/00-DOC-STANDARDS.md`” ou “use a skill `sabatina-prd` se a ideia ainda estiver vaga”).

## Nao fazer nesta skill

- Nao substituir a leitura dos docs longos — apenas orientar **onde** ler.
- Nao assumir Supabase ou producao se o starter estiver em modo guia local.

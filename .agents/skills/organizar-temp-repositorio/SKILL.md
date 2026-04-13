---
name: organizar-temp-repositorio
description: >-
  Organiza arquivos do repo: move documentacao descartavel (direcionamento,
  relatorios de sessao, rascunhos .md) para temp/; alinha estrutura com docs/
  e plans/. Use apos sessoes longas de IA ou quando a raiz/pastas estiverem
  poluidas.
---

# Skill: Organizar repo e usar `temp/` como lixo controlado

## Objetivo

Manter o repositorio **limpo para humanos e agentes**: o que for **so direcionamento**, **relatorio do que foi feito na sessao**, ou **nota temporaria** nao deve ficar misturado com docs canonicos ou codigo.

## Regra de ouro (politica de `temp/`)

**Todo arquivo gerado ou movido que for exclusivamente:**

- direcionamento / brainstorming / anotacao de trabalho,
- relatorio ou “sumario do que o agente fez”,
- dump de conversa, checklist descartavel,
- duplicata obsoleta de um doc que ja foi fundido em `docs/` ou `plans/`,

→ deve ir para **`temp/`** (na raiz do projeto), **nao** para `docs/`, `plans/in-progress/` nem para dentro de `app/` — a menos que o usuario **explicitamente** diga que aquele arquivo e permanente (ex.: PRD aprovado → ai sim `plans/in-progress/` ou `docs/` conforme o caso).

**Excecao:** PRD, ADR, spec ou guia **validado** pelo usuario como memoria do projeto → `plans/` ou `docs/`, nunca `temp/`.

## Antes de mover ou apagar

1. **Perguntar** (ou inferir com alta confianca) se o arquivo e descartavel ou canonico.
2. Se duvida: **nao apagar**; mover para `temp/` com nome claro, ex.: `temp/2026-04-13-rascunho-feature-x.md`.
3. Nunca mover **codigo fonte**, `package.json`, configs de build, nem `.env*`.

## Passos operacionais

1. Listar candidatos a limpeza: `.md` soltos na raiz, em pastas erradas, duplicatas `*-copy.md`, arquivos com nomes de sessao (`notes`, `gemini`, `chatgpt`, `cursor`, etc.) que nao sejam parte da metodologia.
2. Classificar cada um:
   - **Canonico** → local correto (`docs/`, `plans/`, `app/`).
   - **Descartavel / sessao** → `temp/`.
3. Criar `temp/` se nao existir; o diretorio ja e gitignored na intencao do projeto — **arquivos em temp nao devem ser tratados como fonte de verdade**.
4. Para muitos arquivos, opcional: `temp/sessoes/YYYY-MM/` subpasta.
5. Atualizar links em outros `.md` se algum caminho mudou (ou avisar o usuario).

## Organizacao de estrutura (sem fanatismo)

- Metodologia e decisoes: `docs/`.
- PRDs e tracking operacional: `plans/`.
- Skills de agente (procedimentos curtos): `.claude/skills/` etc. — quatro pastas espelhadas; ver `docs/08-AI-TOOL-CONFIG.md` e `scripts/sync-skills.sh`.
- Guias longos e templates humanos: `docs/guides/`, `docs/templates/`.

## O que dizer ao usuario ao terminar

- Lista do que foi movido para `temp/` (caminhos).
- O que permaneceu canonico e onde.
- Lembrete: `temp/` pode ser apagado quando nao precisar mais — **backup local** se houver duvida.

## Referencias

- `docs/00-DOC-STANDARDS.md` — politica de arquivos temporarios
- `docs/08-AI-TOOL-CONFIG.md` — pastas por ferramenta

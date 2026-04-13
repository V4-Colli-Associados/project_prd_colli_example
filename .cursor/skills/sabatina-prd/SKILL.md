---
name: sabatina-prd
description: >-
  Sabatina o usuario com perguntas estruturadas antes de executar trabalho grande;
  produz PRD completo ao final, com entregavel primario como skill ou interface.
  Use quando o pedido for vago, ambicioso, ou antes de codar feature nova.
---

# Skill: Sabatina antes de executar → PRD

## Objetivo

Nao executar codigo nem criar arquivos permanentes ate ter **clareza suficiente**. Ao final, entregar um **PRD em Markdown** que o usuario possa colar em `plans/in-progress/` ou revisar.

## Quando usar

- Pedido aberto (“quero um sistema de…”, “melhora isso”).
- Antes de CRUD, nova tela, integracao ou mudanca arquitetural.
- Quando nao esta obvio se o entregavel e **skill** (playbook/agente) ou **interface** (`app/`).

## Fluxo obrigatorio

1. **Declarar** que esta em modo sabatina e que so depois do PRD vem execucao.
2. **Fazer perguntas em rodadas** (3 a 7 rodadas conforme complexidade). Cada rodada: poucas perguntas objetivas; aguardar respostas antes da proxima.
3. Se existir ferramenta de perguntas estruturadas (ex.: AskQuestion), **use** para escolhas multiplas e prioridades.
4. **Cobrir** no minimo os blocos abaixo (pule apenas o que for explicitamente “nao se aplica”).

### Bloco A — Problema e sucesso

- Qual dor concreta resolvemos? Para quem?
- O que significa “pronto” / metrica de sucesso?
- O que **nao** fazer (fora de escopo)?

### Bloco B — Usuario e canal

- Quem e o usuario primario: equipe interna (agente/chat) ou externo (produto no browser)?
- O fluxo precisa funcionar **sem** IA aberta? Precisa login/multiusuario?

### Bloco C — Skill versus interface

- O entregavel principal e **repetibilidade para agente** (criterios, checklist, governanca) ou **experiencia em produto** (telas, botoes)?
- Se 80% do valor pudesse vir de uma skill em `docs/guides/` ou nas pastas `*/skills/` do repo (espelhadas), bastaria?
- Consultar mentalmente `docs/00-DOC-STANDARDS.md` (secao Skill versus interface).

### Bloco D — Dados e integracoes

- Entradas/saidas, sistemas externos, persistencia, LGPD/sensivel.

### Bloco E — Restricoes

- Prazo, stack fixa, design system, orcamento de tokens, “nao usar X”.

### Bloco F — Artefatos

- Onde o PRD deve viver: `plans/in-progress/` (preferido) ou revisao antes?
- Relatorios intermediarios da conversa: apenas em chat ou salvar rascunho em `temp/`?

## Saida: formato do PRD

Ao terminar as perguntas, gerar **um unico** documento Markdown com estas secoes:

1. **Titulo e resumo** (1 paragrafo)
2. **Objetivo e nao-objetivos**
3. **Personas / usuarios**
4. **Entregavel primario: Skill ou Interface** — decisao explicita + justificativa curta
5. **Fluxos principais** (bullet ou passos numerados)
6. **Dados e integracoes**
7. **Requisitos funcionais** (lista priorizada: P0/P1/P2)
8. **Requisitos nao-funcionais** (performance, seguranca, acessibilidade se UI)
9. **Criterios de aceitacao** (testaveis)
10. **Riscos e perguntas em aberto**
11. **Proximos passos sugeridos** (docs → skill → codigo, na ordem que fizer sentido)

## Regras

- **Nao** criar codigo de producao durante a sabatina.
- Rascunhos da sessao que forem so direcionamento ou relatorio **descartavel** → orientar uso de `temp/` (ver skill `organizar-temp-repositorio`).
- Se o usuario pedir para “ja implementar”, responder que o PRD vem primeiro; pode oferecer PRD “minimo” em uma unica rodada extra se for caso trivial.

## Referencias no repo

- `docs/00-DOC-STANDARDS.md` — Skill versus interface
- `plans/` — destino natural do PRD maduro
- Skill `relatorio-deck-html/` (em qualquer pasta `*/skills/` espelhada) — opcional: apresentacao HTML a partir do PRD (JSON + script)

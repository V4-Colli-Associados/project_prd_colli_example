---
name: relatorio-deck-html
description: >-
  Gera relatorio em HTML estilo apresentacao (slides 16:9) a partir de JSON:
  campos determinísticos preenchidos por script e slides livres em HTML para o
  agente. Use apos sabatina-prd, extracao de PRD/docs, ou entregas existentes.
  Para ficheiro .pptx nativo, usar tambem a skill pptx (Anthropic) no mesmo repo.
---

# Skill: Relatorio tipo deck (HTML semi-deterministico)

## Objetivo

Produzir um **ficheiro HTML** que se comporta como um **PPT**: slides com caixas de tamanho controlado para texto **estruturado**, preenchidas via **JSON** + script, e **slides livres** onde o agente escreve **HTML** no mesmo tema visual (criatividade, nao 100% deterministico).

## HTML nesta skill vs PowerPoint (.pptx)

| Entregavel | Skill | Quando |
|------------|--------|--------|
| **HTML** (browser, PDF por impressao) | **Esta skill** (`relatorio-deck-html`) | Rapido, sem dependencias Office; bom para revisao e arquivo no repo |
| **.pptx** real (editar no PowerPoint, marca corporativa OOXML) | **`pptx`** (pasta `pptx/` no mesmo `*/skills/`, Anthropic) | Cliente pede ficheiro nativo, template empresa, animacoes |

**Fluxo combinado sugerido:** (1) `sabatina-prd` → PRD; (2) montar JSON → `fill-deck.mjs` → HTML; (3) se precisar `.pptx`, usar skill **`pptx`** para criar/editar apresentacao (ex. html2pptx ou fluxo de edicao descrito no `SKILL.md` da skill `pptx`), ou extrair texto/tema de um `.pptx` existente com `markitdown` / unpack OOXML conforme essa skill.

## Artefatos (tudo dentro desta pasta de skill)

| Caminho | Papel |
|---------|--------|
| `assets/deck-base.html` | Template com placeholders `%%CHAVE%%` |
| `scripts/fill-deck.mjs` | Wrapper → motor `scripts/skill-tools/deck-fill.mjs` (repo) |
| `examples/exemplo-pos-sabatina.json` | Exemplo PRD |
| `examples/exemplo-proposta-comercial-fake.json` | Proposta comercial ficticia (tabela + SVG + texto rico) |
| `README-DECK.md` | Uso rapido do script |
| `references/SCHEMA-DECK.md` | Schema do JSON |
| `references/ESTRUTURA-SEMANTICA-PPTX.md` | Contrato semantico do HTML para nao quebrar o PPTX editavel |

**Padrao:** recursos da skill **colados** ao `SKILL.md`; **motores** reutilizaveis (ex. `deck-fill`) ficam em `scripts/skill-tools/` na raiz do repo com **wrapper** na skill.

## Fluxo resumido

1. **Obter conteudo** (uma das origens abaixo).
2. **Montar JSON** seguindo `references/SCHEMA-DECK.md`.
3. **Preencher `raw.BULLETS_HTML`** e opcionalmente **`FREE_HTML_1` / `FREE_HTML_2`** com HTML valido (lista, paragrafos, tabelas simples) no estilo escuro do template.
4. Na raiz do repo (ou a partir desta pasta):

```bash
cd .claude/skills/relatorio-deck-html   # ou .cursor / .agents / .codex — mesmo conteudo apos sync-skills.sh
node scripts/fill-deck.mjs examples/exemplo-proposta-comercial-fake.json
```

5. Abrir `dist/deck-filled.html` no navegador (idealmente por `http://` na raiz do repo). Barra: **PDF**, **PPTX editável** (template-base atual preparado para sair 100% editável), **PPTX imagem** (captura full-bleed), **Imprimir…**. Detalhes: `README-DECK.md`. Motor de preenchimento: `scripts/skill-tools/deck-fill.mjs`.
6. Para alta fidelidade final, preferir os scripts com Chromium real:
   - `node scripts/deck-export-pdf.mjs ...`
   - `node scripts/deck-export-pptx-raster.mjs ...`
   - `node scripts/deck-export-pptx-hybrid.mjs ...`

## Origem A — Pos-sabatina

1. Use a skill **`sabatina-prd`** ate o PRD estar completo.
2. Mapeie secoes do PRD para chaves do JSON:
   - Titulo / subtitulo → `TITLE`, `SUBTITLE`
   - Problema, objetivo → `PROBLEM`, `GOAL`
   - Usuario primario → `USER_PRIMARY`
   - Decisao skill vs interface → `SKILL_OR_UI`
   - Escopo → `SCOPE_IN`, `SCOPE_OUT`
   - Requisitos priorizados → `raw.BULLETS_HTML` como `<ul class="compact">...</ul>`
   - Metrica de sucesso → `SUCCESS_METRIC`
   - Riscos / proximos passos → `RISKS`, `NEXT_STEPS`
3. **Truncamento:** caixas `.slot` tem `max-height` no CSS; textos muito longos serao cortados visualmente — resuma no JSON (ex.: problema com menos de 600 caracteres).

## Origem B — Leitura de entregas ja feitas

Use quando **nao** houver sabatina formal, mas existir material consolidado:

| Fonte | O que extrair |
|-------|----------------|
| `plans/in-progress/*.md` | Objetivo, escopo, requisitos, decisoes |
| `docs/05-ARCHITECTURE-DECISIONS.md` | Decisoes que viram `SKILL_OR_UI` ou riscos |
| `docs/prd/*.md` ou specs | Mesmo mapeamento da Origem A |
| Issues / commits / README | Somente como complemento; nao substitui PRD |
| Codigo (`app/`) | Nome de fluxos, telas, entidades para bullets tecnicos |

**Processo sugerido para o agente:**

1. Ler ficheiros indicados pelo usuario (ou descobrir os mais recentes em `plans/`).
2. Listar **fatos extraidos** em bullet (para transparencia).
3. Preencher `replace.*` com texto **curto e factual**.
4. Montar `raw.BULLETS_HTML` a partir de listas extraidas.
5. **Slides livres:** usar `FREE_HTML_1` para diagrama ASCII, tabela comparativa, ou notas; `FREE_HTML_2` para conteudo totalmente livre. Se nao houver ideia, deixar `""` (slide vazio com dica visual).

## Parte deterministica vs livre

- **Deterministico:** todos os campos em `replace` passam por **escape HTML** no script — texto puro, sem tags.
- **Semi-livre:** `raw.BULLETS_HTML`, `FREE_HTML_*` — **sem escape**; o agente controla markup. Deve usar classes existentes (`.slot`, `.compact`, cores inline coerentes com o tema escuro) para nao “quebrar” o layout.
- **0% deterministico (proposital):** slides “Livre 1 / Livre 2” — conteudo quase todo em `FREE_HTML_*`; o agente pode inserir estruturas novas (tabelas, colunas) desde que respeite legibilidade em 16:9.
- **Export atual por slide:** o template define `data-export-mode` e `data-slide-type`; no estado atual do `deck-base.html`, todos os slides do fluxo principal estao marcados para saida editavel.
- **Regra de ouro:** o deck atual nao e um conversor universal de qualquer HTML para PPTX. Ele depende de um contrato semantico; ver `references/ESTRUTURA-SEMANTICA-PPTX.md` antes de redesenhar a base.

## Checklist antes de entregar

- [ ] JSON valido (sem trailing commas)
- [ ] Nenhum segredo ou dado pessoal em claro
- [ ] `DECK_TITLE` e `META_LINE` coerentes
- [ ] `SKILL_OR_UI` explicita **skill**, **interface** ou **hibrido**
- [ ] Script executou sem erro; HTML abre no browser
- [ ] Slides livres: HTML bem formado (fechar tags)

## Referencia de schema e tema

- **`references/SCHEMA-DECK.md`** — chaves `replace` / `raw` para `assets/deck-base.html`.
- **`references/ESTRUTURA-SEMANTICA-PPTX.md`** — o que pode mudar sem quebrar o mapper do PPTX.
- **`references/DESIGN-SYSTEM-V4.md`** — paleta **preto + vermelho** e logo `app/public/logov4.webp` em cada slide (`%%LOGO_SRC%%`).

## Erros comuns

- Colocar HTML em campos de `replace` — vai aparecer escapado como texto.
- Esquecer `raw.BULLETS_HTML` — slide de requisitos fica vazio.
- Texto longo demais nas `.slot` — overflow cortado; resumir.
- Correr `fill-deck.mjs` sem `cd` para a pasta da skill quando se usam caminhos relativos nos argumentos — preferir o comando em **Fluxo resumido** acima.

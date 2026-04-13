# Schema do JSON — relatorio-deck-html

## Formato raiz

```json
{
  "replace": { "...": "..." },
  "raw": { "...": "..." }
}
```

## Campos `replace` (texto puro — escapado pelo script)

| Chave | Uso | Tamanho sugerido |
|-------|-----|-------------------|
| `DECK_TITLE` | `<title>` da pagina | curto |
| `LOGO_SRC` | URL ou caminho do logo V4 (`logov4.webp`); omitir = defeito do `fill-deck.mjs` | ver `DESIGN-SYSTEM-V4.md` |
| `TITLE` | Titulo principal slide 1 | ate ~120 chars |
| `SUBTITLE` | Subtitulo slide 1 | ate ~160 chars |
| `META_LINE` | Rodape meta (projeto, data) | uma linha |
| `BIG_STAT_LABEL` | Legenda acima do numero grande (slide impacto) | curta |
| `BIG_STAT` | Numero ou metrica em destaque (ex. `40%`, `R$ 2M`) | muito curto |
| `IMPACT_LINE` | Frase de apoio ao impacto | 1–3 linhas |
| `PROBLEM` | Dor / contexto | 2–6 linhas |
| `GOAL` | Objetivo | 1–3 linhas |
| `USER_PRIMARY` | Quem usa o resultado | 2–4 linhas |
| `SKILL_OR_UI` | Decisao + justificativa | 3–8 linhas |
| `SCOPE_IN` | Dentro do escopo | lista ou paragrafo |
| `SCOPE_OUT` | Fora do escopo | lista ou paragrafo |
| `SUCCESS_METRIC` | Como medir sucesso | 1–3 linhas |
| `WHY_NOW_TITLE` | Titulo “por que agora” | curto |
| `WHY_NOW_BODY` | Contexto / urgencia | 2–4 linhas |
| `PILLAR_1_TITLE` … `PILLAR_3_TITLE` | Titulos dos 3 pilares | 2–4 palavras |
| `PILLAR_1_DESC` … `PILLAR_3_DESC` | Descricao de cada pilar | 1–3 linhas |
| `BEFORE_TITLE` | Coluna “antes” | curto |
| `BEFORE_BODY` | Texto antes | 2–5 linhas |
| `AFTER_TITLE` | Coluna “depois” | curto |
| `AFTER_BODY` | Texto depois | 2–5 linhas |
| `TECH_TITLE` | Titulo stack / tech | curto |
| `TECH_BODY` | Paragrafo tecnico | 3–8 linhas |
| `KPI_INTRO` | Intro as metricas | uma linha |
| `STAKE_TITLE` | Stakeholders | curto |
| `STAKE_BODY` | Quem e papel | 3–8 linhas |
| `RISKS` | Riscos principais | 2–5 linhas |
| `NEXT_STEPS` | Proximos passos | lista numerada em texto |
| `CTA_TITLE` | Titulo fechamento | curto |
| `CTA_SUB` | Subtitulo CTA | uma linha |
| `CTA_BODY` | Proxima acao / contato | 3–6 linhas |
| `COMMERCIAL_BLURB` | Texto curto acima da tabela comercial (slide investimento) | 1–3 linhas |
| `CHART_CAPTION` | Legenda do grafico SVG (slide cenario) | 1–2 linhas |

## Campos `raw` (HTML — **nao** escapado)

| Chave | Uso |
|-------|-----|
| `BULLETS_HTML` | Bloco HTML, tipicamente `<ul class="compact">...</ul>` |
| `TIMELINE_HTML` | Passos ou marcos (ex. `<ul class="compact">` com3 `<li>`) |
| `TECH_BADGES_HTML` | Chips / spans inline (opcional) |
| `KPI_HTML` | Grelha de KPIs: ex. varios `<div>` ou mini-cards em HTML |
| `FREE_HTML_1` | Slide livre 1 |
| `FREE_HTML_2` | Slide livre 2 |
| `PRICING_TABLE_HTML` | Tabela comercial (use `<table class="deck-proposal-table">` para estilo V4) |
| `CHART_SVG_HTML` | Grafico em SVG inline (export PPTX editavel rasteriza para PNG) |
| `CHART_LEGEND_HTML` | Legenda ao lado do grafico (HTML cru, ex.: `ul.deck-chart-legend` com `span.swatch`) |

## Placeholders no template

Correspondem a `%%CHAVE%%` em `assets/deck-base.html`. Tema **V4 preto + vermelho** e logo: `references/DESIGN-SYSTEM-V4.md`.

## Notas

- Chaves ausentes: substituidas por vazio (pode gerar aviso no console).
- Novos slides: edite `assets/deck-base.html` + este schema.
- **Motor de preenchimento:** `scripts/skill-tools/deck-fill.mjs` na raiz do repo; o ficheiro `relatorio-deck-html/scripts/fill-deck.mjs` e um **wrapper** que chama esse motor (evita duplicar logica entre skills).
- Exemplo **proposta comercial ficticia completa:** `examples/exemplo-proposta-comercial-fake.json`.

## Legibilidade em 16:9

O CSS limita alturas para caber em **16:9**. Resuma textos longos no JSON.

# Aprendizado: converter HTML em PPTX (deck V4 Colli)

Documento de contexto para continuar o trabalho (outra IA, outro dev). Resume o que o projeto já faz, limitações reais do PowerPoint e caminhos promissores.

## Contexto do repo

- **Template / motor:** skill `relatorio-deck-html` em `.claude/skills/relatorio-deck-html/`.
- **HTML base:** `assets/deck-base.html` — slides em `<section class="slide">`, CSS próprio (16:9 lógico no browser), export via toolbar.
- **Preenchimento:** `scripts/skill-tools/deck-fill.mjs` substitui `%%CHAVES%%` a partir de JSON (`examples/*.json`).
- **Saída de teste:** `dist/deck-filled.html` (abrir no browser; precisa rede para CDNs: html2canvas, jsPDF, PptxGenJS).

## Duas estratégias já implementadas

### 1. PPTX “imagem” (pixel-perfect, não editável)

- **Como:** `html2canvas` captura cada slide → JPEG → um slide PPTX com imagem full-bleed (`10" × 5.625"` para layout 16:9).
- **Prós:** fidelidade visual alta (gradientes, bordas tracejadas, grid, tipografia).
- **Contras:** texto não é editável; arquivo pesado; depende de fontes/carregamento e CORS de assets.

### 2. PPTX “editável” (PptxGenJS)

- **Como:** `addEditableSlideFromDom` percorre **filhos diretos** do `<section class="slide">` e mapeia para `addText`, `addTable`, `addImage`, `addShape`.
- **Prós:** texto e tabelas nativas no PowerPoint; SVG vira PNG e entra como imagem; logo WebP convertido para PNG antes de embutir.
- **Contras:** **não existe** conversão fiel de “HTML+CSS arbitrário” para OOXML; é um **mapeamento manual** por padrões de DOM (`slide-label`, `layout-split`, `rich-html`, `.slot`, etc.). Qualquer layout novo exige código novo ou cai em `plainText()`.

Arquivo de referência: em `deck-base.html`, bloco `<script>` com `addEditableSlideFromDom`, `pptxWalkColumn`, `appendRichHtmlToPptx`, `svgToPngDataUrlForPptx`, `pptxSlotFrame`, `dataUrlToPngForPptx`.

## Problemas já encontrados e como foram tratados

| Problema | Causa provável | Mitigação no projeto |
|----------|----------------|----------------------|
| Logo distorcida no PPTX | `addImage` com largura/altura fixas | Calcular proporção a partir de `naturalWidth` / `naturalHeight` após PNG. |
| Tabela em `.free-html` virou texto | Só se usava `innerText` no container | Rotear `.free-html` com `appendRichHtmlToPptx` (usa `querySelector('table')` + `addTable`). |
| SVG do gráfico não aparecia | Rasterização SVG→PNG frágil (tamanho implícito) | `svgToPngDataUrlForPptx`: canvas dimensionado pelo `viewBox` (ou width/height) do SVG. |
| Bordas “some” no editável | CSS não vira shape OOXML | `pptxSlotFrame`: `RECTANGLE` com fill + line antes do texto; aplicado a slots, pilares, compare, KPI, moldura opcional em torno de tabelas. |
| Colunas (`layout-split`) | Export linear não sabia dividir X | `pptxWalkColumn` recursivo com larguras de coluna; `appendRichHtmlToPptx` recebe `{ x, w }`. |

## Limitações estruturais (importante para a próxima IA)

1. **PowerPoint não é um browser.** Gradientes complexos, `backdrop-filter`, sombras e bordas tracejadas CSS não têm equivalente 1:1 sem imagem ou sem muito código por slide.
2. **PptxGenJS** é ótimo para **primitivas** (texto, tabela, imagem, retângulo). Para **HTML rico genérico**, ou se rasteriza, ou se define um **design system** de componentes com mapeamento explícito.
3. **Ordem de empilhamento:** shapes desenhados antes do texto ficam atrás; útil para “caixas” de slot.
4. **SVG com fontes externas** pode renderizar diferente no canvas; preferir paths ou fontes system no SVG se precisar precisão absoluta.

## Direções para “avanço maior” (sugestões objetivas)

Ordem do que costuma dar mais ganho vs esforço:

1. **Pipeline híbrido por slide:** flag no JSON ou `data-export="raster"` em `<section>` para slides complexos irem só como imagem; o resto editável. Melhora percepção sem abandonar edição onde importa.
2. **Chromium headless (Playwright/Puppeteer):** renderizar HTML em alta resolução e recortar por slide → PNG por slide → PPTX só imagens **ou** OCR/layout analysis (mais pesado).
3. **LibreOffice / unoconv:** `html` → PDF/intermediário → PPTX (qualidade e editabilidade variam; vale PoC isolado).
4. **python-pptx** ou **OOXML manual:** mesmo desafio de mapeamento; útil se a equipe preferir Python e controle fino de partes.
5. **“HTML restrito” no deck:** contrato de tags/classes (como já há com `layout-split`, `rich-html`) e validação no fill — reduz surpresas no export.
6. **Chart:** em vez de só SVG, gerar também **Excel embutido** ou imagem + tabela de dados em slide oculto (avanço de negócio, não só visual).

## Comandos úteis

```bash
# Espelhar skill Claude → Cursor/Agents/Codex
bash scripts/sync-skills.sh

# Regenerar HTML de exemplo
cd .claude/skills/relatorio-deck-html
node scripts/fill-deck.mjs examples/exemplo-proposta-comercial-fake.json
```

## Referências no projeto

| O quê | Onde |
|-------|------|
| Schema de chaves JSON | `.claude/skills/relatorio-deck-html/references/SCHEMA-DECK.md` |
| Motor de replace | `scripts/skill-tools/deck-fill.mjs` |
| Export PDF/PPTX + mapeamento DOM | `.claude/skills/relatorio-deck-html/assets/deck-base.html` (scripts finais do `<body>`) |
| Skill markdown | `.claude/skills/relatorio-deck-html/SKILL.md` |

## O que pedir à próxima IA

- Objetivo explícito: **só pixel-perfect**, **só editável**, ou **híbrido** (por slide ou por região).
- Se editável: lista de **padrões HTML** que devem ser suportados (ex.: só `table.deck-proposal-table` + `div.layout-split` + …).
- Aceitar **trade-off:**100% fidelidade visual com texto editável em HTML arbitrário **não é realista** num único passo sem raster ou sem produto tipo layout engine.

---

*Última atualização alinhada ao deck V4 Colli (`relatorio-deck-html`): export editável com tabelas, SVG rasterizado, logo proporcional, molduras em slots e suporte a `layout-split`.*

# Deck HTML (relatorio semi-deterministico)

Templates e exemplos vivem **nesta skill** (`assets/`, `examples/`, `references/`). O **motor** que substitui `%%CHAVE%%` esta **centralizado** em `scripts/skill-tools/deck-fill.mjs` na raiz do repo; `scripts/fill-deck.mjs` aqui e apenas um **wrapper**.

## Ficheiros

| Caminho | Papel |
|---------|--------|
| `assets/deck-base.html` | Template `%%CHAVE%%` (slides PRD + comerciais + `rich-html`) |
| `scripts/fill-deck.mjs` | Wrapper → chama `../../../scripts/skill-tools/deck-fill.mjs` |
| `examples/exemplo-pos-sabatina.json` | Exemplo PRD pos-sabatina |
| `examples/exemplo-proposta-comercial-fake.json` | Proposta comercial **ficticia** completa (tabela + SVG + texto) |
| `references/SCHEMA-DECK.md` | Schema do JSON |
| `references/ESTRUTURA-SEMANTICA-PPTX.md` | Contrato semantico que protege o PPTX editavel |
| `references/DESIGN-SYSTEM-V4.md` | Marca V4 |
| `dist/` | Saida gerada (gitignored) |

## Comando

```bash
cd .claude/skills/relatorio-deck-html
node scripts/fill-deck.mjs examples/exemplo-proposta-comercial-fake.json
```

Ou PRD curto:

```bash
node scripts/fill-deck.mjs examples/exemplo-pos-sabatina.json
```

Abrir `dist/deck-filled.html` no browser.

**Logo:** o motor embute `app/public/logov4.webp` em `data:` (ou placeholder SVG). **PPTX editável** converte o logo para **PNG** no browser (PptxGenJS / PowerPoint nao gostam de WebP no `addImage`).

## Exportar PDF e PPTX (barra no topo)

| Botao | Biblioteca | Notas |
|-------|------------|--------|
| **Baixar PDF** | html2canvas + jsPDF | Captura raster por slide. |
| **PPTX editável** | PptxGenJS | O template atual foi ajustado para sair **100% editável** no fluxo principal, com cards, métricas, tabelas e chart aproximados em elementos nativos. |
| **PPTX imagem** | PptxGenJS | Um JPEG full-bleed por slide (pixel-perfect, texto nao editavel). |
| **Imprimir…** | — | `window.print()`. |

O template-base atual declara todos os slides como `data-export-mode="editable"`. A API e os scripts continuam suportando estrategia hibrida, mas a configuracao entregue hoje resolve os 18 slides como editaveis.

HTML complexo em `.free-html` continua a ser candidato forte a raster. Use **`.rich-html`** com `<table>` quando quiser maximizar editabilidade no PowerPoint.

Importante: o sistema atual **nao** e um conversor universal de qualquer HTML para PPTX editavel. Ele funciona bem porque o template segue um **contrato semantico**. Antes de redesenhar o deck, leia `references/ESTRUTURA-SEMANTICA-PPTX.md`.

## QA no browser real

Existe um script para snapshot/QA com Chromium via Playwright:

```bash
cd .claude/skills/relatorio-deck-html
node scripts/deck-export-browser.mjs dist/deck-filled.html dist/browser-export --pdf
```

Requer:

```bash
npm install -D playwright
npx playwright install chromium
```

Saidas:

- `manifest.json` com o plano de export por slide
- `slide-01.png`, `slide-02.png`, ...
- `deck-browser.pdf` quando usado com `--pdf`

## Export server-side com Chromium

PDF no browser real:

```bash
node scripts/deck-export-pdf.mjs dist/deck-filled.html dist/browser-pdf/deck.pdf
```

PPTX imagem no browser real:

```bash
node scripts/deck-export-pptx-raster.mjs dist/deck-filled.html dist/browser-pptx/deck_imagem_browser.pptx
```

PPTX editável no browser real:

```bash
node scripts/deck-export-pptx-hybrid.mjs dist/deck-filled.html dist/browser-pptx/deck_final_hibrido.pptx
```

Nesse ultimo modo:

- slides `editable` seguem o mapeamento nativo do deck
- slides `raster` usam screenshot real do Chromium
- slides `auto` resolvem para o melhor modo com fallback para raster

No estado atual do template-base:

- `18/18` slides resolvem como editaveis
- `0` slides raster
- `0` fallbacks no exemplo comercial ficticio

Servir por `http://` na raiz do repo ajuda fontes e CDN. Skill **`pptx`**: OOXML avancado (`unpack`/`pack`).

## Motor centralizado

Ver **`scripts/skill-tools/README.md`** na raiz do projeto — outros geradores partilhados devem ir para essa pasta; cada skill mantem wrappers finos.

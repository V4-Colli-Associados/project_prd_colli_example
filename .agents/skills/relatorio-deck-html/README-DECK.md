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

**Logo:** o motor embute `app/public/logov4.webp` em `data:` (ou placeholder SVG). **PPTX editavel** converte o logo para **PNG** no browser (PptxGenJS / PowerPoint nao gostam de WebP no `addImage`).

## Exportar PDF e PPTX (barra no topo)

| Botao | Biblioteca | Notas |
|-------|------------|--------|
| **Baixar PDF** | html2canvas + jsPDF | Captura raster por slide. |
| **PPTX editavel** | PptxGenJS | Caixas de texto, **tabelas** (de `.rich-html table`) e **SVG** (rasterizado a PNG). Logo WebP → PNG. |
| **PPTX imagem** | PptxGenJS | Um JPEG full-bleed por slide (pixel-perfect, texto nao editavel). |
| **Imprimir…** | — | `window.print()`. |

HTML complexo em `.free-html` continua a exportar como **texto simples** no modo editavel; use **`.rich-html`** com `<table>` ou `<svg>` para stress-test de PPTX.

Servir por `http://` na raiz do repo ajuda fontes e CDN. Skill **`pptx`**: OOXML avancado (`unpack`/`pack`).

## Motor centralizado

Ver **`scripts/skill-tools/README.md`** na raiz do projeto — outros geradores partilhados devem ir para essa pasta; cada skill mantem wrappers finos.

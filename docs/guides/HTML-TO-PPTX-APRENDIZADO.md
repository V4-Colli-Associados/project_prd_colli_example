# Aprendizados: skill `relatorio-deck-html` (deck V4 + HTML → PDF/PPTX)

Documento de **contexto e decisões** para quem continua o trabalho (outra IA, outro dev). Cobre a **estrutura da skill**, o **template HTML**, os **três exports** e **limitações** reais — não só “HTML para PPTX”.

---

## 1. Papel da skill no repo

| O quê | Descrição |
|-------|-----------|
| **Objetivo** | Gerar um **HTML** com slides 16:9, tema V4 (preto + vermelho), a partir de **JSON** determinístico + blocos HTML crus (`raw`). |
| **Fonte única** | `.claude/skills/relatorio-deck-html/` — alterar aqui; depois `bash scripts/sync-skills.sh` espelha para `.cursor/skills/`, `.agents/skills/`, `.codex/skills/`. |
| **Motor de preenchimento** | `scripts/skill-tools/deck-fill.mjs` (raiz do repo). Wrapper: `relatorio-deck-html/scripts/fill-deck.mjs`. |
| **Contrato de dados** | `references/SCHEMA-DECK.md` — chaves `replace` (escape) vs `raw` (HTML literal). |
| **Instruções para agentes** | `SKILL.md` na pasta da skill (fluxo, checklist, erros comuns). |

**Entregável principal no browser:** `dist/deck-filled.html` (gerado localmente; pastas `dist` podem estar no `.gitignore` — o que versiona é template + JSON + scripts).

---

## 2. Estrutura de ficheiros (skill)

```
relatorio-deck-html/
  SKILL.md                 # Como usar a skill, fluxo, checklist
  README-DECK.md           # Uso rápido do fill
  assets/deck-base.html    # Template único: CSS + HTML dos slides + scripts de export
  scripts/fill-deck.mjs    # Chama deck-fill.mjs no repo
  examples/*.json          # Dados de exemplo (ex.: proposta comercial fictícia)
  references/
    SCHEMA-DECK.md         # Chaves JSON
    DESIGN-SYSTEM-V4.md    # Tema / logo
```

O ficheiro **grande** é `deck-base.html` (~1,7k linhas): nele vivem design system, marcação de cada slide e toda a lógica **PDF / PPTX editável / PPTX imagem**.

---

## 3. Modelo de conteúdo: determinístico vs livre

- **`replace.*`** — texto puro; o motor faz **escape HTML**. Ideal para títulos, parágrafos curtos, métricas.
- **`raw.*`** — HTML **sem escape**; o agente controla markup (`BULLETS_HTML`, `PRICING_TABLE_HTML`, `CHART_SVG_HTML`, `FREE_HTML_*`, etc.).
- **Slides “Livre 1 / 2”** — quase só `FREE_HTML_*`; útil para tabelas ou grelhas que não cabem no schema fixo.

**Truncagem:** `.slot` e listas usam `max-height` + `overflow: hidden` no CSS; textos longos **cortam-se** no ecrã — convém resumir no JSON.

---

## 4. Sistema de layout no HTML (contrato visual)

O template não é HTML genérico: há **classes convencionadas** que o export PPTX editável também tenta respeitar.

| Classe / padrão | Uso |
|-----------------|-----|
| `.slide` / `.slide--light` | Slide escuro ou claro; `aspect-ratio: 16/9`. |
| `.slide-label` | Eyebrow / secção (export mapeado). |
| `.layout-split`, `.layout-split--55`, `--56`, `--37`, `--tight` | Grelha2 ou 3 colunas; gaps e proporções. |
| `.layout-stack` | Coluna vertical de blocos. |
| `.deck-col-with-icon` | Ícone + conteúdo. |
| `.slot` | Caixa de conteúdo (tracejada no tema); variantes `.tall`, `.medium`, `.small`. |
| `.ph-icon`, `.ph-media` | Placeholders para ícone / imagem (PPTX editável muitas vezes **ignora** ou substitui por nota). |
| `.rich-html` | Bloco com tabela ou SVG (export trata `table` + `svg`). |
| `.pillars` / `.pillar` | Três colunas de pilares. |
| `.compare` | Antes / depois. |
| `.deck-chart-legend` + `.swatch` | Legenda ao lado do gráfico (`CHART_LEGEND_HTML`). |

**Decisões visuais recentes (HTML):** cantos **menos arredondados** (ex.: slide ~8px, slots ~5px); **tracejados mais visíveis** (`1.5px`, cor de borda reforçada); `layout-split` com **`align-items: start`** para colunas alinhadas ao topo; área do gráfico com borda tracejada coerente.

**Nota:** títulos podem ter `class="slot"` com `border:none` inline para **não** parecerem caixa no browser — útil para PPTX que desenha moldura só quando há “slot” semântico; pode gerar **inconsistência visual** se não for disciplinado.

---

## 5. Três formas de saída (toolbar no `deck-base.html`)

| Botão | Tecnologia | O que obténs |
|-------|------------|--------------|
| **PDF** | html2canvas + jsPDF | Uma página por slide; **próximo do pixel** do browser. |
| **PPTX imagem** | html2canvas + PptxGenJS | Slides só com **foto**16:9; **não editável** como texto; fidelidade alta. |
| **PPTX editável** | PptxGenJS + mapeamento DOM | Texto e tabelas nativos; SVG → PNG; logo WebP → PNG; **não replica CSS**. |

**Regra prática:** para **apresentação final bonita**, PDF ou **PPTX imagem** alinham-se com o HTML. Para **editar no PowerPoint**, **PPTX editável** — aceitar diferenças ou investir mais em `addEditableSlideFromDom` / `pptxWalkColumn`.

---

## 6. PPTX editável — o que está implementado

Funções principais (no `<script>` final de `deck-base.html`):

- **`addEditableSlideFromDom`** — itera filhos diretos do `<section class="slide">`; trata `accent-bar`, `slide-label`, `layout-split`, `rich-html`, `pillars`, `compare`, slots, `free-html` via `appendRichHtmlToPptx`, etc.
- **`pptxWalkColumn`** — percorre colunas dentro de `layout-split` / `layout-stack` / `aside` com larguras `x`/`w`.
- **`appendRichHtmlToPptx`** — primeira `table` → `addTable`; primeiro `svg` → PNG; senão `plainText`. Moldura à volta da tabela: **`pptxSlotFrame(..., "solid")`**.
- **`svgToPngDataUrlForPptx`** — raster com canvas usando **`viewBox`** (ou width/height) do SVG.
- **`dataUrlToPngForPptx`** — WebP/outros → PNG para o logo.
- **`pptxSlotFrame`** — retângulo por baixo do texto; contorno **`line.dashType: "dash"`** para imitar tracejado dos slots; **sólido** só na moldura de tabelas.
- **Logo** — dimensões proporcionais (`naturalWidth` / `naturalHeight`), posicionada no canto inferior direito do slide 16:9.

**Problemas já corrigidos (histórico):** logo esticada; tabela dentro de `.free-html` em texto cru; SVG ausente; colunas ignoradas; molduras ausentes — ver secção 8.

---

## 7. Limitações estruturais (importante)

1. **PowerPoint não é um browser** — gradientes fortes, sombras, `backdrop-filter`, tracejado **idêntico** ao CSS: só com raster ou aproximação (ex.: `dash` no outline do shape).
2. **HTML arbitrário → OOXML** sem perda **não existe** num único passo; o projeto usa **mapeamento por padrões**. Layout novo = código novo ou degradação para texto.
3. **Placeholders** (`ph-icon`, `ph-media`) no PPTX editável podem não aparecer como no HTML.
4. **SVG** com fontes web pode rasterizar diferente do ecrã.
5. **`.gitignore`** pode excluir `dist/` — o pipeline local gera `deck-filled.html`; quem clona o repo precisa correr `fill-deck.mjs`.

---

## 8. Histórico de problemas → mitigações| Problema | Mitigação |
|----------|-----------|
| Logo distorcida no PPTX | Proporção a partir do PNG decodificado; posição no canto. |
| Tabela no último slide em texto | `.free-html` passa por `appendRichHtmlToPptx`. |
| SVG do gráfico não aparece | Raster com `viewBox`; tamanho da imagem com aspect ratio. |
| Bordas “somem” no editável | `pptxSlotFrame` + texto com margem interna; tracejado via `dashType`. |
| `layout-split` ignorado | `pptxWalkColumn` + larguras de coluna. |
| Cantos “muito redondos” / tracejado fraco | Ajuste de `border-radius` e `1.5px dashed` no CSS; PPTX com `dash`. |

---

## 9. Direções para evolução (prioridade sugerida)

1. **Híbrido por slide** — atributo ou chave JSON: slide só como **imagem** no PPTX editável, resto nativo.
2. **Contrato de layout** — validar no fill que só aparecem classes suportadas (reduz surpresas no export).
3. **Google Slides** — outro produto (API, template, OAuth); não é extensão trivial deste HTML.
4. **Produto “só PDF/HTML”** — se o cliente não precisa de `.pptx`, simplificar comunicação e menos manutenção no PPTX editável.
5. **Chromium headless** — alternativa para captura mais estável que só html2canvas (custo de infra).

---

## 10. Comandos úteis

```bash
# Raiz do repo project_prd_colli_example
bash scripts/sync-skills.sh

cd .claude/skills/relatorio-deck-html
node scripts/fill-deck.mjs examples/exemplo-proposta-comercial-fake.json
# Abrir dist/deck-filled.html no browser (http:// recomendado por causa de fontes/CDN)
```

---

## 11. Referências rápidas

| Ficheiro | Conteúdo |
|----------|----------|
| `docs/guides/HTML-TO-PPTX-APRENDIZADO.md` | Este doc (estrutura + aprendizados). |
| `.claude/skills/relatorio-deck-html/SKILL.md` | Uso da skill para agentes. |
| `.claude/skills/relatorio-deck-html/references/SCHEMA-DECK.md` | Chaves JSON. |
| `scripts/sync-skills.sh` | Espelho Claude → Cursor/Agents/Codex. |
| `scripts/skill-tools/deck-fill.mjs` | Motor `%%CHAVE%%` + logo em data URL. |

---

## 12. O que pedir à próxima IA

- Objetivo do entregável: **PDF**, **PPTX imagem**, **PPTX editável**, ou **combinação** (e em quais slides).
- Lista de **padrões DOM** que têm de ser suportados no editável.
- Aceitar que **fidelidade 100%** entre HTML e PPTX editável **sem** raster por slide **não é realista** para HTML livre.

---

*Última atualização: estrutura da skill `relatorio-deck-html`, sistema de layout no `deck-base.html`, exports PDF / PPTX imagem / PPTX editável (incl. molduras tracejadas vs sólidas em tabelas), e decisões visuais recentes nos slots e slides.*

# Plano de Implementacao: HTML -> PPTX com Alta Fidelidade

Documento de execucao para evoluir a stack atual de deck HTML do projeto para uma arquitetura de export com:

- alta fidelidade visual no entregavel final
- suporte realista a `PPTX` editavel onde fizer sentido
- modelo de deck mais completo, reutilizavel e previsivel
- menor custo de manutencao do que tentar converter "HTML arbitrario" para PowerPoint

Este plano parte do estado atual documentado em [HTML-TO-PPTX-APRENDIZADO.md](./HTML-TO-PPTX-APRENDIZADO.md) e do template real em [deck-base.html](/Users/luissantos/Desktop/Dev/treinamento-vibe-coding/project_prd_colli_example/.claude/skills/relatorio-deck-html/assets/deck-base.html:1).

---

## 1. Resumo executivo

### Decisao principal

O produto final deve deixar de perseguir `HTML livre -> PPTX editavel fiel` como objetivo universal.

O caminho recomendado e:

1. `HTML` como fonte visual principal
2. `Chromium headless` como motor de renderizacao real para `PDF` e `PPTX imagem`
3. `PPTX hibrido por slide` para combinar:
   - slides rasterizados com fidelidade alta
   - slides nativos editaveis apenas quando seguem contratos de layout conhecidos
4. `PptxGenJS` e `python-pptx` como motores estruturados, nao como "browser substitute"

### Tese

Para o projeto atual, a melhor qualidade final nao vem de uma lib magica de conversao, e sim de uma arquitetura que separa:

- o que precisa ser visualmente identico ao HTML
- o que precisa ser editavel no PowerPoint
- o que pode ser representado por componentes semanticos e contratos fixos

---

## 2. O que temos hoje vs o que deveriamos ter

## 2.1 Estado atual

### Arquitetura

- O template HTML concentra layout, tema e tres exports no mesmo ficheiro.
- `PDF` e `PPTX imagem` usam `html2canvas`.
- `PPTX editavel` usa `PptxGenJS` com mapeamento manual de DOM.
- O schema separa `replace` e `raw`.
- O deck aceita HTML semi-livre, inclusive tabelas, SVGs e slides livres.

### Pontos fortes

- O repo ja reconhece a limitacao estrutural do problema.
- O template atual tem bom contrato visual e um conjunto util de classes.
- O export editavel ja cobre casos relevantes: texto, colunas, tabelas e SVG rasterizado.
- Existe uma segunda trilha local de `JSON -> PPTX` com `python-pptx`.

### Gargalos

- `html2canvas` nao usa o navegador como motor real de screenshot e costuma divergir em CSS, fontes, filtros e rendering.
- `deck-base.html` mistura responsabilidades demais: design system, markup, toolbar, export, parsing e regras de mapeamento.
- O `PPTX editavel` ainda depende de heuristicas por classe, o que torna cada novo layout um custo de engenharia.
- O schema atual e bom para a primeira geracao, mas ainda esta orientado a placeholders, nao a um modelo de componentes.
- Slides livres sao muito poderosos para HTML, mas caros para export editavel.

## 2.2 Estado alvo

### Arquitetura alvo

- `Deck spec` semantico e versionado
- `Renderer HTML` desacoplado
- `Renderer PPTX native` desacoplado
- `Renderer raster` baseado em Chromium headless
- `Modo de export por slide`

### Resultado esperado

- `PDF` com fidelidade alta ao HTML final
- `PPTX final` com alta fidelidade visual
- `PPTX editavel` apenas nos slides apropriados
- Menos regressao quando o template visual evoluir
- Mais velocidade para agentes e devs criarem decks novos

---

## 3. Diagnostico tecnico do template atual

## 3.1 O que esta certo no `deck-base.html`

O template atual ja tem varios acertos:

- contrato visual coerente
- alternancia dark/light
- classes de layout reutilizaveis como `.layout-split`, `.layout-stack`, `.pillars`, `.compare`
- tratamento dedicado para `table` e `svg`
- separacao pratica entre slide estruturado e slide livre

Esses acertos devem ser preservados.

## 3.2 O que precisa mudar

### Separacao de responsabilidades

Hoje o template concentra:

- CSS do deck
- HTML de todos os slides
- toolbar de export
- logica de captura PDF
- logica de export para `PPTX imagem`
- logica de export para `PPTX editavel`

Isso dificulta manutencao, teste e evolucao.

### Modelo de slide ainda pouco semantico

Os slides hoje nascem como HTML pronto com placeholders `%%CHAVE%%`. Isso funciona, mas limita:

- validacao
- composicao programatica
- reutilizacao entre HTML e PPTX
- governanca sobre o que e exportavel como nativo

### Falta de "modo por slide"

O maior ganho tecnico e de produto ainda nao foi implementado:

- cada slide precisa declarar explicitamente se o export final e:
  - `raster`
  - `editable`
  - `auto`

Sem isso, o sistema continua tentando tratar todo slide como se fosse candidato a PPTX nativo.

---

## 4. Observacao sobre o `deck-bom.html`

O ficheiro [deck-bom.html](/Users/luissantos/Desktop/Dev/treinamento-vibe-coding/project_prd_colli_example/.claude/skills/relatorio-deck-html/assets/deck-bom.html:1) nao contem localmente o HTML dos slides finais.

Ele e um viewer/shell que referencia `iframes` externos da Genspark. Portanto:

- ele serve como referencia de ambicao visual e de densidade de conteudo
- ele nao serve como base local confiavel para parsing, reaproveitamento de estrutura ou extracao de design tokens

Conclusao: o modelo alvo deve ser desenhado a partir do `deck-base.html` real, nao a partir do `deck-bom.html`.

---

## 5. Arquitetura recomendada

## 5.1 Stack alvo

### Renderizacao visual

- `Playwright` ou `Puppeteer` para abrir o HTML final em Chromium real
- screenshot por slide em escala controlada
- PDF gerado pelo browser, nao por emulacao parcial

### Geracao PPTX

- `PptxGenJS` para:
  - masters
  - layouts base
  - slides nativos simples
  - tabelas nativas
  - imagens rasterizadas por slide
- `python-pptx` mantido como trilha complementar para pipelines server-side deterministas, nao como conversor generico de HTML

### Estrategia de export

- `PDF`: sempre via Chromium headless
- `PPTX final`: hibrido por slide
- `PPTX editavel puro`: opcional, restrito a decks ou slides com contrato suportado

## 5.2 Modos por slide

Cada slide deve declarar `exportMode`:

- `raster`
  - slide entra no `PPTX` como imagem full-bleed
  - usar para slides hero, comparativos visuais, layouts livres, grids ricos, SVGs complexos
- `editable`
  - slide nasce como elementos nativos de PowerPoint
  - usar para KPI, tabela simples, agenda, timeline curta, matriz, closing slide
- `auto`
  - tenta nativo se o tipo for suportado
  - fallback automatico para raster se detectar recurso fora do contrato

## 5.3 Contrato de tipos de slide

Em vez de pensar em "HTML livre com classes", o sistema deve pensar em `slide types`.

Tipos recomendados para v2:

- `cover`
- `hero-stat`
- `problem-goal`
- `persona-decision`
- `scope-split`
- `requirements-list`
- `timeline`
- `pillars`
- `before-after`
- `architecture`
- `kpi-grid`
- `stakeholders`
- `risks-next-steps`
- `closing-cta`
- `pricing-table`
- `chart-insight`
- `quote`
- `process-flow`
- `comparison-table`
- `appendix-freeform`

---

## 6. Como deveria ser o modelo de deck

## 6.1 Problema do modelo atual

O schema atual e centrado em chaves como `TITLE`, `SUBTITLE`, `PILLAR_1_TITLE`, `FREE_HTML_1`.

Isso e rapido para um template fechado, mas fraco para:

- composicao dinamica
- reuso entre renderers
- validacao de conteudo
- expansao para novos layouts

## 6.2 Modelo alvo

O deck deve passar a ter:

1. `meta`
2. `theme`
3. `defaults`
4. `slides[]`

Exemplo conceitual:

```json
{
  "meta": {
    "deckTitle": "Autoglass - Melhoria CRM Inbound",
    "subtitle": "Diagnostico, plano e proposta",
    "author": "V4 Colli",
    "aspectRatio": "16:9"
  },
  "theme": {
    "variant": "v4-red-black",
    "logoSrc": "..."
  },
  "defaults": {
    "exportMode": "auto"
  },
  "slides": [
    {
      "id": "cover",
      "type": "cover",
      "exportMode": "raster",
      "data": {
        "label": "Abertura",
        "title": "Autoglass - Melhoria CRM Inbound",
        "subtitle": "Mais velocidade, previsibilidade e conversao"
      }
    },
    {
      "id": "impact",
      "type": "hero-stat",
      "exportMode": "editable",
      "data": {
        "label": "Impacto em destaque",
        "statLabel": "Potencial de ganho",
        "statValue": "+22%",
        "body": "Reducao de tempo de resposta e melhor distribuicao de leads"
      }
    }
  ]
}
```

## 6.3 Beneficios do modelo alvo

- um slide passa a ser validavel por tipo
- render HTML e render PPTX usam a mesma semantica
- fica facil marcar qual slide sera raster ou editavel
- novos tipos entram de forma controlada
- o template fica mais completo sem virar um monolito de placeholders

---

## 7. Como o deck deveria ficar mais completo

## 7.1 O que falta no template atual

O `deck-base.html` atual cobre bem um deck de proposta/diagnostico, mas ainda falta uma biblioteca mais rica de componentes e tipos.

## 7.2 Biblioteca de slides recomendada

### Essenciais

- `cover`
- `agenda`
- `hero-stat`
- `problem-goal`
- `opportunity`
- `scope-split`
- `requirements-list`
- `timeline`
- `before-after`
- `risks-next-steps`
- `closing-cta`

### Comerciais

- `pricing-table`
- `roi-summary`
- `package-comparison`
- `implementation-phases`
- `commercial-terms`

### Produto e operacao

- `persona`
- `journey`
- `workflow`
- `architecture`
- `integration-map`
- `kpi-grid`
- `north-star-and-metrics`
- `stakeholder-map`

### Prova e narrativa

- `quote`
- `case-study`
- `benchmark`
- `maturity-matrix`
- `faq`
- `appendix`

## 7.3 Componentes que devem existir no HTML v2

- `deck-shell`
- `slide-frame`
- `slide-header`
- `slide-footer`
- `section-label`
- `hero-media`
- `stat-card`
- `metric-chip`
- `icon-card`
- `timeline-step`
- `comparison-card`
- `quote-block`
- `proof-strip`
- `table-wrap`
- `chart-wrap`
- `callout`
- `badge-row`
- `insight-box`

## 7.4 Regras de autoria

O modelo v2 deve reduzir o uso de HTML cru a tres zonas:

- `richText`
- `tableHtml`
- `freeformHtml`

Todo o resto deve nascer como dados estruturados.

---

## 8. O que mudar por arquivo

## 8.1 [deck-base.html](/Users/luissantos/Desktop/Dev/treinamento-vibe-coding/project_prd_colli_example/.claude/skills/relatorio-deck-html/assets/deck-base.html:1)

### Como esta

- template unico
- placeholders diretos
- export e render no mesmo ficheiro

### Como deveria ficar

- virar apenas template/render HTML
- remover logica pesada de export embutida no ficheiro
- manter somente hooks semanticos e atributos de slide
- cada slide com:
  - `data-slide-id`
  - `data-slide-type`
  - `data-export-mode`
  - `data-editable-contract`

### Acao

- quebrar em:
  - `assets/deck-base.html`
  - `assets/deck-theme.css`
  - `assets/deck-runtime.js`
  - `assets/deck-export-browser.js`

## 8.2 [SCHEMA-DECK.md](/Users/luissantos/Desktop/Dev/treinamento-vibe-coding/project_prd_colli_example/.claude/skills/relatorio-deck-html/references/SCHEMA-DECK.md:1)

### Como esta

- schema de placeholders `replace` e `raw`

### Como deveria ficar

- manter compatibilidade com v1
- introduzir `schema v2` por componentes
- documentar:
  - tipos de slide
  - campos obrigatorios por tipo
  - limite de texto por slot
  - suporte a export `editable` por tipo

## 8.3 [SKILL.md](/Users/luissantos/Desktop/Dev/treinamento-vibe-coding/project_prd_colli_example/.claude/skills/relatorio-deck-html/SKILL.md:1)

### Como esta

- instrucoes de uso focadas em JSON + fill

### Como deveria ficar

- orientar a skill a:
  - escolher tipo de slide, nao apenas preencher chaves
  - definir `exportMode` por slide
  - restringir `freeformHtml` a casos especiais
  - executar QA visual obrigatorio

## 8.4 Novo renderer browser

Criar scripts novos:

- `scripts/deck-render-browser.mjs`
- `scripts/deck-export-pdf.mjs`
- `scripts/deck-export-pptx-hybrid.mjs`
- `scripts/deck-snapshot-slides.mjs`

Responsabilidades:

- subir HTML local
- aguardar fontes e imagens
- capturar cada slide com Chromium
- montar `PPTX` hibrido

## 8.5 Novo validador de deck

Criar:

- `scripts/skill-tools/deck-validate.mjs`

Responsabilidades:

- validar schema
- validar limites de texto
- avisar quando `editable` usar recurso nao suportado
- impedir regressao silenciosa

---

## 9. Roadmap de implementacao

## Fase 1 - Separar responsabilidade e preparar export por slide

Objetivo:

- preparar a base sem quebrar o fluxo atual

Entregas:

- introduzir `data-export-mode` em cada `<section class="slide">`
- mover export JS para ficheiro proprio
- criar manifesto de slides no HTML renderizado
- documentar contratos de slide suportados

Criterio de pronto:

- deck atual continua funcionando
- cada slide pode ser marcado como `raster`, `editable` ou `auto`

## Fase 2 - Trocar `html2canvas` por Chromium headless

Objetivo:

- aumentar fidelidade e previsibilidade

Entregas:

- export `PDF` via `Playwright` ou `Puppeteer`
- export de imagens por slide via Chromium
- pipeline local para snapshot deterministico

Criterio de pronto:

- `PDF` e `PPTX imagem` saem do browser real
- comparacao visual mostra melhora em fontes, spacing e SVG

## Fase 3 - Introduzir `PPTX hibrido`

Objetivo:

- atingir alta fidelidade final sem abandonar editabilidade onde ela gera valor

Entregas:

- `PPTX final` com mistura de:
  - slide imagem
  - slide nativo
- fallback automatico de `auto -> raster`
- relatorio de quais slides foram rasterizados

Criterio de pronto:

- deck final abre no PowerPoint com boa fidelidade
- nao ha regressao severa nos slides complexos

## Fase 4 - Evoluir schema para `deck spec v2`

Objetivo:

- transformar placeholders em biblioteca de componentes

Entregas:

- `schema v2`
- parser de compatibilidade `v1 -> v2`
- novos tipos de slide
- documentacao completa por tipo

Criterio de pronto:

- pelo menos 80% dos decks novos conseguem ser montados sem `FREE_HTML_*`

## Fase 5 - Biblioteca de slides premium

Objetivo:

- deixar o modelo mais completo e mais proximo do padrao de um deck forte

Entregas:

- biblioteca de 15-20 tipos de slide
- presets visuais
- tokens de spacing, tipografia e densidade
- variantes para proposta, diagnostico, produto e comercial

Criterio de pronto:

- criacao de deck novo exige pouca ou nenhuma customizacao estrutural

---

## 10. Regras de ouro para fidelidade alta

1. Nao tentar converter qualquer HTML para objetos nativos de PowerPoint.
2. Toda vez que um slide depender de CSS sofisticado, usar `raster`.
3. Todo layout novo deve declarar se tem contrato `editable` suportado.
4. O deck final precisa ser validado visualmente slide a slide.
5. `freeformHtml` deve ser excecao, nao base do sistema.
6. O browser de renderizacao deve ser parte oficial da pipeline.

---

## 11. QA obrigatorio

## 11.1 QA visual

Para cada release:

- gerar `PDF`
- gerar `PPTX final`
- gerar snapshots JPG ou PNG por slide
- comparar com HTML de referencia

Checklist:

- fontes corretas
- sem overflow
- sem cortes
- sem borda deslocada
- sem logo distorcida
- sem tabela quebrada
- sem diferenca relevante de alinhamento

## 11.2 QA estrutural

- validar schema do deck
- validar assets carregados
- validar quantidade de slides
- validar quais slides foram exportados como raster ou native

## 11.3 QA editorial

- ordem narrativa
- densidade adequada
- slide com objetivo claro
- fechamento comercial consistente

---

## 12. Backlog priorizado

### Prioridade P0

- adicionar `exportMode` por slide
- extrair export JS de `deck-base.html`
- implementar export via Chromium headless
- manter `PPTX imagem` como trilha principal de alta fidelidade

### Prioridade P1

- criar `PPTX hibrido`
- validar contratos de slide editavel
- mapear 8-10 tipos de slide nativos

### Prioridade P2

- migrar schema para `v2`
- reduzir `FREE_HTML_*`
- criar biblioteca expandida de tipos de slide

### Prioridade P3

- benchmark com `Aspose.Slides` se houver budget
- presets por tipo de deck
- thumbnails automáticos e regression testing visual

---

## 13. Definicao de pronto

Considerar a iniciativa concluida quando:

- o `PDF` final sair de Chromium com alta fidelidade
- o `PPTX final` suportar modo hibrido por slide
- os slides complexos entrarem como raster sem degradacao relevante
- os slides simples entrarem como editaveis com boa paridade
- o schema v2 estiver documentado
- a skill orientar agentes a trabalhar por tipo de slide e nao por improviso de HTML

---

## 14. Recomendacao final

O melhor caminho para este repo nao e trocar tudo por uma nova lib. E institucionalizar um modelo mais maduro:

- `HTML` continua como a fonte visual principal
- `Chromium` vira a fonte de verdade da renderizacao
- `PPTX` deixa de ser uma conversao universal e passa a ser um produto hibrido
- o deck deixa de ser um conjunto de placeholders e vira uma biblioteca de slides tipados

Se precisarmos escolher apenas um investimento imediato, a ordem recomendada e:

1. export via Chromium
2. `exportMode` por slide
3. `PPTX hibrido`
4. `deck spec v2`

Essa sequencia entrega o maior ganho de fidelidade com o menor risco.

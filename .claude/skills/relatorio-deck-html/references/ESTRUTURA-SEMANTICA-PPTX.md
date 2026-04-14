# Estrutura Semantica do Deck para PPTX editavel

Este documento define o **contrato semantico** entre:

- o HTML do template em `assets/deck-base.html`
- o mapper JS que converte DOM em PowerPoint nativo
- os scripts de export `deck-export-pptx-*.mjs`

O objetivo e simples: permitir evoluir o `deck-base.html` sem quebrar o `PPTX editavel`.

## Regra principal

O export atual **nao** e um conversor universal de qualquer HTML para PowerPoint editavel.

Ele funciona como um **conversor orientado a contrato**:

- o HTML pode variar
- o visual pode evoluir
- mas a **estrutura semantica** precisa continuar reconhecivel para o mapper

Se o deck mudar so no nivel de:

- textos
- espacos
- cores
- pesos tipograficos
- bordas
- pequenos wrappers visuais

o sistema tende a continuar funcionando bem.

Se o deck mudar no nivel de:

- hierarquia de elementos
- classes estruturais
- tipo de componente
- padrao de colunas/cards
- substituicao de texto por SVG/canvas/HTML arbitrario

o mapper pode deixar de reproduzir o slide com fidelidade.

## Camadas do sistema

### 1. Estrutura do slide

Cada slide precisa declarar:

- `data-slide-id`
- `data-slide-type`
- `data-export-mode`
- `data-editable-contract`

Esses atributos sao lidos no manifesto de export e no roteamento do mapper.

### 2. Contrato de tipo

`data-slide-type` define **como o slide e entendido** pelo export.

Exemplos atuais:

- `cover`
- `hero-stat`
- `problem-goal`
- `timeline`
- `pillars`
- `before-after`
- `architecture`
- `kpi-grid`
- `stakeholders`
- `risks-next-steps`
- `pricing-table`
- `chart-insight`
- `appendix-freeform`

Alguns tipos usam renderer dedicado; outros usam o caminho generico.

### 3. Contrato de editabilidade

`data-editable-contract` define o nivel de previsibilidade do slide.

Valores usados hoje:

- `structured`
- `table`
- `svg`
- `freeform`

Leitura pratica:

- `structured`: deve ser composto por blocos HTML reconheciveis
- `table`: a tabela deve existir como `<table>`
- `svg`: exige traducao especifica ou aproximacao nativa
- `freeform`: maior risco de quebrar fidelidade editavel

### 4. Roteamento do export

O export decide como montar o slide usando:

- `resolvePptxMode(...)`
- `addEditableSlideFromDom(...)`

Quando um slide ganha renderer dedicado, a fidelidade sobe muito.

## O que pode mudar com seguranca

Estas mudancas sao consideradas de baixo risco:

- alterar textos placeholder
- ajustar paleta de cores
- trocar border radius
- mudar bordas, sombras e opacidade
- ajustar paddings e margins moderadamente
- mudar pesos de fonte e tamanhos de fonte de forma incremental
- adicionar wrappers neutros de layout como `div` sem mudar o sentido do bloco
- mover um bloco sem alterar sua semantica

Exemplo seguro:

- um `div.slot.medium` continua sendo o bloco principal de texto
- um `ul.compact` continua sendo a lista principal de timeline
- um grupo de badges continua sendo spans inline

## O que pode quebrar o PPTX editavel

Estas mudancas exigem revisao do mapper:

- remover ou renomear classes estruturais
- trocar `h1/h2/h3/p/ul/table` por markup totalmente diferente
- transformar cards em HTML arbitrario sem padrao repetivel
- trocar `<table>` por layout visual com `div`
- trocar um grafico SVG por `canvas`
- transformar badges em componente sem `span`
- adicionar camadas visuais que duplicam texto no DOM
- inserir blocos `free-html` no fluxo principal e esperar fidelidade total
- reordenar o slide de forma que o significado visual dependa apenas de CSS complexo

## Componentes semanticos suportados hoje

O caminho generico e os renderers atuais reconhecem, em graus diferentes, os seguintes blocos:

- `.slide-label`
- `.accent-bar`
- `h1`, `h2`, `h3`
- `.slot`
- `.slot.small`
- `.slot.medium`
- `.slot.tall`
- `ul.compact`
- `.pillars` e `.pillar`
- `.compare` e `.compare-col`
- `.layout-split`
- `.layout-stack`
- `.deck-col-with-icon`
- `.kpi-zone`
- `.rich-html`
- `.deck-proposal-table`
- `.deck-chart-legend`
- badges em `span`

Se um novo layout puder ser descrito usando esses blocos, a chance de manter editabilidade alta e grande.

## Slides com renderer dedicado

Hoje estes tipos tem renderer proprio porque o caminho generico nao era suficiente para boa fidelidade:

- `cover`
- `timeline`
- `architecture`
- `risks-next-steps`
- `chart-insight`

Implicacao importante:

- esses slides podem mudar visualmente
- mas se a estrutura semantica mudar demais, o renderer dedicado precisa ser atualizado junto

## Slides no caminho generico

Os outros slides dependem mais do parser generico.

Isso significa:

- maior flexibilidade para ajustes leves
- menor previsibilidade para redesigns radicais

Se um slide generico comecar a ficar importante demais para fidelidade, o caminho certo e promover esse tipo para um renderer dedicado.

## Convencoes recomendadas para novos slides

Ao criar ou redesenhar um slide, siga esta ordem:

1. Defina primeiro o `data-slide-type`.
2. Escolha o `data-editable-contract`.
3. Monte o DOM usando blocos semanticos repetiveis.
4. So depois refine o CSS visual.

Padroes recomendados:

- titulo principal em `h1` ou `h2`
- subtitulo/legenda em `p.muted` ou `h2`
- conteudo principal em `.slot`
- listas em `ul.compact`
- comparacoes em `.compare-col`
- grupos de cards em containers repetiveis
- tabelas reais em `<table>`
- badges em `span`

## Como decidir se precisa de renderer dedicado

Crie um renderer dedicado quando pelo menos uma destas condicoes aparecer:

- o slide e visualmente critico
- a comparacao HTML vs PPTX mostra muita divergencia
- o slide depende de alinhamento fino entre varios blocos
- o slide usa grafico, badges, timeline ou hero area complexa
- o caminho generico comeca a duplicar texto ou perder hierarquia

## Processo seguro para evoluir o template

Sempre que alterar o `deck-base.html`, siga este checklist:

1. Confirmar se o slide mudou so visualmente ou semanticamente.
2. Se mudou semanticamente, revisar o `data-slide-type` e o mapper.
3. Gerar `dist/deck-filled.html`.
4. Gerar `deck_final_hibrido.pptx`.
5. Renderizar o PPTX em imagens.
6. Comparar HTML vs PPTX nos slides mais sensiveis.

## Regra de manutencao

Se uma mudanca exigir explicar “o CSS agora faz parecer igual”, mas o DOM deixou de representar claramente os blocos do slide, o contrato semantico piorou.

Para o futuro, priorize:

- HTML que descreve a intencao do slide
- CSS que refina a aparencia
- mapper que conhece tipos e componentes

Nao priorize:

- HTML arbitrario esperando conversao perfeita para PowerPoint

## Decisao pratica

Se for redesenhar o deck inteiro, trate isso como uma evolucao de **template + mapper**, nao apenas de CSS.

Se for evoluir dentro do design system atual, mantenha:

- os `data-*` do slide
- os blocos semanticos principais
- os componentes repetiveis reconhecidos

Assim o `PPTX editavel` continua estavel no tempo.

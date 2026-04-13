# Prompts Estruturados para Gerar Skills com o Claude
**Proposito**: Colecao de prompts prontos para gerar, refinar e validar skills usando o Claude
**Ultima Atualizacao:** 2026-04-11

> **Documentos relacionados:**
> - `docs/guides/SKILL-CREATION-GUIDE.md` — Guia completo de criacao de skills
> - `docs/references/SKILL-EXAMPLES.md` — Exemplos concretos para referencia
> - `docs/templates/SKILL-TEMPLATE.md` — Template em branco para preencher manualmente

---

## Como Usar Este Documento

Este arquivo contem 3 prompts para momentos diferentes do processo de criacao de skills:

1. **Prompt Completo** — quando voce tem brandbook, apresentacoes e materiais visuais
2. **Prompt Simplificado** — quando voce so tem cores e fontes (sem brandbook)
3. **Prompt de Refinamento** — para corrigir problemas apos testar a skill

Copie o prompt desejado, substitua os trechos entre `[colchetes]` e envie para o Claude junto com os materiais.

---

## Prompt 1: Geracao Completa (Com Materiais de Marca)

Use este prompt quando voce tem brandbook, apresentacoes institucionais, screenshots ou outros materiais visuais. Envie os materiais como anexo junto com o prompt.

### Prompt

```
Analise os materiais de identidade visual que enviei (brandbook, apresentacao, 
screenshots) e gere um arquivo SKILL.md completo para uso como Skill no Claude.

Contexto do projeto:
- Nome do projeto: [nome do projeto]
- Stack tecnologico: [ex: React + TypeScript + Tailwind CSS + shadcn/ui]
- Tipo de produto: [ex: plataforma SaaS B2B, e-commerce, app mobile]
- Tom da marca: [ex: profissional mas acessivel, jovem e energetico]

O arquivo DEVE conter as seguintes secoes, nesta ordem:

## 1. Frontmatter
Gere o cabecalho YAML com:
- nome: [nome descritivo]
- descricao: texto com palavras-gatilho que ativam a skill automaticamente
  (inclua: componente, tela, dashboard, formulario, layout, pagina, botao, 
  card, tabela, modal, sidebar, menu, UI, interface)
- versao: 1.0

## 2. Filosofia de Design
Descreva em 3-5 frases o espirito visual da marca. Que sensacao deve 
transmitir? Que adjetivos definem a estetica?

## 3. Paleta de Cores
Liste TODAS as cores como CSS custom properties, organizadas em:
- Primarias da marca (com hover)
- Secundarias / acento
- Superficies (backgrounds de app, cards, modais)
- Bordas
- Texto (primario, secundario, terciario)
- Status (sucesso, erro, aviso, info)
- Dark mode (se aplicavel)

Formato obrigatorio:
--nome-da-cor: #HEXCODE; /* uso: descricao do uso */

## 4. Tipografia
Tabela completa com: elemento, fonte, tamanho (px), peso, line-height.
Niveis: display, h1, h2, h3, body, small, label, codigo.
Liste os pesos disponveis.

## 5. Espacamento e Layout
- Grid base (4px ou 8px)
- Escala de espacamento completa
- Padding de containers por breakpoint
- Largura maxima de conteudo
- Breakpoints responsivos com numero de colunas
- Comportamento da sidebar (se houver)

## 6. Componentes (JSX/HTML)
Para cada componente, forneca codigo completo com classes Tailwind:
- Botao primario, secundario, ghost, destrutivo
- Card padrao
- Input de formulario com label
- Badge / tag de status (sucesso, erro, aviso, info)
- Header de pagina com titulo e acoes
- Item de navegacao (estado ativo e inativo)

Use o stack tecnologico informado acima.

## 7. Anti-Padroes
Liste pelo menos 8 regras de "NUNCA fazer":
- Cores proibidas
- Fontes proibidas  
- Padroes visuais a evitar
- Erros comuns especificos deste projeto

## 8. Checklist de Qualidade
Lista de verificacao com pelo menos 10 itens para validar se um 
componente gerado esta alinhado com a identidade visual.

REGRAS IMPORTANTES:
- Todos os valores devem ser EXATOS (HEX, px, nomes de fonte) — nada vago
- Exemplos de codigo devem ser funcionais e usar o stack informado
- CSS custom properties devem ter comentarios de uso
- A descricao no frontmatter deve conter o maximo de palavras-gatilho relevantes
- O arquivo final deve ter entre 200 e 500 linhas
```

---

## Prompt 2: Geracao Simplificada (Sem Brandbook)

Use este prompt quando voce nao tem brandbook ou materiais visuais, mas sabe as cores, fontes e o estilo geral desejado.

### Prompt

```
Gere um arquivo SKILL.md de identidade visual para o seguinte projeto:

INFORMACOES BASICAS:
- Nome do projeto: [nome]
- Stack: [ex: React + TypeScript + Tailwind CSS + shadcn/ui]
- Tipo de produto: [ex: dashboard de analytics, loja online, app de tarefas]

CORES DA MARCA:
- Cor primaria: [#HEX — ex: #6D28D9]
- Cor secundaria: [#HEX — ex: #10B981] (ou "nao tem")
- Cor de acento: [#HEX] (ou "nao tem")
- Tema predominante: [claro / escuro / ambos]

FONTES:
- Fonte de titulos: [nome exato — ex: Inter]
- Fonte de corpo: [nome exato — ex: Inter] (ou "mesma dos titulos")
- Fonte de codigo: [nome exato — ex: JetBrains Mono] (ou "padrao do sistema")

ESTILO GERAL:
- Bordas arredondadas: [sim, muito / sim, pouco / nao, cantos retos]
- Densidade de informacao: [alta — muita info por tela / media / baixa — muito espaco branco]
- Personalidade: [3-5 adjetivos — ex: moderno, limpo, profissional, acolhedor]

A partir dessas informacoes, gere o SKILL.md completo com TODAS estas secoes:
1. Frontmatter YAML (nome, descricao com palavras-gatilho, versao)
2. Filosofia de Design (3-5 frases)
3. Paleta de Cores COMPLETA (derive as cores de superficie, texto, status e
   bordas a partir das cores fornecidas — use bom senso para criar uma paleta
   coerente)
4. Tipografia (tabela completa: display ate label)
5. Espacamento e Layout (grid, breakpoints, containers)
6. Componentes em JSX com classes Tailwind (botao, card, input, badge, header, nav)
7. Anti-Padroes (minimo 8 regras)
8. Checklist de Qualidade (minimo 10 itens)

REGRAS:
- Derive uma paleta completa e coerente a partir das cores base fornecidas
- Use as fontes informadas (nao substitua por outras)
- Adapte a densidade visual ao tipo de produto
- Todos os valores exatos — HEX, px, nomes de fonte
- Exemplos de codigo funcionais no stack informado
```

---

## Prompt 3: Refinamento (Correcao Apos Teste)

Use este prompt apos testar a skill e identificar problemas. Envie junto com a skill atual e os screenshots/codigo que apresentaram problema.

### Prompt

```
A skill de identidade visual que criei apresentou os seguintes problemas 
quando testada na pratica:

SKILL ATUAL:
[Cole o conteudo completo da skill aqui, ou envie como anexo]

PROBLEMAS IDENTIFICADOS:

1. [Descreva o problema com detalhes — ex: "Os botoes estao usando 
   rounded-full em vez de rounded-lg. A skill define bordas levemente 
   arredondadas mas o codigo gerado usa bordas completamente redondas."]

2. [Outro problema — ex: "A cor de fundo dos cards esta usando #FFFFFF 
   hardcoded em vez da custom property --bg-surface. Isso quebra o 
   dark mode."]

3. [Outro problema — ex: "A escala tipografica nao esta sendo seguida.
   Os h2 estao saindo com 28px mas a skill define 22px."]

[Adicione quantos problemas forem necessarios]

CORRECOES SOLICITADAS:

Para cada problema listado:
1. Identifique qual secao da skill precisa ser corrigida
2. Explique o que esta errado na redacao atual
3. Forneca a versao corrigida da secao

Alem das correcoes especificas:
- Verifique se ha outros trechos da skill que podem causar problemas similares
- Adicione anti-padroes novos se os erros encontrados nao estavam na lista
- Atualize os exemplos de codigo se estavam inconsistentes com as regras
- Atualize a versao para [ex: 1.1]

Retorne a skill COMPLETA corrigida (nao apenas os trechos alterados).
```

---

## Prompt Bonus: Validacao de Skill Existente

Use este prompt para pedir ao Claude que revise criticamente uma skill antes de instalar.

### Prompt

```
Revise criticamente a seguinte skill de identidade visual e identifique 
problemas, inconsistencias ou lacunas:

[Cole o conteudo completo da skill]

Verifique especificamente:

1. COMPLETUDE
   - Todas as secoes obrigatorias estao presentes?
   - Faltam cores importantes (hover, disabled, focus)?
   - A escala tipografica esta completa (display ate label)?
   - Os breakpoints cobrem mobile, tablet e desktop?

2. CONSISTENCIA
   - Os exemplos de codigo usam as mesmas classes/tokens definidos na paleta?
   - Os valores nos exemplos batem com os valores nas tabelas?
   - As fontes nos exemplos sao as mesmas listadas na secao de tipografia?

3. PRECISAO
   - Todos os valores sao exatos (HEX, px, nomes)?
   - Algum valor esta vago ou ambiguo?
   - Os codigos HEX sao validos?

4. ACIONABILIDADE
   - A descricao tem palavras-gatilho suficientes?
   - Os anti-padroes sao concretos e verificaveis?
   - A checklist e pratica (pode ser verificada item a item)?

5. TAMANHO
   - A skill tem entre 200 e 500 linhas?
   - Se for maior, quais secoes podem ser condensadas?

Liste todos os problemas encontrados e sugira correcoes.
```

---

## Dicas de Uso

### Quando enviar materiais como anexo

- **Sempre que possivel**, envie brandbook, screenshots e PDFs como anexo em vez de descrever as cores/fontes por texto. A IA extrai valores mais precisos analisando o material original.

### Ordem recomendada de uso

1. Use o **Prompt 1 ou 2** para gerar a primeira versao
2. Use o **Prompt Bonus** para revisar antes de instalar
3. Instale e teste (veja `docs/guides/SKILL-CREATION-GUIDE.md` para processo de teste)
4. Use o **Prompt 3** para corrigir problemas encontrados
5. Repita os passos 3-4 ate a skill estar satisfatoria

### Quantidade de iteracoes esperada

- **Skills visuais**: geralmente 2-3 iteracoes de refinamento
- **Skills de codigo**: geralmente 1-2 iteracoes
- **Skills complexas (multi-tema)**: 3-5 iteracoes

# Guia Completo de Criacao de Skills para IA
**Proposito**: Ensinar como criar, instalar e manter Skills reutilizaveis para agentes de IA (Claude, Cursor, etc.)
**Ultima Atualizacao:** 2026-04-11

> **Documentos relacionados:**
> - `docs/06-SKILL-IDENTIDADE-VISUAL.md` — Skill de referencia de identidade visual do projeto
> - `docs/references/SKILL-EXAMPLES.md` — Exemplos concretos de skills prontas
> - `docs/templates/SKILL-TEMPLATE.md` — Template em branco para criar sua skill
> - `docs/templates/PROMPT-CREATE-SKILL.md` — Prompts estruturados para gerar skills com o Claude

---

## O Que E uma Skill

Uma Skill e um arquivo de instrucoes persistentes que a IA le automaticamente durante o trabalho. Diferente de um prompt avulso (que voce digita toda vez), a Skill fica salva no projeto e e ativada sempre que o agente detecta que o contexto e relevante.

**Analogia pratica**: uma Skill esta para a IA assim como um manual de marca esta para um designer. O designer nao consulta o manual a cada cor que usa — ele internalizou as regras. A Skill faz o mesmo para o agente: internaliza regras que antes precisariam ser repetidas a cada conversa.

### O Que uma Skill Contem

- Regras operacionais concretas (nao principios abstratos)
- Valores exatos (codigos HEX, nomes de fontes, tamanhos em pixels)
- Exemplos de codigo prontos para copiar
- Anti-padroes explicitos (o que nunca fazer)
- Checklist de validacao

### O Que uma Skill NAO E

- Nao e documentacao generica — e instrucao operacional
- Nao e um tutorial — e uma referencia de consulta rapida
- Nao e um prompt — e um arquivo persistente que o agente carrega sozinho

---

## Quando Criar uma Skill

Crie uma Skill quando voce perceber que esta repetindo as mesmas instrucoes para a IA em conversas diferentes:

| Sinal | Tipo de Skill |
|-------|---------------|
| "Use as cores da marca, nao generico" | Identidade Visual |
| "Siga nosso padrao de CRUD" | Padrao de Codigo |
| "Use sempre TypeScript strict" | Convencoes de Projeto |
| "Os formularios sempre tem validacao X" | Componentes Reutilizaveis |
| "O tom de voz da marca e informal" | Tom de Voz / Copy |
| "Nossas APIs seguem este formato" | Contrato de API |

**Regra geral**: se voce corrigiu a IA mais de 2 vezes pelo mesmo motivo, e hora de criar uma Skill.

---

## Processo Passo a Passo

### Passo 1: Reunir Materiais

Antes de pedir para a IA gerar a skill, reuna tudo que define o padrao:

**Para skills visuais:**
- Brandbook / manual de marca (PDF)
- Codigos de cor em HEX (nao "azul claro" — sim `#3B82F6`)
- Nomes exatos das fontes
- Screenshots de telas existentes
- Tokens do Figma (se disponivel)

**Para skills de codigo:**
- Exemplos de codigo que seguem o padrao desejado
- Lista de regras (naming conventions, estrutura de pastas, patterns)
- Anti-padroes que ja apareceram e voce corrigiu

**Para skills de processo:**
- Descricao do fluxo (ex: "todo PR precisa de testes")
- Checklists existentes
- Regras de revisao

### Passo 2: Gerar a Skill com Prompt Estruturado

Use o Claude para analisar os materiais e gerar o conteudo da skill. Envie os materiais junto com o prompt estruturado disponivel em `docs/templates/PROMPT-CREATE-SKILL.md`.

**Dica importante**: envie os materiais como anexo (PDF, imagens) em vez de descrevê-los. A IA extrai informacoes muito mais precisas quando analisa o material original.

### Passo 3: Revisar o SKILL.md Gerado

Nunca instale uma skill sem revisar. Verifique:

1. **Valores exatos** — os codigos HEX, nomes de fonte e tamanhos estao corretos?
2. **Exemplos de codigo** — os exemplos compilam e seguem o stack do projeto?
3. **Anti-padroes** — os anti-padroes listados sao reais (coisas que ja aconteceram)?
4. **Completude** — faltou alguma secao importante?

### Passo 4: Empacotar como Arquivo de Skill

O arquivo deve seguir o formato com frontmatter YAML:

```markdown
---
nome: Nome da Skill
descricao: >
  Descricao com palavras-gatilho que ativam a skill automaticamente.
  Inclua termos como: componente, tela, dashboard, formulario, layout,
  pagina, botao, card, design, visual, UI, interface.
versao: 1.0
---

[Conteudo da skill aqui]
```

Salve como `.md` em `docs/guides/` ou como `.skill` dependendo da ferramenta.

### Passo 5: Instalar

**No Cursor IDE:**
1. Coloque o arquivo em `docs/guides/`
2. Adicione referencia no `CLAUDE.md`: `Antes de gerar componentes visuais, leia docs/guides/SKILL-IDENTIDADE-VISUAL.md`

**No Claude.ai (web):**
1. Acesse Projects → Project Knowledge
2. Faca upload do arquivo `.skill` ou `.md`

**No Claude Code (CLI):**
1. Coloque o arquivo em `docs/guides/`
2. Adicione referencia no `CLAUDE.md` na raiz do projeto

### Passo 6: Testar

Envie um prompt que deveria acionar a skill e verifique se o resultado segue as regras. Exemplos de prompts de teste:

- Para skill visual: "Crie um dashboard com cards de metricas e uma tabela"
- Para skill de codigo: "Crie um CRUD completo para a entidade Produto"
- Para skill de processo: "Faca um PR para adicionar a feature X"

### Passo 7: Refinar (Loop de Melhoria)

O refinamento e iterativo. O ciclo e:

```
Testar → Identificar problemas → Corrigir a skill → Reinstalar → Testar novamente
```

Use o prompt de refinamento disponivel em `docs/templates/PROMPT-CREATE-SKILL.md` para corrigir problemas especificos.

---

## O Formato SKILL.md em Detalhe

### Frontmatter (Cabecalho YAML)

```yaml
---
nome: Identidade Visual — Vibe Coding Training
descricao: >
  Aplica a identidade visual do Vibe Coding Training em todo codigo
  gerado. Use sempre que criar: componentes React, telas, dashboards,
  formularios, paginas, layouts, botoes, cards, tabelas, modais,
  sidebars ou qualquer elemento de interface (UI).
versao: 1.0
---
```

**Campos obrigatorios:**
- `nome` — Nome descritivo da skill
- `descricao` — Texto que a IA usa para decidir quando ativar a skill. Aqui ficam as **palavras-gatilho**
- `versao` — Para rastrear mudancas

### Palavras-Gatilho na Descricao

A descricao e o campo mais importante do frontmatter. E ela que determina quando o agente ativa a skill automaticamente. Inclua:

- **Substantivos concretos**: componente, tela, dashboard, formulario, botao, card, tabela, modal
- **Verbos de acao**: criar, gerar, implementar, construir, desenhar
- **Contextos**: React, TypeScript, Tailwind, UI, interface, layout, visual, design

**Exemplo ruim:**
```
Regras visuais do projeto.
```

**Exemplo bom:**
```
Aplica a identidade visual em todo codigo gerado. Use ao criar
componentes React, telas, dashboards, formularios, paginas, layouts,
botoes, cards, tabelas, modais, sidebars ou elementos de UI/interface.
Garante cores, tipografia, espacamento e padroes visuais da marca.
```

### Secoes Obrigatorias (para Skills Visuais)

#### 1. Filosofia de Design
3-5 frases descrevendo o espirito visual. Que sensacao transmitir? Que adjetivos definem a estetica?

#### 2. Paleta de Cores
Todas as cores como CSS custom properties com comentarios de uso:
```css
:root {
  --primary: #6D28D9;           /* botoes, links, destaques */
  --primary-hover: #5B21B6;     /* hover em elementos primarios */
  --background: #FAFAFA;        /* fundo da pagina */
  --text-primary: #0F172A;      /* texto principal */
  --success: #10B981;           /* conclusao, progresso */
  --error: #EF4444;             /* erros, acoes destrutivas */
}
```

#### 3. Tipografia
Escala completa: fontes, tamanhos, pesos, line-heights.

#### 4. Espacamento e Layout
Grid base, breakpoints, padding de containers, largura maxima.

#### 5. Componentes (JSX/HTML)
Exemplos de codigo para cada componente principal com classes Tailwind corretas.

#### 6. Anti-Padroes
Lista explicita do que NUNCA fazer. Essencial para evitar erros recorrentes.

#### 7. Checklist de Qualidade
Lista de verificacao para validar cada componente gerado.

---

## Loop de Refinamento

O refinamento e a parte mais importante do processo. Uma skill raramente fica perfeita na primeira versao.

### Ciclo de Refinamento

```mermaid
graph TD
    A[Instalar skill] --> B[Testar com prompt realista]
    B --> C{Resultado OK?}
    C -->|Sim| D[Skill pronta]
    C -->|Nao| E[Identificar problema]
    E --> F[Classificar: cor? fonte? espacamento? componente?]
    F --> G[Atualizar secao correspondente na skill]
    G --> H[Reinstalar]
    H --> B
```

### Problemas Comuns no Refinamento

| Problema | Causa Provavel | Solucao |
|----------|---------------|---------|
| Cores erradas | HEX incorreto ou ausente na paleta | Verificar e corrigir os valores HEX |
| Fonte padrao sendo usada | Nome da fonte incorreto ou nao listado | Adicionar nome exato (ex: `Inter`, nao `inter`) |
| Espacamento inconsistente | Secao de espacamento incompleta | Definir escala completa (4, 8, 12, 16, 24, 32, 48, 64) |
| Componente fora do padrao | Exemplo de codigo ausente ou incompleto | Adicionar exemplo JSX completo com classes corretas |
| IA ignora a skill | Palavras-gatilho ausentes na descricao | Revisar descricao com termos mais especificos |

---

## Erros Comuns ao Criar Skills

### 1. Descricao vaga
**Errado**: "Regras de estilo do projeto"
**Certo**: "Aplica identidade visual ao criar componentes React, dashboards, formularios, tabelas, modais e elementos de UI"

### 2. Cores sem codigo HEX
**Errado**: "Use azul claro para backgrounds"
**Certo**: `--bg-light: #EFF6FF; /* background de secoes secundarias */`

### 3. Ausencia de anti-padroes
Sem anti-padroes, a IA nao sabe o que evitar. Sempre inclua pelo menos:
- Cores proibidas (ex: "nunca use preto puro #000000")
- Fontes proibidas (ex: "nunca use Arial ou Times New Roman")
- Padroes proibidos (ex: "nunca use sombras pesadas com spread > 4px")

### 4. Exemplos de codigo incompletos
**Errado**: "O botao primario usa a cor da marca"
**Certo**:
```jsx
<Button className="bg-primary hover:bg-primary-hover text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
  Texto do Botao
</Button>
```

### 5. Nao testar apos instalar
A skill pode parecer perfeita no papel mas falhar na pratica. Sempre teste com pelo menos 3 prompts diferentes antes de considerar pronta.

### 6. Skill grande demais
Skills com mais de 500 linhas tendem a ser parcialmente ignoradas. Se a skill esta muito grande:
- Divida em skills menores (ex: uma para cores, outra para componentes)
- Priorize regras que a IA erra com mais frequencia
- Remova informacao que e "nice to have" mas nao essencial

### 7. Misturar instrucoes com documentacao
Uma skill e instrucao operacional, nao documentacao. Nao inclua historico, justificativas ou contexto de decisao. So inclua o que a IA precisa saber para gerar codigo correto.

---

## Tipos de Skill Alem de Identidade Visual

Skills nao sao exclusivas para design. Qualquer padrao repetitivo pode virar uma skill:

| Tipo | Exemplos de Conteudo |
|------|---------------------|
| **Identidade Visual** | Cores, fontes, espacamento, componentes JSX |
| **Padroes de Codigo** | Naming conventions, estrutura de pastas, patterns |
| **Contrato de API** | Formato de request/response, tratamento de erros |
| **Tom de Voz** | Vocabulario da marca, frases proibidas, nivel de formalidade |
| **Testes** | Estrutura de testes, mocks, cobertura minima |
| **Deploy e Ops** | Processo de deploy, variaveis de ambiente, scripts |

Consulte `docs/references/SKILL-EXAMPLES.md` para exemplos concretos de diferentes tipos de skill.

---

## Checklist Final

Antes de considerar uma skill pronta, verifique:

- [ ] Frontmatter com nome, descricao (com palavras-gatilho) e versao
- [ ] Filosofia/proposito da skill em 3-5 frases
- [ ] Todos os valores sao exatos (HEX, px, nomes de fonte) — nada vago
- [ ] Exemplos de codigo que compilam no stack do projeto
- [ ] Secao de anti-padroes com pelo menos 5 regras
- [ ] Checklist de qualidade para validacao
- [ ] Testada com pelo menos 3 prompts diferentes
- [ ] Menos de 500 linhas (ou dividida em partes)
- [ ] Referenciada no CLAUDE.md do projeto
- [ ] Versionada no repositorio (nao apenas na conta pessoal)

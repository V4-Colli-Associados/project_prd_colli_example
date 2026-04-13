# Template de Skill para IA
**Proposito**: Template em branco para criar skills reutilizaveis — preencha os campos e substitua os comentarios pelo conteudo real
**Ultima Atualizacao:** 2026-04-11

> **Documentos relacionados:**
> - `docs/guides/SKILL-CREATION-GUIDE.md` — Guia completo de criacao de skills
> - `docs/references/SKILL-EXAMPLES.md` — Exemplos concretos para referencia
> - `docs/templates/PROMPT-CREATE-SKILL.md` — Prompts para gerar skills automaticamente

---

## Como Usar Este Template

1. Copie todo o conteudo abaixo da linha "INICIO DO TEMPLATE"
2. Substitua os placeholders `[...]` pelos valores do seu projeto
3. Remova todos os comentarios `<!-- ... -->` apos preencher
4. Salve como `SKILL-[NOME].md` em `docs/guides/`
5. Referencie no `CLAUDE.md` do projeto
6. Teste com pelo menos 3 prompts diferentes

---

## INICIO DO TEMPLATE

```markdown
---
nome: [Nome da Skill — ex: Identidade Visual — MeuProjeto]
descricao: >
  [Descricao com palavras-gatilho. Inclua substantivos concretos que
  ativam a skill: componente, tela, dashboard, formulario, layout,
  pagina, botao, card, tabela, modal, sidebar, menu, UI, interface.
  Quanto mais especifica, melhor a ativacao automatica.]
versao: 1.0
---

<!-- ============================================================ -->
<!-- SECAO 1: FILOSOFIA DE DESIGN / PROPOSITO                     -->
<!-- Descreva em 3-5 frases o espirito do que esta skill governa.  -->
<!-- Para skills visuais: que sensacao a marca transmite?          -->
<!-- Para skills de codigo: que principios guiam as decisoes?      -->
<!-- ============================================================ -->

## Filosofia

[Escreva 3-5 frases descrevendo o espirito e os principios-guia.
Use adjetivos concretos: "moderno e acolhedor", "tecnico e preciso",
"vibrante e energetico". Evite termos genericos como "bonito" ou "bom".]


<!-- ============================================================ -->
<!-- SECAO 2: PALETA DE CORES                                     -->
<!-- Liste TODAS as cores como CSS custom properties.              -->
<!-- Organize em grupos: primarias, neutras, status, superficies.  -->
<!-- Cada cor deve ter: nome, valor HEX, comentario de uso.        -->
<!-- NUNCA use descricoes vagas como "azul claro" — sempre HEX.    -->
<!-- ============================================================ -->

## Paleta de Cores

```css
:root {
  /* Primarias */
  --primary: #[HEX];              /* [uso: botoes, links, destaques] */
  --primary-hover: #[HEX];        /* [uso: hover em elementos primarios] */
  --primary-light: #[HEX];        /* [uso: backgrounds sutis, badges] */

  /* Secundarias */
  --secondary: #[HEX];            /* [uso: acentos, elementos complementares] */
  --secondary-hover: #[HEX];      /* [uso: hover em elementos secundarios] */

  /* Superficies */
  --bg-app: #[HEX];               /* [uso: fundo da aplicacao] */
  --bg-surface: #[HEX];           /* [uso: cards, modais, paineis] */
  --bg-elevated: #[HEX];          /* [uso: dropdowns, tooltips] */
  --bg-hover: #[HEX];             /* [uso: hover em itens de lista] */

  /* Bordas */
  --border-default: #[HEX];       /* [uso: bordas sutis] */
  --border-strong: #[HEX];        /* [uso: bordas de separacao visivel] */

  /* Texto */
  --text-primary: #[HEX];         /* [uso: texto principal] */
  --text-secondary: #[HEX];       /* [uso: labels, metadata, placeholders] */
  --text-tertiary: #[HEX];        /* [uso: texto desabilitado, hints] */

  /* Status */
  --success: #[HEX];              /* [uso: confirmacoes, progresso] */
  --error: #[HEX];                /* [uso: erros, acoes destrutivas] */
  --warning: #[HEX];              /* [uso: avisos, atencao] */
  --info: #[HEX];                 /* [uso: informacoes neutras] */
}
```

<!-- Se o projeto tem dark mode, adicione: -->
<!-- ```css -->
<!-- [data-theme="dark"] { -->
<!--   --bg-app: #[HEX]; -->
<!--   --bg-surface: #[HEX]; -->
<!--   /* ... repita todas as variaveis que mudam ... */ -->
<!-- } -->
<!-- ``` -->


<!-- ============================================================ -->
<!-- SECAO 3: TIPOGRAFIA                                          -->
<!-- Defina a escala tipografica completa.                         -->
<!-- Inclua: fonte, tamanho, peso, line-height para cada nivel.   -->
<!-- Liste os nomes exatos das fontes (como aparecem no CSS).      -->
<!-- ============================================================ -->

## Tipografia

**Fontes do projeto:**
- Primaria (headings): [Nome Exato da Fonte — ex: Inter]
- Secundaria (body): [Nome Exato da Fonte — ex: Inter]
- Monoesacada (codigo): [Nome Exato da Fonte — ex: JetBrains Mono]

| Elemento | Fonte | Tamanho | Peso | Line-Height |
|----------|-------|---------|------|-------------|
| Display | [fonte] | [xx]px | [peso] | [x.x] |
| H1 | [fonte] | [xx]px | [peso] | [x.x] |
| H2 | [fonte] | [xx]px | [peso] | [x.x] |
| H3 | [fonte] | [xx]px | [peso] | [x.x] |
| Body | [fonte] | [xx]px | [peso] | [x.x] |
| Small | [fonte] | [xx]px | [peso] | [x.x] |
| Label | [fonte] | [xx]px | [peso] | [x.x] |
| Codigo | [fonte mono] | [xx]px | [peso] | [x.x] |

Pesos disponveis: [liste os pesos usados — ex: 400, 500, 600, 700]


<!-- ============================================================ -->
<!-- SECAO 4: ESPACAMENTO E LAYOUT                                -->
<!-- Defina a grid base, breakpoints e regras de layout.          -->
<!-- ============================================================ -->

## Espacamento e Layout

- **Grid base**: [4px / 8px — a unidade minima de espacamento]
- **Escala de espacamento**: [liste: 4, 8, 12, 16, 24, 32, 48, 64]px
- **Padding de containers**: [ex: 16px mobile, 24px tablet, 32px desktop]
- **Largura maxima de conteudo**: [ex: 1280px]
- **Gap padrao entre cards/itens**: [ex: 16px mobile, 24px desktop]

### Breakpoints

| Nome | Largura | Colunas |
|------|---------|---------|
| Mobile | [ex: < 640px] | [ex: 1] |
| Tablet | [ex: 640px - 1024px] | [ex: 2] |
| Desktop | [ex: > 1024px] | [ex: 3-4] |

<!-- Adicione regras especificas de layout: -->
<!-- - Sidebar: [fixa? colapsavel? largura?] -->
<!-- - Header: [altura? sticky?] -->
<!-- - Footer: [conteudo? altura?] -->


<!-- ============================================================ -->
<!-- SECAO 5: COMPONENTES                                         -->
<!-- Para cada componente principal, forneca um exemplo de codigo  -->
<!-- com as classes Tailwind/CSS corretas.                         -->
<!-- Inclua pelo menos: botao, card, input, badge, header.        -->
<!-- ============================================================ -->

## Componentes

### Botao Primario

```jsx
<!-- Substitua pelo codigo real do botao primario do projeto -->
<button className="[classes Tailwind]">
  Texto do Botao
</button>
```

### Botao Secundario

```jsx
<!-- Substitua pelo codigo real do botao secundario -->
<button className="[classes Tailwind]">
  Texto do Botao
</button>
```

### Card Padrao

```jsx
<!-- Substitua pelo codigo real do card padrao -->
<div className="[classes Tailwind]">
  <h3>[titulo]</h3>
  <p>[conteudo]</p>
</div>
```

### Input de Formulario

```jsx
<!-- Substitua pelo codigo real do input -->
<div>
  <label className="[classes]">[Label]</label>
  <input className="[classes]" type="text" placeholder="[placeholder]" />
</div>
```

### Badge / Tag de Status

```jsx
<!-- Substitua pelo codigo real do badge -->
<span className="[classes]">[Status]</span>
```

<!-- Adicione mais componentes conforme necessario: -->
<!-- - Header de pagina -->
<!-- - Item de navegacao (ativo e inativo) -->
<!-- - Modal -->
<!-- - Tabela -->
<!-- - Toast / Notificacao -->


<!-- ============================================================ -->
<!-- SECAO 6: ANTI-PADROES                                        -->
<!-- Esta secao e PRE-PREENCHIDA com regras universais.           -->
<!-- Adicione regras especificas do seu projeto.                   -->
<!-- NUNCA remova os anti-padroes universais — apenas adicione.   -->
<!-- ============================================================ -->

## Anti-Padroes

### Universais (nunca remova estes)

- NUNCA usar valores de cor hardcoded — sempre referenciar CSS custom properties ou classes do design system
- NUNCA usar `!important` em CSS — se precisar sobrescrever, ajuste a especificidade
- NUNCA misturar unidades (px com rem com em) — escolha uma escala e siga
- NUNCA omitir estados de hover/focus em elementos interativos — acessibilidade e obrigatoria
- NUNCA usar texto em imagem quando texto HTML e possivel — acessibilidade e SEO
- NUNCA ignorar contraste de texto — minimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande)
- NUNCA criar componentes sem suporte a teclado — todo elemento clicavel deve ser acessivel via Tab + Enter

### Especificos do Projeto

<!-- Adicione anti-padroes especificos: -->
<!-- - NUNCA usar [cor/fonte/padrao proibido] -->
<!-- - NUNCA usar [pattern X] em vez de [pattern Y] -->
<!-- - NUNCA [comportamento indesejado especifico] -->

- [Adicione anti-padroes especificos do seu projeto aqui]
- [Adicione mais conforme identificar erros recorrentes]
- [Cada anti-padrao deve comecar com "NUNCA"]


<!-- ============================================================ -->
<!-- SECAO 7: CHECKLIST DE QUALIDADE                              -->
<!-- Lista de verificacao para validar cada output gerado.        -->
<!-- ============================================================ -->

## Checklist de Qualidade

Antes de considerar um componente/codigo pronto, verifique:

- [ ] Cores estao usando CSS custom properties (nao valores HEX hardcoded)
- [ ] Tipografia segue a escala definida (fonte, tamanho, peso, line-height)
- [ ] Espacamento segue a grid base (multiplos de [4/8]px)
- [ ] Todos os elementos interativos tem hover, focus e active states
- [ ] Layout e responsivo nos breakpoints definidos
- [ ] Nenhum anti-padrao da lista foi violado
- [ ] Codigo TypeScript esta tipado (sem `any`)
- [ ] Componente tem props interface definida
- [ ] Acessibilidade: roles, labels, contraste verificados

<!-- Adicione itens especificos: -->
<!-- - [ ] [Verificacao especifica do projeto] -->
```

---

## Apos Preencher

1. Remova todos os comentarios HTML `<!-- ... -->`
2. Remova os placeholders `[...]` que sobraram
3. Valide que todos os valores HEX sao codigos reais
4. Salve em `docs/guides/SKILL-[NOME].md`
5. Adicione referencia no `CLAUDE.md`
6. Teste com 3 prompts diferentes (consulte `docs/guides/SKILL-CREATION-GUIDE.md` para exemplos de teste)

# Exemplos de Skills para IA
**Proposito**: Referencia com exemplos concretos de skills para diferentes contextos (visual, codigo, processo)
**Ultima Atualizacao:** 2026-04-11

> **Documentos relacionados:**
> - `docs/guides/SKILL-CREATION-GUIDE.md` — Guia completo de criacao de skills
> - `docs/templates/SKILL-TEMPLATE.md` — Template em branco para criar sua skill
> - `docs/templates/PROMPT-CREATE-SKILL.md` — Prompts para gerar skills com o Claude
> - `docs/06-SKILL-IDENTIDADE-VISUAL.md` — Skill real do projeto (referencia viva)

---

## Como Usar Este Documento

Este arquivo contem 3 exemplos de skills para diferentes cenarios. Cada exemplo mostra o frontmatter completo e as primeiras secoes de conteudo — o suficiente para entender o padrao e adaptar ao seu projeto.

Para criar sua propria skill, use o template em branco disponivel em `docs/templates/SKILL-TEMPLATE.md`.

---

## Exemplo 1: Identidade Visual — SaaS B2B (Tema Escuro, Minimalista)

**Contexto**: Plataforma de analytics para empresas. Visual tecnico, profissional, com tema escuro predominante. A marca transmite precisao e confianca.

```markdown
---
nome: Identidade Visual — DataPulse Analytics
descricao: >
  Aplica a identidade visual do DataPulse em todo codigo gerado.
  Use ao criar componentes React, dashboards, graficos, tabelas,
  formularios, telas, layouts, cards, modais, sidebars, menus,
  botoes ou qualquer elemento de interface (UI). Tema escuro
  predominante com acentos em azul eletrico.
versao: 1.0
---

## Filosofia de Design

DataPulse transmite precisao tecnica e confiabilidade. O visual e escuro,
limpo e denso em informacao sem ser claustrofobico. Cada pixel tem proposito
— nada e decorativo. A interface lembra ferramentas profissionais como
terminais e editores de codigo: funcional, eficiente, elegante na
simplicidade. A cor azul eletrico e usada com parcimonia para guiar o
olhar aos pontos de acao.

## Paleta de Cores

```css
:root {
  /* Primarias */
  --primary: #2563EB;              /* botoes de acao principal, links, destaques */
  --primary-hover: #1D4ED8;        /* hover em elementos primarios */
  --primary-light: #DBEAFE;        /* badges, tags, indicadores sutis */
  --primary-muted: rgba(37, 99, 235, 0.15); /* backgrounds de selecao */

  /* Superficies (tema escuro) */
  --bg-app: #0B0F1A;               /* fundo da aplicacao */
  --bg-surface: #111827;           /* cards, paineis, sidebars */
  --bg-elevated: #1F2937;          /* dropdowns, tooltips, modais */
  --bg-hover: #374151;             /* hover em itens de lista */

  /* Bordas */
  --border-default: #1F2937;       /* bordas sutis */
  --border-strong: #374151;        /* bordas de separacao visivel */

  /* Texto */
  --text-primary: #F9FAFB;         /* texto principal */
  --text-secondary: #9CA3AF;       /* labels, metadata, placeholders */
  --text-tertiary: #6B7280;        /* texto desabilitado, hints */

  /* Status */
  --success: #10B981;              /* metricas positivas, confirmacoes */
  --error: #EF4444;                /* erros, alertas criticos */
  --warning: #F59E0B;              /* avisos, atencao necessaria */
  --info: #3B82F6;                 /* informacoes neutras */
}
```

## Tipografia

| Elemento | Fonte | Tamanho | Peso | Line-Height |
|----------|-------|---------|------|-------------|
| Display | JetBrains Mono | 32px | 700 | 1.2 |
| H1 | Inter | 28px | 700 | 1.3 |
| H2 | Inter | 22px | 600 | 1.3 |
| H3 | Inter | 18px | 600 | 1.4 |
| Body | Inter | 14px | 400 | 1.6 |
| Small | Inter | 12px | 400 | 1.5 |
| Label | Inter | 11px | 500 | 1.4 |
| Codigo | JetBrains Mono | 13px | 400 | 1.6 |
| Metrica (numero grande) | JetBrains Mono | 36px | 700 | 1.1 |

Pesos disponveis: 400 (regular), 500 (medium), 600 (semibold), 700 (bold).

## Anti-Padroes

- NUNCA usar fundo branco (#FFFFFF) — o tema e escuro, o fundo mais claro permitido e --bg-elevated (#1F2937)
- NUNCA usar cores neon ou saturadas alem de --primary — o visual e contido e profissional
- NUNCA usar bordas arredondadas maiores que 8px (rounded-lg) — cantos levemente arredondados, nao "bolhas"
- NUNCA usar sombras coloridas — se precisar de sombra, use preto com baixa opacidade
- NUNCA usar fontes decorativas ou serif — apenas Inter e JetBrains Mono
- NUNCA centralizar texto de dados/metricas em tabelas — numeros sao sempre alinhados a direita
- NUNCA usar iconografia colorida — icones sao sempre monocromaticos (text-secondary)
```

---

## Exemplo 2: Identidade Visual — E-commerce (Colorido, Energetico)

**Contexto**: Loja online de produtos esportivos. Visual vibrante, jovem, com muita energia. A marca transmite movimento e entusiasmo.

```markdown
---
nome: Identidade Visual — SportFlow Store
descricao: >
  Aplica a identidade visual da SportFlow em todo codigo gerado.
  Use ao criar componentes React, paginas de produto, carrinho,
  checkout, banners, cards de produto, grids de catalogo, filtros,
  avaliacoes, formularios, botoes, modais, headers, footers ou
  qualquer elemento de interface (UI) da loja. Visual vibrante
  com gradientes e cores energeticas.
versao: 1.0
---

## Filosofia de Design

SportFlow e energia em movimento. O visual explode em cores vibrantes —
laranja energetico, verde lima e gradientes que transmitem velocidade.
A tipografia e bold e impactante, os espacamentos sao generosos para
dar respiro entre produtos. Cada pagina deve sentir como a linha de
largada de uma corrida: pronta para a acao. Os CTAs sao grandes,
impossiveis de ignorar, com micro-animacoes que convidam ao clique.

## Paleta de Cores

```css
:root {
  /* Primarias */
  --primary: #F97316;              /* CTAs, botoes de compra, preco em destaque */
  --primary-hover: #EA580C;        /* hover em CTAs */
  --primary-gradient: linear-gradient(135deg, #F97316 0%, #FB923C 100%);

  /* Secundarias */
  --secondary: #84CC16;            /* badges de desconto, disponibilidade, sucesso */
  --secondary-hover: #65A30D;      /* hover em elementos secundarios */

  /* Acento */
  --accent: #8B5CF6;               /* categorias em destaque, novo, exclusivo */
  --accent-light: #EDE9FE;         /* background de tags especiais */

  /* Superficies */
  --bg-app: #FAFAFA;               /* fundo geral */
  --bg-surface: #FFFFFF;           /* cards de produto, modais */
  --bg-warm: #FFF7ED;              /* banners promocionais, destaques */
  --bg-dark: #18181B;              /* footer, headers alternativos */

  /* Texto */
  --text-primary: #18181B;         /* titulos, nomes de produto */
  --text-secondary: #71717A;       /* descricoes, metadata */
  --text-on-primary: #FFFFFF;      /* texto sobre botoes primarios */
  --text-price: #F97316;           /* precos em destaque */
  --text-old-price: #A1A1AA;       /* preco antigo (tachado) */

  /* Status */
  --success: #22C55E;              /* em estoque, pedido confirmado */
  --error: #EF4444;                /* fora de estoque, erro no pagamento */
  --warning: #EAB308;              /* ultimas unidades */
  --info: #3B82F6;                 /* rastreamento, informacoes */
}
```

## Tipografia

| Elemento | Fonte | Tamanho | Peso | Line-Height |
|----------|-------|---------|------|-------------|
| Display (hero) | Poppins | 48px | 800 | 1.1 |
| H1 | Poppins | 36px | 700 | 1.2 |
| H2 | Poppins | 28px | 700 | 1.2 |
| H3 | Poppins | 20px | 600 | 1.3 |
| Body | Inter | 16px | 400 | 1.6 |
| Small | Inter | 14px | 400 | 1.5 |
| Label / Tag | Inter | 12px | 600 | 1.4 |
| Preco | Poppins | 24px | 700 | 1.1 |
| Preco antigo | Inter | 16px | 400 | 1.1 |
| CTA (botao) | Poppins | 16px | 700 | 1.0 |

Pesos disponveis: 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold).

## Componentes (Trechos)

### Card de Produto

```jsx
<div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
  {/* Badge de desconto */}
  <div className="relative">
    <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
    {product.discount && (
      <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
        -{product.discount}%
      </span>
    )}
  </div>

  <div className="p-4">
    <p className="text-text-secondary text-sm">{product.category}</p>
    <h3 className="text-text-primary font-bold text-lg mt-1 line-clamp-2">{product.name}</h3>
    <div className="flex items-baseline gap-2 mt-2">
      <span className="text-text-price font-poppins text-xl font-bold">
        R$ {product.price}
      </span>
      {product.oldPrice && (
        <span className="text-text-old-price line-through text-sm">
          R$ {product.oldPrice}
        </span>
      )}
    </div>
    <button className="w-full mt-4 bg-primary hover:bg-primary-hover text-white font-poppins font-bold py-3 rounded-xl transition-colors">
      Adicionar ao Carrinho
    </button>
  </div>
</div>
```

## Anti-Padroes

- NUNCA usar cinza frio para texto de preco — precos sempre usam --text-price (#F97316) ou --text-primary
- NUNCA usar bordas arredondadas menores que 12px (rounded-xl) em cards — o visual e arredondado e amigavel
- NUNCA usar fontes finas (weight < 400) — a marca e bold e energetica
- NUNCA usar gradientes que nao estejam na paleta — apenas o gradiente primario laranja e permitido
- NUNCA omitir hover/transition em elementos clicaveis — tudo que e clicavel deve ter feedback visual
- NUNCA usar layouts muito densos — espacamento generoso entre produtos (gap minimo de 24px em grids)
- NUNCA usar icones outline em CTAs — icones em botoes de acao devem ser solid/filled
```

---

## Exemplo 3: Padroes de Codigo — Convencoes TypeScript/React

**Contexto**: Skill que nao e visual — define padroes de codigo para um projeto React + TypeScript. Mostra que skills podem governar qualquer padrao repetitivo, nao apenas design.

```markdown
---
nome: Padroes de Codigo — React + TypeScript
descricao: >
  Define os padroes de codigo para o projeto. Use ao criar componentes
  React, hooks, servicos, utilitarios, tipos, interfaces, testes,
  paginas, APIs, queries, mutations ou qualquer codigo TypeScript.
  Garante consistencia em naming, estrutura de arquivos, tratamento
  de erros e padroes de composicao.
versao: 1.0
---

## Filosofia de Codigo

Codigo limpo, tipado e previsivel. Preferimos explicito sobre implicito,
composicao sobre heranca, funcoes puras sobre side effects. Cada arquivo
tem uma responsabilidade clara. Tipos sao cidadaos de primeira classe —
nunca use `any`. Erros sao tratados, nunca silenciados.

## Estrutura de Arquivos

```
src/
  components/        # Componentes reutilizaveis (UI pura)
    Button/
      Button.tsx         # Componente
      Button.test.tsx    # Testes
      Button.stories.tsx # Storybook (se aplicavel)
      index.ts           # Re-export
  features/          # Features completas (logica + UI)
    auth/
      components/        # Componentes especificos da feature
      hooks/             # Hooks especificos da feature
      services/          # Chamadas de API da feature
      types.ts           # Tipos da feature
      index.ts           # Re-export publico
  hooks/             # Hooks globais reutilizaveis
  lib/               # Utilitarios e configuracoes
  types/             # Tipos globais
```

### Regras de Estrutura

- Um componente por arquivo — nunca dois componentes exportados no mesmo arquivo
- Features sao autocontidas — nunca importe de `features/auth/` dentro de `features/billing/`
- Comunicacao entre features acontece via hooks globais ou contexto
- `index.ts` define a API publica da feature — so exporte o que outros modulos precisam

## Naming Conventions

| Tipo | Convencao | Exemplo |
|------|-----------|---------|
| Componente | PascalCase | `UserProfile.tsx` |
| Hook | camelCase com prefixo `use` | `useAuth.ts` |
| Servico | camelCase com sufixo `Service` | `authService.ts` |
| Tipo/Interface | PascalCase com prefixo contextual | `UserProfile`, `AuthState` |
| Constante | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Funcao utilitaria | camelCase | `formatCurrency.ts` |
| Arquivo de teste | Mesmo nome + `.test` | `Button.test.tsx` |
| Enum | PascalCase (tipo e valores) | `UserRole.Admin` |

### Regras de Naming

- Booleanos sempre comecam com `is`, `has`, `can`, `should`: `isLoading`, `hasPermission`
- Handlers de evento comecam com `handle` no componente e `on` na prop: `onClick` (prop), `handleClick` (handler)
- Queries comecam com `use` + verbo + substantivo: `useGetUser`, `useListProducts`
- Mutations comecam com `use` + acao: `useCreateUser`, `useDeleteProduct`

## Padroes de Componente

### Componente Funcional Padrao

```tsx
interface UserCardProps {
  user: User;
  onSelect?: (userId: string) => void;
  variant?: 'compact' | 'detailed';
}

export function UserCard({ user, onSelect, variant = 'detailed' }: UserCardProps) {
  const handleClick = () => {
    onSelect?.(user.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className="..."
    >
      {/* conteudo */}
    </div>
  );
}
```

### Regras de Componente

- SEMPRE definir interface de props separada (nunca inline)
- SEMPRE usar `export function`, nunca `export default` nem `const Component = () =>`
- SEMPRE definir valores padrao via destructuring, nunca `defaultProps`
- Props opcionais usam `?` — nunca `| undefined`
- Nenhum componente com mais de 150 linhas — extraia sub-componentes

## Anti-Padroes

- NUNCA usar `any` — use `unknown` se o tipo e realmente desconhecido, depois faca type narrowing
- NUNCA usar `// @ts-ignore` ou `// @ts-expect-error` sem comentario explicando o motivo
- NUNCA fazer fetch diretamente no componente — use hooks de query (React Query / SWR)
- NUNCA usar `useEffect` para derivar estado — use `useMemo` ou calcule durante o render
- NUNCA usar index como key em listas que podem mudar — use IDs estaveis
- NUNCA silenciar erros com `catch () {}` vazio — sempre logue ou trate o erro
- NUNCA usar `!` (non-null assertion) sem justificativa — prefira optional chaining e narrowing
- NUNCA colocar logica de negocio em componentes — extraia para hooks ou servicos
- NUNCA mutar estado diretamente — use spread operator ou immer para updates imutaveis
- NUNCA criar arquivos com mais de 300 linhas — divida em modulos menores
```

---

## Observacoes Sobre os Exemplos

1. **Cada skill tem personalidade propria** — a skill do DataPulse e tecnica e contida; a da SportFlow e energetica e ousada; a de padroes de codigo e precisa e prescritiva. A skill deve refletir o espirito do que ela governa.

2. **Anti-padroes sao essenciais** — nos tres exemplos, a secao de anti-padroes e uma das mais longas. Dizer o que NAO fazer e tao importante quanto dizer o que fazer.

3. **Valores sao sempre exatos** — nenhum exemplo usa termos vagos como "azul escuro" ou "fonte grande". Tudo e HEX, px, nome de fonte ou classe CSS.

4. **Palavras-gatilho na descricao variam por contexto** — a skill visual menciona "dashboard, card, botao"; a skill de e-commerce menciona "produto, carrinho, checkout"; a skill de codigo menciona "hook, servico, tipo".

5. **Skills nao precisam ser visuais** — o Exemplo 3 mostra que padroes de codigo, naming conventions e arquitetura tambem se beneficiam de skills estruturadas.

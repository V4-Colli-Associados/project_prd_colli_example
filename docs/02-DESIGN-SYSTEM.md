# Vibe Coding Training — Design System
**Status:** v1
**Ultima Atualizacao:** 2026-04-11

---

## Stack Tecnologico

- **React 18+** — framework de UI, com composicao baseada em componentes
- **Vite 5+** — build tool e dev server com HMR ultrarapido
- **TypeScript 5+** — tipagem estatica em todo o projeto
- **shadcn/ui** — biblioteca de componentes acessiveis, copiados para o projeto (nao instalados como dependencia)
- **Tailwind CSS v4** — sistema de estilizacao utility-first com configuracao via CSS
- **Radix UI** — primitivas de acessibilidade sob o shadcn/ui
- **Geist Font** — fonte principal, carregada via `@fontsource/geist-sans` e `@fontsource/geist-mono`
- **Lucide React** — icones consistentes e personalizaveis
- **React Router v6** — roteamento client-side

---

## Alinhamento de Marca

### Principios de Design

1. **Clareza acima de tudo** — a interface deve ensinar, nao confundir. Cada elemento visual tem um proposito didatico.
2. **Informacao como protagonista** — o conteudo de ensino e o centro; a UI e suporte, nao competicao.
3. **Progressao visivel** — o aluno deve sempre saber onde esta e quanto falta.
4. **Aconchegante mas profissional** — tons quentes, bordas suaves, espacamento generoso. Parece um curso premium, nao um painel corporativo.
5. **Acessivel por padrao** — contraste WCAG AA minimo, navegacao por teclado, labels semanticos.

### Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--primary` | `#6D28D9` | Cor primaria (roxo vibrante) — botoes, links, destaques |
| `--primary-foreground` | `#FFFFFF` | Texto sobre fundo primario |
| `--secondary` | `#F3E8FF` | Cor secundaria (roxo claro) — backgrounds sutis, badges |
| `--secondary-foreground` | `#4C1D95` | Texto sobre fundo secundario |
| `--accent` | `#10B981` | Cor de acento (verde) — sucesso, progresso, conclusao |
| `--accent-foreground` | `#FFFFFF` | Texto sobre fundo de acento |
| `--destructive` | `#EF4444` | Erros, acoes destrutivas |
| `--destructive-foreground` | `#FFFFFF` | Texto sobre fundo destrutivo |
| `--muted` | `#F1F5F9` | Backgrounds neutros, areas desabilitadas |
| `--muted-foreground` | `#64748B` | Texto secundario, metadata, placeholders |

### Cores de Pagina

| Elemento | Light Mode | Dark Mode | Notas |
|----------|-----------|-----------|-------|
| Background da pagina | `#FAFAFA` | `#0A0A0A` | Neutro frio |
| Background do card | `#FFFFFF` | `#171717` | Superficie elevada |
| Borda do card | `#E2E8F0` | `#262626` | Hover: `--primary` com 20% opacidade |
| Sidebar background | `#F8FAFC` | `#0F0F0F` | Levemente diferente do fundo |
| Superficie de codigo | `#1E1E2E` | `#1E1E2E` | Mesmo em ambos os temas (Catppuccin Mocha) |

### Integracao de Tema

O Tailwind CSS v4 usa configuracao via CSS em vez de `tailwind.config.js`. Os tokens de design sao definidos como CSS custom properties no `@theme` do arquivo CSS principal:

```css
@import "tailwindcss";

@theme {
  --color-primary: #6D28D9;
  --color-primary-foreground: #FFFFFF;
  --color-secondary: #F3E8FF;
  --color-accent: #10B981;
  --color-muted: #F1F5F9;
  --color-muted-foreground: #64748B;
  --font-sans: 'Geist Sans', system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
}
```

Dark mode usa a estrategia `class` — o atributo `class="dark"` e adicionado ao `<html>`. A preferencia e salva em `localStorage` e aplicada antes do render para evitar flash de tema errado:

```html
<script>
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

---

## Tipografia

| Escala | Tamanho | Peso | Uso |
|--------|---------|------|-----|
| Display | 36px / 2.25rem | 700 (Bold) | Titulos de pagina, hero sections |
| Heading 1 | 30px / 1.875rem | 600 (Semibold) | Titulos de modulo |
| Heading 2 | 24px / 1.5rem | 600 (Semibold) | Titulos de licao, secoes |
| Heading 3 | 20px / 1.25rem | 500 (Medium) | Sub-secoes |
| Body | 16px / 1rem | 400 (Regular) | Conteudo principal, paragrafos |
| Body Small | 14px / 0.875rem | 400 (Regular) | Conteudo secundario, metadata |
| Label | 12px / 0.75rem | 500 (Medium) | Labels de formulario, badges, uppercase labels |
| Code | 14px / 0.875rem | 400 (Regular) | Blocos de codigo e inline code (Geist Mono) |

Line-height padrao: 1.6 para body, 1.2 para headings.

---

## Animacoes

| Animacao | Duracao | Easing | Uso |
|----------|---------|--------|-----|
| Transicao de pagina | 200ms | `ease-out` | Mudanca de rota (fade-in) |
| Expansao de sidebar | 200ms | `ease-in-out` | Abrir/fechar secoes de modulo |
| Hover em card | 150ms | `ease-out` | Cards de modulo, cards de licao |
| Barra de progresso | 500ms | `ease-out` | Preenchimento ao completar licao |
| Slide de painel | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Sidebar mobile |
| Fade de notificacao | 200ms | `ease-in` | Toasts de sucesso/erro |
| Skeleton loading | 1.5s | `ease-in-out` (loop) | Placeholders de carregamento |

---

## Hierarquia de Componentes

```
shadcn/ui (componentes base) — nunca modificar diretamente
  └── src/components/ui/
      ├── button.tsx
      ├── card.tsx
      ├── badge.tsx
      ├── tabs.tsx
      ├── progress.tsx
      ├── input.tsx
      ├── dialog.tsx
      ├── dropdown-menu.tsx
      ├── separator.tsx
      ├── scroll-area.tsx
      ├── toggle.tsx
      └── tooltip.tsx

Componentes de feature (composicoes especificas do projeto)
  └── src/components/features/
      ├── module-card.tsx
      ├── lesson-content.tsx
      ├── exercise-panel.tsx
      ├── progress-bar.tsx
      ├── sidebar-nav.tsx
      ├── code-block.tsx
      ├── glossary-list.tsx
      └── theme-toggle.tsx

Componentes de layout
  └── src/components/layout/
      ├── app-shell.tsx
      ├── sidebar.tsx
      ├── main-content.tsx
      └── page-header.tsx
```

### Componentes Customizados Principais

| Componente | Proposito |
|------------|-----------|
| `ModuleCard` | Card de modulo com icone, titulo, descricao e barra de progresso |
| `LessonContent` | Renderizador de conteudo markdown com syntax highlighting |
| `ExercisePanel` | Painel de exercicio com instrucoes, area de resposta e validacao |
| `ProgressBar` | Barra de progresso do modulo/treinamento com animacao |
| `SidebarNav` | Navegacao lateral com modulos expansiveis e indicadores de status |
| `CodeBlock` | Bloco de codigo com syntax highlighting, copy button e label de linguagem |
| `GlossaryList` | Lista de termos do glossario com busca e filtro por modulo |
| `ThemeToggle` | Toggle entre light/dark mode com persistencia em localStorage |

---

## Padroes de Layout

### Paginas Padrao (com sidebar)
- Sidebar fixa a esquerda: largura 240px no desktop
- Area de conteudo principal: `max-width: 768px`, centralizada horizontalmente com `padding: 2rem`
- Espacamento consistente: `gap-6` entre secoes, `gap-4` entre elementos

### Paginas Full-Width
- Dashboard usa grid de cards que ocupa toda a largura disponivel
- Configuracoes usa layout de formulario centralizado sem sidebar expandida

### Layout de Licao (Split Content)
- Aba de teoria: conteudo em prosa (max-width: 65ch para legibilidade)
- Aba de exemplo: codigo em painel largo
- Aba de exercicio: instrucoes a esquerda, area interativa a direita (em desktop)

### Breakpoints

| Breakpoint | Largura | Comportamento |
|------------|---------|---------------|
| Mobile | < 640px | Sidebar oculta (hamburger), conteudo full-width, stack vertical |
| Tablet | 640px - 1024px | Sidebar colapsada (somente icones), conteudo adaptado |
| Desktop | > 1024px | Sidebar expandida, layout completo |

---

## Dark Mode

Estrategia: **class-based** com deteccao de preferencia do sistema como fallback.

- Toggle manual disponivel nas configuracoes e no header
- Preferencia salva em `localStorage.theme`
- Script inline no `<head>` previne flash de tema incorreto
- Todos os componentes shadcn/ui ja suportam dark mode nativamente
- Blocos de codigo usam tema escuro (Catppuccin Mocha) em ambos os modos
- Icones Lucide funcionam identicamente em light e dark (stroke-based)

---

## Conjuntos de Icones

| Conjunto | Uso |
|----------|-----|
| Lucide React | Icones de navegacao, acoes, status e UI geral |
| Custom SVGs (se necessario) | Icones especificos do projeto (logo, ilustracoes de modulo) |

Convencao: usar tamanho `16px` para inline, `20px` para botoes, `24px` para navegacao.

---

## Inventario de Componentes

| Componente | Origem | Uso |
|------------|--------|-----|
| Button | shadcn/ui | CTAs, acoes, navegacao |
| Card | shadcn/ui | Containers de modulo e licao |
| Badge | shadcn/ui | Status de licao, tags de dificuldade |
| Tabs | shadcn/ui | Navegacao entre Teoria/Exemplo/Exercicio |
| Progress | shadcn/ui | Barras de progresso |
| Input | shadcn/ui | Campo de busca no glossario |
| ScrollArea | shadcn/ui | Sidebar com scroll customizado |
| Separator | shadcn/ui | Divisores visuais entre secoes |
| Tooltip | shadcn/ui | Dicas contextuais em icones |
| Toggle | shadcn/ui | Dark mode toggle |
| ModuleCard | Custom | Card de modulo no dashboard |
| LessonContent | Custom | Renderizacao de conteudo markdown |
| ExercisePanel | Custom | Interface de exercicios |
| CodeBlock | Custom | Syntax highlighting para codigo |
| SidebarNav | Custom | Navegacao lateral do treinamento |
| ThemeToggle | Custom | Alternancia de tema claro/escuro |

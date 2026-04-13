# Vibe Coding Training — Desenvolvimento Agent-First
**Status:** v1
**Ultima Atualizacao:** 2026-04-13

---

## O Que E Desenvolvimento Agent-First

Desenvolvimento agent-first e uma abordagem onde o repositorio de codigo e projetado para ser legivel e navegavel tanto por humanos quanto por agentes de IA. Nao e apenas "usar IA para codar" — e estruturar o projeto inteiro de forma que a IA consiga trabalhar de forma autonoma e eficaz.

O principio fundamental: **tudo que o agente precisa saber deve estar no repositorio**. Se uma decisao vive no Slack, no Google Docs ou na cabeca de alguem, ela nao existe para o agente.

---

## Principio 1: Progressive Disclosure (Revelacao Progressiva)

### CLAUDE.md / AGENTS.md como Indice

O arquivo de contexto na raiz do projeto (CLAUDE.md ou AGENTS.md) deve ter no maximo ~100 linhas. Ele e um **indice**, nao uma enciclopedia.

**Errado — arquivo de contexto como enciclopedia:**
```markdown
# CLAUDE.md

## Stack Tecnologico
Usamos React 18 com Vite 5 e TypeScript 5 strict mode. O Vite esta
configurado com os seguintes plugins: react-swc, path aliases...
[300 linhas de detalhes]

## Design System
As cores primarias sao #6D28D9 (roxo) e #10B981 (verde)...
[200 linhas de tokens e componentes]

## Banco de Dados
Supabase com as seguintes tabelas...
[150 linhas de schema SQL]
```

**Correto — arquivo de contexto como indice:**
```markdown
# CLAUDE.md

## Sobre o Projeto
Treinamento de vibe coding: webapp React que ensina programacao assistida por IA.

## Stack
React 18 + Vite 5 + TypeScript 5 + shadcn/ui + Tailwind CSS v4

## Documentacao
Leia antes de fazer mudancas:
- `docs/02-DESIGN-SYSTEM.md` — cores, tipografia, componentes
- `docs/04-DATA-ARCHITECTURE.md` — modelos de dados, acesso
- `docs/05-ARCHITECTURE-DECISIONS.md` — decisoes e seus motivos

## Convencoes
- TypeScript strict em todo o src/
- Componentes em src/components/features/ (nunca modificar src/components/ui/)
- Dados do treinamento em src/data/ como constantes TypeScript
- Progresso do aluno em localStorage

## Comandos
- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de producao
- `npm run lint` — verificar erros de lint
```

### Hierarquia de Conhecimento

```
AGENTS.md + CLAUDE.md (raiz, indice ~progressive disclosure)
  │
  ├── docs/00-DOC-STANDARDS.md (como documentar)
  ├── docs/01-INFORMATION-ARCHITECTURE.md (rotas, entidades, navegacao)
  ├── docs/02-DESIGN-SYSTEM.md (visual: cores, fontes, componentes)
  ├── docs/03-VOCABULARY.md (termos canonicos)
  ├── docs/04-DATA-ARCHITECTURE.md (modelos, acesso a dados)
  ├── docs/05-ARCHITECTURE-DECISIONS.md (ADRs)
  ├── docs/08-AI-TOOL-CONFIG.md (pastas por ferramenta: .claude, .cursor, skills)
  ├── docs/guides/ (skills operacionais em texto / metodologia)
  ├── docs/prd/ (product requirements)
  └── docs/specs/ (especificacoes tecnicas)
```

O agente le o CLAUDE.md, entende o contexto geral, e entao navega para o documento relevante conforme a tarefa.

**Skill ou interface:** em fluxos agent-first, e facil pedir tela no produto quando o primeiro entregavel deveria ser um playbook para o agente. Antes de priorizar UI no `app/`, leia `docs/00-DOC-STANDARDS.md` (secao **Skill versus interface**) e responda as perguntas de decisao ali — isso evita codigo de front que nao tem usuario final real.

---

## Principio 2: Repositorio como Sistema de Conhecimento

### Estrutura docs/ Recomendada

```
docs/
├── prd/                    ← Product Requirements Documents
│   ├── prd-v1.md           ← Versao atual do PRD
│   └── user-stories.md     ← Historias de usuario
│
├── specs/                  ← Especificacoes tecnicas
│   ├── auth-flow.md        ← Fluxo de autenticacao
│   └── data-migration.md   ← Plano de migracao de dados
│
├── adr/                    ← Architecture Decision Records
│   ├── adr-001.md          ← Decisao individual (se preferir arquivos separados)
│   └── ...
│
├── guides/                 ← Skills e guias operacionais
│   ├── SKILL-IDENTIDADE-VISUAL.md
│   ├── SKILL-CRUD-PATTERN.md
│   └── GUIDE-DEPLOY.md
│
├── references/             ← Material de referencia externo
│   ├── supabase-rls.md     ← Anotacoes sobre RLS
│   └── tailwind-v4.md      ← Notas sobre migracao Tailwind v4
│
└── generated/              ← Documentos gerados automaticamente
    ├── api-schema.md       ← Gerado a partir do codigo
    └── component-tree.md   ← Gerado por script
```

### Regras do Sistema de Conhecimento

1. **Documentacao vive no repo** — nao no Notion, Confluence, Google Docs ou Slack
2. **Documentacao e versionada** — mudancas aparecem em PRs e podem ser revisadas
3. **Documentacao e descobrivel** — o CLAUDE.md aponta para tudo; nenhum documento fica "orfao"
4. **Documentacao e acionavel** — nao descreve apenas "o que e", mas "o que fazer"
5. **Documentacao e concisa** — se voce precisa de mais de 2 paginas para explicar algo, divida em documentos menores

---

## Principio 3: Enforcement de Arquitetura

Em desenvolvimento agent-first, regras nao podem depender apenas de convencao ou memoria. Elas devem ser **enforced mecanicamente**.

### Linters e Formatadores

```json
// .eslintrc ou eslint.config.js
{
  "rules": {
    "no-restricted-imports": ["error", {
      "patterns": [{
        "group": ["../components/ui/*"],
        "message": "Importe componentes UI de @/components/ui, nao caminhos relativos"
      }]
    }]
  }
}
```

### Testes Estruturais

Testes que validam a arquitetura do projeto, nao apenas a logica:

```typescript
// __tests__/architecture.test.ts
import { readdirSync } from "fs";

describe("Arquitetura", () => {
  test("src/components/ui/ contem apenas componentes shadcn", () => {
    const files = readdirSync("src/components/ui");
    // Validar que nao ha componentes de feature em ui/
    files.forEach(file => {
      expect(file).not.toContain("module");
      expect(file).not.toContain("lesson");
      expect(file).not.toContain("exercise");
    });
  });

  test("src/data/ contem apenas constantes TypeScript", () => {
    const files = readdirSync("src/data", { recursive: true });
    files.forEach(file => {
      if (typeof file === "string") {
        expect(file).toMatch(/\.(ts|tsx)$/);
      }
    });
  });

  test("Nenhum .js no src/", () => {
    // Garante que todo codigo fonte e TypeScript
    const files = readdirSync("src", { recursive: true });
    const jsFiles = (files as string[]).filter(f => f.endsWith(".js"));
    expect(jsFiles).toHaveLength(0);
  });
});
```

### Verificacao de Invariantes

Invariantes sao regras que NUNCA devem ser violadas. Documente-as e teste-as:

```markdown
## Invariantes do Projeto

1. Todo arquivo em src/ deve ser TypeScript (.ts ou .tsx)
2. Componentes em src/components/ui/ nunca sao modificados diretamente
3. Dados do treinamento vivem exclusivamente em src/data/
4. Nenhum secret ou key aparece no codigo-fonte (apenas em .env.local)
5. Todo componente de feature tem pelo menos uma interface de props tipada
6. O CLAUDE.md tem no maximo 100 linhas
```

---

## Principio 4: Gerenciamento de Entropia

Projetos com agentes de IA geram entropia mais rapido que projetos tradicionais. Codigo e criado rapidamente, mas sem manutencao constante, a base de codigo degrada.

### Principios Dourados (Golden Principles)

Defina 5-7 principios inegociaveis que guiam toda decisao:

1. **Conteudo como constantes** — dados do treinamento nunca vao para banco de dados; sao versionados com o codigo
2. **Componentes nao sao caixas-pretas** — shadcn/ui e copiado, nao instalado; todo componente e editavel
3. **TypeScript strict sempre** — sem `any`, sem `@ts-ignore`; tipos sao documentacao viva
4. **Progresso e local** — localStorage para progresso do aluno; zero dependencia de backend
5. **Docs no repo** — toda decisao importante existe em `docs/`; se nao esta no repo, nao existe
6. **Mobile-friendly** — toda tela funciona em 320px; sidebar colapsa; conteudo adapta

### Limpeza Continua

Divida tecnical no treinamento como pequenos pagamentos continuos, nao como uma "refatoracao grande":

| Frequencia | Tarefa |
|------------|--------|
| A cada PR | Remover imports nao usados, corrigir warnings do linter |
| Semanal | Revisar TODO/FIXME no codigo e resolver ou documentar |
| Quinzenal | Atualizar dependencias (minor/patch) |
| Mensal | Revisar docs/ — atualizar arquivos defasados, remover docs obsoletos |
| Trimestral | Avaliar se os ADRs ainda fazem sentido; criar novos se necessario |

### Sinais de Entropia Alta

- Arquivos com mais de 300 linhas (componentes devem ser divididos)
- Imports circulares
- Tipos `any` aparecendo no codigo
- Documentacao contradizendo o codigo
- CLAUDE.md com mais de 100 linhas
- Componentes customizados duplicando funcionalidade do shadcn/ui

---

## Principio 5: Arquitetura em Camadas de Dominio

Organize o codigo em camadas com dependencias unidirecionais:

```
Types (tipagens)
  ↓
Config (constantes, tokens, configuracao)
  ↓
Data / Repository (acesso a dados, loaders)
  ↓
Services (logica de negocio, transformacoes)
  ↓
Hooks (estado e efeitos colaterais do React)
  ↓
Components / UI (renderizacao visual)
```

### Regras de Dependencia

- Cada camada so pode importar da camada acima (nunca abaixo)
- Types nao importa nada — e a camada mais pura
- UI nunca acessa dados diretamente — sempre via hooks ou services
- Services nao conhecem React — sao funcoes puras
- Config nao depende de runtime — so de types

### Exemplo Pratico

```
src/
├── types/
│   ├── module.ts          ← Interface Module, Lesson, Exercise
│   └── progress.ts        ← Interface ProgressState
│
├── config/
│   └── constants.ts       ← Limites, defaults, feature flags
│
├── data/
│   ├── modules.ts         ← Constantes de modulos
│   └── lessons/           ← Constantes de licoes por modulo
│
├── services/
│   ├── progress.ts        ← Logica de calculo de progresso
│   └── search.ts          ← Logica de busca no glossario
│
├── hooks/
│   ├── useProgress.ts     ← Hook que combina data + services + estado
│   └── useGlossary.ts     ← Hook de busca no glossario
│
├── components/
│   ├── ui/                ← shadcn/ui (nao modificar)
│   ├── layout/            ← Shell, sidebar, header
│   └── features/          ← Componentes especificos do treinamento
│
└── pages/
    ├── dashboard.tsx       ← Pagina: dashboard
    ├── module.tsx          ← Pagina: detalhe do modulo
    └── lesson.tsx          ← Pagina: conteudo da licao
```

---

## Principio 6: Filosofia de Merge

### PRs Curtos e Frequentes

No desenvolvimento agent-first, a filosofia e: **corrigir e barato, esperar e caro**.

| Pratica | Motivo |
|---------|--------|
| PRs com menos de 200 linhas | Faceis de revisar; conflitos raros |
| Merge em menos de 24 horas | Branches longas divergem e geram conflitos |
| Corrigir no proximo PR | Se algo passou, corrija rapido; nao bloqueie o merge |
| Feature flags para WIP | Codigo incompleto pode ser mergeado se estiver desabilitado |
| Nao esperar perfeicao | 80% correto e mergeado > 100% correto em 3 dias |

### Commits Logicos

Cada commit representa um checkpoint logico:

```
feat: adicionar card de modulo com barra de progresso
fix: corrigir calculo de progresso quando licao e marcada como completa
docs: atualizar ADR-003 com nota sobre migracao de dados
refactor: extrair logica de progresso para service separado
```

Prefixos padrao:
- `feat:` — nova funcionalidade
- `fix:` — correcao de bug
- `docs:` — mudanca em documentacao
- `refactor:` — reestruturacao sem mudanca de comportamento
- `style:` — formatacao, espacamento, ponto-e-virgula
- `test:` — adicao ou correcao de testes
- `chore:` — tarefas de manutencao (deps, config)

---

## Principio 7: Agent Readability (Legibilidade para Agentes)

### Nomeacao Clara

Nomes de arquivos, funcoes e variaveis devem ser auto-explicativos:

**Ruim para agentes:**
```
src/utils/helpers.ts        ← O que tem aqui?
src/components/Card.tsx     ← Card de que?
src/lib/api.ts              ← API de que?
```

**Bom para agentes:**
```
src/services/progress.ts           ← Logica de progresso
src/components/features/module-card.tsx  ← Card de modulo
src/lib/supabase-client.ts         ← Client do Supabase
```

### Comentarios Estrategicos

Nao comente o "o que" (o codigo ja diz). Comente o "por que":

```typescript
// Ruim: incrementa o contador
count++;

// Bom: Incrementa antes do render porque o useEffect depende do valor atualizado
count++;
```

### Tipos como Documentacao

Em TypeScript, tipos bem escritos eliminam a necessidade de muitos comentarios:

```typescript
// Os tipos documentam o contrato sem precisar de comentarios
interface LessonProgress {
  lessonId: string;
  startedAt: string;          // ISO date
  completedAt: string | null; // null = em andamento
  timeSpentMinutes: number;
  exerciseCompleted: boolean;
}
```

---

## Checklist de Projeto Agent-First

Use esta checklist ao configurar ou auditar um projeto:

- [ ] CLAUDE.md existe na raiz com no maximo ~100 linhas
- [ ] CLAUDE.md aponta para todos os documentos em docs/
- [ ] docs/ contem arquivos para: design system, data architecture, ADRs, vocabulario
- [ ] Nenhuma decisao importante existe apenas fora do repo
- [ ] Linter configurado e rodando no pre-commit
- [ ] TypeScript strict mode ativado
- [ ] Testes estruturais validam convencoes de arquitetura
- [ ] Invariantes documentadas e testadas
- [ ] Commits seguem convencao de prefixos
- [ ] Componentes seguem a hierarquia de camadas
- [ ] Nomeacao de arquivos e auto-explicativa
- [ ] PRs sao pequenos e mergeados rapidamente
- [ ] Limpeza de entropia acontece continuamente (nao em "sprints de refatoracao")
- [ ] Skills de IA estao no repositorio em docs/guides/

---

## Resumo: Desenvolvimento Tradicional vs. Agent-First

| Aspecto | Tradicional | Agent-First |
|---------|------------|-------------|
| Documentacao | Notion, Confluence, wikis externas | No repositorio, em docs/ |
| Contexto | Na cabeca do dev, no Slack | Em CLAUDE.md + docs/ |
| Convencoes | README + "pergunte ao senior" | Linters + testes estruturais + invariantes |
| PRs | Grandes, revisao detalhada | Pequenos, merge rapido, correcao no proximo PR |
| Nomeacao | Convencao do time | Auto-explicativa (o agente nao "conhece" o time) |
| Tech debt | Sprint de refatoracao trimestral | Pagamentos pequenos e continuos |
| Design system | Figma + documentacao visual | Tokens JSON + Skill de identidade visual no repo |
| Onboarding | Pareamento com senior | Ler CLAUDE.md → docs/ → codigo |

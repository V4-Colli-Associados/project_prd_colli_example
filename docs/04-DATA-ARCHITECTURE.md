# Vibe Coding Training — Arquitetura de Dados
**Status:** v1
**Ultima Atualizacao:** 2026-04-11

---

## Visao Geral

O projeto Vibe Coding Training possui **duas camadas de dados** distintas:

1. **Dados do Treinamento** — O conteudo dos modulos, licoes e exercicios. Armazenados como **constantes TypeScript** diretamente no codigo-fonte. Nao usam banco de dados porque o conteudo e estatico e versionado junto com o codigo.

2. **Dados de Ensino (Exemplo CRUD)** — O treinamento ensina o aluno a construir um app com Supabase. Esses dados vivem no Supabase e demonstram padroes reais de banco de dados (CRUD, RLS, autenticacao).

O progresso do aluno no treinamento e salvo em **localStorage** do navegador — sem necessidade de autenticacao ou backend para o treinamento em si.

---

## Estrutura de Arquivos de Dados

```
src/
├── data/
│   ├── modules.ts              ← Definicao de todos os modulos
│   ├── lessons/
│   │   ├── mod01-fundamentos/
│   │   │   ├── lesson-01.ts    ← Conteudo da licao: variaveis e tipos
│   │   │   ├── lesson-02.ts    ← Conteudo da licao: condicionais
│   │   │   └── lesson-03.ts    ← Conteudo da licao: funcoes
│   │   ├── mod02-setup/
│   │   │   ├── lesson-01.ts    ← Conteudo da licao: instalacao do ambiente
│   │   │   └── lesson-02.ts    ← Conteudo da licao: configuracao de projeto
│   │   ├── mod03-frontend/
│   │   │   └── ...
│   │   ├── mod04-backend/
│   │   │   └── ...
│   │   └── mod05-deploy/
│   │       └── ...
│   ├── exercises/
│   │   ├── mod01/
│   │   │   ├── ex-01.ts        ← Exercicio: criar variaveis
│   │   │   └── ...
│   │   └── ...
│   └── glossary.ts             ← Todos os termos do glossario
│
├── types/
│   ├── module.ts               ← Tipos para Module, Lesson, Exercise
│   ├── progress.ts             ← Tipos para estado de progresso
│   └── glossary.ts             ← Tipos para termos do glossario
│
└── lib/
    ├── progress.ts             ← Funcoes de leitura/escrita de progresso (localStorage)
    └── content.ts              ← Funcoes de acesso ao conteudo dos modulos
```

---

## Padroes de Dados

### Dados Estaticos como Constantes TypeScript

O conteudo do treinamento e definido como constantes TypeScript com tipagem estrita. Isso garante:
- Validacao em tempo de build (erros de tipo antes do deploy)
- Autocomplete no editor
- Versionamento junto com o codigo
- Zero latencia de carregamento (sem chamadas de rede)

```typescript
// src/data/modules.ts
export const MODULES: Module[] = [
  {
    id: "mod-01",
    titulo: "Fundamentos de Programacao",
    descricao: "Variaveis, tipos, condicionais, loops e funcoes",
    ordem: 1,
    icone: "code",
    licoes: ["les-01-01", "les-01-02", "les-01-03"],
  },
  // ...
];
```

### Progresso do Aluno (localStorage)

O progresso e um objeto JSON salvo em `localStorage` com a chave `vibe-training-progress`:

```typescript
// Estrutura salva em localStorage
interface ProgressState {
  versao: number;              // Schema version para migracao futura
  ultimoAcesso: string;        // ISO date
  moduloAtual: string;         // ID do modulo em andamento
  licaoAtual: string;          // ID da licao em andamento
  licoesCompletas: string[];   // IDs de licoes finalizadas
  exerciciosCompletos: string[]; // IDs de exercicios finalizados
}
```

### Padrao Two-Tier (Ensinado no Treinamento)

O treinamento ensina o padrao two-tier para quando o aluno construir seu proprio app:

- **Tier 1 — Lista (resumo)**: Campos leves para renderizar cards e listas. Carregados em bulk.
- **Tier 2 — Detalhe (completo)**: Todos os campos, carregados individualmente por ID.

Exemplo ensinado no modulo de backend:

```typescript
// Tier 1: Resumo para lista
interface ProjetoResumo {
  id: string;
  nome: string;
  status: "rascunho" | "ativo" | "arquivado";
  criadoEm: string;
  atualizadoEm: string;
}

// Tier 2: Detalhe completo
interface ProjetoDetalhe extends ProjetoResumo {
  descricao: string;
  tarefas: Tarefa[];
  membros: Membro[];
  configuracoes: Record<string, unknown>;
}
```

---

## Modelos de Dados Principais

### Modulo

```typescript
interface Module {
  id: string;                    // "mod-01", "mod-02", etc.
  titulo: string;                // "Fundamentos de Programacao"
  descricao: string;             // Descricao curta para o card
  ordem: number;                 // Posicao na sequencia
  icone: string;                 // Nome do icone Lucide
  licoes: string[];              // IDs das licoes, em ordem
  projetoPratico?: ProjetoPratico; // Projeto opcional ao final do modulo
}
```

### Licao

```typescript
interface Lesson {
  id: string;                    // "les-01-01" (modulo-licao)
  moduloId: string;              // "mod-01"
  titulo: string;                // "Variaveis e Tipos"
  ordem: number;                 // Posicao dentro do modulo
  duracaoEstimada: string;       // "15 min"
  conteudo: {
    teoria: string;              // Markdown com a explicacao
    exemplo: string;             // Codigo de exemplo completo
    exercicioId: string;         // ID do exercicio vinculado
  };
}
```

### Exercicio

```typescript
interface Exercise {
  id: string;                    // "ex-01-01"
  licaoId: string;               // "les-01-01"
  titulo: string;                // "Crie uma variavel e exiba no console"
  instrucoes: string;            // Markdown com as instrucoes
  tipo: "codigo" | "quiz" | "projeto";
  dificuldade: "iniciante" | "intermediario" | "avancado";
  dicas?: string[];              // Dicas progressivas
  solucao?: string;              // Codigo da solucao (oculto ate o aluno tentar)
}
```

### Termo do Glossario

```typescript
interface GlossaryTerm {
  id: string;                    // "vibe-coding", "prompt", etc.
  termo: string;                 // "Vibe Coding"
  definicao: string;             // Descricao completa
  modulosRelacionados: string[]; // ["mod-01", "mod-02"]
  sinonimos?: string[];          // Termos alternativos para busca
}
```

### Projeto Pratico

```typescript
interface ProjetoPratico {
  id: string;                    // "proj-01"
  titulo: string;                // "Calculadora de IMC"
  descricao: string;             // Markdown com descricao
  criteriosAceitacao: string[];  // ["Deve aceitar peso e altura", ...]
}
```

---

## Modelo de Dados de Ensino (Supabase — Exemplo CRUD)

O modulo de backend ensina o aluno a criar um app de gerenciamento de tarefas com Supabase. Este e o schema ensinado:

### Tabelas no Supabase

```sql
-- Tabela de projetos (exemplo ensinado)
CREATE TABLE projetos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'ativo', 'arquivado')),
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);

-- Tabela de tarefas (exemplo ensinado)
CREATE TABLE tarefas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_progresso', 'concluida')),
  prioridade TEXT DEFAULT 'media' CHECK (prioridade IN ('baixa', 'media', 'alta')),
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now()
);

-- RLS: cada usuario so ve seus proprios projetos
ALTER TABLE projetos ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_projects ON projetos
  FOR ALL USING (user_id = auth.uid());

-- RLS: cada usuario so ve suas proprias tarefas
ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_tasks ON tarefas
  FOR ALL USING (user_id = auth.uid());
```

### Restricao de Dominio (Apps Internos)

Para apps corporativos, o treinamento ensina a restringir registro por dominio de email:

```sql
-- Permitir apenas emails @empresa.com
CREATE POLICY domain_restriction ON projetos
  FOR ALL USING (
    auth.jwt() ->> 'email' LIKE '%@empresa.com'
  );
```

---

## Camada de Acesso a Dados

### Dados do Treinamento (constantes locais)

| Funcao | Retorno | Descricao |
|--------|---------|-----------|
| `getModules()` | `Module[]` | Retorna todos os modulos em ordem |
| `getModuleById(id)` | `Module \| undefined` | Retorna um modulo por ID |
| `getLessonsByModule(moduleId)` | `Lesson[]` | Retorna licoes de um modulo |
| `getLessonById(id)` | `Lesson \| undefined` | Retorna uma licao por ID |
| `getExerciseByLesson(lessonId)` | `Exercise \| undefined` | Retorna o exercicio de uma licao |
| `getGlossaryTerms()` | `GlossaryTerm[]` | Retorna todos os termos do glossario |
| `searchGlossary(query)` | `GlossaryTerm[]` | Busca termos por texto |

### Progresso do Aluno (localStorage)

| Funcao | Retorno | Descricao |
|--------|---------|-----------|
| `getProgress()` | `ProgressState` | Le o progresso salvo (ou retorna estado inicial) |
| `saveProgress(state)` | `void` | Salva o estado de progresso |
| `markLessonComplete(lessonId)` | `void` | Adiciona licao a lista de completas |
| `markExerciseComplete(exerciseId)` | `void` | Adiciona exercicio a lista de completos |
| `isLessonComplete(lessonId)` | `boolean` | Verifica se uma licao esta completa |
| `getModuleProgress(moduleId)` | `number` | Retorna percentual de conclusao do modulo (0-100) |
| `resetProgress()` | `void` | Limpa todo o progresso (confirmacao obrigatoria) |

---

## Estado Compartilhado

| Contexto | Proposito |
|----------|-----------|
| `ProgressProvider` | Gerencia o estado de progresso do aluno. Carrega do localStorage no mount, salva a cada mudanca. Expoe `progress`, `markComplete`, `resetProgress`. |
| `ThemeProvider` | Gerencia tema claro/escuro. Sincroniza com localStorage e a classe `dark` no HTML root. Expoe `theme`, `setTheme`, `toggleTheme`. |

---

## Formato de Conteudo

O conteudo das licoes e armazenado como strings Markdown dentro das constantes TypeScript. A renderizacao usa:

- **react-markdown** — para converter markdown em JSX
- **rehype-highlight** ou **shiki** — para syntax highlighting em blocos de codigo
- **remark-gfm** — para suporte a tabelas e listas de tarefas no markdown

Convencoes de conteudo:
- Blocos de codigo usam triple backtick com indicador de linguagem (```typescript, ```sql, ```bash)
- Imagens sao raras; preferir diagramas ASCII ou Mermaid
- Links internos usam caminhos relativos de rota (nao de arquivo)
- Cada licao e autocontida — nao depende de ter lido outras licoes do mesmo modulo

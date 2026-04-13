# Vibe Coding — Starter Kit

Diretorio-modelo para iniciar projetos com metodologia vibe coding: **documentacao antes de codigo, contexto antes de prompts, decisoes registradas antes de esquecidas.**

---

## Quick Start

```bash
# 1. Clone o repositorio
git clone https://github.com/V4-Colli-Associados/project_prd_colli_example.git
cd project_prd_colli_example

# 2. Instale as dependencias do app
cd app
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev
# Acesse http://localhost:5173

# 4. (Opcional) Build de producao
npm run build
```

---

## Estrutura do Diretorio

```
project_prd_colli_example/
│
├── README.md                  ← Voce esta aqui
├── .gitignore
│
├── app/                       ← APLICACAO REACT
│   ├── CLAUDE.md              ← Contexto para agentes de IA
│   ├── src/
│   │   ├── App.tsx            ← Pagina principal (guia de uso)
│   │   ├── data/guide.ts      ← Conteudo: steps, estrutura, tools, FAQ
│   │   ├── components/ui/     ← Componentes shadcn/ui (button, card, badge...)
│   │   └── lib/utils.ts       ← Utilitarios (cn helper)
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── docs/                      ← CONHECIMENTO PERMANENTE
│   ├── 00-DOC-STANDARDS.md    ← Padroes de documentacao, estabilidade, precedencia
│   ├── 01-INFORMATION-ARCHITECTURE.md  ← Navegacao, rotas, entidades
│   ├── 02-DESIGN-SYSTEM.md    ← Tokens, cores, tipografia, componentes
│   ├── 03-VOCABULARY.md       ← 40+ termos com "Nao confundir com"
│   ├── 04-DATA-ARCHITECTURE.md ← Modelos de dados, JSON → Supabase
│   ├── 05-ARCHITECTURE-DECISIONS.md  ← ADRs com status + Hypothesis Tracker
│   ├── 06-SKILL-IDENTIDADE-VISUAL.md ← Guia de skills visuais para IA
│   ├── 07-AGENT-FIRST-DEVELOPMENT.md ← Principios agent-first (OpenAI/Codex)
│   │
│   ├── guides/
│   │   └── SKILL-CREATION-GUIDE.md    ← Passo a passo para criar skills
│   │
│   ├── references/
│   │   └── SKILL-EXAMPLES.md          ← 3 exemplos concretos de skills
│   │
│   └── templates/
│       ├── SKILL-TEMPLATE.md          ← Template em branco para sua skill
│       └── PROMPT-CREATE-SKILL.md     ← Prompts prontos para gerar skills
│
├── plans/                     ← PLANEJAMENTO (sprints, backlog, tracking)
├── scripts/                   ← AUTOMACOES (setup, seed, deploy)
└── temp/                      ← LIXO CONTROLADO (git-ignored)
```

---

## Arquitetura e Metodologia

### Tres camadas de documentacao

| Camada | O que contem | Onde vive | Frequencia de mudanca |
|--------|-------------|-----------|----------------------|
| **Fundamentos** | Stack, design system, principios, vocabulario | `docs/00-04` | Raro (meses) |
| **Decisoes** | ADRs, hipoteses, escolhas tecnicas | `docs/05` | Frequente (semanas) |
| **Operacao** | Sprints, tarefas, backlog | `plans/` | Muito frequente (dias) |

### Ciclo de retroalimentacao

O projeto funciona como um loop continuo entre documentacao e codigo:

```
  ┌──────────────┐
  │  1. DOCS     │  Escreva PRD, spec, design system
  │  (contexto)  │  antes de pedir qualquer codigo
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  2. CLAUDE.md│  Configure o ponto de entrada
  │  (indice)    │  ~100 linhas apontando para docs/
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  3. CODIGO   │  Agora sim, peca ao agente.
  │  (execucao)  │  Prompts serao muito melhores.
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  4. REGISTRO │  Decisao nova? → ADR
  │  (feedback)  │  Aposta? → Hypothesis Tracker
  └──────┬───────┘  Termo novo? → Vocabulario
         │
         └──────────► volta para 1.
```

### Regras-chave

- **Docs antes de codigo** — dia 1: 80% docs, 20% codigo. Inverte nos dias seguintes.
- **CLAUDE.md como indice** — ~100 linhas. Progressive disclosure, nao enciclopedia.
- **ADRs nunca deletadas** — decisao revertida vira nova ADR com `Substitui: ADR-NNN`.
- **Repo e a fonte de verdade** — o que o agente nao ve no repo, nao existe.
- **Divida tecnica: pague cedo** — agentes replicam padroes ruins. Limpe regularmente.
- **Separar por estabilidade** — fundamentos (meses) vs decisoes (semanas) vs operacao (dias).

---

## Stack do App

| Tecnologia | Versao | Proposito |
|-----------|--------|-----------|
| React | 19+ | Framework de UI |
| Vite | 8+ | Build tool |
| TypeScript | 6+ | Tipagem estatica |
| Tailwind CSS | v4 | Utilitarios de estilo |
| shadcn/ui | latest | Componentes acessiveis |
| Geist | variable | Fonte principal |

---

## Como usar cada IA

| Ferramenta | Papel | Quando usar |
|-----------|-------|-------------|
| **Cursor** | Execucao | Problema definido → precisa virar codigo |
| **ChatGPT** | Estruturacao | Problema mal definido → precisa de clareza |
| **Claude** | Aprofundamento | Problema grande → analise de multiplos arquivos |

---

## Migrando para Supabase

O app usa JSON local (localStorage) por padrao. Para migrar:

1. Crie um projeto no [Supabase](https://supabase.com)
2. Crie as tabelas necessarias com `user_id` (uuid) em cada uma
3. Adicione RLS: `CREATE POLICY user_data ON tabela USING (user_id = auth.uid())`
4. Configure `.env.local`:
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
5. Instale o client: `npm install @supabase/supabase-js`
6. Substitua os hooks de dados por chamadas ao Supabase

---

## Criando Skills de IA

Para criar uma skill de identidade visual:

1. Reuna materiais (brandbook, cores HEX, fontes)
2. Use o prompt em `docs/templates/PROMPT-CREATE-SKILL.md`
3. Revise o SKILL.md gerado
4. Instale em Claude.ai → Settings → Skills
5. Teste com um dashboard e refine

Guia completo: `docs/guides/SKILL-CREATION-GUIDE.md`
Template: `docs/templates/SKILL-TEMPLATE.md`
Exemplos: `docs/references/SKILL-EXAMPLES.md`

---

## Contribuindo

1. Leia `docs/00-DOC-STANDARDS.md` antes de qualquer mudanca
2. Toda decisao tecnica importante gera uma ADR em `docs/05-ARCHITECTURE-DECISIONS.md`
3. Arquivos temporarios vao para `temp/` (git-ignored)
4. Commits atomicos com mensagens descritivas
5. PRs curtos e frequentes > branches longas

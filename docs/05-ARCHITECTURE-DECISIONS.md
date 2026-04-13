# Vibe Coding Training — Decisoes de Arquitetura
**Status:** v1
**Ultima Atualizacao:** 2026-04-11

---

## ADR-001: Usar React + Vite + TypeScript como fundacao

**Status:** ATIVA
**Decisao:** O projeto utiliza React 18+ com Vite 5+ como build tool e TypeScript 5+ para tipagem estatica em todo o codigo.

**Contexto:** Para um treinamento de vibe coding, precisamos de uma stack que seja (1) amplamente adotada no mercado, (2) bem suportada por ferramentas de IA como Cursor e Claude, e (3) produtiva o suficiente para que iniciantes vejam resultados rapidamente. Alternativas consideradas: Next.js (complexo demais para o escopo — SSR e routing de servidor sao desnecessarios para um treinamento), Astro (otimo para conteudo estatico, mas limita a interatividade necessaria para exercicios), Vue/Svelte (menor ecossistema de suporte em ferramentas de IA). React e o framework com maior base de exemplos em modelos de linguagem, o que significa que a IA produz codigo React de qualidade superior. Vite foi escolhido sobre Create React App (descontinuado) e Webpack (configuracao complexa). TypeScript foi escolhido sobre JavaScript puro porque os erros de tipo funcionam como "guardrails" tanto para o aluno quanto para a IA — quando a IA gera codigo com tipos errados, o editor mostra o erro imediatamente.

**Consequencia:** Todo codigo deve ser escrito em TypeScript (`.ts` e `.tsx`). Arquivos `.js` nao sao permitidos no `src/`. A configuracao do `tsconfig.json` deve ser `strict: true`. O Vite exige que imports de assets usem caminhos relativos ou aliases configurados no `vite.config.ts`. Desenvolvedores precisam de Node.js 18+ instalado.

---

## ADR-002: Usar shadcn/ui como biblioteca de componentes

**Status:** ATIVA
**Decisao:** Adotamos shadcn/ui como biblioteca de componentes, com componentes copiados diretamente para `src/components/ui/`.

**Contexto:** O treinamento precisa de componentes acessiveis, bonitos e customizaveis. Alternativas consideradas: Material UI (muito opinado, dificil de customizar para uma identidade propria, bundle pesado), Chakra UI (bom mas menor comunidade em 2026), Headless UI (requer muito CSS manual), Radix UI puro (excelente primitivas mas sem estilizacao). shadcn/ui foi escolhido porque (1) os componentes sao copiados para o projeto, nao instalados como dependencia — isso ensina ao aluno que componentes sao codigo editavel, nao caixas-pretas, (2) usa Radix UI como primitiva de acessibilidade, (3) tem excelente suporte a Tailwind CSS, (4) modelos de IA conhecem muito bem o shadcn/ui e geram codigo correto para seus componentes, (5) a filosofia "copie e adapte" e perfeita para vibe coding.

**Consequencia:** Componentes em `src/components/ui/` sao de propriedade do projeto — podem e devem ser customizados. Atualizacoes do shadcn/ui devem ser feitas manualmente via CLI (`npx shadcn@latest add [componente]`). O projeto depende do Radix UI como peer dependency. Novos componentes devem seguir o mesmo padrao de API (variantes via `cva`, `className` como prop, forwarded refs).

---

## ADR-003: Usar Supabase como banco de dados de ensino

**Status:** ATIVA
**Decisao:** O Supabase e utilizado como plataforma de backend para o conteudo de ensino sobre banco de dados, autenticacao e seguranca. Nao e usado para os dados do treinamento em si (que sao constantes TypeScript).

**Contexto:** O treinamento precisa ensinar operacoes reais de banco de dados (CRUD), autenticacao e seguranca (RLS). Alternativas consideradas: Firebase (proprietario do Google, query language limitada, nao ensina SQL real), PlanetScale (MySQL, menor adocao em projetos novos), MongoDB Atlas (NoSQL — valido mas queremos ensinar SQL relacional), PostgreSQL puro (exigiria configuracao de servidor). Supabase foi escolhido porque (1) e open-source e baseado em PostgreSQL, (2) oferece autenticacao pronta, (3) RLS (Row Level Security) e um conceito poderoso e facil de ensinar, (4) tem um tier gratuito generoso para projetos de aprendizado, (5) a dashboard web permite ao aluno visualizar dados sem ferramentas extras, (6) bom suporte nas ferramentas de IA.

**Consequencia:** O modulo de backend assume que o aluno criara uma conta gratuita no Supabase. O arquivo `supabase/` na raiz do projeto contem migrations e seed data de ensino. Variaveis de ambiente do Supabase (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) devem ser configuradas em `.env.local` (nunca commitadas). O client-side Supabase usa a `anon key` — operacoes sensiveis devem ser feitas via Edge Functions. O treinamento ensina explicitamente o que NUNCA expor no client.

---

## ADR-004: Estruturar docs/ como sistema de conhecimento legivel por agentes

**Status:** ATIVA
**Decisao:** O diretorio `docs/` e organizado como um sistema de conhecimento estruturado com tres camadas: Skills (guias operacionais reutilizaveis), Documentos Vivos (PRDs, specs, stories) e Decisoes (ADRs).

**Contexto:** Em desenvolvimento agent-first, a documentacao nao e apenas para humanos — e a memoria persistente do agente entre sessoes. Se uma decisao existe apenas em uma conversa do Slack, no Google Docs ou na cabeca de alguem, ela nao existe para o agente. Alternativas consideradas: Notion/Confluence (fora do repo, inacessivel para agentes de codigo), wiki no GitHub (separada do codigo, facil de ficar desatualizada), documentacao inline apenas (insuficiente para decisoes de alto nivel). A estrutura `docs/` no repositorio foi escolhida porque (1) e versionada com git junto ao codigo, (2) e diretamente acessivel pelo Cursor, Claude e qualquer agente de IA, (3) diffs de documentacao aparecem nos PRs, (4) permite progressive disclosure — CLAUDE.md aponta para docs/ que aponta para subarquivos.

**Consequencia:** Toda decisao importante deve ser registrada em `docs/`. Arquivos seguem a convencao `NN-NOME-EM-MAIUSCULAS.md`. O CLAUDE.md na raiz funciona como indice (~100 linhas) que aponta para os documentos detalhados. Skills reutilizaveis vivem em `docs/guides/`. ADRs nunca sao deletados — decisoes revertidas recebem um novo ADR que referencia o original. Documentacao deve ser escrita pensando em ambos os publicos: humanos e agentes de IA.

---

## ADR-005: Usar CLAUDE.md e AGENTS.md como pontos de entrada de contexto para IA

**Status:** ATIVA
**Decisao:** O projeto mantem dois arquivos de contexto na raiz: `CLAUDE.md` (especifico para o Claude/Cursor) e `AGENTS.md` (agnosto de ferramenta), ambos funcionando como indices para o sistema de documentacao.

**Contexto:** Agentes de IA precisam de um ponto de entrada rapido para entender o projeto. Sem isso, cada nova sessao comeca do zero — o agente precisa "redescobrir" o projeto. Alternativas consideradas: um unico README.md (mistura informacao para humanos e agentes, tende a ficar longo e generico), apenas comentarios no codigo (insuficiente para contexto de alto nivel), instruir o agente verbalmente a cada sessao (fragil e repetitivo). A abordagem de dois arquivos foi escolhida porque (1) CLAUDE.md e otimizado para o Claude — pode incluir instrucoes especificas como "leia docs/02-DESIGN-SYSTEM.md antes de gerar componentes", (2) AGENTS.md e portavel para qualquer ferramenta de IA, (3) ambos seguem o principio de progressive disclosure — sao indices curtos (~100 linhas) que apontam para documentacao detalhada, (4) o Cursor IDE reconhece e prioriza esses arquivos automaticamente.

**Consequencia:** CLAUDE.md e AGENTS.md devem ser mantidos curtos e atualizados. Eles nao devem conter detalhes — apenas apontar para onde os detalhes estao. Quando um novo documento e adicionado a `docs/`, a referencia deve ser adicionada ao CLAUDE.md/AGENTS.md. O conteudo dos dois arquivos pode divergir (CLAUDE.md pode ter instrucoes especificas para o Claude que nao fazem sentido para outros agentes). Esses arquivos sao o primeiro lugar que qualquer contribuidor deve ler ao entrar no projeto.

---

---

## Vocabulario de Status para ADRs

| Status | Significado | Quando usar |
|--------|-------------|-------------|
| **ATIVA** | Decisao em vigor, orienta acoes atuais | Decisao tomada e nao revisada |
| **REVISADA** | Decisao foi substituida por uma mais recente | Criar novo ADR com `Substitui: ADR-NNN` |
| **SUSPENSA** | Decisao temporariamente pausada, pode ser retomada | Dependencia externa ou mudanca de prioridade |

Quando uma ADR e revisada, nunca apague a original. Crie uma nova ADR (ex: ADR-006) com o campo `Substitui: ADR-002` e mude o status da original para `REVISADA`.

---

## Hypothesis Tracker

Hipoteses sao apostas que ainda nao foram validadas mas orientam decisoes. Diferem de ADRs porque ADRs registram escolhas feitas; hipoteses registram o que acreditamos ser verdade mas ainda precisamos confirmar.

| ID | Aposta | Status | Criterio de Validacao | Risco se errada |
|----|--------|--------|-----------------------|-----------------|
| H-001 | shadcn/ui gera melhor output de IA que outras libs | EM AVALIACAO | Comparar qualidade de codigo gerado por Claude/Cursor para shadcn vs Material UI vs Chakra em 10 prompts identicos | Se falsa, trocar para a lib com melhor output de IA — custo de migracao de componentes |
| H-002 | Alunos iniciantes conseguem rodar o setup Vite + TS sem bloqueio | EM AVALIACAO | Medir quantos alunos completam o setup sem pedir ajuda no primeiro modulo | Se falsa, precisamos de um script de setup automatizado ou ambiente cloud pre-configurado |
| H-003 | Documentacao no repo substitui onboarding verbal para agentes de IA | EM AVALIACAO | Testar se um agente consegue gerar codigo correto para o projeto usando apenas CLAUDE.md + docs/ sem instrucoes adicionais | Se falsa, CLAUDE.md precisa ser mais prescritivo ou precisamos de mais exemplos inline |

### Status de hipoteses

| Status | Significado |
|--------|-------------|
| **EM AVALIACAO** | Ainda nao testada, orienta decisoes provisoriamente |
| **VALIDADA** | Confirmada com evidencia — mover para secao "Validadas" com a evidencia |
| **REFUTADA** | Desmentida com evidencia — mover para "Refutadas" e revisar decisoes dependentes |
| **ABANDONADA** | Nao e mais relevante, sem evidencia em nenhuma direcao |

### Hipoteses Validadas

(mover para ca quando validada, incluindo a evidencia)

### Hipoteses Refutadas

(mover para ca quando refutada, incluindo a evidencia e as decisoes que precisam ser revisadas)

---

<!--
  Adicione novos ADRs conforme decisoes sao tomadas. Mantenha a numeracao sequencial.
  Nao delete ADRs antigos — se uma decisao e revertida, crie um novo ADR que o substitua
  e referencie o original (ex: "Substitui ADR-003").

  Bons ADRs sao curtos. Quatro campos: Status, Decisao, Contexto, Consequencia.
  Se voce esta escrevendo mais que um paragrafo por campo, divida em dois ADRs.

  Hipoteses sao separadas de ADRs. Use o Hypothesis Tracker acima.
  Nunca marque uma hipotese como VALIDADA sem evidencia explicita.
  Nunca marque como REFUTADA sem indicar o que deu errado.
-->

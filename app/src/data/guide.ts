export interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface DirectoryItem {
  path: string;
  description: string;
  badge?: string;
}

export interface ToolRole {
  name: string;
  role: string;
  when: string;
  examples: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const quickStart: Step[] = [
  {
    number: "01",
    title: "Leia os docs/",
    description: "Entenda as regras do jogo antes de jogar",
    details: [
      "Comece por docs/00-DOC-STANDARDS.md para entender como a documentacao funciona.",
      "Leia docs/02-DESIGN-SYSTEM.md para conhecer os tokens visuais (cores, fontes, espacamento).",
      "Revise docs/05-ARCHITECTURE-DECISIONS.md para entender as decisoes ja tomadas e as hipoteses ativas.",
    ],
  },
  {
    number: "02",
    title: "Configure AGENTS.md e CLAUDE.md",
    description: "Contexto na raiz antes de pedir codigo (portatil + Claude Code)",
    details: [
      "Na raiz: AGENTS.md (Codex, Cursor, etc.) e CLAUDE.md (Claude Code) — gemeos; mantenha ambos alinhados.",
      "Indice curto: stack, convencoes, links para docs/. Detalhes por ferramenta: docs/08-AI-TOOL-CONFIG.md (.claude/skills, .cursor/rules, ...).",
      "Só o app React: use app/CLAUDE.md, que aponta para a raiz.",
    ],
  },
  {
    number: "03",
    title: "Skill ou interface?",
    description: "Antes de UI: sera que o problema e playbook para agente, nao tela?",
    details: [
      "Leia docs/00-DOC-STANDARDS.md — secao Skill versus interface (produto).",
      "Se o valor e repetibilidade para IA (criterios, checklist, governanca), prefira docs/guides/ e templates antes de crescer o app/.",
      "Se usuario final precisa do navegador, multiusuario, permissoes ou self-service sem chat, interface em app/ faz sentido — e registre a escolha em ADR se nao for obvia.",
    ],
  },
  {
    number: "04",
    title: "Escreva a spec antes do codigo",
    description: "PRD e user stories primeiro, implementacao depois",
    details: [
      "Crie o PRD em docs/prd/ — defina O QUE construir, PARA QUEM e POR QUE.",
      "Escreva user stories com criterios de aceitacao em docs/specs/.",
      "Registre decisoes tecnicas como ADRs em docs/05-ARCHITECTURE-DECISIONS.md.",
    ],
  },
  {
    number: "05",
    title: "Comece a codar",
    description: "Agora sim, com contexto claro, peca codigo ao agente",
    details: [
      "Use o Cursor para gerar e editar codigo. Os prompts serao muito melhores com docs/ preenchidos.",
      "Dados iniciais ficam em src/data/ como JSON/TypeScript. Migre para Supabase quando tiver credenciais.",
      "Componentes ficam em src/components/. Use shadcn/ui como base e customize conforme o design system.",
    ],
  },
  {
    number: "06",
    title: "Registre o que aprendeu",
    description: "Decisoes, hipoteses e vocabulario voltam para os docs",
    details: [
      "Decisao importante? Crie uma ADR com status ATIVA.",
      "Aposta nao validada? Adicione ao Hypothesis Tracker.",
      "Termo novo no projeto? Adicione ao docs/03-VOCABULARY.md com 'Nao confundir com'.",
    ],
  },
];

export const directoryStructure: DirectoryItem[] = [
  { path: "AGENTS.md + CLAUDE.md", description: "Instrucoes para agentes na raiz (gemeos); mapa em docs/08", badge: "contexto-ia" },
  { path: ".claude/ .cursor/ .agents/", description: "Skills e regras nativas das ferramentas (ver docs/08)", badge: "contexto-ia" },
  { path: "app/", description: "Codigo-fonte da aplicacao React + Vite + shadcn/ui", badge: "codigo" },
  { path: "docs/", description: "Documentacao permanente — a memoria do projeto", badge: "conhecimento" },
  { path: "docs/00 a 08", description: "Standards, IA, design system, vocabulario, dados, ADRs, skills, agent-first, tool config", badge: "fundamentos" },
  { path: "docs/guides/", description: "Skills e instrucoes operacionais reutilizaveis", badge: "como fazer" },
  { path: "docs/references/", description: "Exemplos concretos e materiais de referencia", badge: "exemplos" },
  { path: "docs/templates/", description: "Templates em branco e prompts prontos para usar", badge: "templates" },
  { path: "plans/", description: "Planejamento de sprints e tracking de trabalho", badge: "operacao" },
  { path: "scripts/", description: "Automacoes: setup, seed data, deploy", badge: "automacao" },
  { path: "temp/", description: "Lixo controlado — arquivos temporarios, git-ignored", badge: "descarte" },
];

export const toolRoles: ToolRole[] = [
  {
    name: "Cursor",
    role: "Execucao",
    when: "O problema esta definido e precisa virar codigo",
    examples: [
      "Crie a estrutura inicial do app",
      "Adicione autenticacao com Supabase",
      "Gere CRUD completo da entidade tasks",
      "Refatore isso para componentes menores",
    ],
  },
  {
    name: "ChatGPT",
    role: "Estruturacao",
    when: "O problema esta mal definido e precisa de clareza",
    examples: [
      "Monte o PRD minimo desse produto",
      "Escreva user stories para o fluxo de login",
      "Compare Supabase vs Firebase para este caso",
      "Transforme essa ideia vaga em backlog",
    ],
  },
  {
    name: "Claude",
    role: "Aprofundamento",
    when: "O problema e grande, confuso ou espalhado em muitos arquivos",
    examples: [
      "Revise se a modelagem de dados esta correta",
      "Analise a arquitetura e proponha melhorias",
      "Interprete esse spec de 40 paginas",
      "Crie a skill de identidade visual",
    ],
  },
];

export const faq: FaqItem[] = [
  {
    question: "Quais skills ja existem no projeto?",
    answer: "Em .claude/skills/: sabatina-prd (perguntas antes de executar + PRD com decisao skill vs interface), onboarding-vibe-coding (como comecar), organizar-temp-repositorio (mover .md descartavel para temp/). Invocacao depende da ferramenta (ex. /nome no chat). Ver .claude/skills/README.md e docs/08-AI-TOOL-CONFIG.md.",
  },
  {
    question: "Quando faco uma skill e quando faco uma tela no app?",
    answer: "Skill = playbook para o agente (equipe), em docs/guides/: passos, criterios, exemplos — quando quem executa e o fluxo de IA e o problema nao exige cliente no browser. Interface = app/ quando ha usuario final, self-service, multiusuario ou permissoes. Antes de codar UI, leia docs/00-DOC-STANDARDS.md (Skill versus interface). Se a divida persistir, registre em ADR.",
  },
  {
    question: "Por que tantos docs antes de codar?",
    answer: "Docs alimentam prompts. Sem contexto, a IA gera codigo generico. Com PRD + spec + design system + ADRs, a IA gera codigo que respeita suas decisoes, usa seus tokens visuais e segue suas convencoes. O investimento em docs se paga na primeira hora de coding.",
  },
  {
    question: "Posso pular os docs e ir direto pro codigo?",
    answer: "Pode, mas vai gastar mais tempo corrigindo do que economizou pulando. A regra e: dia 1, 80% docs e 20% codigo. Isso inverte nos dias seguintes.",
  },
  {
    question: "O que e a pasta temp/?",
    answer: "Lixo controlado. A IA gera muitos arquivos temporarios (dumps, rascunhos, JSONs de teste). Em vez de poluir o projeto, jogue tudo em temp/ — ela e git-ignored e pode ser limpa a qualquer momento.",
  },
  {
    question: "Quando migrar de JSON local para Supabase?",
    answer: "Quando precisar de: persistencia entre sessoes (dados nao perdem ao recarregar), compartilhamento entre usuarios, controle de acesso (RLS), ou operacoes em tempo real. O CLAUDE.md do app tem o passo a passo de migracao.",
  },
  {
    question: "O que e uma ADR e quando criar?",
    answer: "ADR = Architecture Decision Record. Crie quando tomar uma decisao tecnica que afeta o projeto (escolha de stack, biblioteca, padrao). Formato: Status + Decisao + Contexto + Consequencia. Nunca delete ADRs — se mudar de ideia, crie uma nova que referencia a anterior.",
  },
  {
    question: "Como funciona a skill de identidade visual?",
    answer: "Voce reune materiais da marca (brandbook, cores HEX, fontes), usa um prompt estruturado no Claude para gerar um SKILL.md, empacota como .skill e instala no Claude.ai. A partir dai, toda vez que pedir um artefato visual, a IA aplica automaticamente a identidade da empresa. Veja docs/guides/SKILL-CREATION-GUIDE.md.",
  },
  {
    question: "O que fazer quando a IA gera codigo ruim?",
    answer: "Nao tente com mais forca — melhore o ambiente. Pergunte: 'qual contexto esta faltando?'. Atualize o CLAUDE.md, escreva uma spec mais detalhada, adicione exemplos. Agentes replicam padroes do repo: se o repo tem codigo ruim, a IA vai gerar mais codigo ruim.",
  },
];

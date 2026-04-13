# Vibe Coding Training — Vocabulario
**Status:** v1
**Ultima Atualizacao:** 2026-04-11

---

## Termos Fundamentais

| Termo | Definicao | Substitui | Nao confundir com |
|-------|-----------|-----------|-------------------|
| **Vibe Coding** | Metodologia de desenvolvimento que utiliza IA como copiloto no processo de codificacao. O programador define a direcao e a IA ajuda a executar. Diferente de "no-code" porque o desenvolvedor entende e controla o codigo. | "Programacao com IA", "AI-assisted coding" | **No-code/Low-code** — plataformas visuais sem codigo real. Vibe coding envolve codigo real, apenas assistido. |
| **Prompt** | Instrucao ou pergunta enviada para uma IA. A qualidade do prompt determina a qualidade da resposta. Pode ser simples (uma frase) ou estruturado (com contexto, exemplos e restricoes). | "Pergunta", "comando" | **Prompt de sistema** — instrucao fixa que configura o comportamento da IA. Um prompt de usuario e o que voce digita; um prompt de sistema e o que o desenvolvedor configura por tras. |
| **Token** | Unidade de texto processada por uma IA. Aproximadamente 4 caracteres em ingles, 2-3 em portugues. Relevante para entender limites de contexto e custos. | — | **Design Token** — variavel de design (cor, fonte, espacamento). Apesar do mesmo nome, nao tem relacao com tokens de IA. |
| **Contexto** | Informacao disponivel para a IA durante uma conversa ou sessao. Inclui o prompt atual, historico da conversa e arquivos referenciados. Limitado pela "janela de contexto" do modelo. | — | **Context API (React)** — mecanismo de compartilhamento de estado entre componentes. Mesmo nome, dominio completamente diferente. |
| **Agente** | IA configurada com instrucoes especificas, ferramentas e acesso a arquivos para executar tarefas autonomamente dentro de um escopo definido. | "Bot", "assistente" | **Chatbot** — responde perguntas mas nao executa acoes. Agentes leem arquivos, editam codigo e rodam comandos. |
| **Skill** | Instrucao operacional reutilizavel empacotada como arquivo `.skill` ou markdown. Instalada na IA para ser ativada automaticamente por palavras-gatilho. Ex: skill de identidade visual, skill de CRUD. | "Template de prompt", "instrucao padrao" | **Plugin/Extensao** — codigo que estende funcionalidade de software. Skill e apenas texto instrucional, nao codigo executavel. |

---

## Termos de Ferramentas

| Termo | Definicao | Substitui | Nao confundir com |
|-------|-----------|-----------|-------------------|
| **Cursor** | IDE baseada no VS Code com IA integrada. No setup de vibe coding, e a ferramenta de execucao — onde o codigo e escrito e modificado com assistencia de IA. | "VS Code com Copilot" | **VS Code** — editor sem IA nativa. Cursor e um fork do VS Code com agente integrado. |
| **ChatGPT** | Assistente de IA da OpenAI. No setup de vibe coding, e usado para estruturacao de produto: PRDs, historias de usuario, planejamento, brainstorming. | — | — |
| **Claude** | Assistente de IA da Anthropic. No setup de vibe coding, e usado para analise profunda, revisao de arquitetura e criacao de documentacao tecnica detalhada. | — | **CLAUDE.md** — arquivo de contexto, nao a IA em si. |
| **CLAUDE.md** | Arquivo de contexto na raiz do projeto (~100 linhas). Funciona como indice para o Claude, apontando para documentacao relevante. Segue o principio de progressive disclosure. | "Arquivo de configuracao de IA" | **README.md** — para humanos. CLAUDE.md e para agentes de IA. |
| **AGENTS.md** | Similar ao CLAUDE.md mas agnosto de ferramenta. Ponto de entrada para qualquer agente de IA acessar o conhecimento do repositorio. | — | — |
| **Supabase** | Plataforma de backend-as-a-service baseada no PostgreSQL. Usada no treinamento como banco de dados de ensino para demonstrar CRUD, autenticacao e RLS. | "Firebase", "backend" | **Firebase** — plataforma similar do Google, mas NoSQL. Supabase e relacional (PostgreSQL). |
| **shadcn/ui** | Biblioteca de componentes React acessiveis. Componentes sao copiados para o projeto (nao instalados como dependencia npm), permitindo customizacao total. | "Component library", "UI kit" | **Radix UI** — primitivas de acessibilidade usadas internamente pelo shadcn/ui. Radix e a base; shadcn e a camada estilizada. |

---

## Termos de Arquitetura e Desenvolvimento

| Termo | Definicao | Substitui | Nao confundir com |
|-------|-----------|-----------|-------------------|
| **PRD** | Product Requirements Document. Documento que define o que sera construido, para quem e por que. No vibe coding, geralmente gerado com ChatGPT e refinado iterativamente. | "Escopo", "briefing" | **Spec (Design Spec)** — detalha COMO uma feature funciona. PRD define O QUE e POR QUE. |
| **ADR** | Architecture Decision Record. Registro de uma decisao tecnica com quatro campos: Status, Decisao, Contexto e Consequencia. Nunca e deletado; se a decisao muda, um novo ADR e criado. | "Ata de decisao", "justificativa tecnica" | **Hipotese** — aposta nao validada. ADR e uma decisao tomada; hipotese e algo que acreditamos mas ainda nao confirmamos. |
| **Design System** | Conjunto de tokens (cores, tipografia, espacamento), componentes e padroes que garantem consistencia visual. Definido como JSON tokens e implementado via Tailwind CSS + shadcn/ui. | "Guia de estilo", "UI guidelines" | — |
| **Design Tokens** | Valores atomicos do design system (cores HEX, tamanhos de fonte, espacamentos). Exportados como CSS custom properties. Fonte de verdade para toda decisao visual. | "Variaveis de estilo" | **Tokens de IA** — unidades de processamento de linguagem. Contexto totalmente diferente. |
| **CRUD** | Create, Read, Update, Delete. As quatro operacoes basicas de dados. Padrao fundamental ensinado no treinamento para interacao com banco de dados. | "Operacoes de banco" | — |
| **RLS** | Row Level Security. Funcionalidade do PostgreSQL/Supabase que restringe acesso a linhas de uma tabela com base em politicas. Ex: `user_id = auth.uid()` garante que cada usuario so ve seus proprios dados. | "Permissoes de linha", "filtro de acesso" | **Auth (Autenticacao)** — verifica QUEM voce e. RLS controla O QUE voce pode ver. Sao complementares, nao a mesma coisa. |
| **Edge Function** | Funcao serverless executada proximo ao usuario. No Supabase, usada para operacoes criticas que nao devem rodar no client (ex: validacoes sensiveis, integracao com APIs externas). | "Cloud function", "lambda" | — |
| **Two-Tier Pattern** | Padrao de dados com duas camadas: Tier 1 (resumo leve para listas) e Tier 2 (detalhe completo para paginas individuais). Otimiza performance de carregamento. | "Padrao lista-detalhe" | — |

---

## Termos de Programacao (Fundamentos)

| Termo | Definicao | Substitui | Nao confundir com |
|-------|-----------|-----------|-------------------|
| **Variavel** | Espaco nomeado na memoria que armazena um valor. Em TypeScript, declarada com `const` (imutavel), `let` (mutavel) ou `var` (legado, evitar). | — | — |
| **Tipo** | Classificacao de um valor: `string`, `number`, `boolean`, `object`, `array`, etc. TypeScript adiciona tipagem estatica ao JavaScript. | — | — |
| **Funcao** | Bloco de codigo reutilizavel que recebe parametros e retorna um resultado. Em React, componentes sao funcoes que retornam JSX. | — | **Metodo** — funcao associada a um objeto ou classe. No React funcional, usamos funcoes puras, nao metodos. |
| **Array** | Colecao ordenada de valores acessados por indice. Em TypeScript: `string[]` ou `Array<string>`. | "Lista", "vetor" | **Objeto** — colecao de pares chave-valor (nao ordenada por indice). |
| **Interface** | Contrato que define a forma de um objeto em TypeScript. Usado para tipar props de componentes, respostas de API e modelos de dados. | "Tipo de objeto" | **Type** — similar a interface em TS, mas com sintaxe diferente. Neste projeto preferimos `interface` para objetos e `type` para uniones/intersecoes. |
| **Componente** | Funcao React que retorna JSX. Unidade basica de UI. Recebe `props` e pode manter estado interno com `useState`. | "Widget", "bloco de interface" | — |
| **Hook** | Funcao especial do React (prefixo `use`) que permite usar estado, efeitos colaterais e contexto em componentes funcionais. Ex: `useState`, `useEffect`. | — | — |
| **Hardcode** | Valor fixo escrito diretamente no codigo, sem configuracao externa. Util para prototipacao rapida; deve ser migrado para constantes ou banco de dados quando o projeto amadurece. | "Valor fixo", "chumbar" | **Constante** — valor fixo mas nomeado e reutilizavel (`const API_URL = ...`). Hardcode e o valor embutido inline sem nome. |

---

## Termos de Git e Versionamento

| Termo | Definicao | Substitui | Nao confundir com |
|-------|-----------|-----------|-------------------|
| **Repositorio (Repo)** | Diretorio que contem o projeto e todo seu historico de versoes. Inicializado com `git init`. | "Pasta do projeto" | — |
| **Commit** | Checkpoint logico no historico do projeto. Cada commit tem uma mensagem descritiva e registra exatamente o que mudou. Commits devem ser atomicos (uma mudanca logica por commit). | "Salvar", "versao" | **Push** — commit salva localmente; push envia para o remoto. Sao passos separados. |
| **Branch** | Linha independente de desenvolvimento. Usada para novas features ou experimentos sem afetar o codigo principal. A branch principal e geralmente `main`. | "Ramificacao" | **Fork** — copia de um repositorio inteiro (para contribuicao open-source). Branch e dentro do mesmo repo. |
| **Pull** | Baixar mudancas do repositorio remoto para o local. `git pull` combina `fetch` + `merge`. | "Baixar atualizacoes" | **Pull Request** — apesar do nome similar, e uma solicitacao de merge, nao um pull. |
| **Push** | Enviar commits locais para o repositorio remoto. `git push` sincroniza o historico local com o servidor. | "Subir codigo" | — |
| **Merge** | Combinar mudancas de uma branch em outra. Pode gerar conflitos se as mesmas linhas foram alteradas. | "Juntar", "mesclar" | **Rebase** — alternativa ao merge que reescreve historico. Mais limpo mas mais perigoso para iniciantes. |
| **PR (Pull Request)** | Solicitacao para mesclar uma branch em outra, com revisao de codigo. No agent-first development, PRs devem ser curtas e frequentes. | "Merge request" | — |

---

## Termos Descartados

| Termo | Motivo |
|-------|--------|
| **No-code** | Confunde com vibe coding. Vibe coding envolve codigo real, apenas assistido por IA. |
| **Low-code** | Mesmo problema — implica plataformas visuais de arrastar-e-soltar. |
| **Copilot** | Generico demais. Usamos os nomes especificos: Cursor, ChatGPT, Claude. |
| **Template** | Ambiguo (template de codigo? de prompt? de documento?). Usamos "Skill" para instrucoes de IA e "boilerplate" para codigo base. |

---

## Vocabulario de Status

| Status | Significado | Cor |
|--------|-------------|-----|
| **bloqueado** | Modulo/licao ainda nao acessivel (pre-requisito nao cumprido) | `--muted` (cinza) |
| **nao-iniciada** | Licao disponivel mas ainda nao acessada | `--muted-foreground` (cinza escuro) |
| **em-progresso** | Modulo/licao iniciado mas nao concluido | `--primary` (roxo) |
| **completo** | Modulo/licao finalizado com sucesso | `--accent` (verde) |
| **pendente** | Exercicio disponivel mas nao realizado | `--muted-foreground` (cinza escuro) |

---

## Vocabulario de UI

| Termo | Significado nesta UI |
|-------|---------------------|
| **Dashboard** | Tela inicial com visao geral do progresso do aluno e cards de modulos |
| **Sidebar** | Painel de navegacao lateral fixo com arvore de modulos e licoes |
| **Card de Modulo** | Componente visual que representa um modulo com icone, titulo, descricao e progresso |
| **Barra de Progresso** | Indicador visual do percentual de conclusao de um modulo ou do treinamento total |
| **Code Block** | Area de codigo com syntax highlighting, botao de copiar e indicador de linguagem |
| **Aba** | Secao dentro de uma licao (Teoria, Exemplo, Exercicio) navegavel por tabs |
| **Glossario** | Secao transversal com todos os termos tecnicos do treinamento, pesquisavel |
| **Toggle de Tema** | Botao que alterna entre modo claro e escuro |

---

<!--
  Mantenha este arquivo atualizado conforme o projeto evolui.
  Quando um termo muda de significado ou e substituido, mova o antigo para Termos Descartados.
  Consistencia aqui previne confusao em docs, codigo e conversas.
-->

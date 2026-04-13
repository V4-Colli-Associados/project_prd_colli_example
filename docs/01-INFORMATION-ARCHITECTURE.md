# Vibe Coding Training — Arquitetura de Informacao
**Status:** v1
**Ultima Atualizacao:** 2026-04-11

---

## Filosofia de Design

A arquitetura de informacao segue um modelo **centrado em modulos de aprendizado**. O usuario progride linearmente pelos modulos, mas pode navegar livremente entre licoes ja desbloqueadas.

Principios:
- **Progressao linear com liberdade de navegacao** — os modulos sao sequenciais, mas o aluno pode revisitar qualquer conteudo anterior
- **Aprender fazendo** — cada licao termina com um exercicio pratico; a teoria serve ao pratico
- **IA como copiloto** — o treinamento ensina a usar Cursor, ChatGPT e Claude como ferramentas integradas ao fluxo de trabalho
- **Contexto sempre visivel** — o aluno sempre sabe onde esta na jornada (modulo atual, progresso geral)

Modelo mental: o usuario e um **aprendiz de vibe coding** que precisa construir um projeto real do zero usando IA como assistente.

---

## Estrutura de Navegacao

```
┌─────────────────────────────┐
│  Vibe Coding Training       │
│  ─────────────────────────  │
│                             │
│  🏠  Inicio                 │
│                             │
│  📦  Modulo 1: Fundamentos  │
│     Licao 1.1               │
│     Licao 1.2               │
│     Licao 1.3               │
│                             │
│  📦  Modulo 2: Setup        │
│     Licao 2.1               │
│     Licao 2.2               │
│                             │
│  📦  Modulo 3: Frontend     │
│     Licao 3.1               │
│     Licao 3.2               │
│     Licao 3.3               │
│                             │
│  📦  Modulo 4: Backend      │
│     Licao 4.1               │
│     Licao 4.2               │
│                             │
│  📦  Modulo 5: Deploy       │
│     Licao 5.1               │
│     Licao 5.2               │
│                             │
│  ─────────────────────────  │
│  📖  Glossario              │
│  ⚙️  Configuracoes          │
└─────────────────────────────┘
```

Regra: **Substantivos na sidebar. Verbos dentro da entidade.**

- A sidebar e fixa no desktop (240px de largura) e colapsavel no mobile (hamburger menu)
- O modulo ativo fica expandido mostrando suas licoes; os demais ficam colapsados
- Licoes completas recebem um checkmark verde; a licao atual recebe destaque de cor primaria
- Licoes futuras (nao desbloqueadas) ficam com opacidade reduzida mas ainda clicaveis (para permitir exploracao)
- O glossario e as configuracoes ficam separados no rodape da sidebar

---

## Estrutura de Rotas

```
/                                 → Dashboard com visao geral do progresso
/modulos                          → Lista de todos os modulos (cards com progresso)
/modulos/:moduloId                → Visao geral do modulo (descricao + lista de licoes)
/modulos/:moduloId/:licaoId       → Conteudo da licao (teoria + exercicio)
/modulos/:moduloId/:licaoId/exercicio → Exercicio interativo da licao
/glossario                        → Glossario completo de termos
/configuracoes                    → Preferencias do usuario (tema, progresso)
```

---

## Hierarquia de Entidades

```
Treinamento (Vibe Coding Training)
│
├── Modulo (ex: "Fundamentos de Programacao")
│   ├── titulo: string
│   ├── descricao: string
│   ├── ordem: number
│   ├── icone: string
│   └── status: "bloqueado" | "em-progresso" | "completo"
│
│   ├── Licao (ex: "Variaveis e Tipos")
│   │   ├── titulo: string
│   │   ├── conteudo: markdown
│   │   ├── ordem: number
│   │   ├── duracaoEstimada: string
│   │   └── status: "nao-iniciada" | "em-progresso" | "completa"
│   │
│   │   └── Exercicio (ex: "Crie uma variavel e exiba no console")
│   │       ├── titulo: string
│   │       ├── instrucoes: markdown
│   │       ├── tipo: "codigo" | "quiz" | "projeto"
│   │       ├── dificuldade: "iniciante" | "intermediario" | "avancado"
│   │       └── status: "pendente" | "completo"
│   │
│   └── Projeto Pratico (opcional, ao final do modulo)
│       ├── titulo: string
│       ├── descricao: markdown
│       └── criteriosAceitacao: string[]
│
└── Glossario (transversal a todos os modulos)
    ├── termo: string
    ├── definicao: string
    └── modulosRelacionados: string[]
```

---

## Visao de Detalhe — Estrutura de Licao

```
┌──────────────────────────────────────────────────────┐
│  ← Modulo: Fundamentos    "Variaveis e Tipos"       │
│                                                      │
│  ┌──────────┬──────────┬──────────┐                  │
│  │  Teoria  │ Exemplo  │Exercicio │                  │
│  └──────────┴──────────┴──────────┘                  │
│                                                      │
│  [Conteudo da aba selecionada]                       │
│                                                      │
│  ┌───────────────────────────────────────────┐       │
│  │  Progresso: 2/5 licoes completas          │       │
│  │  [■■□□□]                                  │       │
│  └───────────────────────────────────────────┘       │
│                                                      │
│         [← Licao Anterior]  [Proxima Licao →]        │
└──────────────────────────────────────────────────────┘
```

| Aba | Proposito | Quando Visivel |
|-----|-----------|----------------|
| Teoria | Conteudo explicativo com exemplos de codigo | Sempre |
| Exemplo | Codigo de exemplo completo e funcional | Sempre |
| Exercicio | Exercicio pratico para o aluno resolver | Sempre |

---

## Fluxo de Criacao / Progressao

O treinamento nao possui criacao de entidades pelo usuario. A progressao acontece assim:

```
1. Aluno acessa o dashboard (/)
2. Seleciona um modulo na sidebar ou nos cards
3. Navega para a primeira licao nao completa
4. Le a teoria, estuda o exemplo
5. Realiza o exercicio
6. Marca como completo (ou completa automaticamente via quiz/validacao)
7. Avanca para a proxima licao
8. Ao completar todas as licoes, o modulo e marcado como completo
```

Todos os caminhos levam de volta ao dashboard com o progresso atualizado.

---

## Design das Paginas

### Dashboard (/)
- Layout em grid com cards de modulos
- Cada card mostra: icone, titulo, descricao curta, barra de progresso
- Card do modulo atual em destaque (borda primaria)
- Secao "Continue de onde parou" no topo com link direto para a ultima licao

### Pagina do Modulo (/modulos/:id)
- Header com titulo, descricao completa e icone do modulo
- Lista de licoes em cards verticais com status visual
- Botao "Iniciar" ou "Continuar" no topo

### Pagina da Licao (/modulos/:id/:licaoId)
- Conteudo em markdown renderizado com syntax highlighting para blocos de codigo
- Navegacao entre abas (Teoria / Exemplo / Exercicio)
- Navegacao sequencial no rodape (anterior/proximo)
- Barra de progresso do modulo

### Glossario (/glossario)
- Lista alfabetica de termos com busca
- Cada termo mostra definicao e modulos relacionados
- Clique no modulo relacionado leva a pagina do modulo

---

## Interacoes-Chave

- **Navegacao por teclado**: setas esquerda/direita para navegar entre licoes
- **Busca**: campo de busca no topo da sidebar para encontrar licoes e termos
- **Tema**: toggle dark/light mode nas configuracoes
- **Progresso persistente**: salvo em localStorage (sem necessidade de backend para o treinamento em si)
- **Responsividade**: sidebar colapsa em telas menores; conteudo ocupa largura total
- **Syntax highlighting**: blocos de codigo com destaque de sintaxe para TypeScript, JSX, SQL, JSON e bash

---

## Inventario de Telas

| Tela | Rota | Descricao |
|------|------|-----------|
| Dashboard | `/` | Visao geral com progresso e cards de modulos |
| Lista de Modulos | `/modulos` | Grid com todos os modulos e status |
| Detalhe do Modulo | `/modulos/:id` | Descricao do modulo + lista de licoes |
| Licao | `/modulos/:id/:licaoId` | Conteudo da licao com abas |
| Exercicio | `/modulos/:id/:licaoId/exercicio` | Exercicio interativo |
| Glossario | `/glossario` | Lista de termos com busca |
| Configuracoes | `/configuracoes` | Preferencias do usuario |

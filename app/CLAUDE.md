# Vibe Coding — Guia de Uso (Shell App)

## O que e este projeto
Pagina interativa de guia de uso da metodologia vibe coding e da estrutura do diretorio _new-project. Serve como ponto de entrada para quem recebe o diretorio.

## Stack
- React 19 + Vite + TypeScript
- shadcn/ui (componentes em src/components/ui/)
- Tailwind CSS v4
- Geist font

## Estrutura
- `src/data/guide.ts` — todo o conteudo da pagina (steps, estrutura, tools, FAQ)
- `src/App.tsx` — layout da pagina com secoes
- `src/components/ui/` — componentes shadcn

## Convencoes
- TypeScript strict, sem `any`
- Conteudo separado da apresentacao (dados em data/, UI em App.tsx)
- Componentes shadcn nao editados diretamente

## Documentacao
Leia `../docs/` para contexto completo do projeto:
- `00-DOC-STANDARDS.md` — padroes de documentacao
- `02-DESIGN-SYSTEM.md` — tokens e componentes
- `05-ARCHITECTURE-DECISIONS.md` — decisoes e hipoteses
- `guides/SKILL-CREATION-GUIDE.md` — como criar skills de IA

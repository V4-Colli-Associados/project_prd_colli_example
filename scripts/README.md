# Scripts de Automacao
**Proposito**: Diretorio para scripts de automacao, setup e utilitarios do projeto
**Ultima Atualizacao:** 2026-04-11

> **Documentos relacionados:**
> - `docs/00-DOC-STANDARDS.md` — Padroes de documentacao do projeto

---

## Sobre Este Diretorio

Este diretorio contem scripts de automacao para o projeto. Adicione aqui:

- **Scripts de setup** — configuracao de ambiente local, instalacao de dependencias
- **Geradores de dados** — seed data para banco de dados, fixtures para testes
- **Helpers de deploy** — scripts de build, deploy e release
- **Utilitarios** — scripts auxiliares para tarefas repetitivas do dia a dia

> **Nota**: este diretorio ainda nao contem scripts. Adicione-os conforme a necessidade do projeto.

---

## Convencoes

### Nomeacao

- Use `kebab-case` para nomes de arquivos: `setup-local.sh`, `seed-database.ts`
- Prefixe com a categoria quando houver muitos scripts: `setup-`, `seed-`, `deploy-`

### Documentacao

Todo script deve incluir no inicio do arquivo:

1. **Descricao** — o que o script faz (1-2 linhas)
2. **Uso** — comando para executar com exemplos
3. **Pre-requisitos** — dependencias necessarias

Exemplo:

```bash
#!/bin/bash
# Descricao: Configura o ambiente local de desenvolvimento
# Uso: ./scripts/setup-local.sh
# Pre-requisitos: Node.js >= 18, pnpm
```

### Permissoes

Scripts shell (`.sh`) devem ter permissao de execucao:

```bash
chmod +x scripts/nome-do-script.sh
```

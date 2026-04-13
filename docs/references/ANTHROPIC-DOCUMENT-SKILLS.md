# Skills de documento (Anthropic) — copiadas no repo (vendor)

**Origem:** [github.com/anthropics/skills](https://github.com/anthropics/skills) (pastas `skills/docx`, `skills/pptx`, `skills/xlsx`, `skills/pdf`).

**Onde estao no projeto:** copias identicas em `.claude/skills/`, `.cursor/skills/`, `.agents/skills/`, `.codex/skills/` (apos `bash scripts/sync-skills.sh`).

**Licenca:** cada `SKILL.md` declara `license: Proprietary` e remete a termos da Anthropic. Uso sujeito a esses termos; nao substitui a leitura do repositorio oficial.

**Atualizar:** para trazer versao nova do upstream, copiar as pastas do clone de `anthropics/skills` para **`.claude/skills/`** e rodar **`bash scripts/sync-skills.sh`** (espelha para `.cursor`, `.agents`, `.codex`). Ver `scripts/sync-skills.sh --help`.

**Dependencias de sistema (resumo):** as skills assumem ferramentas como **Python 3**, **pandoc**, **LibreOffice** (`soffice`) em alguns fluxos, e pacotes Python citados em cada `SKILL.md` (ex. `markitdown` para `.pptx`). Instale conforme a secao "Quick Reference" de cada skill.

**Relatorio em HTML vs `.pptx`:** a skill **propria** `relatorio-deck-html` gera um deck em **HTML** (JSON + `fill-deck.mjs`, sem Office). Para ficheiro **PowerPoint nativo**, use a skill **`pptx`** acima; o `SKILL.md` de `relatorio-deck-html` descreve o fluxo combinado (HTML rapido no repo, `.pptx` quando o cliente exige).

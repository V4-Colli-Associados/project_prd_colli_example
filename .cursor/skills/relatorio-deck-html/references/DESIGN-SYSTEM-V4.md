# Design system — V4 Colli (deck HTML)

**Identidade:** fundo **preto** / cinza muito escuro, acentos **vermelho** (`#dc2626`, `#ef4444`), texto claro em slides escuros; slides **claros** alternados com fundo cinza-neve e texto preto.

**Logo:** ficheiro `app/public/logov4.webp`, em cada slide via `%%LOGO_SRC%%` (substituido pelo `fill-deck.mjs`) ou, se o template for aberto sem fill, por script que resolve `../../../../app/public/logov4.webp` com `new URL(..., location.href)` (evita `%%LOGO_SRC%%` invalido e `net::ERR_FILE_NOT_FOUND`).

Quatro niveis acima a partir de `relatorio-deck-html/assets/` ou `dist/` ate a raiz do repo, depois `app/public/logov4.webp`.

Para servir o deck noutro URL, sobrescreva `LOGO_SRC` no JSON (URL absoluto ou caminho relativo correcto).

**Nota sobre o PPTX “Creamy”:** a extracao automatica por cores medias dos `blipFill` nao reflecte a marca V4; este template segue **preto + vermelho** conforme pedido.

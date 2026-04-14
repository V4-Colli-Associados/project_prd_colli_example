#!/usr/bin/env python3
"""
deck-to-pptx.py — Pipeline server-side: JSON → .pptx V4 Colli

Uso:
    python deck-to-pptx.py <caminho/para/arquivo.json> [--out pasta/saida]

O script lê o mesmo JSON consumido por fill-deck.mjs e produz um
arquivo .pptx editável usando python-pptx, com paridade visual ao HTML.

Dependências:
    pip install python-pptx Pillow

Slides gerados (ordem idêntica ao deck-base.html):
    1.  Abertura (title)
    2.  Impacto em destaque
    3.  Problema & objetivo       [light]
    4.  Usuário & decisão
    5.  Escopo & fora de escopo
    6.  Requisitos & critérios    [light]
    7.  Por que agora
    8.  Solução em pilares
    9.  Antes & depois            [light]
    10. Stack & tecnologia
    11. Métricas & KPIs
    12. Pessoas & stakeholders    [light]
    13. Riscos & próximos passos
    14. Fechamento (CTA)
    15. Proposta comercial        [light]
    16. Cenário de receita / chart
    17. Livre 1
    18. Livre 2
"""

import sys
import json
import argparse
import shutil
import tempfile
from pathlib import Path
from typing import Optional

# Adiciona o diretório do script ao path para importar módulos locais
_HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(_HERE))

from pptx import Presentation
from pptx.util import Inches

import design_tokens as T
import slide_renderers as R


# ---------------------------------------------------------------------------
# Conversão de logo WebP → PNG (Pillow)
# ---------------------------------------------------------------------------

def _convert_logo(logo_src: Optional[str], tmp_dir: Path) -> Optional[str]:
    """
    Converte logov4.webp para PNG temporário.
    python-pptx não embute WebP de forma confiável.
    """
    if not logo_src:
        return None
    p = Path(logo_src)
    if not p.exists():
        return None
    if p.suffix.lower() == '.png':
        return str(p)
    try:
        from PIL import Image
        out = tmp_dir / "logo_v4.png"
        with Image.open(p) as img:
            img.save(str(out), "PNG")
        return str(out)
    except Exception as e:
        print(f"[AVISO] Falha ao converter logo: {e}")
        return None


# ---------------------------------------------------------------------------
# Rasterização SVG do chart (via cairosvg ou svg2png com Pillow fallback)
# ---------------------------------------------------------------------------

def _rasterize_chart_svg(svg_html: str, tmp_dir: Path) -> Optional[str]:
    """
    Tenta converter o SVG do chart para PNG.
    Estratégia:
      1. Pre-load cairo do Homebrew (macOS) para cairocffi funcionar
      2. cairosvg
      3. inkscape via subprocess
      4. Placeholder (None)
    """
    if not svg_html:
        return None
    import re
    match = re.search(r'(<svg[\s\S]*?</svg>)', svg_html, re.I)
    svg_str = match.group(1) if match else svg_html

    out = tmp_dir / "chart.png"

    # 1. Pre-load cairo de paths conhecidos (macOS Homebrew)
    _try_preload_cairo()

    # 2. cairosvg
    try:
        import cairosvg
        cairosvg.svg2png(
            bytestring=svg_str.encode('utf-8'),
            write_to=str(out),
            scale=2.0
        )
        if out.exists():
            return str(out)
    except Exception:
        pass

    # 3. inkscape
    try:
        import subprocess
        svg_path = tmp_dir / "chart.svg"
        svg_path.write_text(svg_str, encoding='utf-8')
        for inkscape_bin in ['inkscape', '/Applications/Inkscape.app/Contents/MacOS/inkscape']:
            result = subprocess.run(
                [inkscape_bin, '--export-type=png',
                 f'--export-filename={out}', '--export-dpi=144', str(svg_path)],
                capture_output=True, timeout=15
            )
            if result.returncode == 0 and out.exists():
                return str(out)
    except Exception:
        pass

    print("[AVISO] Não foi possível rasterizar SVG. O slide de chart usará placeholder.")
    return None


def _try_preload_cairo():
    """
    No macOS com Homebrew, libcairo.2.dylib não está nos caminhos padrão do dyld.
    Estratégia: criar symlink temporário no diretório cairocffi para que ffi.dlopen()
    encontre a biblioteca pelo nome curto 'libcairo.2.dylib'.
    """
    import ctypes, os, site
    # Verifica se já está carregada
    for path in ['/opt/homebrew/lib/libcairo.2.dylib', '/usr/local/lib/libcairo.2.dylib']:
        if os.path.exists(path):
            try:
                ctypes.CDLL(path)
            except Exception:
                continue

            # Tenta criar symlink no diretório de cairocffi
            for sp in site.getsitepackages() + [site.getusersitepackages()]:
                cffi_dir = os.path.join(sp, 'cairocffi')
                if os.path.isdir(cffi_dir):
                    link = os.path.join(cffi_dir, 'libcairo.2.dylib')
                    if not os.path.exists(link):
                        try:
                            os.symlink(path, link)
                        except Exception:
                            pass
            return


# ---------------------------------------------------------------------------
# Resolução do caminho do logo
# ---------------------------------------------------------------------------

def _resolve_logo(json_data: dict, json_path: Path) -> Optional[str]:
    """
    Tenta encontrar o logo V4 a partir do JSON ou caminhos relativos padrão.
    """
    logo_src = json_data.get('replace', {}).get('LOGO_SRC', '')

    # Se o JSON especifica um caminho
    if logo_src and not logo_src.startswith('%%'):
        p = Path(logo_src)
        if not p.is_absolute():
            p = json_path.parent / p
        if p.exists():
            return str(p)

    # Tenta encontrar relativo ao repositório (4 níveis acima de relatorio-deck-html/scripts/)
    candidates = [
        _HERE.parent.parent.parent.parent / 'app' / 'public' / 'logov4.webp',
        _HERE.parent.parent / 'app' / 'public' / 'logov4.webp',
        json_path.parent.parent.parent.parent / 'app' / 'public' / 'logov4.webp',
    ]
    for c in candidates:
        if c.exists():
            return str(c)
    return None


# ---------------------------------------------------------------------------
# Configuração da apresentação
# ---------------------------------------------------------------------------

def _configure_presentation() -> Presentation:
    """Cria Presentation com dimensões 16:9."""
    prs = Presentation()
    prs.slide_width  = T.SLIDE_W
    prs.slide_height = T.SLIDE_H
    return prs


# ---------------------------------------------------------------------------
# Pipeline principal
# ---------------------------------------------------------------------------

def build_pptx(json_path: str, out_dir: Optional[str] = None) -> str:
    """
    Lê JSON e gera .pptx. Retorna o caminho do arquivo gerado.
    """
    json_path = Path(json_path).resolve()
    if not json_path.exists():
        raise FileNotFoundError(f"JSON não encontrado: {json_path}")

    with open(json_path, encoding='utf-8') as f:
        raw = json.load(f)

    # Normaliza: tudo em data['key'] para fácil acesso nos renderers
    replace = raw.get('replace', {})
    _raw = raw.get('raw', {})
    data = dict(replace)
    data['_raw'] = _raw

    # Pasta de saída
    if out_dir:
        out_path = Path(out_dir)
    else:
        out_path = json_path.parent.parent / 'dist'
    out_path.mkdir(parents=True, exist_ok=True)

    # Nome do arquivo de saída
    deck_title = replace.get('DECK_TITLE', json_path.stem)
    safe_name = "".join(
        c if (c.isalnum() or c in '-_') else '_'
        for c in deck_title
    ).rstrip('_')[:60] or 'deck'
    out_file = out_path / f"{safe_name}.pptx"

    # Diretório temporário para assets
    tmp_dir = Path(tempfile.mkdtemp(prefix='deck_pptx_'))
    try:
        # Logo
        logo_raw = _resolve_logo(raw, json_path)
        logo_png = _convert_logo(logo_raw, tmp_dir)
        if logo_png:
            print(f"[OK] Logo: {logo_png}")
        else:
            print("[AVISO] Logo não encontrado — slides serão gerados sem logo.")

        # Chart SVG → PNG
        chart_svg = _raw.get('CHART_SVG_HTML', '')
        chart_png = _rasterize_chart_svg(chart_svg, tmp_dir)

        # Apresentação
        prs = _configure_presentation()

        print("[...] Gerando slides...")

        # 1. Abertura
        R.render_title(prs, data, logo_png)
        print("  [1] Abertura")

        # 2. Impacto
        R.render_impact(prs, data, logo_png)
        print("  [2] Impacto em destaque")

        # 3. Problema & objetivo
        R.render_problem(prs, data, logo_png)
        print("  [3] Problema & objetivo")

        # 4. Usuário & decisão
        R.render_user_decision(prs, data, logo_png)
        print("  [4] Usuário & decisão")

        # 5. Escopo
        R.render_scope(prs, data, logo_png)
        print("  [5] Escopo")

        # 6. Requisitos
        R.render_requirements(prs, data, logo_png)
        print("  [6] Requisitos & critérios")

        # 7. Por que agora
        R.render_why_now(prs, data, logo_png)
        print("  [7] Por que agora")

        # 8. Pilares
        R.render_pillars(prs, data, logo_png)
        print("  [8] Pilares")

        # 9. Antes & depois
        R.render_before_after(prs, data, logo_png)
        print("  [9] Antes & depois")

        # 10. Stack & tech
        R.render_tech(prs, data, logo_png)
        print("  [10] Stack & tecnologia")

        # 11. KPIs
        R.render_kpi(prs, data, logo_png)
        print("  [11] Métricas & KPIs")

        # 12. Stakeholders
        R.render_stakeholders(prs, data, logo_png)
        print("  [12] Stakeholders")

        # 13. Riscos
        R.render_risks(prs, data, logo_png)
        print("  [13] Riscos & próximos passos")

        # 14. CTA
        R.render_cta(prs, data, logo_png)
        print("  [14] Fechamento")

        # 15. Tabela comercial
        R.render_pricing(prs, data, logo_png)
        print("  [15] Proposta comercial")

        # 16. Chart
        R.render_chart(prs, data, logo_png, chart_png=chart_png)
        print("  [16] Cenário de receita")

        # 17. Livre 1
        R.render_free(prs, data, logo_png, slide_num=1)
        print("  [17] Livre 1")

        # 18. Livre 2
        R.render_free(prs, data, logo_png, slide_num=2)
        print("  [18] Livre 2")

        # Salvar
        prs.save(str(out_file))
        print(f"\n[OK] Arquivo gerado: {out_file}")
        return str(out_file)

    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description='Gera .pptx V4 Colli a partir de JSON do relatorio-deck-html.'
    )
    parser.add_argument('json', help='Caminho para o arquivo JSON (replace + raw)')
    parser.add_argument('--out', default=None,
                        help='Pasta de saída (padrão: ../dist relativo ao JSON)')
    args = parser.parse_args()

    try:
        out = build_pptx(args.json, args.out)
        print(f"\nAbra no PowerPoint: {out}")
    except Exception as e:
        print(f"[ERRO] {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()

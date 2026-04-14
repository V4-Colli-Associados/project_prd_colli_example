"""
design_tokens.py — Design system V4 Colli para python-pptx.

Paleta: preto #030303 + vermelho #dc2626, texto claro.
Slides "light": fundo #f4f4f5, texto #0a0a0a.
Fonte: Plus Jakarta Sans (fallback Calibri se não instalada).
Dimensões: 16:9 — 13.33" × 7.5".
"""

from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

# ---------------------------------------------------------------------------
# Slide dimensions (16:9)
# ---------------------------------------------------------------------------
SLIDE_W = Inches(13.33)
SLIDE_H = Inches(7.50)

# Margens internas (equivalente ao padding: 2rem 2.25rem do HTML)
MARGIN_L = Inches(0.50)
MARGIN_T = Inches(0.44)
MARGIN_R = Inches(0.50)
MARGIN_B = Inches(0.55)

# Largura útil e altura útil
CONTENT_W = SLIDE_W - MARGIN_L - MARGIN_R      # ~12.33"
CONTENT_H = SLIDE_H - MARGIN_T - MARGIN_B      # ~6.51"
CONTENT_X = MARGIN_L
CONTENT_Y = MARGIN_T

# ---------------------------------------------------------------------------
# Cores — dark (padrão)
# ---------------------------------------------------------------------------
C_BG_DEEP    = RGBColor(0x03, 0x03, 0x03)   # #030303
C_BG_MID     = RGBColor(0x0A, 0x0A, 0x0A)   # #0a0a0a
C_BG_ELEV    = RGBColor(0x14, 0x14, 0x14)   # #141414
C_TEXT       = RGBColor(0xF5, 0xF5, 0xF5)   # #f5f5f5
C_MUTED      = RGBColor(0xA8, 0xA8, 0xA8)   # #a8a8a8
C_ACCENT     = RGBColor(0xDC, 0x26, 0x26)   # #dc2626
C_ACCENT_BR  = RGBColor(0xEF, 0x44, 0x44)   # #ef4444
C_ACCENT_DK  = RGBColor(0x99, 0x1B, 0x1B)   # #991b1b
C_WARN       = RGBColor(0xF8, 0x71, 0x71)   # #f87171

# Surface / slot fill (dark)
C_SURFACE    = RGBColor(0x1A, 0x1A, 0x1A)   # ~rgba(255,255,255,0.05)
C_SLOT_BG    = RGBColor(0x1C, 0x15, 0x15)   # ~rgba(220,38,38,0.08) sobre #030303
C_SLOT_LINE  = RGBColor(0xDC, 0x26, 0x26)   # border dashed slot

# Pillar / compare fill (dark)
C_PILLAR_BG  = RGBColor(0x18, 0x18, 0x18)   # ~rgba(255,255,255,0.05)
C_COMPARE_BF = RGBColor(0x18, 0x18, 0x18)   # before col
C_COMPARE_AF = RGBColor(0x1C, 0x15, 0x15)   # after col (accent tint)

# Table (dark)
C_TABLE_HEAD = RGBColor(0x45, 0x1A, 0x1A)   # header fill dark
C_TABLE_ROW  = RGBColor(0x1A, 0x1A, 0x1A)   # even row
C_TABLE_LINE = RGBColor(0x5C, 0x1C, 0x1C)   # border

# ---------------------------------------------------------------------------
# Cores — light
# ---------------------------------------------------------------------------
C_LT_BG      = RGBColor(0xFA, 0xFA, 0xFA)   # #fafafa
C_LT_BG2     = RGBColor(0xF4, 0xF4, 0xF5)   # #f4f4f5
C_LT_TEXT    = RGBColor(0x0A, 0x0A, 0x0A)   # #0a0a0a
C_LT_MUTED   = RGBColor(0x52, 0x52, 0x52)   # #525252
C_LT_SLOT    = RGBColor(0xFF, 0xF1, 0xF2)   # slot bg light
C_LT_SLOT_LN = RGBColor(0xDC, 0x26, 0x26)   # border slot light
C_LT_SURF    = RGBColor(0xF0, 0xF0, 0xF0)   # surface light

# Table (light)
C_LT_TH_BG  = RGBColor(0xFE, 0xE2, 0xE2)   # thead bg light
C_LT_TR_BG  = RGBColor(0xFA, 0xFA, 0xFA)   # even row light
C_LT_TBL_LN = RGBColor(0xCC, 0xCC, 0xCC)   # border light

# ---------------------------------------------------------------------------
# Fontes
# ---------------------------------------------------------------------------
FONT_PRIMARY = "Plus Jakarta Sans"
FONT_FALLBACK = "Calibri"

# Tamanhos (equivalentes CSS → pt, escala 16:9 de 960px → 13.33")
# Factor de escala: 13.33" / 960px * 72pt/inch ≈ 1.0pt por "1px lógico"
PT_LABEL      = Pt(7.5)    # slide-label: 0.68rem ≈ 10.9px → ~7pt
PT_H1         = Pt(26)     # h1: 1.7rem ≈ 27px → ~26pt
PT_H2         = Pt(14)     # h2: 1.1rem → ~14pt
PT_BODY       = Pt(10)     # slot body: 0.92rem → ~10pt
PT_SMALL      = Pt(9)      # compact list: 0.88rem → ~9pt
PT_MUTED_CAP  = Pt(8)      # caption muted: 0.72rem → ~8pt
PT_HERO_STAT  = Pt(54)     # hero-stat: clamp(2.5rem..3.4rem) → ~54pt
PT_HERO_LABEL = Pt(11)     # hero-stat-label: 0.95rem → ~11pt
PT_PILLAR_H   = Pt(8)      # pillar h3: 0.78rem → ~8pt
PT_PILLAR_P   = Pt(9)      # pillar p: 0.82rem → ~9pt
PT_TABLE_HDR  = Pt(7.5)    # th: 0.65rem → ~7.5pt
PT_TABLE_BODY = Pt(9)      # td: 0.78rem → ~9pt
PT_TAG        = Pt(7)      # .tag badge → ~7pt

# ---------------------------------------------------------------------------
# Helpers de cor
# ---------------------------------------------------------------------------

def rgb_hex(r, g, b):
    """Cria RGBColor a partir de inteiros 0-255."""
    return RGBColor(r, g, b)

def hex_color(hex_str):
    """Converte '#RRGGBB' ou 'RRGGBB' para RGBColor."""
    h = hex_str.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))

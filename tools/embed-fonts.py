#!/usr/bin/env python3
"""Regenerate src/css/01-fonts.css with the woff2 files inlined as data URIs.

The game ships as one HTML file that has to look right offline, so the fonts
are embedded rather than pulled from Google Fonts at runtime. Run this after
replacing anything in game_files/fonts/.

    python3 tools/embed-fonts.py
"""
import base64
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / 'game_files' / 'fonts'
OUT = ROOT / 'src' / 'css' / '01-fonts.css'

# (family, style, weight, filename)
FACES = [
    ('Instrument Serif', 'normal', 400, 'instrument-serif.woff2'),
    ('Instrument Serif', 'italic', 400, 'instrument-serif-italic.woff2'),
    ('Inter', 'normal', 400, 'inter-400.woff2'),
    ('Inter', 'normal', 500, 'inter-500.woff2'),
    ('Inter', 'normal', 600, 'inter-600.woff2'),
    ('Inter', 'normal', 700, 'inter-700.woff2'),
]

HEADER = """/* 01-fonts.css   self-contained: latin woff2 subsets embedded as data URIs.
   No network needed. Source files in game_files/fonts/.
   Regenerate with: python3 tools/embed-fonts.py */
"""


def main():
    missing = [fn for *_, fn in FACES if not (FONTS / fn).is_file()]
    if missing:
        sys.exit('missing font files in %s: %s' % (FONTS, ', '.join(missing)))

    parts = [HEADER]
    for family, style, weight, filename in FACES:
        b64 = base64.b64encode((FONTS / filename).read_bytes()).decode()
        parts.append(
            '@font-face{\n'
            "  font-family:'%s';font-style:%s;font-weight:%d;font-display:swap;\n"
            '  src:url(data:font/woff2;base64,%s) format(\'woff2\');\n'
            '}' % (family, style, weight, b64)
        )
    OUT.write_text('\n'.join(parts) + '\n')
    print('wrote %s (%d KB)' % (OUT.relative_to(ROOT), OUT.stat().st_size // 1024))


if __name__ == '__main__':
    main()

# PDF font

Noto Sans CJK SC Regular is downloaded by `scripts/ensure-resume-font.cjs` from a
pinned upstream commit, verified by SHA-256 and cached under `.tools/resume-fonts/`.
This provides reproducible Chinese PDF rendering on developer machines and Vercel
build hosts. The website does not download the font.

Source: https://github.com/notofonts/noto-cjk/tree/f8d157532fbfaeda587e826d4cd5b21a49186f7c/Sans/OTF/SimplifiedChinese

License: SIL Open Font License 1.1, reproduced in `OFL.txt`.

# PDF fonts

Noto Sans Regular, Bold, Italic and Bold Italic plus Noto Sans CJK SC Regular are
downloaded by `scripts/ensure-resume-font.cjs` from pinned upstream commits. Every
file is verified by SHA-256 and cached under `.tools/resume-fonts/`. This provides
consistent Latin and Chinese PDF typography on developer machines and Vercel build
hosts. The website does not download these fonts.

Sources:

- https://github.com/notofonts/noto-fonts/tree/ffebf8c1ee449e544955a7e813c54f9b73848eac/hinted/ttf/NotoSans
- https://github.com/notofonts/noto-cjk/tree/f8d157532fbfaeda587e826d4cd5b21a49186f7c/Sans/OTF/SimplifiedChinese

License: SIL Open Font License 1.1, reproduced in `OFL.txt`.

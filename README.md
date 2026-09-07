# Dong Payton Pei — Resume & Portfolio

Canonical source for **https://cv.paytonpei.top/**.

This repository is the single maintained source for my public resume, portfolio website, and generated PDF resumes. The site is deployed on Vercel from `main`.

## What is included

- Responsive portfolio site built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.
- English, French, and Chinese content from one source file: [`src/data/resume-content.json`](src/data/resume-content.json).
- Current flagship projects, published products, GitHub repositories, coursework, work experience, and research.
- Print-friendly layouts and generated PDF resumes for all three languages.
- Vercel Analytics and production deployment at [`cv.paytonpei.top`](https://cv.paytonpei.top/).

## Content workflow

Update [`src/data/resume-content.json`](src/data/resume-content.json), then run:

```bash
npm run build
```

The same content source drives the web view, generated Typst files, and all three PDFs. The Typst files under `typst/` are generated artifacts and should not be edited manually.

Keep personal contributions distinct from project-wide results. Do not infer graduation
dates, project dates, or performance improvements. Education and work locations use
each entry's optional `location` field; an unknown location stays blank.

The PDFs use A4 pages with natural pagination. The build provisions a pinned,
checksum-verified CJK font under `.tools/resume-fonts/`; its OFL license and source
are documented in `typst/fonts/`. This also works on hosts without system CJK fonts.
After content edits, inspect all three PDFs for overflow before pushing.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

The full build regenerates the three PDF resumes and then creates the production web build:

```bash
npm run build
```

To build only the web application without regenerating PDFs:

```bash
npm run build:web
```

Generated files:

- `public/payton-pei-resume.pdf`
- `public/payton-pei-resume-fr.pdf`
- `public/payton-pei-resume-zh.pdf`

If Typst is not installed, the build scripts provision a local binary under `.tools/` automatically.

## Production

Vercel project: `resume`

Production domain: **https://cv.paytonpei.top/**

Every merge to `main` is intended to update the canonical resume site. The older `mammut001/cv` repository is no longer a separate resume source and should only point people here.

## Links

- [GitHub](https://github.com/mammut001)
- [LinkedIn](https://www.linkedin.com/in/pd110/)
- [Live resume editor project](https://resume-tailor.paytonpei.top/)

## License

MIT

# Dong Payton Pei — Resume

Personal resume and portfolio site for [Dong Payton Pei](https://github.com/mammut001), a software developer and Master of Engineering student in System Science and Engineering at the University of Ottawa.

![Resume preview](screenshot)

## What is included

- Responsive portfolio site built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.
- English, French, and Chinese content from one source file: [`src/data/resume-content.json`](src/data/resume-content.json).
- Links to current projects, published products, GitHub repositories, and research.
- Print-friendly layouts and generated PDF resumes for all three languages.

## Run locally

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

The full build regenerates the three PDF resumes and then creates the production web build:

```bash
yarn build
```

To build only the web application without regenerating PDFs:

```bash
yarn build:web
```

The generated files are:

- `public/payton-pei-resume.pdf`
- `public/payton-pei-resume-fr.pdf`
- `public/payton-pei-resume-zh.pdf`

If Typst is not installed, the build scripts provision a local binary under `.tools/` automatically.

## Content workflow

Update [`src/data/resume-content.json`](src/data/resume-content.json), then run:

```bash
yarn build
```

The same content source drives the web view, the generated Typst files, and all three PDFs. The Typst files under `typst/` are generated artifacts and should not be edited manually.

## Links

- [GitHub](https://github.com/mammut001)
- [LinkedIn](https://www.linkedin.com/in/pd110/)
- [Live resume editor project](https://resume-tailor.paytonpei.top/)

## License

MIT

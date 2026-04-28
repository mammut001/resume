![cv](screenshot)

# Minimalist CV [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBartoszJarocki%2Fcv)

Simple web app that renders minimalist CV with print-friendly layout.

Built with Next.js and shadcn/ui, deployed on Vercel.

# Features

- Setup only takes a few minutes with a single resume content source at [src/data/resume-content.json](./src/data/resume-content.json)
- Built using Next.js 14, React, Typescript, Shadcn/ui, TailwindCss
- Auto generated Layout
- Responsive for different devices
- English, French, and Chinese PDF resumes generated from the same content source
- Optimized for Next.js and Vercel

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/BartoszJarocki/cv.git
   ```

2. Move to the cloned directory

   ```bash
   cd cv
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Start the local Server:

   ```bash
   yarn dev
   ```

5. Open the [resume content file](./src/data/resume-content.json) and make changes

6. Build the site

   ```bash
   npm run build
   ```

   This generates the English, French, and Chinese resume PDFs before running the Next.js production build. If `typst` is not already installed, the build scripts automatically download a local Typst binary into `.tools/`.

7. Use the pure web build when you want to skip PDF regeneration

   ```bash
   npm run build:web
   ```

   This only runs `next build` and leaves the existing PDF files untouched.

# Deployment

## Vercel

This repository now includes [vercel.json](./vercel.json), which tells Vercel to use `npm run build` as the build command. During deployment:

1. The resume Typst sources are generated from [src/data/resume-content.json](./src/data/resume-content.json)
2. A local Typst binary is provisioned automatically if the environment does not already have one
3. The English, French, and Chinese PDFs are compiled into `public/`
4. Next.js runs its production build

If you ever want a deployment that skips PDF regeneration, change the Vercel build command to `npm run build:web`.

## Docker

The Docker image installs the tools needed to provision Typst, pre-downloads Typst during the image build, and then runs the full `npm run build` flow.

# Run with Docker

Build the container

```
docker compose build
```

Run the container

```
docker compose up -d
```

Stop the Container

```
docker compose down 
```

# License

[MIT](https://choosealicense.com/licenses/mit/)

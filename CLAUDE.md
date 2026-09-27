# CLAUDE.md

## Attribution

- Do not add any Claude/AI attribution to commits, pull requests, or GitHub comments:
  no `Co-Authored-By: Claude` trailer, no `Claude-Session` link, no "Generated with
  Claude Code" footer.
- Commit as the repository owner: `mammut001 <141458085+mammut001@users.noreply.github.com>`
  (set `git config user.name` / `user.email` locally before committing).

## Project notes

- Resume content lives in `src/data/resume-content.json`; the web view, the generated
  Typst files under `typst/` and the PDFs in `public/` are all derived from it. Do not
  edit `typst/*.typ` by hand.
- `npm run build` regenerates the PDFs and builds the site; `npm run build:web` builds
  the site only. Run `npx tsc --noEmit` and `npm run lint` before pushing.

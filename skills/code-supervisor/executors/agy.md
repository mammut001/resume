# Executor: Antigravity CLI (`agy`)

## Launch
```bash
cd <worktree> && agy -p "$(cat <prompt.md>)" --dangerously-skip-permissions --effort high \
  --output-format text > <log> 2>&1; echo "agy exit=$?" >> <log>
```
agy has no `--yolo`; `--dangerously-skip-permissions` is the equivalent.

## Continue (same conversation)
`agy -c -p "<instruction>" ...` from the same worktree. When the conversation is large, start a fresh
`agy -p` with a short summary instead — `agy -c` on a huge conversation can sit for an hour without editing.

## Liveness
agy prints nothing until the end and may read for 25+ min before editing. Its conversation DB
`~/.gemini/antigravity-cli/conversations/<id>.db-wal` (find it via `lsof -p <agy pid>`) keeps being
written while it works — use that file's mtime to detect a real hang.

## Tests
Unreliable with long test runs: keep "Do NOT run tests — the supervisor runs them" in the prompt.

## Known failures
- Runs of 1h+ often die with `write: broken pipe` network errors or crawl as the conversation grows.
  Keep runs short (see SKILL.md step 3).
- In print mode agy ends its turn when one of *its own* background tasks finishes, leaving work
  uncommitted → continue with "Do not run tests or background commands. Finish the remaining items and commit."
- It hard-codes expected values in tests that don't match its own code, and repeats this even when
  told to copy from the code.

## Quota / accounts
When agy's quota runs out, switch to `executors/commandcode.md`. Switching the agy login (Kanjo) while
agy sessions are running is undone at their next token refresh — quit running agy first.

# Executor: Command Code (`cmd`)

Fallback when agy's quota runs out. Same prompt file, same worktree, same supervision.

## Launch
Model: `executor_models.commandcode` in `../config.md` (default `meta/muse-spark-1.3-contributor`, fast;
`stealth/space-bunny-alpha` is free but very slow). Substitute it for `<model>` below.
```bash
cd <worktree> && cmd -p "$(cat <prompt.md>)" --yolo -t --skip-onboarding -m <model> \
  --max-turns 300 > <log> 2>&1; echo "cmd exit=$?" >> <log>
```

## Continue (same conversation)
`cmd -c -p "<instruction>" --yolo -t -m <model>`

## Liveness
Session file `~/.commandcode/projects/<dir>/*.jsonl` grows while the model works; use its mtime.

## Known failures
Muse Spark contributor has hung for 30+ min with no model response (the session .jsonl stops growing).
If it hangs, kill the run, commit partial work as WIP, and go back to agy once its quota resets.

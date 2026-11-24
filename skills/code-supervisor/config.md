# code-supervisor defaults

Written by the first-run setup (SKILL.md step 0). Edit by hand or ask to reconfigure.
A model or executor named in the user's request always wins for that run.

- configured: no
- planner: session
  # `session` = whatever model this Claude Code session runs.
  # Or a subagent model override: opus | sonnet | haiku | fable.
- executor: agy
  # One of the files in executors/: agy | commandcode
- fallback: ask
  # When the default executor's quota runs out: auto | ask | stop
- ship: pr
  # After verifying: merge (push, PR, squash-merge) | pr (stop at an open PR)
- executor_models:
  - commandcode: meta/muse-spark-1.3-contributor   # free but very slow: stealth/space-bunny-alpha

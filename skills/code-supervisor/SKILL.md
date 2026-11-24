---
name: code-supervisor
description: >-
  Supervisor workflow where the planner model (user-selectable; defaults to the session model) does NOT write product code itself: it writes a task prompt for
  an executor coding agent (Antigravity CLI `agy` by default, or Command Code `cmd`), runs it in an isolated git worktree, monitors it, reviews the diff, runs the tests
  itself, then opens/merges the PR and installs. Use when the user asks to "让 agy 写 / 让 cmd 写 /
  你来监工", or to delegate implementation to another coding agent.
---

# Code supervisor workflow

Roles: **the executor writes code. The supervisor (the planner model from step 0a) writes the prompt,
supervises, verifies, ships.** The supervisor does not edit product code itself; tiny fixes too go back to the executor through its "continue"
command. Another agent (e.g. Codex) may be used separately for on-device testing or reviews —
the supervisor writes those prompts and reviews the reports.

## 0. First-run setup (only when `config.md` says `configured: no`, or the user asks to reconfigure)
Before any other step, ask the user a few questions in one round (use the AskUserQuestion tool if
available, otherwise ask in chat), in the user's language:
1. **Planner model** — who writes prompts and reviews: "same as this session" (recommended), or
   opus / sonnet / haiku / fable.
2. **Default executor** — who writes code: one of the profiles in `executors/` (agy recommended).
   Only offer executors whose CLI exists on this machine (e.g. `command -v agy`, `command -v cmd`);
   mention the ones you skipped.
3. **Fallback when the default executor's quota runs out** — switch automatically, ask first, or stop.
4. **Shipping** — after verifying: merge the PR automatically, or stop at an open PR for review.
Then write the answers into `config.md`, set `configured: yes`, show the user the saved values in
two or three lines, and continue with the task. Never ask again unless the user asks to reconfigure
("重新设置 code-supervisor"). A model or executor named in a later request still wins for that run.

## 0a. Pick the planner model (who writes the prompt and reviews)
Nothing here is tied to one model. "The supervisor" below means whichever model the user picks:
1. If the user names a planner in this request ("用 Sonnet 规划", "let Fable review"), use it.
2. Otherwise use the default in `config.md` next to this file.
3. If `config.md` says `session`, the planner is the model this session already runs — say which
   one in the first line of your reply so the user can change it.

How to apply a planner that differs from the session model: run the planning work (writing the
prompt in step 2) and the review work (step 5) through a subagent with that model override, and keep
the session itself for running commands. If the requested model is not available as an override,
tell the user and ask them to switch the session model in the app's model picker instead — don't
silently fall back.

## 0b. Pick the executor and load its profile
The user can name the executor ("让 cmd 写"); otherwise use the default in `config.md`.
Read the profile before step 3 — it holds the launch command, follow-up command, liveness check and
known failure modes, which this file deliberately does not repeat.

| Executor | Profile | When |
|---|---|---|
| Antigravity CLI `agy` | `executors/agy.md` | Default |
| Command Code `cmd` | `executors/commandcode.md` | agy quota exhausted, or the user asks |

If there are notes for the current repo in `repos/<repo>.md`, read them too (create one to record a
repo's build commands, test gotchas and simulator ids).
A new executor = a new file in `executors/` with the same headings; the workflow below stays the same.

## 1. Prepare an isolated worktree
Never let the executor work in the user's main checkout (it may hold uncommitted work).
```bash
git fetch -q origin
git worktree add -b <branch> <scratchpad>/<name> origin/main   # always from fresh origin/main
```

## 2. Write the prompt (save it to a file in the scratchpad)
Sections, in this order:
- **Worktree path + branch + base commit.**
- **Hard rules:** only modify this worktree; commit on the branch; no push / PR / merge / touching
  main; never install on a physical device; which simulator/device id to use if any; match
  surrounding style, don't reformat unrelated code; never delete or modify the user's data. Run
  builds in the **foreground** only. Default: **"Do NOT run tests — the supervisor runs them"**
  unless the executor profile says it handles long test runs well.
- **Product decision / background** — what the user wants and why, in the user's words where possible.
- **Relevant files** with line hints, and what must stay unchanged.
- **What to build**, concretely.
- **Tests to add** (and the repo's known compile gotchas). Prefer "assert behavior (e.g. not equal
  to English), don't pin exact translated strings" — executors tend to hard-code expected values.
- **Finish:** `git add -A`, commit with a clear message, print a short summary (files changed,
  approach, anything unsure, follow-ups).

## 3. Run the executor in the background
Use the profile's launch command, run_in_background, output to a log file, and append the exit code
to the log. Follow-ups in the same conversation use the profile's continue command from the same
worktree.

**Keep runs short.** Long runs die or crawl as the conversation grows. One batch per run; for hard
bugs, a diagnose-only run (write findings to a file) before a fix run; start a fresh run with a short
summary instead of continuing a huge conversation. Work already done and reviewed can ship on its own
branch (separate worktree at that commit) while the rest continues.

**When the executor's quota runs out:** follow `fallback` in `config.md` — `auto` switches to the
next available executor, `ask` asks the user first, `stop` stops and reports.

**Switching executors mid-task:** stop the old run, commit its partial work as WIP, then give the new
executor the same prompt file plus what is done and what is left. Supervise it exactly the same way.

**Parallel runs:** independent tasks can run as parallel executor runs, one worktree each (and their
own build output dirs). Merge them into an integration branch and wire the cross-task seams yourself
— tell each prompt which seam the supervisor will wire.

## 4. Monitor
- You are notified when the background command exits; don't poll in a tight loop.
- When the user asks for progress: `tail` the log, `git status --short` / `git log -2` in the
  worktree, and check the executor process is still alive (`pgrep -P <wrapper pid>`).
- Detect a real hang with the profile's liveness signal, not with worktree changes — executors can
  read for a long time before their first edit.
- If the executor exits without committing, use its continue command: "Continue the task. Do not run
  tests or background commands. Finish the remaining items and commit."
- Watch for stuck build tools; match the real binary path in pgrep, not a loose string that also
  matches the executor's own prompt text.

## 5. Verify (the supervisor does this; never trust the executor's "all passed")
1. Read the full diff (`git diff origin/main...HEAD`); check the hard rules held (only expected
   files, data files changed only textually, no unrelated reformatting).
2. Run the full test suite + other targets' builds yourself in the background, with a monitor that
   fires on the final summary *and* on errors/stalls (per-suite lines are not the end).
3. Failures → send the exact error back with the continue command, then re-verify. Decide which side
   is right first: executor-written tests sometimes hard-code values that don't match its own code —
   tell it which is the source of truth.
4. For UI changes, take screenshots (simulator) or hand the user a device-test prompt. Don't accept
   or reject a visual fix by reading code alone.

## 6. Ship
Follow `ship` in `config.md`: `pr` stops after `gh pr create` and hands the PR to the user;
`merge` continues to the merge.
`git push -u origin <branch>` → `gh pr create` (body: what changed, test counts) →
`gh pr merge --squash` → build `origin/main` and install if the project has an install step.
Installing kills the running app — if the user is using it, merge but wait for their OK to install.

## 7. Report to the user
In the user's language. Say which planner model and which executor ran, what it changed, what you verified (test counts),
anything that failed and was fixed, what was not verified, and what's next. Keep it short.

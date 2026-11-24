# code-supervisor

A [Claude Code](https://docs.claude.com/en/docs/claude-code) skill that turns Claude into a supervisor:
it writes the task prompt, another coding agent writes the code in an isolated git worktree, and
Claude reviews the full diff, runs the tests itself and ships the PR. It never trusts the executor's
own "all tests passed".

- **Planner** (writes prompts, reviews): any model — defaults to the model your session runs.
- **Executor** (writes code): Antigravity CLI `agy` by default, or Command Code `cmd`. Add your own by
  dropping a profile into `executors/`.
- **First run** asks four questions (planner, executor, what to do when quota runs out, merge or stop
  at a PR) and saves the answers to `config.md`.

Background and the lessons behind it (Chinese):
[562 亿 Token 实测：2026 年主流 AI 编程订阅到底值不值？](https://cv.paytonpei.top/posts/ai-coding-subscriptions-2026)

## Install

```bash
npx degit mammut001/resume/skills/code-supervisor ~/.claude/skills/code-supervisor
```

Or with git only:

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/mammut001/resume.git /tmp/cs && git -C /tmp/cs sparse-checkout set skills/code-supervisor && cp -R /tmp/cs/skills/code-supervisor ~/.claude/skills/ && rm -rf /tmp/cs
```

Restart Claude Code (or start a new session), then ask something like "让 agy 写这个功能，你来监工" or
"delegate this to agy and supervise it".

## Files

| File | What it holds |
|---|---|
| `SKILL.md` | The tool-agnostic workflow: worktree → prompt → run → monitor → verify → ship → report |
| `config.md` | Your defaults, written by the first-run setup |
| `executors/agy.md` | Launch / continue commands, hang detection and known failure modes for `agy` |
| `executors/commandcode.md` | The same for Command Code `cmd` |
| `repos/<repo>.md` | Optional per-repo notes (build commands, flaky tests, simulator ids) — create your own |

## Adding an executor

Copy `executors/agy.md` and fill in the same sections for your tool: Launch, Continue, Liveness,
Tests, Known failures. The workflow in `SKILL.md` does not change.

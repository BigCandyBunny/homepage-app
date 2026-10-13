# Specs — Spec-Driven Development (Level 2, spec-anchored)

Living specifications for this repository. Each sprint gets an in-repo spec that states the
**outcome** up front and carries a **living Decisions & learnings log** updated as work
reveals new constraints. The spec is version-controlled alongside the code it describes.

## Layout

```text
specs/
├── TEMPLATE.md                     # copy this for a new sprint
└── NNN-slug/spec.md                # one directory per sprint (zero-padded number)
```

## The one rule that keeps specs honest

A change to behavior is **not done** until the spec's *Decisions & learnings* log reflects it.
This is what prevents "spec rot" — the spec drifting from reality until nobody trusts it.

## Lifecycle

`draft` → `active` → `done`. Status and `Updated:` date live at the top of each `spec.md`.

## Tooling

Use the `/sprint` slash command (see `.claude/commands/sprint.md`):

- `/sprint new <slug> [outcome…]` — scaffold `specs/NNN-slug/spec.md` from the template
- `/sprint learn <note…>` — append a dated entry to the active sprint's learnings log
- `/sprint tick <substr>` — flip the one matching acceptance criterion `- [ ]` → `- [x]`
- `/sprint defer <substr> — <reason>` — move a criterion under `## Deferred` with a reason
- `/sprint done` — mark the active sprint done (refuses while acceptance criteria remain open)
- `/sprint status` — list sprints and show the active one's outcome + open criteria

## Closing a sprint is guarded

A commit that flips a spec to `Status: done` is **refused** (by `~/.claude/hooks/guard.py`, the same
`[spec]` hook that enforces the log) while its `## Acceptance criteria` still holds open `- [ ]`
boxes not moved under `## Deferred`. The checkbox list is a second oracle for "is this delivered"
beside the learnings log; without this, a `done` sprint could silently claim work it never shipped —
which is exactly how 010 accrued 17 done-but-unticked criteria and 007/008/009 closed with open
boxes. Resolve each open box with `/sprint tick` or `/sprint defer` before closing. See sprint 016.

The project constitution (non-negotiable rules: uv-only, type hints, TDD, etc.) lives in
`CLAUDE.md` at the repo root.

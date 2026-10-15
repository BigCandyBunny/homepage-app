# Sprint 001 — CI Gate String

Status: active   Updated: 2026-10-15

## Outcome

CI and the pre-push guard run the same gate string, character for character, so the
`ci-standard` audit stops reporting this repo's gate as forked.

## Acceptance criteria

- [ ] `.github/workflows/ci.yml`'s Gate step runs exactly `[ci] gate` from `.claude/guard.toml`, and CI is green on it.

## Scope / non-goals

- In: the Gate step in `ci.yml`.
- Out: the gate's contents (`npm run check` is unchanged); the nvm loader in `guard.toml`, which the pre-push hook needs on hosts where npm comes from nvm.

## Approach

CI adopts the guard's string. Changing the guard instead would drop the nvm loader and could
break the pre-push hook on nvm hosts; on a runner the loader is a no-op (no `nvm.sh`, stderr
suppressed, `npm` from `setup-node`, exit status still `npm run check`'s).

## Tasks

- [ ] Gate step uses the guard's string.

## Verification

`gh run view` on the PR: the Gate step runs `bash -c '. "$HOME/.nvm/nvm.sh" 2>/dev/null; npm run check'` and passes.

## Decisions & learnings (living log)

<!-- Append a dated entry whenever reality contradicts the plan or a decision is made.
     A behavior change isn't done until it's reflected here. -->

- 2026-10-15: Sprint created. The 2026-10-15 `ci-standard` estate audit flagged `[ci] gate` as MISMATCH against `ci.yml`'s `npm run check`. Same script, different strings; CI takes the guard's, because the guard's loader is a no-op on a runner (measured on .22 without nvm: `bash -c '. "$HOME/.nvm/nvm.sh" 2>/dev/null; echo ran-on; exit 3'` prints `ran-on`, rc=3).

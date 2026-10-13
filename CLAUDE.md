@~/.claude/house/git.md           commit format, never mention AI, README sync
@~/.claude/house/verification.md  evidence before assertions
@~/.claude/house/sdd.md           sprint specs
@~/.claude/house/enforcement.md   the hooks behind .claude/guard.toml
@~/.claude/house/ci.md            the gate contract

# homepage-app

## 1. What this repo is

The source of justresults.no, the homepage of just Results Consulting a.s. A Svelte 5 + TypeScript +
Vite single-page application, hosted on Cloudflare Pages and **auto-deployed from `main`**: a merge
is a release. `README.md` is the full account.

## 2. Layout and commands

`src/` is the application and its tests (`*.test.ts`, Vitest + @testing-library/svelte under jsdom).
`posts/` is content, `public/` static assets.

```bash
npm run check        # THE gate: typecheck + test + build; CI and the pre-push hook run this
npm run dev          # Vite dev server
npx vitest run src/lib/BriefDialog.test.ts   # one test file
```

## 3. Deviations from the house rules

> does not import `house/typescript.md`: that module is Vue 3 and this site is Svelte 5 with runes.

> `.claude/guard.toml` opts out of `[tdd]`: the hook guards `.py` only, so nothing here is held to
> test-first by a hook. The tests run in the gate.

# Sprint 002 — Techstack Cache Bust

Status: active   Updated: 2026-11-05

## Outcome

The TechStack brief image is served under a content-hashed URL, so replacing it reaches every
visitor on the next page load instead of after the 4-hour public/ cache.

## Acceptance criteria

- [x] The TechStack image is imported through Vite, not referenced by a fixed `public/` path
- [x] `npm run build` emits it as `dist/assets/<name>-<hash>.png` and the bundle references that URL
- [x] A test fails if the TechStack src goes back to an unhashed `/briefs/` path
- [ ] After deploy, the live bundle references the hashed image and it returns 200

## Scope / non-goals

- In: the TechStack image only.
- Out: the project brief images in `public/briefs/` (same pattern, not asked for); deleting the
  unused `tech_stack_*.png` / `TechStack_CV.png` variants.

## Approach

Move `public/briefs/tech_stack_light.png` to `src/lib/assets/tech_stack.png` and
`import techStackSrc from './assets/tech_stack.png'` in `src/lib/About.svelte`. Vite hashes
imported assets by content, so a swap changes the URL without anyone remembering to rename.

## Tasks

- [x] Red: test asserting the TechStack src is not under `/briefs/`
- [x] Move the file, switch About.svelte to the import
- [ ] Gate, adversary review, PR

## Verification

`npm run check`; `ls dist/assets/*tech_stack*`; after merge, curl the live bundle for the hashed
name and fetch it.

## Decisions & learnings (living log)

- 2026-11-05: Sprint created.
- 2026-11-05: PR #10 swapped `public/briefs/tech_stack_light.png` in place. The server had the
  new file (sha256 513a4672…), but Cloudflare serves public/ with `max-age=14400`, and the image
  is fetched by JS when the dialog opens, so a page refresh did not revalidate it — the owner saw
  the old image until opening the URL directly. Chose a Vite import over a manual rename: a rename
  is a step every future swap must remember; a content hash cannot be forgotten.
- 2026-11-05: Build emits `dist/assets/tech_stack-22AHIMmS.png` and the bundle references it;
  nothing is left at `/briefs/tech_stack_light.png` (grep found no other reference to that path),
  so it 404s after deploy. Red was an assertion (`expected true to be false`), not a missing
  symbol. The test asserts the src is not under `/briefs/`; it cannot see the hash itself, because
  Vitest serves the import unhashed — the build check above is the evidence for that.

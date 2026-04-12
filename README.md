# just Results Consulting — homepage

Editorial single-page site for **just Results Consulting a.s** (Leif Næss).
A Svelte 5 + TypeScript + Vite SPA. Built for both human readers and the
growing share of visitors who arrive via LLM agents rather than search.

## Tech

- **Svelte 5** with runes (`$state`, `$derived`, `$effect`, `$props`) — no stores, no legacy `$:`
- **TypeScript** + **Vite**
- **Vitest** + **@testing-library/svelte** under **jsdom**
- Self-hosted typography: **Fraunces Variable** (display) + **IBM Plex Sans** (body) via `@fontsource`
- Native `<dialog>` element for the brief/CV lightbox, with `history.pushState`-based iOS back-swipe dismissal

## Commands

```
npm run dev          # Vite dev server with HMR (bound to 0.0.0.0 for LAN access)
npm run build        # Production build → dist/
npm run preview      # Serve the production build locally
npm run check        # svelte-check + tsc
npm run test         # vitest run
npm run test:watch   # vitest watch
```

Single-file test runs: `npx vitest run src/lib/BriefDialog.test.ts`

## Project layout

```
index.html                 # Static <head>: title, meta, CSP, JSON-LD, OG tags
public/
  llms.txt                 # Plain-markdown summary for LLM crawlers
  robots.txt               # Explicit allow for GPTBot / ClaudeBot / PerplexityBot / …
  briefs/                  # PNG tech briefs + executive briefs + CV
src/
  main.ts                  # Entry — mounts App.svelte, imports fonts + app.css
  App.svelte               # Editorial shell: nav, <main>, hero, sections
  app.css                  # Design tokens, typography, section stagger animation
  lib/
    ProjectList.svelte     # Expandable project table (centerpiece)
    ContactForm.svelte     # Underlined editorial fields + "how we work" lead-in
    About.svelte           # Firm description + CV button
    BriefDialog.svelte     # Native <dialog> lightbox for brief PNGs
    briefDialog.svelte.ts  # Shared state + preload helper
    data/projects.ts       # Project data
  *.test.ts                # Vitest specs live alongside the code they test
```

## Design system

**Palette** (dark theme is canonical; a light variant exists under `prefers-color-scheme`):

- `--bg` `#1e2a4a` — deep navy
- `--text` `#d4c5a0` — warm parchment body
- `--text-h` `#f0e6c8` — headings
- `--accent` `#e8d5a3` — light gold; used for hairline rules, section numbers, focus states, CTAs

**Typography**
- Display: Fraunces Variable, `font-variation-settings: 'SOFT' 0, 'WONK' 0, 'opsz' 144`
- Body / UI: IBM Plex Sans 400/500/600
- Section titles, numerals (I–IV), and input labels use small-caps-style tracking for an editorial register

**Layout**
- Two-column editorial hero with founder card (monogram placeholder) + positioning copy
- Projects table as the centerpiece, all rows expandable to reveal tech stack; featured rows also expose Tech Brief + Executive Brief buttons
- Contact form uses underline-only fields, no boxes
- All four sections (`main > section`) fade + rise on initial load with a 100 ms stagger; disabled under `prefers-reduced-motion: reduce`

## Agent-era discoverability

The site is built assuming LLM agents (ChatGPT browsing, Claude, Perplexity, Google AI Overviews) are first-class visitors alongside humans. Supporting pieces:

- **Two JSON-LD blocks** in `index.html` — `ProfessionalService` for the firm (with `serviceType`, `knowsAbout`, `areaServed`) and `Person` for the founder (credentials, expertise)
- **`public/llms.txt`** — markdown summary following the emerging convention, so crawlers that respect it can skip DOM rendering entirely
- **`public/robots.txt`** — explicitly names `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot` so the allow-list is unambiguous
- **Open Graph + traditional meta** still present — when an agent cites the site, chat UIs render the card

Note: this is a client-rendered SPA. Agents that execute JavaScript read the hydrated DOM; agents that don't fall back to `index.html` + JSON-LD + `llms.txt`, which is why the load-bearing facts are duplicated in the static head.

## Security posture

The site is a static SPA with no backend, no database, and no user-generated content. The attack surface is correspondingly small.

**In-code defences**
- **Content-Security-Policy** via meta tag in `index.html`: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' ws: wss:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'`
- **`referrer-policy: strict-origin-when-cross-origin`** meta tag
- **No `{@html ...}` anywhere** — Svelte's default auto-escaping covers XSS
- **No LLM calls** from the site → no prompt-injection surface

**Expected from the production host** (set as HTTP headers at the edge)
- `Content-Security-Policy` — same policy as above, plus `upgrade-insecure-requests`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (or equivalent via CSP `frame-ancestors`)
- `Permissions-Policy` — a conservative default disabling camera/microphone/geolocation

**Open items** (not blockers, tracked for future sessions)
- Contact form currently only flips a client-side `submitted` flag. When wired to a real endpoint, add: honeypot field, rate limiting, and Cloudflare Turnstile (or equivalent).
- Run `npm audit` before each release.
- Founder photo → replace the `LN` monogram placeholder and add `og:image` in `index.html`.
- LinkedIn / ORCID → add to the `Person` JSON-LD `sameAs` array once the founder profile is ready to expose.

## Workflow — Strict TDD

This project uses strict test-driven development. For every new feature:

1. **Write a failing test first** — run it to confirm red.
2. **Iterate on the spec** with the user before touching implementation.
3. **Implement minimally** — just enough to go green.
4. **Refactor** while keeping tests green.

Tests live next to source as `*.test.ts`. File-level specs (`src/seo.test.ts`, `src/motion.test.ts`, `src/shell.test.ts`) assert static-file and shell-level invariants; component specs cover rendering and interaction.

## Dev server on the LAN

`vite.config.ts` sets `server.host: true` so the dev server binds to `0.0.0.0` and can be reached from other devices on the LAN (useful for testing on a phone). Default port is 5173; `strictPort: true` prevents silent fallback.

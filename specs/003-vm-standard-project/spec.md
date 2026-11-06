# Sprint 003 — VM Standard project

Status: done   Updated: 2026-11-06

## Outcome

A visitor sees the VM Standard as the newest row in Recent Projects, expands it to read its tech
stack, and opens the VM Standard infographic from its System overview button.

## Acceptance criteria

- [x] `projects.ts` carries a VM Standard entry, first (newest), with copy drawn from the three source docs
- [x] Expanding the row shows a System overview button whose `data-src` is `/briefs/vm_standard_system.png`
- [x] The infographic is served from `public/briefs/vm_standard_system.png`
- [x] `npm run check` passes

## Scope / non-goals

- In: one project entry, one brief image, one brief mapping.
- Out: any change to the other projects or to the dialog.

## Approach

Copy `VM_Standard_Infographic.png` from the Mac mini into `public/briefs/`, add the title to
`briefProjects` in `src/lib/ProjectList.svelte`, add the entry to `src/lib/data/projects.ts`.
Sources: `proxmox-vm-standardization/docs/VM-STANDARD.md`, `proxmox-estate/docs/estate-principles.md`,
`claude-vm-standard/docs/standard-overview.md` (all on .15).

## Tasks

- [x] Red test for the brief path
- [x] Mapping + data entry
- [x] Gate

## Verification

`npx vitest run src/lib/ProjectList.test.ts`, then `npm run check`.

## Decisions & learnings (living log)

- 2026-11-06: Copy keeps to what the three source docs already publish: the method, never the
  inventory. No host counts, addresses or versions in `projects.ts`, because estate-principles.md
  withholds sizes by design.
- 2026-11-06: Live after #13: `www.justresults.no/briefs/vm_standard_system.png` returns 200,
  `image/png`, 586939 bytes (matches the committed file); bundle `index-CWSCZwfS.js` carries the
  `VM Standard` title and the `vm_standard_system` mapping. The apex domain 301s to `www`.

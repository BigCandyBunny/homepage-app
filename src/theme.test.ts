import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const appCss = readFileSync(resolve(__dirname, 'app.css'), 'utf8')
const mainTs = readFileSync(resolve(__dirname, 'main.ts'), 'utf8')

describe('Phase 1.1 — Editorial typography tokens', () => {
  it('defines a distinctive serif display token and a humanist sans body token', () => {
    expect(appCss).toMatch(/--serif-display:\s*['"]?Fraunces/)
    expect(appCss).toMatch(/--sans:\s*['"]?IBM Plex Sans/)
  })

  it('drops the generic system-ui / Segoe UI / Roboto stack from --sans and --heading', () => {
    const sansLine = appCss.match(/--sans:[^;]+;/)?.[0] ?? ''
    expect(sansLine).not.toMatch(/system-ui|Segoe UI|Roboto|Arial/)
    const headingLine = appCss.match(/--heading:[^;]+;/)?.[0] ?? ''
    expect(headingLine).not.toMatch(/system-ui|Segoe UI|Roboto|Arial/)
  })

  it('routes h1/h2/h3 through the serif display token', () => {
    expect(appCss).toMatch(/--heading:\s*var\(--serif-display\)/)
  })

  it('self-hosts both fonts via @fontsource so no network fetch is required', () => {
    expect(mainTs).toMatch(/@fontsource(?:-variable)?\/fraunces/)
    expect(mainTs).toMatch(/@fontsource\/ibm-plex-sans/)
  })
})

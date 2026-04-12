import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const appCss = readFileSync(
  resolve(process.cwd(), 'src/app.css'),
  'utf8',
)

describe('Phase 5.3 — Staggered load animation', () => {
  it('defines a @keyframes rule that fades and rises sections into place', () => {
    expect(appCss).toMatch(/@keyframes\s+section-enter\s*\{/)
    const kfMatch = appCss.match(
      /@keyframes\s+section-enter\s*\{([\s\S]*?)\n\}/,
    )
    expect(kfMatch, 'section-enter keyframes block missing').toBeTruthy()
    const body = kfMatch![1]
    expect(body).toMatch(/opacity:\s*0/)
    expect(body).toMatch(/translateY/)
  })

  it('applies the animation to main > section with ease-out timing', () => {
    expect(appCss).toMatch(
      /main\s*>\s*section\s*\{[^}]*animation:\s*section-enter[^;]*(ease-out|ease)/,
    )
  })

  it('staggers the animation across sections via animation-delay', () => {
    const delays = appCss.match(
      /main\s*>\s*section:nth-of-type\((\d)\)\s*\{[^}]*animation-delay/g,
    )
    expect(
      delays,
      'expected nth-of-type delay rules for staggering',
    ).toBeTruthy()
    expect(delays!.length).toBeGreaterThanOrEqual(3)
  })

  it('disables the animation under prefers-reduced-motion: reduce', () => {
    const reducedBlock = appCss.match(
      /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\n\}\s*(?=\n|$)/,
    )
    expect(reducedBlock, 'reduced-motion media query missing').toBeTruthy()
    const body = reducedBlock![1]
    expect(body).toMatch(/main\s*>\s*section/)
    expect(body).toMatch(/animation:\s*none/)
  })
})

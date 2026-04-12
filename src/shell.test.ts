import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import App from './App.svelte'

const sectionIds = ['hero', 'projects', 'contact', 'about'] as const
const romanByIndex = ['I', 'II', 'III', 'IV'] as const

describe('Phase 3.6 — Editorial shell structure', () => {
  it('wraps page content in a <main> landmark', () => {
    const { container } = render(App)
    const main = container.querySelector('main')
    expect(main).toBeTruthy()
    for (const id of sectionIds) {
      expect(main!.querySelector(`#${id}`)).toBeTruthy()
    }
  })

  it('gives every section an aria-labelledby pointing at its heading', () => {
    const { container } = render(App)
    for (const id of sectionIds) {
      const section = container.querySelector(`#${id}`)!
      const labelledBy = section.getAttribute('aria-labelledby')
      expect(labelledBy, `#${id} missing aria-labelledby`).toBeTruthy()
      const heading = container.querySelector(`#${labelledBy}`)
      expect(heading, `#${id} aria-labelledby target not found`).toBeTruthy()
      expect(heading!.tagName).toMatch(/^H[1-3]$/)
    }
  })

  it('marks each section with its roman numeral in order I–V', () => {
    const { container } = render(App)
    sectionIds.forEach((id, i) => {
      const section = container.querySelector(`#${id}`)!
      const marker = section.querySelector('.section-number')
      expect(marker, `#${id} missing .section-number`).toBeTruthy()
      expect(marker!.textContent?.trim()).toBe(romanByIndex[i])
    })
  })
})

describe('Phase 3.7 — Nav wordmark', () => {
  it('displays "just Results" as the brand (not the cryptic "jRC")', () => {
    const { container } = render(App)
    const nav = container.querySelector('nav')!
    const brand = nav.querySelector('.brand')
    expect(brand).toBeTruthy()
    expect(brand!.textContent).toMatch(/just Results/)
    expect(brand!.textContent).not.toMatch(/jRC/)
  })

  it('shows a small-caps practice tagline alongside the brand', () => {
    const { container } = render(App)
    const nav = container.querySelector('nav')!
    const tagline = nav.querySelector('.brand-tagline')
    expect(tagline).toBeTruthy()
    expect(tagline!.textContent).toMatch(/strategy/i)
    expect(tagline!.textContent).toMatch(/change/i)
    expect(tagline!.textContent).toMatch(/technology/i)
  })
})

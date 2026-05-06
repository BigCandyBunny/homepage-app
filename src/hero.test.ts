import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import App from './App.svelte'

describe('Phase 2.4 — Editorial hero with founder block', () => {
  it('renders the founder name, titles, and role inside #hero', () => {
    const { container } = render(App)
    const hero = container.querySelector('#hero')
    expect(hero).toBeTruthy()
    expect(hero!.textContent).toMatch(/Leif Næss/)
    expect(hero!.textContent).toMatch(/MBA.*PhD.*MSc/)
    expect(hero!.textContent).toMatch(/Founder\s*&\s*CEO/)
  })

  it('reserves a portrait slot labelled for the founder', () => {
    const { container } = render(App)
    const hero = container.querySelector('#hero')
    const portrait = hero!.querySelector('.portrait')
    expect(portrait).toBeTruthy()
    expect(portrait!.getAttribute('aria-label')).toMatch(/Leif Næss/)
  })

  it('shows three positioning statements in the hero', () => {
    const { container } = render(App)
    const hero = container.querySelector('#hero')!
    const text = hero.textContent ?? ''
    expect(text).toMatch(/40\+?\s*years/i)
    expect(text).toMatch(/strategy.*change.*technology/i)
    expect(text).toMatch(/process.*energy.*manufacturing/i)
  })

  it('makes the dual process/energy + manufacturing experience explicit', () => {
    const { container } = render(App)
    const hero = container.querySelector('#hero')!
    const text = hero.textContent ?? ''
    expect(text).toMatch(/equal/i)
    expect(text).toMatch(/process.*energy/i)
    expect(text).toMatch(/manufacturing/i)
  })

  it('offers a CTA link from the hero to the projects section', () => {
    const { container } = render(App)
    const hero = container.querySelector('#hero')!
    const cta = hero.querySelector('a[href="#projects"]')
    expect(cta).toBeTruthy()
    expect(cta!.textContent).toMatch(/project|work/i)
  })
})

describe('Phase 2.5 — About sourced from llms.txt', () => {
  it('does not duplicate the hero founder card inside #about', () => {
    const { container } = render(App)
    const about = container.querySelector('#about')!
    expect(about.querySelector('.founder-card')).toBeNull()
    expect(about.querySelector('.portrait')).toBeNull()
  })

  it('renders the firm summary content in #about', () => {
    const { container } = render(App)
    const about = container.querySelector('#about')!
    expect(about.textContent).toMatch(/just Results Consulting/)
    expect(about.textContent).toMatch(/strategy/i)
    expect(about.textContent).toMatch(/change management/i)
    expect(about.textContent).toMatch(/technology/i)
  })
})

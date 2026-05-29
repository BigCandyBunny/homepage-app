import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import About from './About.svelte'

describe('About component', () => {
  it('renders the company name with lowercase "just"', () => {
    const { container } = render(About)
    const heading = container.querySelector('h2')
    expect(heading).toBeTruthy()
    expect(heading!.textContent).toMatch(/just Results Consulting/)
  })

  it('does not duplicate the founder card — that now lives in the hero', () => {
    const { container } = render(About)
    expect(container.querySelector('.founder')).toBeNull()
    expect(container.querySelector('.portrait')).toBeNull()
  })

  it('renders a curated professional background summary', () => {
    const { container } = render(About)
    const summary = container.querySelector('.summary')
    expect(summary).toBeTruthy()
    // Key themes from CV — strategy, change management, technology
    expect(summary!.textContent).toMatch(/strategy/i)
    expect(summary!.textContent).toMatch(/change management/i)
  })

  it('displays the correct email address as a mailto link', () => {
    render(About)
    const emailLink = screen.getByRole('link', { name: /leif\.naess@justresults\.no/i })
    expect(emailLink).toBeTruthy()
    expect(emailLink.getAttribute('href')).toBe('mailto:leif.naess@justresults.no')
  })

  it('mentions the domain justresults.no', () => {
    const { container } = render(About)
    const summary = container.querySelector('.summary')
    expect(summary).toBeTruthy()
    expect(summary!.textContent).toMatch(/justresults\.no/)
  })

  it('renders a TechStack button (not a new-tab link) that opens the in-page BriefDialog', () => {
    const { container } = render(About)
    const btn = screen.getByRole('button', { name: /^techstack$/i }) as HTMLButtonElement
    expect(btn).toBeTruthy()
    expect(btn.tagName).toBe('BUTTON')
    expect(container.querySelectorAll('a[target="_blank"]').length).toBe(0)
  })

  it('renders a separate CV button alongside TechStack', () => {
    render(About)
    const cvBtn = screen.getByRole('button', { name: /^cv$/i }) as HTMLButtonElement
    expect(cvBtn).toBeTruthy()
    expect(cvBtn.dataset.kind).toBe('cv')
  })
})

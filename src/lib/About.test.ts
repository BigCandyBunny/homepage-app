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

  it('does not duplicate the founder block — that now lives in the hero', () => {
    const { container } = render(About)
    expect(container.querySelector('.founder')).toBeNull()
    expect(container.textContent).not.toMatch(/Leif Næss/)
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
    const contactInfo = container.querySelector('.contact-info')
    expect(contactInfo).toBeTruthy()
    expect(contactInfo!.textContent).toMatch(/justresults\.no/)
  })

  it('renders a TechStack and CV button that triggers the in-page BriefDialog', () => {
    const { container } = render(About)
    const btn = screen.getByRole('button', { name: /techstack and cv/i }) as HTMLButtonElement
    expect(btn).toBeTruthy()
    expect(btn.dataset.src).toContain('/briefs/TechStack_CV.png')
    expect(container.querySelectorAll('a[target="_blank"]').length).toBe(0)
  })
})

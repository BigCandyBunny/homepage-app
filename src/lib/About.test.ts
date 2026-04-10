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

  it('displays founder name with academic titles in smaller text', () => {
    const { container } = render(About)
    const founder = container.querySelector('.founder')
    expect(founder).toBeTruthy()
    expect(founder!.textContent).toMatch(/Leif Næss/)
    // Titles (MBA, PhD, MSc) should be present but visually smaller
    const titles = container.querySelector('.titles')
    expect(titles).toBeTruthy()
    expect(titles!.textContent).toMatch(/MBA/)
    expect(titles!.textContent).toMatch(/PhD/)
    expect(titles!.textContent).toMatch(/MSc/)
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

  it('renders a TechStack and CV link that opens the PNG in a new tab', () => {
    render(About)
    const link = screen.getByRole('link', { name: /techstack and cv/i }) as HTMLAnchorElement
    expect(link).toBeTruthy()
    expect(link.href).toContain('/briefs/TechStack_CV.png')
    expect(link.target).toBe('_blank')
  })
})

import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import ContactForm from './lib/ContactForm.svelte'

describe('Phase 5.2 — Contact form editorial restyle', () => {
  it('shows a "How we work" lead-in paragraph before the form', () => {
    const { container } = render(ContactForm)
    const section = container.querySelector('#contact')!
    const leadIn = section.querySelector('.lead-in')
    expect(leadIn, 'expected .lead-in paragraph before the form').toBeTruthy()
    const text = leadIn!.textContent ?? ''
    expect(text.toLowerCase()).toMatch(/diagnosis/)
    expect(text.toLowerCase()).toMatch(/board/)
    expect(text.toLowerCase()).toMatch(/shop floor/)
  })

  it('places the lead-in before the <form> in document order', () => {
    const { container } = render(ContactForm)
    const section = container.querySelector('#contact')!
    const children = Array.from(section.children)
    const leadInIdx = children.findIndex((c) => c.classList.contains('lead-in'))
    const formIdx = children.findIndex((c) => c.tagName === 'FORM')
    expect(leadInIdx).toBeGreaterThanOrEqual(0)
    expect(formIdx).toBeGreaterThanOrEqual(0)
    expect(leadInIdx).toBeLessThan(formIdx)
  })

  it('renders text inputs with an editorial "underlined" class hook', () => {
    const { container } = render(ContactForm)
    const form = container.querySelector('#contact form')!
    const groups = form.querySelectorAll('.form-group')
    expect(groups.length).toBeGreaterThan(0)
    for (const g of groups) {
      expect(
        g.classList.contains('underlined'),
        '.form-group missing .underlined marker',
      ).toBe(true)
    }
  })

  it('places labels above inputs with small-caps styling hook', () => {
    const { container } = render(ContactForm)
    const form = container.querySelector('#contact form')!
    const labels = form.querySelectorAll('label.field-label')
    expect(labels.length).toBeGreaterThanOrEqual(5)
  })
})

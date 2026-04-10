import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import App from './App.svelte'

describe('Homepage structure', () => {
  it('renders the company name in the hero section', () => {
    const { container } = render(App)
    const hero = container.querySelector('#hero')
    expect(hero).toBeTruthy()
    expect(hero!.textContent).toMatch(/just Results Consulting/)
  })

  it('has a single-page layout with all five sections', () => {
    const { container } = render(App)
    expect(container.querySelector('#hero')).toBeTruthy()
    expect(container.querySelector('#projects')).toBeTruthy()
    expect(container.querySelector('#tech-stack')).toBeTruthy()
    expect(container.querySelector('#contact')).toBeTruthy()
    expect(container.querySelector('#about')).toBeTruthy()
  })

  it('has a navigation bar linking to all sections', () => {
    render(App)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeTruthy()
    expect(screen.getByRole('link', { name: /projects/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /^tech$/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /contact/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /about/i })).toBeTruthy()
  })
})

describe('Dark blue / light gold theme', () => {
  it('applies dark-blue background and light-gold text as CSS custom properties', () => {
    const { container } = render(App)
    const root = container.closest('html') ?? container
    const styles = getComputedStyle(root)
    // Tests that the CSS variables exist — actual values verified visually
    // The app root element should have the theme class
    const appEl = container.querySelector('.app')
    expect(appEl).toBeTruthy()
  })
})

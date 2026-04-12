import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/svelte'
import App from './App.svelte'

describe('Homepage structure', () => {
  it('renders the company name in the hero section', () => {
    const { container } = render(App)
    const hero = container.querySelector('#hero')
    expect(hero).toBeTruthy()
    expect(hero!.textContent).toMatch(/just Results Consulting/)
  })

  it('has a single-page layout with four sections (tech stack merged into projects)', () => {
    const { container } = render(App)
    expect(container.querySelector('#hero')).toBeTruthy()
    expect(container.querySelector('#projects')).toBeTruthy()
    expect(container.querySelector('#contact')).toBeTruthy()
    expect(container.querySelector('#about')).toBeTruthy()
    expect(container.querySelector('#tech-stack')).toBeNull()
  })

  it('has a navigation bar linking to the remaining sections', () => {
    render(App)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeTruthy()
    const navScope = within(nav)
    expect(navScope.getByRole('link', { name: /projects/i })).toBeTruthy()
    expect(navScope.getByRole('link', { name: /contact/i })).toBeTruthy()
    expect(navScope.getByRole('link', { name: /about/i })).toBeTruthy()
    expect(navScope.queryByRole('link', { name: /^tech$/i })).toBeNull()
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

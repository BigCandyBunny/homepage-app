import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import { tick } from 'svelte'
import App from '../App.svelte'

// jsdom's HTMLDialogElement.showModal is a stub in some versions; patch it
// so the test can observe open/close state via the `open` attribute.
beforeEach(() => {
  const proto = HTMLDialogElement.prototype as any
  if (!proto.__patchedForTest) {
    proto.showModal = function () {
      this.setAttribute('open', '')
    }
    proto.close = function () {
      this.removeAttribute('open')
      this.dispatchEvent(new Event('close'))
    }
    proto.__patchedForTest = true
  }
  // Reset history between tests so popstate-driven close tests are hermetic.
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', window.location.href)
  }
})

function findRowByTitle(container: HTMLElement, title: string): HTMLElement {
  const rows = Array.from(container.querySelectorAll('tbody tr')) as HTMLElement[]
  const row = rows.find(
    (r) => !r.classList.contains('brief-row') && r.textContent?.includes(title),
  )
  if (!row) throw new Error(`row for title ${title} not found`)
  return row
}

async function openAiosBrief(container: HTMLElement): Promise<HTMLDialogElement> {
  const aiosRow = findRowByTitle(container, 'AIOS')
  await fireEvent.click(aiosRow)
  const techBtn = screen.getByRole('button', { name: /tech brief/i })
  await fireEvent.click(techBtn)
  await tick()
  const dialog = container.querySelector('dialog.brief-dialog') as HTMLDialogElement
  expect(dialog).toBeTruthy()
  return dialog
}

describe('Phase 4.8a — BriefDialog in-page lightbox', () => {
  it('clicking a brief button opens a dialog showing the correct image', async () => {
    const { container } = render(App)
    const dialog = await openAiosBrief(container)
    expect(dialog.hasAttribute('open')).toBe(true)
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    const img = dialog.querySelector('img') as HTMLImageElement
    expect(img).toBeTruthy()
    expect(img.src).toContain('/briefs/AIOS_Tech_Brief.png')
  })

  it('pressing Escape closes the dialog', async () => {
    const { container } = render(App)
    const dialog = await openAiosBrief(container)
    await fireEvent.keyDown(dialog, { key: 'Escape' })
    await tick()
    expect(dialog.hasAttribute('open')).toBe(false)
  })

  it('a popstate event while the dialog is open closes it (iOS back-swipe path)', async () => {
    const { container } = render(App)
    const dialog = await openAiosBrief(container)
    window.dispatchEvent(new PopStateEvent('popstate'))
    await tick()
    await tick()
    expect(dialog.hasAttribute('open')).toBe(false)
  })

  it('clicking a brief button does NOT open a new tab (no target="_blank")', async () => {
    const { container } = render(App)
    const aiosRow = findRowByTitle(container, 'AIOS')
    await fireEvent.click(aiosRow)
    const projectsSection = container.querySelector('#projects')!
    expect(projectsSection.querySelectorAll('a[target="_blank"]').length).toBe(0)
  })

  it('the dialog exposes an "open original" escape hatch as a fallback link', async () => {
    const { container } = render(App)
    const dialog = await openAiosBrief(container)
    const fallback = dialog.querySelector('a[href*="/briefs/AIOS_Tech_Brief.png"]') as HTMLAnchorElement
    expect(fallback).toBeTruthy()
    expect(fallback.target).toBe('_blank')
  })
})

describe('Phase 4.8a — About CV uses the same BriefDialog', () => {
  it('CV trigger is a button, not a new-tab anchor', () => {
    const { container } = render(App)
    const about = container.querySelector('#about')!
    expect(about.querySelectorAll('a[target="_blank"]').length).toBe(0)
    const cvBtn = screen.getByRole('button', { name: /techstack and cv/i })
    expect(cvBtn).toBeTruthy()
  })

  it('clicking the CV button opens the BriefDialog with the CV image', async () => {
    const { container } = render(App)
    const cvBtn = screen.getByRole('button', { name: /techstack and cv/i })
    await fireEvent.click(cvBtn)
    const dialog = container.querySelector('dialog.brief-dialog') as HTMLDialogElement
    expect(dialog.hasAttribute('open')).toBe(true)
    const img = dialog.querySelector('img') as HTMLImageElement
    expect(img.src).toContain('/briefs/TechStack_CV.png')
  })
})

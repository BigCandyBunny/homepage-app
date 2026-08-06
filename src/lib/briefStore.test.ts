import { describe, it, expect } from 'vitest'
import * as store from './briefStore.svelte'

// Regression guard. This module was named briefDialog.svelte.ts and imported as
// './briefDialog.svelte'. That is the correct Svelte 5 convention for a .svelte.ts
// runes module, but it collided with the sibling component BriefDialog.svelte on a
// case-insensitive filesystem: the specifier resolved to the component, every named
// export came back undefined, and BriefDialog imported itself. It surfaced as 24
// failures across four unrelated test files, none of which named the cause.
//
// Keep the module's basename distinct from any sibling component, case-insensitively.
describe('briefStore module resolution', () => {
  it('resolves to the runes module, not the BriefDialog component', () => {
    expect(store.briefState, 'briefState missing — check for a filename collision')
      .toBeDefined()
    expect(typeof store.openBrief).toBe('function')
    expect(typeof store.openBriefHtml).toBe('function')
    expect(typeof store.closeBrief).toBe('function')
    expect(typeof store.preloadBrief).toBe('function')
    expect(store).not.toHaveProperty('default')
  })

  it('starts closed with empty content', () => {
    expect(store.briefState.open).toBe(false)
    expect(store.briefState.src).toBe('')
    expect(store.briefState.html).toBe('')
    expect(store.briefState.trigger).toBeNull()
  })

  it('openBriefHtml sets html and clears src; closeBrief reverses it', () => {
    store.openBriefHtml('<p>brief</p>', 'A brief', null)
    expect(store.briefState.open).toBe(true)
    expect(store.briefState.html).toBe('<p>brief</p>')
    expect(store.briefState.src).toBe('')
    expect(store.briefState.alt).toBe('A brief')

    store.closeBrief()
    expect(store.briefState.open).toBe(false)
    expect(store.briefState.trigger).toBeNull()
  })

  it('openBrief sets src and clears html', () => {
    store.openBrief('/briefs/x.png', 'X brief', null)
    expect(store.briefState.open).toBe(true)
    expect(store.briefState.src).toBe('/briefs/x.png')
    expect(store.briefState.html).toBe('')

    store.closeBrief()
  })

  it('closeBrief on an already-closed dialog is a no-op', () => {
    expect(store.briefState.open).toBe(false)
    expect(() => store.closeBrief()).not.toThrow()
    expect(store.briefState.open).toBe(false)
  })
})

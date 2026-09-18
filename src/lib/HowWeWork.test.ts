import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import HowWeWork from './HowWeWork.svelte'

describe('HowWeWork component', () => {
  it('carries the signed Claude Code operating statement, pruned to its closing claim', () => {
    const { container } = render(HowWeWork)
    const statement = container.querySelector('figure.statement')
    expect(statement).toBeTruthy()
    const quote = statement!.querySelector('blockquote')!
    expect(quote.textContent).toMatch(
      /What I bring is decades of process and manufacturing engineering\s+judgment/,
    )
    // The operating narrative now lives in the TechStack brief, not here.
    expect(quote.querySelectorAll('p').length).toBe(1)
    expect(quote.textContent).not.toMatch(/I run Claude Code the way I would run an engineering team/)
    expect(statement!.querySelector('figcaption')!.textContent).toMatch(/Leif Næss/)
  })

  it('does not publish commit or session counts, which go stale', () => {
    const { container } = render(HowWeWork)
    const text = container.querySelector('figure.statement')?.textContent ?? ''
    expect(text).not.toMatch(/\d+\s+(commits|sessions)/)
  })

  it('names the fleet tooling the statement refers to in the stack line', () => {
    const { container } = render(HowWeWork)
    const stack = container.querySelector('.stack-line')!.textContent!
    expect(stack).toMatch(/Proxmox/)
    expect(stack).toMatch(/Ansible/)
    expect(stack).toMatch(/OpenTofu/)
  })
})

import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const indexHtml = readFileSync(resolve(root, 'index.html'), 'utf8')
const readPublic = (name: string) =>
  existsSync(resolve(root, 'public', name))
    ? readFileSync(resolve(root, 'public', name), 'utf8')
    : ''

function parseJsonLd(): Array<Record<string, unknown>> {
  const matches = [
    ...indexHtml.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ]
  return matches.map((m) => JSON.parse(m[1]))
}

describe('Phase 5.1 — SEO & agent-discovery metadata', () => {
  describe('index.html <head>', () => {
    it('declares English as the document language', () => {
      expect(indexHtml).toMatch(/<html[^>]*\slang="en"/)
    })

    it('sets a descriptive <title> naming the firm and practice', () => {
      expect(indexHtml).not.toMatch(/<title>\s*homepage-app\s*<\/title>/)
      const titleMatch = indexHtml.match(/<title>([^<]*)<\/title>/)
      expect(titleMatch).toBeTruthy()
      const title = titleMatch![1]
      expect(title).toMatch(/just Results/)
      expect(title).toMatch(/Strategy/i)
    })

    it('includes a meta description mentioning the practice areas', () => {
      const m = indexHtml.match(
        /<meta\s+name="description"\s+content="([^"]+)"/,
      )
      expect(m, 'meta description missing').toBeTruthy()
      const desc = m![1].toLowerCase()
      expect(desc).toMatch(/strategy/)
      expect(desc).toMatch(/change/)
      expect(desc).toMatch(/technology/)
    })

    it('declares a canonical URL at the justresults.no domain', () => {
      expect(indexHtml).toMatch(
        /<link\s+rel="canonical"\s+href="https:\/\/[^"]*justresults\.no[^"]*"/,
      )
    })

    it('sets Open Graph title, description, type, and url', () => {
      expect(indexHtml).toMatch(/<meta\s+property="og:title"\s+content="[^"]+"/)
      expect(indexHtml).toMatch(
        /<meta\s+property="og:description"\s+content="[^"]+"/,
      )
      expect(indexHtml).toMatch(
        /<meta\s+property="og:type"\s+content="website"/,
      )
      expect(indexHtml).toMatch(/<meta\s+property="og:url"\s+content="[^"]+"/)
    })

    it('sets a Content-Security-Policy meta tag restricting scripts', () => {
      const m = indexHtml.match(
        /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/,
      )
      expect(m, 'CSP meta missing').toBeTruthy()
      const csp = m![1]
      expect(csp).toMatch(/default-src\s+'self'/)
      expect(csp).toMatch(/script-src[^;]*'self'/)
      expect(csp).not.toMatch(/'unsafe-eval'/)
      expect(csp).toMatch(/object-src\s+'none'/)
      expect(csp).toMatch(/base-uri\s+'self'/)
    })

    it('sets a strict referrer policy', () => {
      expect(indexHtml).toMatch(
        /<meta\s+name="referrer"\s+content="strict-origin-when-cross-origin"/,
      )
    })
  })

  describe('JSON-LD structured data', () => {
    it('includes a ProfessionalService/Organization block for the firm', () => {
      const blocks = parseJsonLd()
      const org = blocks.find(
        (b) =>
          b['@type'] === 'ProfessionalService' ||
          b['@type'] === 'Organization',
      )
      expect(org, 'Organization/ProfessionalService block missing').toBeTruthy()
      expect(org!.name).toMatch(/just Results/)
      expect(String(org!.url)).toMatch(/^https:\/\/.*justresults\.no/)
      expect(String(org!.email)).toMatch(/leif\.naess@justresults\.no/)
      const services = (org!.serviceType ?? org!.knowsAbout) as unknown[]
      expect(Array.isArray(services)).toBe(true)
      const joined = (services as string[]).join(' ').toLowerCase()
      expect(joined).toMatch(/strategy/)
      expect(joined).toMatch(/change/)
    })

    it('includes a Person block for the founder with credentials', () => {
      const blocks = parseJsonLd()
      const person = blocks.find((b) => b['@type'] === 'Person')
      expect(person, 'Person block missing').toBeTruthy()
      expect(String(person!.name)).toMatch(/Leif\s+N(æ|ae)ss/)
      expect(person!.jobTitle).toBeTruthy()
      expect(Array.isArray(person!.knowsAbout)).toBe(true)
    })
  })

  describe('public/llms.txt', () => {
    const txt = readPublic('llms.txt')

    it('exists and names the firm', () => {
      expect(txt.length).toBeGreaterThan(0)
      expect(txt).toMatch(/just Results/)
    })

    it('describes the three practice areas', () => {
      const lower = txt.toLowerCase()
      expect(lower).toMatch(/strategy/)
      expect(lower).toMatch(/change/)
      expect(lower).toMatch(/technology/)
    })

    it('exposes contact email and domain', () => {
      expect(txt).toMatch(/leif\.naess@justresults\.no/)
      expect(txt).toMatch(/justresults\.no/)
    })
  })

  describe('public/robots.txt', () => {
    const txt = readPublic('robots.txt')

    it('exists', () => {
      expect(txt.length).toBeGreaterThan(0)
    })

    it('explicitly names major AI crawlers as User-agents', () => {
      for (const bot of [
        'GPTBot',
        'ClaudeBot',
        'PerplexityBot',
        'Google-Extended',
        'CCBot',
      ]) {
        expect(txt, `robots.txt missing ${bot}`).toMatch(
          new RegExp(`User-agent:\\s*${bot}`, 'i'),
        )
      }
    })
  })
})

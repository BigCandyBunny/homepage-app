import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// Same read-or-empty shape as seo.test.ts: a missing file must fail on an
// assertion about its content, not on an ENOENT thrown at import time.
const root = process.cwd()
const readPublic = (name: string) =>
  existsSync(resolve(root, 'public', name))
    ? readFileSync(resolve(root, 'public', name), 'utf8')
    : ''

const notFound = readPublic('404.html')

// Cloudflare Pages serves index.html with HTTP 200 for every unmatched path
// when the output has no 404.html. That made /wp-login.php, /.env and
// /.git/config all answer 200 with the full app shell -- a scanner never
// learns a path is invalid, and each probe costs a full uncached origin fetch.
// Shipping a 404.html switches Pages to a real 404. The page is deliberately
// asset-free: it is served to bots far more often than to people, so it must
// cost exactly one request.
describe('404 page', () => {
  it('is a complete HTML document', () => {
    expect(notFound, 'public/404.html is missing or empty').not.toBe('')
    expect(notFound).toMatch(/<!doctype html>/i)
    expect(notFound).toMatch(/<html[^>]*\slang="en"/)
  })

  it('titles itself as a not-found page', () => {
    const title = notFound.match(/<title>([^<]*)<\/title>/)
    expect(title, '<title> missing').toBeTruthy()
    expect(title![1]).toMatch(/404|not found/i)
  })

  it('tells crawlers not to index it', () => {
    expect(notFound).toMatch(
      /<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"/i,
    )
  })

  it('carries its own CSP -- index.html declares one per document', () => {
    expect(notFound).toMatch(
      /<meta\s+http-equiv="Content-Security-Policy"[^>]*default-src 'self'/i,
    )
  })

  it('costs exactly one request: no external asset of any kind', () => {
    expect(notFound, 'a <script src> would double the cost of every probe')
      .not.toMatch(/<script[^>]+src=/i)
    expect(notFound).not.toMatch(/<link[^>]+rel="stylesheet"/i)
    expect(notFound).not.toMatch(/<img[^>]/i)
    // Relative and absolute URLs alike -- no font, no bundle, nothing hashed.
    expect(notFound).not.toMatch(/\/assets\//)
  })

  it('does not load the analytics beacon -- bot probes must not enter stats', () => {
    expect(notFound).not.toMatch(/analytics\.justresults\.no/)
  })

  it('offers a human a way back to the homepage', () => {
    expect(notFound).toMatch(/<a[^>]+href="\/"/)
  })
})

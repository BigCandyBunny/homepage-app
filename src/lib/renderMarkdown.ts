const escape = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const inline = (s: string): string =>
  escape(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\bhttps?:\/\/[^\s<]+[^\s<.,;:!?)]/g, (url) => `<a href="${url}">${url}</a>`)
    .replace(
      /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
      (email) => `<a href="mailto:${email}">${email}</a>`,
    )

export function renderMarkdown(md: string): string {
  const blocks = md.replace(/\r\n/g, '\n').trim().split(/\n\n+/)
  const out: string[] = []

  for (const raw of blocks) {
    const block = raw.trim()
    if (!block) continue

    if (block === '---') {
      out.push('<hr/>')
      continue
    }

    if (block.startsWith('### ')) {
      out.push(`<h3>${inline(block.slice(4))}</h3>`)
      continue
    }
    if (block.startsWith('## ')) {
      out.push(`<h2>${inline(block.slice(3))}</h2>`)
      continue
    }
    if (block.startsWith('# ')) {
      out.push(`<h1>${inline(block.slice(2))}</h1>`)
      continue
    }

    const lines = block.split('\n')

    if (lines.every((l) => l.startsWith('>'))) {
      const text = lines.map((l) => l.replace(/^>\s?/, '')).join(' ')
      out.push(`<blockquote>${inline(text)}</blockquote>`)
      continue
    }

    if (lines.length >= 2 && lines.every((l) => l.startsWith('|'))) {
      const cells = (l: string): string[] =>
        l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim())
      const header = cells(lines[0])
      const body = lines.slice(2).map(cells)
      const thead = `<thead><tr>${header.map((h) => `<th>${inline(h)}</th>`).join('')}</tr></thead>`
      const tbody = `<tbody>${body
        .map((row) => `<tr>${row.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
        .join('')}</tbody>`
      out.push(`<table>${thead}${tbody}</table>`)
      continue
    }

    if (lines.every((l) => l.startsWith('- '))) {
      out.push(
        `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`,
      )
      continue
    }

    out.push(`<p>${inline(lines.join(' '))}</p>`)
  }

  return out.join('\n')
}

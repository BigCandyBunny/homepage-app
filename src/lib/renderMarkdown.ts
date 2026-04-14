const escape = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const inline = (s: string): string =>
  escape(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')

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

    if (block.startsWith('## ')) {
      out.push(`<h2>${inline(block.slice(3))}</h2>`)
      continue
    }
    if (block.startsWith('# ')) {
      out.push(`<h1>${inline(block.slice(2))}</h1>`)
      continue
    }

    const lines = block.split('\n')

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

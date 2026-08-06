interface BriefState {
  open: boolean
  src: string
  alt: string
  html: string
  trigger: HTMLElement | null
}

export const briefState = $state<BriefState>({
  open: false,
  src: '',
  alt: '',
  html: '',
  trigger: null,
})

export function openBrief(src: string, alt: string, trigger?: HTMLElement | null) {
  briefState.src = src
  briefState.alt = alt
  briefState.html = ''
  briefState.trigger = trigger ?? (document.activeElement as HTMLElement | null)
  briefState.open = true
}

export function openBriefHtml(html: string, alt: string, trigger?: HTMLElement | null) {
  briefState.src = ''
  briefState.alt = alt
  briefState.html = html
  briefState.trigger = trigger ?? (document.activeElement as HTMLElement | null)
  briefState.open = true
}

const preloaded = new Set<string>()

export function preloadBrief(src: string) {
  if (!src || preloaded.has(src) || typeof Image === 'undefined') return
  preloaded.add(src)
  const img = new Image()
  img.src = src
}

export function closeBrief() {
  if (!briefState.open) return
  briefState.open = false
  const t = briefState.trigger
  briefState.trigger = null
  if (t && typeof t.focus === 'function') {
    queueMicrotask(() => t.focus())
  }
}

<script lang="ts">
  import { briefState, closeBrief } from './briefDialog.svelte'

  let dialogEl: HTMLDialogElement | undefined = $state()
  let pushedHistory = false

  const MIN_SCALE = 1
  const MAX_SCALE = 6
  let scale = $state(1)
  let originX = $state(50)
  let originY = $state(50)

  function resetZoom() {
    scale = 1
    originX = 50
    originY = 50
  }

  function onImgWheel(e: WheelEvent) {
    e.preventDefault()
    const img = e.currentTarget as HTMLImageElement
    const rect = img.getBoundingClientRect()
    originX = ((e.clientX - rect.left) / rect.width) * 100
    originY = ((e.clientY - rect.top) / rect.height) * 100
    const factor = Math.exp(-e.deltaY * 0.0015)
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * factor))
  }

  function onImgDblClick() {
    resetZoom()
  }

  $effect(() => {
    if (!dialogEl) return
    if (briefState.open && !dialogEl.hasAttribute('open')) {
      resetZoom()
      dialogEl.showModal()
      if (!pushedHistory) {
        history.pushState({ briefDialog: true }, '')
        pushedHistory = true
      }
    } else if (!briefState.open && dialogEl.hasAttribute('open')) {
      dialogEl.close()
      resetZoom()
      if (pushedHistory) {
        pushedHistory = false
        if (history.state?.briefDialog) {
          history.back()
        }
      }
    }
  })

  $effect(() => {
    function onPopState() {
      if (briefState.open) {
        pushedHistory = false
        closeBrief()
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  })

  function onBackdropClick(e: MouseEvent) {
    if (e.target === dialogEl) closeBrief()
  }

  function onCancel(e: Event) {
    e.preventDefault()
    closeBrief()
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      closeBrief()
    }
  }
</script>

<dialog
  bind:this={dialogEl}
  class="brief-dialog"
  aria-modal="true"
  aria-label={briefState.alt || 'Brief viewer'}
  onclick={onBackdropClick}
  oncancel={onCancel}
  onkeydown={onKeyDown}
>
  {#if briefState.open}
    <button class="close" type="button" aria-label="Close" onclick={() => closeBrief()}>×</button>
    {#if briefState.html}
      <div class="brief-html">{@html briefState.html}</div>
    {:else}
      <img
        src={briefState.src}
        alt={briefState.alt}
        onwheel={onImgWheel}
        ondblclick={onImgDblClick}
        style="transform: scale({scale}); transform-origin: {originX}% {originY}%; cursor: {scale > 1 ? 'zoom-out' : 'zoom-in'};"
      />
      <a class="open-original" href={briefState.src} target="_blank" rel="noopener noreferrer">
        Open original ↗
      </a>
    {/if}
  {/if}
</dialog>

<style>
  .brief-dialog {
    border: none;
    background: var(--bg);
    color: var(--text);
    padding: 0;
    margin: 0;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    box-shadow: none;
  }

  .brief-dialog[open] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .brief-dialog::backdrop {
    background: var(--bg);
  }

  .brief-dialog img {
    display: block;
    max-width: 92vw;
    max-height: 88vh;
    margin: 0 auto;
    transition: transform 0.08s ease-out;
    will-change: transform;
  }

  @media (prefers-color-scheme: dark) {
    .brief-dialog img {
      filter: invert(0.85) hue-rotate(180deg);
    }
  }

  .brief-html {
    padding: 3rem 2.5rem;
    max-width: min(92vw, 900px);
    max-height: 88vh;
    overflow-y: auto;
    font-family: var(--sans);
    line-height: 1.6;
  }

  .brief-html :global(h1),
  .brief-html :global(h2) {
    color: var(--accent);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .brief-html :global(h1) {
    font-size: 1.5rem;
  }

  .brief-html :global(h2) {
    font-size: 1.15rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .brief-html :global(hr) {
    border: none;
    border-top: 1px solid var(--accent);
    opacity: 0.3;
    margin: 1.25rem 0;
  }

  .brief-html :global(p) {
    margin: 0.5rem 0;
  }

  .brief-html :global(ul) {
    margin: 0.5rem 0 0.5rem 1.25rem;
    padding: 0;
  }

  .brief-html :global(li) {
    margin: 0.25rem 0;
  }

  .brief-html :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 0.75rem 0;
    font-size: 0.9rem;
  }

  .brief-html :global(th),
  .brief-html :global(td) {
    text-align: left;
    padding: 0.4rem 0.6rem;
    border-bottom: 1px solid var(--accent);
  }

  .brief-html :global(th) {
    color: var(--accent);
    text-transform: uppercase;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
  }

  .close {
    position: absolute;
    top: 0.5rem;
    right: 0.75rem;
    background: transparent;
    border: none;
    color: var(--accent);
    font-size: 1.6rem;
    line-height: 1;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-family: var(--serif-display);
  }

  .close:hover {
    color: var(--text-h);
  }

  .open-original {
    display: block;
    text-align: right;
    padding: 0.5rem 1rem 0.75rem;
    font-family: var(--sans);
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    text-decoration: none;
    opacity: 0.75;
  }

  .open-original:hover {
    opacity: 1;
  }
</style>

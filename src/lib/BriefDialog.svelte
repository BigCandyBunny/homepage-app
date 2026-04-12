<script lang="ts">
  import { briefState, closeBrief } from './briefDialog.svelte'

  let dialogEl: HTMLDialogElement | undefined = $state()
  let pushedHistory = false

  $effect(() => {
    if (!dialogEl) return
    if (briefState.open && !dialogEl.hasAttribute('open')) {
      dialogEl.showModal()
      if (!pushedHistory) {
        history.pushState({ briefDialog: true }, '')
        pushedHistory = true
      }
    } else if (!briefState.open && dialogEl.hasAttribute('open')) {
      dialogEl.close()
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
    <img src={briefState.src} alt={briefState.alt} />
    <a class="open-original" href={briefState.src} target="_blank" rel="noopener noreferrer">
      Open original ↗
    </a>
  {/if}
</dialog>

<style>
  .brief-dialog {
    border: 1px solid var(--accent);
    background: var(--bg);
    color: var(--text);
    padding: 0;
    max-width: min(96vw, 1200px);
    max-height: 94vh;
    width: auto;
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
  }

  .brief-dialog::backdrop {
    background: rgba(10, 16, 32, 0.82);
    backdrop-filter: blur(4px);
  }

  .brief-dialog img {
    display: block;
    max-width: 100%;
    max-height: calc(94vh - 4rem);
    margin: 0 auto;
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

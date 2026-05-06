<script lang="ts">
  import { openBrief, openBriefHtml, preloadBrief } from './briefDialog.svelte'
  import { renderMarkdown } from './renderMarkdown'
  import cvMarkdown from './cv_onepager.md?raw'
  import aboutMarkdown from '../../public/llms.txt?raw'

  const cvHtml = renderMarkdown(cvMarkdown)
  // Strip the leading top-level `# heading` (the section already has an <h2>)
  // and bump remaining `## ` to `### ` so the heading hierarchy is h2 > h3.
  const aboutHtml = renderMarkdown(
    aboutMarkdown.replace(/^#\s.*\n+/, '').replace(/^## /gm, '### '),
  )
  const techStackSrc = '/briefs/tech_stack_light.png'
</script>

<section id="about" aria-labelledby="about-heading">
  <span class="section-number" aria-hidden="true">IV</span>
  <h2 id="about-heading">About just Results Consulting</h2>
  <div class="about-content">
    <div class="summary">{@html aboutHtml}</div>
    <div class="cv-link">
      <button
        type="button"
        onpointerenter={() => preloadBrief(techStackSrc)}
        onfocus={() => preloadBrief(techStackSrc)}
        onclick={(e) => openBrief(techStackSrc, 'TechStack', e.currentTarget)}
      >TechStack</button>
      <button
        type="button"
        data-kind="cv"
        onclick={(e) => openBriefHtml(cvHtml, 'CV', e.currentTarget)}
      >CV</button>
    </div>
  </div>
</section>

<style>
  #about {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem var(--section-gutter);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.25rem;
    color: var(--accent);
  }

  .summary :global(p) {
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .summary :global(blockquote) {
    margin: 0 0 1.25rem;
    padding: 0.5rem 0 0.5rem 1rem;
    border-left: 2px solid var(--accent);
    font-family: var(--serif-display);
    font-style: italic;
    font-size: 1.1rem;
    line-height: 1.55;
    color: var(--text-h);
    font-variation-settings: 'SOFT' 0, 'WONK' 0;
  }

  .summary :global(h3) {
    font-family: var(--sans);
    font-size: 0.78rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--accent);
    margin: 1.75rem 0 0.6rem;
  }

  .summary :global(ul) {
    margin: 0 0 1rem 1.25rem;
    padding: 0;
  }

  .summary :global(li) {
    margin: 0.3rem 0;
    line-height: 1.6;
  }

  .summary :global(a) {
    color: var(--accent);
    text-decoration: none;
  }

  .summary :global(a:hover) {
    text-decoration: underline;
  }

  .cv-link {
    margin-top: 1.5rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .cv-link button {
    font-family: var(--sans);
    background: transparent;
    color: var(--accent);
    font-size: 0.72rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 0.45rem 0.95rem;
    border: 1px solid var(--accent);
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }

  .cv-link button:hover {
    background: var(--accent);
    color: var(--bg);
  }

  .cv-link button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
</style>

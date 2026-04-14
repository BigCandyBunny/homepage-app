<script lang="ts">
  import { openBrief, openBriefHtml, preloadBrief } from './briefDialog.svelte'
  import { renderMarkdown } from './renderMarkdown'
  import cvMarkdown from './cv_onepager.md?raw'

  const cvHtml = renderMarkdown(cvMarkdown)
  const techStackSrc = '/briefs/tech_stack.png'
</script>

<section id="about" aria-labelledby="about-heading">
  <span class="section-number" aria-hidden="true">IV</span>
  <h2 id="about-heading">About just Results Consulting</h2>
  <div class="about-content">
    <div class="summary">
      <p>
        just Results Consulting a.s provides strategy and change management
        consultancy to industrial clients, educational institutions, and
        government organizations. With over 40 years of expertise bridging
        technology and commercial success, we deliver results across global
        industrial, academic, and public sectors.
      </p>
      <p>
        Our experience spans corporate strategy facilitation, large-scale
        organizational change management, lean manufacturing implementation,
        and technology-driven innovation — from corporate turnarounds and
        merger integrations to national cluster development initiatives.
      </p>
    </div>
    <div class="cv-link">
      <button
        type="button"
        data-src={techStackSrc}
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
    <div class="contact-info">
      <a href="mailto:leif.naess@justresults.no">leif.naess@justresults.no</a>
      <span class="domain">justresults.no</span>
    </div>
  </div>
</section>

<style>
  #about {
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem var(--section-gutter);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--accent);
  }

  .summary p {
    line-height: 1.7;
    margin-bottom: 1rem;
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

  .contact-info {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .contact-info a {
    color: var(--accent);
    text-decoration: none;
  }

  .contact-info a:hover {
    text-decoration: underline;
  }

  .domain {
    opacity: 0.6;
    font-size: 0.9rem;
  }
</style>

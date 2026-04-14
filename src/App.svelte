<script lang="ts">
  import ProjectList from './lib/ProjectList.svelte'
  import ContactForm from './lib/ContactForm.svelte'
  import About from './lib/About.svelte'
  import BriefDialog from './lib/BriefDialog.svelte'
  import { projects } from './lib/data/projects'
</script>

<div class="app">
  <nav>
    <a href="#hero" class="brand-block">
      <span class="brand">just Results</span>
      <span class="brand-tagline">Strategy · Change · Technology</span>
    </a>
    <div class="nav-links">
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
  </nav>

  <main>
    <section id="hero" aria-labelledby="hero-heading">
      <span class="section-number" aria-hidden="true">I</span>
      <div class="hero-grid">
        <aside class="founder-card">
          <div class="portrait" aria-label="Leif Næss — portrait forthcoming">
            <span class="monogram">LN</span>
          </div>
          <div class="founder-meta">
            <p class="founder-name">Leif Næss</p>
            <p class="founder-titles">MBA, PhD, MSc</p>
            <p class="founder-role">Founder &amp; CEO</p>
          </div>
        </aside>

        <div class="hero-copy">
          <p class="eyebrow">just Results Consulting</p>
          <h1 id="hero-heading">Strategy, change and technology — delivered as one practice.</h1>
          <p class="positioning">
            Four decades of advising boards and shop floors alike, with equal
            depth in process &amp; energy and discrete manufacturing — a rare
            pairing on the same desk.
          </p>

          <dl class="stats">
            <div class="stat">
              <dt>Experience</dt>
              <dd>40+ years</dd>
            </div>
            <div class="stat">
              <dt>Practice</dt>
              <dd>strategy · change · technology</dd>
            </div>
            <div class="stat">
              <dt>Sectors</dt>
              <dd>process · energy · manufacturing</dd>
            </div>
          </dl>

          <a class="cta" href="#projects">See recent projects →</a>
        </div>
      </div>
    </section>

    <ProjectList {projects} />
    <ContactForm />
    <About />
  </main>

  <BriefDialog />
</div>

<style>
  .app {
    min-height: 100vh;
  }

  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 2rem;
    background: var(--bg-nav, rgba(15, 23, 50, 0.92));
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border, rgba(255,255,255,0.08));
  }

  .brand-block {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    text-decoration: none;
    line-height: 1.1;
  }

  .brand {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: 1.4rem;
    color: var(--accent);
    letter-spacing: -0.01em;
    font-variation-settings: 'SOFT' 0, 'WONK' 0, 'opsz' 144;
  }

  .brand-tagline {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-variant-caps: all-small-caps;
    color: var(--text);
    opacity: 0.65;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    color: var(--text);
    text-decoration: none;
    font-size: 0.9rem;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .nav-links a:hover {
    opacity: 1;
    color: var(--accent);
  }

  #hero {
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem var(--section-gutter) 4rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(220px, 280px) 1fr;
    gap: 3.5rem;
    align-items: start;
  }

  .founder-card {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border-top: 1px solid var(--accent);
    padding-top: 1.25rem;
  }

  .portrait {
    aspect-ratio: 1 / 1;
    width: 100%;
    display: grid;
    place-items: center;
    border: 1px solid var(--accent);
    background:
      radial-gradient(120% 120% at 30% 20%, rgba(232, 213, 163, 0.08), transparent 60%),
      var(--bg-elevated, rgba(38, 52, 88, 0.6));
  }

  .monogram {
    font-family: var(--serif-display);
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: 400;
    color: var(--accent);
    letter-spacing: -0.02em;
    font-variation-settings: 'SOFT' 0, 'WONK' 0;
  }

  .founder-meta {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .founder-name {
    font-family: var(--serif-display);
    font-size: 1.25rem;
    color: var(--text-h);
    font-variation-settings: 'SOFT' 0, 'WONK' 0;
  }

  .founder-titles {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.65;
  }

  .founder-role {
    font-size: 0.85rem;
    opacity: 0.75;
    margin-top: 0.4rem;
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    max-width: 52ch;
  }

  .eyebrow {
    font-size: 0.75rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    opacity: 0.85;
  }

  h1 {
    font-family: var(--serif-display);
    font-size: clamp(2rem, 4.2vw, 3.4rem);
    line-height: 1.08;
    font-weight: 400;
    color: var(--accent);
    letter-spacing: -0.015em;
    font-variation-settings: 'SOFT' 0, 'WONK' 0, 'opsz' 144;
    margin: 0;
  }

  .positioning {
    font-size: 1.05rem;
    line-height: 1.6;
    opacity: 0.82;
    max-width: 48ch;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
    margin: 0;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .stat dt {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.55;
  }

  .stat dd {
    margin: 0;
    font-family: var(--serif-display);
    font-size: 1.05rem;
    color: var(--text-h);
    font-variation-settings: 'SOFT' 0, 'WONK' 0;
    line-height: 1.25;
  }

  .cta {
    align-self: flex-start;
    font-size: 0.9rem;
    letter-spacing: 0.04em;
    color: var(--accent);
    text-decoration: none;
    padding: 0.6rem 0;
    border-bottom: 1px solid var(--accent);
    transition: transform 0.2s ease, letter-spacing 0.2s ease;
  }

  .cta:hover {
    letter-spacing: 0.08em;
  }

  @media (max-width: 860px) {
    #hero {
      padding: 3rem var(--section-gutter) 2.5rem;
    }

    .hero-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .founder-card {
      flex-direction: row;
      align-items: center;
      gap: 1.25rem;
    }

    .portrait {
      width: 96px;
      flex-shrink: 0;
    }

    .stats {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  @media (max-width: 640px) {
    nav {
      padding: 0.75rem 1rem;
    }

    .nav-links {
      gap: 1rem;
    }
  }
</style>

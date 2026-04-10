<script lang="ts">
  import ProjectList from './lib/ProjectList.svelte'
  import TechStack from './lib/TechStack.svelte'
  import ContactForm from './lib/ContactForm.svelte'
  import About from './lib/About.svelte'
  import { projects } from './lib/data/projects'
</script>

<div class="app">
  <nav>
    <a href="#hero" class="brand">jRC</a>
    <div class="nav-links">
      <a href="#projects">Projects</a>
      <a href="#tech-stack">Tech</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
  </nav>

  <section id="hero">
    <h1>just Results Consulting</h1>
    <p class="tagline">Strategy, Change Management & Technology</p>
  </section>

  <ProjectList {projects} />
  <TechStack {projects} />
  <ContactForm />
  <About />
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

  .brand {
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--accent);
    text-decoration: none;
    letter-spacing: 0.02em;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    text-align: center;
    padding: 4rem 2rem;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--accent);
  }

  .tagline {
    font-size: 1.15rem;
    opacity: 0.65;
    letter-spacing: 0.03em;
  }

  @media (max-width: 640px) {
    nav {
      padding: 0.75rem 1rem;
    }

    .nav-links {
      gap: 1rem;
    }

    h1 {
      font-size: 1.8rem;
    }
  }
</style>

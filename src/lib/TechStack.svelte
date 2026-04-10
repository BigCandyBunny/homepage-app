<script lang="ts">
  interface TechProject {
    title: string
    techStack: {
      languages: string[]
      databases: string[]
      visualization: string[]
      agenticBehaviour: string
      clientPreparations: string
    }
  }

  interface Props {
    projects: TechProject[]
  }

  let { projects }: Props = $props()
</script>

<section id="tech-stack">
  <h2>Technology & Approach</h2>
  <div class="tech-grid">
    {#each projects as project}
      <div class="tech-card">
        <h3>{project.title}</h3>
        <dl>
          <dt>Languages</dt>
          <dd>{project.techStack.languages.join(', ')}</dd>

          <dt>Databases</dt>
          <dd>{project.techStack.databases.join(', ')}</dd>

          <dt>Visualization</dt>
          <dd>{project.techStack.visualization.join(', ')}</dd>

          <dt>Agentic Behaviour</dt>
          <dd>{project.techStack.agenticBehaviour}</dd>

          <dt>Client Preparations</dt>
          <dd>{project.techStack.clientPreparations}</dd>
        </dl>
      </div>
    {/each}
  </div>
</section>

<style>
  #tech-stack {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--accent);
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .tech-card {
    border: 1px solid var(--border, rgba(255,255,255,0.1));
    border-radius: 8px;
    padding: 1.25rem;
    background: var(--bg-elevated, rgba(255,255,255,0.03));
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--accent);
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.4rem 1rem;
    font-size: 0.9rem;
  }

  dt {
    font-weight: 600;
    opacity: 0.7;
    white-space: nowrap;
  }

  dd {
    margin: 0;
    line-height: 1.4;
  }
</style>

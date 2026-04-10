<script lang="ts">
  import type { Project } from './data/projects'

  interface Props {
    projects: Project[]
  }

  const briefProjects: Record<string, string> = {
    'AIOS': 'AIOS',
    'CatalyzeAI': 'CatalyzeAI',
  }

  let { projects }: Props = $props()

  const displayProjects = $derived(projects.slice(0, 10))

  let selectedProject = $state<string | null>(null)

  function handleRowClick(title: string) {
    if (title in briefProjects) {
      selectedProject = selectedProject === title ? null : title
    }
  }
</script>

<section id="projects">
  <h2>Recent Projects</h2>
  <div class="project-list-scroll">
    <table>
      <thead>
        <tr>
          <th>Project</th>
          <th>Business Impact</th>
          <th>Audience</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {#each displayProjects as project}
          <tr
            class:clickable={project.title in briefProjects}
            onclick={() => handleRowClick(project.title)}
          >
            <td class="title">{project.title}</td>
            <td>{project.businessImpact}</td>
            <td>{project.audience}</td>
            <td>{project.description}</td>
          </tr>
          {#if selectedProject === project.title}
            <tr class="brief-row">
              <td colspan="4">
                <div class="brief-links">
                  <a href="/briefs/{briefProjects[project.title]}_Tech_Brief.png" target="_blank" rel="noopener noreferrer">Tech Brief</a>
                  <a href="/briefs/{briefProjects[project.title]}_Exec_Brief.png" target="_blank" rel="noopener noreferrer">Executive Brief</a>
                </div>
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  #projects {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--accent);
  }

  .project-list-scroll {
    max-height: 500px;
    overflow-y: auto;
    border: 1px solid var(--border, rgba(255,255,255,0.1));
    border-radius: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    position: sticky;
    top: 0;
    background: var(--bg-elevated, rgba(20, 30, 60, 0.95));
    z-index: 1;
  }

  th {
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.7;
    border-bottom: 1px solid var(--border, rgba(255,255,255,0.1));
  }

  td {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    line-height: 1.5;
    border-bottom: 1px solid var(--border, rgba(255,255,255,0.05));
    vertical-align: top;
  }

  .title {
    font-weight: 600;
    white-space: nowrap;
    color: var(--accent);
  }

  tbody tr:hover {
    background: rgba(255,255,255,0.03);
  }

  .clickable {
    cursor: pointer;
  }

  .brief-row td {
    padding: 0;
    border-bottom: 1px solid var(--border, rgba(255,255,255,0.05));
  }

  .brief-links {
    display: flex;
    gap: 1.5rem;
    padding: 0.5rem 1rem;
    background: rgba(255,255,255,0.02);
  }

  .brief-links a {
    color: var(--accent);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    border: 1px solid var(--accent);
    border-radius: 4px;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: var(--accent);
      color: var(--bg, #1e2a4a);
    }
  }
</style>

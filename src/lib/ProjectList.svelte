<script lang="ts">
  import type { Project } from './data/projects'
  import { openBrief, preloadBrief } from './briefDialog.svelte'

  interface Props {
    projects: Project[]
  }

  const briefProjects: Record<string, string> = {
    'Practice Cockpit': 'practice_cockpit_system',
    'Pocket Polymath': 'pocket_polymath_system',
    'CatalyzeAI': 'catalyze_ai_system',
    'Trusted Operational AI': 'trusted_operational_ai_system',
    'Guardrails for Agentic AI': 'guardrails_for_agentic_ai_playbook',
  }

  let { projects }: Props = $props()

  const displayProjects = $derived(projects.slice(0, 10))

  let selectedProject = $state<string | null>(null)

  function toggle(title: string) {
    selectedProject = selectedProject === title ? null : title
  }

  function preloadRow(title: string) {
    if (!(title in briefProjects)) return
    preloadBrief(`/briefs/${briefProjects[title]}.png`)
  }

  function handleRowKey(e: KeyboardEvent, title: string) {
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(title)
    }
  }
</script>

<section id="projects" aria-labelledby="projects-heading">
  <span class="section-number" aria-hidden="true">II</span>
  <h2 id="projects-heading">Recent Projects</h2>
  <div class="project-list-scroll" tabindex="-1">
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
          {@const isFeatured = project.title in briefProjects}
          <tr
            class="clickable"
            onclick={() => toggle(project.title)}
            onkeydown={(e) => handleRowKey(e, project.title)}
            onpointerenter={() => preloadRow(project.title)}
            onfocus={() => preloadRow(project.title)}
            role="button"
            tabindex="0"
            aria-expanded={selectedProject === project.title}
          >
            <td class="title">{project.title}</td>
            <td>{project.businessImpact}</td>
            <td>{project.audience}</td>
            <td>{project.description}</td>
          </tr>
          {#if selectedProject === project.title}
            <tr class="brief-row">
              <td colspan="4">
                <div class="detail">
                  <dl class="tech-stack">
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
                  {#if isFeatured}
                    <div class="brief-links">
                      <button
                        type="button"
                        data-src="/briefs/{briefProjects[project.title]}.png"
                        onpointerenter={() => preloadBrief(`/briefs/${briefProjects[project.title]}.png`)}
                        onfocus={() => preloadBrief(`/briefs/${briefProjects[project.title]}.png`)}
                        onclick={(e) => openBrief(
                          `/briefs/${briefProjects[project.title]}.png`,
                          `${project.title} — System overview`,
                          e.currentTarget,
                        )}
                      >System overview</button>
                    </div>
                  {/if}
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
    padding: 2rem var(--section-gutter);
  }

  h2 {
    font-size: clamp(1.5rem, 2.6vw, 2rem);
    font-weight: 400;
    margin-bottom: 1.25rem;
    color: var(--accent);
    letter-spacing: -0.01em;
    font-variation-settings: 'SOFT' 0, 'WONK' 0, 'opsz' 144;
  }

  .project-list-scroll {
    max-height: 540px;
    overflow-y: auto;
    border-top: 1px solid var(--accent);
    border-bottom: 1px solid var(--accent);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    position: sticky;
    top: 0;
    background: var(--bg);
    z-index: 1;
  }

  th {
    text-align: left;
    padding: 1rem 1.25rem;
    font-family: var(--sans);
    font-size: 0.68rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--accent);
    opacity: 0.8;
    border-bottom: 1px solid var(--border);
  }

  td {
    padding: 1rem 1.25rem;
    font-size: 0.92rem;
    line-height: 1.55;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }

  .title {
    font-family: var(--serif-display);
    font-style: italic;
    font-weight: 400;
    font-size: 1.05rem;
    white-space: nowrap;
    color: var(--text-h);
    font-variation-settings: 'SOFT' 0, 'WONK' 0;
  }

  tbody tr {
    transition: background 0.2s ease;
  }

  tbody tr:hover td {
    background: rgba(232, 213, 163, 0.04);
  }

  tbody tr:focus-visible {
    outline: none;
  }

  tbody tr:focus-visible td {
    background: rgba(232, 213, 163, 0.1);
  }

  tbody tr:focus-visible td:first-child {
    box-shadow: inset 3px 0 0 var(--accent);
  }

  .clickable {
    cursor: pointer;
  }

  .clickable .title::after {
    content: '→';
    display: inline-block;
    margin-left: 0.5rem;
    opacity: 0.5;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .clickable[aria-expanded="true"] .title::after {
    transform: rotate(90deg);
    opacity: 1;
  }

  .brief-row td {
    padding: 0;
    border-bottom: 1px solid var(--border);
    background: rgba(232, 213, 163, 0.03);
  }

  .detail {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem 1.25rem 1.5rem;
  }

  .tech-stack {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 0.5rem 1.5rem;
    margin: 0;
    font-size: 0.85rem;
  }

  .tech-stack dt {
    font-family: var(--sans);
    font-size: 0.66rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    opacity: 0.75;
    padding-top: 0.15rem;
  }

  .tech-stack dd {
    margin: 0;
    line-height: 1.5;
    color: var(--text);
  }

  .brief-links {
    display: flex;
    gap: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
  }

  .brief-links button {
    font-family: var(--sans);
    color: var(--accent);
    background: transparent;
    font-size: 0.72rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    padding: 0.4rem 0.85rem;
    border: 1px solid var(--accent);
    cursor: pointer;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: var(--accent);
      color: var(--bg);
    }

    &:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  }
</style>

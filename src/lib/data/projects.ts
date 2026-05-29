export interface Project {
  title: string
  businessImpact: string
  audience: string
  description: string
  techStack: {
    languages: string[]
    databases: string[]
    visualization: string[]
    agenticBehaviour: string
    clientPreparations: string
  }
}

export const projects: Project[] = [
  {
    title: 'Practice Cockpit',
    businessImpact: 'Replaces 10–15 min of manual triage with a 5-second cockpit glance and one morning briefing',
    audience: 'Solo operators and small-practice consultants making many high-stakes decisions per week',
    description: 'Operating substrate that turns calendar, mail, tasks, and decisions into a single dated brief and a phone-installable cockpit.',
    techStack: {
      languages: ['Python', 'TypeScript'],
      databases: ['Plain Markdown in version control', 'Connections registry'],
      visualization: ['Status board · Deviations panel · Sparring queue · Embedded brief'],
      agenticBehaviour: 'Two-stage answering chain — curated knowledge first, then verified live web; mechanical URL probes on every citation.',
      clientPreparations: 'Self-hosted enterprise-grade server, tailnet-only ingress by default, 1–2 hours/week brief→decide→log rhythm.',
    },
  },
  {
    title: 'Pocket Polymath',
    businessImpact: 'Personal answering assistant — every claim traceable to your own article or a verified URL',
    audience: 'Senior professionals, consultants, analysts who must cite sources and defend conclusions',
    description: 'Private knowledge hub plus verified live web search, reachable from phone, browser, or programmatic API.',
    techStack: {
      languages: ['Python'],
      databases: ['Plain Markdown corpus', 'Relational metadata'],
      visualization: ['Side-by-side panes: your knowledge · live web', 'Per-citation verification marks'],
      agenticBehaviour: 'Two-stage chain — your knowledge first, then live web anchored on stage 1; URLs HTTP-probed in parallel.',
      clientPreparations: 'Captured reading and notes that earn their place in the corpus; self-hosted hardware; tailnet-only by default.',
    },
  },
  {
    title: 'CatalyzeAI',
    businessImpact: 'Turns internal documents into operational intelligence; cycle time, consistency, onboarding, risk and retention measurably improve',
    audience: 'Small- and medium-sized enterprises in process, energy, and manufacturing',
    description: 'On-premises platform that turns a company’s document estate into evidence-backed answers, cross-document comparisons, and a structured innovation shortlist.',
    techStack: {
      languages: ['Python'],
      databases: ['On-premises document corpus', 'Knowledge graph with multi-ontology classification'],
      visualization: ['Interactive knowledge-graph navigation', 'A · B · C workspaces — Calibration · Single run · Ensemble comparison'],
      agenticBehaviour: 'Scout · Maverick · Skeptic · Synthesizer pipeline with a Discovery Stance dial (conservative ↔ exploratory).',
      clientPreparations: 'Repository-owner role, 3–5 benchmark prompts, on-premises hardware; bundled ontologies — ISO 15926-14, IOF Core, CORA, SSN/SOSA; customer OWL imports supported.',
    },
  },
]

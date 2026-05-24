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
    title: 'CatalyzeAI',
    businessImpact: 'Automated document analysis reducing review time by 80%',
    audience: 'Legal and compliance teams',
    description: 'AI-powered document search and analysis tool',
    techStack: {
      languages: ['Python', 'TypeScript'],
      databases: ['PostgreSQL'],
      visualization: ['Plotly'],
      agenticBehaviour: 'RAG-based document retrieval',
      clientPreparations: 'Document corpus in PDF format',
    },
  },
  {
    title: 'AIOS',
    businessImpact: 'Unified AI operations platform for enterprise workflows',
    audience: 'Technology teams and decision makers',
    description: 'AI operating system for orchestrating intelligent agents',
    techStack: {
      languages: ['Python', 'TypeScript'],
      databases: ['SurrealDB'],
      visualization: ['Flet'],
      agenticBehaviour: 'Multi-agent orchestration',
      clientPreparations: 'API access and workflow documentation',
    },
  },
  {
    title: 'AIOS Context Hub',
    businessImpact: 'Centralized knowledge management across projects',
    audience: 'Consulting teams and project stakeholders',
    description: 'Context and knowledge management system for AI agents',
    techStack: {
      languages: ['Python'],
      databases: ['SurrealDB'],
      visualization: ['Markdown'],
      agenticBehaviour: 'Context-aware information retrieval',
      clientPreparations: 'Existing documentation and project artifacts',
    },
  },
]

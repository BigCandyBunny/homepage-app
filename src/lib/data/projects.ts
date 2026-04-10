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

// Placeholder data — replace with real content from GitHub repos
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
  {
    title: 'Project C',
    businessImpact: 'Project C business impact',
    audience: 'Project C users',
    description: 'Project C characteristics and features',
    techStack: {
      languages: ['Python'],
      databases: ['SurrealDB'],
      visualization: ['D3.js'],
      agenticBehaviour: 'Autonomous anomaly detection',
      clientPreparations: 'API access to trading systems',
    },
  },
  {
    title: 'Project D',
    businessImpact: 'Project D business impact',
    audience: 'Project D users',
    description: 'Project D characteristics and features',
    techStack: {
      languages: ['Python'],
      databases: ['PostgreSQL'],
      visualization: ['Plotly', 'Matplotlib'],
      agenticBehaviour: 'Automated signal generation',
      clientPreparations: 'Historical market data access',
    },
  },
]

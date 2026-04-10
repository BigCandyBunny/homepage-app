import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import TechStack from './TechStack.svelte'

const mockProjects = [
  {
    title: 'Knowledge Scout',
    techStack: {
      languages: ['Python', 'TypeScript'],
      databases: ['PostgreSQL'],
      visualization: ['Plotly'],
      agenticBehaviour: 'RAG-based document retrieval',
      clientPreparations: 'Document corpus in PDF format',
    },
  },
]

describe('TechStack component', () => {
  it('renders a section with tech stack heading', () => {
    render(TechStack, { props: { projects: mockProjects } })
    expect(screen.getByRole('heading', { name: /tech/i })).toBeTruthy()
  })

  it('displays programming languages', () => {
    render(TechStack, { props: { projects: mockProjects } })
    expect(screen.getByText(/Python/)).toBeTruthy()
    expect(screen.getByText(/TypeScript/)).toBeTruthy()
  })

  it('displays databases', () => {
    render(TechStack, { props: { projects: mockProjects } })
    expect(screen.getByText(/PostgreSQL/)).toBeTruthy()
  })

  it('displays visualization tools', () => {
    render(TechStack, { props: { projects: mockProjects } })
    expect(screen.getByText(/Plotly/)).toBeTruthy()
  })

  it('displays agentic behaviour info', () => {
    render(TechStack, { props: { projects: mockProjects } })
    expect(screen.getByText(/RAG-based document retrieval/)).toBeTruthy()
  })

  it('displays client preparation requirements', () => {
    render(TechStack, { props: { projects: mockProjects } })
    expect(screen.getByText(/Document corpus in PDF format/)).toBeTruthy()
  })
})

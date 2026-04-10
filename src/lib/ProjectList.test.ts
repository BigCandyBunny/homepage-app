import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import { fireEvent } from '@testing-library/svelte'
import ProjectList from './ProjectList.svelte'

const mockProjects = [
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
]

describe('ProjectList component', () => {
  it('renders a vertically scrollable table of projects', () => {
    const { container } = render(ProjectList, { props: { projects: mockProjects } })
    const table = container.querySelector('table')
    expect(table).toBeTruthy()
  })

  it('displays project titles', () => {
    render(ProjectList, { props: { projects: mockProjects } })
    expect(screen.getByText('CatalyzeAI')).toBeTruthy()
    expect(screen.getByText('Project C')).toBeTruthy()
  })

  it('displays business impact for each project', () => {
    render(ProjectList, { props: { projects: mockProjects } })
    expect(screen.getByText(/reducing review time by 80%/)).toBeTruthy()
    expect(screen.getByText(/Real-time trade monitoring/)).toBeTruthy()
  })

  it('displays audience for each project', () => {
    render(ProjectList, { props: { projects: mockProjects } })
    expect(screen.getByText(/Legal and compliance/)).toBeTruthy()
    expect(screen.getByText(/Portfolio managers/)).toBeTruthy()
  })

  it('displays short description for each project', () => {
    render(ProjectList, { props: { projects: mockProjects } })
    expect(screen.getByText(/AI-powered document search/)).toBeTruthy()
    expect(screen.getByText(/Trade flow analysis/)).toBeTruthy()
  })

  it('limits display to max 10 projects', () => {
    const manyProjects = Array.from({ length: 15 }, (_, i) => ({
      ...mockProjects[0],
      title: `Project ${i + 1}`,
    }))
    const { container } = render(ProjectList, { props: { projects: manyProjects } })
    const rows = container.querySelectorAll('tbody tr')
    expect(rows.length).toBeLessThanOrEqual(10)
  })

  it('wraps table in a scrollable container with fixed height', () => {
    const { container } = render(ProjectList, { props: { projects: mockProjects } })
    const scrollContainer = container.querySelector('.project-list-scroll')
    expect(scrollContainer).toBeTruthy()
  })

  describe('brief selection for AIOS and CatalyzeAI', () => {
    it('shows Tech Brief and Executive Brief links after clicking the AIOS row', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const aiosRow = container.querySelector('tbody tr:first-child') as HTMLElement
      await fireEvent.click(aiosRow)

      const techLink = screen.getByRole('link', { name: /tech brief/i })
      const execLink = screen.getByRole('link', { name: /executive brief/i })
      expect(techLink).toBeTruthy()
      expect(execLink).toBeTruthy()
    })

    it('shows Tech Brief and Executive Brief links after clicking the CatalyzeAI row', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr')
      // CatalyzeAI is the second row
      await fireEvent.click(rows[1] as HTMLElement)

      const techLink = screen.getByRole('link', { name: /tech brief/i })
      const execLink = screen.getByRole('link', { name: /executive brief/i })
      expect(techLink).toBeTruthy()
      expect(execLink).toBeTruthy()
    })

    it('links point to the correct PNG URLs and open in a new tab', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const aiosRow = container.querySelector('tbody tr:first-child') as HTMLElement
      await fireEvent.click(aiosRow)

      const techLink = screen.getByRole('link', { name: /tech brief/i }) as HTMLAnchorElement
      const execLink = screen.getByRole('link', { name: /executive brief/i }) as HTMLAnchorElement

      expect(techLink.href).toContain('/briefs/AIOS_Tech_Brief.png')
      expect(execLink.href).toContain('/briefs/AIOS_Exec_Brief.png')
      expect(techLink.target).toBe('_blank')
      expect(execLink.target).toBe('_blank')
    })

    it('CatalyzeAI links point to CatalyzeAI brief PNGs', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr')
      await fireEvent.click(rows[1] as HTMLElement)

      const techLink = screen.getByRole('link', { name: /tech brief/i }) as HTMLAnchorElement
      const execLink = screen.getByRole('link', { name: /executive brief/i }) as HTMLAnchorElement

      expect(techLink.href).toContain('/briefs/CatalyzeAI_Tech_Brief.png')
      expect(execLink.href).toContain('/briefs/CatalyzeAI_Exec_Brief.png')
    })

    it('does not show brief links for non-featured projects', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      // Project C is the third row — not a featured project
      const rows = container.querySelectorAll('tbody tr')
      await fireEvent.click(rows[2] as HTMLElement)

      const links = container.querySelectorAll('a[target="_blank"]')
      expect(links.length).toBe(0)
    })

    it('clicking a different featured row replaces the previous brief links', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr')

      // Click AIOS first
      await fireEvent.click(rows[0] as HTMLElement)
      let techLink = screen.getByRole('link', { name: /tech brief/i }) as HTMLAnchorElement
      expect(techLink.href).toContain('AIOS')

      // Click CatalyzeAI
      await fireEvent.click(rows[1] as HTMLElement)
      techLink = screen.getByRole('link', { name: /tech brief/i }) as HTMLAnchorElement
      expect(techLink.href).toContain('CatalyzeAI')

      // Only one set of links visible
      const allBriefLinks = container.querySelectorAll('a[target="_blank"]')
      expect(allBriefLinks.length).toBe(2)
    })
  })
})

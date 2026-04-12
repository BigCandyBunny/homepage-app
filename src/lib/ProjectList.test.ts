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
    it('shows Tech Brief and Executive Brief buttons after clicking the AIOS row', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const aiosRow = container.querySelector('tbody tr:first-child') as HTMLElement
      await fireEvent.click(aiosRow)

      const techBtn = screen.getByRole('button', { name: /tech brief/i })
      const execBtn = screen.getByRole('button', { name: /executive brief/i })
      expect(techBtn).toBeTruthy()
      expect(execBtn).toBeTruthy()
    })

    it('shows Tech Brief and Executive Brief buttons after clicking the CatalyzeAI row', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr')
      await fireEvent.click(rows[1] as HTMLElement)

      const techBtn = screen.getByRole('button', { name: /tech brief/i })
      const execBtn = screen.getByRole('button', { name: /executive brief/i })
      expect(techBtn).toBeTruthy()
      expect(execBtn).toBeTruthy()
    })

    it('brief buttons carry the correct PNG path via data-src and do not open a new tab', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const aiosRow = container.querySelector('tbody tr:first-child') as HTMLElement
      await fireEvent.click(aiosRow)

      const techBtn = screen.getByRole('button', { name: /tech brief/i }) as HTMLButtonElement
      const execBtn = screen.getByRole('button', { name: /executive brief/i }) as HTMLButtonElement

      expect(techBtn.dataset.src).toContain('/briefs/AIOS_Tech_Brief.png')
      expect(execBtn.dataset.src).toContain('/briefs/AIOS_Exec_Brief.png')
      expect(container.querySelectorAll('a[target="_blank"]').length).toBe(0)
    })

    it('CatalyzeAI buttons carry CatalyzeAI brief PNG paths', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr')
      await fireEvent.click(rows[1] as HTMLElement)

      const techBtn = screen.getByRole('button', { name: /tech brief/i }) as HTMLButtonElement
      const execBtn = screen.getByRole('button', { name: /executive brief/i }) as HTMLButtonElement

      expect(techBtn.dataset.src).toContain('/briefs/CatalyzeAI_Tech_Brief.png')
      expect(execBtn.dataset.src).toContain('/briefs/CatalyzeAI_Exec_Brief.png')
    })

    it('does not show brief buttons for non-featured projects', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr')
      await fireEvent.click(rows[2] as HTMLElement)

      const briefBtns = container.querySelectorAll('button[data-src]')
      expect(briefBtns.length).toBe(0)
    })

    it('every project row is keyboard-operable (all rows expand to show tech stack)', () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr:not(.brief-row)') as NodeListOf<HTMLElement>
      for (const row of rows) {
        expect(row.getAttribute('role')).toBe('button')
        expect(row.getAttribute('tabindex')).toBe('0')
        expect(row.getAttribute('aria-expanded')).toBe('false')
      }
    })

    it('expanding a non-featured row reveals its tech stack but NO brief buttons', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr:not(.brief-row)') as NodeListOf<HTMLElement>
      const tradeFlowRow = rows[2]
      await fireEvent.click(tradeFlowRow)
      const detail = container.querySelector('.brief-row') as HTMLElement
      expect(detail).toBeTruthy()
      expect(detail.textContent).toMatch(/D3\.js/)
      expect(detail.textContent).toMatch(/Autonomous anomaly detection/)
      expect(detail.querySelectorAll('button[data-src]').length).toBe(0)
    })

    it('expanding a featured row reveals BOTH tech stack AND brief buttons', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr:not(.brief-row)') as NodeListOf<HTMLElement>
      const aiosRow = rows[0]
      await fireEvent.click(aiosRow)
      const detail = container.querySelector('.brief-row') as HTMLElement
      expect(detail).toBeTruthy()
      expect(detail.textContent).toMatch(/Python/)
      expect(detail.textContent).toMatch(/SurrealDB/)
      expect(detail.textContent).toMatch(/Multi-agent orchestration/)
      expect(detail.querySelectorAll('button[data-src]').length).toBe(2)
    })

    it('pressing Enter on a clickable row toggles the brief row', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const aiosRow = container.querySelector('tbody tr:first-child') as HTMLElement
      await fireEvent.keyDown(aiosRow, { key: 'Enter' })
      expect(screen.getByRole('button', { name: /tech brief/i })).toBeTruthy()
      expect(aiosRow.getAttribute('aria-expanded')).toBe('true')
      await fireEvent.keyDown(aiosRow, { key: 'Enter' })
      expect(aiosRow.getAttribute('aria-expanded')).toBe('false')
    })

    it('pressing Space on a clickable row toggles the brief row', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const aiosRow = container.querySelector('tbody tr:first-child') as HTMLElement
      await fireEvent.keyDown(aiosRow, { key: ' ' })
      expect(screen.getByRole('button', { name: /tech brief/i })).toBeTruthy()
      expect(aiosRow.getAttribute('aria-expanded')).toBe('true')
    })

    it('clicking a different featured row replaces the previous brief buttons', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr')

      await fireEvent.click(rows[0] as HTMLElement)
      let techBtn = screen.getByRole('button', { name: /tech brief/i }) as HTMLButtonElement
      expect(techBtn.dataset.src).toContain('AIOS')

      await fireEvent.click(rows[1] as HTMLElement)
      techBtn = screen.getByRole('button', { name: /tech brief/i }) as HTMLButtonElement
      expect(techBtn.dataset.src).toContain('CatalyzeAI')

      const allBriefBtns = container.querySelectorAll('button[data-src]')
      expect(allBriefBtns.length).toBe(2)
    })
  })
})

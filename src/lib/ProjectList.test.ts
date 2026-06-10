import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import { fireEvent } from '@testing-library/svelte'
import ProjectList from './ProjectList.svelte'

const mockProjects = [
  {
    title: 'Pocket Polymath',
    businessImpact: 'Personal answering assistant — every claim traceable to your own article or a verified URL',
    audience: 'Senior professionals who must cite sources and defend conclusions',
    description: 'Private knowledge hub plus verified live web search, reachable from phone, browser, or programmatic API.',
    techStack: {
      languages: ['Python'],
      databases: ['Plain Markdown corpus'],
      visualization: ['Side-by-side panes'],
      agenticBehaviour: 'Two-stage chain with mechanical URL probes',
      clientPreparations: 'Self-hosted hardware, tailnet-only by default',
    },
  },
  {
    title: 'CatalyzeAI',
    businessImpact: 'Turns internal documents into operational intelligence',
    audience: 'Small- and medium-sized enterprises in process, energy, and manufacturing',
    description: 'On-premises platform for evidence-backed answers and structured innovation shortlists.',
    techStack: {
      languages: ['Python'],
      databases: ['On-premises document corpus'],
      visualization: ['A · B · C workspaces'],
      agenticBehaviour: 'Scout · Maverick · Skeptic · Synthesizer pipeline',
      clientPreparations: 'Repository-owner role, 3–5 benchmark prompts',
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
    expect(screen.getByText('Pocket Polymath')).toBeTruthy()
    expect(screen.getByText('CatalyzeAI')).toBeTruthy()
    expect(screen.getByText('Project C')).toBeTruthy()
  })

  it('displays business impact for each project', () => {
    render(ProjectList, { props: { projects: mockProjects } })
    expect(screen.getByText(/every claim traceable/)).toBeTruthy()
    expect(screen.getByText(/operational intelligence/)).toBeTruthy()
    expect(screen.getByText(/Project C business impact/)).toBeTruthy()
  })

  it('displays audience for each project', () => {
    render(ProjectList, { props: { projects: mockProjects } })
    expect(screen.getByText(/Senior professionals/)).toBeTruthy()
    expect(screen.getByText(/Small- and medium-sized enterprises/)).toBeTruthy()
    expect(screen.getByText(/Project C users/)).toBeTruthy()
  })

  it('displays short description for each project', () => {
    render(ProjectList, { props: { projects: mockProjects } })
    expect(screen.getByText(/Private knowledge hub/)).toBeTruthy()
    expect(screen.getByText(/On-premises platform/)).toBeTruthy()
    expect(screen.getByText(/Project C characteristics/)).toBeTruthy()
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

  describe('brief selection for featured products', () => {
    it('shows a System overview button after clicking the Pocket Polymath row', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const row = container.querySelector('tbody tr:first-child') as HTMLElement
      await fireEvent.click(row)

      const btn = screen.getByRole('button', { name: /system overview/i })
      expect(btn).toBeTruthy()
    })

    it('shows a System overview button after clicking the CatalyzeAI row', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr')
      await fireEvent.click(rows[1] as HTMLElement)

      const btn = screen.getByRole('button', { name: /system overview/i })
      expect(btn).toBeTruthy()
    })

    it('Pocket Polymath button carries the pocket_polymath_system PNG path and does not open a new tab', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const row = container.querySelector('tbody tr:first-child') as HTMLElement
      await fireEvent.click(row)

      const btn = screen.getByRole('button', { name: /system overview/i }) as HTMLButtonElement
      expect(btn.dataset.src).toContain('/briefs/pocket_polymath_system.png')
      expect(container.querySelectorAll('a[target="_blank"]').length).toBe(0)
    })

    it('CatalyzeAI button carries the catalyze_ai_system PNG path', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr')
      await fireEvent.click(rows[1] as HTMLElement)

      const btn = screen.getByRole('button', { name: /system overview/i }) as HTMLButtonElement
      expect(btn.dataset.src).toContain('/briefs/catalyze_ai_system.png')
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

    it('expanding a featured row reveals BOTH tech stack AND a single System overview button', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr:not(.brief-row)') as NodeListOf<HTMLElement>
      const ppRow = rows[0]
      await fireEvent.click(ppRow)
      const detail = container.querySelector('.brief-row') as HTMLElement
      expect(detail).toBeTruthy()
      expect(detail.textContent).toMatch(/Python/)
      expect(detail.textContent).toMatch(/Plain Markdown corpus/)
      expect(detail.textContent).toMatch(/Two-stage chain/)
      expect(detail.querySelectorAll('button[data-src]').length).toBe(1)
    })

    it('pressing Enter on a clickable row toggles the brief row', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const row = container.querySelector('tbody tr:first-child') as HTMLElement
      await fireEvent.keyDown(row, { key: 'Enter' })
      expect(screen.getByRole('button', { name: /system overview/i })).toBeTruthy()
      expect(row.getAttribute('aria-expanded')).toBe('true')
      await fireEvent.keyDown(row, { key: 'Enter' })
      expect(row.getAttribute('aria-expanded')).toBe('false')
    })

    it('pressing Space on a clickable row toggles the brief row', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const row = container.querySelector('tbody tr:first-child') as HTMLElement
      await fireEvent.keyDown(row, { key: ' ' })
      expect(screen.getByRole('button', { name: /system overview/i })).toBeTruthy()
      expect(row.getAttribute('aria-expanded')).toBe('true')
    })

    it('clicking a different featured row replaces the previous brief button', async () => {
      const { container } = render(ProjectList, { props: { projects: mockProjects } })
      const rows = container.querySelectorAll('tbody tr')

      await fireEvent.click(rows[0] as HTMLElement)
      let btn = screen.getByRole('button', { name: /system overview/i }) as HTMLButtonElement
      expect(btn.dataset.src).toContain('pocket_polymath_system')

      await fireEvent.click(rows[1] as HTMLElement)
      btn = screen.getByRole('button', { name: /system overview/i }) as HTMLButtonElement
      expect(btn.dataset.src).toContain('catalyze_ai_system')

      const allBriefBtns = container.querySelectorAll('button[data-src]')
      expect(allBriefBtns.length).toBe(1)
    })
  })
})

describe('Trusted Operational AI featured brief', () => {
  const toaProject = {
    title: 'Trusted Operational AI',
    businessImpact: 'Turns failure prediction into audited, human-gated action',
    audience: 'Energy, oil & gas, and offshore-wind operators',
    description: 'Demonstrator in which a predictive-maintenance agent acts on two industrial assets.',
    techStack: {
      languages: ['Python'],
      databases: ['Industrial sensor & SCADA time-series'],
      visualization: ['Three audience views'],
      agenticBehaviour: 'Perceive -> reason -> act -> record under a staged autonomy ladder',
      clientPreparations: 'Labelled asset history or synthetic fixtures; declared regulatory scope',
    },
  }

  it('carries the trusted_operational_ai_system PNG path when expanded', async () => {
    const { container } = render(ProjectList, { props: { projects: [toaProject] } })
    const row = container.querySelector('tbody tr:first-child') as HTMLElement
    await fireEvent.click(row)
    const btn = screen.getByRole('button', { name: /system overview/i }) as HTMLButtonElement
    expect(btn.dataset.src).toContain('/briefs/trusted_operational_ai_system.png')
  })
})

describe('Guardrails for Agentic AI featured brief', () => {
  const guardrailsProject = {
    title: 'Guardrails for Agentic AI',
    businessImpact: 'The difference between autonomy you can deploy and autonomy that is a liability',
    audience: 'Boards and operators deploying agentic AI in regulated, safety-critical settings',
    description: 'Standalone demonstrator in which an autonomous agent gets caught, clamped, blocked, and overruled on real Norwegian grid data.',
    techStack: {
      languages: ['Python', 'TypeScript'],
      databases: ['Real ENTSO-E NO1 load data', 'Tamper-evident audit trail'],
      visualization: ['One browser screen', 'Live-editable guardrails'],
      agenticBehaviour: 'Propose -> pass / clamp / block / escalate under a deterministic, no-ML guardrail layer',
      clientPreparations: 'One docker compose up, no internet needed; reports illustrative, not certified',
    },
  }

  it('carries the guardrails_for_agentic_ai_playbook PNG path when expanded', async () => {
    const { container } = render(ProjectList, { props: { projects: [guardrailsProject] } })
    const row = container.querySelector('tbody tr:first-child') as HTMLElement
    await fireEvent.click(row)
    const btn = screen.getByRole('button', { name: /system overview/i }) as HTMLButtonElement
    expect(btn.dataset.src).toContain('/briefs/guardrails_for_agentic_ai_playbook.png')
  })
})

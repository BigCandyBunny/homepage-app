import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import ContactForm from './ContactForm.svelte'

describe('ContactForm component', () => {
  it('renders name, email, and message fields', () => {
    render(ContactForm)
    expect(screen.getByLabelText(/name/i)).toBeTruthy()
    expect(screen.getByLabelText(/email/i)).toBeTruthy()
    expect(screen.getByLabelText(/message/i)).toBeTruthy()
  })

  it('renders a GDPR consent checkbox', () => {
    const { container } = render(ContactForm)
    const checkbox = container.querySelector('input[type="checkbox"]')
    expect(checkbox).toBeTruthy()
    expect(container.querySelector('.gdpr')!.textContent).toMatch(/privacy/i)
  })

  it('disables submit button when GDPR checkbox is not checked', () => {
    render(ContactForm)
    const submitBtn = screen.getByRole('button', { name: /send/i })
    expect((submitBtn as HTMLButtonElement).disabled).toBe(true)
  })

  it('enables submit button when GDPR checkbox is checked', async () => {
    const { container } = render(ContactForm)
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement
    await fireEvent.click(checkbox)
    const submitBtn = screen.getByRole('button', { name: /send/i })
    expect((submitBtn as HTMLButtonElement).disabled).toBe(false)
  })

  it('shows a GDPR compliance description on the page', () => {
    const { container } = render(ContactForm)
    const notice = container.querySelector('.gdpr-notice')
    expect(notice).toBeTruthy()
    expect(notice!.textContent).toMatch(/personal data/i)
  })

  it('renders client contact detail fields (company, phone — optional)', () => {
    render(ContactForm)
    expect(screen.getByLabelText(/company/i)).toBeTruthy()
    expect(screen.getByLabelText(/phone/i)).toBeTruthy()
  })

  it('does not require optional fields for form submission', async () => {
    render(ContactForm)
    // Only name, email, message, and GDPR checkbox should be required
    const name = screen.getByLabelText(/name/i) as HTMLInputElement
    const email = screen.getByLabelText(/email/i) as HTMLInputElement
    const company = screen.getByLabelText(/company/i) as HTMLInputElement
    const phone = screen.getByLabelText(/phone/i) as HTMLInputElement

    expect(name.required).toBe(true)
    expect(email.required).toBe(true)
    expect(company.required).toBe(false)
    expect(phone.required).toBe(false)
  })
})

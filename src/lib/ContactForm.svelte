<script lang="ts">
  let name = $state('')
  let email = $state('')
  let company = $state('')
  let phone = $state('')
  let message = $state('')
  let gdprConsent = $state(false)
  let submitted = $state(false)

  function handleSubmit(e: Event) {
    e.preventDefault()
    if (!gdprConsent) return
    submitted = true
    ;(window as unknown as { plausible?: (event: string) => void }).plausible?.('Contact: Submit')
  }
</script>

<section id="contact" aria-labelledby="contact-heading">
  <span class="section-number" aria-hidden="true">IV</span>
  <h2 id="contact-heading">Contact Us</h2>

  <p class="lead-in">
    Every engagement begins with a diagnosis, not a deck. We sit with the
    board and the shop floor in equal measure, map where intent meets
    constraint, and then propose the smallest change that moves the result.
    Most mandates run eight to twenty weeks and leave the organisation able
    to make the next decision without us.
  </p>

  {#if submitted}
    <div class="success-message">
      <p>Thank you for your message. We will get back to you shortly.</p>
    </div>
  {:else}
    <form onsubmit={handleSubmit}>
      <div class="form-group underlined">
        <label class="field-label" for="contact-name">Name</label>
        <input
          id="contact-name"
          type="text"
          bind:value={name}
          required
          placeholder="Your name"
        />
      </div>

      <div class="form-group underlined">
        <label class="field-label" for="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          bind:value={email}
          required
          placeholder="your@email.com"
        />
      </div>

      <div class="form-group underlined">
        <label class="field-label" for="contact-company">Company <span class="optional">(optional)</span></label>
        <input
          id="contact-company"
          type="text"
          bind:value={company}
          placeholder="Your company"
        />
      </div>

      <div class="form-group underlined">
        <label class="field-label" for="contact-phone">Phone <span class="optional">(optional)</span></label>
        <input
          id="contact-phone"
          type="tel"
          bind:value={phone}
          placeholder="+47 ..."
        />
      </div>

      <div class="form-group underlined">
        <label class="field-label" for="contact-message">Message</label>
        <textarea
          id="contact-message"
          bind:value={message}
          required
          rows="5"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      <div class="gdpr">
        <label class="checkbox-label">
          <input type="checkbox" bind:checked={gdprConsent} />
          <span>
            I consent to the processing of my personal data in accordance with
            the <a href="#privacy">privacy policy</a>.
          </span>
        </label>
        <p class="gdpr-notice">
          We respect your privacy and comply with European GDPR regulations.
          Your personal data will only be used to respond to your inquiry and
          will not be shared with third parties. You may request deletion of
          your data at any time by contacting us.
        </p>
      </div>

      <button type="submit" disabled={!gdprConsent}>Send Message</button>
    </form>
  {/if}
</section>

<style>
  #contact {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem var(--section-gutter);
  }

  h2 {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(1.5rem, 2.6vw, 2rem);
    letter-spacing: -0.01em;
    color: var(--accent);
    font-variation-settings: 'SOFT' 0, 'WONK' 0, 'opsz' 144;
    margin-bottom: 1rem;
  }

  .lead-in {
    font-size: 1rem;
    line-height: 1.65;
    opacity: 0.82;
    max-width: 52ch;
    margin: 0 0 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }

  .form-group.underlined {
    margin-bottom: 1.25rem;
  }

  .field-label {
    display: block;
    font-family: var(--sans);
    font-size: 0.66rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    opacity: 0.75;
    margin-bottom: 0.4rem;
  }

  .optional {
    opacity: 0.6;
    font-size: 0.62rem;
    letter-spacing: 0.12em;
  }

  .underlined input,
  .underlined textarea {
    width: 100%;
    padding: 0.35rem 0;
    border: none;
    border-bottom: 1px solid var(--border);
    border-radius: 0;
    background: transparent;
    color: var(--text-h);
    font-family: var(--serif-display);
    font-variation-settings: 'SOFT' 0, 'WONK' 0;
    font-size: 1rem;
    line-height: 1.5;
    box-sizing: border-box;
    transition: border-color 0.2s ease;
  }

  .underlined textarea {
    resize: vertical;
    min-height: 5rem;
  }

  .underlined input::placeholder,
  .underlined textarea::placeholder {
    color: var(--text);
    opacity: 0.35;
    font-style: italic;
  }

  .underlined input:focus,
  .underlined textarea:focus {
    outline: none;
    border-bottom-color: var(--accent);
    border-bottom-width: 2px;
    padding-bottom: calc(0.35rem - 1px);
  }

  .gdpr {
    margin: 1.5rem 0;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .checkbox-label input[type="checkbox"] {
    width: auto;
    margin-top: 0.2rem;
  }

  .gdpr-notice {
    margin-top: 0.75rem;
    font-size: 0.8rem;
    opacity: 0.6;
    line-height: 1.5;
  }

  button {
    padding: 0.7rem 2rem;
    border: none;
    border-radius: 6px;
    background: var(--accent);
    color: var(--bg);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  button:not(:disabled):hover {
    opacity: 0.85;
  }

  .success-message {
    padding: 2rem;
    text-align: center;
    opacity: 0.8;
  }
</style>

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
  }
</script>

<section id="contact">
  <h2>Contact Us</h2>

  {#if submitted}
    <div class="success-message">
      <p>Thank you for your message. We will get back to you shortly.</p>
    </div>
  {:else}
    <form onsubmit={handleSubmit}>
      <div class="form-group">
        <label for="contact-name">Name</label>
        <input
          id="contact-name"
          type="text"
          bind:value={name}
          required
          placeholder="Your name"
        />
      </div>

      <div class="form-group">
        <label for="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          bind:value={email}
          required
          placeholder="your@email.com"
        />
      </div>

      <div class="form-group">
        <label for="contact-company">Company <span class="optional">(optional)</span></label>
        <input
          id="contact-company"
          type="text"
          bind:value={company}
          placeholder="Your company"
        />
      </div>

      <div class="form-group">
        <label for="contact-phone">Phone <span class="optional">(optional)</span></label>
        <input
          id="contact-phone"
          type="tel"
          bind:value={phone}
          placeholder="+47 ..."
        />
      </div>

      <div class="form-group">
        <label for="contact-message">Message</label>
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
    padding: 3rem 1.5rem;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--accent);
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  label {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.95rem;
  }

  .optional {
    opacity: 0.5;
    font-size: 0.85rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.6rem 0.75rem;
    border: 1px solid var(--border, rgba(255,255,255,0.15));
    border-radius: 6px;
    background: var(--input-bg, rgba(255,255,255,0.05));
    color: inherit;
    font-family: inherit;
    font-size: 0.95rem;
    box-sizing: border-box;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: var(--accent);
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

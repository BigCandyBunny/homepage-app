<section id="how-we-work" aria-labelledby="how-we-work-heading">
  <span class="section-number" aria-hidden="true">III</span>
  <h2 id="how-we-work-heading">How we work</h2>

  <p class="lede">
    This practice runs on the same Agentic AI stack we'd help your team
    build. Claude Code is the daily tool; Practice Cockpit provides the
    operating substrate — morning briefing, status board, sparring
    queue, and the decision log that carries context across engagements.
    Analytics, internal services, and knowledge workloads run on
    on-prem hardware in our office.
  </p>

  <figure class="statement">
    <blockquote>
      <p>
        I run Claude Code the way I would run an engineering team, not a chat
        window. I hand it complete missions rather than instructions: adopt a VM
        into the estate, fix the template it was cloned from, write the
        provisioning script, test it, document it, open the pull request and
        merge it. It works for hours across my Proxmox fleet, Ansible plays and
        OpenTofu state while I audit the summaries and step in only where a
        number or a diagnosis looks wrong.
      </p>
      <p>
        For large jobs, such as enriching several hundred Norwegian company
        records from web sources, I fan the work out across dozens of parallel
        agents and reconcile their output against the files on disk instead of
        trusting a running tally. Every rule I have learned the hard way is
        written into house standards that load on every session: verification
        before assertion, stdlib-only recovery scripts, one gate command shared
        by CI and the pre-push hook, and a fresh-context adversarial review
        before risky code ships. Most of the work ships end to end, from root
        cause to fleet-wide deploy and runbook.
      </p>
      <p>
        What I bring is 40 years of process and manufacturing engineering
        judgment; what Claude Code brings is the capacity to act on it at a
        scale one person could not otherwise reach.
      </p>
    </blockquote>
    <figcaption>— Leif Næss</figcaption>
  </figure>

  <p class="stack-line">
    HPE ML350 · Proxmox · Ansible · OpenTofu · Coolify · Plausible analytics · OPNsense · Cloudflare Tunnel
  </p>

  <p class="credits">
    Practice Cockpit is built on the
    <a href="https://www.skool.com/ai-automation-society" target="_blank" rel="noopener noreferrer">AIS-OS framework</a>
    by Nate Herk for the AI Automation Society community.
    The Three Ms of AI™ (Mindset, Method, Machine) is a trademark of Nate Herk.
  </p>
</section>

<style>
  #how-we-work {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem var(--section-gutter);
  }

  h2 {
    font-family: var(--serif-display);
    font-size: 1.8rem;
    margin-bottom: 1.25rem;
    color: var(--accent);
    font-variation-settings: 'SOFT' 0, 'WONK' 0;
  }

  .lede {
    line-height: 1.7;
    max-width: 62ch;
    margin: 0 0 1.25rem;
  }

  .statement {
    margin: 0 0 1.5rem;
    padding-left: 1.25rem;
    border-left: 2px solid var(--accent);
    max-width: 62ch;
  }

  .statement blockquote {
    margin: 0;
  }

  .statement p {
    line-height: 1.7;
    margin: 0 0 0.9rem;
  }

  .statement figcaption {
    font-family: var(--serif-display);
    color: var(--accent);
  }

  .stack-line {
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    opacity: 0.78;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    margin: 0;
  }

  .credits {
    font-size: 0.78rem;
    line-height: 1.55;
    color: var(--text);
    opacity: 0.7;
    margin: 1rem 0 0;
    max-width: 62ch;
  }

  .credits a {
    color: var(--accent);
    text-decoration: none;
  }

  .credits a:hover {
    text-decoration: underline;
  }
</style>

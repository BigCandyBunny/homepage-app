I run Claude Code the way I would run an engineering team, not a chat window. It gets complete
missions rather than instructions: adopt a VM into the estate, fix the template it was cloned from,
write the provisioning script, test it, document it, open the pull request, merge it. It works for
hours across my Proxmox fleet, Ansible plays and OpenTofu state while I audit the summaries and step
in only where a number or a diagnosis looks wrong. The guardrails are mechanical, not habitual:
Specification-Driven Development (SDD) and Test-Driven Development (TDD) are enforced by Skills and
Hooks, and nothing reaches GitHub without passing a fresh-context adversarial review and the CI gate.
The work happens on Linux VMs, at the command line — Neovim, Yazi, LazyGit, and Herdr for managing
agents.

For large jobs — enriching several hundred Norwegian company records from web sources, say — I fan
the work out across dozens of parallel agents and reconcile their output against the files on disk
rather than trusting a running tally. Every rule learned the hard way is written into house standards
that load on every session: verification before assertion, stdlib-only recovery scripts, one gate
command shared by CI and the pre-push hook, and a fresh-context adversarial review before risky code
ships. Most of the work ships end to end, from root cause to fleet-wide deploy and runbook.

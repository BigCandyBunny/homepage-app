# I lived through the web in the '90s. Agentic AI is bigger and faster — here's what I changed about how I work.

In 1993 I was at Hydro's Corporate Research Centre, running a section that built numerical models of large-scale industrial processes. The web — Mosaic, then Netscape — arrived the way most disruptions do: as an option you could ignore. For about four years it stayed niche. Then sometime around 1997 it stopped being optional and started rewriting business models from the back office out. By 1999 my colleagues in process and manufacturing were redrawing supply chains. By 2001 the dotcom crash had cleared out the noise, and the survivors had become permanent.

I lived through that shift not as a journalist but as someone whose daily work changed because of it. I'm writing this because I'm watching the same shape happen again — faster, larger, and with much less margin to wait and see.

The Agentic AI inflection had a date: **30 November 2022**. I tried ChatGPT the day it came out, and within a fortnight I knew this was the web of 1996, not the second-life of 2007. The signals were specific. It read and wrote code. It summarised documents at the level of a competent analyst. It moved fluently between English, Norwegian and German at a quality my consulting work occasionally needed. None of these were demos. They were the kind of small capabilities that, in 1996, the web had also delivered quietly, before the world realised what was happening.

What changed in my daily work was not "I started using AI." It was the answer to a question I'd asked since the pandemic: *to what extent can this technology be in the daily loop of the practice, not just in the deliverable?*

I had started learning Python in 2020 — at home, in lockdown, with Lopez de Prado on the Kindle and YouTube as my professor. The discipline was familiar. My 1984 PhD had been on large-scale numerical analysis on machines smaller than your phone — solving thermodynamic problems with limited memory and limited compute, the same arithmetic muscle that modern ML rediscovered in distillation, quantisation, and on-device inference. Python, scikit-learn, Pandas, Jupyter were a new vocabulary on familiar grammar.

When ChatGPT arrived the vocabulary expanded faster than I could keep up with. RAG, vector databases, embeddings, digital twins talking to LLMs. I started conversations with industry experts about ontologies — ISO 15926-14, IOF, CORA, SOSA — and how they might fuse with retrieval-augmented generation to give an LLM domain context process and energy engineers would actually trust. I moved from Conda and Poetry to `uv`. I tried Cursor, then Windsurf. I bought an HPE ML350 server and stood up Ubuntu VMs to host work that didn't belong on someone else's cloud. I went from VS Code + Copilot to Codex to Claude Code, and at some point in 2024 I noticed I was no longer switching between tools — Claude Code had become the daily engineering surface, and the practice was running on it.

Three things shipped from that arc, and they are the visible evidence I will be judged by.

**Practice Cockpit** is the operating substrate I use to run my own practice every morning. A briefing arrives before breakfast — yesterday's mail and tasks, today's calendar and prep questions, the deviations the project pipeline is showing me. The cockpit renders the same state in live form, with a chat surface that combines my own curated knowledge hub with verified live web search. The point is simple: I won't sell a substrate to a client that I haven't first run my own practice on for months.

**Pocket Polymath** is the personal answering assistant that lives behind the cockpit's chat surface and on my phone independently. A private corpus of roughly ten thousand documents I've read and noted over the years, paired with the live web — every cited URL HTTP-probed in parallel by a separate verifier the agent can't fake. Hallucinated sources are caught mechanically, not by trust.

**CatalyzeAI** is the on-premises innovation engine I'm taking to small and medium-sized enterprises in process, energy and manufacturing. It began in 2023 as those ontology conversations with industry experts. It is now a multi-stage analytical pipeline — Scout, Maverick, Skeptic, Synthesizer — with a single Discovery Stance dial that lets an organisation operate it conservatively for validation, exploratively for ideation, or anywhere in between. Bundled domain ontologies are the customer's own vocabulary, not a vendor's taxonomy.

What I changed about *how* I work, then, was not a tool swap. It was a posture. The web rewarded the people who built things that ran on it. Agentic AI is rewarding the people who put it in the daily loop of their own practice, and only then sell the same substrate to clients. **Transfer leverage, not rent capacity.**

The web took roughly seven years from Mosaic to mainstream business reshaping. Agentic AI is on a much shorter clock. The people who watched and waited in 1996 didn't lose anything immediately. By 2001 they had to compete with people who had been building since 1996.

I haven't got another five years to wait and see. So I started shipping. The three products above are thirty months of daily practice, and the substrate underneath them runs on a single server in my office, on infrastructure someone could in principle clone in a week. What can't be cloned is the calibration — four decades between boards and shop floors that lets me tell, when an AI proposes a recommendation in a process plant, whether the answer is *probably right* or *probably wrong*.

That calibration is the bridge. The web didn't change the value of the bridge. Neither does this.

---

If any of this resonates and you'd like a 30-minute conversation, [justresults.no](https://justresults.no/) has the booking link and the three products in more detail. The homepage source is [public on GitHub](https://github.com/BigCandyBunny/homepage-app).

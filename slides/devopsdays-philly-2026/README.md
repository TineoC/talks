# Free Software Isn't Gratis: why companies should treat Open Source as part of their infrastructure
DevOpsDays Philadelphia 2026 Presentation Slide Deck (revision 2) · Thursday, Oct 1, 2026, 9:30 AM · Science History Institute

> Revision 2 of this talk. Revision 1 (SRE Day NYC 2026 Q2, June 2026) is kept unchanged in [`../sre-day-2026-q2/`](../sre-day-2026-q2/).

This directory contains the presentation slides, assets, and compiled PDF for the talk **"Free Software Isn't Gratis"** by Christopher Tineo. Revision 1 was titled *"This is fine: The Real Cost of 'Free' Software"*.

Abstract (revision 2): Only 40% of open source maintainers are actually paid for their work (Tidelift, 2024). With AI, it's easier than ever for new contributors to join any project, but maintainers end up buried in feature requests and code no one understands. This is a story about the people behind the code, what "free" really costs, and what companies should know about it.

## Presentation Overview
Modern enterprise software relies fundamentally on open-source packages—yet the true cost of using "free" software goes unaccounted for until critical infrastructure breaks. This talk walks through:
- **The Prevalence of Open Source**: open source is in 98% of commercial codebases (Black Duck OSSRA 2026) and worth $8.8T to the companies using it (Harvard, 2024).
- **The Lottery Factor & Burnout**: a case study of the `ingress-nginx` controller, from the retirement announcement (Nov 2025) to its last release (Mar 2026), with the maintainers' own words.
- **The AI Flood (new in revision 2)**: curl pausing vulnerability reports for a month, GitHub merged PRs going from 25M to 90M+ a month, kernel.org serving scrapers, and projects (Godot, GCC, Codeberg) closing the door on AI contributions.
- **Supply Chain (new in revision 2)**: trivy-action, Red Hat's npm packages and the ChainDrop worm, all through maintainer credentials.
- **Who Is Paying (new in revision 2)**: the OpenSSF enterprise commitment to fund package registries, Maven Central's commercial tier, the GitHub Secure Open Source Fund and the EU Cyber Resilience Act.
- **Actionable SRE Playbook**: a concrete framework to assess, automate, and govern dependency health using the **OSS Review Toolkit (ORT)**.

Every stat and quote has its source on the slide or in the speaker notes; see [REFERENCES.md](REFERENCES.md). What changed since revision 1 is in [docs/news-since-rev1.md](docs/news-since-rev1.md).

---

## Files in this Directory

- 🌐 **[index.html](index.html)**: Interactive, web-based Reveal.js slide deck with a terminal-flavored responsive theme.
- 📄 **[devopsdays-philly-2026.pdf](devopsdays-philly-2026.pdf)**: High-resolution offline PDF version of the presentation slides (optimized at 16:9 widescreen layout).
- 🎨 **[styles.css](styles.css)**: Custom stylesheet defining CSS grid layouts, interactive slide panel variants, dark/light theme overrides, and typewriter animations.
- 🖼️ **[assets/](assets/)**: Presentation images, transparent credential badges and community logos. Every slide lists its sources in a footer line of links; the only QR codes are on the contact slide. `assets/logos/` has company and project logos, `assets/evidence/` has screenshots of the primary sources. Attributions in [assets/CREDITS.md](assets/CREDITS.md).
- 📚 **[REFERENCES.md](REFERENCES.md)**: every source, per slide, with verbatim quotes.

---

## How to Consume and Run the Slides

### Option 1: View the PDF (Easiest for Offline / Mobile)
You can open and read the compiled slide deck PDF directly:
👉 **[Open slides PDF (devopsdays-philly-2026.pdf)](devopsdays-philly-2026.pdf)**

### Option 2: Run the Reveal.js HTML Slideshow
You can open `index.html` directly in any web browser to view the interactive presentation.

#### Keyboard Shortcuts & Controls:
- **`Space` or `Arrow Keys`**: Navigate between slides.
- **`T` key**: Dynamically toggle between the **Light Cream** theme (default since revision 2) and the **Dark Terminal** theme. Append `?theme=dark` to the URL to start in dark mode.
- **`S` key**: Open the presenter/speaker notes window (displays timing cues, audience guidance, and detailed statistics).
- **`F` key**: Enter fullscreen presentation mode.
- **`Esc` key**: Open the slide overview map for quick navigation.

#### Printing/Exporting to PDF:
To export the slideshow directly from your browser:
1. Append `?print-pdf` to the slide URL (e.g., `index.html?print-pdf`).
2. Press `Ctrl + P` (or `Cmd + P`).
3. Select **Destination: Save as PDF**.
4. Set **Layout: Landscape**, **Margins: None**, and enable **Background graphics**.

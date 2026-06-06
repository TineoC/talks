# This is fine: The Real Cost of "Free" Software
SRE Day 2026 Q2 Presentation Slide Deck

This directory contains the presentation slides, assets, and compiled PDF for the talk **"This is fine: The Real Cost of 'Free' Software"** by Christopher Tineo.

## Presentation Overview
Modern enterprise software relies fundamentally on open-source packages—yet the true cost of using "free" software goes unaccounted for until critical infrastructure breaks. This talk walks through:
- **The Prevalence of Open Source**: How 96% of codebases contain open source, comprising 70–90% of modern application stacks.
- **The Lottery Factor & Burnout**: A detailed case study of the `ingress-nginx` controller lifecycle, highlighting maintainer burnout and the lack of corporate upstream contributions.
- **AI-Driven Vulnerability Escalation**: How AI models (e.g., Anthropic's Glasswing) accelerate zero-day discovery, making unpaid security maintenance unsustainable.
- **Actionable SRE Playbook**: Implementing a concrete framework to assess, automate, and govern dependency health using the **OSS Review Toolkit (ORT)**.

---

## Files in this Directory

- 🌐 **[index.html](index.html)**: Interactive, web-based Reveal.js slide deck with a terminal-flavored responsive theme.
- 📄 **[sre-day-2026-q2.pdf](sre-day-2026-q2.pdf)**: High-resolution offline PDF version of the presentation slides (optimized at 16:9 widescreen layout).
- 🎨 **[styles.css](styles.css)**: Custom stylesheet defining CSS grid layouts, interactive slide panel variants, dark/light theme overrides, and typewriter animations.
- 🖼️ **[assets/](assets/)**: Presentation images, transparent credential badges (CKS, GCP PCA), and QR code references.

---

## How to Consume and Run the Slides

### Option 1: View the PDF (Easiest for Offline / Mobile)
You can open and read the compiled slide deck PDF directly:
👉 **[Open slides PDF (sre-day-2026-q2.pdf)](sre-day-2026-q2.pdf)**

### Option 2: Run the Reveal.js HTML Slideshow
You can open `index.html` directly in any web browser to view the interactive presentation.

#### Keyboard Shortcuts & Controls:
- **`Space` or `Arrow Keys`**: Navigate between slides.
- **`T` key**: Dynamically toggle between the default **Dark Terminal** theme and the **Light Cream** high-contrast theme.
- **`S` key**: Open the presenter/speaker notes window (displays timing cues, audience guidance, and detailed statistics).
- **`F` key**: Enter fullscreen presentation mode.
- **`Esc` key**: Open the slide overview map for quick navigation.

#### Printing/Exporting to PDF:
To export the slideshow directly from your browser:
1. Append `?print-pdf` to the slide URL (e.g., `index.html?print-pdf`).
2. Press `Ctrl + P` (or `Cmd + P`).
3. Select **Destination: Save as PDF**.
4. Set **Layout: Landscape**, **Margins: None**, and enable **Background graphics**.

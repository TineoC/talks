# Talks Repository Onboarding for AI Agents

Welcome! This repository contains presentation decks and talks by Christopher Tineo.

## Project Structure
- `/slides/sre-day-2026-q2/` — Main slide deck for SRE Day 2026 Q2 ("This is fine: The Real Cost of 'Free' Software").
  - `index.html` — The main Reveal.js HTML slide source.
  - `styles.css` — Custom slide styling overrides.
  - `assets/` — Images, certificates, and logos.
- `/docs/` — Supporting narrative documentation.

## Slide Deck Design System & Styling Rules
The presentations in this repository use **Reveal.js** configured with a customized terminal-flavored dark theme.

- **Widescreen Resolution:** Reveal.js is initialized to a strict `1280x720` (16:9) grid. Sizing should generally be defined in `pt` to ensure scale consistency when exported or projected.
- **Centering:** Slide containers are flex containers configured to vertically center the `.content` block within the section to avoid awkward empty space.
- **Custom Panel Classes:**
  - `.panel` — Neutral dark panel box.
  - `.panel.primary` — Border highlighting using the primary teal theme color (`--primary-color: #5EA8A7`).
  - `.panel.warn` — Border highlighting with yellow/orange warnings (`--warn-color: #E2A03F`).
  - `.panel.critical` — Border highlighting with red alerts (`--critical-color: #CF5A5A`).
  - `.terminal` — A styled command-line interface lookalike box for commands, metrics, or logs.
- **Typewriter Effect:** Adding `.title-prompt` to any element triggers a typing animation using local script helpers.
- **Stat Animations:** Any element matching `.stat .number` gets a smooth count-up animation when the slide is navigated to.
- **Theme Toggle:** Pressing the `t` key toggles between the default dark theme and a light theme override (`data-theme="light"` on `html`).

## Adding a New Session
When adding a new talk/session to this repo, touch these files:

1. **`slides/<session-slug>/`** — the deck itself (Slidev project or a self-contained Reveal.js `index.html` + `styles.css` + `assets/`, following the pattern of the existing decks).
2. **`.github/workflows/deploy-pages.yml`** — add a build/stage step for the new deck so it gets published under `https://tineoc.github.io/talks/<session-slug>/`. All decks are staged into one combined `_site/` and deployed together in a single artifact — do not give a new deck its own standalone deploy workflow, since separate `upload-pages-artifact` deploys replace the entire live site and wipe out every other deck.
3. **`talks.json`** — add one entry (`event`, `title`, `date`, and whichever of `pages` / `pdf` / `external` / `lab` apply). Do **not** hand-edit the Talks table in `README.md` — pushing a `talks.json` change to `main` triggers `.github/workflows/update-readme.yml`, which regenerates the table between the `<!-- TALKS:START -->` / `<!-- TALKS:END -->` markers automatically.
4. **A companion hands-on lab (if any)** belongs in its own dedicated repo (see [cloud-native-k8s-101-lab](https://github.com/TineoC/cloud-native-k8s-101-lab) as the pattern), linked via `talks.json`'s `lab` field — not copied into this monorepo.

## Every Session: Required Opening & Closing
Every deck, regardless of framework, opens and closes with the same beats:

**Beginning:**
- A title/cover slide: talk title, event name, speaker name, role + company ("Christopher Tineo · Senior DevOps Engineer · Game Plan Tech").
- A speaker-intro ("whoami") slide: certifications row, community affiliations, and a LinkedIn contact link.

**End:**
- A closing/thank-you slide with the speaker's name, LinkedIn link, and a way to find the slides (the GitHub Pages URL and/or a QR code pointing at it).
- If there's a companion resource (hands-on lab, further-study links, communities to join), give it its own CTA slide(s) immediately before the final thank-you slide.

## Development & Git Guidelines
- **No Unsolicited Docs Edits:** Do not modify `README.md` or anything inside `/docs/` unless the user explicitly requests it.
- **Commit Messages:** Commit subjects should be under 50 characters, capitalized, using the imperative mood (e.g., "Add AI vulnerability slide"). Never include keywords that automatically close GitHub issues (like `Closes #123`) or mention user handles inside commit messages.

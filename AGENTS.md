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

## Development & Git Guidelines
- **No Unsolicited Docs Edits:** Do not modify `README.md` or anything inside `/docs/` unless the user explicitly requests it.
- **Commit Messages:** Commit subjects should be under 50 characters, capitalized, using the imperative mood (e.g., "Add AI vulnerability slide"). Never include keywords that automatically close GitHub issues (like `Closes #123`) or mention user handles inside commit messages.

# Talks Repository Onboarding for AI Agents

Welcome! This repository contains presentation decks and talks by Christopher Tineo.

## Project Structure
- `/slides/cloud-native-k8s-101/` — Slidev deck, the canonical Slidev pattern to copy from (layouts, components, styles, asset folders).
- `/slides/containers-day-10x-open-source/` — Claude Design deck, exported as a single self-contained `index.html` bundle (~12 MB: all photos live as base64 blobs in `__resourceBlobs`, React 18 UMD vendored under `vendor/`). Source of truth is the Claude Design project, not this file — re-export and drop the bundle in to update, don't hand-edit the 11 MB line. Storytelling-style talk (career narrative, community photos, evidence slides with cited sources).
- `/slides/sre-day-2026-q2/` — Reveal.js deck ("This is fine: The Real Cost of 'Free' Software").
  - `index.html` — The main Reveal.js HTML slide source.
  - `styles.css` — Custom slide styling overrides.
  - `assets/` — Images, certificates, and logos.
- `/docs/` — Supporting narrative documentation.

Two deck frameworks coexist in this repo — pick whichever fits the talk (Slidev for anything code/markdown-driven and reusing the component library below; self-contained Reveal.js only if replicating the `sre-day-2026-q2` pattern). Default to Slidev for new decks.

## Reveal.js Design System (sre-day-2026-q2 pattern)
Terminal-flavored dark theme, used by `sre-day-2026-q2` only.

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

## Slidev Design System (cloud-native-k8s-101 pattern)
Light theme, IBM Plex Sans / Outfit / IBM Plex Mono, cyan accent (`--gg-cyan: #0088b8`). Copy `styles/index.css`, `layouts/cover.vue`, and `layouts/section.vue` verbatim into any new Slidev deck rather than re-deriving them — the whole point is one consistent visual system across talks.

Frontmatter to match: `theme: default`, `colorSchema: light`, `aspectRatio: '16/9'`, `canvasWidth: 1280`, `fonts` (sans: IBM Plex Sans, serif: Outfit, mono: IBM Plex Mono), `themeConfig.primary: '#0088B8'`, `transition: fade`, `mdc: true`, `layout: cover` on the first slide.

Reusable markup vocabulary (all defined in `styles/index.css`, apply directly in `slides.md`):
- `.title-prompt` — small uppercase mono eyebrow line (e.g. `❯ whoami`) above a slide's `<h1>`.
- `.panel`, `.panel.primary`, `.panel.warn`, `.panel.critical`, `.panel.success` — inset-border content boxes, color-coded by intent.
- `.terminal` — dark mono command-output box, used on cover slides via the `CoverTerminal` component pattern.
- `.step-list` / `.step-row` + `.step-num` — numbered action-item rows (used for agendas, checklists, "do this next" slides).
- `.grid-2` — two-column layout; `.grid-2.diagram-first` / `.grid-2.diagram-only` variants.
- `.cert-row`, `.logo-row` — horizontal rows of certification badges / brand logos.
- `.qr-wrap` — QR code box with consistent sizing/border.
- `.cover-grid`, `.cover-copy`, `.cover-title`, `.cover-speaker`, `.cover-visual` — cover-slide layout (title deck + speaker block + visual on the right).
- `.whoami-name`, `.whoami-wrap`, `.whoami-card`, `.whoami-qr-block` — the required speaker-intro slide layout.
- `.thank-you-grid`, `.thank-you-title`, `.thank-you-speaker`, `.thank-you-qrs` — the required closing slide layout.
- `.visual-dominant` — wraps whatever fills the body of a content slide (a component, a panel, an image) so it flexes to fill remaining height under the title.

For any stat/number slide, follow the `CncfAdoptionStats.vue` pattern (see `cloud-native-k8s-101/components/` or `containers-day-10x-open-source/components/CnsdStats.vue` and `CareerSurveyStats.vue`): a `.stats` → `.stats-grid` → `.stat-card` (with `cyan` / `green` / `amber` tone classes) grid, plus a `.stats-source` caption row. **Every number shown on a slide must carry a source caption** (e.g. "Fuente: CNCF & TAG Contributor Strategy Microsurvey, 2023, n=159") — no bare stats, ever.

Custom Vue components (`components/*.vue`) are per-deck, not shared across decks — copy and adapt an existing component from another deck rather than importing across `slides/` folders. Only write a new component when a beat genuinely needs a bespoke visual; reuse `.panel` / `.step-list` markup directly in `slides.md` for anything simpler (this keeps story-driven decks lean compared to diagram-heavy ones like `cloud-native-k8s-101`).

**Asset reuse:** check `public/certs/`, `public/logos/`, `public/profile/`, and `public/qr/` in an existing deck before sourcing new images — certifications (e.g. `cert-ckad.png`), the speaker portrait (`portrait.webp`), the LinkedIn QR (`qr/linkedin.png`), and common logos (`logos/cncf.svg`, `logos/kubernetes.svg`, `logos/linkedin.svg`) are already there and can be copied as-is. Only add new assets for things genuinely new to that talk (a new community's logo, a new QR destination, etc.) — flag any asset you can't source yourself (a missing brand logo, a QR that needs generating) back to the user rather than fabricating a placeholder that looks final.

**Local tooling gotcha:** on this machine `npm` may be shell-aliased to `pnpm`. The CI workflow (`deploy-pages.yml`) runs `npm ci`, which requires a real `package-lock.json`, not `pnpm-lock.yaml`. When scaffolding a new deck, install with the real npm binary (e.g. `/opt/homebrew/bin/npm install`, or whatever `type -a npm` resolves to besides the alias) so the committed lockfile matches what CI expects.

## Adding a New Session
When adding a new talk/session to this repo, touch these files:

1. **`slides/<session-slug>/`** — the deck itself (Slidev project or a self-contained Reveal.js `index.html` + `styles.css` + `assets/`, following the pattern of the existing decks). For a Slidev deck, scaffold: `package.json` (`dev`/`build`/`export` scripts, `build` using `slidev build --base /talks/<session-slug>/`), `slides.md`, `layouts/` (copied `cover.vue` + `section.vue`), `styles/index.css` (copied), `components/` (per-deck, copy-and-adapt), `public/{certs,logos,profile,qr}/` (reuse existing assets where possible), and a deck-local `.gitignore` (`node_modules/`, `dist/`, `.slidev/`, `*.local`, `.DS_Store`) copied from an existing deck.
2. **CI — nothing to touch.** `Makefile` auto-discovers decks: `slides/<slug>/package.json` → Slidev deck (built with `--base /talks/<slug>/`), `slides/<slug>/index.html` (no `package.json`) → static deck copied as-is. `.github/workflows/deploy-pages.yml` triggers on `slides/**` and just runs `make site`, so a new folder is published at `https://tineoc.github.io/talks/<session-slug>/` with no workflow edit. All decks are staged into one combined `_site/` and deployed together in a single artifact — do not give a new deck its own standalone deploy workflow, since separate `upload-pages-artifact` deploys replace the entire live site and wipe out every other deck. Local commands: `make list`, `make dev DECK=<slug>`, `make build`, `make site`, `make clean`.
3. **`talks.json`** — add one entry (`event`, `title`, `date`, and whichever of `pages` / `pdf` / `external` / `lab` apply). Optional but preferred: `.github/workflows/update-readme.yml` triggers on both `talks.json` and `slides/**`, and `scripts/generate-readme.mjs` auto-discovers any `slides/<slug>/` directory containing `index.html` or `slides.md`. A deck with no `talks.json` entry is appended automatically with a title derived from the deck (Slidev frontmatter `title:` / first `#` heading, or the HTML `<title>`), a `pdf` link if a PDF sits in the deck folder, and `TBD` for `event`/`date` — so a new deck always lands in the table, but writing the entry yourself avoids the placeholders. Do **not** hand-edit the Talks table in `README.md`; the workflow regenerates it between the `<!-- TALKS:START -->` / `<!-- TALKS:END -->` markers and commits both `README.md` and `talks.json`.
4. **A companion hands-on lab (if any)** belongs in its own dedicated repo (see [cloud-native-k8s-101-lab](https://github.com/TineoC/cloud-native-k8s-101-lab) as the pattern), linked via `talks.json`'s `lab` field — not copied into this monorepo.
5. **Validate before wiring into CI:** run the deck's `build` script locally and confirm it compiles cleanly with the final `--base /talks/<session-slug>/` path before adding the `deploy-pages.yml` step.

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

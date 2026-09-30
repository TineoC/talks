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
- **`devopsdays-philly-2026`** is revision 2 of this deck, re-skinned for the event. It opens in light theme and uses tokens from the DevOpsDays Philadelphia logo instead of the teal/amber above. Copy from it, not from `sre-day-2026-q2`, when re-delivering the talk at another event (see "Every Event Deck" below).

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
2. **CI — nothing to touch.** `Justfile` auto-discovers decks: `slides/<slug>/package.json` → Slidev deck (built with `--base /talks/<slug>/`), `slides/<slug>/index.html` (no `package.json`) → static deck copied as-is. `.github/workflows/deploy-pages.yml` triggers on `slides/**` and just runs `just site`, so a new folder is published at `https://tineoc.github.io/talks/<session-slug>/` with no workflow edit. All decks are staged into one combined `_site/` and deployed together in a single artifact — do not give a new deck its own standalone deploy workflow, since separate `upload-pages-artifact` deploys replace the entire live site and wipe out every other deck. Local commands: `just list`, `just dev <slug>`, `just build`, `just site`, `just serve`, `just clean`, `just readme` (install `just`: `cargo install just` or `brew install just`).
3. **`talks.json`** — add one entry (`event`, `title`, `date`, and whichever of `pages` / `pdf` / `external` / `lab` apply). Optional but preferred: `.github/workflows/update-readme.yml` triggers on both `talks.json` and `slides/**`, and `scripts/generate-readme.mjs` auto-discovers any `slides/<slug>/` directory containing `index.html` or `slides.md`. A deck with no `talks.json` entry is appended automatically with a title derived from the deck (Slidev frontmatter `title:` / first `#` heading, or the HTML `<title>`), a `pdf` link if a PDF sits in the deck folder, and `TBD` for `event`/`date` — so a new deck always lands in the table, but writing the entry yourself avoids the placeholders. Do **not** hand-edit the Talks table in `README.md`; the workflow regenerates it between the `<!-- TALKS:START -->` / `<!-- TALKS:END -->` markers and commits both `README.md` and `talks.json`.
4. **A companion hands-on lab (if any)** belongs in its own dedicated repo (see [cloud-native-k8s-101-lab](https://github.com/TineoC/cloud-native-k8s-101-lab) as the pattern), linked via `talks.json`'s `lab` field — not copied into this monorepo.
5. **Validate before wiring into CI:** run the deck's `build` script locally and confirm it compiles cleanly with the final `--base /talks/<session-slug>/` path before adding the `deploy-pages.yml` step.

**Deck add-ons (`slides/<slug>/addons/`).** For decks whose `index.html` is generated output that must not be hand-edited (the Claude Design export), anything this repo adds on top lives in `slides/<slug>/addons/`. If `addons/head.html` exists, `scripts/inject-deck-addons.mjs` (run by `just site`) inserts its contents before `</head>` in the **staged** copy under `_site/`, and `addons/` is staged alongside so relative `src`/`href` resolve. The committed bundle stays byte-identical to the export, so a re-export never silently drops the add-on. `containers-day-10x-open-source/addons/` uses this for the light/dark toggle (`t` key, `?theme=light`, persisted in `localStorage`) — note the bundle replaces `documentElement` when it mounts and renders slides lazily, so the add-on re-applies on a `MutationObserver`, and its key handler captures on `window` because the deck runtime advances a slide on any keypress.

## Every Session: Required Opening & Closing
Every deck, regardless of framework, opens and closes with the same beats:

**Beginning:**
- A title/cover slide: talk title, event name, speaker name, role + company ("Christopher Tineo · Senior DevOps Engineer · Game Plan Tech").
- A speaker-intro ("whoami") slide: certifications row, community affiliations, and a LinkedIn contact link.

**End:**
- A closing/thank-you slide with the speaker's name, LinkedIn link, and a way to find the slides (the GitHub Pages URL and/or a QR code pointing at it).
- If there's a companion resource (hands-on lab, further-study links, communities to join), give it its own CTA slide(s) immediately before the final thank-you slide.

## Every Event Deck: Branding & Stage Readability
Applies to every new or re-delivered deck, in any framework. The reference implementation is `slides/devopsdays-philly-2026/` (the "Event branding" block at the end of its `styles.css`).

- **Light theme is the default.** Keep dark as the `t`-key / `?theme=dark` alternative, never the other way round. Venue projectors wash out dark slides.
- **Take the palette from the event's logo, not from a generic theme.** Before styling, sample the logo's colors (for example with PIL on the PNG in `assets/logos/`) and map them onto the deck tokens:
  - The logo's dark wordmark color becomes body text (`--text-color` / `--ink`).
  - Bright brand colors (usually 2:1 or less on white) are **fills only**: act-divider backgrounds, chart bars, top rules, a highlighter behind text. Never use them as text on a light background.
  - Derive a darker variant of each brand hue for text (`--primary-color`, `--secondary-color`, `--critical-color`, `--success-color`), and check that each is WCAG AA (4.5:1 or better) against the slide background. Check the numbers with a script. Don't eyeball them.
  - Use a neutral near-white paper background, not warm cream. Cream with a deep teal accent reads as a generic AI template.
  - Dark theme: the bright brand colors can be text on charcoal, but check the ratio there too.
  - Philly 2026 example: charcoal `#231F20`, Liberty Bell blue `#45BEEF` (fill) / `#0B6A9E` (text), "2026" yellow `#F2D040` (highlighter) / `#7A5C00` (text).
- **One signature element per event, taken from its brand.** For Philly it's the `.hl` highlighter stroke in the logo's yellow. Put it behind **one** key phrase or number per slide, at most. Everything else stays quiet.
- **Act/section dividers are full-bleed in the main brand color**, with charcoal type. Title and contact slides keep the normal background so the event logo stays legible on them.
- **Show the event logo prominently on the title slide** (about 100px tall at 1280×720). It's the deck's main connection to the event.
- **Minimum type sizes at 1280×720:** 14pt for anything the audience is meant to read (card labels, eyebrows, code, chart labels). 11pt only for source/footer lines. Code on a slide should be one short snippet that fits without wrapping. Put longer scripts in the speaker notes.
- **One hero per slide.** Don't fill slides with rows of equal-weight tinted stat cards. Pick the single number, quote or screenshot the slide exists for and make it big. Show supporting numbers as plain `.stat-row` lines, not boxes. Don't repeat the same stat or quote on more than one slide; say it once and refer back to it.
- **No perpetual motion.** No pulsing or shimmering elements. The theme indicator stays hidden and flashes for about 1.5s only when the theme changes.
- **Licensing & citation.** Decks are public (GitHub Pages + PDF), so every credit must appear on the slide. A credit that exists only in a repo file doesn't count. Reference implementation: `slides/devopsdays-philly-2026/assets/CREDITS.md`.
  - **Every fact, number or quote gets a `Sources:` footer line** with public links (title, publisher, date). Never cite a local repo file ("research notes in docs/…") as a source, because the audience can't open it. Link the public page the note was based on.
  - **Licensed media (CC BY, CC BY-SA, …) carries full attribution in its on-slide caption:** creator, license name linked to the license, and source linked to the original. Also say whether you changed it (cropped, recolored). Check the license on the original page (for example the Wikimedia Commons file page) before using the image. Don't trust a mirror's claim.
  - **Logos and trademarks are nominative use only:** use them to identify the company or project being discussed. Take logos from Simple Icons (CC0 SVG data) or the owner's official brand kit, not third-party logo mirrors. The employer's logo and name on title/whoami slides may need the speaker's employer approval. Flag that to the user; don't decide it.
  - **Screenshots of third-party pages:** crop to the relevant part and caption each one with site · title · date. Link the page in the footer.
  - **Quotes are verbatim**, attributed to the author (GitHub handle or name, role), with a link to the exact comment or post.
  - **Only publish what the deck uses.** GitHub Pages serves the whole `slides/<slug>/` folder, so a file in `assets/` that no slide shows is still public and uncited. Keep research snapshots and retired assets outside `slides/` (for example `.unpublished-assets/<slug>/`).
  - **Keep a per-deck `assets/CREDITS.md`** covering every file in `assets/`: source URL, author, license, changes, and which slide uses it. Refer to slides by section id (`#stallman-free`), not number, so entries stay correct when slides move. Record the correct licenses for fonts and libraries (IBM Plex and JetBrains Mono are SIL OFL 1.1; Reveal.js is MIT; Font Awesome Free is CC BY 4.0 for icons, OFL for fonts, MIT for code).
  - **Don't load unused CDN libraries**, and pin versions (no `@latest`). A dead dependency can break a deck on talk day.
- **Verify with a real browser before calling it done.** Serve the deck locally (`python3 -m http.server`; the Playwright MCP blocks `file://`), step through every slide with `Reveal.slide(i)` in both themes, and check that no `.content` overflows into the `.footnote` source line.

## Development & Git Guidelines
- **No Unsolicited Docs Edits:** Do not modify `README.md` or anything inside `/docs/` unless the user explicitly requests it.
- **Commit Messages:** Commit subjects should be under 50 characters, capitalized, using the imperative mood (e.g., "Add AI vulnerability slide"). Never include keywords that automatically close GitHub issues (like `Closes #123`) or mention user handles inside commit messages.

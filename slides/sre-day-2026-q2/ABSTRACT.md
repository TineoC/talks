# Free Software Isn't Gratis — Talk Plan & Build Spec

> **Source of truth document.** This file contains everything required to build (or rebuild) the SRE Day NYC 2026 Q2 talk *"Free Software Isn't Gratis: why companies should treat Open Source as part of their infrastructure"* by Christopher Tineo.

---

## 1. Talk Metadata

| Field | Value |
|---|---|
| Title | Free Software Isn't Gratis: why companies should treat Open Source as part of their infrastructure |
| Short title | Free Software Isn't Gratis |
| Speaker | Christopher Tineo (Chris) |
| Affiliation | Game Plan Tech |
| Event | SRE Day NYC 2026 Q2 |
| Slot length | 25 min (~20 slides) |
| Target audience | SREs, platform engineers, engineering leadership, OSS maintainers |
| Tone | Story-driven, personal, sharp |
| Primary lens | Moral/economic: "Free Software Isn't Gratis" |
| Anchor case study | Ingress NGINX retirement |

---

## 2. Abstract (CFP / talk-page version)

> Maintaining an open source project is hard. It requires managing a group of people who are largely working for free to build something that other people profit off of, usually distributed across the globe, with limited resources. The whole time you're doing this, you're receiving demands from users and businesses alike for features or bug fixes on a timeline that works for them, not you and your (possibly very limited) group of contributors that you can't exactly order around, since they aren't being paid. It's stressful, and it can be overwhelming. When one of these projects is the victim of an attack that takes advantage of the fact that there are only one or two maintainers, or eventually has to shut down due to rising technical debt and falling contributor numbers, the public blame falls on us, not on the businesses that didn't offer contributors in time.
>
> This talk is a story about the people behind the code, what the "free" in "free software" actually costs, and what companies can — and should — do about it.

---

## 3. Bio

### Short (≤ 60 words)
Christopher Tineo is a software engineer at Game Plan Tech, passionate about the open source and cloud native ecosystem. A member of Cloud Native Santo Domingo and KCD New York, he volunteers in OSS communities across the U.S. and Latin America.

### Long (≤ 120 words)
Christopher Tineo is a software engineer at Game Plan Tech and a results-driven technologist who believes deeply in the value of giving back. He works across the open source and cloud native ecosystem — most visibly as a member of Cloud Native Santo Domingo and KCD New York — and volunteers with communities across the U.S. and Latin America. When he's not working or studying, you'll find him contributing to the same OSS projects that he talks about. He believes the most important infrastructure question of the next decade isn't about servers or runtimes, but about the people who keep the software we all depend on alive.

---

## 4. Design Decisions (locked in via the planning conversation)

| Decision | Value |
|---|---|
| Anchor case study | **Ingress NGINX retirement** |
| Primary thesis | **"Free Software Isn't Gratis"** (moral/economic lead) |
| Tone | **Story-driven, personal** |
| Length | **25 min** (~20 slides) |
| Visual style | **Dark, terminal-flavored** |
| Section skeleton | **Problem → Examples → Cost → Solution → Action** |
| Call to action | Segmented by audience (leaders / platform / individual contributors) |
| Speaker notes | Comprehensive per slide |
| PDF export | HTML only (PDF optional, can be added later) |

---

## 5. Visual Design System

The deck supports **two themes** that share the same design language (dark, terminal-flavored) and the same component classes. Switch between them at runtime.

### Switching themes

- **Keybind:** press `T` (or `t`) during the presentation to toggle.
- **URL:** open with `?theme=light` to start in light mode, omit to start in dark.
- **Persistence:** the choice is stored in `localStorage` under `fsig-theme`.
- **Indicator:** a small `THEME · DARK` / `THEME · LIGHT` badge sits in the bottom-right corner of every slide.

### Theme 1: Dark (default)

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background, projector-friendly near-black |
| `--fg` | `#e0e0e0` | Primary text |
| `--muted` | `#7a7a7a` | Secondary text, captions |
| `--slate` | `#2E4053` | Muted UI chrome, dividers |
| `--accent` (teal) | `#5EA8A7` | Terminal prompt, section accents, links |
| `--accent-deep` | `#277884` | Hover, secondary accent |
| `--warn` (amber) | `#F39C12` | Warnings, "you're behind" callouts |
| `--critical` (red) | `#E74C3C` | "This is fine." 🔥 moments, blame, EOL |
| `--success` (green) | `#2ECC71` | Terminal cursor, "you can do this" |
| `--code-bg` | `#111418` | Code block / terminal surface |

### Theme 2: Light (cream/warm, terminal feel preserved)

| Token | Hex | Contrast on cream | Notes |
|---|---|---|---|
| `--bg` | `#faf7f2` | warm cream, like a book page | light variant of bg |
| `--fg` | `#1a1a1a` | ~16:1 ✓ | near-black, AA+AAA |
| `--muted` | `#5a5a5a` | ~7:1 ✓ | captions, secondary text |
| `--line` | `#c8c0b3` | warm slate | dividers, image borders |
| `--accent` (teal) | `#1F6B73` | ~6:1 ✓ | deep teal — AA-compliant for text |
| `--accent-deep` | `#144A52` | ~10:1 ✓ | deeper teal for hover/gradient |
| `--warn` (amber) | `#8A4A00` | ~6:1 ✓ | deep amber — AA-compliant |
| `--critical` (red) | `#A8331F` | ~6:1 ✓ | deep red — AA-compliant |
| `--success` (green) | `#1E6B3F` | ~6:1 ✓ | deep green — AA-compliant |
| `--code-bg` | `#111418` | (dark surface) | **kept dark** — terminal block is a deliberate "island of contrast" on cream |

### What stays the same across themes

- **Typography:** IBM Plex Sans (body) + JetBrains Mono (code/prompts). All sizes in `pt`.
- **Layout, padding, grid:** identical.
- **Component classes:** `.terminal`, `.panel`, `.step`, `.stat`, `.timeline`, `.section-divider` — same markup, theme-aware.
- **Terminal blocks:** dark surface in both themes. The "island of contrast" reading is the same in either mode.

### What changes between themes

- Background, foreground, muted, line, accent, and the four status colors are remapped per theme to preserve WCAG AA contrast.
- The Stallman portrait gets a subtle drop shadow in light mode (CSS-only, applied via `:root[data-theme="light"] figure.portrait img`).
- The terminal prompt color uses the *regular* teal `#5EA8A7` inside the dark code surface in light mode (so it stays the familiar terminal look against the dark island).
- The bottom-right theme indicator updates automatically.

### Typography

- **Body sans-serif:** `IBM Plex Sans` (Google Fonts)
- **Mono:** `JetBrains Mono` (Google Fonts) — for code, prompts, terminal excerpts
- **Display:** same as body, but at large size + tight tracking
- **All font sizes in `pt` units** (skill requirement for fixed-size slides)

### Visual elements

- Code blocks styled as terminal windows: dark surface, `$` or `❯` prompt in teal, output in `--fg`
- Section dividers: huge display type with a single teal accent rule underneath
- "This is fine." 🔥 moments use `--critical` red sparingly
- Image frames: 1px `--line` (or `--slate` in dark) border, optional caption in `--muted` italic
- Top hairline on every slide: 3px teal gradient → consistent visual signature across both themes

---

## 6. File Structure

```
slides/sre-day-2026-q2/
├── index.html         # Reveal.js deck (rebuilt from scratch)
├── styles.css         # Custom dark/terminal theme (overrides reveal defaults)
├── assets/
│   ├── stallman.jpg   # Richard Stallman portrait, CC-BY-SA (see CREDITS.md)
│   └── CREDITS.md     # Image attributions and license notes
├── REFERENCES.md      # Sources cited in the talk
└── ABSTRACT.md        # This file
```

---

## 7. Slide-by-Slide Outline (20 slides)

| # | Type | Title | Content / Notes |
|---|---|---|---|
| 1 | Title | Free Software Isn't Gratis | Christopher Tineo · Game Plan Tech · SRE Day NYC 2026 Q2 |
| 2 | whoami | Christopher Tineo | Senior DevOps Engineer · Game Plan Tech · CN Santo Domingo · KCD New York + tech-stack badges |
| 3 | Hook | "In 9 years, ingress-nginx had exactly one 'call for maintainers' issue." | It got 10 thank-you comments and 0 volunteers. (Path B receipts) |
| 4 | Roadmap | The five acts | Problem → Examples → Cost → Solution → Action |
| 5 | Divider | 1. The Problem | Teal accent rule, large type |
| 6 | Stat | Open source is everywhere | "90%+ of modern applications contain OSS" + supporting stat |
| 7 | Definition | "Free" as in beer vs "free" as in speech | **Includes Richard Stallman portrait** with caption: "Richard Stallman, whose framing of 'free software' gave us this wordplay" |
| 8 | Divider | 2. The Examples | |
| 9 | Case intro | What is ingress-nginx? | **NGINX logo** + description; steward: Kubernetes SIG Network |
| 10 | Timeline | The announcement → EOL | March 2025 announcement, March 2026 EOL — who, when, what broke (with #4404, #13002, etc. — see ABSTRACT §6) |
| 11 | The people | The humans behind the controller | Peak 6, trough 2, 4 emeritus, 3+ years at 2 maintainers |
| 12 | Why it collapsed | Burnout, scaling, single points of failure | "This is fine." 🔥 + the 50+ lifecycle/frozen issues, InGate failure |
| 13 | Divider | 3. The Cost | |
| 14 | Cost to companies | Migration, security risk, EOL anxiety | $ figures, downstream impact |
| 15 | Cost to maintainers | Unpaid labor, burnout | The human cost |
| 16 | Cost to ecosystem | Lost trust, abandoned projects | Downstream impact |
| 17 | Divider | 4. The Solution | |
| 18 | Reframe | OSS as critical infrastructure | Same rigor as your services: monitoring, SLOs, on-call |
| 19 | Framework | Discover → Assess → Fund → Contribute | 4-step framework with icon for each |
| 20 | Divider | 5. The Action | |
| 21 | Actions | What you do Monday | Segmented: leaders / platform / individual contributors |
| 22 | Close | "This is fine." 🔥 → Thank you | Strong close + Q&A |
| 23 | KCD gift | A free ticket to KCD New York 2026 | QR code to voucher KCDNY26-CHRIS-ORGANIZER-FREE · June 10, 2026 |
| 24 | Contact | Stay in touch | QR codes: LinkedIn + slides URL (github.com/TineoC/talks) |

> *24-slide deck. ~20-25 min slot, includes KCD gift and contact QR codes at the end.*

---

## 8. Open Decisions & Defaults Applied (for the build)

These were unresolved at the time the user said "proceed." Defaults applied; user can revise after seeing v1.

| # | Decision | Default applied | How to revise |
|---|---|---|---|
| Q1 | Slide 2 hook | Use the "A maintainer quit last week" placeholder. I'll provide 2 alternatives in `index.html` comments | Edit the `<h1>` of slide 2 |
| Q2 | Framework name (slide 19) | **Discover → Assess → Fund → Contribute** | Edit slide 19 |
| Q3 | Slide 21 actions | Segmented by audience (3 columns) | Edit slide 21 |
| Q4 | PDF export | HTML only for v1 | Run `scripts/create-presentation.js` PDF flow when ready |
| Q5 | Speaker notes | Comprehensive per slide (in `<aside class="notes">` blocks) | Edit `<aside class="notes">` |
| Q6 | Stallman image source | **Ruben Rodriguez's CC BY 4.0 photo from LibrePlanet 2019** (Wikimedia Commons) | Swap file in `assets/` and update CREDITS.md |

---

## 9. References

### Primary (referenced in the talk)
- **Kubernetes project — Ingress NGINX retirement statement**
  https://kubernetes.io/blog/2026/01/29/ingress-nginx-statement/
  *Used as: cited reference on the Ingress NGINX retirement case study (slides 9–12).*

### Additional sources to consider for v2
- Wikimedia Commons — Richard Stallman portraits (CC-BY-SA)
- FSF — https://www.gnu.org/philosophy/free-sw.html (original "free as in freedom" framing)
- Tidelift surveys on OSS maintainer sustainability
- Linux Foundation Census reports

### Image attributions
See `assets/CREDITS.md`. The current image is the LibrePlanet 2019 portrait of Richard Stallman by Ruben Rodriguez, used under CC BY 4.0.

---

## 10. Build / Cleanup Steps

These are the exact steps to (re)build this presentation.

### Step 1 — Cleanup
```bash
rm -rf slides/sre-day-2026-q2/screenshots
rm    slides/sre-day-2026-q2/output.pdf
```

### Step 2 — Scaffold
Use the revealjs skill's `create-presentation.js`:
```bash
node .agents/skills/revealjs/scripts/create-presentation.js \
  --structure 1,1,1,1,d,1,1,d,1,1,1,1,d,1,1,1,d,1,1,d,1,1 \
  --title "Free Software Isn't Gratis" \
  --output slides/sre-day-2026-q2/index.html
```

### Step 3 — Apply theme
Write `slides/sre-day-2026-q2/styles.css` with the color palette and typography tokens from §5.

### Step 4 — Write content
Populate each `<section>` in `index.html` per the outline in §7. Use `<aside class="notes">…</aside>` per slide for speaker notes.

### Step 5 — Add Stallman image
Download CC-BY-SA portrait from Wikimedia Commons to `assets/stallman.jpg` and reference it in slide 7 with full caption + attribution.

### Step 6 — Update CREDITS.md
Document the Stallman image, license, and source URL.

### Step 7 — Verify
```bash
node .agents/skills/revealjs/scripts/check-overflow.js  slides/sre-day-2026-q2/index.html
node .agents/skills/revealjs/scripts/check-charts.js    slides/sre-day-2026-q2/index.html
```

### Step 8 — Preview
Open `slides/sre-day-2026-q2/index.html` in a browser. Press `S` for speaker notes view, `F` for fullscreen, `?` for help.

---

## 11. Verification Checklist (pre-flight before v1 ships)

- [ ] All 20 slides render without text overflow
- [ ] Section dividers visually distinct from content slides
- [ ] Stallman image loads and has caption
- [ ] Speaker notes present on every slide
- [ ] Color contrast meets WCAG AA (4.5:1 for body, 3:1 for large text)
- [ ] `pt` units used for all font sizes (no `px`, `em`, `rem`)
- [ ] CREDITS.md present with Stallman attribution
- [ ] REFERENCES.md includes the kubernetes.io Ingress NGINX blog post
- [ ] README.md in repo root NOT yet updated (wait until talk is accepted/delivered)
- [ ] No external network dependencies in the HTML (everything local)

---

## 12. Out of Scope (do not change)

- `README.md` (talks table) — wait until the talk is accepted
- `.agents/skills/revealjs/` — the installed skill itself
- Any other directories in the repo

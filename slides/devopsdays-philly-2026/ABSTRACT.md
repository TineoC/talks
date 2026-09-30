# Free Software Isn't Gratis — Talk Plan & Build Spec

> **Source of truth document.** This file contains everything required to build (or rebuild) the DevOpsDays Philadelphia 2026 talk (revision 2; revision 1 was SRE Day NYC 2026 Q2, see `../sre-day-2026-q2/`) *"Free Software Isn't Gratis: why companies should treat Open Source as part of their infrastructure"* by Christopher Tineo.

---

## 1. Talk Metadata

| Field | Value |
|---|---|
| Title | Free Software Isn't Gratis: why companies should treat Open Source as part of their infrastructure |
| Short title | Free Software Isn't Gratis |
| Speaker | Christopher Tineo (Chris) |
| Affiliation | Palantir Technologies (SRE); revision 1 was given at Game Plan Tech |
| Event | DevOpsDays Philadelphia 2026 (Oct 1, 2026, 9:30 AM) |
| Slot length | 25 min (~20 slides) |
| Target audience | SREs, platform engineers, engineering leadership, OSS maintainers |
| Tone | Story-driven, personal, sharp |
| Primary lens | Moral/economic: "Free Software Isn't Gratis" |
| Anchor case study | Ingress NGINX retirement |

---

## 2. Abstract (CFP / talk-page version)

### Revision 2 (DevOpsDays Philadelphia 2026, flyer / social)

> Only 40% of open source maintainers are actually paid for their work. With AI, it's easier than ever for new contributors to join any project, but maintainers end up buried in feature requests and code no one understands. This is a story about the people behind the code, what "free" really costs, and what companies should know about it.

The 40% figure is the inverse of Tidelift's "60% of maintainers are (still) not paid for their work" (2024 State of the Open Source Maintainer Report). Cite it as Tidelift, 2024.

### Revision 1 (SRE Day NYC 2026 Q2, CFP / talk-page version)

> Maintaining an open source project is hard. It requires managing a group of people who are largely working for free to build something that other people profit off of, usually distributed across the globe, with limited resources. The whole time you're doing this, you're receiving demands from users and businesses alike for features or bug fixes on a timeline that works for them, not you and your (possibly very limited) group of contributors that you can't exactly order around, since they aren't being paid. It's stressful, and it can be overwhelming. When one of these projects is the victim of an attack that takes advantage of the fact that there are only one or two maintainers, or eventually has to shut down due to rising technical debt and falling contributor numbers, the public blame falls on us, not on the businesses that didn't offer contributors in time.
>
> This talk is a story about the people behind the code, what the "free" in "free software" actually costs, and what companies can — and should — do about it.

---

## 3. Bio

### Short (≤ 60 words)
Christopher Tineo is an SRE at Palantir Technologies, passionate about the open source and cloud native ecosystem. A member of Cloud Native Santo Domingo and KCD New York, he volunteers in OSS communities across the U.S. and Latin America.

### Long (≤ 120 words)
Christopher Tineo is an SRE at Palantir Technologies and a results-driven technologist who believes deeply in the value of giving back. He works across the open source and cloud native ecosystem — most visibly as a member of Cloud Native Santo Domingo and KCD New York — and volunteers with communities across the U.S. and Latin America. When he's not working or studying, you'll find him contributing to the same OSS projects that he talks about. He believes the most important infrastructure question of the next decade isn't about servers or runtimes, but about the people who keep the software we all depend on alive.

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
- **URL:** open with `?theme=dark` to start in dark mode, omit to start in light (light is the default since revision 2).
- **Persistence:** the choice is stored in `localStorage` under `fsig-theme`.
- **Indicator:** a small `THEME · DARK` / `THEME · LIGHT` badge sits in the bottom-right corner of every slide.

### Theme 1: Dark (default in revision 1; opt-in with `?theme=dark` in revision 2)

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
slides/devopsdays-philly-2026/
├── index.html         # Reveal.js deck (rebuilt from scratch)
├── styles.css         # Custom dark/terminal theme (overrides reveal defaults)
├── assets/
│   ├── stallman.jpg   # Richard Stallman portrait, CC-BY-SA (see CREDITS.md)
│   └── CREDITS.md     # Image attributions and license notes
├── REFERENCES.md      # Sources cited in the talk
└── ABSTRACT.md        # This file
```

---

## 7. Slide-by-Slide Outline (revision 2, 35 slides)

Revision 1's 29-slide outline is in `../sre-day-2026-q2/`. Sources per slide are in `REFERENCES.md`.

| # | id | Title | Change in revision 2 |
|---|---|---|---|
| 1 | title | Free Software Isn't Gratis | DevOpsDays Philadelphia + Palantir logos |
| 2 | whoami | Christopher Tineo | Credly badges refreshed (CKA expired), community + KCD NY logos, Palantir role |
| 3 | roadmap | The five acts | — |
| 4 | divider-1 | Act 01 · The Problem | — |
| 5 | stat-oss-everywhere | Open source is everywhere | 98% (OSSRA 2026) + Harvard $8.8T / 5% of developers |
| 6 | free-vs-open | Free software ≠ Open source | — |
| 7 | stallman-free | Free as in beer vs speech | — |
| 8 | divider-2 | Act 02 · The Examples | — |
| 9 | case-ingress-intro | What is ingress-nginx? | ~60% attributed to CERN's own fleet |
| 10 | hook | One "call for maintainers" issue | — |
| 11 | case-ingress-timeline | The announcement → EOL | Verified dates + usage estimates (Steering ~50%, Wiz 41%+ / 6,500+ exposed) |
| 12 | case-ingress-demand | 10 years of demand on a handful of volunteers | **New**: issues + PRs per year chart (GitHub API) |
| 13 | case-ingress-people | The humans behind the controller | Colored stat cards; "14.7k" relabeled as issues + PRs |
| 14 | case-ingress-collapse | Why it collapsed | Reason list moved to speaker notes |
| 15 | divider-3 | Act 03 · The Cost | Subtitle mentions the AI flood |
| 16 | curl-apple | curl × Apple, 25 years, $0 | **New** |
| 17 | cost-companies | Cost to companies | Exact "about half" wording |
| 18 | cost-maintainers | Cost to maintainers | Source → Tidelift 2024, GitHub comment link |
| 19 | ai-maintainer-flood | AI multiplied the inbox | **New**: curl pause, GitHub 25M → 90M+ PRs, kernel.org scrapers |
| 20 | maintainer-voices | In their own words | **New**: five GitHub comments |
| 21 | closing-doors | Maintainers are closing the door | **New**: GitHub PR limits, Godot, GCC, Codeberg |
| 22 | ai-vulnerability-explosion | AI finds bugs faster than volunteers can fix them | Updated Glasswing numbers, Mozilla, Patch the Planet |
| 23 | supply-chain-2026 | One maintainer's token is your production | **New**: trivy-action, Red Hat, ChainDrop, npm |
| 24 | divider-4 | Act 04 · The Solution | — |
| 25 | reframe | OSS is critical infrastructure | 98% wording |
| 26 | companies-paying | The industry just said it out loud | **New**: OpenSSF registry commitment, Maven Central |
| 27 | funding-that-works | Small money, measurable results | **New**: GitHub SOSF, $12.5M grants, LF ROI, EU CRA |
| 28 | framework | Discover → Assess → Fund → Contribute | Fund step names real programs |
| 29 | new-reality | Build-vs-buy has flipped | ~$1T in seven days; BLS +10% (2025–35) |
| 30 | divider-5 | Act 05 · The Action | — |
| 31 | actions | What you do on Monday | — |
| 32 | cli-tagging | Lottery-factor scripts | — |
| 33 | ort-analyzer | OSS Review Toolkit | — |
| 34 | closing | "It's only fine if we pay for it" | — |
| 35 | contact | Stay in touch | QR codes for LinkedIn and the GitHub Pages deck (the only QR codes in revision 2) |

Removed: `k8s-12th-anniversary` and `kcd-gift` (June 2026 event only).

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
rm -rf slides/devopsdays-philly-2026/screenshots
rm    slides/devopsdays-philly-2026/output.pdf
```

### Step 2 — Scaffold
Use the revealjs skill's `create-presentation.js`:
```bash
node .agents/skills/revealjs/scripts/create-presentation.js \
  --structure 1,1,1,1,d,1,1,d,1,1,1,1,d,1,1,1,d,1,1,d,1,1 \
  --title "Free Software Isn't Gratis" \
  --output slides/devopsdays-philly-2026/index.html
```

### Step 3 — Apply theme
Write `slides/devopsdays-philly-2026/styles.css` with the color palette and typography tokens from §5.

### Step 4 — Write content
Populate each `<section>` in `index.html` per the outline in §7. Use `<aside class="notes">…</aside>` per slide for speaker notes.

### Step 5 — Add Stallman image
Download CC-BY-SA portrait from Wikimedia Commons to `assets/stallman.jpg` and reference it in slide 7 with full caption + attribution.

### Step 6 — Update CREDITS.md
Document the Stallman image, license, and source URL.

### Step 7 — Verify
```bash
node .agents/skills/revealjs/scripts/check-overflow.js  slides/devopsdays-philly-2026/index.html
node .agents/skills/revealjs/scripts/check-charts.js    slides/devopsdays-philly-2026/index.html
```

### Step 8 — Preview
Open `slides/devopsdays-philly-2026/index.html` in a browser. Press `S` for speaker notes view, `F` for fullscreen, `?` for help.

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

# CREDITS

Image and media attributions for the SRE Day NYC 2026 Q2 talk *"Free Software Isn't Gratis"* by Christopher Tineo.

---

## Slide 7 — Richard Stallman portrait

**File:** `stallman.jpg`
**Source:** https://commons.wikimedia.org/wiki/File:Richard_Stallman_at_LibrePlanet_2019.jpg
**Original:** https://media.libreplanet.org/u/libreplanet/m/richard-stallman-at-libreplanet-2019-2113/
**Author:** Ruben Rodriguez
**Date:** 23 April 2019
**Event:** LibrePlanet 2019 (FSF conference)
**License:** Creative Commons Attribution 4.0 International (CC BY 4.0)
**License URL:** https://creativecommons.org/licenses/by/4.0/

**Required attribution (as shown on the slide):**
> Richard Stallman, founder of the GNU Project and the Free Software Foundation. His framing of "free software" — meaning freedom, not price — gave us this wordplay.

**Extended attribution:**
> Photo of Richard Stallman at LibrePlanet 2019 by Ruben Rodriguez, used under CC BY 4.0. Source: Wikimedia Commons.

---

## Slide 9 — NGINX logo (ingress-nginx intro)

**File:** `nginx-logo.png` (350×386 PNG, 12 KB)
**Source:** https://media.trustradius.com/product-logos/3s/RN/97DT9BKJ2M34.PNG
**Mark:** NGINX® is a registered trademark of F5, Inc. (used nominatively to identify the project)
**License:** Trademark; used for editorial / educational commentary

**Note:** The TrustRadius-served product logo for ingress-nginx. The "N" mark and green square are NGINX's official brand assets, the property of F5 Networks, Inc. Used here under nominative fair use to identify the project the talk is about, not to imply endorsement.

**Recommended permanent replacement:** download the official NGINX brand asset from the F5 press kit (https://www.f5.com/company/news/press-kit) or the project's official source.

---

## Slide 23 — KCD New York 2026 gift

**Files:** `kcd-logo.png` (1170×494, 504 KB) and `kcd-qr.png` (500×500, 797 B QR)
**Logo source:** https://cdn.pretix.cloud/2/pub/thumbs/c595ad8b10c25d4be24d29e1c980f8bd.1170x5000.318f322c477cb1.png
**QR code:** generated locally via `https://api.qrserver.com/v1/create-qr-code/` linking to `https://tickets.kcdnewyork.com/redeem?voucher=KCDNY26-CHRIS-ORGANIZER-FREE`
**Voucher code:** KCDNY26-CHRIS-ORGANIZER-FREE
**Event date:** June 10, 2026
**License:** KCD New York 2026 logo and brand marks are the property of the KCD New York organizing team. Used by permission of the speaker as an organizer.

---

## Slide 23 — Kubernetes 12th Anniversary art (kcd-gift slide)

**File:** `kubernetes-12-anniversary.jpeg` (1024×1024, 183 KB)
**Source:** Kubernetes community / official (kubernetes.io / CNCF)
**Subject:** "12 Years of Kubernetes" — anniversary art featuring the Kubernetes ship and celebratory fireworks
**License:** Community / official Kubernetes project artwork. Used on the kcd-gift slide to frame the KCD New York ticket giveaway as a celebration of the project's 12th anniversary.

---

## Slide 24 — Contact (QR codes)

**Files:** `linkedin-qr.png` (500×500, 649 B) and `slides-qr.png` (500×500, 788 B)
**QR codes:** generated locally via `https://api.qrserver.com/v1/create-qr-code/`
**LinkedIn target:** `https://www.linkedin.com/in/christopher-tineo/`
**Slides target (current):** `https://github.com/TineoC/talks/blob/main/slides/sre-day-2026-q2/index.html`

**Replacement instructions:** if a different public slides URL is used (e.g., GitHub Pages, personal site), regenerate `slides-qr.png` and update the URL on the slide and in §9 of `ABSTRACT.md`.

---

## Slide 7 / Section 1 — `docs/ingress-nginx-calls-for-help.md` (research file)

**File:** `issue-4404-screenshot.png` (1280×3483, 500 KB)
**Source:** https://github.com/kubernetes/ingress-nginx/issues/4404 (captured 2026-06-04)
**Issue title:** "@aledbf stepping down as maintainer"
**Issue author:** @aledbf
**Date opened:** Aug 6, 2019
**Date auto-closed:** Feb 15, 2020 (label: `lifecycle/rotten`)
**License:** Public GitHub issue; reproduced verbatim for editorial commentary in the talk

This screenshot is **not rendered in the deck** — it's kept in `assets/` as a research artifact referenced in the speaker notes for slides 3, 10, 11, and 12.

---

## Slide 9 — Scope data (CNCF End User TAB, Apr 2026)

**Source:** https://www.cncf.io/blog/2026/04/02/ingress-nginx-retirement-experience-from-end-users/
**Stat cited on the slide:** *"As of the end of 2025 ~60% of deployments rely on ingress-nginx as an ingress controller."* (from CERN's contribution to the post)
**Posted:** April 2, 2026
**License:** CC BY 4.0 (CNCF blog content)
**Also features:** Boeing and an unnamed "large tech company" reporting on migration paths

The CNCF End User TAB is the industry-neutral end-user voice within the CNCF governance. When they publish a stat from an actual operator, that's the most authoritative public number available — more credible than a survey estimate because it's a real production number from CERN.

---

## How attribution is delivered in the deck

- **On the slide:** the figure caption contains the contextual attribution (who he is and why he's there).
- **In this file:** the formal license record, source URL, and original author credit.
- **In the talk's verbal delivery:** the speaker is expected to mention the source of the receipts (Stallman by name, the GitHub issue numbers, the 2022 mailing-list post) and reference the research file.

No image modifications were made other than placement in the slide layout.

---

## Fonts

The deck uses Google Fonts:

- **IBM Plex Sans** — Apache License 2.0
  https://fonts.google.com/specimen/IBM+Plex+Sans
- **JetBrains Mono** — Apache License 2.0
  https://fonts.google.com/specimen/JetBrains+Mono

These are loaded via CSS `@import` in `styles.css`.

---

## Framework and libraries

- **Reveal.js** — MIT License
  https://revealjs.com/
- **Font Awesome** — Free tier (icons: CC BY 4.0, fonts: SIL OFL 1.1)
  https://fontawesome.com/
- **Chart.js** — MIT License (loaded but not currently used in v1)
  https://www.chartjs.org/
- **QR code generation:** `https://api.qrserver.com/v1/create-qr-code/` — used to generate the four QR codes in the deck. The service is free and does not retain the encoded URLs.

---

## Slide 2 (whoami) — Credential badges

The whoami slide displays a row of four circular credential badges:

| File | Badge | Source |
|---|---|---|
| `cert-gcp-pca.png` | Google Cloud Professional Cloud Architect | https://images.credly.com/images/71c579e0-51fd-4247-b493-d2fa8167157a/image.png |
| `cert-kubestronaut.png` | CNCF Kubestronaut (all 5 CNCF K8s certs) | https://images.credly.com/images/cd6c6449-6814-4613-a2d3-13cf4ac5be4f/image.png |
| `cert-cka.png` | CKA — Certified Kubernetes Administrator | https://images.credly.com/size/680x680/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png |
| `cert-cks.png` | CKS — Certified Kubernetes Security Specialist | https://images.credly.com/size/680x680/images/9945dfcb-1cca-4529-85e6-db1be3782210/kubernetes-security-specialist-logo2.png |

**Replacement pattern:** to add or swap a badge, download the image from Credly (right-click the badge → "Save image as"), drop it into `assets/` as `cert-<shortname>.png` (square PNG, ideally ≥ 400px), and add or replace an `<img class="cert-badge" src="assets/cert-<shortname>.png" alt="..." title="..." />` in the `.cert-row` div of the `whoami` section.

**License note:** All Credly badge images are property of their respective issuers (Google for GCP PCA, CNCF for Kubestronaut / CKA / CKS). They are reproduced here for editorial commentary about the speaker's qualifications — nominative fair use.

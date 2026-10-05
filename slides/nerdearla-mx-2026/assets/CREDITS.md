# CREDITS

Image, media and license record for the Nerdearla México 2026 talk *"Open Source Isn't Gratis"* by Christopher Tineo (Spanish edition, revision 3; copied from `../../devopsdays-philly-2026/`).

Slides are referred to by their section id (`index.html#/<id>`), not by number, so this file stays correct when slides are added or moved.

## How attribution is delivered

- **On the slide:** every slide that shows a fact, number or quote has a `Sources:` footer line with links. Licensed media (the CC BY photo) carries its full attribution in its caption: creator, license with link, source with link.
- **In this file:** the license record for every asset file in `assets/`.
- **Rule:** nothing in `assets/` is published without being both used on a slide and listed here. Research snapshots that are not shown live outside `slides/` (see `../../../.unpublished-assets/`).

---

## Licensed media

### `stallman.jpg` (`#stallman-free`)

- **Source:** https://commons.wikimedia.org/wiki/File:Richard_Stallman_at_LibrePlanet_2019.jpg
- **Author:** Ruben Rodriguez, LibrePlanet 2019, 23 April 2019
- **License:** CC BY 4.0, https://creativecommons.org/licenses/by/4.0/
- **Changes:** none (2000×2588, identical to the original; checked 2026-09-27)
- **On-slide attribution:** "Photo: Ruben Rodriguez, LibrePlanet 2019 · CC BY 4.0 · Wikimedia Commons" (both linked), in the figure caption.

### `nadia-eghbal-strange-loop-2017.jpg` (`#closing`)

- **Source:** https://commons.wikimedia.org/wiki/File:Nadia_Eghbal_at_Strange_Loop_2017_-_1.jpg
- **Author:** Chris Koerner, Strange Loop 2017, St. Louis, 30 September 2017
- **License:** CC BY-SA 2.0, https://creativecommons.org/licenses/by-sa/2.0/ (checked on the Commons file page, 2026-10-01). The cropped version is shared under the same license.
- **Changes:** cropped to the podium and screen from the 1920px Commons rendition, resized to 1000×723. Colors unchanged.
- **On-slide attribution:** "Nadia Eghbal at Strange Loop 2017 · Photo: Chris Koerner, CC BY-SA 2.0, Wikimedia Commons · cropped" (license and source linked), in the figure caption.

---

## Trademarks (nominative use)

Marks identify the company or project being discussed. All trademarks belong to their owners; no endorsement is implied.

| File | Used on | Source | Notes |
|---|---|---|---|
| `nginx-logo.png` | `#case-ingress-intro` | https://media.trustradius.com/product-logos/3s/RN/97DT9BKJ2M34.PNG | NGINX® is a registered trademark of F5, Inc. Better source: F5 press kit, https://www.f5.com/company/news/press-kit |
| `logos/nerdearla.png` | `#title` | https://nerdearla.com/static/images/NERDEARLA_color_simplified_black.png (official press kit, https://nerdearla.com/en/press/) | Event logo, resized to 1200px wide; colors unchanged. Same file in both themes. Deck palette sampled from it: `#00A9A5`, `#FF333E`, `#FFB400`, `#000000`. Used on a talk accepted at the event. |
| `logos/palantir-wordmark.png` | `#title` | https://1000logos.net/wp-content/uploads/2022/08/Palantir-Logo.jpg (converted to a transparent mask, cropped) | Speaker's employer. Better source: Palantir brand/comms. Employer approval for logo use is the speaker's call. |
| `logos/openssf.svg` | `#companies-paying`, `#funding-that-works` | https://openssf.org/wp-content/uploads/2022/10/openssf-icon-color.svg | OpenSSF / Linux Foundation mark |
| `logos/{android,anthropic,apachemaven,axios,cncf,europeanunion,firefox,github,linuxfoundation,npm,openai,opentelemetry,trivy}.svg` | various | Simple Icons, https://simpleicons.org (`cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg`; `android.svg`, `axios.svg`, `cncf.svg`, `letsencrypt.svg`, `linuxfoundation.svg`, `opentelemetry.svg` from simple-icons@16.33.0, Sep 30 2026) | SVG data CC0 1.0; the marks remain their owners' trademarks |

Single-color marks are drawn as CSS masks (`.logo` in `styles.css`) so they follow the theme. Masks can't load files over `file://`, so `assets/logos.css` embeds each used logo as a data URI. After adding or changing a logo, run `python3 build-css.py` in `assets/logos/`.

---

## Source screenshots (`evidence/`)

Screenshots of primary sources, taken with headless Chrome on 2026-09-26 and cropped to the headline. Each is captioned with site, title and date, and linked in the slide's `Sources:` footer. Content belongs to the page owners; used for commentary and citation.

| File | Page | Used on |
|---|---|---|
| `percona-pr-2315.png` | https://github.com/percona/percona-server-mongodb-operator/pull/2315 (captured 2026-09-30 with headless Chromium; cropped to the repo header, PR title and "Merged" line, GitHub's site nav and the reviewer list left out). The PR is the speaker's own contribution | `#one-less-fork` |
| `glasswing-update.png` | https://www.anthropic.com/research/glasswing-initial-update | `#ai-vulnerability-explosion` |
| `openssf-registries-signers.png` | OpenSSF's own post image, https://openssf.org/wp-content/uploads/2026/09/Open-Source-Sustainability-1.png | `#companies-paying` |
| `scorecard-ingress-nginx.png` | https://scorecard.dev/viewer/?uri=github.com/kubernetes/ingress-nginx (captured 2026-09-27; report header and the "Maintained" row stitched together, other rows cut) | `#reframe` |
| `endoflife-kubernetes.png` | https://endoflife.date/kubernetes (captured 2026-09-27; title and support chart) | `#reframe` |
| `bloomberg-otel-cohort.png` | https://www.cncf.io/blog/2026/07/23/sustaining-opentelemetry-what-a-10-week-contributor-cohort-actually-looks-like/ (captured 2026-10-04 with Playwright; title and byline only, consent banner dismissed) | `#reframe` |

---

## Speaker's own material

| File | Used on | Notes |
|---|---|---|
| `linkedin-qr.png`, `slides-qr.png` | `#contact` | Generated with the `qrcode` npm package, teal `#1F6B73` on white, 400×400; shown on a white tile so phones can scan them in both themes. Encode https://www.linkedin.com/in/christopher-tineo/ and https://tineoc.github.io/talks/nerdearla-mx-2026/ (decoded with jsQR to confirm; slides QR regenerated Oct 4 2026). |
| `nco-qr.png` | `#contact` | Generated with the `qrcode` npm package, same style as above. Encodes https://k8s.dev/docs/orientation/, which redirects to the Kubernetes New Contributor Orientation page, https://www.kubernetes.dev/docs/orientation/ (decoded with jsQR to confirm, Oct 1 2026). |
| `cncf-mx-qr.png` | `#contact` | Generated with the `qrcode` npm package, same style. Encodes https://ocgroups.dev/explore?entity=groups&community%5B0%5D=cncf&ts_query=Mexico, the CNCF community-groups search for Mexico (Cloud Native Mexico City, Guadalajara, Querétaro, Colima, LATAM). community.cncf.io/explore returns 404, so the ocgroups.dev URL is used (decoded with jsQR, Oct 4 2026). |

### Credential badges (`#whoami`)

From https://www.credly.com/users/christopher-tineo/badges (images from `images.credly.com`), refreshed 2026-09-26. Badges are issued to the speaker by the credential owners, and Credly lets earners display them.

| File | Badge | Issuer |
|---|---|---|
| `cert-cncf-ambassador.png` | CNCF Ambassador 2026–2028 (white corners made transparent) | The Linux Foundation / CNCF |
| `cert-kubestronaut.png` | Kubestronaut | CNCF |
| `cert-gcp-pca.png`, `cert-gcp-pca-dark.png` | Professional Cloud Architect (dark copy: light disc removed, grey text turned white) | Google Cloud |
| `cert-gcp-devops.png`, `cert-gcp-devops-dark.png` | Professional Cloud DevOps Engineer (dark copy as above) | Google Cloud |
| `cert-cks.png` | Certified Kubernetes Security Specialist | CNCF |
| `cert-mcpa.png` | Model Context Protocol Associate | The Linux Foundation |

### Community logos (`#whoami`)

| File | Source |
|---|---|
| `community-cn-nyc.png` | Cloud Native Community Groups NYC logo (speaker's local community repo) |
| `community-cn-santo-domingo.png` | Group image on https://community.cncf.io/cloud-native-santo-domingo/ |
| `community-kcd-nyc-2026.png` | Cropped from the KCD New York 2026 logo (`../../sre-day-2026-q2/assets/kcd-logo.png`); the speaker is an organizer |

---

## Fonts and libraries

| Resource | License | Loaded from |
|---|---|---|
| IBM Plex Sans | SIL Open Font License 1.1 | Google Fonts (`@import` in `styles.css`) |
| JetBrains Mono | SIL Open Font License 1.1 | Google Fonts |
| Reveal.js 5.1.0 | MIT | cdn.jsdelivr.net |
| Font Awesome Free 6.5.1 | Icons CC BY 4.0, fonts SIL OFL 1.1, code MIT (attribution is in the CSS file headers) | cdnjs.cloudflare.com |

Charts (`#case-ingress-demand`, `#oss-value-gap`) are inline SVG/HTML; no chart library is loaded.

---

## Removed from the published folder (2026-09-27)

Unused files were moved to `../../../.unpublished-assets/devopsdays-philly-2026/` so GitHub Pages doesn't serve uncited third-party content: five reference screenshots (`openssf-registries`, `github-pr-limits`, `godot-policy`, `kernel-crawlies`, `maven-central`), `issue-4404-screenshot.png`, `k8s-picture-10-years.jpg`, `cert-cka.png` (CKA expired 2026-07-19), and 23 unused Simple Icons SVGs. Also `ort_report_tineoc.png`, after the ORT and gh/glab slides were cut (2026-09-27). And `gcc.png`, `godotengine.svg`, `codeberg.svg` after `#closing-doors` was cut (2026-09-27).

`logos/letsencrypt.svg` was moved to `../../../.unpublished-assets/nerdearla-mx-2026/` on Oct 4 2026, after the text trim removed its only use on `#framework`.

After the simplification pass (Oct 4 2026) these were also moved to `../../../.unpublished-assets/nerdearla-mx-2026/`, because no slide shows them any more: `logos/{android,cncf,europeanunion,linuxfoundation}.svg` (the two evidence screenshots `endoflife-kubernetes.png` and `scorecard-ingress-nginx.png` were restored to `#reframe` the same day). Their source facts now live in the speaker notes of `#fork-tax`, `#framework`, `#funding-that-works` and `#reframe`.

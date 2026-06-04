# References

Primary and supporting sources cited in *"Free Software Isn't Gratis"* (SRE Day NYC 2026 Q2).

---

## Primary (cited in the talk)

### Kubernetes project — Ingress NGINX retirement statement
**URL:** https://kubernetes.io/blog/2026/01/29/ingress-nginx-statement/

Used as: the cited primary reference for the Ingress NGINX retirement case study (slides 9–12, especially the timeline on slide 10). This is the Kubernetes project's official statement on the deprecation and end-of-life schedule for the most widely deployed Kubernetes ingress controller.

### CNCF End User TAB — "Ingress NGINX retirement: Experience from end users"
**URL:** https://www.cncf.io/blog/2026/04/02/ingress-nginx-retirement-experience-from-end-users/

Used as: the source for the ~60% scope stat on slide 9. CERN reported this number for end-of-2025 deployments. Also features Boeing and an unnamed "large tech company" reporting on their migration paths (CERN → Gateway API / Traefik; large tech → Traefik or Envoy Gateway). Posted April 2, 2026.

---

## Background and supporting reading

### Free Software Foundation — The Free Software Definition
**URL:** https://www.gnu.org/philosophy/free-sw.html

The original framing of "free software" as a matter of user freedom (the "four freedoms"), written by Richard Stallman. Provides the etymology behind the talk's title and the "free as in speech" framing on slide 7.

### Tidelift — Maintainer surveys
**URL:** https://tidelift.com/

Tidelift's annual surveys of open source maintainers are the source of the "70%+ of maintainers are unpaid" figure on slide 15. The exact number moves year to year; the order of magnitude is consistent across recent editions.

### Synopsys — Open Source Security and Risk Analysis (OSSRA)
**URL:** https://www.synopsys.com/software-integrity/resources/analyst-reports/open-source-security-risk-analysis.html

The source of the "70%–90% of code in a typical enterprise codebase is open source" figure on slide 6.

### Linux Foundation — Census and research reports
**URL:** https://www.linuxfoundation.org/resources/

Reports on the scale, concentration, and sustainability of critical open source projects. Useful for any "why this matters at scale" data points if the talk is extended.

---

## Notes for future versions

The talk references these sources by URL. For printed handouts, screenshots, or PDF export, capture a snapshot of each source page in the corresponding `assets/` subdirectory and reference both the live URL and the snapshot date in the slide's `.footnote` block.

The Kubernetes project URL on slide 10 is the only URL that needs to be hard-coded in v1. Everything else can be cited verbally or in the speaker notes.

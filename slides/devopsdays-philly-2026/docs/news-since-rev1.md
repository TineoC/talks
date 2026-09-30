# News since revision 1 (June 2026 → September 2026)

> Research notes for revision 2 of *Free Software Isn't Gratis* (DevOpsDays Philadelphia 2026).
> Revision 1 was delivered at SRE Day NYC 2026 Q2 (slides finalized 2026-06-06).
> Compiled 2026-09-26. Items marked **(secondary)** were not checked against the primary source;
> verify them before putting them on a slide. Items marked **(context)** predate June 2026.
>
> **Verification pass (2026-09-26):** every item used on a slide was re-checked against its primary page
> (raw HTML grep or the GitHub API). Corrections from that pass are applied below and marked **(corrected)**.
> The verbatim quotes used on slides are in [`../REFERENCES.md`](../REFERENCES.md).

---

## 1. AI and maintainer burden

| Date | What happened | Source |
|---|---|---|
| 2026-06-15 → 08-03 | **curl "Summer of Bliss"**: no vulnerability reports accepted July 1 – Aug 3 after "a huge pressure for the last four months". Paid support customers kept full service. Report volume is 4–5× 2024, >1/day, 15–16% real. curl 8.21.0 (Jun 24) shipped a record 18 security fixes. **(corrected)** Volume is ~2× the 2025 rate (not 4–5× 2024); only vulnerability reports were paused, the issue trackers stayed open. | https://daniel.haxx.se/blog/2026/06/15/curl-summer-of-bliss/ · https://daniel.haxx.se/blog/2026/08/03/what-the-bliss-taught-us/ · https://daniel.haxx.se/blog/2026/04/22/high-quality-chaos/ |
| 2026-09-25 | Stenberg: curl has shipped in every Apple OS since 2001 — "We have never worked with Apple, never received sponsorship by Apple." | https://daniel.haxx.se/blog/2026/09/ |
| 2026-08-29 | **kernel.org scrapers**: ~6M requests/day to git.kernel.org; the post says "legitimate requests are only about 2%" **(corrected wording)**; 14 CPU cores just render HTML for them; ~33% solve Anubis. | https://people.kernel.org/monsieuricon/creepy-crawlies |
| 2026-06-17 → 08-06 | **GitHub PR limits**: cap open PRs from users without write access (AI agent PRs count), PR archiving, org-level caps. GitHub: merged PRs went 25M/month (Jan 2023) → "tops 90 million" as of the Jun 18, 2026 post **(corrected: not "Mar 2026")**. | https://github.blog/open-source/maintainers/how-pull-request-limits-are-cutting-down-the-noise/ · https://github.blog/changelog/2026-08-06-set-pull-request-limits-at-the-organization-level/ |
| 2026-06-30 | **Godot contribution policy**: bans autonomous agents and substantial AI-generated code; disclosure required. Reason: reviewer bottleneck and morale. | https://godotengine.org/article/contribution-policy-2026/ |
| 2026-07-29 | **GCC** declines legally significant (~15+ lines) LLM-derived contributions. **(secondary)** | https://lwn.net/Articles/1086041/ |
| 2026-07-22 | **Codeberg** members vote 358–144 (14 abstain, 517 of 1,085 voted) to stop hosting mostly-LLM-generated projects. Verified from the poll screenshot in the PR. | https://lwn.net/Articles/1084404/ |
| 2026-05-18 | **(context)** Torvalds: kernel security list "almost entirely unmanageable" — 2–3 reports/week → 5–10/day. **(secondary)** | https://www.tomshardware.com/software/linux/linus-torvalds-says-ai-bug-reports-have-made-the-linux-security-mailing-list-almost-entirely-unmanageable |

## 2. AI labs and open source

| Date | What happened | Source |
|---|---|---|
| 2026-06-02 | **Anthropic expands Project Glasswing**, lists critical OSS maintainers as priority. **(context, May 22)**: "75 of the 530 high- or critical-severity bugs we've reported have now been patched"; some maintainers asked to slow down. **(corrected)** The "1,596 vulns / 281 projects / ~6%" figures are from a Cloud Security Alliance note, not Anthropic. $2.5M to Alpha-Omega/OpenSSF, $1.5M to ASF. | https://www.anthropic.com/news/expanding-project-glasswing · https://www.anthropic.com/research/glasswing-initial-update |
| 2026-06-22 | **OpenAI "Patch the Planet"** (OpenAI page returned 403; verified via the Trail of Bits launch post, https://blog.trailofbits.com/2026/06/22/introducing-patch-the-planet/) with Trail of Bits, HackerOne, CALIF: humans triage AI findings before maintainers see them; patches included. **(secondary date)** | https://openai.com/index/patch-the-planet/ |
| 2026-09-04 | **OpenAI $1B subsidized Daybreak access** for defenders incl. OSS maintainers — product credits, not cash. **(secondary)** | https://www.helpnetsecurity.com/2026/09/04/openai-daybreak-frontline-defenders-access/ |
| 2026-03-17 | **(context)** $12.5M from Anthropic, AWS, GitHub, Google, DeepMind, Microsoft, OpenAI via Alpha-Omega/OpenSSF for maintainers overwhelmed by AI-found vulns. | https://openssf.org/press-release/2026/03/17/linux-foundation-announces-12-5-million-in-grant-funding-from-leading-organizations-to-advance-open-source-security/ |
| 2026-05 | **(context)** Mozilla fixed 423 Firefox security bugs in April; 271 from its Claude Mythos pipeline. **(corrected)** The "2025 avg 21.5/month" comparison is from The Register, not Mozilla. Shows AI works when a funded team absorbs it. | https://hacks.mozilla.org/2026/05/behind-the-scenes-hardening-firefox/ |
| 2026-08-10 | Meta releases Muse Glimmer (30B) under Apache 2.0. | https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model |
| 2026-08 | Alibaba Qwen3.8-Max weights under custom revenue-threshold license; 27B under Apache 2.0. **(secondary)** | https://llm-stats.com/blog/research/qwen3-8-max-open-weights |
| 2026-08 → 09 | LF submits OpenMDW license to OSI; "open weights ≠ open source" dispute continues. **(secondary)** | https://lwn.net/Articles/1089251/ |

## 3. Vulnerabilities and supply chain

| Date | What happened | Source |
|---|---|---|
| 2026-08-04 | **ChainDrop npm worm** (Mini Shai-Hulud variant): "hundreds of popular npm packages" starting with keyv (Datadog, verified). Microsoft: "more than 400 packages across multiple unrelated publishers"; "Evidence points towards stolen maintainer credentials" (verified from the page text, 2026-09-26). | https://securitylabs.datadoghq.com/articles/npm-worm-compromises-popular-npm-packages/ · https://www.microsoft.com/en-us/security/blog/2026/08/04/chaindrop-supply-chain-compromise-anatomy-self-propagating-worm/ |
| 2026-06-01 → 17 | **Red Hat**: 32 `@redhat-cloud-services` npm packages compromised via malicious VS Code extension → hijacked GitHub account. | https://access.redhat.com/security/vulnerabilities/RHSB-2026-006 |
| 2026-06 → 07 | PyPI worm (~29 pkgs), typosquatted payment SDKs, jscrambler (stolen token), AsyncAPI (vulnerable GitHub Actions workflow). **(vendor recap)** | https://securityboulevard.com/2026/07/the-streak-continues-four-more-supply-chain-attacks-hit-npm-and-pypi/ |
| 2026-08 | Gitea CVE-2026-60004 (CVSS 9.8) exploited in the wild. **(secondary)** | https://thehackernews.com/2026/08/critical-gitea-rce-actively-exploited.html |
| 2026-09-03 / 18 | npm: multiple trusted publishers, staged publishing with malware scan, stage-only tokens; bypass-2FA publishing removed Jan 2027. | https://github.blog/changelog/2026-09-18-stage-only-npm-tokens-for-safer-automation/ |
| 2026-09-22 | **CISA "CVE Program: Quality Era Framework"**. ~67k CVEs published by Sep 18, ~96k forecast for 2026. **(CVE counts secondary)** | https://www.cisa.gov/resources-tools/resources/cve-program-establishing-quality-era-framework |
| 2026-04-15 | **(context)** NIST stops universal NVD enrichment; pre-March backlog "Not Scheduled". | https://www.nist.gov/news-events/news/2026/04/nist-updates-nvd-operations-address-record-cve-growth |
| 2026-03-24 | **(context)** GitHub saw a 224% jump in vuln reports over 90 days, attributed to AI. | https://www.cybersecuritydive.com/news/cve-program-ai-vulnerability-reports-funding/815594/ |
| 2026-03-19 | **(context)** Trivy GitHub Action: 76 of 77 tags force-pushed to credential stealer. | https://github.com/advisories/GHSA-69fq-xp46-6x23 |

ingress-nginx: no primary-source incident found after June 2026.

## 4. How much companies use OSS (latest edition of each report)

| Report | Numbers | Source |
|---|---|---|
| Black Duck OSSRA 2026 (Feb 2026) | 98% of 947 codebases contain OSS; mean vulns per codebase +107%; 68% license conflicts. | https://www.prnewswire.com/news-releases/black-duck-research-shows-open-source-vulnerabilities-have-doubled-as-ai-accelerates-code-creation-302692782.html |
| Harvard HBS WP 24-038 (Jan 2024, still latest) | OSS demand-side value $8.8T, $4.15B to recreate; firms would spend 3.5× more; 96% of value from 5% of developers. | https://www.hbs.edu/faculty/Pages/item.aspx?num=65230 |
| Sonatype 2026 (Jan 2026) | 9.8T downloads across top 4 registries (+67% YoY); 454,648 new malicious packages. | https://www.sonatype.com/press-releases/sonatype-research-reveals-open-malware-grows-75-percent |
| Linux Foundation ROI report (Feb 2026) | Contributing returns 2–5×; consume-only costs up to $3.5M, ~$258K per release to keep private forks. | https://www.linuxfoundation.org/press/new-linux-foundation-report-shows-active-open-source-contribution-delivers-2-5x-roi-while-passive-consumption-increases-costly-technical-debt |
| Tidelift maintainer report (Sep 2024, no newer edition) | 60% unpaid; 60% quit or considered quitting; paid maintainers 55% more likely to follow security practices. Cite as "Tidelift, 2024". | https://www.businesswire.com/news/home/20240917030299/en/Tidelift-Study-Reveals-Paid-Open-Source-Maintainers-Do-Significantly-More-Critical-Security-and-Maintenance-Work-Than-Unpaid-Maintainers |
| GitHub Octoverse 2025 (Oct 2025) | 180M+ developers, 395M public repos. 2026 edition expected late October. | https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/ |

## 5. What companies and governments did

| Date | What happened | Source |
|---|---|---|
| 2026-09-16 | **OpenSSF "Sustainable Package Registries" enterprise commitment**: Arm, Datadog, Dell, Ericsson, GitHub, Google, IBM, Kusari, Microsoft, Red Hat, Rust Foundation, Sonatype commit to pay registries based on enterprise use. Registries often run by "two or three people". | https://openssf.org/blog/2026/09/16/were-in-enterprise-commitment-to-sustainable-package-registries/ |
| 2026-06-16 | **Maven Central** publishing limits + paid "Publisher Pro" tier; enforcement moved from Aug 11 to Oct 1, 2026 (Jul 23 update). "But open does not mean infinite. And free does not mean costless." | https://www.sonatype.com/blog/open-publishing-commercial-scale |
| 2026-09-11 | **EU CRA Article 14 reporting live**: exploited vulns reported in 24h/72h/14d. Full obligations Dec 11, 2027. | https://digital-strategy.ec.europa.eu/en/policies/cra-reporting |
| 2026-06 | Red Hat publishes CRA open-source steward guidelines. **(date from URL)** | https://access.redhat.com/security/eu-cyber-resilience-act-stewardship-guidelines |
| 2026-06-03 | **EU Open Source Strategy** (Tech Sovereignty Package). ~€2B / 7 years and an EU Sovereign Tech Fund pilot reported by press, not on the EC page. **(secondary figures)** | https://commission.europa.eu/news-and-media/news/commission-boosts-open-and-interoperable-digital-ecosystems-public-administrations-2026-06-03_en · https://www.techpolicy.press/how-the-eus-tech-sovereignty-package-finally-puts-open-source-to-the-test/ |
| 2026-08-13 | **GitHub Secure Open Source Fund** session 4: $500K+ to 50 projects ($10K each). **(corrected)** 533 new CVEs and 4,210 CodeQL alerts are totals across all sessions (188 projects, $1.88M), not session 4. | https://github.blog/open-source/maintainers/what-50-open-source-projects-taught-us-about-security-in-the-ai-era/ |
| 2026-08-24 | **Sovereign Tech Agency** (Germany): first cohort of 10 maintainers paid for standards work; Resilience Program hiring. | https://www.sovereign.tech/news/newsletter-sovereign-tech-standards-network-kicks-off-international-collaboration-on-open-digital-infrastructure-hiring-more |
| undated | Open Source Pledge counter: $7.41M paid total, $3M+ past year. | https://opensourcepledge.com/ |
| 2026-01-23 | **(context)** US OMB M-26-05 rescinds SBOM/attestation requirements — US moves away from mandates as EU enforces. | https://www.nextgov.com/cybersecurity/2026/01/omb-reverses-biden-era-software-attestation-order/410939/ |

No relicensing to source-available found in June–September 2026 (Elastic and Redis went back to AGPL earlier). Do not claim a relicensing wave.

---

## Stale or conflicting claims in revision 1 to fix

- Slide 5: cite OSSRA 2026 (98%) instead of "recent editions"; README says 96%.
- Slides 9 / 15 and notes: ingress-nginx usage figures conflict (60% / ~70% / 50%). Pick one source.
- Slide 11: "Now: thousands still running it" — repo archived 2026-03-24; check the "Mar 2025 maintenance mode" date against the Nov 2025 retirement announcement.
- Slide 16: unpaid-maintainer stat cites ByteIota; use Tidelift 2024 (60%) directly. REFERENCES.md says 70%+, research file says ~83% — reconcile.
- Slide 17: Glasswing "on track for 3,900 validated" is a snapshot; replace with May 22 update (1,596 disclosed, ~6% patched).
- Slide 21: $1T SaaS figure is sourced only to a YouTube video.
- Slide 2: Kubernetes 1.37 release role; title slide and slides 27–28 (KCD NY Jun 10, voucher) are event-specific.
- REFERENCES.md slide numbers are off against the current deck.

## Also corrected in the verification pass

- **BLS**: the Software Developers page (updated Aug 27, 2026) now says "projected to grow 10 percent from 2025 to 2035". Revision 1's +15% was the 2024–34 projection.
- **Software sell-off**: Bloomberg via Fortune (Feb 5, 2026) says software stocks "dropped almost $1 trillion over the past seven days", not "in a single month".
- **ingress-nginx ~60%**: CERN's own deployments (CNCF End User TAB, Apr 2, 2026), not an industry-wide share.
- **ingress-nginx timeline**: retirement announced Nov 11, 2025; Steering statement Jan 29, 2026; last release helm-chart-4.15.1 on Mar 19, 2026; repository archived (GitHub API).

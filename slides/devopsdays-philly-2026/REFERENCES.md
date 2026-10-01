# References

Sources cited in *"Free Software Isn't Gratis"*, revision 2 (DevOpsDays Philadelphia 2026, Oct 1, 2026).
Revision 1 (SRE Day NYC 2026 Q2) and its references are kept unchanged in [`../sre-day-2026-q2/`](../sre-day-2026-q2/).

Every quote and number below was re-checked against the linked page on **2026-09-26**. Quotes are verbatim.
Slide numbers follow the current deck order; the slide `id` is given too, since numbers shift between revisions.
Notes on how each item was checked are in [`docs/news-since-rev1.md`](docs/news-since-rev1.md).
Snapshots of several source pages are in [`assets/evidence/`](assets/evidence/) (captured 2026-09-26).

---

## Act 01 — The Problem

### Slide 5 (`stat-oss-everywhere`) — Open source is everywhere
- **Black Duck, OSSRA 2026** press release, Feb 25, 2026 — 947 codebases; open source "appearing in 98% of codebases".
  https://www.prnewswire.com/news-releases/black-duck-research-shows-open-source-vulnerabilities-have-doubled-as-ai-accelerates-code-creation-302692782.html
- **Hoffmann, Nagle & Zhou, "The Value of Open Source Software"**, Harvard Business School WP 24-038, Jan 2024 —
  "We estimate the supply-side value of widely-used OSS is $4.15 billion, but that the demand-side value is much larger at $8.8 trillion." / "96% of the demand-side value is created by only 5% of OSS developers."
  https://www.hbs.edu/faculty/Pages/item.aspx?num=65230

### Slides 6–7 (`free-vs-open`, `stallman-free`)
- **FSF, The Free Software Definition** — https://www.gnu.org/philosophy/free-sw.html

## Act 02 — The Examples (ingress-nginx)

### Slide 9 (`case-ingress-intro`)
- **CNCF End User TAB, "Ingress NGINX retirement: Experience from end users"**, Apr 2, 2026 — CERN's section:
  "As of the end of 2025 ~60% of deployments rely on ingress-nginx as an ingress controller." This is CERN's own fleet, not an industry-wide figure.
  https://www.cncf.io/blog/2026/04/02/ingress-nginx-retirement-experience-from-end-users/

### `case-ingress-timeline` — CVE chart
- **GitHub Advisory Database**, Go package `k8s.io/ingress-nginx`, queried Sep 27, 2026 — 17 CVEs (1 critical, 10 high, 5 medium, 1 low), grouped by CVE-ID year. https://github.com/advisories?query=k8s.io%2Fingress-nginx
- (The `hook` slide citing kubernetes/ingress-nginx#4404 was removed on Sep 27, 2026.)

### Slide 11 (`case-ingress-timeline`)
- **"Ingress NGINX Retirement: What You Need to Know"**, Tabitha Sable, Nov 11, 2025 — https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/
- **Kubernetes Steering + Security Response Committee statement**, Kat Cosgrove, Jan 29, 2026 —
  "In March 2026, Kubernetes will retire Ingress NGINX, a piece of critical infrastructure for about half of cloud native environments."
  https://kubernetes.io/blog/2026/01/29/ingress-nginx-statement/
- **GitHub API** — last release `helm-chart-4.15.1` published 2026-03-19; last push 2026-03-23; repository archived.
  https://github.com/kubernetes/ingress-nginx/releases

### Slide 12 (`case-ingress-demand`) — 10 years of demand
- **GitHub search API**, queried 2026-09-26: issues and PRs opened per year on kubernetes/ingress-nginx (`repo:kubernetes/ingress-nginx created:<year>`, with and without `is:issue`). 2016 (from Nov 4) 52/48 · 2017 741/1,021 · 2018 817/927 · 2019 700/558 · 2020 957/870 · 2021 758/624 · 2022 652/721 · 2023 595/731 · 2024 455/1,342 · 2025 319/1,414 · 2026 16/366. Total 14,684.
- **Wiz Research, "IngressNightmare: CVE-2025-1974"**, Mar 24, 2025 — "over 41% of internet-facing clusters are running Ingress-NGINX" / "over 6,500 clusters, including Fortune 500 companies, that publicly expose vulnerable Kubernetes ingress controllers' admission controllers to the public internet". Also cited on slide 11.
  https://www.wiz.io/blog/ingress-nginx-kubernetes-vulnerabilities
- No public year-by-year dataset of production usage exists; the chart shows demand on the maintainers, not install counts.

### `case-ingress-people` (the `case-ingress-collapse` slide was removed on Sep 27, 2026; its dev-list post moved here)
- **Kubernetes dev list, "we're drowning"** (@strongjz), Jun 23, 2022 — https://groups.google.com/a/kubernetes.io/g/dev/c/rxtrKvT_Q8E/m/6_ej0c1ZBAAJ
- **kubernetes/org#5305** (@rikatz steps down), Dec 15, 2024 — https://github.com/kubernetes/org/pull/5305
- Research notes: [`docs/ingress-nginx-maintainer-history.md`](docs/ingress-nginx-maintainer-history.md), [`docs/ingress-nginx-calls-for-help.md`](docs/ingress-nginx-calls-for-help.md) (compiled for revision 1, June 2026).

## Act 03 — The Cost

### Slide 16 (`curl-apple`)
- **Daniel Stenberg, "25 years on Apple computers"**, Sep 25, 2026 —
  "We have never worked with Apple, never received sponsorship by Apple, not had them as customers and except a few rare and mostly failed attempts there have never been any communication between us."
  https://daniel.haxx.se/blog/2026/09/25/25-years-on-apple-computers/

### Slide 17 (`cost-companies`)
- Kubernetes statement, Jan 29, 2026 (above) — "None of the available alternatives are direct drop-in replacements. This will require planning and engineering time. Half of you will be affected."

### Slide 18 (`cost-maintainers`)
- **Tidelift, 2024 State of the Open Source Maintainer Report**, Sep 17, 2024 — "60% of maintainers are (still) not paid for their work"; 60% have quit or considered quitting. No newer edition exists (Tidelift is now part of Sonar).
  https://www.businesswire.com/news/home/20240917030299/en/Tidelift-Study-Reveals-Paid-Open-Source-Maintainers-Do-Significantly-More-Critical-Security-and-Maintenance-Work-Than-Unpaid-Maintainers
- **@BenTheElder**, kubernetes/ingress-nginx#14178, Jan 21, 2026 — "Nobody has been paying anyone to work on this software for some time, it has been entirely volunteer driven and they've been overwhelmed."
  https://github.com/kubernetes/ingress-nginx/issues/14178#issuecomment-3779849797

### Slide 19 (`ai-maintainer-flood`)
- **"curl summer of bliss"**, Jun 15, 2026 — "As previously mentioned, we have been under a huge pressure for the last four months or so. Now we need some rest. We do not expect this deluge to be over." / "Everyone with a paid support contracts will of course still get full and appropriate service even during this period." Vulnerability reports paused July 1 – August 3, 2026.
  https://daniel.haxx.se/blog/2026/06/15/curl-summer-of-bliss/
- **"What the bliss taught us"**, Aug 3, 2026 — "This was possibly our best project decision in a long while."
  https://daniel.haxx.se/blog/2026/08/03/what-the-bliss-taught-us/
- **"High-Quality Chaos"**, Apr 22, 2026 — "Recently it's been about double the rate we had through 2025, which already was more than double from previous years." / confirmed vulnerabilities "somewhere in the 15-16% range".
  https://daniel.haxx.se/blog/2026/04/22/high-quality-chaos/
- **GitHub Blog, "How pull request limits are cutting down the noise"**, Camilla Moraes & Ashley Wolf, Jun 18, 2026 — "In January 2023, developers merged about 25 million pull requests a month across GitHub. Today that number tops 90 million—a roughly 3.6x increase."
  https://github.blog/open-source/maintainers/how-pull-request-limits-are-cutting-down-the-noise/
- **Konstantin Ryabitsev, "Creepy crawlies"**, Aug 29, 2026 — "git.kernel.org receives about 6M daily requests"; "legitimate requests are only about 2% of git.kernel.org traffic — everything else are scrapers."
  https://people.kernel.org/monsieuricon/creepy-crawlies

### `maintainer-voices` (removed from the deck Sep 27, 2026; kept for reference) — GitHub comments, fetched via the GitHub API
| Who | Date | Quote | Link |
|---|---|---|---|
| @bagder (Daniel Stenberg) | 2026-08-10 | "Reminder: we communicate as humans here. You should describe the change, not the AI." | https://github.com/curl/curl/pull/22531#issuecomment-5241128301 |
| @sirosen | 2026-01-31 | "Just today I had to batch-close several AI generated PRs which were all submitted around the same time." | https://github.com/orgs/community/discussions/185387#discussioncomment-15657800 |
| @chadlwilson | 2026-02-03 | "…after spending significant time reviewing it and making multiple comments .... to eventually conclude that much of it was "plausible nonsense" which had never actually been validated." | https://github.com/orgs/community/discussions/185387#discussioncomment-15685251 |
| @rikatz | 2024-12-15 | "I need some time for myself, and I am not really being able to take care of the project and my personal life together :)" (PR description) | https://github.com/kubernetes/org/pull/5305 |
| @BenTheElder | 2026-01-21 | "Building trust for owning critical software takes time, we needed that to happen years ago during the earlier pleas for support." | https://github.com/kubernetes/ingress-nginx/issues/14178#issuecomment-3779849797 |

Also in the same GitHub discussion, not on a slide: @iBug, Feb 7, 2026 — https://github.com/orgs/community/discussions/185387#discussioncomment-15728377

### `closing-doors` (removed from the deck Sep 27, 2026; kept for reference)
- **GitHub changelog** — PR limits (Jun 17), PR archiving (Jul 16), org-level PR limits (Aug 6, 2026).
  https://github.blog/changelog/2026-07-16-repository-admins-can-archive-pull-requests/ · https://github.blog/changelog/2026-08-06-set-pull-request-limits-at-the-organization-level/
- **Godot Foundation, "Changes to our Contribution Policies"**, Jun 30, 2026 — "This reviewer shortage was already a problem, but it was one that we successfully ignored. We can no longer ignore it."
  https://godotengine.org/article/contribution-policy-2026/
- **GCC, "GCC AI Policy Announcement"**, David Edelsohn, Jul 29, 2026 — "the GNU Compiler Collection (GCC) policy is to decline any legally significant contributions which include LLM-generated content or are derived from LLM-generated content." The ~15 lines threshold is as reported by LWN (https://lwn.net/Articles/1086041/).
  https://gcc.gnu.org/pipermail/gcc/2026-July/248628.html
- **Codeberg/org#1253**, merged Jul 22, 2026 — "This has passed." Poll: 1,085 eligible, 517 cast, 358 agree, 144 disagree, 14 abstain (from the poll screenshot in the PR).
  https://codeberg.org/Codeberg/org/pulls/1253#issuecomment-19820434

### Slide 22 (`ai-vulnerability-explosion`)
- **Anthropic, "Project Glasswing: An initial update"**, May 22, 2026 — "several maintainers have told us they're currently severely capacity constrained, and some have even asked us to slow down our rate of our disclosures because they need more time to design patches." / "75 of the 530 high- or critical-severity bugs we've reported have now been patched".
  https://www.anthropic.com/research/glasswing-initial-update
- **Anthropic Glasswing page** — "$2.5M to Alpha-Omega and OpenSSF through the Linux Foundation, and $1.5M to the Apache Software Foundation". https://www.anthropic.com/glasswing
- **Black Duck blog, OSSRA 2026** — "rising 107% to an average of 581 vulnerabilities"; "87% of all audited codebases contained at least one vulnerability".
- **Mozilla Hacks, "Behind the scenes: hardening Firefox"**, May 7, 2026 — "We fixed a total of 423 security bugs in releases in April. In addition to the 271 bugs announced two weeks ago…"
  https://hacks.mozilla.org/2026/05/behind-the-scenes-hardening-firefox/
- **Trail of Bits, "Introducing Patch the Planet"**, Jun 22, 2026 — "Frontier models like GPT-5.5-Cyber are producing a firehose of security findings, and already-stretched maintainers must sift through all of it…"
  https://blog.trailofbits.com/2026/06/22/introducing-patch-the-planet/
- **Not used on purpose:** "1,596 vulnerabilities / 281 projects / ~6% patched" comes from a Cloud Security Alliance note, not from Anthropic.

### Slide 23 (`supply-chain-2026`)
- **GHSA-69fq-xp46-6x23** (CVE-2026-33634), incident Mar 19, 2026 — "force-push 76 of 77 version tags in aquasecurity/trivy-action to credential-stealing malware". https://github.com/advisories/GHSA-69fq-xp46-6x23
- **Red Hat RHSB-2026-006**, Jun 1, 2026 — "Our investigation identified 32 @redhat-cloud-services npm packages that were compromised"; a GitHub account "compromised via a VS code extension containing malware". https://access.redhat.com/security/vulnerabilities/RHSB-2026-006
- **Datadog Security Labs, "'ChainDrop' worm compromises hundreds of popular npm packages"**, Aug 4, 2026. https://securitylabs.datadoghq.com/articles/npm-worm-compromises-popular-npm-packages/
- **Microsoft Security Blog, "ChainDrop supply chain compromise: Anatomy of a self-propagating worm"**, Aug 4, 2026 — "a large-scale npm supply chain attack affecting more than 400 packages across multiple unrelated publishers, including packages associated with major enterprise software ecosystems such as keyv, flat-cache, cache-manager, and others." / "Evidence points towards stolen maintainer credentials as the attack vector for initial compromise." https://www.microsoft.com/en-us/security/blog/2026/08/04/chaindrop-supply-chain-compromise-anatomy-self-propagating-worm/
- **GitHub changelog, npm** — Sep 3 and Sep 18, 2026. https://github.blog/changelog/2026-09-18-stage-only-npm-tokens-for-safer-automation/

## Act 04 — The Solution

### Slide 26 (`companies-paying`)
- **OpenSSF, "We're In: Enterprise Commitment to Sustainable Package Registries"**, Sep 16, 2026 — signers Arm, Datadog, Dell Technologies, Ericsson, GitHub, Google, IBM, Kusari, Microsoft, Red Hat, Rust Foundation, Sonatype. "…the heroic efforts of small teams, often just two or three people." / "The number of malicious components that require human analysis and takedown has reached 1.8 million packages so far in 2026". The slide image is OpenSSF's own graphic from this post.
  https://openssf.org/blog/2026/09/16/were-in-enterprise-commitment-to-sustainable-package-registries/
- **Sonatype, "Sustaining Open Publishing at Commercial Scale"**, Brian Fox, Jun 16, 2026 (updated Jul 23) — "But open does not mean infinite. And free does not mean costless." Enforcement moved to Oct 1, 2026.
  https://www.sonatype.com/blog/open-publishing-commercial-scale

### Slide 27 (`funding-that-works`)
- **GitHub, "What 50 open source projects taught us about security in the AI era"**, Gregg Cochran, Aug 13, 2026 — "more than $500,000 across 50 projects"; across all sessions (188 projects, $1.88M) "Participating projects have identified and disclosed 533 new CVEs".
  https://github.blog/open-source/maintainers/what-50-open-source-projects-taught-us-about-security-in-the-ai-era/
- **OpenSSF press release**, Mar 17, 2026 — "$12.5 million in total grants from Anthropic, AWS, GitHub, Google, Google DeepMind, Microsoft, and OpenAI".
  https://openssf.org/press-release/2026/03/17/linux-foundation-announces-12-5-million-in-grant-funding-from-leading-organizations-to-advance-open-source-security/
- **Linux Foundation, "ROI for Open Source Software Contribution: Insight from the Open Source ROI Survey and Economic Model"**, Sam Boysel & Adrienn Lawson, Feb 2026, DOI 10.70828/XSJC5531. Web survey Oct–Nov 2025, 567 responses. "active contribution delivers a 2-5x return on investment"; "Foundation membership stands out with a 4.8x ratio". (The private-fork numbers moved to `fork-tax`.)
  https://www.linuxfoundation.org/research/contribution-roi · PDF: https://www.linuxfoundation.org/hubfs/Research%20Reports/2025%20Open%20Source%20ROI%20Survey%204.24.26.pdf
  https://www.linuxfoundation.org/press/new-linux-foundation-report-shows-active-open-source-contribution-delivers-2-5x-roi-while-passive-consumption-increases-costly-technical-debt
- **European Commission, CRA reporting obligations** — "As of 11 September 2026, manufacturers are required to report actively exploited vulnerabilities and severe incidents…"
  https://digital-strategy.ec.europa.eu/en/policies/cra-reporting

### `reframe` — "Open source is critical infrastructure" (Monitor · Set SLOs · Staff it)
- **OpenSSF Scorecard, ingress-nginx** — overall 6.9, "GENERATED AT: 2026-03-20T11:30:39Z" (4 days before the repo was archived on Mar 24), Maintained check 10. Captured Sep 27, 2026. https://scorecard.dev/viewer/?uri=github.com/kubernetes/ingress-nginx
- **endoflife.date, Kubernetes** — "Last updated on 24 September 2026"; active and maintenance support end dates per release. https://endoflife.date/kubernetes
- **Open Source Pledge** — "$7,408,535 raised, $3M+ in the past year"; $2,000 per developer per year. https://opensourcepledge.com/
- The two SLOs on the slide (critical CVE patched in 7 days; nothing past EOL in production, alert 90 days before) are **examples**, not an industry standard. The slide footer says so.

### `framework` — "What companies actually do" (ladder)
- **LF ROI report** (above) — 45% of organizations keep private forks; "66% of respondents noted that upstream maintainers respond more quickly to security issues"; membership "increases overall OSS contribution rates by 24% on average".
- **percona/percona-server-mongodb-operator#2315** — the speaker's own upstream PR.
- **Microsoft FOSS Fund** — "Every quarter a new fund and selection process will distribute up to $12,500 USD across one or more open source project(s)." Employees who contributed to open source vote. https://github.com/microsoft/foss-fund
- **Sentry**, Chad Whitacre, Jan 6, 2026 — $750K to maintainers for 2025, fifth year in a row. https://blog.sentry.io/another-year-another-750-000-to-open-source-maintainers
- **Open Source Pledge** — $2,000 per developer per year; members paid $4.5M as of Jan 2026. https://opensourcepledge.com/
- **CNCF membership** — Silver $2K–$50K by company size, Gold $100K, Platinum $350K; "722 CNCF Members" (Sep 27, 2026). https://www.cncf.io/about/join/

### Slide 29 (`new-reality`)
- **"Build vs. Buy Is Dead"** (YouTube) — https://www.youtube.com/watch?v=Z-ZnXPlrZME
- **Fortune / Bloomberg**, Feb 5, 2026 — software stocks "dropped almost $1 trillion over the past seven days."
  https://fortune.com/2026/02/05/trillion-dollar-tech-wipeout-ensnares-all-stocks-in-ais-path/
- **BLS Occupational Outlook Handbook, Software Developers** (updated Aug 27, 2026) — "projected to grow 10 percent from 2025 to 2035".
  https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
- **percona/percona-server-mongodb-operator#2315** — https://github.com/percona/percona-server-mongodb-operator/pull/2315

## Act 05 — The Action

### `fork-tax` — "The fork tax"
- **LF ROI report** (above) — "On average, an organization maintains 86 private forks … Each … requires 60 labor hours for maintenance and integration per release cycle." 86 × 60 = 5,160 hours; ≈ $258K is the report's estimate at an assumed $50/hour, not reported spend. Fork questions n=238. 37% of forks exist for "security patches or compliance requirements".
- **ChromeOS, "Upstream First"** — https://www.chromium.org/chromium-os/chromiumos-design-docs/upstream-first/ · LWN, Sep 2019: https://lwn.net/Articles/798147/

### `bloomberg-cohort` — "Two hours a week"
- **Alyssa Wright (Bloomberg OSPO), CNCF blog**, Jul 23, 2026 — "48 Bloomberg engineers participated in the initiative. Most had never contributed to open source before." / "118 pull requests (PRs) were submitted to the OpenTelemetry project. 70 were merged" / "842 volunteer hours were logged by participants". Cohort Apr 8 – Jun 17, 2026.
  https://www.cncf.io/blog/2026/07/23/sustaining-opentelemetry-what-a-10-week-contributor-cohort-actually-looks-like/
- **CNCF blog**, Mar 31, 2026 — "~2 hours/week per Bloomberg participant"; "the most durable strategy is not purely reactive dependency management – it's stewardship…"
  https://www.cncf.io/blog/2026/03/31/sustaining-opentelemetry-moving-from-dependency-management-to-stewardship/
- **Frank Nagle, "Learning by Contributing"**, Organization Science 29(4), 2018 — via HBS Working Knowledge, Sep 5, 2018: productivity "by as much as 100 percent, when compared with free-riding competitors."
  https://www.library.hbs.edu/working-knowledge/the-hidden-benefit-of-giving-back-to-open-source-software

### `actions` — "What you do on Monday"
- Draws on the LF ROI report and the Bloomberg posts above. The gh/glab lottery-factor and ORT slides were removed on Sep 27, 2026.

---

## Corrections from revision 1

| Revision 1 said | Revision 2 says | Why |
|---|---|---|
| "90% of modern applications contain open source" (OSSRA "recent editions") | 98% of 947 codebases (OSSRA 2026) | Newer, exact edition |
| "~60% of deployments" (industry) | ~60% of CERN's deployments | The number is CERN's own |
| "50% of cloud-native environments are affected" | "about half of cloud native environments" (quoted) | Exact wording of the statement |
| 60% unpaid, source ByteIota / It's FOSS | 60% unpaid, source Tidelift 2024 | Cite the original survey |
| Glasswing "10k+ bugs, on track for 3,900 validated" | 75 of 530 high/critical OSS bugs patched; maintainers asked to slow down | Newer Anthropic update |
| "$1T+ SaaS market cap lost in a single month" | ~$1T in seven days | Matches Bloomberg/Fortune |
| "+15% US engineering job growth (BLS 2034)" | +10% software developers, 2025–35 | BLS page updated Aug 2026 |
| "Mar 2025: maintenance mode" timeline | Nov 11 2025 announcement → Jan 29 2026 statement → Mar 19 2026 last release | Dates checked against kubernetes.io and the GitHub API |

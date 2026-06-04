# ingress-nginx: GitHub Evidence of Maintainer Burnout

> Research notes for the **SRE Day 2026 Q2** talk. Compiled 2026-06-04 via
> `gh` CLI against `kubernetes/ingress-nginx` and `kubernetes/org` repos.
> All quotes are verbatim from the issues/PRs/files referenced.

## TL;DR

There is exactly **one in-repo "call for maintainers" issue** in the
9-year history of `kubernetes/ingress-nginx`: [#4404](https://github.com/kubernetes/ingress-nginx/issues/4404)
(Aug 2019, by `@aledbf`). The project never used the words "call for help,"
"call for maintainers," or "burnout" in any issue title.

The real SOS signals live in:

1. The **OWNERS file's `emeritus_approvers` list** (4 names, one every ~1.5 years)
2. The **`lifecycle/rotten` and `lifecycle/frozen` labels** (issues the
   maintainers couldn't triage)
3. The **`area/stabilization` tracking issues** (#8729, #8910, #8730) — a
   one-time, public admission that the project was over-committed
4. The **pinned issue #13002** (Mar 2025) — a project-status announcement
   that effectively declared 1.13 the last minor release
5. The **`kubernetes/org` step-down PRs** (#5305 by `@rikatz`, Dec 2024)
6. The **post-retirement thank-you issue #14178**, where the community
   asked companies to step up — and the Steering Committee (`@BenTheElder`)
   declined, citing the XZ Utils backdoor as a cautionary tale

**Peak active maintainer count: 6.** Hit three times in the project's life
(2018, 2023, 2024) — never higher. From 2019–2021 (~3 years) it sat at **2**.

---

## 1. Direct in-repo "Call for Help"

| # | Title | Author | Date | Key quote |
|---|-------|--------|------|-----------|
| [#4404](https://github.com/kubernetes/ingress-nginx/issues/4404) | **"@aledbf stepping down as maintainer"** | `@aledbf` | 2019-08-06 | "Hi everyone, I decided to step down as maintainer of the project after the next release. I would really love to find **new maintainer/s to take over responsibility for this project**. Anyone up for the challenge?" |

**Body verbatim:**

> Hi everyone, I decided to step down as maintainer of the project after the
> next release. I would really love to find new maintainer/s to take over
> responsibility for this project.
>
> Anyone up for the challenge?

**Response:** 10 thank-you comments. 0 volunteer maintainers. Auto-closed
as `lifecycle/rotten` on 2020-02-15.

---

## 2. Implicit SOS — "we're drowning" issues by maintainers

These are issues filed by the maintainers themselves that signal overload,
even though they don't use the words "call for help."

### 2.1 Pinned project-status announcement (the most important)

| Field | Value |
|-------|-------|
| Issue | [#13002](https://github.com/kubernetes/ingress-nginx/issues/13002) |
| Title | "‼️⚠️‼️⚠️‼️ READ THIS BEFORE FILING AN ISSUE ‼️⚠️⚠️‼️" |
| Author | `@strongjz` (James Strong, Isovalent/Cisco) |
| Date | 2025-03-20 |
| Label | `lifecycle/frozen` |
| State | CLOSED (2025-11-12) |

This issue was the **pinned "read this before filing"** issue on the repo.
Its body is effectively the project's retirement announcement, 8 months
before the formal blog post:

> What to expect from Ingress-nginx maintainers
> - Continued monthly release patches.
>   - Golang updates
>   - Alpine updates
>   - Other 3rd party dependencies
>   - CVE patches
>   - Bug fixes
> - **1.13 in all likelihood will be the last minor release**
> - Support new Kubernetes releases via our ingress-nginx e2e tests
> - **No new features from maintainers**
>    - Features from ingress-nginx community members will be on a
>      case-by-case basis
> - Migration path from ingress-nginx to Ingate
>
> Once a stable release of InGate is available we will officially put the
> project in maintenance mode.
>
> ...
>
> This whole process of migration to InGate and putting ingress-nginx into
> maintenance mode will take about 2 years.

**Closing comment by `@strongjz` (2025-11-12):**

> Closing this as to not confuse folks, please refer to blog post
> https://www.kubernetes.dev/blog/2025/11/12/ingress-nginx-retirement/

### 2.2 Stabilization tracking — the June 2022 "we have a problem" moment

Three issues were opened within 4 days of the June 2022 mailing-list SOS,
all by `@strongjz`, all labeled `area/stabilization`:

| # | Title | Date | Key signal |
|---|-------|------|-----------|
| [#8729](https://github.com/kubernetes/ingress-nginx/issues/8729) | "Tracking progress on 2022 community survey" | 2022-06-23 | Labeled `priority/critical-urgent`. Links to [kubernetes/community#6657](https://github.com/kubernetes/community/issues/6657). The in-repo trace of the mailing-list survey. |
| [#8730](https://github.com/kubernetes/ingress-nginx/issues/8730) | "Tracking Devstats for ingress-nginx" | 2022-06-23 | "Working on getting devstats for ingress-nginx project https://github.com/cncf/devstats" — spinning up metrics to *prove* the maintainer shortage. |
| [#8910](https://github.com/kubernetes/ingress-nginx/issues/8910) | "Tracking aging dependencies in Ingress-nginx" | 2022-08-06 | Reports **55.60 libyear** of dependency debt. Examples: `emicklei/go-restful: 3.16 years behind`, `moul.io/http2curl: 2.46 years behind`, `go.starlark.net: 2.36 years behind`. |

The body of #8910 is a complete dump of 60+ outdated dependencies — the
maintainer was making the technical debt *visible* in public.

### 2.3 The CVE cascade

| # | Title | Date | Effect |
|---|-------|------|--------|
| [#11396](https://github.com/kubernetes/ingress-nginx/issues/11396) | "[Vulnerabilities] current version of nginx-ingress-controller v1.10.1 has many vulnerabilties" | 2024-05-30 | Labeled `priority/important-soon` + `triage/accepted`. Community pressure that forced the 2-maintainer team into a CVE-patching sprint. |
| (CVE-2025-1974) | RCE via admission webhook | 2025-03-24 | KubeCon NA 2024 talk description explicitly mentions "**eight significant CVEs and RCEs** in Ingress NGINX" — the unmanageable CVE load was the technical justification for the wind-down. |

---

## 3. The OWNERS File — the most damning "call for help" record

Current `OWNERS` (at the 2024-12-15 commit, which is the latest before
archival):

```yaml
# See the OWNERS docs: https://www.kubernetes.dev/docs/guide/owners

approvers:
- ingress-nginx-maintainers

reviewers:
- ingress-nginx-reviewers

emeritus_approvers:
- aledbf # 2020-04-02
- bowei # 2022-10-12
- ElvinEfendi # 2023-04-23
- rikatz # 2024-12-15
```

Current `OWNERS_ALIASES`:

```yaml
aliases:
  ingress-nginx-maintainers:
  - cpanato
  - Gacko
  - strongjz
  - tao12345666333

  ingress-nginx-reviewers:
  - cpanato
  - Gacko
  - strongjz
  - tao12345666333

  ingress-nginx-docs-maintainers:
  - longwuyuan
```

**4 active approvers, who are also the only 4 reviewers. 4 ex-approvers in
5 years. The "hiring pipeline" is empty.**

---

## 4. Active Maintainer Count Timeline

Traced the OWNERS + OWNERS_ALIASES files at every change in the repo
(17 commits to OWNERS, 18 to OWNERS_ALIASES). Counted the **unique union
of humans in any approver role** (excluding `sig-network-leads`, which
were sig-wide leads, not project maintainers).

| Date | Event | Active maintainers | Count |
|------|-------|--------------------|-------|
| 2016-11-05 | Project created | (assignees only: `aledbf, justinsb, bprashanth, thockin`) | 0 approvers |
| 2018-01-10 | First OWNERS+aliases format | `bowei, bprashanth, justinsb, aledbf, nicksardo` | 5 |
| **2018-04-13** | **"Add new approvers"** | `bowei, justinsb, aledbf, nicksardo, ElvinEfendi, antoineco` | **6** ⬅ peak #1 |
| 2018-10-08 | nicksardo, justinsb, bprashanth leave | `bowei, aledbf, ElvinEfendi, antoineco` | 4 |
| 2019-01-30 | antoineco, then justinsb leave | `bowei, ElvinEfendi` | **2** |
| 2019-11-08 | + cmluciano (reviewer only) | `bowei, ElvinEfendi` | 2 |
| 2020-04-02 | **aledbf steps down** (emeritus) | `bowei, ElvinEfendi` | 2 |
| 2020-12-25 | (confirmed in OWNERS) | `bowei, ElvinEfendi` | 2 |
| 2021-04-27 | rikatz, strongjz promoted | `bowei, ElvinEfendi, justinsb, rikatz, strongjz` | 5 |
| 2021-07-16 | justinsb drops out | `bowei, ElvinEfendi, rikatz, strongjz` | 4 |
| **2022-04-17** | **"Promote Jintao to maintainer"** | `bowei, ElvinEfendi, rikatz, strongjz, tao12345666333` | 5 |
| 2022-10-12 | bowei → emeritus | `ElvinEfendi, rikatz, strongjz` | 3 |
| **2023-04-20** | **"add puerco and cpanato as approvers"** | `ElvinEfendi, rikatz, strongjz, cpanato, puerco, tao12345666333` | **6** ⬅ peak #2 |
| 2023-04-23 | ElvinEfendi → emeritus | `rikatz, strongjz, cpanato, puerco, tao12345666333` | 5 |
| **2024-04-04** | **Gacko promoted** | `rikatz, strongjz, cpanato, puerco, tao12345666333, Gacko` | **6** ⬅ peak #3 |
| 2024-06-14 | Gacko also promoted to admin | (same) | 6 |
| 2024-12-15 | rikatz steps down | `strongjz, cpanato, puerco, tao12345666333, Gacko` | 5 |
| 2025–2026 | puerco goes inactive | `cpanato, Gacko, strongjz, tao12345666333` | 4 |
| 2026-03-24 | Archived | (unchanged) | 4 |

### Key findings

- **Peak was 6, never higher.** Hit in 2018, 2023, and 2024 — three distinct
  eras separated by 2-maintainer troughs.
- **No growth, only turnover.** 4 of the 5 peak-2018 maintainers
  (`bowei, justinsb, nicksardo, antoineco`) are gone. The 6th, `ElvinEfendi`,
  followed in 2023.
- **The 6-man peaks were always immediately followed by shrinkage**, never
  expansion. The 2018 peak collapsed to 2 by 2019. The 2023 peak lost
  ElvinEfendi 4 days after puerco and cpanato were added. The 2024 peak
  lost rikatz 8 months after Gacko joined.
- **`puerco` is a ghost member**: formally listed in InGate
  (`kubernetes-sigs/ingate`) approvers from day one but never had a real
  ingress-nginx commit history. Removed from ingress-nginx OWNERS by 2026-03.
- **The "burnout" pattern matches the blog post's claim**: the longest-
  tenured maintainer (aledbf) lasted 4 years (2016–2020). The shortest
  (puerco) lasted ~3 years as a paper maintainer. The median tenure of the
  5 emeritus_approvers is ~3 years.
- **3+ years at 2 maintainers** (2019–2021) is the "we're burning out"
  stretch. The 2025-11-11 blog post alludes to this exact period:
  > "Despite the project's popularity among users, Ingress NGINX has always
  > struggled with insufficient or barely-sufficient maintainership. For
  > years, the project has had only one or two people doing development
  > work, on their own time, after work hours and on weekends."

---

## 5. kubernetes/org — the formal governance "calls for help"

| Type | # | Title | Date | Key quote |
|------|---|-------|------|-----------|
| Issue | [#5280](https://github.com/kubernetes/org/issues/5280) | "REQUEST: Create kubernetes-sigs/ingate" | 2024-12-01 → closed 2024-12-09 | The replacement project (InGate). Same maintainer team. Never attracted enough contributors → "development never progressed far enough to create a mature replacement; it will also be retired" (per the 2025-11-11 blog). |
| PR | [#5305](https://github.com/kubernetes/org/pull/5305) | **"rikatz is stepping down from ingress-nginx"** | opened 2024-12-15 → merged 2024-12-21 | **"As I have announced on May, I am stepping down from ingress-nginx project (for now). I need some time for myself, and I am not really being able to take care of the project and my personal life together :)"** |
| PR | [#5318](https://github.com/kubernetes/org/pull/5318) | "Ingress NGINX: Update owners." | opened 2024-12-21 → merged 2024-12-22 | By `@Gacko`. Body: "Remove inactive reviewers. /cc @strongjz @tao12345666333 @cpanato" |

`@strongjz` approving comment on #5305:

> Thank you for all your hard work and putting with me asking you, nicely
> but multiple times, to do things ;)
>
> /lgtm
> /approved

---

## 6. Post-retirement "calls for help" / community response

### 6.1 The community asks: "can someone take over?"

| # | Title | Author | Date | Key quotes |
|---|-------|--------|------|-----------|
| [#14176](https://github.com/kubernetes/ingress-nginx/issues/14176) | "Update README.md to announce the upcoming EOL" | `@venkatamutyala` | 2025-11-13 | "A clear announcement will prevent new adopters from creating tech debt and having to migrate to Gateway API or another ingress controller in 4 months." |
| [#14178](https://github.com/kubernetes/ingress-nginx/issues/14178) | **"So long, and thanks for all the fish"** | `@recollir` | 2025-11-13 (still open) | Community thank-you that became the de-facto "last call for help" thread. |

Notable comments on #14178:

- **`@avin-kavish` (Nov 14, 2025)** — announced a fork:
  > "I don't know the exact issues causing this but nginx ingress powers a
  > lot of clusters and there's no consensus that it's bad and needs to
  > migrated away from. I'll be maintaining a fork here:
  > https://github.com/viduli-io/ingress-nginx"
  > (👍 20 reactions)

- **`@pierreozoux` (Dec 12, 2025)** — proposed corporate rescue:
  > "This piece of software is too much used, everywhere, I think it is
  > possible to find companies to pay for maintenance of this project.
  > I'm trying something with my little contacts..
  > I think it is possible to extend maintenance and support for some
  > months, maybe years, to give enterprises a bit more time to move.
  > I have 2 questions:
  > - let's say at least 2 companies are willing to step up and take the
  >   responsibility of the project, what would be required to take over
  >   the responsibility of this repo and all the related infra?
  > - are current contributors available for hire? or not at all?"

- **`@BenTheElder` (Steering Committee, Jan 21, 2026)** — declined:
  > "I personally have used ingress-nginx for many years with `kind`
  > clusters, and I thank the maintainers again for all their contributions.
  > ...
  > There have been some major security challenges and limited maintainer
  > bandwidth to deal with them. Nobody has been paying anyone to work on
  > this software for some time, it has been entirely volunteer driven
  > and they've been overwhelmed. It has also been a significant burden
  > for the Security Response Committee handling vulnerability reports.
  > ...
  > Building trust for owning critical software takes time, we needed that
  > to happen years ago during the earlier pleas for support.
  > Even if the maintainers of this project agreed to hand it over to
  > someone new, the Kubernetes project has decided jointly between The
  > Sponsoring SIG (SIG Network), Ingress-Nginx Maintainers, The Security
  > Response Committee, and The Steering Committee that we must wind down
  > this project.
  > We unfortunately just can't accept last minute 'just hand me the keys,
  > I'll take care of it', consider for example the story of the famous
  > [XZ vulnerability](https://en.wikipedia.org/wiki/XZ_Utils_backdoor).
  > It would be irresponsible to use the Kubernetes project's position to
  > endorse maintainers / forks that did not go through our community
  > membership process including the contributor ladder, from contributor
  > to reviewer to approver to maintainer, which is designed to build that
  > trust. That process necessarily takes time.
  > ...
  > Nobody wanted this outcome and we are all just trying to mitigate the
  > situation, generally in our spare time."

- **`@henrik242` (Dec 21, 2025)** — pointed to Chainguard's commercial
  support:
  > "The EmeritOSS fork might also be relevant:
  > https://www.zdnet.com/article/chainguard-emeritoss-support-for-abandoned-open-source-programs/"

---

## 7. Volume / health metrics (the indirect "we're drowning" signal)

| Metric | Value | Source |
|--------|-------|--------|
| Total issues (2016–2026) | **14,740** | `gh api search/issues?q=repo:kubernetes/ingress-nginx+is:issue` |
| Issues created in 2024 | **455** | GitHub Search API |
| Issues created in 2025 | **319** | GitHub Search API (30% drop as maintainers disengaged) |
| `area/stabilization` issues | 47 (all 2022–2023, all closed) | `gh search issues --label area/stabilization` |
| Open `lifecycle/frozen` issues | 50+ (mostly 2024–2025) | `gh search issues --label lifecycle/frozen --state open` |
| `lifecycle/rotten` issues | 50+ (auto-closed after 90+30 days) | `gh search issues --label lifecycle/rotten` |
| `help wanted` issues (lifetime) | 50 across 2017–2025 | `gh search issues --label help wanted` |

The **`lifecycle/frozen` label** is the most damning signal: maintainers
applied it to issues they wanted to *survive* the auto-stale bot because
they couldn't triage them. Freezing 50+ issues in the last 2 years of a
project's life is the most direct in-repo evidence of "we can't keep up."

---

## 8. Searches that returned ZERO results

The maintainers never used these phrasings in repo issues:

- `is:issue "call for maintainers"` → 0
- `is:issue "call for help"` → 0
- `is:issue "looking for maintainers"` → 0
- `is:issue "where are the maintainers"` → 0
- `is:issue "is the project maintained"` → 0
- `is:issue "burnout"` → 0
- `is:issue "retirement"` → 0 (before the announcement)
- `is:issue "step down"` → only #4404, the al edbf one

The SOS was delivered through **proxy signals**, not direct language:
maintainer step-down announcements, stabilization tracking, the
`lifecycle/frozen` escape hatch, and the eventual #13002 project-status
announcement.

---

## 9. Citations

| URL | Type | Date |
|-----|------|------|
| https://github.com/kubernetes/ingress-nginx/issues/4404 | Issue | 2019-08-06 |
| https://github.com/kubernetes/ingress-nginx/issues/8729 | Issue | 2022-06-23 |
| https://github.com/kubernetes/ingress-nginx/issues/8730 | Issue | 2022-06-23 |
| https://github.com/kubernetes/ingress-nginx/issues/8910 | Issue | 2022-08-06 |
| https://github.com/kubernetes/ingress-nginx/issues/11396 | Issue | 2024-05-30 |
| https://github.com/kubernetes/ingress-nginx/issues/13002 | Issue (pinned) | 2025-03-20 |
| https://github.com/kubernetes/ingress-nginx/issues/14176 | Issue | 2025-11-13 |
| https://github.com/kubernetes/ingress-nginx/issues/14178 | Issue | 2025-11-13 |
| https://github.com/kubernetes/ingress-nginx/blob/main/OWNERS | File | current |
| https://github.com/kubernetes/ingress-nginx/blob/main/OWNERS_ALIASES | File | current |
| https://github.com/kubernetes/org/issues/5280 | Issue | 2024-12-01 |
| https://github.com/kubernetes/org/pull/5305 | PR (merged) | 2024-12-21 |
| https://github.com/kubernetes/org/pull/5318 | PR (merged) | 2024-12-22 |
| https://github.com/kubernetes/community/issues/6657 | Issue (community survey) | 2022 |
| https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/ | Blog post | 2025-11-11 |
| https://kubernetes.io/blog/2026/01/29/ingress-nginx-statement/ | Blog post (Steering + SRC) | 2026-01-29 |
| https://groups.google.com/a/kubernetes.io/g/dev/c/rxtrKvT_Q8E/m/6_ej0c1ZBAAJ | Mailing list post (June 2022 SOS) | 2022-06-23 |
| https://kccncna2024.sched.com/event/1hoxW/securing-the-future-of-ingress-nginx-james-strong-isovalent-marco-ebert-giant-swarm | KubeCon talk | 2024-11-14 |
| https://github.com/viduli-io/ingress-nginx | Community fork | 2025-11-14 |
| https://www.zdnet.com/article/chainguard-emeritoss-support-for-abandoned-open-source-programs/ | News (EmeritOSS) | 2025-12 |

---

## 10. Methodology

All evidence was gathered via `gh` CLI 2.92.0 against the
`kubernetes/ingress-nginx` and `kubernetes/org` repos, in read-only mode.

Key commands used:

```bash
# Repo metadata + archived status
gh repo view kubernetes/ingress-nginx --json name,description,isArchived,stargazerCount

# Direct calls for help
gh search issues "call for maintainers" --repo kubernetes/ingress-nginx
gh search issues "call for help"           --repo kubernetes/ingress-nginx
gh search issues "looking for maintainers" --repo kubernetes/ingress-nginx
gh search issues "burnout"                 --repo kubernetes/ingress-nginx
gh search issues "retirement"              --repo kubernetes/ingress-nginx

# Stabilization / frozen / rotten
gh search issues --repo kubernetes/ingress-nginx --label "area/stabilization"
gh search issues --repo kubernetes/ingress-nginx --label "lifecycle/frozen"   --state open
gh search issues --repo kubernetes/ingress-nginx --label "lifecycle/rotten"

# Key issue bodies
gh issue view 4404 --repo kubernetes/ingress-nginx --json body,comments
gh issue view 13002 --repo kubernetes/ingress-nginx --json body,comments
gh issue view 14178 --repo kubernetes/ingress-nginx --json body,comments

# kubernetes/org formal governance
gh issue view 5280 --repo kubernetes/org --json body
gh pr view 5305    --repo kubernetes/org --json body
gh pr view 5318    --repo kubernetes/org --json body

# OWNERS history at every commit
gh api 'repos/kubernetes/ingress-nginx/commits?path=OWNERS&per_page=100'
gh api 'repos/kubernetes/ingress-nginx/commits?path=OWNERS_ALIASES&per_page=100'

# File contents at each historical commit
gh api 'repos/kubernetes/ingress-nginx/contents/OWNERS?ref=<sha>'         -q '.content' | base64 -d
gh api 'repos/kubernetes/ingress-nginx/contents/OWNERS_ALIASES?ref=<sha>' -q '.content' | base64 -d

# Volume metrics
gh api 'search/issues?q=repo:kubernetes/ingress-nginx+is:issue+created:2024-01-01..2024-12-31' --jq '.total_count'
gh api 'search/issues?q=repo:kubernetes/ingress-nginx+is:issue+created:2025-01-01..2025-12-31' --jq '.total_count'
```

The investigation was performed in two passes:

1. **Direct evidence** — search for the exact phrases one would expect a
   burned-out maintainer to use. Result: effectively empty.
2. **Indirect evidence** — `OWNERS` history, governance PRs, label
   distributions, and the post-retirement community response. Result:
   the story of a project that never used the words "call for help" but
   screamed it through every available proxy.

---

## Appendix A: Talks the retirement blog post confirmed but the repo didn't

The 2025-11-11 blog post says:

> "Last year, the Ingress NGINX maintainers announced their plans to wind
> down Ingress NGINX and develop a replacement controller together with
> the Gateway API community. Unfortunately, even that announcement failed
> to generate additional interest in helping maintain Ingress NGINX or
> develop InGate to replace it."

The "last year" refers to the **KubeCon NA 2024 talk** (Nov 14, 2024) by
`@strongjz` and `@Marco Ebert` (Giant Swarm), titled "Securing the Future
of Ingress-Nginx." Talk description (verbatim):

> "Ingress NGINX is a very flexible Ingress controller that provides users
> with a lot of NGINX functionality through annotations. However, this
> flexibility also raises security concerns for maintainers and cluster
> administrators. There have been eight significant CVEs and RCEs in
> Ingress NGINX. … To maintain and secure the project and its Gateway API
> implementation, we will not be adding any new features to the core
> functionality of ingress, and a significant amount of functionality,
> such as UDP/TCP Routing, will be moved to Gateway API. We will also
> unveil the new name of the project during this presentation."

The "new name" became **InGate**. InGate shipped to `kubernetes-sigs/ingate`
on 2024-12-09 (per `kubernetes/org` issue #5280) and was retired in the
same announcement as ingress-nginx on 2025-11-11.

## Appendix B: The 2022 mailing-list SOS (the canonical "call for help")

The strongest single artifact is **not** in the GitHub repo. It's the
June 2022 email from `@strongjz` to `kubernetes-dev@googlegroups.com`:

> "We do this in our spare time, and it's becoming hard for us to keep
> this pace.
>
> This lack of support becomes a burden to Ingress NGINX maintainers: we
> now have to split our time between issues, bug fixing, new feature
> reviews, and the bugs that may arise from this feature.
>
> We think (and decided) that it's time to temporarily pause accepting
> new features and focus on fixing and stabilizing Ingress NGINX.
>
> We are asking the community to understand that maintaining the project
> at this pace is becoming hard for the project maintainers.
>
> Establish contributor ladder guidelines"

URL: https://groups.google.com/a/kubernetes.io/g/dev/c/rxtrKvT_Q8E/m/6_ej0c1ZBAAJ

The 2026-01-29 Steering Committee statement cites this exact email as
the foundational "public warning":

> "Despite its broad appeal and widespread use by companies of all sizes,
> and **repeated calls for help from the maintainers**, the Ingress NGINX
> project never received the contributors it so desperately needed."

The 2022 mailing-list post is what the in-repo issues #8729, #8730, and
#8910 were tracking. It is the original "call for help."

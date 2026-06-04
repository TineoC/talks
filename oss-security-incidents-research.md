# Open-Source Dependency Vulnerability Incidents & Statistics

## MAJOR INCIDENTS

---

### 1. Equifax Data Breach (2017)

| Field | Detail |
|-------|--------|
| **Company** | Equifax (credit bureau) |
| **OSS Project** | Apache Struts (web application framework) |
| **CVE** | CVE-2017-5638 (S2-045) |
| **Year** | 2017 |
| **Financial Cost** | **$575 million** settlement (FTC, CFPB, 48 states); additional **£11.2 million** UK FCA fine; class action suit sought up to $70 billion |
| **Users Affected** | **147.9 million** Americans, **15.2 million** UK citizens, **19,000** Canadians |
| **Details** | Equifax failed to patch Apache Struts for 2+ months after the patch was released (March 2017). Breach went undetected for **76 days** (May 12 – July 29, 2017). Attackers exploited the unpatched vulnerability to access SSNs, birth dates, addresses, driver's licenses, and 209,000 credit card numbers. Three executives sold $1.8M in stock before public disclosure. Attributed to Chinese PLA (People's Liberation Army). |
| **Sources** | Wikipedia; FTC press release (July 2019); U.S. Senate investigation (March 2019) |

---

### 2. Heartbleed (2014)

| Field | Detail |
|-------|--------|
| **Company** | Global — affected ~17% of all secure web servers (~500,000 servers) |
| **OSS Project** | OpenSSL (TLS/SSL cryptography library) |
| **CVE** | CVE-2014-0160 |
| **Year** | 2014 |
| **Financial Cost** | Cloudflare estimated **$400,000/month** just for certificate revocation lists (GlobalSign). Industry-wide remediation costs estimated in the **hundreds of millions**. OpenSSL project had annual budget of ~$2,000 at the time. |
| **Users Affected** | ~500,000 TLS-certified web servers vulnerable at disclosure. Community Health Systems: **4.5 million** patient records stolen via Heartbleed. Canada Revenue Agency: **900** social insurance numbers stolen. |
| **Details** | Bug introduced in 2012, discovered independently by Google Security and Codenomicon in April 2014. Buffer over-read in TLS heartbeat extension allowed reading up to 64KB of server memory per request, potentially exposing private keys, session cookies, and passwords. OpenSSL was maintained by a small team; the bug was a missing bounds check by a PhD student (Robin Seggelmann) that passed review by one of four core developers. As of 2019, **91,063** devices were still vulnerable. |
| **Sources** | Wikipedia (Heartbleed); heartbleed.com; Netcraft; Shodan |

---

### 3. Shellshock (2014)

| Field | Detail |
|-------|--------|
| **Company** | Global — affected most Linux/Unix/macOS systems |
| **OSS Project** | GNU Bash (shell) |
| **CVE** | CVE-2014-6271 (primary), plus CVE-2014-6277, CVE-2014-6278, CVE-2014-7169, CVE-2014-7186, CVE-2014-7187 |
| **Year** | 2014 |
| **Financial Cost** | No single dollar figure published. CloudFlare tracked **1.5 million attacks/probes per day**. Incapsula recorded **17,400 attacks** on 1,800+ domains in first 24 hours. |
| **Users Affected** | Virtually all Unix-like systems; bug existed since **1989** (25 years). Yahoo! servers reportedly compromised. Akamai Technologies and U.S. DoD targeted by botnets. |
| **Details** | Arbitrary code execution via environment variables in Bash. Botnets created within hours for DDoS attacks. ZDNet: "Shellshock makes Heartbleed look insignificant." Six related CVEs discovered in rapid succession. |
| **Sources** | Wikipedia; Wired; CloudFlare; Businessweek |

---

### 4. Log4Shell (2021)

| Field | Detail |
|-------|--------|
| **Company** | Global — affected **93% of enterprise cloud environments** (Wiz/EY research) |
| **OSS Project** | Apache Log4j (Java logging framework) |
| **CVE** | CVE-2021-44228 (CVSS 10.0 — maximum) |
| **Year** | 2021 |
| **Financial Cost** | Check Point called potential damage **"incalculable."** Estimated to affect **hundreds of millions of devices**. Only 45% of vulnerable workloads patched within 10 days. |
| **Users Affected** | AWS, Cloudflare, iCloud, Minecraft: Java Edition, Steam, Tencent QQ. Over **40% of business networks** internationally probed/attacked. **1.2 million+ attacks** observed. Belgian Ministry of Defence breached. Canada Revenue Agency shut down online services. Government of Quebec shut down ~4,000 websites. |
| **Details** | Vulnerability existed unnoticed since **2013**. Discovered by Chen Zhaojun of Alibaba Cloud Security Team. CVSS 10/10. Tenable CEO: "the single biggest, most critical vulnerability ever." Exploit trivially simple to execute. Ransomware groups (Conti) and state-sponsored actors (China, Iran) exploited it within days. White House meeting convened on open-source security. FTC threatened to pursue companies that failed to patch. |
| **Sources** | Wikipedia; Wiz/EY research; CISA; Check Point; Wired; Washington Post |

---

### 5. SolarWinds / SUNBURST Supply Chain Attack (2020)

| Field | Detail |
|-------|--------|
| **Company** | SolarWinds (proprietary, but supply chain attack via build system) |
| **OSS Component** | JetBrains TeamCity (build management/CI server, Czech company); also exploited Microsoft and VMware vulnerabilities |
| **CVE** | Multiple — SUNBURST trojan in SolarWinds Orion |
| **Year** | 2020 (discovered December 2020) |
| **Financial Cost** | SolarWinds stock dropped significantly. Tens of thousands of customers incurred costly remediation. Estimated total cost in the **billions** across all affected organizations. |
| **Users Affected** | **18,000** organizations downloaded compromised Orion updates (out of 33,000 Orion customers). At least **200+ organizations** confirmed breached. **9+ U.S. federal agencies** compromised (Treasury, Commerce, State, Energy, Homeland Security, Justice, Agriculture, Labor, NIH). NATO, UK government, European Parliament, Microsoft, FireEye also affected. Attack went undetected for **8-9 months**. |
| **Details** | Russian SVR (Cozy Bear/APT29) attributed. Attackers infiltrated SolarWinds build system, inserted backdoor into signed Orion software updates. Used as pivot to access Office 365 emails, forge SAML tokens, and exfiltrate data. FireEye discovered the attack when its own red team tools were stolen. Senator Durbin called it "tantamount to a declaration of war." |
| **Sources** | Wikipedia (2020 United States federal government data breach); Reuters; NYT; FireEye |

---

### 6. XZ Utils Backdoor (2024)

| Field | Detail |
|-------|--------|
| **Company** | Global Linux ecosystem — most Linux distributions |
| **OSS Project** | XZ Utils / liblzma (compression library) |
| **CVE** | CVE-2024-3094 (CVSS 10.0 — maximum) |
| **Year** | 2024 |
| **Financial Cost** | No direct dollar figure (caught before widespread production deployment). Ubuntu 24.04 beta delayed by a week. Massive industry-wide audit effort. |
| **Users Affected** | Affected versions (5.6.0, 5.6.1) were in development/unstable distributions (Fedora Rawhide, Debian Sid). Had it shipped to production, Alex Stamos (Stanford) said it "could have been the most widespread and effective backdoor ever planted" — a **master key to hundreds of millions of computers** running SSH. |
| **Details** | Discovered by Microsoft employee Andres Freund investigating SSH performance regression in Debian Sid. A contributor "Jia Tan" spent **2+ years** gaining maintainer trust via sock puppet accounts before inserting the backdoor. Suspected state-sponsored operation (possibly Russian APT29/SVR). The backdoor would have allowed remote code execution via OpenSSH on any affected system. OpenSSF and OpenJS Foundation warned of similar social engineering campaigns targeting other projects. |
| **Sources** | Wikipedia (XZ Utils backdoor); Wired; Ars Technica; NYT; The Verge |

---

### 7. MOVEit Transfer Mass Exploitation (2023)

| Field | Detail |
|-------|--------|
| **Company** | Progress Software (MOVEit managed file transfer) — proprietary, but widely used in supply chains |
| **OSS Angle** | SQL injection vulnerability in proprietary software; systemic supply chain risk through file transfer dependencies |
| **CVE** | CVE-2023-34362 |
| **Year** | 2023 |
| **Financial Cost** | Progress Software reported significant financial impact. Victims faced massive remediation costs. |
| **Users Affected** | **2,700+ organizations** compromised; **93.3 million individuals'** personal data exposed. 80%+ of affected organizations were U.S.-based. Victims included BBC, British Airways, Boots, Aer Lingus, Ernst & Young, Transport for London, Ofcom, U.S. Department of Energy, multiple state DMVs. |
| **Details** | Russian-affiliated CL0P ransomware gang exploited zero-day SQL injection. Custom web shell LEMURLOOT used for data exfiltration. Began May 27, 2023. Patched May 31, 2023. One of the largest mass-exploitation events in history by number of organizations affected. |
| **Sources** | Wikipedia (2023 MOVEit data breach); Emsisoft; Cybersecurity Dive; BBC; CNN |

---

### 8. Codecov Supply Chain Attack (2021)

| Field | Detail |
|-------|--------|
| **Company** | Codecov (code coverage tool used by thousands of CI/CD pipelines) |
| **OSS Project** | Codecov Bash Uploader script |
| **CVE** | N/A (supply chain compromise, not a code vulnerability) |
| **Year** | 2021 (January–March 2021) |
| **Financial Cost** | Not publicly quantified. Affected customers included major enterprises. |
| **Users Affected** | Thousands of customers. Confirmed affected: **Snyk, Agari, Rapid7, HashiCorp, Confluent, Customer.io**, and others. Credentials, tokens, and keys exfiltrated from CI/CD environments. |
| **Details** | Attacker modified Codecov's Bash uploader script on a compromised Docker image creation process. The modified script exfiltrated environment variables (credentials, API keys, tokens) to an attacker-controlled server. Undetected for **~2 months** (Jan 31 – April 1, 2021). Attributed to a sophisticated threat actor. |
| **Sources** | Codecov security advisory (April 2021); Snyk blog; multiple security vendor reports |

---

### 9. ua-parser-js npm Supply Chain Attack (2021)

| Field | Detail |
|-------|--------|
| **Company** | npm ecosystem (JavaScript) |
| **OSS Project** | ua-parser-js (8 million+ weekly downloads at the time) |
| **CVE** | N/A (account compromise / typosquatting) |
| **Year** | October 2021 |
| **Financial Cost** | Not quantified in dollars. Widespread cryptomining and credential theft. |
| **Users Affected** | **8+ million weekly downloads**. Malicious versions installed cryptominers and credential-stealing malware. Affected projects included Facebook, Apple, and many others that depended on ua-parser-js transitively. |
| **Details** | Original maintainer's npm account was compromised. Attacker published malicious versions (0.7.29, 0.8.0, 1.0.0) containing malware. The package was a transitive dependency of many major projects. Community responded within hours to unpublish malicious versions. |
| **Sources** | npm security advisories; Snyk; BleepingComputer; GitHub security advisories |

---

### 10. event-stream npm Supply Chain Attack (2018)

| Field | Detail |
|-------|--------|
| **Company** | npm ecosystem (JavaScript) |
| **OSS Project** | event-stream (2 million+ weekly downloads) |
| **CVE** | N/A (maintainer account compromise) |
| **Year** | 2018 |
| **Financial Cost** | Not quantified. Targeted cryptocurrency wallets (Copay). |
| **Users Affected** | **2+ million weekly downloads**. Specifically targeted **Copay** cryptocurrency wallet users to steal Bitcoin. |
| **Details** | Original maintainer transferred ownership to an unknown party ("right9ctrl") who had been contributing helpful code. The new maintainer added a dependency (`flatmap-stream`) containing malicious code that targeted the Copay Bitcoin wallet app to steal cryptocurrency. Discovered by a developer (Ayrton Sparling) who noticed suspicious behavior. Classic example of maintainer trust exploitation. |
| **Sources** | npm security advisory; GitHub issue #116 on event-stream; Ars Technica |

---

### 11. Polyfill.io Supply Chain Attack (2024)

| Field | Detail |
|-------|--------|
| **Company** | Polyfill.io (CDN serving JavaScript polyfills, acquired by Funnull) |
| **OSS Project** | Polyfill.js CDN script (`cdn.polyfill.io`) |
| **CVE** | N/A (domain/CDN compromise) |
| **Year** | 2024 (June) |
| **Financial Cost** | Not quantified. Massive remediation effort across the web. |
| **Users Affected** | **100,000+ websites** had the compromised script embedded. Malicious code redirected mobile users to scam sites. |
| **Details** | The polyfill.io domain was acquired by a Chinese company (Funnull) in February 2024. In June 2024, the CDN began serving malicious JavaScript that redirected users on mobile devices to scam/gambling sites. Cloudflare and Fastly deployed emergency mitigations. Google banned the domain from its ad network. Sansec (security firm) first reported the compromise. Highlighted risks of relying on third-party CDN scripts. |
| **Sources** | Sansec research; Cloudflare blog; BleepingComputer; The Register (June 2024) |

---

## STATISTICS & TRENDS

### Supply Chain Attack Growth

| Statistic | Source |
|-----------|--------|
| **742% increase** in software supply chain attacks from 2019–2022 | Sonatype "State of the Software Supply Chain" reports |
| **650% increase** in supply chain attacks year-over-year (2021 vs 2020) | Sonatype 2022 report |
| **2,800+** supply chain attacks documented in 2021 alone | Sonatype |
| **7,000+** supply chain attacks documented in 2023 | Sonatype 2024 report |
| Supply chain attacks grew **~3x** from 2022 to 2023 | Sonatype |

### Average Cost of Data Breaches

| Statistic | Source |
|-----------|--------|
| **$4.88 million** — global average cost of a data breach (2024) | IBM/Ponemon Institute "Cost of a Data Breach Report 2024" |
| **$4.45 million** — global average cost of a data breach (2023) | IBM/Ponemon Institute 2023 |
| **$4.4 million** — global average cost of a data breach (2025) | IBM/Ponemon Institute 2025 |
| **$9.48 million** — average cost of a data breach in the United States (2024) | IBM/Ponemon Institute |
| **$1.9 million** in savings from extensive use of AI in security | IBM 2025 report |
| Supply chain breaches cost **$4.46 million** on average (2024) | IBM Cost of Data Breach 2024 |

### OSS Vulnerability Trends

| Statistic | Source |
|-----------|--------|
| **286,000+** known CVEs in the National Vulnerability Database (as of 2024) | NVD/NIST |
| **25,000+** new CVEs published in 2023 alone | NVD |
| **1 in 10** open-source projects contain at least one known vulnerability | Snyk "State of Open Source Security Report" |
| **80-90%** of modern software applications consist of open-source components | Linux Foundation; Synopsys OSSRA reports |
| **97%** of codebases contain open-source software | Synopsys "2024 Open Source Security and Risk Analysis" (OSSRA) |
| **84%** of codebases contain at least one known open-source vulnerability | Synopsys 2024 OSSRA |
| **93%** of enterprise cloud environments were vulnerable to Log4Shell | Wiz/EY research (December 2021) |

### Maintainer Burnout & Project Sustainability

| Statistic | Source |
|-----------|--------|
| **~83%** of open-source developers are unpaid volunteers | Linux Foundation surveys |
| Many critical projects maintained by **1-2 people** (OpenSSL had 4 core devs; Log4j maintained by volunteers; XZ Utils had 1 primary maintainer) | Multiple reports; White House OSS security summit (January 2022) |
| **46%** of open-source maintainers report experiencing burnout | Tidelift "2022 State of the Open Source Maintainer" survey |
| **58%** of maintainers spend more than 5 hours/week on maintenance; most are uncompensated | Tidelift survey |
| The average open-source maintainer is **responsible for multiple projects** while working a full-time job | Tidelift; Linux Foundation |
| After Heartbleed, the **Core Infrastructure Initiative** was formed (Linux Foundation) to fund critical OSS projects — initial pledges of **$3.6 million** from Google, Microsoft, Amazon, Facebook, etc. | Linux Foundation (2014) |
| After Log4Shell, the White House convened a summit and the **Open Source Software Security Initiative** was launched with **$150 million** in pledges | White House (January 2022) |

### Additional Key Statistics

| Statistic | Source |
|-----------|--------|
| **60%** of American adults had heard about Heartbleed within days of disclosure | Pew Research Center (April 2014) |
| Log4Shell: **100+ attacks per minute** observed; **60+ exploit variants** within 24 hours | Check Point (December 2021) |
| Log4Shell: exploitation activity detected **9 days before** public disclosure | Cloudflare CEO Matthew Prince |
| Heartbleed: bug existed for **2 years** before discovery; some attackers may have exploited it for **5+ months** before public disclosure | Google/Synopsys; research audits |
| Shellshock: bug existed for **25 years** (since 1989) before discovery | Source code analysis |
| Equifax: breach went undetected for **76 days**; SSL certificate had been expired for **9 months** | U.S. Senate investigation |
| XZ Utils: attacker spent **2+ years** building trust before inserting backdoor | Multiple investigations (Wired, research.swtch.com) |

---

## SUMMARY TABLE

| Incident | Year | OSS Project | CVE | Cost/Impact |
|----------|------|-------------|-----|-------------|
| Equifax | 2017 | Apache Struts | CVE-2017-5638 | $575M settlement; 147.9M people |
| Heartbleed | 2014 | OpenSSL | CVE-2014-0160 | ~500K servers; $400K/mo cert costs (Cloudflare); 4.5M health records |
| Shellshock | 2014 | GNU Bash | CVE-2014-6271 | 1.5M attacks/day; global |
| Log4Shell | 2021 | Apache Log4j | CVE-2021-44228 | 93% of enterprise clouds; "incalculable" damage |
| SolarWinds | 2020 | SolarWinds Orion (+ TeamCity) | SUNBURST | 18K orgs downloaded trojan; 200+ breached; 9+ US agencies |
| XZ Utils | 2024 | XZ Utils/liblzma | CVE-2024-3094 | Caught pre-production; would have been "master key to millions" |
| MOVEit | 2023 | MOVEit Transfer | CVE-2023-34362 | 2,700+ orgs; 93.3M individuals |
| Codecov | 2021 | Codecov Bash Uploader | N/A | Thousands of CI/CD pipelines; 2 months undetected |
| ua-parser-js | 2021 | ua-parser-js (npm) | N/A | 8M+ weekly downloads; cryptominers |
| event-stream | 2018 | event-stream (npm) | N/A | 2M+ weekly downloads; Bitcoin theft |
| Polyfill.io | 2024 | Polyfill.io CDN | N/A | 100K+ websites; mobile user redirects |

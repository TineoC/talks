---
theme: default
title: Cloud Native & Kubernetes 101
info: |
  Demystifying the operating system for the cloud.
  Coffee & Code Philly · Christopher Tineo.
author: Christopher Tineo
colorSchema: light
aspectRatio: '16/9'
canvasWidth: 1280
fonts:
  sans: IBM Plex Sans
  serif: Outfit
  mono: IBM Plex Mono
themeConfig:
  primary: '#0088B8'
transition: fade
mdc: true
layout: cover
---

<div class="cover-grid">
<div class="cover-copy">
<p class="cover-kicker">Workshop · Containers · Kubernetes · Community</p>
<h1 class="cover-title">Cloud Native &amp;<br />Kubernetes&nbsp;101</h1>
<p class="hero-sub">How containers and Kubernetes turn “it works on my laptop” into reliable production systems.</p>
<div class="cover-speaker">
<p class="speaker">Christopher Tineo</p>
<p class="role">Senior DevOps Engineer · Game Plan Tech</p>
<img class="logo-mark cover-role-logo" src="/logos/gameplan.svg" alt="Game Plan Tech" />
</div>
</div>
<div class="cover-visual">
<CoverTerminal />
</div>
</div>

<!--
Timebox: ~20 min talk. Kick off with why we're here (Philly builders, mixed levels).
-->

---
notes: |
  Senior DevOps at Game Plan Tech. K8s Maintainer, K8s 1.37 Release Communications.
  Certs on screen: GCP PCA, CKA, CKS, Kubestronaut — mention briefly, don't dwell.
---

<p class="title-prompt">❯ whoami</p>

<h1 class="whoami-name">Christopher Tineo</h1>

<div class="visual-dominant whoami-wrap">

<div class="grid-2">
<div class="profile-card whoami-card">
  <div class="whoami-header">
    <img class="avatar" src="/profile/portrait.webp" alt="Portrait of Christopher Tineo" />
    <div>
      <div class="whoami-role">Senior DevOps Engineer · Game Plan Tech</div>
      <p class="muted" style="margin: 0.5rem 0 0;">K8s Maintainer, K8s 1.37 Release Communications</p>
    </div>
  </div>

  <div class="cert-row">
    <img src="/certs/cert-gcp-pca.png" alt="Google Cloud Professional Cloud Architect" />
    <img src="/certs/cert-cka.png" alt="Certified Kubernetes Administrator" />
    <img src="/certs/cert-cks.png" alt="Certified Kubernetes Security Specialist" />
    <img src="/certs/cert-kubestronaut.png" alt="Kubestronaut" />
  </div>
</div>

<div class="whoami-qr-block">
  <img class="whoami-qr-logo" src="/logos/linkedin.svg" alt="LinkedIn" />
  <div class="qr-wrap whoami-qr">
    <img src="/qr/linkedin.png" alt="LinkedIn QR code" width="220" height="220" />
  </div>
  <a class="whoami-link" href="https://linkedin.com/in/christopher-tineo" target="_blank">linkedin.com/in/christopher-tineo</a>
  <a class="whoami-link" href="https://github.com/TineoC" target="_blank">github.com/TineoC</a>
</div>
</div>

</div>

---
clicks: 4
notes: |
  Agenda — all five boxes on screen. One click per box:
  click 0 → 01 Why cloud native
  click 1 → 02 Containers
  click 2 → 03 Kubernetes
  click 3 → 04 Core objects
  click 4 → 05 Hands-on & keep going
---

<p class="title-prompt">❯ agenda</p>

# What we will cover today

<div class="visual-dominant agenda-wrap">

<AgendaWalkthrough :clicks="$clicks" />

</div>

---
notes: |
  ~3 min. Ask: who has Docker? who has run kubectl? Calibrate depth.
  Walk production reality in order:
  1) Security — TLS, OAuth2, RBAC, network policies, secrets
  2) Supply chain — CVEs, image signing, multi-arch builds
  3) Runtime — scalability, HA, observability, startup order
  Punchline: laptop success is not production readiness.
---

<p class="title-prompt">❯ problem</p>

# “It works on my laptop”

<div class="visual-dominant">

<FrictionDiagram />

</div>

<span class="takeaway">Cloud Native exists because production is a different problem.</span>

---
notes: |
  One product is rarely one process: APIs, workers, caches, databases.
  Network failures need retries, timeouts, circuit breakers.
  You also need logs, metrics, traces, and policy across services.
---

<p class="title-prompt">❯ reality</p>

# Apps are already distributed

<div class="visual-dominant">

<DistributedApp />

</div>

---
layout: section
act: Act 01
---

# Containers

Standard packaging so software can run the same way everywhere.

---
notes: |
  Virtual Machines package a full guest OS, making them heavy and slow. Containers share the host kernel and isolate processes, making them lightweight.
---

<p class="title-prompt">❯ virtualization</p>

# Containers vs Virtual Machines

How containers differ from traditional virtualization.

<div class="visual-dominant">

<ContainersVsVms />

</div>

---
notes: |
  Google ran Borg at scale from 2003. In 2006 Google engineers invented cgroups
  (process containers) for CPU/memory/I/O limits — later upstreamed into Linux.
  Docker (2013) made containers easy for developers; Kubernetes (2014) open-sourced
  Borg’s orchestration ideas; CNCF (2015) became their neutral home.
---

<p class="title-prompt">❯ history</p>

# From Borg to Kubernetes

<div class="visual-dominant">

<BorgTimeline />

</div>

---
notes: |
  Same idea as physical shipping: a standard shape that every transport understands.
  App + deps + config travel as one unit — laptop, CI, and cluster all accept it.
---

<p class="title-prompt">❯ analogy</p>

# Think shipping containers

<div class="visual-dominant">

<ShippingContainerAnalogy />

</div>

---
notes: |
  Soft-pedal if time is tight — one sentence: isolate what you see, limit what you use.
  Namespaces = PID, network, mounts. cgroups = CPU, memory, I/O.
---

<p class="title-prompt">❯ kernel</p>

# Two Linux features made containers possible

<div class="visual-dominant">

<KernelIsolationDiagram />

</div>

---
notes: |
  Each Dockerfile line becomes a layer. Cached layers make rebuilds fast.
  Demo the mental model: FROM → WORKDIR → COPY → CMD.
---

<p class="title-prompt">❯ docker</p>

# Docker made containers usable

<div class="visual-dominant">

<DockerBuildDiagram />

</div>

---
clicks: 8
notes: |
  Walk a tiny web-app Dockerfile — same ideas as production recipes, fewer lines.
  FROM slim → WORKDIR → COPY only the app → USER non-root → ENV (no secrets) →
  EXPOSE docs port → HEALTHCHECK local → CMD exec form.
  Click lines / tabs or advance with keyboard; layer rail lights as you go.
---

<p class="title-prompt">❯ dockerfile</p>

# Each Dockerfile line, explained

<div class="visual-dominant">

<DockerfileWalkthrough :clicks="$clicks" />

</div>

<span class="takeaway">Click a line or tab — one instruction, one layer / config choice.</span>

---
clicks: 3
notes: |
  Compose = multi-container app as one file. Great for company laptop parity.
  Pros: declarative, shared networks, one command onboarding.
  Limits in prod: single host, weak healing/rollouts, secrets in env, no real HA → why Kubernetes.
---

<p class="title-prompt">❯ compose</p>

# Compose: a company stack on one machine

<div class="visual-dominant">

<DockerComposeDiagram :clicks="$clicks" />

</div>

<span class="takeaway">Compose ships the stack to every laptop. Production still needs an orchestrator.</span>

---
clicks: 3
notes: |
  Ladder — all three columns stay on screen. Spotlight each beat:
  1) VMs · VMware/Linux — virtualize hardware (full guest OS).
  2) Containers · Docker/containerd — virtualize the OS (shared kernel).
  3) Platform · Kubernetes — virtualize the cluster (schedule, heal, balance).
  Closing banner: hardware → OS processes → cluster scheduling.
---

<p class="title-prompt">❯ ladder</p>

# From machine to platform

<div class="visual-dominant">

<PackagingLadder :clicks="$clicks" />

</div>

---
layout: section
act: Act 02
---

# Kubernetes

The control plane that runs containers at scale.

---
clicks: 3
notes: |
  CNCF Annual Cloud Native Survey 2025:
  98% cloud native adoption · 82% of container users run K8s in prod ·
  66% of GenAI hosts use Kubernetes for inference / ops.
  Punchline: this is no longer niche — it’s the default substrate.
---

<p class="title-prompt">❯ why-it-matters</p>

# Cloud native is the default

<div class="visual-dominant">

<CncfAdoptionStats :clicks="$clicks" />

</div>

---
clicks: 5
notes: |
  First paint shows all five company stories with scannable QRs.
  Advance to spotlight each: OpenAI → Anthropic → NVIDIA → Google → Microsoft.
  Point at the QR; short URL label is under each blurb.
---

<p class="title-prompt">❯ ai-workloads</p>

# Kubernetes is the OS for AI workloads

<div class="visual-dominant">

<AiK8sExamples :clicks="$clicks" />

</div>

<span class="takeaway">Train, serve, and scale AI on the same API that runs your apps.</span>

---
notes: |
  You never SSH to “fix the app.” You tell the API what you want; controllers reconcile.
  Control plane decides; workers run containers; API server is the only entry point.
---

<p class="title-prompt">❯ architecture</p>

# Two planes, one cluster

<div class="visual-dominant">

<K8sArchitecture />

</div>

<span class="takeaway">You talk to the API. Controllers do the rest.</span>

---
clicks: 3
notes: |
  Self-healing restarts failed Pods. Declarative = say what you want.
  Also: scaling, rolling updates, stable DNS via Services, same YAML laptop → cloud.
---

<p class="title-prompt">❯ why-k8s</p>

# Why teams use Kubernetes

<div class="visual-dominant">

<K8sDeploymentHighlights :clicks="$clicks" />

</div>

---
clicks: 4
notes: |
  Full pets vs cattle pipelines stay on screen. Spotlight each stage:
  1) Build — manual zip vs automated CI images
  2) Deploy — SSH scripts vs declarative GitOps
  3) Run — host OS vs orchestrated Pods
  4) Operate — reactive firefighting vs self-healing
  Closing banner: identical disposable cattle, not unique pets.
---

<p class="title-prompt">❯ practice</p>

# Traditional vs Cloud Native

<div class="visual-dominant">

<SdlcComparison :clicks="$clicks" />

</div>

---
layout: section
act: Act 03
---

# Core objects

The building blocks every Kubernetes app uses.

---
clicks: 3
notes: |
  Pod = one or more containers sharing network and storage.
  Shared IP and localhost. Often app + sidecar. Ephemeral — replaced anytime.
  You rarely create Pods by hand; Deployments manage them.
---

<p class="title-prompt">❯ pods</p>

# A Pod is the smallest unit

<div class="visual-dominant">

<PodDiagram :clicks="$clicks" />

</div>

---
clicks: 2
notes: |
  Critical aha: Deployment owns desired replica count; ReplicaSet keeps Pods alive.
  replicas = how many copies. Rolling updates when you change the image.
  Delete a Pod → Deployment makes another.
---

<p class="title-prompt">❯ deployments</p>

# Deployments keep the right number of Pods

<div class="visual-dominant">

<DeploymentDiagram :clicks="$clicks" />

</div>

---
clicks: 3
notes: |
  Startup Probe: slow booting app? delays initial probes. Kubelet runs the checks.
  Liveness Probe: process hung? restart.
  Readiness Probe: not ready? temporarily stop traffic.
---

<p class="title-prompt">❯ probes</p>

# Self-healing with probes

<div class="visual-dominant">

<ProbesDiagram :clicks="$clicks" />

</div>

---
clicks: 2
notes: |
  Pods come and go; Service stays. Using label selectors, a Service finds target pods.
  Maps external port (80) to pod targetPort (8080).
---

<p class="title-prompt">❯ services</p>

# Service: Stable network routing & selectors

<div class="visual-dominant">

<ServiceDiagram :clicks="$clicks" />

</div>

---
clicks: 3
notes: |
  ClusterIP (default): cluster-internal only — backends, DBs, caches.
  NodePort: opens a static high port (30000–32767) on every node IP.
  LoadBalancer: Kubernetes asks a cloud or infra provider to provision
  an external LB (AWS ELB, GCP LB, Cloudflare, MetalLB on-prem).
---

<p class="title-prompt">❯ service-types</p>

# Service types: Scoping traffic ingress

<div class="visual-dominant">

<ServiceTypesDiagram :clicks="$clicks" />

</div>

---
clicks: 3
notes: |
  Gateway API replaces classic Ingress with role-oriented objects.
  Platform owns GatewayClass + Gateway (entry, TLS, controller).
  App owns HTTPRoute (hosts/paths → Services). Controllers implement it.
---

<p class="title-prompt">❯ gateway-api</p>

# Gateway API: role-oriented ingress

<div class="visual-dominant">

<GatewayApiDiagram :clicks="$clicks" />

</div>

---
clicks: 4
notes: |
  Walk one sample app end-to-end:
  GatewayClass picks the controller → Gateway is the shared HTTPS door →
  HTTPRoute attaches /checkout → Service load-balances to checkout Pods.
  Platform owns class + gateway; app owns route + service.
---

<p class="title-prompt">❯ gateway-api · sample</p>

# Gateway API in a sample shop app

<div class="visual-dominant">

<GatewayApiSample :clicks="$clicks" />

</div>

<span class="takeaway">shop.example.com/checkout → Gateway → HTTPRoute → Service → Pods</span>

---
clicks: 3
notes: |
  ConfigMap = non-secret settings (flags, URLs, log levels).
  Inject as env vars or files. Same image, different config per environment.
---

<p class="title-prompt">❯ configmaps</p>

# ConfigMaps: config without rebuilding

<div class="visual-dominant">

<ConfigDiagram :clicks="$clicks" />

</div>

<span class="takeaway">Same image. Different config per environment.</span>

---
clicks: 3
notes: |
  Critical aha: Secret data is base64-encoded, NOT encrypted.
  echo VALUE | base64 -d recovers the plaintext instantly.
  Real protection = RBAC + etcd encryption at rest + external secret stores.
---

<p class="title-prompt">❯ secrets</p>

# Secrets: encoded, not encrypted

<div class="visual-dominant">

<SecretsDiagram :clicks="$clicks" />

</div>

<span class="takeaway">base64 ≠ encryption. Treat Secrets as sensitive plaintext with access control.</span>

---
clicks: 3
notes: |
  Recap ownership before wrap-up:
  Platform = GatewayClass/Gateway, LB plumbing, RBAC, encryption.
  App = Deployments, probes, Routes, ConfigMaps, Secret data.
  Shared = Secrets (create vs protect), Gateway+HTTPRoute handoff.
---

<p class="title-prompt">❯ ownership</p>

# Who owns each resource?

<div class="visual-dominant">

<RolesOwnershipDiagram :clicks="$clicks" />

</div>

---
notes: |
  Map the official Kubernetes cert ladder: associates → professional → Kubestronaut.
  Don’t pitch buying exams tonight — show the path exists and is doable.
---

<p class="title-prompt">❯ next · certs</p>

# Keep going: Kubernetes certifications

<div class="visual-dominant resources-full">

<KeepGoingCerts />

</div>

---
notes: |
  Practical study stack: docs + hands-on sandboxes + exam simulators.
  Killercoda companion lab: https://killercoda.com/tineoc/scenario/cloud-native-k8s-101
  (source: github.com/TineoC/cloud-native-k8s-101-lab);
  Killercoda / killer.sh for muscle memory; KodeKloud / LF for structured courses.
---

<p class="title-prompt">❯ next · study</p>

# Keep going: courses & platforms

<div class="visual-dominant resources-full">

<KeepGoingStudy />

</div>

---
notes: |
  Zoom out: cloud native is a worldwide community, not just a cert grind.
  CNCF Slack + Kubernetes Slack, CNCF meetups, KubeCon, KCDs.
---

<p class="title-prompt">❯ next · community</p>

# Keep going: Cloud Native communities

<div class="visual-dominant resources-full">

<KeepGoingCommunities />

</div>

---
notes: |
  Leave this up while people open phones. Live companion lab for the talk:
  https://killercoda.com/tineoc/scenario/cloud-native-k8s-101
---

<p class="title-prompt">❯ next · lab</p>

# Hands-on: Killercoda lab

<div class="visual-dominant lab-cta">
  <div class="qr-wrap lab-cta-qr">
    <img src="/qr/cloud-native-k8s-101-lab.png" alt="QR: Killercoda Acme Shop lab" width="200" height="200" />
    <span class="lab-cta-scan">Scan to open the lab</span>
  </div>
  <div class="lab-cta-copy">
    <p class="lab-cta-lead">
      Acme Shop companion — containers through Deployments, probes, Services, ConfigMaps/Secrets, and NodePort.
    </p>
    <p class="lab-cta-url">
      killercoda.com/tineoc/scenario/cloud-native-k8s-101
    </p>
  </div>
</div>

---
layout: cover
---

<div class="thank-you-grid">
  <div class="thank-you-copy">
    <p class="title-prompt">❯ eof</p>
    <h1 class="thank-you-title">Thank you</h1>
    <p class="thank-you-sub">Questions? Scan for the slides or LinkedIn.</p>
    <div class="thank-you-speaker">
      <p class="speaker">Christopher Tineo</p>
      <p class="thank-you-link">linkedin.com/in/christopher-tineo</p>
      <p class="thank-you-link">github.com/TineoC</p>
      <p class="thank-you-slides-url">tineoc.github.io/talks/cloud-native-k8s-101/</p>
    </div>
  </div>
  <div class="thank-you-qrs">
    <div class="qr-wrap">
      <img src="/qr/slides-gh-pages.png" alt="QR: slides on GitHub Pages" width="150" height="150" />
      <span class="thank-you-qr-label">Slides</span>
    </div>
    <div class="qr-wrap">
      <img src="/qr/linkedin.png" alt="QR: LinkedIn" width="150" height="150" />
      <span class="thank-you-qr-label">LinkedIn</span>
    </div>
  </div>
</div>

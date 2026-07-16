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
    <h1>Cloud Native &amp; Kubernetes 101</h1>

    <p class="hero-sub">How containers and Kubernetes turn “it works on my laptop” into reliable production systems.</p>

    <div class="cover-speaker">
      <p class="speaker">Christopher Tineo</p>
      <p class="role">Senior DevOps Engineer · Game Plan Tech</p>
      <img class="logo-mark cover-role-logo" src="/logos/gameplan.svg" alt="Game Plan Tech" />
    </div>
  </div>

  <div class="cover-visual">
    <img class="cover-hero-photo" src="/meetup-cover.webp" alt="Coffee &amp; Code Philly meetup" />
  </div>
</div>

<!--
Timebox: ~20 min talk + lab. Kick off with why we're here (Philly builders, mixed levels).
-->

---
notes: |
  Senior DevOps at Game Plan Tech. K8s Maintainer, K8s 1.37 Release Communications.
  Certs on screen: GCP PCA, CKA, CKS, Kubestronaut — mention briefly, don't dwell.
---

<p class="title-prompt">❯ whoami</p>

<h1 class="whoami-name">Christopher Tineo</h1>

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

---
notes: |
  Agenda: 3 min problem · ~7 min containers · ~8 min K8s objects · 5 min lab kickoff.
---

<p class="title-prompt">❯ agenda</p>

# What we will cover today

<div class="agenda-list">
  <div class="agenda-item" v-click>
    <span class="num">01</span>
    <div><strong>Why Cloud Native</strong><span>The gap between laptop and production</span></div>
  </div>
  <div class="agenda-item" v-click>
    <span class="num">02</span>
    <div><strong>Containers</strong><span>How we package and ship software</span></div>
  </div>
  <div class="agenda-item" v-click>
    <span class="num">03</span>
    <div><strong>Kubernetes</strong><span>Architecture and core objects</span></div>
  </div>
  <div class="agenda-item" v-click>
    <span class="num">04</span>
    <div><strong>Hands-on lab</strong><span>Build, deploy, and reach an app</span></div>
  </div>
</div>

---
notes: |
  ~3 min. Ask: who has Docker? who has run kubectl? Calibrate depth.
  Walk the gap: dependencies, secrets, networking, scaling, security, startup order —
  each is “solved” differently on a laptop vs a cluster.
---

<p class="title-prompt">❯ problem</p>

# “It works on my laptop”

<div class="visual-dominant">

<FrictionDiagram />

<span class="takeaway" v-click>Cloud Native makes that complexity manageable.</span>

</div>

---
notes: |
  Same app, three places it lives. Local is for you. Staging proves the path.
  Production is where blast radius and policy matter — but the packaging stays familiar.
---

<p class="title-prompt">❯ environments</p>

# Same app. Three environments.

<div class="visual-dominant">

<EnvironmentsDiagram />

<span class="takeaway" v-click>Promote the same image. Change config, not code.</span>

</div>

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

<span class="takeaway" v-click>Many services. One product. The network is the glue.</span>

</div>

---
layout: section
act: Act 01
---

# Containers

Standard packaging so software can run the same way everywhere.

---
notes: |
  One beat: Google ran this at scale → open-sourced the ideas as Kubernetes. Skip deep Omega lore.
---

<p class="title-prompt">❯ history</p>

# From Borg to Kubernetes

<div class="visual-dominant">

<div class="logo-row">
  <img class="logo-mark" src="/logos/google.png" alt="Google" />
  <span class="muted" style="font-size: 1.25rem;">→</span>
  <img class="logo-mark lg" src="/logos/kubernetes.svg" alt="Kubernetes" />
  <img class="logo-mark sm" src="/logos/cncf.svg" alt="CNCF" />
</div>

<BorgTimeline />

<span class="takeaway">Battle-tested scheduling — now for everyone.</span>

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

<div class="grid-2">
<div class="panel success">
  <p style="margin: 0; font-family: 'IBM Plex Mono', monospace; font-size: 1.5rem; font-weight: 700; color: var(--gg-success);">2002</p>
  <h3 style="margin-top: 0.5rem;">Namespaces</h3>
  <p class="muted" style="margin: 0.35rem 0 0;">Isolate what a process can see</p>
</div>
<div class="panel warn">
  <p style="margin: 0; font-family: 'IBM Plex Mono', monospace; font-size: 1.5rem; font-weight: 700; color: var(--gg-warn);">2006</p>
  <h3 style="margin-top: 0.5rem;">cgroups</h3>
  <p class="muted" style="margin: 0.35rem 0 0;">Limit what a process can use</p>
</div>
</div>

<span class="takeaway">Namespaces isolate. cgroups control. Together → containers.</span>

---
notes: |
  Each Dockerfile line becomes a layer. Cached layers make rebuilds fast.
  Demo the mental model: FROM → WORKDIR → COPY → CMD.
---

<p class="title-prompt">❯ docker</p>

# Docker made containers usable

<div class="logo-row" style="margin-bottom: 0.75rem;">
  <img class="logo-mark lg" src="/logos/docker.png" alt="Docker" />
</div>

<div class="grid-2">
<div>

<div class="layer-stack">
  <div class="layer layer-4">CMD ["python", "app.py"]</div>
  <div class="layer layer-3">COPY . /app</div>
  <div class="layer layer-2">WORKDIR /app</div>
  <div class="layer layer-1">FROM python:3.12-slim</div>
</div>

</div>
<div class="terminal">
  <p style="margin: 0 0 0.5rem;"><span class="prompt">❯</span> docker build -t cloud-native-101-app:local .</p>
  <p class="output" style="margin: 0 0 0.75rem;">➜ Step 1/4 : FROM python:3.12-slim
➜ Step 2/4 : WORKDIR /app
➜ Step 3/4 : COPY . /app
➜ Step 4/4 : CMD ["python", "app.py"]</p>
  <p style="margin: 0;"><span class="prompt">❯</span> docker run --rm -p 8080:80 cloud-native-101-app:local</p>
</div>
</div>

---
notes: |
  Four pillars of the practice — not a product to buy.
  Containers package; declarative APIs describe intent; automation ships;
  observability tells you what actually happened.
---

<p class="title-prompt">❯ cloud-native</p>

# Cloud Native in one slide

<div class="pillars">
  <div class="pillar" v-click>
    <p class="label">01</p>
    <div class="pillar-head">
      <img src="/logos/docker-mark.svg" alt="" />
      <strong>Containers</strong>
    </div>
    <p>Package once, run anywhere</p>
  </div>
  <div class="pillar" v-click>
    <p class="label">02</p>
    <div class="pillar-head">
      <img src="/logos/kubernetes.svg" alt="" />
      <strong>Declarative APIs</strong>
    </div>
    <p>Desired state, not steps</p>
  </div>
  <div class="pillar" v-click>
    <p class="label">03</p>
    <div class="pillar-head">
      <img src="/logos/cncf.svg" alt="" />
      <strong>Automation</strong>
    </div>
    <p>CI/CD, GitOps, autoscaling</p>
  </div>
  <div class="pillar" v-click>
    <p class="label">04</p>
    <div class="pillar-head">
      <img src="/logos/prometheus.svg" alt="" />
      <img src="/logos/otel.svg" alt="" style="height: 24px; width: 24px;" />
      <strong>Observability</strong>
    </div>
    <p>Metrics, logs, traces</p>
  </div>
</div>

<span class="takeaway" v-click>A practice — not a single product.</span>

---
notes: |
  Containers share the host kernel → start in seconds, pack denser.
  VMs carry a full guest OS → heavier, slower boot, stronger isolation boundary.
---

<p class="title-prompt">❯ isolation</p>

# Containers vs VMs

<div class="visual-dominant">

<ContainersVsVms />

<span class="takeaway">Lighter and faster — not a full OS per app.</span>

</div>

---
notes: |
  Ladder: VMs virtualize hardware. Containers package the app. Kubernetes schedules many containers.
  Each step keeps the previous benefit and adds control.
---

<p class="title-prompt">❯ ladder</p>

# From machine to platform

<div class="visual-dominant">

<PackagingLadder />

<span class="takeaway">VM packages a machine. Container packages an app. Kubernetes runs many apps.</span>

</div>

---
layout: section
act: Act 02
---

# Kubernetes

The control plane that runs containers at scale.

---
notes: |
  You never SSH to “fix the app.” You tell the API what you want; controllers reconcile.
  Control plane decides; workers run containers; API server is the only entry point.
---

<p class="title-prompt">❯ architecture</p>

# Two planes, one cluster

<div class="visual-dominant">

<K8sArchitecture />

<span class="takeaway">You talk to the API. Controllers do the rest.</span>

</div>

---
notes: |
  Self-healing restarts failed Pods. Declarative = say what you want.
  Scale up/down. Rolling updates. Stable DNS via Services. Same YAML laptop → cloud.
---

<p class="title-prompt">❯ why-k8s</p>

# Why teams use Kubernetes

<div class="benefit-grid">
  <div class="benefit" v-click>
    <strong>Self-healing</strong>
    <p>Failed Pods restart</p>
  </div>
  <div class="benefit" v-click>
    <strong>Declarative</strong>
    <p>Say it; K8s reconciles</p>
  </div>
  <div class="benefit" v-click>
    <strong>Scaling</strong>
    <p>Grow on demand</p>
  </div>
  <div class="benefit" v-click>
    <strong>Rollouts</strong>
    <p>No-downtime updates</p>
  </div>
  <div class="benefit" v-click>
    <strong>Discovery</strong>
    <p>Stable DNS for Pods</p>
  </div>
  <div class="benefit" v-click>
    <strong>Portability</strong>
    <p>Same YAML everywhere</p>
  </div>
</div>

---
notes: |
  Contrast: manual snowflake servers vs automated immutable infra with observability.
---

<p class="title-prompt">❯ practice</p>

# Traditional vs Cloud Native

<div class="compare">
  <div class="compare-col bad">
    <h3>Traditional</h3>
    <ul>
      <li v-click>Manual deploys</li>
      <li v-click>Snowflake servers</li>
      <li v-click>Firefighting</li>
      <li v-click>Slow releases</li>
    </ul>
  </div>
  <div class="compare-col good">
    <h3>Cloud Native</h3>
    <ul>
      <li v-click>Automated CI/CD</li>
      <li v-click>Immutable infra</li>
      <li v-click>Observability first</li>
      <li v-click>Safe, frequent releases</li>
    </ul>
  </div>
</div>

---
layout: section
act: Act 03
---

# Core objects

The building blocks every Kubernetes app uses.

---
notes: |
  Pod = one or more containers sharing network and storage.
  Shared IP and localhost. Often app + sidecar. Ephemeral — replaced anytime.
  You rarely create Pods by hand; Deployments manage them.
---

<p class="title-prompt">❯ pods</p>

# A Pod is the smallest unit

<div class="visual-dominant">

<PodDiagram />

<span class="takeaway">Deployments manage Pods — you rarely create them by hand.</span>

</div>

---
notes: |
  Critical aha: Deployment owns desired replica count; ReplicaSet keeps Pods alive.
  replicas = how many copies. Rolling updates when you change the image.
  Delete a Pod → Deployment makes another.
---

<p class="title-prompt">❯ deployments</p>

# Deployments keep the right number of Pods

<div class="visual-dominant">

<DeploymentDiagram />

<span class="takeaway">Delete a Pod. The Deployment makes another.</span>

</div>

---
notes: |
  YAML is the common language. You describe what you want; controllers reconcile how.
  Labels identify Pods so selectors can find them.
---

<p class="title-prompt">❯ yaml</p>

# Declare desired state

<div class="grid-2" style="align-items: start;">
<div>

<p class="lead">Describe <em>what</em>. Kubernetes figures out <em>how</em>.</p>

<span class="takeaway" style="margin-top: 1rem;">Controllers reconcile continuously.</span>

</div>
<div>

<<< @/snippets/deployment.yaml{yaml}

</div>
</div>

---
notes: |
  Pods wear labels. Deployments and Services select by those labels.
  No match → Service has nowhere to send traffic.
---

<p class="title-prompt">❯ labels</p>

# Labels connect objects

<div class="visual-dominant">

<LabelSelectorDiagram />

<span class="takeaway">No labels match → nowhere to send traffic.</span>

</div>

---
notes: |
  Liveness: dead? restart. Readiness: not ready? no traffic. Startup: give slow apps time.
  Kubelet runs the checks — no human pager for simple restarts.
---

<p class="title-prompt">❯ probes</p>

# Self-healing with probes

<div class="probe-row">
  <div class="probe live" v-click>
    <p class="q">Liveness</p>
    <strong>Alive?</strong>
    <p>If not → restart</p>
  </div>
  <div class="probe ready" v-click>
    <p class="q">Readiness</p>
    <strong>Ready?</strong>
    <p>If not → no traffic</p>
  </div>
  <div class="probe start" v-click>
    <p class="q">Startup</p>
    <strong>Booted?</strong>
    <p>Gives slow apps time</p>
  </div>
</div>

<span class="takeaway" v-click>Kubelet runs the checks. No pager for restarts.</span>

---
notes: |
  Pods come and go; Service stays. ClusterIP internal, NodePort on every node,
  LoadBalancer for cloud LB. Selector must match Pod labels.
---

<p class="title-prompt">❯ services</p>

# Services give Pods a stable address

<div class="visual-dominant">

<ServiceDiagram />

<span class="takeaway">Selector must match Pod labels.</span>

</div>

---
notes: |
  ConfigMap = non-secret settings. Secret = passwords/tokens/keys.
  Inject as env vars or files. Same image, different config per environment.
---

<p class="title-prompt">❯ config</p>

# Config without rebuilding images

<div class="visual-dominant">

<ConfigDiagram />

<span class="takeaway">Same image. Different config per environment.</span>

</div>

---
notes: |
  Request = minimum guaranteed. Limit = hard max.
  CPU throttles; memory OOM-kills.
  Guaranteed (req=limit), Burstable (req<limit), BestEffort (neither — risky).
---

<p class="title-prompt">❯ resources</p>

# Tell the scheduler what you need

<div class="stack" style="max-width: 36rem; margin: 0.5rem auto 0;">
  <div class="panel success" v-click><strong>Guaranteed</strong> — request = limit</div>
  <div class="panel warn" v-click><strong>Burstable</strong> — request &lt; limit</div>
  <div class="panel critical" v-click><strong>BestEffort</strong> — neither set (risky)</div>
</div>

<span class="takeaway">Always set requests. Guessing creates noisy neighbors.</span>

---
notes: |
  Bridge to lab: these four commands are 90% of day-one kubectl.
  Apply → get → logs → port-forward.
---

<p class="title-prompt">❯ kubectl</p>

# Your day-one toolkit

<div class="terminal" style="max-width: 42rem;">
  <p style="margin: 0 0 0.65rem;"><span class="prompt">❯</span> kubectl apply -f manifests/deployment.yaml</p>
  <p style="margin: 0 0 0.65rem;"><span class="prompt">❯</span> kubectl get pods -n cloud-native-101</p>
  <p style="margin: 0 0 0.65rem;"><span class="prompt">❯</span> kubectl logs -l app=cloud-native-101 -n cloud-native-101</p>
  <p style="margin: 0;"><span class="prompt">❯</span> kubectl port-forward svc/cloud-native-101 8080:80 -n cloud-native-101</p>
</div>

<span class="takeaway" style="margin-top: 1rem;">Apply → get → logs → port-forward. That’s the lab loop.</span>

---
notes: |
  ~5 min kickoff then walk the room. Stretch in stretch/ for early finishers.
---

<p class="title-prompt">❯ lab</p>

# Hands-on: Killercoda lab

<div class="grid-2">
<div class="step-list">
  <div class="step-row"><span class="step-num">1</span>Build the container image</div>
  <div class="step-row"><span class="step-num">2</span>Deploy with <code>kubectl apply</code></div>
  <div class="step-row"><span class="step-num">3</span>Inspect pods and logs</div>
  <div class="step-row"><span class="step-num">4</span>Port-forward and hit the app</div>
  <div class="step-row"><span class="step-num">5</span>Inject ConfigMap and Secret</div>
</div>
<div class="qr-wrap">
  <img src="/qr/lab.png" alt="QR: Killercoda lab on GitHub" width="160" height="160" />
  <span class="muted" style="font-size: 0.85rem; text-align: center;">github.com/TineoC/talks<br/>…/killercoda/cloud-native-k8s-101</span>
</div>
</div>

---

<p class="title-prompt">❯ next</p>

# Keep going

<div class="grid-2">
  <div class="panel primary">
    <p style="margin: 0 0 0.65rem; font-weight: 700;">Docs & lab</p>
    <ul class="tight" style="margin: 0;">
      <li><a href="https://kubernetes.io/docs/tutorials/" target="_blank">kubernetes.io tutorials</a></li>
      <li><a href="https://github.com/TineoC/talks/tree/main/killercoda/cloud-native-k8s-101" target="_blank">Tonight’s lab (GitHub)</a></li>
      <li><a href="https://www.cncf.io/projects/" target="_blank">CNCF projects</a></li>
    </ul>
  </div>
  <div class="panel success">
    <p style="margin: 0 0 0.65rem; font-weight: 700;">Community</p>
    <ul class="tight" style="margin: 0;">
      <li><a href="https://www.meetup.com/code-coffee-philly/" target="_blank">Coffee & Code Philly</a></li>
      <li><a href="https://www.meetup.com/Kubernetes-Philly/" target="_blank">Kubernetes Philly</a></li>
      <li>CNCF Slack · KubeCon / KCD</li>
    </ul>
  </div>
</div>

<p class="muted" style="margin-top: 1rem; font-size: 0.9rem;">Next when ready: namespaces, Ingress/Gateway API, storage, RBAC, GitOps.</p>

---
layout: cover
---

# Thank you

<p class="hero-sub">Questions? Let’s build — grab coffee and open the lab.</p>

<div class="grid-2" style="margin-top: 1.25rem; max-width: 38rem; align-items: center;">
<div>
  <p class="speaker">Christopher Tineo</p>
  <p style="margin: 0.35rem 0; font-family: 'IBM Plex Mono', monospace; font-size: 0.92rem;">linkedin.com/in/christopher-tineo</p>
  <p style="margin: 0; font-family: 'IBM Plex Mono', monospace; font-size: 0.92rem;">github.com/TineoC</p>
</div>
<div class="qr-wrap">
  <img src="/qr/linkedin.png" alt="QR: LinkedIn" width="150" height="150" />
</div>
</div>

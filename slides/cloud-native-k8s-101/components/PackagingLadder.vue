<template>
  <div class="ladder" :data-step="clicks" role="img" :aria-label="ariaLabel">
    <div class="ladder-progress">
      <span class="progress-label">{{ progressLabel }}</span>
      <div class="progress-dots" aria-hidden="true">
        <span
          v-for="n in 4"
          :key="n"
          class="dot"
          :class="{ on: clicks >= n - 1, now: currentDot === n - 1 }"
        />
      </div>
    </div>

    <div class="ladder-cols">
      <!-- 01 VM -->
      <article class="rung" :class="rungClass(0, 'vm')">
        <header class="rung-head">
          <img class="rung-logo" :src="logo('logos/vmware.svg')" alt="VMware" />
          <div class="rung-titles">
            <span class="rung-num">01</span>
            <span class="rung-name">Virtual Machine</span>
          </div>
        </header>

        <div class="stack">
          <div class="layer">
            <span class="layer-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M8 7h8M8 12h8M8 17h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2"/></svg>
            </span>
            <div class="layer-copy">
              <span>Application code</span>
              <em>one app process</em>
            </div>
          </div>
          <div class="layer tone">
            <img class="layer-logo" :src="logo('logos/linux.svg')" alt="Linux" />
            <div class="layer-copy">
              <span>Guest OS + kernel</span>
              <em>full OS per VM · gigabytes</em>
            </div>
          </div>
          <div class="layer tone">
            <img class="layer-logo" :src="logo('logos/vmware.svg')" alt="VMware" />
            <div class="layer-copy">
              <span>Hypervisor</span>
              <em>ESXi · KVM · Hyper-V</em>
            </div>
          </div>
          <div class="layer">
            <span class="layer-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="1.5" stroke="currentColor" stroke-width="2"/><circle cx="7" cy="12" r="1.2" fill="currentColor"/><path d="M11 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </span>
            <div class="layer-copy">
              <span>Physical hardware</span>
              <em>CPU · RAM · disk · NIC</em>
            </div>
          </div>
        </div>

        <footer class="rung-foot">
          <strong>Virtualize the hardware</strong>
          <span>Heavy: a full guest OS for every app</span>
        </footer>
      </article>

      <div class="rail" :class="{ lit: clicks >= 1 }" aria-hidden="true">
        <span class="rail-line" />
        <span class="rail-chevron">→</span>
      </div>

      <!-- 02 Container -->
      <article class="rung" :class="rungClass(1, 'ctr')">
        <header class="rung-head">
          <img class="rung-logo" :src="logo('logos/docker-mark.svg')" alt="Docker" />
          <div class="rung-titles">
            <span class="rung-num">02</span>
            <span class="rung-name">Container</span>
          </div>
        </header>

        <div class="stack">
          <div class="layer tone">
            <img class="layer-logo" :src="logo('logos/docker-mark.svg')" alt="Docker" />
            <div class="layer-copy">
              <span>App + binaries + libs</span>
              <em>image package · megabytes</em>
            </div>
          </div>
          <div class="layer tone">
            <img class="layer-logo" :src="logo('logos/containerd.svg')" alt="containerd" />
            <div class="layer-copy">
              <span>Container runtime</span>
              <em>Docker · containerd · CRI-O</em>
            </div>
          </div>
          <div class="layer tone">
            <img class="layer-logo" :src="logo('logos/linux.svg')" alt="Linux" />
            <div class="layer-copy">
              <span>Shared host kernel</span>
              <em>namespaces + cgroups</em>
            </div>
          </div>
          <div class="layer">
            <span class="layer-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="1.5" stroke="currentColor" stroke-width="2"/><circle cx="7" cy="12" r="1.2" fill="currentColor"/><path d="M11 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </span>
            <div class="layer-copy">
              <span>Physical hardware</span>
              <em>same host · shared kernel</em>
            </div>
          </div>
        </div>

        <footer class="rung-foot">
          <strong>Virtualize the OS</strong>
          <span>Light: processes share one kernel</span>
        </footer>
      </article>

      <div class="rail" :class="{ lit: clicks >= 2 }" aria-hidden="true">
        <span class="rail-line" />
        <span class="rail-chevron">→</span>
      </div>

      <!-- 03 Platform -->
      <article class="rung" :class="rungClass(2, 'plat')">
        <header class="rung-head">
          <img class="rung-logo" :src="logo('logos/kubernetes.svg')" alt="Kubernetes" />
          <div class="rung-titles">
            <span class="rung-num">03</span>
            <span class="rung-name">Platform · K8s</span>
          </div>
        </header>

        <div class="stack">
          <div class="layer tone pods">
            <div class="pod-row" aria-hidden="true">
              <span class="pod">
                <img :src="logo('logos/kubernetes.svg')" alt="" />
                Pod
              </span>
              <span class="pod">
                <img :src="logo('logos/kubernetes.svg')" alt="" />
                Pod
              </span>
              <span class="pod cache">
                <img :src="logo('logos/redis.svg')" alt="" />
                Redis
              </span>
            </div>
            <div class="layer-copy">
              <span>Workloads · Pods</span>
              <em>replicas · auto-heal · declarative</em>
            </div>
          </div>
          <div class="layer tone">
            <img class="layer-logo" :src="logo('logos/cncf.svg')" alt="CNCF" />
            <div class="layer-copy">
              <span>Control plane API</span>
              <em>schedule · reconcile · observe</em>
            </div>
          </div>
          <div class="layer tone">
            <span class="layer-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="6" height="14" rx="1" stroke="currentColor" stroke-width="1.8"/><rect x="9" y="5" width="6" height="14" rx="1" stroke="currentColor" stroke-width="1.8"/><rect x="16" y="5" width="6" height="14" rx="1" stroke="currentColor" stroke-width="1.8"/></svg>
            </span>
            <div class="layer-copy">
              <span>Worker nodes</span>
              <em>Node A · Node B · Node C</em>
            </div>
          </div>
          <div class="layer">
            <span class="layer-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="1.5" stroke="currentColor" stroke-width="2"/><circle cx="7" cy="12" r="1.2" fill="currentColor"/><path d="M11 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </span>
            <div class="layer-copy">
              <span>Cluster machines</span>
              <em>containers on shared kernels</em>
            </div>
          </div>
        </div>

        <footer class="rung-foot">
          <strong>Virtualize the cluster</strong>
          <span>Schedule, heal, and balance at scale</span>
        </footer>
      </article>
    </div>

    <div class="ladder-banner" :class="{ visible: clicks >= 3 }">
      <span class="banner-kicker">Evolution</span>
      <p class="banner-copy">
        Hardware (VMs) <span aria-hidden="true">→</span> OS processes (Containers) <span aria-hidden="true">→</span> Cluster scheduling (Kubernetes)
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PackagingLadder',
  props: {
    clicks: { type: Number, default: 0 }
  },
  computed: {
    focusStep() {
      if (this.clicks >= 3) return null;
      return Math.min(Math.max(this.clicks, 0), 2);
    },
    currentDot() {
      return Math.min(this.clicks, 3);
    },
    progressLabel() {
      return [
        '01 / 04  ·  VIRTUAL MACHINE',
        '02 / 04  ·  CONTAINER',
        '03 / 04  ·  PLATFORM',
        '04 / 04  ·  FULL LADDER'
      ][Math.min(this.clicks, 3)];
    },
    ariaLabel() {
      return `Packaging ladder step ${Math.min(this.clicks + 1, 4)} of 4: ${this.progressLabel}`;
    }
  },
  methods: {
    logo(path) {
      const base = import.meta.env.BASE_URL || '/';
      return `${base}${path.replace(/^\//, '')}`;
    },
    rungClass(index, tone) {
      const focus = this.focusStep === index;
      return {
        [tone]: true,
        focus,
        dim: this.focusStep !== null && !focus,
        lit: this.focusStep === null || focus
      };
    }
  }
};
</script>

<style scoped>
.ladder {
  --ink: #0F1C2A;
  --muted: #5A6A7A;
  --line: #D5DEE7;
  --paper: #FFFFFF;
  --vm: #CF5A5A;
  --ctr: #0088B8;
  --plat: #158A4E;
  --head-h: 3.15rem;
  --foot-h: 3.15rem;
  --layer-gap: 0.32rem;

  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  padding: 0;
}

.ladder-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-shrink: 0;
  height: 1.1rem;
}

.progress-label {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ctr);
}

.progress-dots {
  display: flex;
  gap: 0.35rem;
}

.progress-dots .dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #CBD5E1;
  transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.progress-dots .dot.on {
  background: color-mix(in srgb, var(--ctr) 55%, #CBD5E1);
}

.progress-dots .dot.now {
  background: var(--ctr);
  transform: scale(1.2);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ctr) 22%, transparent);
}

.ladder-cols {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 1.35rem minmax(0, 1fr) 1.35rem minmax(0, 1fr);
  gap: 0.35rem;
  align-items: stretch;
}

/* Shared column chrome: identical head / stack / foot tracks */
.rung {
  --accent: var(--ctr);
  display: grid;
  grid-template-rows: var(--head-h) minmax(0, 1fr) var(--foot-h);
  gap: 0.4rem;
  min-width: 0;
  min-height: 0;
  height: 100%;
  padding: 0.65rem 0.7rem 0.6rem;
  background: var(--paper);
  border: 1.5px solid var(--line);
  box-shadow: inset 4px 0 0 #CBD5E1;
  box-sizing: border-box;
  transition:
    opacity 0.35s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.3s ease;
  animation: rung-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.rung.vm { --accent: var(--vm); box-shadow: inset 4px 0 0 #E8B4B4; }
.rung.ctr { --accent: var(--ctr); box-shadow: inset 4px 0 0 #A8D4E8; }
.rung.plat { --accent: var(--plat); box-shadow: inset 4px 0 0 #A8D5BE; background: #F4FBF7; }

.rung.dim {
  opacity: 0.42;
  filter: grayscale(0.18);
  transform: none;
}

.rung.focus {
  opacity: 1;
  filter: none;
  border-color: var(--accent);
  box-shadow: inset 4px 0 0 var(--accent);
  transform: translateY(-2px);
  animation: rung-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both, rung-focus 0.55s ease;
}

.rung.lit:not(.dim):not(.focus) {
  opacity: 1;
  filter: none;
}

@keyframes rung-in {
  from { opacity: 0.2; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes rung-focus {
  0% { transform: translateY(0); }
  40% { transform: translateY(-3px) scale(1.01); }
  100% { transform: translateY(-2px) scale(1); }
}

.rung-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 0;
  overflow: hidden;
}

.rung-logo {
  width: 2.05rem;
  height: 2.05rem;
  flex-shrink: 0;
  object-fit: contain;
  display: block;
}

.rung-titles {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.08rem;
}

.rung-num {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--accent);
  line-height: 1;
}

.rung-name {
  font-family: 'Outfit', sans-serif;
  font-size: 1.18rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Four equal layer tracks — aligns across all three columns */
.stack {
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  gap: var(--layer-gap);
  min-height: 0;
  height: 100%;
}

.layer {
  display: grid;
  grid-template-columns: 1.65rem minmax(0, 1fr);
  align-items: center;
  gap: 0.5rem;
  min-height: 0;
  height: 100%;
  padding: 0 0.55rem;
  background: #F8FAFC;
  border: 1px solid var(--line);
  box-sizing: border-box;
}

.rung.vm .layer.tone {
  background: #FEF5F5;
  border-color: #E8B4B4;
}

.rung.ctr .layer.tone {
  background: #F0F9FC;
  border-color: #A8D4E8;
}

.rung.plat .layer.tone {
  background: #EDF8F2;
  border-color: #A8D5BE;
}

.layer-logo,
.layer-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  object-fit: contain;
  display: block;
  justify-self: center;
}

.layer-icon {
  color: var(--accent);
}

.layer-icon svg {
  width: 100%;
  height: 100%;
  display: block;
}

.layer-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.06rem;
}

.layer-copy span {
  font-family: 'Outfit', sans-serif;
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.layer-copy em {
  font-family: 'Outfit', sans-serif;
  font-style: normal;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--muted);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Pods row: still one equal track, denser left cluster + copy */
.layer.pods {
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 0.4rem;
  padding-right: 0.45rem;
}

.pod-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.2rem;
  min-width: 0;
}

.pod {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  min-width: 0;
  padding: 0.2rem 0.1rem;
  background: #fff;
  border: 1px solid #A8D5BE;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.58rem;
  font-weight: 700;
  color: var(--plat);
  text-align: center;
  line-height: 1;
}

.pod img {
  width: 1.05rem;
  height: 1.05rem;
  object-fit: contain;
  display: block;
}

.pod.cache {
  border-color: #F5A89A;
  color: #C23B2E;
}

.rung-foot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.1rem;
  min-height: 0;
  padding-top: 0.2rem;
  border-top: 1px solid var(--line);
  overflow: hidden;
}

.rung-foot strong {
  font-family: 'Outfit', sans-serif;
  font-size: 1.02rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.01em;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rung-foot span {
  font-family: 'Outfit', sans-serif;
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--muted);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  opacity: 0.35;
  transition: opacity 0.3s ease, color 0.3s ease;
  color: #94A3B8;
  align-self: stretch;
}

.rail.lit {
  opacity: 1;
  color: var(--ctr);
}

.rail-line {
  width: 1.5px;
  flex: 0 0 1.75rem;
  background: currentColor;
  opacity: 0.35;
}

.rail-chevron {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  line-height: 1;
}

.ladder-banner {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.1rem;
  background: var(--paper);
  border: 1.5px solid color-mix(in srgb, var(--plat) 40%, var(--line));
  box-shadow: inset 4px 0 0 var(--plat);
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  padding: 0 0.85rem;
  border-width: 0;
  transform: translateY(6px);
  pointer-events: none;
  transition:
    opacity 0.35s ease,
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    max-height 0.35s ease,
    padding 0.35s ease,
    border-width 0.2s ease;
}

.ladder-banner.visible {
  opacity: 1;
  transform: translateY(0);
  max-height: 3.75rem;
  padding: 0.45rem 0.85rem 0.45rem 0.95rem;
  border-width: 1.5px;
  pointer-events: auto;
}

.banner-kicker {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--plat);
}

.banner-copy {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.25;
}
</style>

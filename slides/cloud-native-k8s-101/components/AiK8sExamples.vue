<template>
  <div class="ai-k8s" :data-step="clicks">
    <aside class="ai-why" :class="{ dim: clicks >= 1 }">
      <div class="why-kicker">Why AI runs on Kubernetes</div>
      <ul>
        <li><strong>Scale GPUs / nodes</strong> — pack training &amp; inference without rewriting apps</li>
        <li><strong>Same control plane</strong> — deploy, roll out, observe AI like any service</li>
        <li><strong>Burst + idle</strong> — scale inference with traffic; reclaim capacity</li>
        <li><strong>Portable</strong> — laptop → cloud → multi-cloud with one API</li>
      </ul>
      <div class="why-callout">66% of orgs hosting GenAI already use K8s for inference — CNCF 2025</div>
    </aside>

    <section class="ai-examples">
      <header class="examples-head">
        <span class="examples-kicker">Public stories — scan the QR</span>
        <span class="examples-step">{{ progressLabel }}</span>
      </header>

      <div class="examples-list">
        <a
          v-for="(ex, i) in examples"
          :key="ex.name"
          class="ex-card"
          :class="{
            active: activeIndex === i,
            dim: activeIndex !== null && activeIndex !== i,
            pulse: activeIndex === i
          }"
          :href="ex.href"
          target="_blank"
          rel="noopener"
          :style="{ '--delay': `${i * 45}ms`, '--accent': ex.color }"
          @mouseenter="hovered = i"
          @mouseleave="hovered = null"
        >
          <div class="ex-qr-wrap">
            <img :src="ex.qr" :alt="`QR code for ${ex.name}`" class="ex-qr" width="120" height="120" />
          </div>

          <div class="ex-body">
            <div class="ex-top">
              <span class="ex-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <img :src="ex.logo" :alt="ex.name" class="ex-logo" />
              <span class="ex-name">{{ ex.name }}</span>
              <span class="ex-tag">{{ ex.tag }}</span>
            </div>
            <p class="ex-text">{{ ex.body }}</p>
            <p class="ex-url">{{ ex.urlLabel }}</p>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AiK8sExamples',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return {
      hovered: null,
      examples: [
        {
          name: 'OpenAI',
          tag: 'research',
          body: 'Scaled Kubernetes to 7,500 nodes for GPT-3, CLIP, and DALL·E research.',
          href: 'https://openai.com/index/scaling-kubernetes-to-7500-nodes/',
          urlLabel: 'openai.com · scaling to 7,500 nodes',
          logo: '/logos/openai.svg',
          qr: '/qr/openai-k8s-7500.png',
          color: '#0F1C2A'
        },
        {
          name: 'Anthropic',
          tag: 'inference',
          body: 'Claude inference on GKE — Google Cloud Next session with Anthropic infra.',
          href: 'https://www.youtube.com/watch?v=b87I1plPeMg',
          urlLabel: 'youtube · Claude on GKE',
          logo: '/logos/anthropic.svg',
          qr: '/qr/anthropic-claude-gke.png',
          color: '#CF5A5A'
        },
        {
          name: 'NVIDIA',
          tag: 'GPU / DRA',
          body: 'Donated GPU DRA driver to CNCF — accelerators as first-class Kubernetes.',
          href: 'https://blogs.nvidia.com/blog/nvidia-at-kubecon-2026/',
          urlLabel: 'nvidia.com · KubeCon DRA',
          logo: '/logos/nvidia.svg',
          qr: '/qr/nvidia-kubecon-dra.png',
          color: '#158A4E'
        },
        {
          name: 'Google',
          tag: 'GKE',
          body: 'Kapiche: 99.99% AI uptime on GKE through 10× traffic spikes.',
          href: 'https://cloud.google.com/customers/kapiche-ai',
          urlLabel: 'cloud.google.com · Kapiche',
          logo: '/logos/google.png',
          qr: '/qr/kapiche-gke.png',
          color: '#0088B8'
        },
        {
          name: 'Microsoft',
          tag: 'AKS',
          body: 'AT&T Ask AT&T gen AI platform orchestrated on AKS at enterprise scale.',
          href: 'https://www.microsoft.com/en/customers/story/25679-at-and-t-azure',
          urlLabel: 'microsoft.com · AT&T on AKS',
          logo: '/logos/microsoft.svg',
          qr: '/qr/att-aks-ai.png',
          color: '#E2A03F'
        }
      ]
    };
  },
  computed: {
    // clicks 0: overview (no single focus). 1–5: focus OpenAI → Microsoft.
    activeIndex() {
      if (this.hovered !== null) return this.hovered;
      if (this.clicks >= 1 && this.clicks <= this.examples.length) return this.clicks - 1;
      return null;
    },
    progressLabel() {
      if (this.clicks === 0) return '00 / 05  ·  ALL STORIES';
      const n = Math.min(this.clicks, this.examples.length);
      return `${String(n).padStart(2, '0')} / 05  ·  ${this.examples[n - 1].name.toUpperCase()}`;
    }
  }
};
</script>

<style scoped>
.ai-k8s {
  --ink: #0F1C2A;
  --muted: #5A6A7A;
  --line: #D5DEE7;
  --cyan: #0088B8;

  display: grid;
  grid-template-columns: minmax(15rem, 0.95fr) minmax(0, 1.55fr);
  gap: 0.85rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
}

.ai-why {
  background: #fff;
  padding: 1rem 0.95rem;
  box-shadow: inset 4px 0 0 var(--cyan);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  transition: opacity 0.3s ease, filter 0.3s ease;
}

.ai-why.dim {
  opacity: 0.62;
}

.why-kicker,
.examples-kicker {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748B;
}

.ai-why ul {
  margin: 0.75rem 0 0;
  padding: 0;
  list-style: none;
  font-family: 'Outfit', sans-serif;
  font-size: 1.02rem;
  color: #475569;
  line-height: 1.4;
}

.ai-why li {
  position: relative;
  padding-left: 0.85rem;
}

.ai-why li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.35rem;
  height: 0.35rem;
  background: var(--cyan);
}

.ai-why li + li {
  margin-top: 0.45rem;
}

.ai-why strong {
  color: var(--ink);
  font-weight: 800;
}

.why-callout {
  margin-top: 0.85rem;
  padding-top: 0.65rem;
  border-top: 2px solid var(--cyan);
  font-family: 'Outfit', sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
}

.ai-examples {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-height: 0;
  min-width: 0;
}

.examples-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  flex-shrink: 0;
}

.examples-step {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--cyan);
  white-space: nowrap;
}

.examples-list {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.ex-card {
  --accent: var(--cyan);
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.7rem;
  align-items: center;
  padding: 0.35rem 0.65rem 0.35rem 0.4rem;
  background: #fff;
  text-decoration: none;
  color: inherit;
  box-shadow: inset 3px 0 0 #CBD5E1;
  border: 1px solid transparent;
  box-sizing: border-box;
  animation: ai-card-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0ms);
  transition:
    opacity 0.25s ease,
    filter 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.ex-card.dim {
  opacity: 0.42;
  filter: grayscale(0.2);
}

.ex-card.active {
  opacity: 1;
  filter: none;
  box-shadow: inset 4px 0 0 var(--accent);
  border-color: color-mix(in srgb, var(--accent) 28%, transparent);
}

.ex-card.pulse.active {
  animation: ai-focus 0.5s ease;
}

@keyframes ai-card-in {
  from {
    opacity: 0;
    transform: translateX(12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes ai-focus {
  0% { transform: scale(1); }
  40% { transform: scale(1.015); }
  100% { transform: scale(1); }
}

.ex-qr-wrap {
  flex-shrink: 0;
  width: 3.75rem;
  height: 3.75rem;
  padding: 0.2rem;
  background: #fff;
  border: 1px solid var(--line);
  box-sizing: border-box;
}

.ex-qr {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  image-rendering: pixelated;
}

.ex-body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.12rem;
}

.ex-top {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
}

.ex-num {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.ex-logo {
  width: 1.35rem;
  height: 1.35rem;
  object-fit: contain;
  flex-shrink: 0;
}

.ex-name {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.05rem;
  color: var(--ink);
  line-height: 1.1;
}

.ex-tag {
  margin-left: auto;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, var(--line));
  padding: 0.15rem 0.35rem;
  flex-shrink: 0;
}

.ex-text {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 0.82rem;
  color: #475569;
  line-height: 1.25;
}

.ex-url {
  margin: 0;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--cyan);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

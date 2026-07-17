<template>
  <div class="ai-k8s">
    <div class="ai-grid">
      <div
        class="ai-why"
        :class="{ focus: focusWhy, dim: !focusWhy && clicks >= 1 }"
      >
        <div class="why-kicker">Why AI runs on Kubernetes</div>
        <ul>
          <li><strong>Scale GPUs / nodes</strong> — pack training &amp; inference without rewriting apps</li>
          <li><strong>Same control plane</strong> — deploy, roll out, observe AI like any service</li>
          <li><strong>Burst + idle</strong> — scale inference with traffic; reclaim capacity</li>
          <li><strong>Portable</strong> — laptop → cloud → multi-cloud with one API</li>
        </ul>
        <div class="why-callout">66% of orgs hosting GenAI already use K8s for inference — CNCF 2025</div>
      </div>

      <div class="ai-examples">
        <div class="examples-head">
          <span class="examples-kicker">Public stories — scan for the post / talk</span>
          <span class="examples-step">{{ progressLabel }}</span>
        </div>
        <div v-if="clicks === 0" class="examples-idle">
          Advance to walk real AI-on-Kubernetes stories →
        </div>
        <a
          v-for="(ex, i) in examples"
          :key="ex.name"
          class="ex-card"
          :class="{
            visible: isVisible(i),
            active: activeIndex === i,
            dim: isVisible(i) && activeIndex !== null && activeIndex !== i
          }"
          :href="ex.href"
          target="_blank"
          rel="noopener"
          :style="{ '--delay': `${i * 40}ms` }"
          @mouseenter="hovered = i"
          @mouseleave="hovered = null"
        >
          <div class="ex-body">
            <div class="ex-top">
              <span class="ex-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="ex-logos">
                <img
                  v-for="logo in ex.logos"
                  :key="logo"
                  :src="logo"
                  :alt="ex.name"
                  class="ex-logo"
                />
              </div>
              <span class="ex-name">{{ ex.name }}</span>
            </div>
            <div class="ex-text">{{ ex.body }}</div>
          </div>
          <img :src="ex.qr" :alt="`QR: ${ex.name}`" class="ex-qr" />
        </a>
      </div>
    </div>
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
          body: 'Scaled Kubernetes to 7,500 nodes for GPT-3, CLIP, and DALL·E research.',
          href: 'https://openai.com/index/scaling-kubernetes-to-7500-nodes/',
          logos: ['/logos/openai.svg'],
          qr: '/qr/openai-k8s-7500.png'
        },
        {
          name: 'Anthropic',
          body: 'Claude inference on GKE — Google Cloud Next session with Anthropic infra.',
          href: 'https://www.youtube.com/watch?v=b87I1plPeMg',
          logos: ['/logos/anthropic.svg'],
          qr: '/qr/anthropic-claude-gke.png'
        },
        {
          name: 'NVIDIA',
          body: 'Donated GPU DRA driver to CNCF — accelerators as first-class Kubernetes.',
          href: 'https://blogs.nvidia.com/blog/nvidia-at-kubecon-2026/',
          logos: ['/logos/nvidia.svg'],
          qr: '/qr/nvidia-kubecon-dra.png'
        },
        {
          name: 'Google',
          body: 'Kapiche: 99.99% AI uptime on GKE through 10× traffic spikes.',
          href: 'https://cloud.google.com/customers/kapiche-ai',
          logos: ['/logos/google.png'],
          qr: '/qr/kapiche-gke.png'
        },
        {
          name: 'Microsoft',
          body: 'AT&T Ask AT&T gen AI platform orchestrated on AKS at enterprise scale.',
          href: 'https://www.microsoft.com/en/customers/story/25679-at-and-t-azure',
          logos: ['/logos/microsoft.svg'],
          qr: '/qr/att-aks-ai.png'
        }
      ]
    };
  },
  computed: {
    // clicks 0: why only. 1–5: reveal OpenAI → … → Microsoft.
    focusWhy() {
      return this.clicks === 0 && this.hovered === null;
    },
    activeIndex() {
      if (this.hovered !== null && this.isVisible(this.hovered)) return this.hovered;
      if (this.clicks >= 1 && this.clicks <= this.examples.length) return this.clicks - 1;
      return null;
    },
    progressLabel() {
      if (this.clicks === 0) return '00 / 05  ·  WHY K8S';
      const n = Math.min(this.clicks, this.examples.length);
      const name = this.examples[n - 1].name.toUpperCase();
      return `${String(n).padStart(2, '0')} / 05  ·  ${name}`;
    }
  },
  methods: {
    isVisible(i) {
      return this.clicks >= i + 1;
    }
  }
};
</script>

<style scoped>
.ai-k8s {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
}

.ai-grid {
  display: grid;
  grid-template-columns: 1fr 1.45fr;
  gap: 0.85rem;
  flex: 1;
  min-height: 0;
  height: 100%;
}

.ai-why {
  background: #fff;
  padding: 1.15rem 1.1rem;
  box-shadow: inset 4px 0 0 #0088B8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 0;
  height: 100%;
  box-sizing: border-box;
  transition: opacity 0.3s ease, filter 0.3s ease;
}

.ai-why.dim {
  opacity: 0.55;
  filter: grayscale(0.1);
}

.ai-why.focus {
  opacity: 1;
  filter: none;
}

.why-kicker,
.examples-kicker {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #94A3B8;
}

.ai-why ul {
  margin: 0.85rem 0 0;
  padding: 0;
  list-style-position: inside;
  font-family: 'Outfit', sans-serif;
  font-size: 1.22rem;
  color: #475569;
  line-height: 1.5;
  width: 100%;
}

.ai-why li + li {
  margin-top: 0.45rem;
}

.ai-why strong {
  color: #0F1C2A;
  font-weight: 800;
}

.why-callout {
  margin-top: 0.9rem;
  padding-top: 0.7rem;
  border-top: 2px solid #0088B8;
  width: 100%;
  font-family: 'Outfit', sans-serif;
  font-size: 1.02rem;
  font-weight: 700;
  color: #0F1C2A;
  line-height: 1.3;
}

.ai-examples {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-height: 0;
  height: 100%;
}

.examples-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  flex: 0 0 auto;
}

.examples-step {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0088B8;
  white-space: nowrap;
}

.examples-idle {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: inset 3px 0 0 #0088B8;
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #64748B;
  padding: 1rem;
  text-align: center;
}

.ex-card {
  background: #fff;
  padding: 0.4rem 0.65rem;
  text-decoration: none;
  color: inherit;
  box-shadow: inset 3px 0 0 #158A4E;
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 0.55rem;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
}

.ex-card.visible {
  display: flex;
  animation: ai-card-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0ms);
}

.ex-card.dim {
  opacity: 0.5;
  filter: grayscale(0.12);
}

.ex-card.active {
  opacity: 1;
  filter: none;
  box-shadow: inset 4px 0 0 #0088B8;
}

.ex-card.visible:hover {
  transform: translateY(-1px);
}

@keyframes ai-card-in {
  from {
    opacity: 0;
    transform: translateX(14px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.ex-body {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.15rem;
}

.ex-top {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.ex-num {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.68rem;
  font-weight: 800;
  color: #0088B8;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.ex-logos {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
}

.ex-logo {
  width: 1.25rem;
  height: 1.25rem;
  object-fit: contain;
}

.ex-name {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.02rem;
  color: #0F1C2A;
  line-height: 1.1;
}

.ex-text {
  font-family: 'Outfit', sans-serif;
  font-size: 0.82rem;
  color: #64748B;
  line-height: 1.25;
}

.ex-qr {
  width: 3.4rem;
  height: 3.4rem;
  flex-shrink: 0;
  image-rendering: pixelated;
}
</style>

<template>
  <div class="ai-k8s">
    <div class="ai-grid">
      <div class="ai-why">
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
        <div class="examples-kicker">Public stories — scan for the post / talk</div>
        <a
          v-for="ex in examples"
          :key="ex.name"
          class="ex-card"
          :href="ex.href"
          target="_blank"
          rel="noopener"
        >
          <div class="ex-body">
            <div class="ex-top">
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
  data() {
    return {
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
  gap: 0.45rem;
  min-height: 0;
  height: 100%;
}

.examples-kicker {
  flex: 0 0 auto;
}

.ex-card {
  background: #fff;
  padding: 0.45rem 0.7rem;
  text-decoration: none;
  color: inherit;
  box-shadow: inset 3px 0 0 #158A4E;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.55rem;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  transition: transform 0.2s ease;
}

.ex-card:hover {
  transform: translateY(-1px);
}

.ex-body {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
}

.ex-top {
  display: flex;
  align-items: center;
  gap: 0.4rem;
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
  font-size: 1.05rem;
  color: #0F1C2A;
  line-height: 1.1;
}

.ex-text {
  font-family: 'Outfit', sans-serif;
  font-size: 0.84rem;
  color: #64748B;
  line-height: 1.25;
}

.ex-qr {
  width: 3.6rem;
  height: 3.6rem;
  flex-shrink: 0;
  image-rendering: pixelated;
}
</style>

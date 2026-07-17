<template>
  <svg
    class="diagram diagram-lg sdlc"
    viewBox="0 0 960 410"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Traditional pets lifecycle versus cloud native cattle lifecycle"
  >
    <defs>
      <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#CF5A5A" />
      </marker>
      <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#158A4E" />
      </marker>
      <pattern id="sdlc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#sdlc-grid)" rx="4" />

    <text
      x="60"
      y="22"
      font-family="IBM Plex Mono, monospace"
      font-size="10"
      font-weight="700"
      fill="#0088B8"
      letter-spacing="0.08em"
    >{{ progressLabel }}</text>

    <text x="60" y="48" font-family="Outfit, sans-serif" fill="#CF5A5A" font-size="11.5" font-weight="900" letter-spacing="0.05em">
      TRADITIONAL LIFECYCLE · "PETS" (Unique, Named, Hand-Nurtured)
    </text>

    <!-- Traditional stages -->
    <g
      class="stage"
      :class="stageClass(0)"
      style="--delay: 0ms"
    >
      <rect x="60" y="65" width="175" height="75" rx="2" fill="#FFF8F8" stroke="#E8B4B4" stroke-width="1.2" />
      <text x="75" y="86" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5" fill="#CF5A5A">01 · Manual Build</text>
      <text x="75" y="104" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">Code compiled locally; zip</text>
      <text x="75" y="116" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">archives copied manually.</text>
      <rect x="200" y="75" width="22" height="22" rx="2" fill="#475569" />
      <path d="M 205 83 l 4 3 l -4 3 M 211 89 h 6" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" fill="none" />
    </g>

    <path class="flow-arrow" :class="{ visible: pairVisible(1) }" d="M 235 102 H 272" stroke="#CF5A5A" stroke-width="1.5" stroke-dasharray="3 3" fill="none" marker-end="url(#arrow-red)" />

    <g class="stage" :class="stageClass(1)" style="--delay: 50ms">
      <rect x="280" y="65" width="175" height="75" rx="2" fill="#FFF8F8" stroke="#E8B4B4" stroke-width="1.2" />
      <text x="295" y="86" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5" fill="#CF5A5A">02 · SSH / Script Deploy</text>
      <text x="295" y="104" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">Ad-hoc shell commands.</text>
      <text x="295" y="116" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">Leads to environment drift.</text>
      <rect x="420" y="75" width="22" height="22" rx="2" fill="#475569" />
      <path d="M 427 86 a 4 4 0 1 1 0 0.1 M 430 87 l 6 6 m -3 -3 l 3 -3 m -1 5 l 3 -3" stroke="#FFFFFF" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <path class="flow-arrow" :class="{ visible: pairVisible(2) }" d="M 455 102 H 492" stroke="#CF5A5A" stroke-width="1.5" stroke-dasharray="3 3" fill="none" marker-end="url(#arrow-red)" />

    <g class="stage" :class="stageClass(2)" style="--delay: 100ms">
      <rect x="500" y="65" width="175" height="75" rx="2" fill="#FFF8F8" stroke="#E8B4B4" stroke-width="1.2" />
      <text x="515" y="86" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5" fill="#CF5A5A">03 · Host OS Execution</text>
      <text x="515" y="104" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">App runs directly on host OS.</text>
      <text x="515" y="116" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">No sandbox resource limits.</text>
      <rect x="640" y="75" width="22" height="22" rx="2" fill="#475569" />
      <rect x="647" y="79" width="8" height="14" rx="1" stroke="#FFFFFF" stroke-width="1.2" fill="none" />
      <line x1="647" y1="83" x2="655" y2="83" stroke="#FFFFFF" stroke-width="1" />
      <line x1="647" y1="88" x2="655" y2="88" stroke="#FFFFFF" stroke-width="1" />
    </g>

    <path class="flow-arrow" :class="{ visible: pairVisible(3) }" d="M 675 102 H 712" stroke="#CF5A5A" stroke-width="1.5" stroke-dasharray="3 3" fill="none" marker-end="url(#arrow-red)" />

    <g class="stage" :class="stageClass(3)" style="--delay: 150ms">
      <rect x="720" y="65" width="175" height="75" rx="2" fill="#FFF8F8" stroke="#E8B4B4" stroke-width="1.2" />
      <text x="735" y="86" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5" fill="#CF5A5A">04 · Reactive Ops</text>
      <text x="735" y="104" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">Manual log tailing &amp; pings.</text>
      <text x="735" y="116" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">Outages require firefighting.</text>
      <rect x="860" y="75" width="22" height="22" rx="2" fill="#CF5A5A" />
      <path d="M 871 78 C 871 78 875 82 875 86 C 875 88.5 873.2 90.5 871 90.5 C 868.8 90.5 867 88.5 867 86 C 867 82 871 78 871 78 Z" fill="#FFFFFF" />
      <path d="M 871 82 C 871 82 873 84 873 86 C 873 87.3 872.1 88.3 871 88.3 C 869.9 88.3 869 87.3 869 86 C 869 84 871 82 871 82 Z" fill="#CF5A5A" />
    </g>

    <!-- VS -->
    <g class="vs">
      <line x1="60" y1="172" x2="900" y2="172" stroke="#E2E8F0" stroke-width="1.5" />
      <circle cx="480" cy="172" r="15" fill="#0F1C2A" stroke="#CBD5E1" stroke-width="1.5" :class="{ beat: !showBanner }" />
      <text x="480" y="176" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="9.5" fill="#FFFFFF">VS</text>
    </g>

    <text x="60" y="215" font-family="Outfit, sans-serif" fill="#158A4E" font-size="11.5" font-weight="900" letter-spacing="0.05em">
      CLOUD NATIVE LIFECYCLE · "CATTLE" (Disposable, Identical, Auto-Replaced)
    </text>

    <!-- Cloud native stages -->
    <g class="stage" :class="stageClass(0)" style="--delay: 40ms">
      <rect x="60" y="235" width="175" height="75" rx="2" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
      <text x="75" y="256" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5" fill="#158A4E">01 · Automated CI</text>
      <text x="75" y="274" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">Container images compiled in</text>
      <text x="75" y="286" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">CI pipelines; pushed to registry.</text>
      <image href="/logos/docker-mark.svg" x="200" y="245" width="22" height="22" />
    </g>

    <path class="flow-arrow" :class="{ visible: pairVisible(1) }" d="M 235 272 H 272" stroke="#158A4E" stroke-width="1.8" fill="none" marker-end="url(#arrow-green)" />

    <g class="stage" :class="stageClass(1)" style="--delay: 90ms">
      <rect x="280" y="235" width="175" height="75" rx="2" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
      <text x="295" y="256" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5" fill="#158A4E">02 · Declarative GitOps</text>
      <text x="295" y="274" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">Flux/ArgoCD matches cluster</text>
      <text x="295" y="286" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">state directly to Git commit.</text>
      <image href="/logos/cncf.svg" x="420" y="245" width="22" height="22" />
    </g>

    <path class="flow-arrow" :class="{ visible: pairVisible(2) }" d="M 455 272 H 492" stroke="#158A4E" stroke-width="1.8" fill="none" marker-end="url(#arrow-green)" />

    <g class="stage" :class="stageClass(2)" style="--delay: 140ms">
      <rect x="500" y="235" width="175" height="75" rx="2" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
      <text x="515" y="256" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5" fill="#158A4E">03 · Orchestrated Pods</text>
      <text x="515" y="274" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">Containers isolated in Pods</text>
      <text x="515" y="286" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">with CPU &amp; Memory bounds.</text>
      <image href="/logos/kubernetes.svg" x="640" y="245" width="22" height="22" />
    </g>

    <path class="flow-arrow" :class="{ visible: pairVisible(3) }" d="M 675 272 H 712" stroke="#158A4E" stroke-width="1.8" fill="none" marker-end="url(#arrow-green)" />

    <g class="stage" :class="stageClass(3)" style="--delay: 190ms">
      <rect x="720" y="235" width="175" height="75" rx="2" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
      <text x="735" y="256" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5" fill="#158A4E">04 · Self-Healing Ops</text>
      <text x="735" y="274" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">Probes check health; metrics</text>
      <text x="735" y="286" font-family="Outfit, sans-serif" font-size="8" fill="#64748B">trigger automated recovery.</text>
      <image href="/logos/prometheus.svg" x="860" y="245" width="22" height="22" />
    </g>

    <!-- Compare bridge on focused column -->
    <line
      v-if="focusPair !== null"
      :key="'bridge-' + focusPair"
      class="bridge-line"
      :x1="60 + focusPair * 220 + 87"
      y1="140"
      :x2="60 + focusPair * 220 + 87"
      y2="235"
      stroke="#0088B8"
      stroke-width="1.5"
      stroke-dasharray="4 4"
    />

    <g class="banner" :class="{ visible: showBanner }" transform="translate(60, 345)">
      <rect width="840" height="42" rx="2" fill="#FFFFFF" stroke="#158A4E" stroke-width="1.5" />
      <path d="M 0 0 h 4 v 42 H 0 Z" fill="#158A4E" />
      <text x="20" y="17" font-family="IBM Plex Mono, monospace" font-size="9" font-weight="700" fill="#158A4E" letter-spacing="0.08em">
        PETS VS CATTLE
      </text>
      <text x="20" y="33" font-family="Outfit, sans-serif" font-weight="700" font-size="11" fill="#0F1C2A">
        Legacy treats servers as unique pets. Cloud native treats them as identical, disposable cattle.
      </text>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SdlcComparison',
  props: {
    clicks: { type: Number, default: 0 }
  },
  computed: {
    showBanner() {
      return this.clicks >= 4;
    },
    focusPair() {
      if (this.clicks >= 4) return null;
      return Math.min(Math.max(this.clicks, 0), 3);
    },
    progressLabel() {
      if (this.clicks >= 4) return '05 / 05  ·  PETS VS CATTLE';
      return [
        '01 / 05  ·  BUILD',
        '02 / 05  ·  DEPLOY',
        '03 / 05  ·  RUN',
        '04 / 05  ·  OPERATE'
      ][this.focusPair];
    }
  },
  methods: {
    pairVisible(i) {
      return this.clicks >= i;
    },
    stageClass(i) {
      const visible = this.pairVisible(i);
      return {
        visible,
        focus: visible && this.focusPair === i,
        dim: visible && this.focusPair !== null && this.focusPair !== i
      };
    }
  }
};
</script>

<style scoped>
.sdlc .stage,
.sdlc .flow-arrow,
.sdlc .banner {
  opacity: 0;
  pointer-events: none;
}

.sdlc .stage {
  transform: translateY(12px);
  transition:
    opacity 0.35s ease,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.3s ease;
  transition-delay: var(--delay, 0ms);
}

.sdlc .stage.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.sdlc .stage.dim {
  opacity: 0.36;
  filter: grayscale(0.25);
}

.sdlc .stage.focus {
  opacity: 1;
  filter: none;
  animation: sdlc-focus 0.55s ease;
}

@keyframes sdlc-focus {
  0% { transform: translateY(0) scale(1); }
  45% { transform: translateY(0) scale(1.035); }
  100% { transform: translateY(0) scale(1); }
}

.sdlc .flow-arrow {
  transition: opacity 0.35s ease;
}

.sdlc .flow-arrow.visible {
  opacity: 1;
}

.sdlc .banner {
  transform: translateY(12px);
  transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.sdlc .banner.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.sdlc circle.beat {
  transform-box: fill-box;
  transform-origin: center;
  animation: vs-beat 1.15s ease infinite;
}

@keyframes vs-beat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.sdlc .bridge-line {
  animation: bridge-draw 0.4s ease both;
}

@keyframes bridge-draw {
  from {
    opacity: 0;
    stroke-dashoffset: 36;
  }
  to {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}
</style>

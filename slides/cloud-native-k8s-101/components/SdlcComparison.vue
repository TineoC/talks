<template>
  <div class="sdlc" :data-step="clicks" role="img" :aria-label="ariaLabel">
    <header class="sdlc-progress">
      <span class="progress-label">{{ progressLabel }}</span>
      <div class="progress-dots" aria-hidden="true">
        <span
          v-for="n in 5"
          :key="n"
          class="dot"
          :class="{ on: clicks >= n - 1, now: currentDot === n - 1 }"
        />
      </div>
    </header>

    <!-- Traditional · Pets -->
    <section class="pipeline pets">
      <div class="pipeline-label">
        <span class="tone">Traditional</span>
        <strong>“Pets”</strong>
        <em>unique · named · hand-nurtured</em>
      </div>
      <div class="stages">
        <article
          v-for="(stage, i) in traditional"
          :key="stage.id"
          class="stage"
          :class="stageClass(i)"
          :style="{ '--delay': `${i * 40}ms` }"
        >
          <div class="stage-top">
            <span class="stage-num">{{ stage.num }}</span>
            <span class="stage-icon" aria-hidden="true">{{ stage.icon }}</span>
          </div>
          <h3 class="stage-title">{{ stage.title }}</h3>
          <p class="stage-desc">{{ stage.desc }}</p>
        </article>
      </div>
    </section>

    <div class="vs-bar" aria-hidden="true">
      <span class="vs-line" />
      <span class="vs-badge" :class="{ beat: !showBanner }">VS</span>
      <span class="vs-line" />
    </div>

    <!-- Cloud Native · Cattle -->
    <section class="pipeline cattle">
      <div class="pipeline-label">
        <span class="tone">Cloud Native</span>
        <strong>“Cattle”</strong>
        <em>disposable · identical · auto-replaced</em>
      </div>
      <div class="stages">
        <article
          v-for="(stage, i) in cloudNative"
          :key="stage.id"
          class="stage"
          :class="stageClass(i)"
          :style="{ '--delay': `${i * 40 + 50}ms` }"
        >
          <div class="stage-top">
            <span class="stage-num">{{ stage.num }}</span>
            <img
              class="stage-logo"
              :src="logoUrl(stage.logo)"
              :alt="stage.title"
              width="36"
              height="36"
              loading="eager"
              decoding="async"
            />
          </div>
          <h3 class="stage-title">{{ stage.title }}</h3>
          <p class="stage-desc">{{ stage.desc }}</p>
        </article>
      </div>
    </section>

    <footer class="sdlc-banner" :class="{ visible: showBanner }">
      <span class="banner-kicker">Pets vs Cattle</span>
      <p class="banner-copy">
        Legacy treats servers as unique pets. Cloud native treats them as identical, disposable cattle.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'SdlcComparison',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return {
      traditional: [
        {
          id: 't1',
          num: '01',
          title: 'Manual Build',
          desc: 'Compile locally; copy zip archives by hand.',
          icon: '⌘'
        },
        {
          id: 't2',
          num: '02',
          title: 'SSH Deploy',
          desc: 'Ad-hoc scripts. Environments drift apart.',
          icon: '⚿'
        },
        {
          id: 't3',
          num: '03',
          title: 'Host OS Run',
          desc: 'App on the bare host — no sandbox limits.',
          icon: '▣'
        },
        {
          id: 't4',
          num: '04',
          title: 'Reactive Ops',
          desc: 'Tail logs and page humans when it burns.',
          icon: '⚠'
        }
      ],
      cloudNative: [
        {
          id: 'c1',
          num: '01',
          title: 'Automated CI',
          desc: 'Images built in pipeline; pushed to a registry.',
          logo: 'logos/docker-mark.svg'
        },
        {
          id: 'c2',
          num: '02',
          title: 'Declarative GitOps',
          desc: 'Flux/ArgoCD keeps the cluster equal to Git.',
          logo: 'logos/cncf.svg'
        },
        {
          id: 'c3',
          num: '03',
          title: 'Orchestrated Pods',
          desc: 'Isolated containers with CPU & memory bounds.',
          logo: 'logos/kubernetes.svg'
        },
        {
          id: 'c4',
          num: '04',
          title: 'Self-Healing Ops',
          desc: 'Probes + metrics trigger automated recovery.',
          logo: 'logos/prometheus.svg'
        }
      ]
    };
  },
  computed: {
    showBanner() {
      return this.clicks >= 4;
    },
    focusPair() {
      if (this.clicks >= 4) return null;
      return Math.min(Math.max(this.clicks, 0), 3);
    },
    currentDot() {
      return Math.min(this.clicks, 4);
    },
    progressLabel() {
      if (this.clicks >= 4) return '05 / 05  ·  PETS VS CATTLE';
      return [
        '01 / 05  ·  BUILD',
        '02 / 05  ·  DEPLOY',
        '03 / 05  ·  RUN',
        '04 / 05  ·  OPERATE'
      ][this.focusPair];
    },
    ariaLabel() {
      return `Traditional versus cloud native lifecycle, step ${Math.min(this.clicks + 1, 5)} of 5`;
    }
  },
  methods: {
    logoUrl(path) {
      const base = import.meta.env.BASE_URL || '/';
      return `${base}${path.replace(/^\//, '')}`;
    },
    stageClass(i) {
      const focus = this.focusPair === i;
      return {
        focus,
        dim: this.focusPair !== null && !focus,
        lit: this.focusPair === null || focus
      };
    }
  }
};
</script>

<style scoped>
.sdlc {
  --ink: #0F1C2A;
  --muted: #5A6A7A;
  --line: #D5DEE7;
  --paper: #FFFFFF;
  --pets: #CF5A5A;
  --cattle: #158A4E;
  --cyan: #0088B8;

  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  padding: 0;
}

.sdlc-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-shrink: 0;
  margin-bottom: 0.1rem;
}

.progress-label {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--cyan);
}

.progress-dots {
  display: flex;
  gap: 0.35rem;
}

.progress-dots .dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #CBD5E1;
  transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.progress-dots .dot.on {
  background: color-mix(in srgb, var(--cyan) 55%, #CBD5E1);
}

.progress-dots .dot.now {
  background: var(--cyan);
  transform: scale(1.2);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--cyan) 22%, transparent);
}

.pipeline {
  display: grid;
  grid-template-columns: 9.25rem 1fr;
  gap: 0.55rem;
  align-items: stretch;
  min-height: 0;
  flex: 1 1 0;
}

.pipeline-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.65rem 0.6rem;
  background: var(--paper);
  box-shadow: inset 4px 0 0 var(--pets);
  min-width: 0;
}

.pipeline.cattle .pipeline-label {
  box-shadow: inset 4px 0 0 var(--cattle);
}

.pipeline-label .tone {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pets);
}

.pipeline.cattle .pipeline-label .tone {
  color: var(--cattle);
}

.pipeline-label strong {
  font-family: 'Outfit', sans-serif;
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1.05;
}

.pipeline-label em {
  font-family: 'Outfit', sans-serif;
  font-style: normal;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--muted);
  line-height: 1.25;
}

.stages {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
  min-width: 0;
  min-height: 0;
  height: 100%;
}

.stage {
  --accent: var(--pets);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  min-width: 0;
  min-height: 0;
  height: 100%;
  padding: 0.7rem 0.65rem 0.65rem;
  background: var(--paper);
  border: 1.5px solid var(--line);
  box-shadow: inset 4px 0 0 #E8B4B4;
  transition:
    opacity 0.3s ease,
    filter 0.3s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  animation: stage-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0ms);
}

.pipeline.cattle .stage {
  --accent: var(--cattle);
  box-shadow: inset 4px 0 0 #A8D5BE;
  background: #F4FBF7;
}

.stage.dim {
  opacity: 0.38;
  filter: grayscale(0.2);
}

.stage.focus {
  opacity: 1;
  filter: none;
  border-color: var(--accent);
  box-shadow: inset 4px 0 0 var(--accent);
  transform: translateY(-2px);
  animation: stage-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both, stage-focus 0.5s ease;
  animation-delay: 0ms, 0ms;
}

.stage.lit:not(.dim):not(.focus) {
  opacity: 1;
  filter: none;
}

@keyframes stage-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stage-focus {
  0% { transform: translateY(0); }
  40% { transform: translateY(-3px) scale(1.02); }
  100% { transform: translateY(-2px) scale(1); }
}

.stage-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  flex-shrink: 0;
}

.stage-num {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--accent);
}

.stage-icon {
  font-size: 1.35rem;
  line-height: 1;
  color: var(--accent);
  opacity: 0.9;
}

.stage-logo {
  width: 2.15rem;
  height: 2.15rem;
  flex-shrink: 0;
  object-fit: contain;
  display: block;
}

.stage-title {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 1.18rem !important;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.stage-desc {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--muted);
  line-height: 1.3;
}

.vs-bar {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-shrink: 0;
  padding: 0;
}

.vs-line {
  flex: 1;
  height: 1.5px;
  background: var(--line);
}

.vs-badge {
  flex-shrink: 0;
  width: 2.35rem;
  height: 2.35rem;
  display: grid;
  place-items: center;
  background: var(--ink);
  color: #fff;
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.04em;
}

.vs-badge.beat {
  animation: vs-beat 1.15s ease infinite;
}

@keyframes vs-beat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

.sdlc-banner {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  background: var(--paper);
  border: 1.5px solid color-mix(in srgb, var(--cattle) 40%, var(--line));
  box-shadow: inset 4px 0 0 var(--cattle);
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

.sdlc-banner.visible {
  opacity: 1;
  transform: translateY(0);
  max-height: 5rem;
  padding: 0.55rem 0.85rem 0.55rem 0.95rem;
  border-width: 1.5px;
  pointer-events: auto;
}

.banner-kicker {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--cattle);
}

.banner-copy {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
}
</style>

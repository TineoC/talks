<template>
  <div class="agenda" :data-step="clicks">
    <header class="agenda-progress">
      <span class="progress-label">{{ progressLabel }}</span>
      <div class="progress-dots" aria-hidden="true">
        <span
          v-for="n in items.length"
          :key="n"
          class="dot"
          :class="{ on: clicks >= n - 1, now: activeIndex === n - 1 }"
        />
      </div>
    </header>

    <div class="agenda-list">
      <div
        v-for="(item, i) in items"
        :key="item.num"
        class="agenda-step"
        :class="{
          active: activeIndex === i,
          dim: activeIndex !== i,
          done: clicks > i
        }"
        :style="{ '--delay': `${i * 40}ms`, '--accent': item.color }"
      >
        <span class="agenda-rail" aria-hidden="true">
          <span class="agenda-dot"></span>
          <span v-if="i < items.length - 1" class="agenda-line"></span>
        </span>

        <span class="agenda-num">{{ item.num }}</span>

        <span class="agenda-body">
          <span class="agenda-title">{{ item.title }}</span>
          <span class="agenda-desc">{{ item.desc }}</span>
          <span class="agenda-topics">{{ item.topics }}</span>
        </span>

        <span class="agenda-tag">{{ item.tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgendaWalkthrough',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return {
      items: [
        {
          num: '01',
          title: 'Why cloud native',
          desc: 'Laptop success is not production readiness',
          topics: '“Works on my laptop” friction · distributed apps',
          tag: 'problem',
          color: '#CF5A5A'
        },
        {
          num: '02',
          title: 'Containers',
          desc: 'Package once — run the same way everywhere',
          topics: 'VMs vs containers · Borg & cgroups · shipping analogy · namespaces · Docker · Dockerfile · Compose · packaging ladder',
          tag: 'Act 01',
          color: '#0088B8'
        },
        {
          num: '03',
          title: 'Kubernetes',
          desc: 'The control plane that keeps desired state true',
          topics: 'CNCF adoption · AI workloads · control / data plane · why teams use it · traditional vs cloud native',
          tag: 'Act 02',
          color: '#158A4E'
        },
        {
          num: '04',
          title: 'Core objects',
          desc: 'Building blocks every Kubernetes app uses',
          topics: 'Pods · Deployments · probes · Services · service types · Gateway API · ConfigMaps · Secrets · ownership',
          tag: 'Act 03',
          color: '#E2A03F'
        },
        {
          num: '05',
          title: 'Hands-on & keep going',
          desc: 'Practice the lab, then level up',
          topics: 'Certifications · courses & platforms · CNCF community · Killercoda lab',
          tag: 'wrap',
          color: '#0F1C2A'
        }
      ]
    };
  },
  computed: {
    // clicks 0..4 → boxes 01..05 (including Hands-on)
    activeIndex() {
      return Math.min(Math.max(Number(this.clicks) || 0, 0), this.items.length - 1);
    },
    progressLabel() {
      const item = this.items[this.activeIndex];
      return `${item.num} / 05  ·  ${item.title.toUpperCase()}`;
    }
  }
};
</script>

<style scoped>
.agenda {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
}

.agenda-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-shrink: 0;
}

.progress-label {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #0088B8;
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
  background: color-mix(in srgb, #0088B8 55%, #CBD5E1);
}

.progress-dots .dot.now {
  background: #0088B8;
  transform: scale(1.2);
  box-shadow: 0 0 0 3px color-mix(in srgb, #0088B8 22%, transparent);
}

.agenda-list {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  justify-content: center;
}

.agenda-step {
  --accent: #0088B8;
  position: relative;
  display: grid;
  grid-template-columns: 1.1rem 2.6rem 1fr auto;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0.65rem 1rem 0.65rem 0.55rem;
  border: 1.5px solid #E2E8F0;
  background: #fff;
  text-align: left;
  font: inherit;
  color: inherit;
  box-shadow: inset 0 0 0 transparent;
  animation: agenda-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0ms);
  transition:
    opacity 0.3s ease,
    filter 0.3s ease,
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.agenda-step.dim {
  opacity: 0.4;
  filter: grayscale(0.12);
}

.agenda-step.active {
  opacity: 1;
  filter: none;
  border-color: color-mix(in srgb, var(--accent) 45%, #E2E8F0);
  background: #fff;
  box-shadow: inset 4px 0 0 var(--accent);
  transform: translateY(-1px);
  animation: agenda-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both, agenda-pulse 0.55s ease;
  animation-delay: 0ms, 0ms;
}

.agenda-step.done:not(.active) .agenda-dot {
  background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
}

.agenda-step.done:not(.active) .agenda-line {
  background: color-mix(in srgb, var(--accent) 55%, #E2E8F0);
}

@keyframes agenda-in {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes agenda-pulse {
  0% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-1px) scale(1.01); }
  100% { transform: translateY(-1px) scale(1); }
}

.agenda-rail {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  padding-top: 0.35rem;
}

.agenda-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #CBD5E1;
  flex-shrink: 0;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.agenda-step.active .agenda-dot {
  background: var(--accent);
  transform: scale(1.25);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent);
  animation: dot-ping 1.2s ease infinite;
}

@keyframes dot-ping {
  0%,
  100% {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent);
  }
  50% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 8%, transparent);
  }
}

.agenda-line {
  flex: 1;
  width: 2px;
  margin-top: 0.35rem;
  background: #E2E8F0;
  border-radius: 1px;
  min-height: 0.75rem;
  transition: background 0.35s ease;
}

.agenda-num {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--accent);
  transition: transform 0.3s ease;
}

.agenda-step.active .agenda-num {
  transform: scale(1.08);
}

.agenda-body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.agenda-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  color: #0F1C2A;
  line-height: 1.2;
}

.agenda-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 0.86rem;
  color: #475569;
  line-height: 1.3;
}

.agenda-topics {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.64rem;
  color: #64748B;
  letter-spacing: 0.01em;
  line-height: 1.35;
  margin-top: 0.1rem;
}

.agenda-tag {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748B;
  border: 1px solid #E2E8F0;
  padding: 0.28rem 0.45rem;
  white-space: nowrap;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.agenda-step.active .agenda-tag {
  color: #fff;
  background: var(--accent);
  border-color: var(--accent);
}
</style>

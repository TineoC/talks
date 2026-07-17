<template>
  <div class="agenda">
    <button
      v-for="(item, i) in items"
      :key="item.num"
      type="button"
      class="agenda-step"
      :class="{
        visible: clicks >= i,
        active: clicks === i,
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
    </button>
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
  }
};
</script>

<style scoped>
.agenda {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
  max-width: none;
  margin: 0;
  flex: 1;
  min-height: 0;
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
  padding: 0.7rem 1rem 0.7rem 0.55rem;
  border: 1px solid #E2E8F0;
  background: #fff;
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: default;
  opacity: 0;
  transform: translateX(-18px);
  box-shadow: inset 0 0 0 transparent;
  transition:
    opacity 0.35s ease,
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
  transition-delay: var(--delay, 0ms);
}

.agenda-step.visible {
  opacity: 1;
  transform: translateX(0);
}

.agenda-step.active {
  border-color: color-mix(in srgb, var(--accent) 45%, #E2E8F0);
  background: #fff;
  box-shadow: inset 4px 0 0 var(--accent);
  animation: agenda-pulse 1.1s ease;
}

.agenda-step.done {
  border-color: #E2E8F0;
  background: #F8FAFC;
}

.agenda-step.done .agenda-title {
  color: #334155;
}

.agenda-step.done .agenda-dot {
  background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
}

.agenda-step.done .agenda-line {
  background: color-mix(in srgb, var(--accent) 55%, #E2E8F0);
}

@keyframes agenda-pulse {
  0% {
    transform: translateX(0) scale(1);
  }
  40% {
    transform: translateX(0) scale(1.012);
  }
  100% {
    transform: translateX(0) scale(1);
  }
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
  gap: 0.12rem;
  min-width: 0;
}

.agenda-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.12rem;
  font-weight: 800;
  color: #0F1C2A;
  line-height: 1.2;
}

.agenda-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  color: #475569;
  line-height: 1.3;
}

.agenda-topics {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.64rem;
  color: #64748B;
  letter-spacing: 0.01em;
  line-height: 1.4;
  margin-top: 0.12rem;
  max-width: 58rem;
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

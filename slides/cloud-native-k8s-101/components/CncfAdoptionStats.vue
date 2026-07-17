<template>
  <div class="stats">
    <div class="stats-grid">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="stat-card"
        :class="[{ active: activeIndex === i, inactive: activeIndex !== null && activeIndex !== i }, stat.tone]"
        @mouseenter="hovered = i"
        @mouseleave="hovered = null"
      >
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-detail">{{ stat.detail }}</div>
      </div>
    </div>
    <div class="stats-source">Source: CNCF Annual Cloud Native Survey 2025 · “The infrastructure of AI’s future”</div>
  </div>
</template>

<script>
export default {
  name: 'CncfAdoptionStats',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return {
      hovered: null,
      stats: [
        {
          value: '98%',
          label: 'Cloud native adopted',
          detail: 'of global organizations have adopted cloud-native technologies',
          tone: 'cyan'
        },
        {
          value: '82%',
          label: 'Kubernetes in production',
          detail: 'of container users run Kubernetes in production (up from 66% in 2023)',
          tone: 'green'
        },
        {
          value: '66%',
          label: 'GenAI on Kubernetes',
          detail: 'of orgs hosting generative AI use Kubernetes to deploy, scale, and operate it',
          tone: 'amber'
        }
      ]
    };
  },
  computed: {
    activeIndex() {
      if (this.hovered !== null) return this.hovered;
      if (this.clicks >= 1 && this.clicks <= 3) return this.clicks - 1;
      return null;
    }
  }
};
</script>

<style scoped>
.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 0;
  gap: 0.85rem;
  box-sizing: border-box;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  flex: 1;
  min-height: 0;
  align-content: center;
}

.stat-card {
  background: #fff;
  padding: 1.5rem 1.35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: inset 4px 0 0 #0088B8;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
}

.stat-card.cyan { box-shadow: inset 4px 0 0 #0088B8; }
.stat-card.green { box-shadow: inset 4px 0 0 #158A4E; }
.stat-card.amber { box-shadow: inset 4px 0 0 #E2A03F; }

.stat-card.active {
  transform: scale(1.02);
  box-shadow: inset 4px 0 0 #0088B8, 0 8px 24px rgba(0, 0, 0, 0.08);
}

.stat-card.green.active { box-shadow: inset 4px 0 0 #158A4E, 0 8px 24px rgba(0, 0, 0, 0.08); }
.stat-card.amber.active { box-shadow: inset 4px 0 0 #E2A03F, 0 8px 24px rgba(0, 0, 0, 0.08); }

.stat-card.inactive {
  opacity: 0.4;
  filter: grayscale(0.4);
}

.stat-value {
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 4.5rem;
  line-height: 0.95;
  color: #0F1C2A;
  letter-spacing: -0.04em;
}

.stat-card.cyan .stat-value { color: #0088B8; }
.stat-card.green .stat-value { color: #158A4E; }
.stat-card.amber .stat-value { color: #E2A03F; }

.stat-label {
  margin-top: 0.9rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.4rem;
  color: #0F1C2A;
  line-height: 1.15;
}

.stat-detail {
  margin-top: 0.55rem;
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  color: #64748B;
  line-height: 1.35;
  max-width: 18rem;
}

.stats-source {
  flex: 0 0 auto;
  width: 100%;
  text-align: center;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  color: #94A3B8;
  padding-top: 0.35rem;
  border-top: 1px solid #E2E8F0;
}
</style>

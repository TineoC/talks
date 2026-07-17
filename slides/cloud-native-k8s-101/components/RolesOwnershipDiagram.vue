<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="role-platform" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0088B8" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#0088B8" stop-opacity="0.02" />
      </linearGradient>
      <linearGradient id="role-app" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#158A4E" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#158A4E" stop-opacity="0.02" />
      </linearGradient>
      <linearGradient id="role-shared" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#E2A03F" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#E2A03F" stop-opacity="0.02" />
      </linearGradient>
      <pattern id="roles-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#roles-grid)" rx="8" />

    <!-- PLATFORM -->
    <g
      :class="['role-col', { active: activeSection === 'platform', inactive: activeSection && activeSection !== 'platform' }]"
      @mouseenter="hoveredSection = 'platform'"
      @mouseleave="hoveredSection = null"
    >
      <rect x="20" y="18" width="300" height="318" rx="10" fill="url(#role-platform)" stroke="#0088B8" :stroke-width="activeSection === 'platform' ? 2.5 : 1.5" />
      <text x="170" y="48" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="15px" fill="#0088B8">Platform / SRE</text>
      <text x="170" y="68" text-anchor="middle" font-family="Outfit, sans-serif" font-size="10px" fill="#64748B">Cluster entry, shared infra</text>

      <g v-for="(item, i) in platformItems" :key="item.name" :transform="`translate(40, ${88 + i * 46})`">
        <rect width="260" height="38" rx="6" fill="#FFFFFF" stroke="#A8D0E0" stroke-width="1" />
        <text x="14" y="16" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="11px" fill="#0088B8">{{ item.name }}</text>
        <text x="14" y="30" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">{{ item.note }}</text>
      </g>
    </g>

    <!-- APPLICATION -->
    <g
      :class="['role-col', { active: activeSection === 'app', inactive: activeSection && activeSection !== 'app' }]"
      @mouseenter="hoveredSection = 'app'"
      @mouseleave="hoveredSection = null"
    >
      <rect x="330" y="18" width="300" height="318" rx="10" fill="url(#role-app)" stroke="#158A4E" :stroke-width="activeSection === 'app' ? 2.5 : 1.5" />
      <text x="480" y="48" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="15px" fill="#158A4E">Application</text>
      <text x="480" y="68" text-anchor="middle" font-family="Outfit, sans-serif" font-size="10px" fill="#64748B">Workload + how it is reached</text>

      <g v-for="(item, i) in appItems" :key="item.name" :transform="`translate(350, ${88 + i * 38})`">
        <rect width="260" height="32" rx="6" fill="#FFFFFF" stroke="#A8D5BE" stroke-width="1" />
        <text x="14" y="13" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="10.5px" fill="#158A4E">{{ item.name }}</text>
        <text x="14" y="26" font-family="Outfit, sans-serif" font-size="8.5px" fill="#64748B">{{ item.note }}</text>
      </g>
    </g>

    <!-- SHARED -->
    <g
      :class="['role-col', { active: activeSection === 'shared', inactive: activeSection && activeSection !== 'shared' }]"
      @mouseenter="hoveredSection = 'shared'"
      @mouseleave="hoveredSection = null"
    >
      <rect x="640" y="18" width="300" height="318" rx="10" fill="url(#role-shared)" stroke="#E2A03F" :stroke-width="activeSection === 'shared' ? 2.5 : 1.5" />
      <text x="790" y="48" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="15px" fill="#E2A03F">Shared care</text>
      <text x="790" y="68" text-anchor="middle" font-family="Outfit, sans-serif" font-size="10px" fill="#64748B">App creates · platform protects</text>

      <g v-for="(item, i) in sharedItems" :key="item.name" :transform="`translate(660, ${88 + i * 52})`">
        <rect width="260" height="44" rx="6" fill="#FFFFFF" stroke="#FEEED8" stroke-width="1" />
        <text x="14" y="17" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="11px" fill="#E2A03F">{{ item.name }}</text>
        <text x="14" y="33" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">{{ item.note }}</text>
      </g>
    </g>

    <!-- Banner -->
    <g transform="translate(20, 348)">
      <rect width="920" height="36" rx="6" :fill="banner.bg" :stroke="banner.stroke" stroke-width="1" />
      <path d="M 0 0 h 4 v 36 H 0 Z" :fill="banner.accent" />
      <text x="20" y="23" font-family="Outfit, sans-serif" font-weight="700" font-size="12px" :fill="banner.accent">{{ banner.text }}</text>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'RolesOwnershipDiagram',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return {
      hoveredSection: null,
      platformItems: [
        { name: 'GatewayClass', note: 'Which controller implements ingress' },
        { name: 'Gateway', note: 'Listeners, TLS, shared front door' },
        { name: 'LoadBalancer Service', note: 'Cloud / infra provisions the LB' },
        { name: 'Cluster policies', note: 'RBAC, NetworkPolicy, quotas' },
        { name: 'etcd encryption', note: 'Protect Secrets at rest' }
      ],
      appItems: [
        { name: 'Deployment + Pods', note: 'Desired replicas and containers' },
        { name: 'Probes', note: 'Startup / liveness / readiness' },
        { name: 'Service (ClusterIP / NodePort)', note: 'Stable in-cluster (or node) address' },
        { name: 'HTTPRoute', note: 'Host + path → your Service' },
        { name: 'ConfigMap', note: 'Non-secret config for the app' },
        { name: 'Secret (data)', note: 'Credentials the app needs' }
      ],
      sharedItems: [
        { name: 'Secrets', note: 'App owns values · platform owns access & encryption' },
        { name: 'Gateway + HTTPRoute', note: 'Platform door · app attaches routes' },
        { name: 'LoadBalancer', note: 'App requests type · provider runs it' },
        { name: 'Namespaces / RBAC', note: 'Boundaries both teams respect' }
      ]
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      if (this.clicks === 1) return 'platform';
      if (this.clicks === 2) return 'app';
      if (this.clicks === 3) return 'shared';
      return null;
    },
    banner() {
      const map = {
        platform: {
          text: 'Platform owns the front door and guardrails — Gateway, LoadBalancer plumbing, RBAC, encryption.',
          accent: '#0088B8',
          bg: 'rgba(0,136,184,0.08)',
          stroke: 'rgba(0,136,184,0.2)'
        },
        app: {
          text: 'App teams own the workload and how traffic reaches it — Deployments, probes, Routes, ConfigMaps.',
          accent: '#158A4E',
          bg: 'rgba(21,138,78,0.08)',
          stroke: 'rgba(21,138,78,0.2)'
        },
        shared: {
          text: 'Some objects are shared care: app creates them; platform makes them safe to run in production.',
          accent: '#E2A03F',
          bg: 'rgba(226,160,63,0.08)',
          stroke: 'rgba(226,160,63,0.2)'
        }
      };
      if (this.activeSection && map[this.activeSection]) return map[this.activeSection];
      return {
        text: 'Step through roles: Platform · Application · Shared care — who owns each object you just learned.',
        accent: '#0088B8',
        bg: 'rgba(0,136,184,0.08)',
        stroke: 'rgba(0,136,184,0.2)'
      };
    }
  }
};
</script>

<style scoped>
.role-col {
  transition: opacity 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}
.role-col.active {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
}
.role-col.inactive {
  opacity: 0.35;
  filter: grayscale(0.45);
}
</style>

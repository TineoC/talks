<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="clusterip-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0088B8" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#0088B8" stop-opacity="0.01" />
      </linearGradient>
      <linearGradient id="nodeport-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#E2A03F" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#E2A03F" stop-opacity="0.01" />
      </linearGradient>
      <linearGradient id="lb-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#158A4E" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#158A4E" stop-opacity="0.01" />
      </linearGradient>

      <pattern id="types-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
      <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#0088B8" />
      </marker>
      <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#E2A03F" />
      </marker>
      <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#158A4E" />
      </marker>
    </defs>

    <rect width="100%" height="100%" fill="url(#types-grid)" rx="8" />

    <!-- ==================== COLUMN 1: ClusterIP ==================== -->
    <g
      :class="['type-col', { active: activeSection === 'clusterip', inactive: activeSection && activeSection !== 'clusterip' }]"
      @mouseenter="hoveredSection = 'clusterip'"
      @mouseleave="hoveredSection = null"
    >
      <rect
        x="20" y="20" width="290" height="320" rx="12"
        fill="url(#clusterip-panel)"
        stroke="#0088B8"
        :stroke-width="activeSection === 'clusterip' ? 2.5 : 1.5"
      />
      <text x="165" y="45" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="13px" fill="#0088B8">01 · ClusterIP (Default)</text>

      <g transform="translate(45, 65)">
        <rect x="10" y="10" width="70" height="30" rx="4" fill="#FFFFFF" stroke="#0088B8" stroke-width="1" />
        <text x="45" y="28" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9px" fill="#0088B8">Pod A</text>

        <rect x="110" y="10" width="100" height="30" rx="4" fill="#E8F4FA" stroke="#0088B8" stroke-width="1.2" />
        <text x="160" y="28" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#0088B8">svc/ClusterIP</text>

        <rect x="125" y="70" width="70" height="30" rx="4" fill="#FFFFFF" stroke="#0088B8" stroke-width="1" />
        <text x="160" y="88" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9px" fill="#0088B8">Pod B</text>

        <path d="M 80 25 H 104" fill="none" stroke="#0088B8" stroke-width="1.2" marker-end="url(#arrow-blue)" />
        <path d="M 160 40 V 64" fill="none" stroke="#0088B8" stroke-width="1.2" marker-end="url(#arrow-blue)" />

        <rect x="0" y="112" width="240" height="24" rx="4" fill="#E8F4FA" stroke="#A8D0E0" stroke-width="0.5" />
        <text x="120" y="127" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="8.5px" fill="#0088B8">🔒 Access Scope: Inside Cluster Only</text>
      </g>

      <g transform="translate(35, 218)" font-family="Outfit, sans-serif" font-size="9.5px" fill="#475569">
        <circle cx="5" cy="5" r="2.5" fill="#0088B8" />
        <text x="15" y="8">Restricts traffic to cluster-internal network</text>

        <circle cx="5" cy="21" r="2.5" fill="#0088B8" />
        <text x="15" y="24">Standard for backend APIs, databases, caches</text>

        <rect x="0" y="36" width="260" height="20" rx="4" fill="rgba(0,136,184,0.08)" />
        <text x="130" y="49" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="8.5px" fill="#0088B8">USE CASE: SECURE INTERNAL MICROSERVICES</text>
      </g>

      <g transform="translate(35, 286)">
        <rect width="260" height="44" rx="4" fill="#0F1C2A" stroke="#1E293B" stroke-width="1" />
        <text x="10" y="18" font-family="IBM Plex Mono, monospace" font-size="8.5px" fill="#A6E22E">$ curl http://auth-service</text>
        <text x="10" y="32" font-family="Outfit, sans-serif" font-size="7.5px" fill="#94A3B8">└─ CoreDNS resolves name automatically</text>
      </g>
    </g>

    <!-- ==================== COLUMN 2: NodePort ==================== -->
    <g
      :class="['type-col', { active: activeSection === 'nodeport', inactive: activeSection && activeSection !== 'nodeport' }]"
      @mouseenter="hoveredSection = 'nodeport'"
      @mouseleave="hoveredSection = null"
    >
      <rect
        x="335" y="20" width="290" height="320" rx="12"
        fill="url(#nodeport-panel)"
        stroke="#E2A03F"
        :stroke-width="activeSection === 'nodeport' ? 2.5 : 1.5"
      />
      <text x="480" y="45" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="13px" fill="#E2A03F">02 · NodePort</text>

      <g transform="translate(360, 65)">
        <rect x="10" y="10" width="70" height="30" rx="4" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1" />
        <text x="45" y="28" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9px" fill="#475569">Client (Ext)</text>

        <rect x="110" y="10" width="110" height="30" rx="4" fill="#FFFBF5" stroke="#E2A03F" stroke-width="1.2" />
        <text x="165" y="28" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#E2A03F">NodeIP:30080</text>

        <rect x="125" y="70" width="80" height="30" rx="4" fill="#FFFFFF" stroke="#0088B8" stroke-width="1" />
        <text x="165" y="88" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9px" fill="#0088B8">Backend Pod</text>

        <path d="M 80 25 H 104" fill="none" stroke="#E2A03F" stroke-width="1.2" marker-end="url(#arrow-amber)" />
        <path d="M 165 40 V 64" fill="none" stroke="#E2A03F" stroke-width="1.2" marker-end="url(#arrow-amber)" />

        <rect x="0" y="112" width="240" height="24" rx="4" fill="#FFFBF5" stroke="#FEEED8" stroke-width="0.5" />
        <text x="120" y="127" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="8.5px" fill="#E2A03F">🔓 Port Range: 30000 - 32767</text>
      </g>

      <g transform="translate(350, 218)" font-family="Outfit, sans-serif" font-size="9.5px" fill="#475569">
        <circle cx="5" cy="5" r="2.5" fill="#E2A03F" />
        <text x="15" y="8">Exposes the service on each node's physical IP</text>

        <circle cx="5" cy="21" r="2.5" fill="#E2A03F" />
        <text x="15" y="24">Client connects directly to [NodeIP]:[Port]</text>

        <rect x="0" y="36" width="260" height="20" rx="4" fill="rgba(226,160,63,0.08)" />
        <text x="130" y="49" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="8.5px" fill="#E2A03F">USE CASE: DEVELOPMENT OR LOCAL PORTS</text>
      </g>

      <g transform="translate(350, 286)">
        <rect width="260" height="44" rx="4" fill="#0F1C2A" stroke="#1E293B" stroke-width="1" />
        <text x="10" y="18" font-family="IBM Plex Mono, monospace" font-size="8.5px" fill="#A6E22E">$ curl http://&lt;NodeIP&gt;:30080</text>
        <text x="10" y="32" font-family="Outfit, sans-serif" font-size="7.5px" fill="#94A3B8">└─ Port mapped on physical Node host IP</text>
      </g>
    </g>

    <!-- ==================== COLUMN 3: LoadBalancer ==================== -->
    <g
      :class="['type-col', { active: activeSection === 'loadbalancer', inactive: activeSection && activeSection !== 'loadbalancer' }]"
      @mouseenter="hoveredSection = 'loadbalancer'"
      @mouseleave="hoveredSection = null"
    >
      <rect
        x="650" y="20" width="290" height="320" rx="12"
        fill="url(#lb-panel)"
        stroke="#158A4E"
        :stroke-width="activeSection === 'loadbalancer' ? 2.5 : 1.5"
      />
      <text x="795" y="45" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="13px" fill="#158A4E">03 · LoadBalancer</text>

      <g transform="translate(675, 58)">
        <rect x="10" y="4" width="70" height="28" rx="4" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1" />
        <text x="45" y="22" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="8.5px" fill="#475569">Internet</text>

        <rect x="100" y="4" width="120" height="28" rx="4" fill="#EDF8F2" stroke="#158A4E" stroke-width="1.2" />
        <text x="160" y="22" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#158A4E">External LB</text>

        <rect x="120" y="58" width="80" height="28" rx="4" fill="#FFFFFF" stroke="#0088B8" stroke-width="1" />
        <text x="160" y="76" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9px" fill="#0088B8">Backend Pod</text>

        <path d="M 80 18 H 94" fill="none" stroke="#158A4E" stroke-width="1.2" marker-end="url(#arrow-green)" />
        <path d="M 160 32 V 52" fill="none" stroke="#158A4E" stroke-width="1.2" marker-end="url(#arrow-green)" />

        <!-- Provider logos strip -->
        <rect x="0" y="94" width="240" height="58" rx="6" fill="#FFFFFF" stroke="#A8D5BE" stroke-width="1" />
        <text x="120" y="108" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="7.5px" fill="#158A4E" letter-spacing="0.04em">PROVISIONED BY CLOUD / INFRA</text>

        <!-- AWS -->
        <g transform="translate(18, 116)">
          <image href="/logos/aws.svg" x="10" y="0" width="18" height="18" />
          <text x="19" y="30" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="7px" fill="#475569">AWS</text>
        </g>
        <!-- GCP -->
        <g transform="translate(72, 116)">
          <image href="/logos/google.png" x="10" y="0" width="18" height="18" />
          <text x="19" y="30" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="7px" fill="#475569">GCP</text>
        </g>
        <!-- Cloudflare -->
        <g transform="translate(126, 116)">
          <image href="/logos/cloudflare.svg" x="10" y="0" width="18" height="18" />
          <text x="19" y="30" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="7px" fill="#475569">Cloudflare</text>
        </g>
        <!-- MetalLB / on-prem -->
        <g transform="translate(188, 116)">
          <image href="/logos/kubernetes.svg" x="8" y="0" width="18" height="18" />
          <text x="17" y="30" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="7px" fill="#475569">MetalLB</text>
        </g>
      </g>

      <g transform="translate(665, 222)" font-family="Outfit, sans-serif" font-size="9.5px" fill="#475569">
        <circle cx="5" cy="5" r="2.5" fill="#158A4E" />
        <text x="15" y="8">K8s requests an LB from the cloud / infra layer</text>

        <circle cx="5" cy="21" r="2.5" fill="#158A4E" />
        <text x="15" y="24">Not built into Kubernetes — provider handles it</text>

        <rect x="0" y="36" width="260" height="20" rx="4" fill="rgba(21,138,78,0.08)" />
        <text x="130" y="49" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="8.5px" fill="#158A4E">USE CASE: PUBLIC PRODUCTION WORKLOADS</text>
      </g>

      <g transform="translate(665, 286)">
        <rect width="260" height="44" rx="4" fill="#0F1C2A" stroke="#1E293B" stroke-width="1" />
        <text x="10" y="18" font-family="IBM Plex Mono, monospace" font-size="8.5px" fill="#A6E22E">$ curl http://auth.company.com</text>
        <text x="10" y="32" font-family="Outfit, sans-serif" font-size="7.5px" fill="#94A3B8">└─ DNS → provider LB → NodePort → Pod</text>
      </g>
    </g>

    <!-- ==================== BOTTOM BANNER (step-aware) ==================== -->
    <g transform="translate(20, 360)">
      <rect
        width="920" height="34" rx="6"
        :fill="banner.bg"
        :stroke="banner.stroke"
        stroke-width="1"
      />
      <path d="M 0 0 h 4 v 34 H 0 Z" :fill="banner.accent" />

      <g transform="translate(18, 9)">
        <circle cx="8" cy="8" r="7" fill="none" :stroke="banner.accent" stroke-width="1.5" />
        <line x1="8" y1="5" x2="8" y2="5" :stroke="banner.accent" stroke-width="2" stroke-linecap="round" />
        <line x1="8" y1="8" x2="8" y2="11" :stroke="banner.accent" stroke-width="1.5" stroke-linecap="round" />
      </g>

      <text x="44" y="21" font-family="Outfit, sans-serif" font-weight="700" font-size="11px" :fill="banner.accent">{{ banner.text }}</text>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'ServiceTypesDiagram',
  props: {
    clicks: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      hoveredSection: null
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      if (this.clicks === 1) return 'clusterip';
      if (this.clicks === 2) return 'nodeport';
      if (this.clicks === 3) return 'loadbalancer';
      return null;
    },
    banner() {
      const banners = {
        clusterip: {
          text: 'ClusterIP: default type — traffic stays inside the cluster. Perfect for backends talking to each other.',
          accent: '#0088B8',
          bg: 'rgba(0, 136, 184, 0.08)',
          stroke: 'rgba(0, 136, 184, 0.2)'
        },
        nodeport: {
          text: 'NodePort: opens a static high port on every node. Handy for labs — usually not how you expose prod.',
          accent: '#E2A03F',
          bg: 'rgba(226, 160, 63, 0.08)',
          stroke: 'rgba(226, 160, 63, 0.2)'
        },
        loadbalancer: {
          text: 'LoadBalancer: Kubernetes asks a cloud or infra provider to provision the external LB — K8s does not run it.',
          accent: '#158A4E',
          bg: 'rgba(21, 138, 78, 0.08)',
          stroke: 'rgba(21, 138, 78, 0.2)'
        }
      };

      if (this.activeSection && banners[this.activeSection]) {
        return banners[this.activeSection];
      }

      return {
        text: 'Step through: ClusterIP (internal) → NodePort (host port) → LoadBalancer (cloud / infra provider).',
        accent: '#158A4E',
        bg: 'rgba(21, 138, 78, 0.08)',
        stroke: 'rgba(21, 138, 78, 0.2)'
      };
    }
  }
};
</script>

<style scoped>
.type-col {
  transition: opacity 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}

.type-col.active {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
}

.type-col.inactive {
  opacity: 0.35;
  filter: grayscale(0.45);
}
</style>

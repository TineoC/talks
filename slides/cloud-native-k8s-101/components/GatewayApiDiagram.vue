<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gw-infra" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0088B8" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#0088B8" stop-opacity="0.02" />
      </linearGradient>
      <linearGradient id="gw-app" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#158A4E" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#158A4E" stop-opacity="0.02" />
      </linearGradient>
      <pattern id="gw-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
      <marker id="gw-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#64748B" />
      </marker>
      <marker id="gw-arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#0088B8" />
      </marker>
      <marker id="gw-arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#158A4E" />
      </marker>
    </defs>

    <rect width="100%" height="100%" fill="url(#gw-grid)" rx="8" />

    <!-- Left: role split -->
    <g
      :class="['gw-block', { active: activeSection === 'gateway', inactive: activeSection && activeSection !== 'gateway' }]"
      @mouseenter="hoveredSection = 'gateway'"
      @mouseleave="hoveredSection = null"
    >
      <rect x="24" y="24" width="300" height="280" rx="12" fill="url(#gw-infra)" stroke="#0088B8" :stroke-width="activeSection === 'gateway' ? 2.5 : 1.5" />
      <text x="174" y="52" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="14px" fill="#0088B8">01 · Platform owns</text>

      <rect x="44" y="72" width="260" height="56" rx="8" fill="#FFFFFF" stroke="#0088B8" stroke-width="1.2" />
      <text x="174" y="94" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10px" fill="#0088B8" font-weight="700">GatewayClass</text>
      <text x="174" y="112" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">controller: envoy / aws / istio…</text>

      <rect x="44" y="144" width="260" height="56" rx="8" fill="#FFFFFF" stroke="#0088B8" stroke-width="1.2" />
      <text x="174" y="166" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10px" fill="#0088B8" font-weight="700">Gateway</text>
      <text x="174" y="184" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">listeners · TLS · public entry</text>

      <rect x="44" y="220" width="260" height="60" rx="6" fill="rgba(0,136,184,0.08)" />
      <text x="174" y="244" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#0088B8">Infra / platform team</text>
      <text x="174" y="262" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#475569">Where traffic enters the cluster</text>
    </g>

    <!-- Middle arrow -->
    <g :class="['gw-block', { inactive: activeSection === 'ingress' }]">
      <path d="M 340 160 H 380" fill="none" stroke="#94A3B8" stroke-width="2" marker-end="url(#gw-arrow)" />
      <text x="360" y="148" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B" font-weight="700">routes</text>
    </g>

    <!-- Right: app routes -->
    <g
      :class="['gw-block', { active: activeSection === 'route', inactive: activeSection && activeSection !== 'route' }]"
      @mouseenter="hoveredSection = 'route'"
      @mouseleave="hoveredSection = null"
    >
      <rect x="396" y="24" width="300" height="280" rx="12" fill="url(#gw-app)" stroke="#158A4E" :stroke-width="activeSection === 'route' ? 2.5 : 1.5" />
      <text x="546" y="52" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="14px" fill="#158A4E">02 · App owns</text>

      <rect x="416" y="72" width="260" height="72" rx="8" fill="#FFFFFF" stroke="#158A4E" stroke-width="1.2" />
      <text x="546" y="96" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10px" fill="#158A4E" font-weight="700">HTTPRoute</text>
      <text x="546" y="114" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">host: api.example.com</text>
      <text x="546" y="130" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">path /auth → Service auth-svc</text>

      <rect x="416" y="160" width="120" height="44" rx="6" fill="#FFFFFF" stroke="#0088B8" stroke-width="1" />
      <text x="476" y="186" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#0088B8">Service</text>

      <rect x="556" y="160" width="120" height="44" rx="6" fill="#FFFFFF" stroke="#0088B8" stroke-width="1" />
      <text x="616" y="186" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#0088B8">Pods</text>

      <path d="M 536 182 H 550" fill="none" stroke="#158A4E" stroke-width="1.5" marker-end="url(#gw-arrow-green)" />

      <rect x="416" y="220" width="260" height="60" rx="6" fill="rgba(21,138,78,0.08)" />
      <text x="546" y="244" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#158A4E">Application team</text>
      <text x="546" y="262" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#475569">How requests reach their Service</text>
    </g>

    <!-- Far right: vs Ingress -->
    <g
      :class="['gw-block', { active: activeSection === 'ingress', inactive: activeSection && activeSection !== 'ingress' }]"
      @mouseenter="hoveredSection = 'ingress'"
      @mouseleave="hoveredSection = null"
    >
      <rect x="720" y="24" width="216" height="280" rx="12" fill="#FFFFFF" stroke="#E2A03F" :stroke-width="activeSection === 'ingress' ? 2.5 : 1.5" />
      <text x="828" y="52" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="13px" fill="#E2A03F">03 · Why not Ingress?</text>

      <g transform="translate(740, 78)" font-family="Outfit, sans-serif" font-size="10px" fill="#475569">
        <circle cx="5" cy="6" r="2.5" fill="#E2A03F" />
        <text x="14" y="10">One object mixes roles</text>

        <circle cx="5" cy="34" r="2.5" fill="#E2A03F" />
        <text x="14" y="38">Vendor annotations</text>

        <circle cx="5" cy="62" r="2.5" fill="#E2A03F" />
        <text x="14" y="66">Harder multi-team</text>

        <circle cx="5" cy="90" r="2.5" fill="#158A4E" />
        <text x="14" y="94" fill="#158A4E" font-weight="700">Gateway API: portable</text>
        <text x="14" y="110" fill="#158A4E" font-weight="700">+ role-oriented</text>
      </g>

      <!-- Controller logos -->
      <text x="828" y="220" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="8px" fill="#64748B" letter-spacing="0.04em">IMPLEMENTED BY</text>
      <image href="/logos/envoy.svg" x="748" y="232" width="22" height="22" />
      <image href="/logos/aws.svg" x="790" y="232" width="22" height="22" />
      <image href="/logos/cloudflare.svg" x="832" y="232" width="22" height="22" />
      <image href="/logos/kubernetes.svg" x="874" y="232" width="22" height="22" />
      <text x="828" y="278" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Envoy · AWS · Cloudflare · more</text>
    </g>

    <!-- Bottom banner -->
    <g transform="translate(24, 324)">
      <rect width="912" height="52" rx="8" :fill="banner.bg" :stroke="banner.stroke" stroke-width="1" />
      <path d="M 0 0 h 4 v 52 H 0 Z" :fill="banner.accent" />
      <text x="24" y="22" font-family="Outfit, sans-serif" font-weight="800" font-size="12px" :fill="banner.accent">{{ banner.title }}</text>
      <text x="24" y="40" font-family="Outfit, sans-serif" font-size="11px" fill="#475569">{{ banner.body }}</text>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'GatewayApiDiagram',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return { hoveredSection: null };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      if (this.clicks === 1) return 'gateway';
      if (this.clicks === 2) return 'route';
      if (this.clicks === 3) return 'ingress';
      return null;
    },
    banner() {
      const map = {
        gateway: {
          title: 'Gateway + GatewayClass',
          body: 'Platform defines how traffic enters — listeners, TLS, and which controller implements it.',
          accent: '#0088B8',
          bg: 'rgba(0,136,184,0.08)',
          stroke: 'rgba(0,136,184,0.2)'
        },
        route: {
          title: 'HTTPRoute',
          body: 'App teams attach hosts and paths to their Services without touching cluster ingress plumbing.',
          accent: '#158A4E',
          bg: 'rgba(21,138,78,0.08)',
          stroke: 'rgba(21,138,78,0.2)'
        },
        ingress: {
          title: 'Successor to Ingress',
          body: 'Same job as Ingress — richer API, fewer proprietary annotations, clearer ownership boundaries.',
          accent: '#E2A03F',
          bg: 'rgba(226,160,63,0.08)',
          stroke: 'rgba(226,160,63,0.2)'
        }
      };
      if (this.activeSection && map[this.activeSection]) return map[this.activeSection];
      return {
        title: 'Gateway API',
        body: 'Step through: platform Gateway → app HTTPRoute → why it replaces classic Ingress.',
        accent: '#0088B8',
        bg: 'rgba(0,136,184,0.08)',
        stroke: 'rgba(0,136,184,0.2)'
      };
    }
  }
};
</script>

<style scoped>
.gw-block {
  transition: opacity 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}
.gw-block.active {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
}
.gw-block.inactive {
  opacity: 0.35;
  filter: grayscale(0.45);
}
</style>

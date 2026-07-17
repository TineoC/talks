<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="laptop-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#00A8D0" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#0088B8" stop-opacity="0.01" />
      </linearGradient>

      <linearGradient id="prod-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#CF5A5A" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#9E2A2B" stop-opacity="0.01" />
      </linearGradient>

      <linearGradient id="header-laptop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#00A8D0" />
        <stop offset="100%" stop-color="#0088B8" />
      </linearGradient>

      <linearGradient id="header-prod" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#CF5A5A" />
        <stop offset="100%" stop-color="#9E2A2B" />
      </linearGradient>

      <!-- Grid Pattern -->
      <pattern id="diagram-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#E2E8F0" />
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#diagram-grid)" rx="8" />

    <!-- ==================== LEFT ZONE: LOCAL LAPTOP ==================== -->
    <rect x="20" y="20" width="430" height="310" rx="12" fill="url(#laptop-grad)" stroke="#94A3B8" stroke-dasharray="6 4" stroke-width="1.5" />
    <text x="35" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#64748B" font-size="10px" font-weight="800" letter-spacing="0.05em">LOCAL DEV LAPTOP (ISOLATED)</text>

    <!-- Laptop Traffic flow Browser -> Docker -->
    <path class="flow-line flow-public" d="M 170 145 H 270" stroke="#00A8D0" stroke-width="2" />

    <!-- 1. Browser Client -->
    <g class="node" transform="translate(50, 100)">
      <rect width="120" height="90" rx="8" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.5" />
      <!-- Browser Top Bar -->
      <path d="M 0 0 h 120 v 18 H 0 Z" fill="#E2E8F0" />
      <circle cx="8" cy="9" r="2.5" fill="#CF5A5A" />
      <circle cx="16" cy="9" r="2.5" fill="#E2A03F" />
      <circle cx="24" cy="9" r="2.5" fill="#158A4E" />
      <text x="34" y="12" font-family="IBM Plex Mono, monospace" font-size="7px" fill="#64748B">localhost:3000</text>
      
      <text x="12" y="50" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Web Browser</text>
      <text x="12" y="62" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">Single User Session</text>
      <text x="12" y="74" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#00A8D0">status: ok</text>
    </g>

    <!-- 2. Local Docker Container -->
    <g class="node" transform="translate(270, 100)">
      <rect width="130" height="90" rx="8" fill="#FFFFFF" stroke="#00A8D0" stroke-width="1.5" />
      <path d="M 0 0 h 130 v 4 H 0 Z" fill="url(#header-laptop)" />
      <!-- Docker Logo -->
      <image href="/logos/docker-mark.svg" x="12" y="12" width="22" height="22" />
      <circle class="status-dot" cx="118" cy="18" r="3" fill="#158A4E" />
      <text x="12" y="50" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Docker Container</text>
      <text x="12" y="62" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">docker run · root</text>
      <text x="12" y="74" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">1 Process · No TLS</text>
    </g>

    <!-- Laptop takeaway labels -->
    <g transform="translate(50, 220)">
      <text x="0" y="15" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#158A4E">✔ Simplistic Network</text>
      <text x="0" y="32" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#158A4E">✔ Direct Localhost Binding</text>
      <text x="0" y="49" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#158A4E">✔ Full Administrator Access</text>
      <text x="0" y="66" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#158A4E">✔ Zero Resource Restrictions</text>
    </g>
    <text x="390" y="300" font-family="Outfit, sans-serif" font-weight="800" font-size="14px" fill="#158A4E" text-anchor="end">It works! 🎉</text>

    <!-- ==================== MIDDLE SEPARATOR ==================== -->
    <line x1="475" y1="20" x2="475" y2="330" stroke="#CF5A5A" stroke-width="1.5" stroke-dasharray="4 4" />

    <!-- ==================== RIGHT ZONE: PRODUCTION REALITY ==================== -->
    <rect x="500" y="20" width="440" height="310" rx="12" fill="url(#prod-grad)" stroke="#CF5A5A" stroke-dasharray="6 4" stroke-width="1.5" />
    <text x="515" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#9E2A2B" font-size="10px" font-weight="800" letter-spacing="0.05em">PRODUCTION REALITY (K8S / AWS)</text>

    <!-- Production Traffic Flows -->
    <!-- Ingress to Pods -->
    <path class="flow-line flow-public" d="M 600 145 C 625 145, 625 90, 650 90" stroke="#CF5A5A" stroke-width="1.5" />
    <path class="flow-line flow-public" d="M 600 145 C 625 145, 625 200, 650 200" stroke="#CF5A5A" stroke-width="1.5" />
    <!-- Pods to DB / Cache -->
    <path class="flow-line flow-internal" d="M 750 90 C 775 90, 775 110, 800 110" stroke="#E63946" stroke-width="1.5" />
    <path class="flow-line flow-internal" d="M 750 200 C 775 200, 775 130, 800 130" stroke="#D4A373" stroke-width="1.5" />
    <path class="flow-line flow-internal" d="M 750 200 C 775 200, 775 220, 800 220" stroke="#4ea8de" stroke-width="1.5" />

    <!-- 1. API Ingress Gateway -->
    <g class="node" transform="translate(515, 110)">
      <rect width="85" height="70" rx="6" fill="#FFFFFF" stroke="#CF5A5A" stroke-width="1.5" />
      <path d="M 0 0 h 85 v 3 H 0 Z" fill="url(#header-prod)" />
      <!-- AWS Logo -->
      <image href="/logos/aws.svg" x="8" y="8" width="16" height="16" />
      <text x="10" y="38" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#0f1c2a">API Gateway</text>
      <text x="10" y="48" font-family="IBM Plex Mono, monospace" font-size="6.5px" fill="#5a6a7a">AWS ALB / TLS</text>
      <text x="10" y="58" font-family="IBM Plex Mono, monospace" font-size="6.5px" fill="#CF5A5A">Secrets Filter</text>
    </g>

    <!-- 2. Scaled Replica 1 (NodeJS) -->
    <g class="node" transform="translate(650, 60)">
      <rect width="100" height="60" rx="6" fill="#FFFFFF" stroke="#4A90E2" stroke-width="1.2" />
      <image href="/logos/nodejs.svg" x="8" y="8" width="16" height="16" />
      <circle class="status-dot" cx="90" cy="12" r="2.5" fill="#158A4E" />
      <text x="10" y="36" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#0f1c2a">Auth Pods</text>
      <text x="10" y="46" font-family="IBM Plex Mono, monospace" font-size="6.5px" fill="#5a6a7a">Replicated · RBAC</text>
    </g>

    <!-- 3. Scaled Replica 2 (Go) -->
    <g class="node" transform="translate(650, 170)">
      <rect width="100" height="60" rx="6" fill="#FFFFFF" stroke="#00B4D8" stroke-width="1.2" />
      <image href="/logos/go.svg" x="8" y="8" width="16" height="16" />
      <circle class="status-dot" cx="90" cy="12" r="2.5" fill="#158A4E" />
      <text x="10" y="36" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#0f1c2a">Order Pods</text>
      <text x="10" y="46" font-family="IBM Plex Mono, monospace" font-size="6.5px" fill="#5a6a7a">Auto-scaled · HA</text>
    </g>

    <!-- 4. Cache (Redis) -->
    <g class="node" transform="translate(800, 80)">
      <rect width="115" height="50" rx="6" fill="#FFFFFF" stroke="#E63946" stroke-width="1.2" />
      <image href="/logos/redis.svg" x="8" y="8" width="14" height="14" />
      <text x="10" y="32" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#0f1c2a">Redis Cache</text>
      <text x="10" y="41" font-family="IBM Plex Mono, monospace" font-size="6.5px" fill="#5a6a7a">Isolated Subnet</text>
    </g>

    <!-- 5. Database (Postgres) -->
    <g class="node" transform="translate(800, 190)">
      <rect width="115" height="50" rx="6" fill="#FFFFFF" stroke="#D4A373" stroke-width="1.2" />
      <image href="/logos/postgres.svg" x="8" y="8" width="14" height="14" />
      <text x="10" y="32" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#0f1c2a">Postgres Primary</text>
      <text x="10" y="41" font-family="IBM Plex Mono, monospace" font-size="6.5px" fill="#5a6a7a">No Root Access</text>
    </g>

    <!-- Reality takeaway labels -->
    <g transform="translate(515, 245)">
      <text x="0" y="15" font-family="Outfit, sans-serif" font-weight="700" font-size="9px" fill="#CF5A5A">✘ Network Policies & Firewalls</text>
      <text x="0" y="28" font-family="Outfit, sans-serif" font-weight="700" font-size="9px" fill="#CF5A5A">✘ OAuth2 / RBAC Credentials</text>
      <text x="0" y="41" font-family="Outfit, sans-serif" font-weight="700" font-size="9px" fill="#CF5A5A">✘ Supply Chain Vulnerabilities (CVEs)</text>
      <text x="0" y="54" font-family="Outfit, sans-serif" font-weight="700" font-size="9px" fill="#CF5A5A">✘ Multi-arch Builds & Read-only Root</text>
    </g>
    <text x="925" y="300" font-family="Outfit, sans-serif" font-weight="800" font-size="14px" fill="#CF5A5A" text-anchor="end">Different problem! ⚠</text>

    <!-- ==================== WARNING BRIDGE BANNER ==================== -->
    <g transform="translate(20, 350)">
      <rect width="920" height="40" rx="6" fill="rgba(184, 61, 61, 0.08)" stroke="rgba(184, 61, 61, 0.25)" stroke-width="1" />
      <path d="M 0 0 h 4 v 40 H 0 Z" fill="#CF5A5A" />
      
      <!-- Warning Exclamation Icon -->
      <g transform="translate(18, 12)">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="none" stroke="#CF5A5A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="scale(0.8) translate(-2, -2)" />
      </g>
      
      <text x="44" y="24" font-family="IBM Plex Mono, ui-monospace, monospace" font-weight="700" font-size="12px" fill="#CF5A5A" letter-spacing="0.02em">Laptop success ≠ production readiness</text>
    </g>
  </svg>
</template>

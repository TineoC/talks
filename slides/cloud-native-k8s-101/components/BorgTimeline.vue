<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <pattern id="timeline-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#timeline-grid)" rx="8" />

    <line x1="80" y1="175" x2="880" y2="175" stroke="#CBD5E1" stroke-width="4" />
    <line x1="80" y1="175" x2="880" y2="175" stroke="#00A8D0" stroke-width="4" stroke-dasharray="12 6" class="flow-line flow-public" style="opacity: 0.5;" />

    <!-- 1. BORG (2003) -->
    <g class="node">
      <image href="/logos/google.png" x="65" y="58" width="30" height="30" />
      <text x="80" y="120" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="26px" font-weight="800" fill="#4A90E2">2003</text>
      <circle cx="80" cy="175" r="11" fill="#FFFFFF" stroke="#4A90E2" stroke-width="4" />
      <text x="80" y="225" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="18px" fill="#0F1C2A">Borg</text>
      <text x="80" y="252" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Declarative cell scheduler</text>
      <text x="80" y="272" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Google’s cluster manager</text>
    </g>

    <!-- 2. CGROUPS (2006) -->
    <g class="node">
      <image href="/logos/google.png" x="265" y="58" width="30" height="30" />
      <text x="280" y="120" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="26px" font-weight="800" fill="#E2A03F">2006</text>
      <circle cx="280" cy="175" r="11" fill="#FFFFFF" stroke="#E2A03F" stroke-width="4" />
      <text x="280" y="225" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="18px" fill="#0F1C2A">cgroups</text>
      <text x="280" y="252" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Invented at Google</text>
      <text x="280" y="272" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">CPU · memory · I/O limits</text>
    </g>

    <!-- 3. DOCKER (2013) -->
    <g class="node">
      <image href="/logos/docker-mark.svg" x="465" y="58" width="30" height="30" />
      <text x="480" y="120" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="26px" font-weight="800" fill="#0088B8">2013</text>
      <circle cx="480" cy="175" r="11" fill="#FFFFFF" stroke="#0088B8" stroke-width="4" />
      <text x="480" y="225" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="18px" fill="#0F1C2A">Docker</text>
      <text x="480" y="252" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Standardized images</text>
      <text x="480" y="272" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Containers for every developer</text>
    </g>

    <!-- 4. KUBERNETES (2014) -->
    <g class="node">
      <image href="/logos/kubernetes.svg" x="664" y="56" width="32" height="32" />
      <text x="680" y="120" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="26px" font-weight="800" fill="#0088B8">2014</text>
      <circle cx="680" cy="175" r="11" fill="#FFFFFF" stroke="#0088B8" stroke-width="4" />
      <text x="680" y="225" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="18px" fill="#0F1C2A">Kubernetes</text>
      <text x="680" y="252" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Open-source orchestration</text>
      <text x="680" y="272" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Borg’s ideas, for everyone</text>
    </g>

    <!-- 5. CNCF (2015) -->
    <g class="node">
      <image href="/logos/cncf.svg" x="865" y="58" width="30" height="30" />
      <text x="880" y="120" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="26px" font-weight="800" fill="#158A4E">2015</text>
      <circle cx="880" cy="175" r="11" fill="#FFFFFF" stroke="#158A4E" stroke-width="4" />
      <text x="880" y="225" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="18px" fill="#0F1C2A">CNCF</text>
      <text x="880" y="252" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Neutral home for K8s</text>
      <text x="880" y="272" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Cloud native ecosystem</text>
    </g>
  </svg>
</template>

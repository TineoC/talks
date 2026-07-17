<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Grid Pattern -->
      <pattern id="timeline-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#timeline-grid)" rx="8" />

    <!-- Main Timeline Horizontal Axis -->
    <line x1="80" y1="200" x2="880" y2="200" stroke="#CBD5E1" stroke-width="4" />
    <line x1="80" y1="200" x2="880" y2="200" stroke="#00A8D0" stroke-width="4" stroke-dasharray="12 6" class="flow-line flow-public" style="opacity: 0.5;" />

    <!-- 1. BORG NODE (2003) -->
    <g class="node" transform="translate(0, 0)">
      <image href="/logos/google.png" x="65" y="80" width="30" height="30" />
      <text x="80" y="145" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="28px" font-weight="800" fill="#4A90E2">2003</text>
      <circle cx="80" cy="200" r="12" fill="#FFFFFF" stroke="#4A90E2" stroke-width="4" />
      <text x="80" y="255" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="20px" fill="#0F1C2A">Borg</text>
      <text x="80" y="290" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Declarative Cell Scheduler</text>
      <text x="80" y="312" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Google Internal Cluster Manager</text>
    </g>

    <!-- 2. OMEGA NODE (2013) -->
    <g class="node" transform="translate(0, 0)">
      <image href="/logos/google.png" x="265" y="80" width="30" height="30" />
      <text x="280" y="145" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="28px" font-weight="800" fill="#00B4D8">2013</text>
      <circle cx="280" cy="200" r="12" fill="#FFFFFF" stroke="#00B4D8" stroke-width="4" />
      <text x="280" y="255" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="20px" fill="#0F1C2A">Omega</text>
      <text x="280" y="290" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Shared-State Scheduler</text>
      <text x="280" y="312" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Optimistic Concurrency Control</text>
    </g>

    <!-- 3. DOCKER NODE (2013) -->
    <g class="node" transform="translate(0, 0)">
      <image href="/logos/docker-mark.svg" x="465" y="80" width="30" height="30" />
      <text x="480" y="145" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="28px" font-weight="800" fill="#0088B8">2013</text>
      <circle cx="480" cy="200" r="12" fill="#FFFFFF" stroke="#0088B8" stroke-width="4" />
      <text x="480" y="255" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="20px" fill="#0F1C2A">Docker</text>
      <text x="480" y="290" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Standardized Box Images</text>
      <text x="480" y="312" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Brought Containers to Devs</text>
    </g>

    <!-- 4. KUBERNETES NODE (2014) -->
    <g class="node" transform="translate(0, 0)">
      <image href="/logos/kubernetes.svg" x="664" y="78" width="32" height="32" />
      <text x="680" y="145" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="28px" font-weight="800" fill="#8B4FB0">2014</text>
      <circle cx="680" cy="200" r="12" fill="#FFFFFF" stroke="#8B4FB0" stroke-width="4" />
      <text x="680" y="255" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="20px" fill="#0F1C2A">Kubernetes</text>
      <text x="680" y="290" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Open Source Orchestration</text>
      <text x="680" y="312" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Google successor to Borg/Omega</text>
    </g>

    <!-- 5. CNCF NODE (2015) -->
    <g class="node" transform="translate(0, 0)">
      <image href="/logos/cncf.svg" x="865" y="80" width="30" height="30" />
      <text x="880" y="145" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="28px" font-weight="800" fill="#2EC4B6">2015</text>
      <circle cx="880" cy="200" r="12" fill="#FFFFFF" stroke="#2EC4B6" stroke-width="4" />
      <text x="880" y="255" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="20px" fill="#0F1C2A">CNCF</text>
      <text x="880" y="290" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Standard Governance Body</text>
      <text x="880" y="312" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12px" fill="#64748B">Ecosystem for Open Cloud Native</text>
    </g>
  </svg>
</template>

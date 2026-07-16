<template>
  <svg class="diagram diagram-lg" viewBox="0 0 432 280" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="12" width="162" height="252" rx="14" fill="#fff" stroke="#0088B8" stroke-width="2.5"/>
    <text x="93" y="40" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0088B8" font-weight="700" style="font-size:12px">Control Plane</text>
    <rect x="34" y="60" width="126" height="30" rx="6" fill="#F4F8FB" stroke="#B8C5D1" stroke-width="1"/>
    <text x="97" y="80" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0F1C2A" style="font-size:11px">API Server</text>
    <rect x="34" y="102" width="126" height="30" rx="6" fill="#F4F8FB" stroke="#B8C5D1" stroke-width="1"/>
    <text x="97" y="122" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0F1C2A" style="font-size:11px">etcd</text>
    <rect x="34" y="144" width="126" height="30" rx="6" fill="#F4F8FB" stroke="#B8C5D1" stroke-width="1"/>
    <text x="97" y="164" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0F1C2A" style="font-size:11px">Scheduler</text>
    <rect x="34" y="186" width="126" height="30" rx="6" fill="#F4F8FB" stroke="#B8C5D1" stroke-width="1"/>
    <text x="97" y="206" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0F1C2A" style="font-size:11px">Controller Mgr</text>

    <rect x="262" y="12" width="154" height="160" rx="14" fill="#fff" stroke="#1A8F55" stroke-width="2.5"/>
    <text x="339" y="40" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#146C40" font-weight="700" style="font-size:12px">Worker Node</text>
    <rect x="278" y="60" width="124" height="28" rx="6" fill="#F4F8FB" stroke="#B8C5D1" stroke-width="1"/>
    <text x="340" y="79" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0F1C2A" style="font-size:11px">kubelet</text>
    <rect x="278" y="98" width="124" height="28" rx="6" fill="#F4F8FB" stroke="#B8C5D1" stroke-width="1"/>
    <text x="340" y="117" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0F1C2A" style="font-size:11px">kube-proxy</text>
    <rect x="278" y="136" width="124" height="24" rx="6" fill="rgba(0,153,204,0.08)" stroke="#0088B8" stroke-width="1"/>
    <text x="340" y="153" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0088B8" style="font-size:11px">Pods</text>

    <defs>
      <marker id="archArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#5B6B7C" />
      </marker>
    </defs>
    <line x1="174" y1="100" x2="262" y2="100" stroke="#5B6B7C" stroke-width="2" marker-end="url(#archArrow)" />
    <text x="218" y="92" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#5B6B7C" style="font-size:9px">API</text>
  </svg>
</template>

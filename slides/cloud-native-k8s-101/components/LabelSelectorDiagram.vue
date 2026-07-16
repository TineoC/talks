<template>
  <svg class="diagram diagram-md" viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg">
    <!-- Pods with labels -->
    <text x="120" y="28" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#5A6A7A" font-weight="700" style="font-size:12px">PODS</text>

    <rect x="24" y="48" width="190" height="70" rx="12" fill="#fff" stroke="#B8730F" stroke-width="2"/>
    <text x="119" y="78" text-anchor="middle" fill="#0F1C2A" font-weight="700" style="font-size:14px">Pod A</text>
    <rect x="54" y="90" width="130" height="18" rx="6" fill="rgba(0,136,184,0.12)"/>
    <text x="119" y="103" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0088B8" style="font-size:11px">app: my-app</text>

    <rect x="24" y="136" width="190" height="70" rx="12" fill="#fff" stroke="#B8730F" stroke-width="2"/>
    <text x="119" y="166" text-anchor="middle" fill="#0F1C2A" font-weight="700" style="font-size:14px">Pod B</text>
    <rect x="54" y="178" width="130" height="18" rx="6" fill="rgba(0,136,184,0.12)"/>
    <text x="119" y="191" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0088B8" style="font-size:11px">app: my-app</text>

    <!-- Selector arrow -->
    <defs>
      <marker id="selArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#0088B8"/>
      </marker>
    </defs>
    <line x1="230" y1="128" x2="300" y2="128" stroke="#0088B8" stroke-width="2.5" marker-end="url(#selArrow)"/>
    <text x="265" y="116" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0088B8" style="font-size:10px">select</text>

    <!-- Service -->
    <text x="400" y="28" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#5A6A7A" font-weight="700" style="font-size:12px">SERVICE</text>
    <rect x="316" y="70" width="180" height="120" rx="14" fill="#fff" stroke="#158A4E" stroke-width="2.5"/>
    <text x="406" y="115" text-anchor="middle" fill="#158A4E" font-weight="700" style="font-size:16px">svc/my-app</text>
    <rect x="346" y="135" width="120" height="28" rx="8" fill="rgba(21,138,78,0.1)" stroke="#158A4E"/>
    <text x="406" y="154" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#158A4E" style="font-size:11px">selector: my-app</text>

    <text x="260" y="250" text-anchor="middle" fill="#5A6A7A" style="font-size:13px">Labels glue Deployments, Pods, and Services together</text>
  </svg>
</template>

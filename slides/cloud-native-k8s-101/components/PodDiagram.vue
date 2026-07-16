<template>
  <svg class="diagram diagram-md" viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="324" height="184" rx="12" fill="#fff" stroke="#0088B8" stroke-width="1.5" stroke-dasharray="5,3"/>
    <text x="170" y="32" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0088B8" font-weight="700" style="font-size:11px">POD</text>
    <rect x="24" y="48" width="136" height="72" rx="8" fill="#F3F6F9" stroke="#158A4E" stroke-width="1.5"/>
    <text x="92" y="78" text-anchor="middle" fill="#158A4E" font-weight="700" style="font-size:13px">App</text>
    <text x="92" y="98" text-anchor="middle" fill="#5A6A7A" style="font-size:10px">:8080</text>
    <rect x="180" y="48" width="136" height="72" rx="8" fill="#F3F6F9" stroke="#B8730F" stroke-width="1.5"/>
    <text x="248" y="78" text-anchor="middle" fill="#B8730F" font-weight="700" style="font-size:13px">Sidecar</text>
    <text x="248" y="98" text-anchor="middle" fill="#5A6A7A" style="font-size:10px">metrics</text>
    <text x="170" y="168" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#5A6A7A" style="font-size:10px">shared IP · volumes · localhost</text>
  </svg>
</template>

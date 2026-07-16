<template>
  <svg class="diagram diagram-md" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="95" y="8" width="130" height="36" rx="8" fill="#fff" stroke="#158A4E" stroke-width="1.5"/>
    <text x="160" y="31" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#158A4E" font-weight="700" style="font-size:11px">Client</text>
    <line x1="160" y1="44" x2="160" y2="58" stroke="#C5D0DA" stroke-width="2"/>
    <rect x="95" y="58" width="130" height="36" rx="8" fill="#fff" stroke="#0088B8" stroke-width="2"/>
    <text x="160" y="81" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0088B8" font-weight="700" style="font-size:11px">Service</text>
    <line x1="130" y1="94" x2="70" y2="118" stroke="#C5D0DA" stroke-width="1.5"/>
    <line x1="160" y1="94" x2="160" y2="118" stroke="#C5D0DA" stroke-width="1.5"/>
    <line x1="190" y1="94" x2="250" y2="118" stroke="#C5D0DA" stroke-width="1.5"/>
    <rect x="40" y="118" width="60" height="32" rx="6" fill="#F3F6F9" stroke="#B8730F"/>
    <text x="70" y="138" text-anchor="middle" fill="#B8730F" font-weight="700" style="font-size:10px">Pod</text>
    <rect x="130" y="118" width="60" height="32" rx="6" fill="#F3F6F9" stroke="#B8730F"/>
    <text x="160" y="138" text-anchor="middle" fill="#B8730F" font-weight="700" style="font-size:10px">Pod</text>
    <rect x="220" y="118" width="60" height="32" rx="6" fill="#F3F6F9" stroke="#B8730F"/>
    <text x="250" y="138" text-anchor="middle" fill="#B8730F" font-weight="700" style="font-size:10px">Pod</text>
    <text x="160" y="178" text-anchor="middle" fill="#5A6A7A" style="font-size:10px">label: app=my-app</text>
  </svg>
</template>

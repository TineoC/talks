<template>
  <svg class="diagram diagram-md" viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg">
    <rect x="90" y="8" width="180" height="40" rx="10" fill="#fff" stroke="#0088B8" stroke-width="2"/>
    <text x="180" y="33" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0088B8" font-weight="700" style="font-size:12px">Deployment</text>
    <text x="180" y="58" text-anchor="middle" fill="#5A6A7A" style="font-size:10px">replicas: 2</text>
    <line x1="180" y1="68" x2="180" y2="88" stroke="#C5D0DA" stroke-width="1.5"/>
    <rect x="100" y="88" width="160" height="32" rx="8" fill="#fff" stroke="#6B2FA0" stroke-width="1.5"/>
    <text x="180" y="109" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#6B2FA0" font-weight="700" style="font-size:11px">ReplicaSet</text>
    <line x1="140" y1="120" x2="90" y2="148" stroke="#C5D0DA" stroke-width="1.5"/>
    <line x1="220" y1="120" x2="270" y2="148" stroke="#C5D0DA" stroke-width="1.5"/>
    <rect x="40" y="148" width="100" height="40" rx="8" fill="#F3F6F9" stroke="#B8730F"/>
    <text x="90" y="173" text-anchor="middle" fill="#B8730F" font-weight="700" style="font-size:12px">Pod</text>
    <rect x="220" y="148" width="100" height="40" rx="8" fill="#F3F6F9" stroke="#B8730F"/>
    <text x="270" y="173" text-anchor="middle" fill="#B8730F" font-weight="700" style="font-size:12px">Pod</text>
  </svg>
</template>

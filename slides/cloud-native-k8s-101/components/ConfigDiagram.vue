<template>
  <svg class="diagram diagram-md" viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="130" height="48" rx="8" fill="#fff" stroke="#158A4E" stroke-width="1.5"/>
    <text x="73" y="32" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#158A4E" font-weight="700" style="font-size:11px">ConfigMap</text>
    <text x="73" y="48" text-anchor="middle" fill="#5A6A7A" style="font-size:10px">APP_ENV=prod</text>
    <rect x="202" y="12" width="130" height="48" rx="8" fill="#fff" stroke="#B83D3D" stroke-width="1.5"/>
    <text x="267" y="32" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#B83D3D" font-weight="700" style="font-size:11px">Secret</text>
    <text x="267" y="48" text-anchor="middle" fill="#5A6A7A" style="font-size:10px">DB_PASSWORD=••••</text>
    <line x1="73" y1="60" x2="120" y2="88" stroke="#C5D0DA" stroke-width="1.5"/>
    <line x1="267" y1="60" x2="220" y2="88" stroke="#C5D0DA" stroke-width="1.5"/>
    <rect x="70" y="88" width="200" height="52" rx="10" fill="#fff" stroke="#0088B8" stroke-width="1.5"/>
    <text x="170" y="112" text-anchor="middle" font-family="Outfit, sans-serif" fill="#0088B8" font-weight="700" style="font-size:13px">Pod</text>
    <text x="170" y="130" text-anchor="middle" fill="#5A6A7A" style="font-size:10px">envFrom / volumeMounts</text>
  </svg>
</template>

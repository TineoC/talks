<template>
  <svg class="diagram diagram-lg" viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="140" height="244" rx="10" fill="#fff" stroke="#B83D3D" stroke-width="2" stroke-dasharray="5,3"/>
    <text x="78" y="32" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#B83D3D" font-weight="700" style="font-size:11px">VM</text>
    <rect x="18" y="44" width="120" height="32" rx="6" fill="#FEF5F5" stroke="#E8B4B4"/>
    <text x="78" y="64" text-anchor="middle" fill="#0F1C2A" style="font-size:10px">App</text>
    <rect x="18" y="82" width="120" height="32" rx="6" fill="#FCEAEA" stroke="#E8B4B4"/>
    <text x="78" y="102" text-anchor="middle" fill="#0F1C2A" style="font-size:10px">Guest OS</text>
    <rect x="18" y="120" width="120" height="32" rx="6" fill="#F5D5D5" stroke="#E8B4B4"/>
    <text x="78" y="140" text-anchor="middle" fill="#0F1C2A" style="font-size:10px">Hypervisor</text>
    <rect x="18" y="158" width="120" height="40" rx="6" fill="#EEF3F8" stroke="#B8C5D1"/>
    <text x="78" y="183" text-anchor="middle" fill="#0F1C2A" style="font-size:10px">Host OS</text>
    <text x="78" y="228" text-anchor="middle" fill="#5A6A7A" style="font-size:9px">Heavy · slow</text>

    <text x="172" y="130" text-anchor="middle" font-weight="700" fill="#5A6A7A" style="font-size:16px">vs</text>

    <rect x="172" y="8" width="140" height="244" rx="10" fill="#fff" stroke="#158A4E" stroke-width="2"/>
    <text x="242" y="32" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#158A4E" font-weight="700" style="font-size:11px">Container</text>
    <rect x="182" y="44" width="120" height="32" rx="6" fill="#EDF8F2" stroke="#A8D5BE"/>
    <text x="242" y="64" text-anchor="middle" fill="#0F1C2A" style="font-size:10px">App</text>
    <rect x="182" y="82" width="120" height="32" rx="6" fill="#E8F4FA" stroke="#A8D0E0"/>
    <text x="242" y="102" text-anchor="middle" fill="#0F1C2A" style="font-size:10px">Runtime</text>
    <rect x="182" y="120" width="120" height="78" rx="6" fill="#EEF3F8" stroke="#B8C5D1"/>
    <text x="242" y="165" text-anchor="middle" fill="#0F1C2A" style="font-size:10px">Host OS</text>
    <text x="242" y="228" text-anchor="middle" fill="#5A6A7A" style="font-size:9px">Shared kernel · fast</text>
  </svg>
</template>

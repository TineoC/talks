<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 420" xmlns="http://www.w3.org/2000/svg">
    <!-- Left: cargo container -->
    <rect x="40" y="48" width="380" height="280" rx="18" fill="#fff" stroke="#0088B8" stroke-width="2.5"/>
    <text x="230" y="88" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0088B8" font-weight="700" letter-spacing="0.08em" style="font-size:14px">SHIPPING CONTAINER</text>

    <!-- Container body -->
    <rect x="90" y="120" width="280" height="140" rx="8" fill="#0F6A8A" stroke="#0A4F68" stroke-width="2"/>
    <!-- Corrugation lines -->
    <line x1="120" y1="128" x2="120" y2="252" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
    <line x1="150" y1="128" x2="150" y2="252" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
    <line x1="180" y1="128" x2="180" y2="252" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
    <line x1="210" y1="128" x2="210" y2="252" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
    <line x1="240" y1="128" x2="240" y2="252" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
    <line x1="270" y1="128" x2="270" y2="252" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
    <line x1="300" y1="128" x2="300" y2="252" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
    <line x1="330" y1="128" x2="330" y2="252" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
    <!-- Doors -->
    <line x1="230" y1="120" x2="230" y2="260" stroke="rgba(255,255,255,0.35)" stroke-width="3"/>
    <circle cx="215" cy="190" r="5" fill="#E8Eef4"/>
    <circle cx="245" cy="190" r="5" fill="#E8Eef4"/>
    <!-- Corner posts -->
    <rect x="90" y="120" width="14" height="140" fill="#0A4F68"/>
    <rect x="356" y="120" width="14" height="140" fill="#0A4F68"/>

    <text x="230" y="298" text-anchor="middle" font-family="Outfit, sans-serif" fill="#0F1C2A" font-weight="700" style="font-size:18px">Standard box</text>
    <text x="230" y="322" text-anchor="middle" fill="#5A6A7A" style="font-size:13px">Fits ships · trains · trucks</text>

    <!-- Arrow -->
    <text x="480" y="200" text-anchor="middle" font-family="Outfit, sans-serif" fill="#5A6A7A" font-weight="700" style="font-size:28px">→</text>

    <!-- Right: software container -->
    <rect x="540" y="48" width="380" height="280" rx="18" fill="#fff" stroke="#158A4E" stroke-width="2.5"/>
    <text x="730" y="88" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#158A4E" font-weight="700" letter-spacing="0.08em" style="font-size:14px">SOFTWARE CONTAINER</text>

    <!-- Layer stack -->
    <rect x="600" y="118" width="260" height="42" rx="8" fill="#F0E8FA" stroke="#6B2FA0" stroke-width="1.5"/>
    <text x="730" y="145" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#6B2FA0" font-weight="600" style="font-size:13px">App</text>

    <rect x="600" y="168" width="260" height="42" rx="8" fill="#EDF8F2" stroke="#158A4E" stroke-width="1.5"/>
    <text x="730" y="195" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#158A4E" font-weight="600" style="font-size:13px">Dependencies</text>

    <rect x="600" y="218" width="260" height="42" rx="8" fill="#E8F4FA" stroke="#0088B8" stroke-width="1.5"/>
    <text x="730" y="245" text-anchor="middle" font-family="IBM Plex Mono, monospace" fill="#0088B8" font-weight="600" style="font-size:13px">Config + runtime</text>

    <text x="730" y="298" text-anchor="middle" font-family="Outfit, sans-serif" fill="#0F1C2A" font-weight="700" style="font-size:18px">Standard unit</text>
    <text x="730" y="322" text-anchor="middle" fill="#5A6A7A" style="font-size:13px">Fits laptop · CI · cluster</text>

    <!-- Shared caption -->
    <rect x="200" y="360" width="560" height="44" rx="12" fill="rgba(0,136,184,0.1)" stroke="rgba(0,136,184,0.25)" stroke-width="1.5"/>
    <text x="480" y="388" text-anchor="middle" font-family="Outfit, sans-serif" fill="#0a5a78" font-weight="700" style="font-size:16px">Same shape → move, stack, and route</text>
  </svg>
</template>

<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients for Layers -->
      <linearGradient id="gradient-l1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#E8F4FA" />
        <stop offset="100%" stop-color="#D0E8F5" />
      </linearGradient>
      <linearGradient id="gradient-l2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFBF5" />
        <stop offset="100%" stop-color="#FEEED8" />
      </linearGradient>
      <linearGradient id="gradient-l3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#EDF8F2" />
        <stop offset="100%" stop-color="#D1EFE0" />
      </linearGradient>
      <linearGradient id="gradient-l4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F0E8FA" />
        <stop offset="100%" stop-color="#DFCEF2" />
      </linearGradient>
      <linearGradient id="gradient-rw" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F8FAFC" />
        <stop offset="100%" stop-color="#ECEFF2" />
      </linearGradient>

      <!-- Grid Pattern -->
      <pattern id="build-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#build-grid)" rx="8" />

    <!-- ==================== COLUMN 1: DOCKERFILE EDITOR (Monokai Theme) ==================== -->
    <rect x="20" y="20" width="260" height="370" rx="8" fill="#0F1C2A" stroke="#1E293B" stroke-width="1.5" />
    <!-- Editor Header -->
    <rect x="20" y="20" width="260" height="26" rx="4" fill="#1E293B" />
    <circle cx="32" cy="33" r="3.5" fill="#CF5A5A" />
    <circle cx="42" cy="33" r="3.5" fill="#E2A03F" />
    <circle cx="52" cy="33" r="3.5" fill="#158A4E" />
    <text x="64" y="37" font-family="IBM Plex Mono, monospace" font-size="11px" fill="#94A3B8">Dockerfile</text>

    <!-- Line Numbers gutter -->
    <text x="34" y="94" font-family="IBM Plex Mono, monospace" font-size="14px" fill="#475569" text-anchor="end">1</text>
    <text x="34" y="174" font-family="IBM Plex Mono, monospace" font-size="14px" fill="#475569" text-anchor="end">2</text>
    <text x="34" y="254" font-family="IBM Plex Mono, monospace" font-size="14px" fill="#475569" text-anchor="end">3</text>
    <text x="34" y="334" font-family="IBM Plex Mono, monospace" font-size="14px" fill="#475569" text-anchor="end">4</text>
    <line x1="44" y1="50" x2="44" y2="375" stroke="#1E293B" stroke-width="1.5" />

    <!-- Code Editor Highlighted Lines -->
    <g transform="translate(10, 4)">
      <!-- Line 1: FROM -->
      <text x="46" y="90" font-family="IBM Plex Mono, monospace" font-size="16px">
        <tspan fill="#F92672">FROM </tspan>
        <tspan fill="#A6E22E">python</tspan>
        <tspan fill="#F8F8F2">:</tspan>
        <tspan fill="#E6DB74">3.12-slim</tspan>
      </text>
      <!-- Line 2: WORKDIR -->
      <text x="46" y="170" font-family="IBM Plex Mono, monospace" font-size="16px">
        <tspan fill="#F92672">WORKDIR </tspan>
        <tspan fill="#E6DB74">/app</tspan>
      </text>
      <!-- Line 3: COPY -->
      <text x="46" y="250" font-family="IBM Plex Mono, monospace" font-size="16px">
        <tspan fill="#F92672">COPY </tspan>
        <tspan fill="#A6E22E">app.py </tspan>
        <tspan fill="#E6DB74">.</tspan>
      </text>
      <!-- Line 4: CMD -->
      <text x="46" y="330" font-family="IBM Plex Mono, monospace" font-size="16px">
        <tspan fill="#F92672">CMD </tspan>
        <tspan fill="#F8F8F2">[</tspan>
        <tspan fill="#E6DB74">"python"</tspan>
        <tspan fill="#F8F8F2">, </tspan>
        <tspan fill="#E6DB74">"app.py"</tspan>
        <tspan fill="#F8F8F2">]</tspan>
      </text>
    </g>


    <!-- ==================== COLUMN 2: UNIONFS LAYERS STACK ==================== -->
    <!-- Layer 1 (FROM Base Image) -->
    <rect x="310" y="45" width="330" height="50" rx="4" fill="url(#gradient-l1)" stroke="#0088B8" stroke-width="2" />
    <text x="322" y="75" font-family="Outfit, sans-serif" font-weight="800" font-size="12px" fill="#0088B8">Layer 1: Base python OS (+120MB)</text>
    <rect x="532" y="60" width="96" height="20" rx="4" fill="#0088B8" />
    <text x="580" y="74" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="9px" fill="#FFFFFF">BASE IMAGE</text>

    <!-- Layer 2 (WORKDIR Metadata) -->
    <rect x="310" y="110" width="330" height="45" rx="4" fill="url(#gradient-l2)" stroke="#E2A03F" stroke-width="2" />
    <text x="322" y="137" font-family="Outfit, sans-serif" font-weight="800" font-size="12px" fill="#E2A03F">Layer 2: WORKDIR Metadata</text>
    <rect x="532" y="122" width="96" height="20" rx="4" fill="#E2A03F" />
    <text x="580" y="136" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="9px" fill="#FFFFFF">METADATA</text>

    <!-- Layer 3 (COPY App Files) -->
    <rect x="310" y="170" width="330" height="50" rx="4" fill="url(#gradient-l3)" stroke="#158A4E" stroke-width="2" />
    <text x="322" y="200" font-family="Outfit, sans-serif" font-weight="800" font-size="12px" fill="#158A4E">Layer 3: App Code /app (+15MB)</text>
    <rect x="532" y="185" width="96" height="20" rx="4" fill="#158A4E" />
    <text x="580" y="199" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="9px" fill="#FFFFFF">FILESYSTEM</text>

    <!-- Layer 4 (CMD Execution Metadata) -->
    <rect x="310" y="235" width="330" height="45" rx="4" fill="url(#gradient-l4)" stroke="#6B2FA0" stroke-width="2" />
    <text x="322" y="262" font-family="Outfit, sans-serif" font-weight="800" font-size="12px" fill="#6B2FA0">Layer 4: CMD Entrypoint</text>
    <rect x="532" y="247" width="96" height="20" rx="4" fill="#6B2FA0" />
    <text x="580" y="261" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="9px" fill="#FFFFFF">EXECUTION</text>

    <!-- Writable Layer (Container Runtime) -->
    <rect x="310" y="295" width="330" height="50" rx="4" fill="url(#gradient-rw)" stroke="#64748B" stroke-width="1.5" stroke-dasharray="3 3" />
    <text x="322" y="325" font-family="Outfit, sans-serif" font-weight="800" font-size="12px" fill="#475569">Writable Layer (Container Run)</text>
    <rect x="532" y="310" width="96" height="20" rx="4" fill="#64748B" />
    <text x="580" y="324" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="9px" fill="#FFFFFF">READ-WRITE</text>
    
    <text x="475" y="375" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="11px" fill="#64748B">Union File System (UnionFS) Stack</text>


    <!-- ==================== COLUMN 3: TERMINAL WINDOW ==================== -->
    <rect x="670" y="20" width="270" height="370" rx="8" fill="#0F1C2A" stroke="#1E293B" stroke-width="1.5" />
    <!-- Terminal Header -->
    <rect x="670" y="20" width="270" height="26" rx="4" fill="#1E293B" />
    <circle cx="682" cy="33" r="3.5" fill="#CF5A5A" />
    <circle cx="692" cy="33" r="3.5" fill="#E2A03F" />
    <circle cx="702" cy="33" r="3.5" fill="#158A4E" />
    <text x="714" y="37" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#94A3B8">bash (host)</text>

    <!-- Build Output logs -->
    <g transform="translate(682, 0)">
      <text x="0" y="70" font-family="IBM Plex Mono, monospace" font-size="13px" fill="#F8FAFC">
        <tspan fill="#158A4E">❯ </tspan>docker build -t app:local .
      </text>
      
      <text x="0" y="105" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#94A3B8">Step 1/4 : FROM python:3.12-slim</text>
      <text x="0" y="122" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#158A4E"> ---> Using cache</text>
      
      <text x="0" y="157" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#94A3B8">Step 2/4 : WORKDIR /app</text>
      <text x="0" y="174" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#158A4E"> ---> Using cache</text>
      
      <text x="0" y="209" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#94A3B8">Step 3/4 : COPY . /app</text>
      <text x="0" y="226" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#38BDF8"> ---> 7b43ac8b2ee9</text>
      
      <text x="0" y="261" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#94A3B8">Step 4/4 : CMD ["python", "app.py"]</text>
      <text x="0" y="278" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#38BDF8"> ---> Running in 8b06ad3e920d</text>
      <text x="0" y="298" font-family="IBM Plex Mono, monospace" font-size="11px" fill="#64748B"> ---> Removing intermediate container</text>
      
      <text x="0" y="333" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#158A4E">Successfully built 9a4dc8f92bd8</text>
      <text x="0" y="353" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#158A4E">Successfully tagged app:local</text>
    </g>
  </svg>
</template>

<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients for Panels -->
      <linearGradient id="laptop-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#00A8D0" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#0088B8" stop-opacity="0.01" />
      </linearGradient>

      <linearGradient id="container-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#158A4E" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#0F9F90" stop-opacity="0.01" />
      </linearGradient>

      <!-- 3D Corrugation Gradient for Physical Container -->
      <linearGradient id="corrugation-physical" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#073A4F" />
        <stop offset="6%" stop-color="#127C9E" />
        <stop offset="12%" stop-color="#073A4F" />
        <stop offset="13%" stop-color="#073A4F" />
        <stop offset="19%" stop-color="#127C9E" />
        <stop offset="25%" stop-color="#073A4F" />
        <stop offset="26%" stop-color="#073A4F" />
        <stop offset="32%" stop-color="#127C9E" />
        <stop offset="38%" stop-color="#073A4F" />
        <stop offset="39%" stop-color="#073A4F" />
        <stop offset="45%" stop-color="#127C9E" />
        <stop offset="51%" stop-color="#073A4F" />
        <stop offset="52%" stop-color="#073A4F" />
        <stop offset="58%" stop-color="#127C9E" />
        <stop offset="64%" stop-color="#073A4F" />
        <stop offset="65%" stop-color="#073A4F" />
        <stop offset="71%" stop-color="#127C9E" />
        <stop offset="77%" stop-color="#073A4F" />
        <stop offset="78%" stop-color="#073A4F" />
        <stop offset="84%" stop-color="#127C9E" />
        <stop offset="90%" stop-color="#073A4F" />
        <stop offset="91%" stop-color="#073A4F" />
        <stop offset="97%" stop-color="#127C9E" />
        <stop offset="100%" stop-color="#073A4F" />
      </linearGradient>

      <!-- Grid Pattern -->
      <pattern id="analogy-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#analogy-grid)" rx="8" />

    <!-- ==================== LEFT ZONE: SHIPPING CONTAINER ==================== -->
    <rect x="20" y="20" width="430" height="310" rx="12" fill="url(#laptop-grad)" stroke="#0088B8" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="35" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#0088B8" font-size="10px" font-weight="800" letter-spacing="0.05em">PHYSICAL SHIPPING METAPHOR</text>

    <!-- Detailed 3D Physical Container -->
    <g transform="translate(90, 80)">
      <!-- Main Shadow -->
      <rect x="2" y="4" width="280" height="140" rx="6" fill="#0F1C2A" style="opacity: 0.15;" />
      
      <!-- Container Body with Corrugation texture -->
      <rect width="280" height="140" rx="6" fill="url(#corrugation-physical)" stroke="#073A4F" stroke-width="2" />
      
      <!-- Corner Posts & Castings -->
      <rect x="0" y="0" width="12" height="140" fill="#072F40" />
      <rect x="268" y="0" width="12" height="140" fill="#072F40" />
      <!-- Corner castings (metal blocks on corners) -->
      <rect x="0" y="0" width="16" height="14" fill="#05202C" />
      <rect x="264" y="0" width="16" height="14" fill="#05202C" />
      <rect x="0" y="126" width="16" height="14" fill="#05202C" />
      <rect x="264" y="126" width="16" height="14" fill="#05202C" />
      
      <!-- Middle door partition line -->
      <line x1="140" y1="0" x2="140" y2="140" stroke="#05202C" stroke-width="2" />
      
      <!-- Locking rods (vertical metal tubes) -->
      <line x1="100" y1="0" x2="100" y2="140" stroke="#CBD5E1" stroke-width="3" />
      <line x1="180" y1="0" x2="180" y2="140" stroke="#CBD5E1" stroke-width="3" />
      <!-- Latch handles -->
      <rect x="95" y="70" width="15" height="6" fill="#475569" />
      <rect x="175" y="70" width="15" height="6" fill="#475569" />
    </g>

    <!-- Environment Badges (Physical) -->
    <g transform="translate(50, 240)">
      <!-- Fits Ships -->
      <g class="node" transform="translate(0, 0)">
        <rect width="100" height="26" rx="4" fill="#FFFFFF" stroke="#0088B8" stroke-width="1.2" />
        <text x="50" y="17" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#0088B8">FITS SHIPS</text>
      </g>
      <!-- Fits Trains -->
      <g class="node" transform="translate(115, 0)">
        <rect width="100" height="26" rx="4" fill="#FFFFFF" stroke="#0088B8" stroke-width="1.2" />
        <text x="50" y="17" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#0088B8">FITS TRAINS</text>
      </g>
      <!-- Fits Trucks -->
      <g class="node" transform="translate(230, 0)">
        <rect width="100" height="26" rx="4" fill="#FFFFFF" stroke="#0088B8" stroke-width="1.2" />
        <text x="50" y="17" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#0088B8">FITS TRUCKS</text>
      </g>
    </g>
    <text x="235" y="302" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="13px" fill="#073A4F">Standard Box Shape</text>


    <!-- ==================== MIDDLE TRANSITION ARROW ==================== -->
    <g transform="translate(458, 150)">
      <path d="M 5 15 h 34 L 29 5 M 39 15 L 29 25" stroke="#94A3B8" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>


    <!-- ==================== RIGHT ZONE: SOFTWARE CONTAINER ==================== -->
    <rect x="510" y="20" width="430" height="310" rx="12" fill="url(#container-grad)" stroke="#158A4E" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="525" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#158A4E" font-size="10px" font-weight="800" letter-spacing="0.05em">SOFTWARE CONTAINER IMAGE</text>

    <!-- Software Container containing Crates -->
    <g transform="translate(580, 80)">
      <!-- Container Outer Wireframe Shell -->
      <rect width="280" height="140" rx="6" fill="rgba(255,255,255,0.7)" stroke="#158A4E" stroke-dasharray="4 2" stroke-width="1.5" />
      
      <!-- Crate 1: Application (Purple) -->
      <g transform="translate(15, 12)">
        <rect width="250" height="34" rx="4" fill="rgba(107, 47, 160, 0.08)" stroke="#6B2FA0" stroke-width="1.2" />
        <path d="M 0 0 h 6 v 34 H 0 Z" fill="#6B2FA0" />
        <text x="15" y="21" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="10px" fill="#6B2FA0">Application Code</text>
      </g>

      <!-- Crate 2: Dependencies (Green) -->
      <g transform="translate(15, 53)">
        <rect width="250" height="34" rx="4" fill="rgba(21, 138, 78, 0.08)" stroke="#158A4E" stroke-width="1.2" />
        <path d="M 0 0 h 6 v 34 H 0 Z" fill="#158A4E" />
        <text x="15" y="21" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="10px" fill="#158A4E">Dependencies & Libraries</text>
      </g>

      <!-- Crate 3: Config / OS Runtime (Blue) -->
      <g transform="translate(15, 94)">
        <rect width="250" height="34" rx="4" fill="rgba(0, 136, 184, 0.08)" stroke="#0088B8" stroke-width="1.2" />
        <path d="M 0 0 h 6 v 34 H 0 Z" fill="#0088B8" />
        <text x="15" y="21" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="10px" fill="#0088B8">System Configuration + OS Runtime</text>
      </g>
    </g>

    <!-- Target Environment Badges (Software) -->
    <g transform="translate(540, 240)">
      <!-- Fits Laptops -->
      <g class="node" transform="translate(0, 0)">
        <rect width="100" height="26" rx="4" fill="#FFFFFF" stroke="#158A4E" stroke-width="1.2" />
        <text x="50" y="17" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#158A4E">LAPTOPS</text>
      </g>
      <!-- Fits Pipelines -->
      <g class="node" transform="translate(115, 0)">
        <rect width="100" height="26" rx="4" fill="#FFFFFF" stroke="#158A4E" stroke-width="1.2" />
        <text x="50" y="17" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#158A4E">CI/CD BUILDERS</text>
      </g>
      <!-- Fits Clusters -->
      <g class="node" transform="translate(230, 0)">
        <rect width="100" height="26" rx="4" fill="#FFFFFF" stroke="#158A4E" stroke-width="1.2" />
        <text x="50" y="17" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#158A4E">K8S CLUSTERS</text>
      </g>
    </g>
    <text x="725" y="302" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="13px" fill="#0F9F90">Standard Software Box</text>


    <!-- ==================== BOTTOM COMMON BANNER ==================== -->
    <g transform="translate(20, 350)">
      <rect width="920" height="40" rx="6" fill="rgba(0, 136, 184, 0.08)" stroke="rgba(0, 136, 184, 0.25)" stroke-width="1" />
      <path d="M 0 0 h 4 v 40 H 0 Z" fill="#0088B8" />
      
      <!-- Info Icon -->
      <g transform="translate(18, 12)">
        <circle cx="8" cy="8" r="7" fill="none" stroke="#0088B8" stroke-width="1.5" />
        <line x1="8" y1="5" x2="8" y2="5" stroke="#0088B8" stroke-width="2" stroke-linecap="round" />
        <line x1="8" y1="8" x2="8" y2="11" stroke="#0088B8" stroke-width="1.5" stroke-linecap="round" />
      </g>
      
      <text x="44" y="24" font-family="Outfit, sans-serif" font-weight="700" font-size="13px" fill="#0088B8">Same Shape: move, stack, and route without knowing or caring what is inside</text>
    </g>
  </svg>
</template>

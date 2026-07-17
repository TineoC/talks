<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 330" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="vm-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#CF5A5A" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#B83D3D" stop-opacity="0.01" />
      </linearGradient>

      <linearGradient id="container-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#158A4E" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#0F9F90" stop-opacity="0.01" />
      </linearGradient>

      <!-- Grid Pattern -->
      <pattern id="vs-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#E2E8F0" />
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#vs-grid)" rx="8" />

    <!-- ==================== LEFT HALF: VIRTUAL MACHINES ==================== -->
    <rect x="25" y="20" width="415" height="290" rx="12" fill="url(#vm-grad)" stroke="#B83D3D" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="40" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#B83D3D" font-size="11px" font-weight="800" letter-spacing="0.05em">VIRTUAL MACHINES (VM)</text>

    <!-- VM Infrastructure Stack -->
    <!-- 1. Infrastructure -->
    <rect x="60" y="225" width="345" height="35" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.2" />
    <text x="232" y="246" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#475569">Infrastructure (Hardware / Host OS)</text>

    <!-- 2. Hypervisor -->
    <rect x="60" y="180" width="345" height="35" rx="6" fill="#FCEAEA" stroke="#E8B4B4" stroke-width="1.2" />
    <text x="232" y="201" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#B83D3D">Hypervisor (VMware ESXi / KVM / Hyper-V)</text>

    <!-- 3. VMs (Left VM) -->
    <rect x="60" y="65" width="165" height="105" rx="6" fill="#FFFFFF" stroke="#E8B4B4" stroke-width="1.2" />
    <rect x="60" y="65" width="165" height="4" rx="2" fill="#B83D3D" />
    <!-- VM 1 Guest OS -->
    <rect x="70" y="125" width="145" height="35" rx="4" fill="#FCEAEA" stroke="#E8B4B4" />
    <text x="142" y="146" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#B83D3D">Guest OS Kernel (Full OS)</text>
    <!-- VM 1 App -->
    <rect x="70" y="80" width="145" height="35" rx="4" fill="#FEF5F5" stroke="#E8B4B4" />
    <text x="142" y="101" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#B83D3D">App 1 + Binaries / Libs</text>

    <!-- 3. VMs (Right VM) -->
    <rect x="240" y="65" width="165" height="105" rx="6" fill="#FFFFFF" stroke="#E8B4B4" stroke-width="1.2" />
    <rect x="240" y="65" width="165" height="4" rx="2" fill="#B83D3D" />
    <!-- VM 2 Guest OS -->
    <rect x="250" y="125" width="145" height="35" rx="4" fill="#FCEAEA" stroke="#E8B4B4" />
    <text x="322" y="146" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#B83D3D">Guest OS Kernel (Full OS)</text>
    <!-- VM 2 App -->
    <rect x="250" y="80" width="145" height="35" rx="4" fill="#FEF5F5" stroke="#E8B4B4" />
    <text x="322" y="101" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#B83D3D">App 2 + Binaries / Libs</text>

    <!-- VM Summary label -->
    <text x="232" y="295" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="9px" fill="#64748B">Heavy (GBs) · Slow boot (mins) · Redundant kernels</text>


    <!-- ==================== MIDDLE SEPARATOR ==================== -->
    <circle cx="480" cy="165" r="18" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="480" y="170" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="13px" fill="#475569">VS</text>


    <!-- ==================== RIGHT HALF: CONTAINERS ==================== -->
    <rect x="520" y="20" width="415" height="290" rx="12" fill="url(#container-grad)" stroke="#158A4E" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="535" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#158A4E" font-size="11px" font-weight="800" letter-spacing="0.05em">CONTAINERS (SHARED KERNEL)</text>

    <!-- Container Infrastructure Stack -->
    <!-- 1. Infrastructure & Host OS -->
    <rect x="555" y="225" width="345" height="35" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.2" />
    <text x="727" y="246" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#475569">Infrastructure + Host OS (Single Shared Kernel)</text>

    <!-- 2. Container Engine -->
    <rect x="555" y="180" width="345" height="35" rx="6" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
    <text x="727" y="201" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#158A4E">Container Runtime (Docker / containerd / CRI)</text>

    <!-- 3. Stacked Containers -->
    <!-- Container 1 -->
    <rect x="555" y="65" width="105" height="105" rx="6" fill="#FFFFFF" stroke="#A8D5BE" stroke-width="1.2" />
    <rect x="555" y="65" width="105" height="4" rx="2" fill="#158A4E" />
    <!-- Container 1 Libs -->
    <rect x="565" y="125" width="85" height="35" rx="4" fill="#EDF8F2" stroke="#A8D5BE" />
    <text x="607" y="146" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#158A4E">Binaries / Libs</text>
    <!-- Container 1 App -->
    <rect x="565" y="80" width="85" height="35" rx="4" fill="#EDF8F2" stroke="#A8D5BE" />
    <text x="607" y="101" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#158A4E">App 1</text>

    <!-- Container 2 -->
    <rect x="675" y="65" width="105" height="105" rx="6" fill="#FFFFFF" stroke="#A8D5BE" stroke-width="1.2" />
    <rect x="675" y="65" width="105" height="4" rx="2" fill="#158A4E" />
    <!-- Container 2 Libs -->
    <rect x="685" y="125" width="85" height="35" rx="4" fill="#EDF8F2" stroke="#A8D5BE" />
    <text x="727" y="146" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#158A4E">Binaries / Libs</text>
    <!-- Container 2 App -->
    <rect x="685" y="80" width="85" height="35" rx="4" fill="#EDF8F2" stroke="#A8D5BE" />
    <text x="727" y="101" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#158A4E">App 2</text>

    <!-- Container 3 -->
    <rect x="795" y="65" width="105" height="105" rx="6" fill="#FFFFFF" stroke="#A8D5BE" stroke-width="1.2" />
    <rect x="795" y="65" width="105" height="4" rx="2" fill="#158A4E" />
    <!-- Container 3 Libs -->
    <rect x="805" y="125" width="85" height="35" rx="4" fill="#EDF8F2" stroke="#A8D5BE" />
    <text x="847" y="146" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#158A4E">Binaries / Libs</text>
    <!-- Container 3 App -->
    <rect x="805" y="80" width="85" height="35" rx="4" fill="#EDF8F2" stroke="#A8D5BE" />
    <text x="847" y="101" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#158A4E">App 3</text>

    <!-- Container Summary label -->
    <text x="727" y="295" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="9px" fill="#64748B">Lightweight (MBs) · Instant boot (secs) · Shared Kernel</text>
  </svg>
</template>

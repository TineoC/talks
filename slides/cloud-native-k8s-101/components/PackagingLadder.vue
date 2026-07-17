<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients for Panels -->
      <linearGradient id="vm-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#CF5A5A" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#B83D3D" stop-opacity="0.01" />
      </linearGradient>

      <linearGradient id="container-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#00A8D0" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#0088B8" stop-opacity="0.01" />
      </linearGradient>

      <linearGradient id="k8s-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#8B4FB0" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#6B2FA0" stop-opacity="0.01" />
      </linearGradient>

      <!-- Grid Pattern -->
      <pattern id="ladder-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#ladder-grid)" rx="8" />

    <!-- ==================== COLUMN 1: VIRTUAL MACHINE ==================== -->
    <rect x="20" y="20" width="280" height="320" rx="12" fill="url(#vm-panel)" stroke="#CF5A5A" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="35" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#CF5A5A" font-size="10px" font-weight="800" letter-spacing="0.05em">01 · VIRTUAL MACHINE</text>

    <g transform="translate(40, 60)">
      <!-- App Layer -->
      <rect width="240" height="36" rx="6" fill="#FFFFFF" stroke="#CF5A5A" stroke-width="1.2" />
      <text x="120" y="22" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#CF5A5A">App 1 (Application Code)</text>

      <!-- Guest OS Layer -->
      <rect y="46" width="240" height="66" rx="6" fill="#FEF5F5" stroke="#E8B4B4" stroke-width="1.5" />
      <text x="120" y="76" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#CF5A5A">Guest OS (Heavy Kernel Space)</text>
      <rect x="10" y="90" width="220" height="12" rx="3" fill="#CF5A5A" />
      <text x="120" y="99" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7px" fill="#FFFFFF">Redundant OS footprint (GBs)</text>

      <!-- Hypervisor Layer -->
      <rect y="122" width="240" height="36" rx="6" fill="#FFFBF5" stroke="#E2A03F" stroke-width="1.2" />
      <text x="120" y="144" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9.5px" fill="#E2A03F">Hypervisor (ESXi / KVM)</text>

      <!-- Host Infrastructure -->
      <rect y="168" width="240" height="36" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.2" />
      <text x="120" y="190" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9.5px" fill="#475569">Physical Server Hardware</text>
    </g>
    
    <text x="160" y="292" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11.5px" fill="#CF5A5A">Virtualize the Hardware</text>
    <text x="160" y="310" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">Runs a full Guest OS per application</text>


    <!-- VM to Container Transition -->
    <g transform="translate(308, 150)">
      <path d="M 5 15 h 30 L 25 5 M 35 15 L 25 25" stroke="#94A3B8" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>


    <!-- ==================== COLUMN 2: CONTAINER ==================== -->
    <rect x="340" y="20" width="280" height="320" rx="12" fill="url(#container-panel)" stroke="#0088B8" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="355" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#0088B8" font-size="10px" font-weight="800" letter-spacing="0.05em">02 · CONTAINER</text>

    <g transform="translate(360, 60)">
      <!-- App + Libs package -->
      <rect width="240" height="66" rx="6" fill="#FFFFFF" stroke="#158A4E" stroke-width="1.5" />
      <rect width="240" height="4" rx="2" fill="#158A4E" />
      <text x="120" y="24" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#158A4E">App 1 + Binaries & Libraries</text>
      <rect x="10" y="36" width="220" height="18" rx="3" fill="#EDF8F2" stroke="#A8D5BE" />
      <text x="120" y="48" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#158A4E">Self-contained footprint (MBs)</text>

      <!-- Container Runtime -->
      <rect y="76" width="240" height="36" rx="6" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
      <text x="120" y="98" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9.5px" fill="#158A4E">Container Engine / containerd</text>

      <!-- Shared Host Kernel OS -->
      <rect y="122" width="240" height="82" rx="6" fill="#E8F4FA" stroke="#0088B8" stroke-width="1.2" />
      <text x="120" y="160" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#0088B8">Shared Host OS Kernel</text>
      <line x1="15" y1="172" x2="225" y2="172" stroke="#A8D0E0" stroke-width="1" />
      <text x="120" y="188" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8px" fill="#0088B8">(Hardware Host)</text>
    </g>

    <text x="480" y="292" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11.5px" fill="#0088B8">Virtualize the OS</text>
    <text x="480" y="310" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">Isolates processes sharing host kernel</text>


    <!-- Container to K8s Transition -->
    <g transform="translate(628, 150)">
      <path d="M 5 15 h 30 L 25 5 M 35 15 L 25 25" stroke="#94A3B8" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>


    <!-- ==================== COLUMN 3: PLATFORM (KUBERNETES) ==================== -->
    <rect x="660" y="20" width="280" height="320" rx="12" fill="url(#k8s-panel)" stroke="#8B4FB0" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="675" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#8B4FB0" font-size="10px" font-weight="800" letter-spacing="0.05em">03 · PLATFORM (K8S)</text>

    <g transform="translate(680, 60)">
      <!-- Orchestrated cluster Pods container -->
      <rect width="240" height="102" rx="6" fill="#FFFFFF" stroke="#8B4FB0" stroke-width="1.5" />
      <rect width="240" height="4" rx="2" fill="#8B4FB0" />
      <text x="120" y="22" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#8B4FB0">Orchestrated Replicas (Pods)</text>
      
      <!-- Replicas indicators -->
      <g transform="translate(10, 34)">
        <!-- Pod A -->
        <rect x="5" y="5" width="60" height="24" rx="3" fill="#EDF8F2" stroke="#158A4E" />
        <text x="35" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8px" fill="#158A4E">App Pod 1</text>
        
        <!-- Pod B -->
        <rect x="75" y="5" width="60" height="24" rx="3" fill="#EDF8F2" stroke="#158A4E" />
        <text x="105" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8px" fill="#158A4E">App Pod 2</text>
        
        <!-- Pod C (Redis Cache datastore) -->
        <rect x="145" y="5" width="65" height="24" rx="3" fill="#E8F4FA" stroke="#0088B8" />
        <text x="177" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8px" fill="#0088B8">Redis Pod</text>
        
        <!-- Auto-healing / scheduling line -->
        <rect x="5" y="38" width="205" height="15" rx="3" fill="#F0E8FA" stroke="#DFCEF2" />
        <text x="107" y="48" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7px" fill="#8B4FB0">Auto-Healing / Declarative State</text>
      </g>

      <!-- Declarative Scheduler / Control Plane API -->
      <rect y="112" width="240" height="36" rx="6" fill="#F0E8FA" stroke="#DFCEF2" stroke-width="1.2" />
      <text x="120" y="134" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9.5px" fill="#8B4FB0">Declarative API Control Plane</text>

      <!-- Infrastructure cluster nodes -->
      <rect y="158" width="240" height="46" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.2" />
      <text x="120" y="180" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9.5px" fill="#475569">Cluster Worker Nodes</text>
      <text x="120" y="194" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8px" fill="#94A3B8">(Node A + Node B + Node C)</text>
    </g>

    <text x="800" y="292" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11.5px" fill="#8B4FB0">Virtualize the Cluster</text>
    <text x="800" y="310" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">Heals & balances apps across multiple nodes</text>


    <!-- ==================== BOTTOM DECORATIVE PROGRESSION BANNER ==================== -->
    <g transform="translate(20, 360)">
      <rect width="920" height="34" rx="6" fill="rgba(139, 79, 176, 0.08)" stroke="rgba(139, 79, 176, 0.2)" stroke-width="1" />
      <path d="M 0 0 h 4 v 34 H 0 Z" fill="#8B4FB0" />
      
      <!-- Info Icon -->
      <g transform="translate(18, 9)">
        <circle cx="8" cy="8" r="7" fill="none" stroke="#8B4FB0" stroke-width="1.5" />
        <line x1="8" y1="5" x2="8" y2="5" stroke="#8B4FB0" stroke-width="2" stroke-linecap="round" />
        <line x1="8" y1="8" x2="8" y2="11" stroke="#8B4FB0" stroke-width="1.5" stroke-linecap="round" />
      </g>
      
      <text x="44" y="21" font-family="Outfit, sans-serif" font-weight="700" font-size="11.5px" fill="#8B4FB0">Evolution: Hardware Virtualization (VMs) ➜ OS Process Virtualization (Containers) ➜ Platform Scheduling (Kubernetes)</text>
    </g>
  </svg>
</template>

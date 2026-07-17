<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="namespace-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#158A4E" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#0F9F90" stop-opacity="0.01" />
      </linearGradient>

      <linearGradient id="cgroup-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#E2A03F" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#FF9F1C" stop-opacity="0.01" />
      </linearGradient>

      <!-- Grid Pattern -->
      <pattern id="kernel-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#kernel-grid)" rx="8" />

    <!-- ==================== LEFT HALF: NAMESPACES ==================== -->
    <rect x="20" y="20" width="430" height="350" rx="12" fill="url(#namespace-grad)" stroke="#158A4E" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="35" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#158A4E" font-size="10px" font-weight="800" letter-spacing="0.05em">NAMESPACES: ISOLATE WHAT YOU SEE</text>

    <!-- Host Processes Context (Unseen by Namespace) -->
    <g transform="translate(45, 70)">
      <rect width="100" height="150" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" />
      <text x="50" y="18" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#475569">Host OS Space</text>
      
      <!-- Other processes on Host -->
      <g transform="translate(10, 30)">
        <rect width="80" height="22" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
        <text x="10" y="14" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#64748B">PID 8941 (MySQL)</text>
      </g>
      <g transform="translate(10, 60)">
        <rect width="80" height="22" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
        <text x="10" y="14" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#64748B">PID 8942 (SSHd)</text>
      </g>
      <g transform="translate(10, 90)">
        <rect width="80" height="22" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
        <text x="10" y="14" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#64748B">PID 8943 (Nginx)</text>
      </g>
      <text x="50" y="136" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7px" fill="#94A3B8">PID 8944 (Container)</text>
    </g>

    <!-- Invisible Shield Barrier -->
    <g transform="translate(158, 125)">
      <circle cx="10" cy="10" r="12" fill="#FFFFFF" stroke="#158A4E" stroke-width="1.5" />
      <path d="M 7 11 V 8 a 3 3 0 0 1 6 0 v 3 M 6 11 h 8 v 5 H 6 Z" stroke="#158A4E" stroke-width="1" fill="none" />
    </g>
    <path d="M 158 85 L 158 205" stroke="#158A4E" stroke-width="1.5" stroke-dasharray="3 3" />

    <!-- Namespace Isolation box -->
    <g transform="translate(195, 70)">
      <rect width="235" height="150" rx="8" fill="#FFFFFF" stroke="#158A4E" stroke-width="2" stroke-dasharray="4 4" />
      <text x="117" y="18" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#158A4E">Virtual Container Namespace</text>
      
      <!-- Isolated Process #42 -->
      <g transform="translate(15, 30)">
        <rect width="205" height="95" rx="6" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
        <text x="12" y="20" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#0f1c2a">Container Process (PID 8944)</text>
        <line x1="12" y1="28" x2="193" y2="28" stroke="#A8D5BE" stroke-width="1" />
        
        <!-- Virtualized Views inside namespace -->
        <text x="12" y="44" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#158A4E">✔ PID Namespace ➜ Sees itself as PID 1</text>
        <text x="12" y="58" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#158A4E">✔ NET Namespace ➜ Isolated eth0 interface</text>
        <text x="12" y="72" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#158A4E">✔ MNT Namespace ➜ Isolated root dir /app</text>
        <text x="12" y="86" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#158A4E">✔ UTS Namespace ➜ Isolated hostname: app-node</text>
      </g>
    </g>

    <!-- Namespace Setup Terminal (Code snippet) -->
    <g transform="translate(45, 245)">
      <rect width="380" height="110" rx="6" fill="#0F1C2A" stroke="#1E293B" stroke-width="1.5" />
      <rect width="380" height="18" rx="4" fill="#1E293B" />
      <circle cx="8" cy="9" r="2.5" fill="#CF5A5A" />
      <circle cx="16" cy="9" r="2.5" fill="#E2A03F" />
      <circle cx="24" cy="9" r="2.5" fill="#158A4E" />
      <text x="34" y="12" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#94A3B8">bash (host)</text>
      
      <text x="15" y="40" font-family="IBM Plex Mono, monospace" font-size="10px" fill="#158A4E"># Create isolated namespaces</text>
      <text x="15" y="60" font-family="IBM Plex Mono, monospace" font-size="10px" fill="#00A8D0"><tspan fill="#F8FAFC">unshare </tspan>--fork --pid --net --mount-proc bash</text>
      <text x="15" y="80" font-family="IBM Plex Mono, monospace" font-size="9px" fill="#64748B"># New shell processes are jailed in container view</text>
    </g>


    <!-- ==================== MIDDLE CONNECTOR ==================== -->
    <circle cx="478" cy="185" r="16" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="478" y="190" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="14px" fill="#64748B">+</text>


    <!-- ==================== RIGHT HALF: CGROUPS ==================== -->
    <rect x="505" y="20" width="435" height="350" rx="12" fill="url(#cgroup-grad)" stroke="#E2A03F" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="520" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#E2A03F" font-size="10px" font-weight="800" letter-spacing="0.05em">CGROUPS: LIMIT WHAT YOU USE</text>

    <!-- Process Box on cgroups side -->
    <g class="node" transform="translate(530, 90)">
      <rect width="125" height="110" rx="6" fill="#FFFFFF" stroke="#F3C68F" stroke-width="1.5" />
      <path d="M 0 0 h 125 v 4 H 0 Z" fill="#E2A03F" />
      
      <text x="12" y="25" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#0f1c2a">Container Process</text>
      <text x="12" y="38" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#5a6a7a">PID 8944</text>
      
      <line x1="12" y1="48" x2="113" y2="48" stroke="#F3C68F" stroke-width="1" />
      
      <text x="12" y="65" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Requesting resources...</text>
      <path d="M 20 85 h 90 L 100 80 M 110 85 L 100 90" stroke="#E2A03F" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <!-- Clamp / Governor valve graphic -->
    <g transform="translate(670, 125)">
      <circle cx="10" cy="15" r="8" fill="#FFFFFF" stroke="#E2A03F" stroke-width="2" />
      <line x1="10" y1="2" x2="10" y2="10" stroke="#E2A03F" stroke-width="2.5" />
      <line x1="4" y1="2" x2="16" y2="2" stroke="#E2A03F" stroke-width="2.5" stroke-linecap="round" />
      <path d="M -6 -10 h 5 v 50 h -5" stroke="#CBD5E1" stroke-width="1.5" fill="none" />
    </g>

    <!-- cgroups meters (CPU, memory, disk I/O limiters) -->
    <g transform="translate(710, 65)">
      <g transform="translate(0, 0)">
        <text x="0" y="12" font-family="Outfit, sans-serif" font-weight="700" font-size="8px" fill="#0f1c2a">CPU: MAX 50% (1 CORE LIMIT)</text>
        <rect y="18" width="200" height="10" rx="3" fill="#E2E8F0" />
        <rect y="18" width="100" height="10" rx="3" fill="#E2A03F" />
      </g>
      <g transform="translate(0, 50)">
        <text x="0" y="12" font-family="Outfit, sans-serif" font-weight="700" font-size="8px" fill="#0f1c2a">MEMORY: MAX 512MB (OOM ENFORCED)</text>
        <rect y="18" width="200" height="10" rx="3" fill="#E2E8F0" />
        <rect y="18" width="150" height="10" rx="3" fill="#CF5A5A" />
      </g>
      <g transform="translate(0, 100)">
        <text x="0" y="12" font-family="Outfit, sans-serif" font-weight="700" font-size="8px" fill="#0f1c2a">DISK I/O: MAX 10MB/S (THROTTLED)</text>
        <rect y="18" width="200" height="10" rx="3" fill="#E2E8F0" />
        <rect y="18" width="50" height="10" rx="3" fill="#64748B" />
      </g>
    </g>

    <!-- cgroups Setup Terminal (Code snippet) -->
    <g transform="translate(530, 245)">
      <rect width="380" height="110" rx="6" fill="#0F1C2A" stroke="#1E293B" stroke-width="1.5" />
      <rect width="380" height="18" rx="4" fill="#1E293B" />
      <circle cx="8" cy="9" r="2.5" fill="#CF5A5A" />
      <circle cx="16" cy="9" r="2.5" fill="#E2A03F" />
      <circle cx="24" cy="9" r="2.5" fill="#158A4E" />
      <text x="34" y="12" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#94A3B8">bash (host)</text>
      
      <text x="15" y="40" font-family="IBM Plex Mono, monospace" font-size="10px" fill="#E2A03F"># Restrict RAM & register process ID</text>
      <text x="15" y="60" font-family="IBM Plex Mono, monospace" font-size="10px" fill="#F8FAFC">echo "512M" &gt; /sys/fs/cgroup/memory.max</text>
      <text x="15" y="80" font-family="IBM Plex Mono, monospace" font-size="10px" fill="#F8FAFC">echo $PID &gt; /sys/fs/cgroup/cgroup.procs</text>
    </g>
  </svg>
</template>

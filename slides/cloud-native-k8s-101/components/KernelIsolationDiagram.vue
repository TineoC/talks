<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="namespace-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#158A4E" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#158A4E" stop-opacity="0.02" />
      </linearGradient>
      <linearGradient id="cgroup-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#E2A03F" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#E2A03F" stop-opacity="0.02" />
      </linearGradient>
      <pattern id="kernel-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#kernel-grid)" rx="8" />

    <!-- LEFT: NAMESPACES -->
    <rect x="18" y="16" width="448" height="368" rx="10" fill="url(#namespace-grad)" stroke="#158A4E" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="34" y="38" font-family="Outfit, sans-serif" fill="#158A4E" font-size="11px" font-weight="800" letter-spacing="0.06em">NAMESPACES · isolate what you see</text>

    <!-- Host OS -->
    <g transform="translate(36, 56)">
      <rect width="118" height="148" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" />
      <text x="59" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#475569">Host OS</text>
      <g transform="translate(12, 32)">
        <rect width="94" height="24" rx="4" fill="#fff" stroke="#CBD5E1" />
        <text x="8" y="16" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#64748B">PID 8941 mysql</text>
      </g>
      <g transform="translate(12, 64)">
        <rect width="94" height="24" rx="4" fill="#fff" stroke="#CBD5E1" />
        <text x="8" y="16" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#64748B">PID 8942 sshd</text>
      </g>
      <g transform="translate(12, 96)">
        <rect width="94" height="24" rx="4" fill="#fff" stroke="#CBD5E1" />
        <text x="8" y="16" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#64748B">PID 8943 nginx</text>
      </g>
    </g>

    <!-- Barrier + centered lock -->
    <line x1="168" y1="72" x2="168" y2="188" stroke="#158A4E" stroke-width="1.5" stroke-dasharray="3 3" />
    <g transform="translate(168, 130)">
      <circle r="15" fill="#fff" stroke="#158A4E" stroke-width="1.8" />
      <!-- padlock: shackle + body, centered on (0,0) -->
      <path
        d="M -4.5 -1.5 v -3.2 a 4.5 4.5 0 0 1 9 0 v 3.2"
        fill="none"
        stroke="#158A4E"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <rect x="-6.5" y="-1.5" width="13" height="10" rx="1.8" fill="#158A4E" />
      <circle cx="0" cy="3.2" r="1.4" fill="#fff" />
    </g>

    <!-- Namespace box -->
    <g transform="translate(192, 56)">
      <rect width="256" height="148" rx="8" fill="#fff" stroke="#158A4E" stroke-width="2" />
      <text x="128" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#158A4E">Container namespace</text>

      <g transform="translate(12, 32)">
        <rect width="232" height="102" rx="6" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
        <text x="12" y="18" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0F1C2A">Process · host PID 8944</text>
        <line x1="12" y1="26" x2="220" y2="26" stroke="#A8D5BE" stroke-width="1" />

        <text x="12" y="44" font-family="IBM Plex Mono, monospace" font-size="9px" fill="#158A4E">PID  →  sees itself as PID 1</text>
        <text x="12" y="60" font-family="IBM Plex Mono, monospace" font-size="9px" fill="#158A4E">NET  →  private eth0</text>
        <text x="12" y="76" font-family="IBM Plex Mono, monospace" font-size="9px" fill="#158A4E">MNT  →  own root /app</text>
        <text x="12" y="92" font-family="IBM Plex Mono, monospace" font-size="9px" fill="#158A4E">UTS  →  hostname app-node</text>
      </g>
    </g>

    <!-- Namespace terminal -->
    <g transform="translate(36, 222)">
      <rect width="412" height="144" rx="6" fill="#0F1C2A" stroke="#1E293B" stroke-width="1.5" />
      <rect width="412" height="20" rx="4" fill="#1E293B" />
      <circle cx="10" cy="10" r="3" fill="#CF5A5A" />
      <circle cx="20" cy="10" r="3" fill="#E2A03F" />
      <circle cx="30" cy="10" r="3" fill="#158A4E" />
      <text x="42" y="14" font-family="IBM Plex Mono, monospace" font-size="11px" fill="#94A3B8">bash · host</text>

      <text x="16" y="48" font-family="IBM Plex Mono, monospace" font-size="13px" fill="#158A4E"># create isolated namespaces</text>
      <text x="16" y="72" font-family="IBM Plex Mono, monospace" font-size="13px" fill="#F8FAFC">unshare --fork --pid --net --mount-proc bash</text>
      <text x="16" y="96" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#64748B"># new shell only sees its own PID / net / mounts</text>
      <text x="16" y="120" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#00A8D0">echo $$   <tspan fill="#64748B"># → 1 inside the jail</tspan></text>
    </g>

    <!-- CENTER + -->
    <circle cx="480" cy="168" r="15" fill="#fff" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="480" y="173" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="16px" fill="#64748B">+</text>

    <!-- RIGHT: CGROUPS -->
    <rect x="494" y="16" width="448" height="368" rx="10" fill="url(#cgroup-grad)" stroke="#E2A03F" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="510" y="38" font-family="Outfit, sans-serif" fill="#E2A03F" font-size="11px" font-weight="800" letter-spacing="0.06em">CGROUPS · limit what you use</text>

    <!-- Process requesting resources -->
    <g transform="translate(514, 62)">
      <rect width="130" height="118" rx="6" fill="#fff" stroke="#F3C68F" stroke-width="1.5" />
      <rect width="130" height="5" rx="2" fill="#E2A03F" />
      <text x="12" y="28" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0F1C2A">Container</text>
      <text x="12" y="44" font-family="IBM Plex Mono, monospace" font-size="9px" fill="#64748B">PID 8944</text>
      <line x1="12" y1="54" x2="118" y2="54" stroke="#F3C68F" stroke-width="1" />
      <text x="12" y="74" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">needs CPU,</text>
      <text x="12" y="90" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">RAM, disk I/O…</text>
      <path d="M 18 104 h 78 l -5 -4 m 5 4 l -5 4" stroke="#E2A03F" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <!-- Centered clock (CPU time / scheduling metaphor) -->
    <g transform="translate(670, 118)">
      <circle r="16" fill="#fff" stroke="#E2A03F" stroke-width="2" />
      <!-- clock hands from center -->
      <line x1="0" y1="0" x2="0" y2="-8" stroke="#E2A03F" stroke-width="2" stroke-linecap="round" />
      <line x1="0" y1="0" x2="6" y2="3" stroke="#0F1C2A" stroke-width="1.6" stroke-linecap="round" />
      <circle r="1.8" fill="#E2A03F" />
      <!-- tick marks -->
      <line x1="0" y1="-12.5" x2="0" y2="-10.5" stroke="#E2A03F" stroke-width="1.4" />
      <line x1="0" y1="10.5" x2="0" y2="12.5" stroke="#E2A03F" stroke-width="1.4" />
      <line x1="-12.5" y1="0" x2="-10.5" y2="0" stroke="#E2A03F" stroke-width="1.4" />
      <line x1="10.5" y1="0" x2="12.5" y2="0" stroke="#E2A03F" stroke-width="1.4" />
    </g>

    <!-- Limit meters -->
    <g transform="translate(698, 58)">
      <text x="0" y="12" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#0F1C2A">CPU · max 50%</text>
      <rect y="18" width="220" height="11" rx="3" fill="#E2E8F0" />
      <rect y="18" width="110" height="11" rx="3" fill="#E2A03F" />

      <text x="0" y="56" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#0F1C2A">Memory · max 512MB</text>
      <rect y="62" width="220" height="11" rx="3" fill="#E2E8F0" />
      <rect y="62" width="165" height="11" rx="3" fill="#CF5A5A" />

      <text x="0" y="100" font-family="Outfit, sans-serif" font-weight="700" font-size="10px" fill="#0F1C2A">Disk I/O · max 10MB/s</text>
      <rect y="106" width="220" height="11" rx="3" fill="#E2E8F0" />
      <rect y="106" width="55" height="11" rx="3" fill="#64748B" />
    </g>

    <!-- cgroups terminal — limit a specific process -->
    <g transform="translate(514, 210)">
      <rect width="412" height="156" rx="6" fill="#0F1C2A" stroke="#1E293B" stroke-width="1.5" />
      <rect width="412" height="20" rx="4" fill="#1E293B" />
      <circle cx="10" cy="10" r="3" fill="#CF5A5A" />
      <circle cx="20" cy="10" r="3" fill="#E2A03F" />
      <circle cx="30" cy="10" r="3" fill="#158A4E" />
      <text x="42" y="14" font-family="IBM Plex Mono, monospace" font-size="11px" fill="#94A3B8">bash · limit PID 8944</text>

      <text x="14" y="42" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#E2A03F"># create a cgroup, then jail one process</text>
      <text x="14" y="62" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#F8FAFC">mkdir /sys/fs/cgroup/shop</text>
      <text x="14" y="82" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#F8FAFC">echo 512M &gt; /sys/fs/cgroup/shop/memory.max</text>
      <text x="14" y="102" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#F8FAFC">echo "50000 100000" &gt; /sys/fs/cgroup/shop/cpu.max</text>
      <text x="14" y="122" font-family="IBM Plex Mono, monospace" font-size="12px" fill="#F8FAFC">echo 8944 &gt; /sys/fs/cgroup/shop/cgroup.procs</text>
      <text x="14" y="142" font-family="IBM Plex Mono, monospace" font-size="11px" fill="#64748B"># 50% of 1 CPU · 512MB RAM · PID 8944 only</text>
    </g>
  </svg>
</template>

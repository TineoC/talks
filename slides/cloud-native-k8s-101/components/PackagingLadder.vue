<template>
  <svg
    class="diagram diagram-lg ladder"
    viewBox="0 0 960 410"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="From virtual machines to containers to Kubernetes"
  >
    <defs>
      <linearGradient id="vm-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#CF5A5A" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#B83D3D" stop-opacity="0.02" />
      </linearGradient>
      <linearGradient id="container-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#00A8D0" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#0088B8" stop-opacity="0.02" />
      </linearGradient>
      <linearGradient id="k8s-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#158A4E" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#0F1C2A" stop-opacity="0.03" />
      </linearGradient>
      <pattern id="ladder-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#ladder-grid)" rx="8" />

    <!-- Step progress -->
    <g class="step-rail" transform="translate(20, 8)">
      <text
        font-family="IBM Plex Mono, monospace"
        font-size="10"
        font-weight="700"
        fill="#0088B8"
        letter-spacing="0.08em"
      >{{ progressLabel }}</text>
    </g>

    <!-- 01 · VIRTUAL MACHINE -->
    <g
      class="rung"
      :class="{ visible: showVm, focus: focus === 0, dim: showVm && focus !== null && focus !== 0 }"
    >
      <rect x="20" y="28" width="280" height="300" rx="4" fill="url(#vm-panel)" stroke="#CF5A5A" stroke-width="1.5" />
      <text x="35" y="50" font-family="IBM Plex Mono, monospace" fill="#CF5A5A" font-size="10" font-weight="800" letter-spacing="0.06em">01 · VIRTUAL MACHINE</text>

      <g transform="translate(40, 68)">
        <rect width="240" height="36" rx="2" fill="#FFFFFF" stroke="#CF5A5A" stroke-width="1.2" />
        <text x="120" y="22" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10" fill="#CF5A5A">App 1 (Application Code)</text>

        <rect y="46" width="240" height="66" rx="2" fill="#FEF5F5" stroke="#E8B4B4" stroke-width="1.5" />
        <text x="120" y="76" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10" fill="#CF5A5A">Guest OS (Heavy Kernel Space)</text>
        <rect x="10" y="90" width="220" height="12" rx="2" fill="#CF5A5A" />
        <text x="120" y="99" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7" fill="#FFFFFF">Redundant OS footprint (GBs)</text>

        <rect y="122" width="240" height="36" rx="2" fill="#FFFBF5" stroke="#E2A03F" stroke-width="1.2" />
        <text x="120" y="144" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9.5" fill="#E2A03F">Hypervisor (ESXi / KVM)</text>

        <rect y="168" width="240" height="36" rx="2" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.2" />
        <text x="120" y="190" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9.5" fill="#475569">Physical Server Hardware</text>
      </g>

      <text x="160" y="292" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="12" fill="#CF5A5A">Virtualize the Hardware</text>
      <text x="160" y="310" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9" fill="#64748B">Runs a full Guest OS per application</text>
    </g>

    <!-- Arrow 1 -->
    <g class="arrow" :class="{ visible: showContainer }" transform="translate(308, 155)">
      <path d="M 5 15 h 30 L 25 5 M 35 15 L 25 25" stroke="#0088B8" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <!-- 02 · CONTAINER -->
    <g
      class="rung"
      :class="{ visible: showContainer, focus: focus === 1, dim: showContainer && focus !== null && focus !== 1 }"
    >
      <rect x="340" y="28" width="280" height="300" rx="4" fill="url(#container-panel)" stroke="#0088B8" stroke-width="1.5" />
      <text x="355" y="50" font-family="IBM Plex Mono, monospace" fill="#0088B8" font-size="10" font-weight="800" letter-spacing="0.06em">02 · CONTAINER</text>

      <g transform="translate(360, 68)">
        <rect width="240" height="66" rx="2" fill="#FFFFFF" stroke="#158A4E" stroke-width="1.5" />
        <rect width="240" height="4" fill="#158A4E" />
        <text x="120" y="24" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10" fill="#158A4E">App 1 + Binaries &amp; Libraries</text>
        <rect x="10" y="36" width="220" height="18" rx="2" fill="#EDF8F2" stroke="#A8D5BE" />
        <text x="120" y="48" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5" fill="#158A4E">Self-contained footprint (MBs)</text>

        <rect y="76" width="240" height="36" rx="2" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
        <text x="120" y="98" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9.5" fill="#158A4E">Container Engine / containerd</text>

        <rect y="122" width="240" height="82" rx="2" fill="#E8F4FA" stroke="#0088B8" stroke-width="1.2" />
        <text x="120" y="160" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10" fill="#0088B8">Shared Host OS Kernel</text>
        <line x1="15" y1="172" x2="225" y2="172" stroke="#A8D0E0" stroke-width="1" />
        <text x="120" y="188" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8" fill="#0088B8">(Hardware Host)</text>
      </g>

      <text x="480" y="292" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="12" fill="#0088B8">Virtualize the OS</text>
      <text x="480" y="310" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9" fill="#64748B">Isolates processes sharing host kernel</text>
    </g>

    <!-- Arrow 2 -->
    <g class="arrow" :class="{ visible: showPlatform }" transform="translate(628, 155)">
      <path d="M 5 15 h 30 L 25 5 M 35 15 L 25 25" stroke="#158A4E" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <!-- 03 · PLATFORM (K8S) -->
    <g
      class="rung"
      :class="{ visible: showPlatform, focus: focus === 2, dim: showPlatform && focus !== null && focus !== 2 }"
    >
      <rect x="660" y="28" width="280" height="300" rx="4" fill="url(#k8s-panel)" stroke="#158A4E" stroke-width="1.5" />
      <text x="675" y="50" font-family="IBM Plex Mono, monospace" fill="#158A4E" font-size="10" font-weight="800" letter-spacing="0.06em">03 · PLATFORM (K8S)</text>

      <g transform="translate(680, 68)">
        <rect width="240" height="102" rx="2" fill="#FFFFFF" stroke="#158A4E" stroke-width="1.5" />
        <rect width="240" height="4" fill="#158A4E" />
        <text x="120" y="22" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10" fill="#158A4E">Orchestrated Replicas (Pods)</text>

        <g transform="translate(10, 34)">
          <rect x="5" y="5" width="60" height="24" rx="2" fill="#EDF8F2" stroke="#158A4E" />
          <text x="35" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8" fill="#158A4E">App Pod 1</text>
          <rect x="75" y="5" width="60" height="24" rx="2" fill="#EDF8F2" stroke="#158A4E" />
          <text x="105" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8" fill="#158A4E">App Pod 2</text>
          <rect x="145" y="5" width="65" height="24" rx="2" fill="#E8F4FA" stroke="#0088B8" />
          <text x="177" y="20" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8" fill="#0088B8">Redis Pod</text>
          <rect x="5" y="38" width="205" height="15" rx="2" fill="#F1F5F9" stroke="#CBD5E1" />
          <text x="107" y="48" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7" fill="#0F1C2A">Auto-Healing / Declarative State</text>
        </g>

        <rect y="112" width="240" height="36" rx="2" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
        <text x="120" y="134" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9.5" fill="#158A4E">Declarative API Control Plane</text>

        <rect y="158" width="240" height="46" rx="2" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.2" />
        <text x="120" y="180" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="9.5" fill="#475569">Cluster Worker Nodes</text>
        <text x="120" y="194" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8" fill="#94A3B8">(Node A + Node B + Node C)</text>
      </g>

      <text x="800" y="292" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="12" fill="#158A4E">Virtualize the Cluster</text>
      <text x="800" y="310" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9" fill="#64748B">Heals &amp; balances apps across multiple nodes</text>
    </g>

    <!-- Bottom takeaway banner -->
    <g class="banner" :class="{ visible: showBanner }" transform="translate(20, 348)">
      <rect width="920" height="42" rx="2" fill="#FFFFFF" stroke="#0088B8" stroke-width="1.5" />
      <path d="M 0 0 h 4 v 42 H 0 Z" fill="#0088B8" />
      <text x="24" y="18" font-family="IBM Plex Mono, monospace" font-size="9" font-weight="700" fill="#0088B8" letter-spacing="0.08em">EVOLUTION</text>
      <text x="24" y="34" font-family="Outfit, sans-serif" font-weight="700" font-size="12" fill="#0F1C2A">
        Hardware (VMs) → OS processes (Containers) → Cluster scheduling (Kubernetes)
      </text>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'PackagingLadder',
  props: {
    clicks: { type: Number, default: 0 }
  },
  computed: {
    // Step 0: VM (first paint). 1: +Container. 2: +Platform. 3: +banner.
    showVm() {
      return true;
    },
    showContainer() {
      return this.clicks >= 1;
    },
    showPlatform() {
      return this.clicks >= 2;
    },
    showBanner() {
      return this.clicks >= 3;
    },
    focus() {
      if (this.clicks >= 3) return null;
      if (this.clicks === 2) return 2;
      if (this.clicks === 1) return 1;
      return 0;
    },
    progressLabel() {
      const step = Math.min(this.clicks + 1, 4);
      const labels = [
        '01 / 04  ·  VIRTUAL MACHINE',
        '02 / 04  ·  + CONTAINER',
        '03 / 04  ·  + PLATFORM',
        '04 / 04  ·  FULL LADDER'
      ];
      return labels[step - 1];
    }
  }
};
</script>

<style scoped>
.ladder .rung,
.ladder .arrow,
.ladder .banner {
  opacity: 0;
  transform: translateX(-12px);
  transition:
    opacity 0.35s ease,
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.3s ease;
  pointer-events: none;
}

.ladder .rung.visible,
.ladder .arrow.visible,
.ladder .banner.visible {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.ladder .rung.dim {
  opacity: 0.42;
  filter: grayscale(0.15);
}

.ladder .rung.focus {
  opacity: 1;
  filter: none;
}

.ladder .banner {
  transform: translateY(8px);
}

.ladder .banner.visible {
  transform: translateY(0);
}

.ladder .arrow {
  transform: scale(0.85);
}

.ladder .arrow.visible {
  transform: scale(1);
}
</style>

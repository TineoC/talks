<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Arrow Markers -->
      <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#CF5A5A" />
      </marker>
      <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#158A4E" />
      </marker>

      <!-- Grid Pattern -->
      <pattern id="sdlc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#sdlc-grid)" rx="8" />

    <!-- ==================== TOP HALF: TRADITIONAL PIPELINE (Red Theme - PETS) ==================== -->
    <text x="60" y="48" font-family="Outfit, sans-serif" fill="#CF5A5A" font-size="11.5px" font-weight="900" letter-spacing="0.05em">TRADITIONAL LIFECYCLE · "PETS" (Unique, Named, Hand-Nurtured)</text>

    <!-- 01. Manual Compile -->
    <rect x="60" y="65" width="175" height="75" rx="6" fill="#FFF8F8" stroke="#E8B4B4" stroke-width="1.2" />
    <text x="75" y="86" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#CF5A5A">01 · Manual Build</text>
    <text x="75" y="104" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Code compiled locally; zip</text>
    <text x="75" y="116" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">archives copied manually.</text>
    <!-- Logo 1: Terminal / Script CLI -->
    <g transform="translate(200, 75)">
      <rect width="22" height="22" rx="3.5" fill="#475569" />
      <path d="M 5 8 l 4 3 l -4 3 M 11 14 h 6" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" fill="none" />
    </g>

    <!-- Transition 1 -> 2 -->
    <path d="M 235 102 H 272" stroke="#CF5A5A" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-red)" />

    <!-- 02. SSH Deploy -->
    <rect x="280" y="65" width="175" height="75" rx="6" fill="#FFF8F8" stroke="#E8B4B4" stroke-width="1.2" />
    <text x="295" y="86" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#CF5A5A">02 · SSH / Script Deploy</text>
    <text x="295" y="104" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Ad-hoc shell commands.</text>
    <text x="295" y="116" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Leads to environment drift.</text>
    <!-- Logo 2: SSH Cryptographic Key -->
    <g transform="translate(420, 75)">
      <rect width="22" height="22" rx="3.5" fill="#475569" />
      <path d="M 7 11 a 4 4 0 1 1 0 0.1 M 10 12 l 6 6 m -3 -3 l 3 -3 m -1 5 l 3 -3" stroke="#FFFFFF" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <!-- Transition 2 -> 3 -->
    <path d="M 455 102 H 492" stroke="#CF5A5A" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-red)" />

    <!-- 03. Host OS Execution -->
    <rect x="500" y="65" width="175" height="75" rx="6" fill="#FFF8F8" stroke="#E8B4B4" stroke-width="1.2" />
    <text x="515" y="86" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#CF5A5A">03 · Host OS Execution</text>
    <text x="515" y="104" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">App runs directly on host OS.</text>
    <text x="515" y="116" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">No sandbox resource limits.</text>
    <!-- Logo 3: Server Tower -->
    <g transform="translate(640, 75)">
      <rect width="22" height="22" rx="3.5" fill="#475569" />
      <rect x="7" y="4" width="8" height="14" rx="1" stroke="#FFFFFF" stroke-width="1.2" fill="none" />
      <line x1="7" y1="8" x2="15" y2="8" stroke="#FFFFFF" stroke-width="1" />
      <line x1="7" y1="13" x2="15" y2="13" stroke="#FFFFFF" stroke-width="1" />
    </g>

    <!-- Transition 3 -> 4 -->
    <path d="M 675 102 H 712" stroke="#CF5A5A" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-red)" />

    <!-- 04. Reactive Ops -->
    <rect x="720" y="65" width="175" height="75" rx="6" fill="#FFF8F8" stroke="#E8B4B4" stroke-width="1.2" />
    <text x="735" y="86" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#CF5A5A">04 · Reactive Ops</text>
    <text x="735" y="104" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Manual log tailing &amp; pings.</text>
    <text x="735" y="116" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Outages require firefighting.</text>
    <!-- Logo 4: Alert Fire -->
    <g transform="translate(860, 75)">
      <rect width="22" height="22" rx="3.5" fill="#CF5A5A" />
      <path d="M 11 3 C 11 3 15 7 15 11 C 15 13.5 13.2 15.5 11 15.5 C 8.8 15.5 7 13.5 7 11 C 7 7 11 3 11 3 Z" fill="#FFFFFF" />
      <path d="M 11 7 C 11 7 13 9 13 11 C 13 12.3 12.1 13.3 11 13.3 C 9.9 13.3 9 12.3 9 11 C 9 9 11 7 11 7 Z" fill="#CF5A5A" />
    </g>


    <!-- ==================== MIDDLE SEPARATOR ==================== -->
    <line x1="60" y1="172" x2="900" y2="172" stroke="#E2E8F0" stroke-width="1.5" />
    <circle cx="480" cy="172" r="15" fill="#0F1C2A" stroke="#CBD5E1" stroke-width="1.5" />
    <text x="480" y="176" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="9.5px" fill="#FFFFFF">VS</text>


    <!-- ==================== BOTTOM HALF: CLOUD NATIVE PIPELINE (Green Theme - CATTLE) ==================== -->
    <text x="60" y="215" font-family="Outfit, sans-serif" fill="#158A4E" font-size="11.5px" font-weight="900" letter-spacing="0.05em">CLOUD NATIVE LIFECYCLE · "CATTLE" (Disposable, Identical, Auto-Replaced)</text>

    <!-- 01. Automated CI -->
    <rect x="60" y="235" width="175" height="75" rx="6" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
    <text x="75" y="256" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#158A4E">01 · Automated CI</text>
    <text x="75" y="274" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Container images compiled in</text>
    <text x="75" y="286" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">CI pipelines; pushed to registry.</text>
    <!-- Logo 1: Docker -->
    <image href="/logos/docker-mark.svg" x="200" y="245" width="22" height="22" />

    <!-- Transition 1 -> 2 -->
    <path d="M 235 272 H 272" stroke="#158A4E" stroke-width="1.8" marker-end="url(#arrow-green)" />

    <!-- 02. GitOps CD -->
    <rect x="280" y="235" width="175" height="75" rx="6" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
    <text x="295" y="256" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#158A4E">02 · Declarative GitOps</text>
    <text x="295" y="274" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Flux/ArgoCD matches cluster</text>
    <text x="295" y="286" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">state directly to Git commit.</text>
    <!-- Logo 2: CNCF -->
    <image href="/logos/cncf.svg" x="420" y="245" width="22" height="22" />

    <!-- Transition 2 -> 3 -->
    <path d="M 455 272 H 492" stroke="#158A4E" stroke-width="1.8" marker-end="url(#arrow-green)" />

    <!-- 03. Pod Execution -->
    <rect x="500" y="235" width="175" height="75" rx="6" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
    <text x="515" y="256" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#158A4E">03 · Orchestrated Pods</text>
    <text x="515" y="274" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Containers isolated in Pods</text>
    <text x="515" y="286" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">with CPU &amp; Memory bounds.</text>
    <!-- Logo 3: Kubernetes -->
    <image href="/logos/kubernetes.svg" x="640" y="245" width="22" height="22" />

    <!-- Transition 3 -> 4 -->
    <path d="M 675 272 H 712" stroke="#158A4E" stroke-width="1.8" marker-end="url(#arrow-green)" />

    <!-- 04. Self-Healing Ops -->
    <rect x="720" y="235" width="175" height="75" rx="6" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.2" />
    <text x="735" y="256" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#158A4E">04 · Self-Healing Ops</text>
    <text x="735" y="274" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Probes check health; metrics</text>
    <text x="735" y="286" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">trigger automated recovery.</text>
    <!-- Logo 4: Prometheus -->
    <image href="/logos/prometheus.svg" x="860" y="245" width="22" height="22" />


    <!-- ==================== BOTTOM DECORATIVE SUMMARY BANNER ==================== -->
    <g transform="translate(60, 345)">
      <rect width="840" height="34" rx="6" fill="rgba(21, 138, 78, 0.08)" stroke="rgba(21, 138, 78, 0.2)" stroke-width="1" />
      <path d="M 0 0 h 4 v 34 H 0 Z" fill="#158A4E" />
      
      <!-- Info Icon -->
      <g transform="translate(18, 9)">
        <circle cx="8" cy="8" r="7" fill="none" stroke="#158A4E" stroke-width="1.5" />
        <line x1="8" y1="5" x2="8" y2="5" stroke="#158A4E" stroke-width="2" stroke-linecap="round" />
        <line x1="8" y1="8" x2="8" y2="11" stroke="#158A4E" stroke-width="1.5" stroke-linecap="round" />
      </g>
      
      <text x="44" y="21" font-family="Outfit, sans-serif" font-weight="700" font-size="11px" fill="#158A4E">Pets vs. Cattle: Legacy treats servers as unique "Pets" (manual setups). Cloud Native treats them as identical, disposable "Cattle" (auto-healed).</text>
    </g>
  </svg>
</template>

<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients for Panels -->
      <linearGradient id="control-plane-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0088B8" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#00A8D0" stop-opacity="0.01" />
      </linearGradient>

      <linearGradient id="worker-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#158A4E" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#0F9F90" stop-opacity="0.01" />
      </linearGradient>

      <!-- Arrow Markers -->
      <marker id="arrow-head" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#0088B8" />
      </marker>
      <marker id="traffic-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 8 5 L 0 8 z" fill="#158A4E" />
      </marker>

      <!-- Grid Pattern -->
      <pattern id="arch-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#arch-grid)" rx="8" />

    <!-- ==================== LEFT HALF: KUBERNETES CONTROL PLANE ==================== -->
    <rect x="20" y="20" width="370" height="320" rx="12" fill="url(#control-plane-panel)" stroke="#0088B8" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="35" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#0088B8" font-size="10px" font-weight="800" letter-spacing="0.05em">KUBERNETES CONTROL PLANE</text>

    <!-- Internals of Control Plane (Hub-and-spoke API Server model) -->
    <!-- API Server (Central Hub) -->
    <rect x="145" y="70" width="130" height="56" rx="6" fill="#FFFFFF" stroke="#0088B8" stroke-width="2" />
    <text x="210" y="96" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="12px" fill="#0f1c2a">API Server</text>
    <text x="210" y="110" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8.5px" fill="#64748B">Cluster Gateway</text>

    <!-- etcd database -->
    <rect x="50" y="170" width="130" height="56" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" />
    <text x="115" y="196" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10.5px" fill="#1e293b">etcd Database</text>
    <text x="115" y="210" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Desired State Store</text>

    <!-- Scheduler -->
    <rect x="240" y="170" width="130" height="56" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" />
    <text x="305" y="196" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10.5px" fill="#1e293b">Scheduler</text>
    <text x="305" y="210" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Assigns Pod Nodes</text>

    <!-- Controller Manager -->
    <rect x="145" y="260" width="130" height="56" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" />
    <text x="210" y="286" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10.5px" fill="#1e293b">Controller Mgr</text>
    <text x="210" y="300" text-anchor="middle" font-family="Outfit, sans-serif" font-size="8px" fill="#64748B">Reconciliation Loops</text>

    <!-- Internal Control Plane Links -->
    <line x1="210" y1="126" x2="115" y2="170" stroke="#CBD5E1" stroke-width="1.5" />
    <line x1="210" y1="126" x2="305" y2="170" stroke="#CBD5E1" stroke-width="1.5" />
    <line x1="210" y1="126" x2="210" y2="260" stroke="#CBD5E1" stroke-width="1.5" />

    <text x="205" y="330" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#64748B">Orchestration & State Management</text>


    <!-- ==================== MIDDLE CONTROL PLANE SYNC ==================== -->
    <path d="M 275 98 H 450" fill="none" stroke="#0088B8" stroke-width="2" stroke-dasharray="4 2" marker-end="url(#arrow-head)" />
    <text x="362" y="90" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#0088B8">State Sync</text>


    <!-- ==================== RIGHT HALF: WORKER NODE ==================== -->
    <rect x="440" y="20" width="500" height="320" rx="12" fill="url(#worker-panel)" stroke="#158A4E" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="455" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#158A4E" font-size="10px" font-weight="800" letter-spacing="0.05em">WORKER NODE (DATA PLANE)</text>

    <g transform="translate(460, 60)">
      <!-- kubelet agent -->
      <rect x="0" y="0" width="120" height="42" rx="6" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.5" />
      <text x="60" y="21" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#158A4E">kubelet</text>
      <text x="60" y="32" text-anchor="middle" font-family="Outfit, sans-serif" font-size="7.5px" fill="#158A4E">Node Manager</text>

      <!-- kube-proxy agent -->
      <rect x="340" y="0" width="120" height="42" rx="6" fill="#EDF8F2" stroke="#A8D5BE" stroke-width="1.5" />
      <text x="400" y="21" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#158A4E">kube-proxy</text>
      <text x="400" y="32" text-anchor="middle" font-family="Outfit, sans-serif" font-size="7.5px" fill="#158A4E">Network Router</text>

      <!-- Connection from Kubelet to direct container operations -->
      <path d="M 60 42 V 74" fill="none" stroke="#A8D5BE" stroke-dasharray="3 3" stroke-width="1.5" />

      <!-- User Applications (Pods) -->
      <!-- Pod 1: Auth Service -->
      <g transform="translate(0, 80)">
        <rect width="130" height="110" rx="6" fill="#FFFFFF" stroke="#8B4FB0" stroke-width="1.5" />
        <rect width="130" height="4" rx="2" fill="#8B4FB0" />
        <text x="65" y="18" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="9.5px" fill="#8B4FB0">Pod: Auth</text>
        
        <rect x="10" y="30" width="110" height="44" rx="4" fill="#F0E8FA" stroke="#DFCEF2" />
        <text x="65" y="47" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="8.5px" fill="#6B2FA0">auth-service</text>
        <text x="65" y="60" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#6B2FA0">Port: 8080</text>
        
        <text x="65" y="92" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="8.5px" fill="#158A4E">● Running</text>
      </g>

      <!-- Pod 2: Order Service -->
      <g transform="translate(165, 80)">
        <rect width="130" height="110" rx="6" fill="#FFFFFF" stroke="#8B4FB0" stroke-width="1.5" />
        <rect width="130" height="4" rx="2" fill="#8B4FB0" />
        <text x="65" y="18" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="9.5px" fill="#8B4FB0">Pod: Order</text>
        
        <rect x="10" y="30" width="110" height="44" rx="4" fill="#F0E8FA" stroke="#DFCEF2" />
        <text x="65" y="47" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="8.5px" fill="#6B2FA0">order-service</text>
        <text x="65" y="60" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#6B2FA0">Port: 8081</text>
        
        <text x="65" y="92" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="8.5px" fill="#158A4E">● Running</text>
      </g>

      <!-- Pod 3: Postgres Database -->
      <g transform="translate(330, 80)">
        <rect width="130" height="110" rx="6" fill="#FFFFFF" stroke="#0088B8" stroke-width="1.5" />
        <rect width="130" height="4" rx="2" fill="#0088B8" />
        <text x="65" y="18" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="9.5px" fill="#0088B8">Pod: Database</text>
        
        <rect x="10" y="30" width="110" height="44" rx="4" fill="#E8F4FA" stroke="#A8D0E0" />
        <text x="65" y="47" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="8.5px" fill="#0088B8">postgres:16</text>
        <text x="65" y="60" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#0088B8">Port: 5432</text>
        
        <text x="65" y="92" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="8.5px" fill="#158A4E">● Running</text>
      </g>

      <!-- kube-proxy traffic dispatch lines -->
      <path d="M 400 42 C 400 65, 65 65, 65 80" fill="none" stroke="#158A4E" stroke-dasharray="3 3" stroke-width="1.2" />
      <path d="M 400 42 C 400 65, 230 65, 230 80" fill="none" stroke="#158A4E" stroke-dasharray="3 3" stroke-width="1.2" />

      <text x="230" y="210" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8.5px" fill="#64748B">Application Services reside inside Pods scheduled on Worker Nodes</text>
    </g>


    <!-- ==================== BOTTOM DECORATIVE SUMMARY BANNER ==================== -->
    <g transform="translate(20, 360)">
      <rect width="920" height="34" rx="6" fill="rgba(0, 136, 184, 0.08)" stroke="rgba(0, 136, 184, 0.2)" stroke-width="1" />
      <path d="M 0 0 h 4 v 34 H 0 Z" fill="#0088B8" />
      
      <!-- Info Icon -->
      <g transform="translate(18, 9)">
        <circle cx="8" cy="8" r="7" fill="none" stroke="#0088B8" stroke-width="1.5" />
        <line x1="8" y1="5" x2="8" y2="5" stroke="#0088B8" stroke-width="2" stroke-linecap="round" />
        <line x1="8" y1="8" x2="8" y2="11" stroke="#0088B8" stroke-width="1.5" stroke-linecap="round" />
      </g>
      
      <text x="44" y="21" font-family="Outfit, sans-serif" font-weight="700" font-size="11.5px" fill="#0088B8">The Control Plane manages scheduling and watches desired state (etcd). The Worker Node kubelet coordinates with API Server to run the Pods.</text>
    </g>
  </svg>
</template>

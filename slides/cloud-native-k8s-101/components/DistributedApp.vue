<template>
  <svg class="diagram diagram-lg" viewBox="0 0 960 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="cloud-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0088B8" stop-opacity="0.10" />
        <stop offset="100%" stop-color="#00A8D0" stop-opacity="0.01" />
      </linearGradient>
      
      <linearGradient id="dns-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#00A8D0" />
        <stop offset="100%" stop-color="#0088B8" />
      </linearGradient>

      <linearGradient id="gateway-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#8B4FB0" />
        <stop offset="100%" stop-color="#6B2FA0" />
      </linearGradient>

      <linearGradient id="auth-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4A90E2" />
        <stop offset="100%" stop-color="#357ABD" />
      </linearGradient>

      <linearGradient id="api-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#00B4D8" />
        <stop offset="100%" stop-color="#0077B6" />
      </linearGradient>

      <linearGradient id="worker-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2EC4B6" />
        <stop offset="100%" stop-color="#0F9F90" />
      </linearGradient>

      <linearGradient id="kafka-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FF9F1C" />
        <stop offset="100%" stop-color="#E76F51" />
      </linearGradient>

      <linearGradient id="cache-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#E63946" />
        <stop offset="100%" stop-color="#C32F3A" />
      </linearGradient>

      <linearGradient id="db-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#D4A373" />
        <stop offset="100%" stop-color="#A98467" />
      </linearGradient>

      <linearGradient id="search-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4ea8de" />
        <stop offset="100%" stop-color="#560bad" />
      </linearGradient>

      <!-- Glow Filter -->
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- Grid Pattern -->
      <pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#E2E8F0" />
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#dot-grid)" rx="8" />

    <!-- BOUNDARIES & LABELS -->
    
    <!-- Kubernetes Cluster Boundary -->
    <rect x="180" y="20" width="600" height="380" rx="16" fill="url(#cloud-grad)" stroke="#94A3B8" stroke-dasharray="6 4" stroke-width="1.5" />
    <text x="195" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#64748B" font-size="10px" font-weight="800" letter-spacing="0.05em">KUBERNETES CLUSTER / VPC</text>
    
    <!-- External Managed Cloud Boundary -->
    <rect x="800" y="20" width="150" height="380" rx="16" fill="#F8FAFC" stroke="#CBD5E1" stroke-dasharray="4 4" stroke-width="1.5" />
    <text x="815" y="42" font-family="Outfit, IBM Plex Sans, sans-serif" fill="#64748B" font-size="10px" font-weight="800" letter-spacing="0.05em">EXTERNAL CLOUD</text>

    <!-- CONNECTIONS / FLOWS (BACKGROUND) -->
    
    <!-- Public to DNS -->
    <path class="flow-line flow-public" d="M 0 130 H 40" stroke="#00A8D0" />
    <!-- DNS to ALB -->
    <path class="flow-line flow-public" d="M 90 165 V 210" stroke="#00A8D0" />
    <!-- ALB to Envoy -->
    <path class="flow-line flow-public" d="M 140 242 H 200" stroke="#00A8D0" />
    
    <!-- Envoy to Auth (check) -->
    <path class="flow-line flow-internal" d="M 310 230 C 330 230, 330 72, 350 72" stroke="#4A90E2" />
    <!-- Envoy to Order API -->
    <path class="flow-line flow-internal" d="M 310 242 C 325 242, 335 200, 350 200" stroke="#00B4D8" />
    
    <!-- Order API to Redis -->
    <path class="flow-line flow-internal" d="M 460 192 C 550 192, 550 72, 640 72" stroke="#E63946" />
    <!-- Order API to Postgres Primary -->
    <path class="flow-line flow-internal" d="M 460 192 H 640" stroke="#D4A373" />
    <!-- Order API to S3 -->
    <path class="flow-line flow-cloud" d="M 460 192 C 580 192, 700 132, 820 132" stroke="#94A3B8" />
    
    <!-- Order API to Kafka -->
    <path class="flow-line flow-internal" d="M 460 202 H 500" stroke="#FF9F1C" />
    <!-- Kafka to Payment Worker -->
    <path class="flow-line flow-internal" d="M 500 205 C 460 205, 430 312, 350 312" stroke="#2EC4B6" />
    
    <!-- Payment Worker to Postgres Primary -->
    <path class="flow-line flow-internal" d="M 460 312 C 550 312, 550 202, 640 202" stroke="#D4A373" />
    
    <!-- Postgres Primary to Elasticsearch -->
    <path class="flow-line flow-internal" d="M 695 225 V 280" stroke="#4ea8de" />
    <!-- Postgres Primary to Postgres AZ-2 Replica -->
    <path class="flow-line flow-cloud" d="M 750 192 H 820" stroke="#A98467" />


    <!-- CARDS / NODES -->
    
    <!-- 1. DNS / CDN -->
    <g class="node" transform="translate(40, 90)">
      <rect width="100" height="75" rx="8" fill="#FFFFFF" stroke="#00A8D0" stroke-width="1.5" />
      <path d="M 0 0 h 100 v 4 H 0 Z" fill="url(#dns-grad)" />
      <!-- Cloudflare Logo -->
      <image href="/logos/cloudflare.svg" x="10" y="14" width="22" height="22" />
      <text x="12" y="52" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Global CDN</text>
      <text x="12" y="64" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">Cloudflare</text>
    </g>

    <!-- 2. Load Balancer -->
    <g class="node" transform="translate(40, 210)">
      <rect width="100" height="75" rx="8" fill="#FFFFFF" stroke="#0088B8" stroke-width="1.5" />
      <path d="M 0 0 h 100 v 4 H 0 Z" fill="url(#dns-grad)" />
      <!-- AWS Logo -->
      <image href="/logos/aws.svg" x="10" y="14" width="22" height="22" />
      <text x="12" y="52" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Load Balancer</text>
      <text x="12" y="64" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">AWS ALB · p443</text>
    </g>

    <!-- 3. Envoy Ingress -->
    <g class="node" transform="translate(200, 200)">
      <rect width="110" height="75" rx="8" fill="#FFFFFF" stroke="#6B2FA0" stroke-width="1.5" />
      <path d="M 0 0 h 110 v 4 H 0 Z" fill="url(#gateway-grad)" />
      <!-- Envoy Logo -->
      <image href="/logos/envoy.svg" x="10" y="14" width="22" height="22" />
      <text x="12" y="52" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">API Gateway</text>
      <text x="12" y="64" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">Envoy · Ingress</text>
    </g>

    <!-- 4. Auth Service (Stacked 3 replicas) -->
    <g class="node" transform="translate(350, 40)">
      <!-- Back Replicas -->
      <rect x="8" y="8" width="110" height="65" rx="8" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1" />
      <rect x="4" y="4" width="110" height="65" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
      <!-- Main Card -->
      <rect width="110" height="65" rx="8" fill="#FFFFFF" stroke="#4A90E2" stroke-width="1.5" />
      <path d="M 0 0 h 110 v 4 H 0 Z" fill="url(#auth-grad)" />
      <!-- Node.js Logo -->
      <image href="/logos/nodejs.svg" x="10" y="12" width="22" height="22" />
      <!-- Heartbeat status dot -->
      <circle class="status-dot" cx="98" cy="18" r="3.5" fill="#158A4E" />
      <text x="12" y="43" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Auth Service</text>
      <text x="12" y="54" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">NodeJS · 3 Pods</text>
    </g>

    <!-- 5. Order API (Stacked 3 replicas) -->
    <g class="node" transform="translate(350, 160)">
      <!-- Back Replicas -->
      <rect x="8" y="8" width="110" height="65" rx="8" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1" />
      <rect x="4" y="4" width="110" height="65" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
      <!-- Main Card -->
      <rect width="110" height="65" rx="8" fill="#FFFFFF" stroke="#00B4D8" stroke-width="1.5" />
      <path d="M 0 0 h 110 v 4 H 0 Z" fill="url(#api-grad)" />
      <!-- Go Logo -->
      <image href="/logos/go.svg" x="10" y="12" width="22" height="22" />
      <!-- Heartbeat status dot -->
      <circle class="status-dot" cx="98" cy="18" r="3.5" fill="#158A4E" />
      <text x="12" y="43" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Order API</text>
      <text x="12" y="54" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">Go / gRPC · 3 Pods</text>
    </g>

    <!-- 6. Payment Worker (Stacked 3 replicas) -->
    <g class="node" transform="translate(350, 280)">
      <!-- Back Replicas -->
      <rect x="8" y="8" width="110" height="65" rx="8" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1" />
      <rect x="4" y="4" width="110" height="65" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
      <!-- Main Card -->
      <rect width="110" height="65" rx="8" fill="#FFFFFF" stroke="#2EC4B6" stroke-width="1.5" />
      <path d="M 0 0 h 110 v 4 H 0 Z" fill="url(#worker-grad)" />
      <!-- Spring Logo -->
      <image href="/logos/spring.svg" x="10" y="12" width="22" height="22" />
      <!-- Heartbeat status dot -->
      <circle class="status-dot" cx="98" cy="18" r="3.5" fill="#158A4E" />
      <text x="12" y="43" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Payment Worker</text>
      <text x="12" y="54" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">Spring Boot · 3 Pods</text>
    </g>

    <!-- 7. Kafka Message Cluster -->
    <g class="node" transform="translate(500, 130)">
      <rect width="90" height="150" rx="8" fill="none" stroke="#FF9F1C" stroke-dasharray="3 3" stroke-width="1.2" />
      <text x="45" y="-12" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#E76F51" letter-spacing="0.05em">KAFKA CLUSTER</text>
      <!-- Kafka Logo beside label -->
      <image href="/logos/kafka.svg" x="37" y="-30" width="16" height="16" />
      
      <!-- Broker 1 -->
      <g transform="translate(10, 10)">
        <rect width="70" height="35" rx="4" fill="#FFFFFF" stroke="#FF9F1C" stroke-width="1.2" />
        <text x="8" y="21" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#0f1c2a">Broker 1</text>
        <circle class="status-dot" cx="60" cy="17" r="2.5" fill="#158A4E" />
      </g>
      <!-- Broker 2 -->
      <g transform="translate(10, 55)">
        <rect width="70" height="35" rx="4" fill="#FFFFFF" stroke="#FF9F1C" stroke-width="1.2" />
        <text x="8" y="21" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#0f1c2a">Broker 2</text>
        <circle class="status-dot" cx="60" cy="17" r="2.5" fill="#158A4E" />
      </g>
      <!-- Broker 3 -->
      <g transform="translate(10, 100)">
        <rect width="70" height="35" rx="4" fill="#FFFFFF" stroke="#FF9F1C" stroke-width="1.2" />
        <text x="8" y="21" font-family="Outfit, sans-serif" font-weight="800" font-size="9px" fill="#0f1c2a">Broker 3</text>
        <circle class="status-dot" cx="60" cy="17" r="2.5" fill="#158A4E" />
      </g>
    </g>

    <!-- 8. Redis Session Cache -->
    <g class="node" transform="translate(640, 40)">
      <rect width="110" height="65" rx="8" fill="#FFFFFF" stroke="#E63946" stroke-width="1.5" />
      <path d="M 0 0 h 110 v 4 H 0 Z" fill="url(#cache-grad)" />
      <!-- Redis Logo -->
      <image href="/logos/redis.svg" x="10" y="12" width="22" height="22" />
      <circle class="status-dot" cx="98" cy="18" r="3.5" fill="#158A4E" />
      <text x="12" y="43" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Session Cache</text>
      <text x="12" y="54" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">Redis · Active</text>
    </g>

    <!-- 9. PostgreSQL Primary -->
    <g class="node" transform="translate(640, 160)">
      <rect width="110" height="65" rx="8" fill="#FFFFFF" stroke="#D4A373" stroke-width="1.5" />
      <path d="M 0 0 h 110 v 4 H 0 Z" fill="url(#db-grad)" />
      <!-- Postgres Logo -->
      <image href="/logos/postgres.svg" x="10" y="12" width="22" height="22" />
      <circle class="status-dot" cx="98" cy="18" r="3.5" fill="#158A4E" />
      <text x="12" y="43" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Primary DB</text>
      <text x="12" y="54" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">PostgreSQL · master</text>
    </g>

    <!-- 10. Elasticsearch Search -->
    <g class="node" transform="translate(640, 280)">
      <rect width="110" height="65" rx="8" fill="#FFFFFF" stroke="#4ea8de" stroke-width="1.5" />
      <path d="M 0 0 h 110 v 4 H 0 Z" fill="url(#search-grad)" />
      <!-- Elasticsearch Logo -->
      <image href="/logos/elasticsearch.svg" x="10" y="12" width="22" height="22" />
      <circle class="status-dot" cx="98" cy="18" r="3.5" fill="#158A4E" />
      <text x="12" y="43" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Search Engine</text>
      <text x="12" y="54" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">Elasticsearch · sync</text>
    </g>

    <!-- 11. AWS S3 -->
    <g class="node" transform="translate(820, 100)">
      <rect width="110" height="65" rx="8" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.5" />
      <!-- AWS S3 Logo -->
      <image href="/logos/aws-s3.svg" x="10" y="12" width="22" height="22" />
      <text x="12" y="43" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">Object Storage</text>
      <text x="12" y="54" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">AWS S3 · cloud</text>
    </g>

    <!-- 12. PostgreSQL Read-Replica -->
    <g class="node" transform="translate(820, 220)">
      <rect width="110" height="65" rx="8" fill="#FFFFFF" stroke="#A98467" stroke-width="1.5" />
      <!-- Postgres Logo (Replica) -->
      <image href="/logos/postgres.svg" x="10" y="12" width="22" height="22" />
      <circle class="status-dot" cx="98" cy="18" r="3.5" fill="#158A4E" />
      <text x="12" y="43" font-family="Outfit, sans-serif" font-weight="800" font-size="11px" fill="#0f1c2a">DB Read-Replica</text>
      <text x="12" y="54" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#5a6a7a">PostgreSQL · Zone B</text>
    </g>
  </svg>
</template>

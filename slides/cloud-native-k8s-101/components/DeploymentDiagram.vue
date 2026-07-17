<template>
  <div class="split-diagram-container">
    <!-- LEFT COLUMN: Deployment YAML Editor -->
    <div class="yaml-editor-card">
      <div class="editor-header">
        <div class="window-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="tab-title">deployment.yaml</div>
        <span v-if="clicks > 0" class="lock-indicator">⌨️ Step {{ clicks }}</span>
      </div>
      <div class="code-body">
        <div 
          v-for="(line, idx) in yamlLines" 
          :key="idx"
          :class="[
            'code-line',
            line.section ? 'line-' + line.section : '',
            { 
              'highlighted': activeSection === line.section,
              'dimmed': activeSection && activeSection !== line.section
            }
          ]"
          @mouseenter="hoveredSection = line.section"
          @mouseleave="hoveredSection = null"
        >
          <span class="line-num">{{ idx + 1 }}</span>
          <span class="line-content" v-html="highlightYAML(line.text)"></span>
        </div>
      </div>
    </div>

    <!-- RIGHT COLUMN: Deployment / ReplicaSet Diagram -->
    <div class="visual-panel">
      <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="deploy-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0088B8" stop-opacity="0.08" />
            <stop offset="100%" stop-color="#0088B8" stop-opacity="0.01" />
          </linearGradient>
          <linearGradient id="rs-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#6B2FA0" stop-opacity="0.08" />
            <stop offset="100%" stop-color="#6B2FA0" stop-opacity="0.01" />
          </linearGradient>
        </defs>

        <!-- Deployment Controller Object -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'deploy', 'dimmed': activeSection && activeSection !== 'deploy' }]"
          @mouseenter="hoveredSection = 'deploy'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="40" y="20" width="340" height="52" rx="8" fill="url(#deploy-grad)" stroke="#0088B8" :stroke-width="activeSection === 'deploy' ? 2.5 : 1.5" />
          <text x="210" y="44" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="12px" fill="#0088B8">Deployment: auth-deploy</text>
          <text x="210" y="58" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">Manages rollouts and desired container templates</text>
        </g>

        <!-- Connection: Deploy -> ReplicaSet -->
        <line x1="210" y1="72" x2="210" y2="105" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="3 3" />

        <!-- ReplicaSet Controller Object -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'replicas', 'dimmed': activeSection && activeSection !== 'replicas' }]"
          @mouseenter="hoveredSection = 'replicas'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="60" y="105" width="300" height="52" rx="8" fill="url(#rs-grad)" stroke="#6B2FA0" :stroke-width="activeSection === 'replicas' ? 2.5 : 1.5" />
          <text x="210" y="129" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="11.5px" fill="#6B2FA0">ReplicaSet: auth-deploy-7b43ac8b</text>
          <text x="210" y="143" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#6B2FA0">Enforces: replicas = 3 (Reconciliation Loop)</text>
        </g>

        <!-- Connections: ReplicaSet -> Pods -->
        <path d="M 210 157 L 90 195" stroke="#CBD5E1" stroke-width="1.5" />
        <path d="M 210 157 V 195" stroke="#CBD5E1" stroke-width="1.5" />
        <path d="M 210 157 L 330 195" stroke="#CBD5E1" stroke-width="1.5" />

        <!-- 3 Pod Replicas -->
        <!-- Pod 1 -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'pods', 'dimmed': activeSection && activeSection !== 'pods' }]"
          @mouseenter="hoveredSection = 'pods'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="30" y="195" width="105" height="56" rx="6" fill="#FFFFFF" stroke="#158A4E" :stroke-width="activeSection === 'pods' ? 2 : 1.2" />
          <rect x="30" y="195" width="105" height="3" rx="1.5" fill="#158A4E" />
          <text x="82" y="218" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#158A4E">Pod 1</text>
          <text x="82" y="234" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#158A4E">● Running</text>
        </g>

        <!-- Pod 2 -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'pods', 'dimmed': activeSection && activeSection !== 'pods' }]"
          @mouseenter="hoveredSection = 'pods'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="157" y="195" width="105" height="56" rx="6" fill="#FFFFFF" stroke="#158A4E" :stroke-width="activeSection === 'pods' ? 2 : 1.2" />
          <rect x="157" y="195" width="105" height="3" rx="1.5" fill="#158A4E" />
          <text x="210" y="218" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#158A4E">Pod 2</text>
          <text x="210" y="234" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#158A4E">● Running</text>
        </g>

        <!-- Pod 3 -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'pods', 'dimmed': activeSection && activeSection !== 'pods' }]"
          @mouseenter="hoveredSection = 'pods'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="285" y="195" width="105" height="56" rx="6" fill="#FFFFFF" stroke="#158A4E" :stroke-width="activeSection === 'pods' ? 2 : 1.2" />
          <rect x="285" y="195" width="105" height="3" rx="1.5" fill="#158A4E" />
          <text x="337" y="218" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#158A4E">Pod 3</text>
          <text x="337" y="234" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#158A4E">● Running</text>
        </g>

        <!-- Bottom Warning Action note -->
        <g v-if="activeSection === 'replicas'">
          <rect x="30" y="262" width="360" height="24" rx="4" fill="rgba(107, 47, 160, 0.08)" stroke="rgba(107, 47, 160, 0.2)" stroke-width="1" />
          <text x="210" y="277" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="8.5px" fill="#6B2FA0">Reconciliation: If a Pod is deleted, ReplicaSet instantly spawns a replacement.</text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeploymentDiagram',
  props: {
    clicks: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      hoveredSection: null,
      yamlLines: [
        { text: "apiVersion: apps/v1", section: "deploy" },
        { text: "kind: Deployment", section: "deploy" },
        { text: "metadata:", section: "deploy" },
        { text: "  name: auth-deploy", section: "deploy" },
        { text: "spec:", section: null },
        { text: "  replicas: 3             # ◄ TARGET STATE", section: "replicas" },
        { text: "  selector:", section: "replicas" },
        { text: "    matchLabels:", section: "replicas" },
        { text: "      app: auth", section: "replicas" },
        { text: "  template:", section: "pods" },
        { text: "    metadata:", section: "pods" },
        { text: "      labels:", section: "pods" },
        { text: "        app: auth", section: "pods" },
        { text: "    spec:", section: "pods" },
        { text: "      containers:", section: "pods" },
        { text: "      - name: auth", section: "pods" },
        { text: "        image: auth:v1.2.0", section: "pods" }
      ]
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      
      if (this.clicks === 1) return 'replicas';
      if (this.clicks === 2) return 'pods';
      
      return null;
    }
  },
  methods: {
    highlightYAML(text) {
      let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      if (html.includes("#")) {
        const parts = html.split("#");
        const code = this.highlightCode(parts[0]);
        const comment = `<span style="color: #64748B;">#${parts[1]}</span>`;
        return code + comment;
      }
      return this.highlightCode(html);
    },
    highlightCode(code) {
      if (code.includes(":")) {
        const idx = code.indexOf(":");
        const key = code.substring(0, idx);
        const val = code.substring(idx + 1);
        
        const keySpan = `<span style="color: #F92672; font-weight: 700;">${key}</span><span style="color: #F8F8F2;">:</span>`;
        let valSpan = val;
        
        const trimmedVal = val.trim();
        if (trimmedVal) {
          if (!isNaN(trimmedVal)) {
            valSpan = val.replace(trimmedVal, `<span style="color: #AE81FF;">${trimmedVal}</span>`);
          } else if (trimmedVal.includes('"') || trimmedVal.includes("'")) {
            valSpan = val.replace(trimmedVal, `<span style="color: #E6DB74;">${trimmedVal}</span>`);
          } else {
            valSpan = val.replace(trimmedVal, `<span style="color: #A6E22E;">${trimmedVal}</span>`);
          }
        }
        return keySpan + valSpan;
      }
      return `<span style="color: #F8F8F2;">${code}</span>`;
    }
  }
};
</script>

<style scoped>
/* Inherited from PodDiagram style sheet but customizable if needed */
.code-line.highlighted.line-deploy {
  background: rgba(0, 136, 184, 0.15);
  border-left-color: #0088B8;
  box-shadow: inset 4px 0 0 #0088B8;
}
.code-line.highlighted.line-replicas {
  background: rgba(107, 47, 160, 0.15);
  border-left-color: #6B2FA0;
  box-shadow: inset 4px 0 0 #6B2FA0;
}
.code-line.highlighted.line-pods {
  background: rgba(21, 138, 78, 0.15);
  border-left-color: #158A4E;
  box-shadow: inset 4px 0 0 #158A4E;
}
</style>

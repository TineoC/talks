<template>
  <div class="split-diagram-container">
    <!-- LEFT COLUMN: Service YAML Editor -->
    <div class="yaml-editor-card">
      <div class="editor-header">
        <div class="window-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="tab-title">service.yaml</div>
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

    <!-- RIGHT COLUMN: Service stable address load balancer -->
    <div class="visual-panel">
      <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="svc-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0088B8" stop-opacity="0.08" />
            <stop offset="100%" stop-color="#00A8D0" stop-opacity="0.01" />
          </linearGradient>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 2 L 8 5 L 0 8 z" fill="#0088B8" />
          </marker>
          <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 2 L 8 5 L 0 8 z" fill="#158A4E" />
          </marker>
        </defs>

        <!-- Client External Request (Top) -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'ports', 'dimmed': activeSection && activeSection !== 'ports' }]"
          @mouseenter="hoveredSection = 'ports'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="125" y="15" width="170" height="34" rx="6" fill="#F8FAFC" stroke="#94A3B8" :stroke-width="activeSection === 'ports' ? 2 : 1.2" />
          <text x="210" y="36" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="10.5px" fill="#475569">Client Requests (port: 80)</text>
        </g>

        <!-- Connection: Client -> Service -->
        <path 
          d="M 210 49 V 90" 
          fill="none" 
          stroke="#94A3B8" 
          :stroke-width="activeSection === 'ports' ? 2 : 1.2" 
          marker-end="url(#arrow-blue)" 
          :class="['svg-element', { 'focused': activeSection === 'ports', 'dimmed': activeSection && activeSection !== 'ports' }]"
        />

        <!-- Service stable entrypoint IP -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'service' || activeSection === 'selector', 'dimmed': activeSection && activeSection !== 'service' && activeSection !== 'selector' }]"
          @mouseenter="hoveredSection = 'service'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="95" y="90" width="230" height="74" rx="8" fill="url(#svc-blue)" stroke="#0088B8" :stroke-width="activeSection === 'service' || activeSection === 'selector' ? 2.5 : 1.5" />
          <rect x="95" y="90" width="230" height="4" rx="2" fill="#0088B8" />
          
          <text x="210" y="110" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="900" font-size="11.5px" fill="#0088B8">Service Gateway: auth-svc</text>
          
          <!-- Selector details inside Service -->
          <rect x="105" y="120" width="210" height="34" rx="4" fill="#F0F8FF" stroke="#A8D0E0" stroke-width="1" />
          <text x="210" y="132" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8px" fill="#0088B8">selector: app=auth</text>
          <text x="210" y="146" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#64748B">port: 80 ⟷ targetPort: 8080</text>
        </g>

        <!-- Connections: Service -> Pods (Load balanced paths) -->
        <path 
          d="M 160 164 L 85 208" 
          fill="none" 
          stroke="#158A4E" 
          :stroke-width="activeSection === 'ports' || activeSection === 'selector' ? 2 : 1.2" 
          marker-end="url(#arrow-green)"
          :class="['svg-element', { 'focused': activeSection === 'ports' || activeSection === 'selector', 'dimmed': activeSection && activeSection !== 'ports' && activeSection !== 'selector' }]"
        />
        <path 
          d="M 210 164 V 208" 
          fill="none" 
          stroke="#158A4E" 
          :stroke-width="activeSection === 'ports' || activeSection === 'selector' ? 2 : 1.2" 
          marker-end="url(#arrow-green)"
          :class="['svg-element', { 'focused': activeSection === 'ports' || activeSection === 'selector', 'dimmed': activeSection && activeSection !== 'ports' && activeSection !== 'selector' }]"
        />
        <path 
          d="M 260 164 L 335 208" 
          fill="none" 
          stroke="#158A4E" 
          :stroke-width="activeSection === 'ports' || activeSection === 'selector' ? 2 : 1.2" 
          marker-end="url(#arrow-green)"
          :class="['svg-element', { 'focused': activeSection === 'ports' || activeSection === 'selector', 'dimmed': activeSection && activeSection !== 'ports' && activeSection !== 'selector' }]"
        />

        <!-- Target Backend Pods showing targetPort and labels -->
        <!-- Pod 1 -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'selector' || activeSection === 'ports', 'dimmed': activeSection && activeSection !== 'selector' && activeSection !== 'ports' }]"
          @mouseenter="hoveredSection = 'selector'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="20" y="208" width="110" height="60" rx="6" fill="#FFFFFF" stroke="#E2A03F" stroke-width="1.2" />
          <text x="75" y="226" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#E2A03F">Pod 1</text>
          
          <rect x="28" y="234" width="94" height="26" rx="3" fill="#FFFBF5" stroke="#FEEED8" stroke-width="0.5" />
          <text x="75" y="244" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#E2A03F">labels: app=auth</text>
          <text x="75" y="254" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7px" fill="#64748B">targetPort: 8080</text>
        </g>

        <!-- Pod 2 -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'selector' || activeSection === 'ports', 'dimmed': activeSection && activeSection !== 'selector' && activeSection !== 'ports' }]"
          @mouseenter="hoveredSection = 'selector'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="155" y="208" width="110" height="60" rx="6" fill="#FFFFFF" stroke="#E2A03F" stroke-width="1.2" />
          <text x="210" y="226" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#E2A03F">Pod 2</text>
          
          <rect x="163" y="234" width="94" height="26" rx="3" fill="#FFFBF5" stroke="#FEEED8" stroke-width="0.5" />
          <text x="210" y="244" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#E2A03F">labels: app=auth</text>
          <text x="210" y="254" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7px" fill="#64748B">targetPort: 8080</text>
        </g>

        <!-- Pod 3 -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'selector' || activeSection === 'ports', 'dimmed': activeSection && activeSection !== 'selector' && activeSection !== 'ports' }]"
          @mouseenter="hoveredSection = 'selector'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="290" y="208" width="110" height="60" rx="6" fill="#FFFFFF" stroke="#E2A03F" stroke-width="1.2" />
          <text x="345" y="226" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10px" fill="#E2A03F">Pod 3</text>
          
          <rect x="298" y="234" width="94" height="26" rx="3" fill="#FFFBF5" stroke="#FEEED8" stroke-width="0.5" />
          <text x="345" y="244" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5px" fill="#E2A03F">labels: app=auth</text>
          <text x="345" y="254" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7px" fill="#64748B">targetPort: 8080</text>
        </g>

        <!-- Bottom caption -->
        <text x="210" y="284" text-anchor="middle" font-family="Outfit, sans-serif" font-size="9px" fill="#64748B">The Service bridges port 80 (external) to targetPort 8080 (container) via label matching</text>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceDiagram',
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
        { text: "apiVersion: v1", section: "service" },
        { text: "kind: Service", section: "service" },
        { text: "metadata:", section: "service" },
        { text: "  name: auth-svc", section: "service" },
        { text: "spec:", section: null },
        { text: "  ports:                  # ◄ PORT ROUTING", section: "ports" },
        { text: "  - port: 80              # Exposed Service Port", section: "ports" },
        { text: "    targetPort: 8080      # Destination Pod Port", section: "ports" },
        { text: "  selector:               # ◄ LABEL SELECTOR", section: "selector" },
        { text: "    app: auth             # Matches Pod labels", section: "selector" }
      ]
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      
      if (this.clicks === 1) return 'selector';
      if (this.clicks === 2) return 'ports';
      
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
.code-line.highlighted.line-service {
  background: rgba(0, 136, 184, 0.15);
  border-left-color: #0088B8;
  box-shadow: inset 4px 0 0 #0088B8;
}
.code-line.highlighted.line-ports {
  background: rgba(21, 138, 78, 0.15);
  border-left-color: #158A4E;
  box-shadow: inset 4px 0 0 #158A4E;
}
.code-line.highlighted.line-selector {
  background: rgba(226, 160, 63, 0.15);
  border-left-color: #E2A03F;
  box-shadow: inset 4px 0 0 #E2A03F;
}
</style>

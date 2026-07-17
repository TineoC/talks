<template>
  <div class="split-diagram-container">
    <!-- LEFT COLUMN: YAML Editor -->
    <div class="yaml-editor-card">
      <div class="editor-header">
        <div class="window-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="tab-title">pod.yaml</div>
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

    <!-- RIGHT COLUMN: Pod SVG Blueprint -->
    <div class="visual-panel">
      <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pod-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0088B8" stop-opacity="0.06" />
            <stop offset="100%" stop-color="#0088B8" stop-opacity="0.01" />
          </linearGradient>
        </defs>

        <!-- Outer Pod Boundary -->
        <rect 
          x="10" y="10" width="400" height="280" rx="14" 
          fill="url(#pod-grad)" 
          stroke="#0088B8" 
          :stroke-width="activeSection === 'pod' ? 2.5 : 1.5" 
          stroke-dasharray="6 4"
          :class="['svg-element', { 'focused': activeSection === 'pod', 'dimmed': activeSection && activeSection !== 'pod' }]"
        />
        <text x="210" y="32" text-anchor="middle" font-family="Outfit, sans-serif" fill="#0088B8" font-size="11px" font-weight="900" letter-spacing="0.08em">KUBERNETES POD BOUNDARY</text>

        <!-- Shared Localhost IP Network loop -->
        <rect 
          x="25" y="45" width="370" height="180" rx="10" 
          fill="none" 
          stroke="#00A8D0" 
          :stroke-width="activeSection === 'network' ? 2 : 1" 
          stroke-dasharray="3 3"
          :class="['svg-element', { 'focused': activeSection === 'network', 'dimmed': activeSection && activeSection !== 'network' }]"
        />
        <text x="210" y="60" text-anchor="middle" font-family="Outfit, sans-serif" fill="#00A8D0" font-size="8.5px" font-weight="700">Shared Network Namespace (localhost:8080 ⟷ localhost:9090)</text>

        <!-- Container A: Main App -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'app', 'dimmed': activeSection && activeSection !== 'app' }]"
          @mouseenter="hoveredSection = 'app'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="40" y="75" width="160" height="110" rx="8" fill="#FFFFFF" stroke="#158A4E" :stroke-width="activeSection === 'app' ? 2.5 : 1.5" />
          <rect x="40" y="75" width="160" height="4" rx="2" fill="#158A4E" />
          <text x="120" y="105" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="12px" fill="#158A4E">App Container</text>
          <text x="120" y="125" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8.5px" fill="#64748B">Port: 8080 (HTTP)</text>
          <rect x="55" y="142" width="130" height="15" rx="3.5" fill="#EDF8F2" />
          <text x="120" y="152" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="8px" fill="#158A4E">Main Service Logic</text>
        </g>

        <!-- Container B: Sidecar Exporter -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'sidecar', 'dimmed': activeSection && activeSection !== 'sidecar' }]"
          @mouseenter="hoveredSection = 'sidecar'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="220" y="75" width="160" height="110" rx="8" fill="#FFFFFF" stroke="#E2A03F" :stroke-width="activeSection === 'sidecar' ? 2.5 : 1.5" />
          <rect x="220" y="75" width="160" height="4" rx="2" fill="#E2A03F" />
          <text x="300" y="105" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="12px" fill="#E2A03F">Sidecar Container</text>
          <text x="300" y="125" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8.5px" fill="#64748B">Port: 9090 (Metrics)</text>
          <rect x="235" y="142" width="130" height="15" rx="3.5" fill="#FFFBF5" />
          <text x="300" y="152" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="8px" fill="#E2A03F">Telemetry Collector</text>
        </g>

        <!-- Shared Storage Volume -->
        <g 
          :class="['svg-element', { 'focused': activeSection === 'storage', 'dimmed': activeSection && activeSection !== 'storage' }]"
          @mouseenter="hoveredSection = 'storage'"
          @mouseleave="hoveredSection = null"
        >
          <rect x="40" y="235" width="340" height="40" rx="6" fill="#F8FAFC" stroke="#94A3B8" :stroke-width="activeSection === 'storage' ? 2.2 : 1.2" />
          <text x="210" y="259" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="10.5px" fill="#475569">Shared Volume (emptyDir: {}) mount path: /var/log</text>
          
          <!-- Storage Mount Connectors -->
          <path d="M 120 235 V 185" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="3 2" />
          <path d="M 300 235 V 185" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="3 2" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PodDiagram',
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
        { text: "apiVersion: v1", section: "pod" },
        { text: "kind: Pod", section: "pod" },
        { text: "metadata:", section: "pod" },
        { text: "  name: auth-pod", section: "pod" },
        { text: "spec:", section: null },
        { text: "  containers:", section: null },
        { text: "  - name: auth-app", section: "app" },
        { text: "    image: auth:v1.2.0", section: "app" },
        { text: "    ports:", section: "app" },
        { text: "    - containerPort: 8080", section: "app" },
        { text: "  - name: telemetry-sidecar", section: "sidecar" },
        { text: "    image: otel-collector", section: "sidecar" },
        { text: "    volumeMounts:", section: "storage" },
        { text: "    - mountPath: /var/log", section: "storage" },
        { text: "  volumes:", section: "storage" },
        { text: "  - name: shared-logs", section: "storage" },
        { text: "    emptyDir: {}", section: "storage" }
      ]
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      
      if (this.clicks === 1) return 'app';
      if (this.clicks === 2) return 'sidecar';
      if (this.clicks === 3) return 'storage';
      
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

<style>
/* Shared layouts for all K8s Object Diagram updates */
.split-diagram-container {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  align-items: stretch;
}

.yaml-editor-card {
  background: #0F1C2A;
  border: 1.5px solid #1E293B;
  border-radius: 8px;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  position: relative;
  z-index: 1;
}

.editor-header {
  background: #1E293B;
  height: 28px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.window-dots {
  display: flex;
  gap: 6px;
  margin-right: 12px;
}

.window-dots .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}

.window-dots .dot.red { background: #CF5A5A; }
.window-dots .dot.yellow { background: #E2A03F; }
.window-dots .dot.green { background: #158A4E; }

.tab-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: #94A3B8;
}

.lock-indicator {
  margin-left: auto;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #E2A03F;
  background: rgba(226, 160, 63, 0.1);
  padding: 2px 7px;
  border-radius: 4px;
}

.code-body {
  padding: 12px 0;
  overflow-y: auto;
  flex: 1;
  font-size: 15px;
}

.code-line {
  display: flex;
  align-items: center;
  padding: 3px 14px;
  border-left: 3px solid transparent;
  transition: all 0.25s ease;
  cursor: pointer;
}

.line-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: #475569;
  width: 28px;
  text-align: right;
  margin-right: 14px;
  user-select: none;
}

.line-content {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  line-height: 1.55;
  white-space: pre;
}

/* Dimming helper */
.code-line.dimmed {
  opacity: 0.25;
  filter: blur(0.3px);
}

/* Highlight neon colors */
.code-line.highlighted.line-pod {
  background: rgba(0, 136, 184, 0.15);
  border-left-color: #0088B8;
  box-shadow: inset 4px 0 0 #0088B8;
}
.code-line.highlighted.line-app {
  background: rgba(21, 138, 78, 0.15);
  border-left-color: #158A4E;
  box-shadow: inset 4px 0 0 #158A4E;
}
.code-line.highlighted.line-sidecar {
  background: rgba(226, 160, 63, 0.15);
  border-left-color: #E2A03F;
  box-shadow: inset 4px 0 0 #E2A03F;
}
.code-line.highlighted.line-storage {
  background: rgba(100, 116, 139, 0.15);
  border-left-color: #64748B;
  box-shadow: inset 4px 0 0 #64748B;
}

/* Visual Panel Details */
.visual-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
}

.visual-panel svg {
  width: 100%;
  height: 100%;
  max-height: 350px;
}

.svg-element {
  transition: all 0.3s ease;
}

.svg-element.dimmed {
  opacity: 0.18;
}

.svg-element.focused {
  filter: drop-shadow(0 0 6px rgba(0, 136, 184, 0.2));
}
</style>

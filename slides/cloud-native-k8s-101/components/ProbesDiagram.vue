<template>
  <div class="split-diagram-container">
    <!-- LEFT COLUMN: Deployment YAML with Probes -->
    <div class="yaml-editor-card probes-yaml-card">
      <div class="editor-header">
        <div class="window-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="tab-title">probes.yaml</div>
        <span v-if="clicks > 0" class="lock-indicator">⌨️ Step {{ clicks }}</span>
      </div>
      <div ref="codeBody" class="code-body">
        <div 
          v-for="(line, idx) in yamlLines" 
          :key="idx"
          :data-section="line.section"
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

    <!-- RIGHT COLUMN: Interactive Probes Dashboard -->
    <div class="visual-panel probes-visual-panel">
      <div class="probes-dashboard">
        <!-- 1. STARTUP PROBE CARD -->
        <div 
          :class="['probe-card', 'startup-card', { 'active': activeSection === 'startup', 'inactive': activeSection && activeSection !== 'startup' }]"
          @mouseenter="hoveredSection = 'startup'"
          @mouseleave="hoveredSection = null"
        >
          <div class="probe-header">
            <span class="badge startup-badge">01 · Startup Probe</span>
            <span class="probe-status" :class="activeSection === 'startup' ? 'pulsing' : ''">
              {{ activeSection === 'startup' ? 'Booting App...' : 'Bypassed (Running)' }}
            </span>
          </div>
          <div class="probe-content">
            <div class="progress-container">
              <div class="progress-bar" :style="{ width: activeSection === 'startup' ? '70%' : '100%' }"></div>
            </div>
            <p class="probe-desc">Protects slow-booting apps by holding off Liveness/Readiness probes until execution starts.</p>
          </div>
        </div>

        <!-- 2. LIVENESS PROBE CARD -->
        <div 
          :class="['probe-card', 'liveness-card', { 'active': activeSection === 'liveness', 'inactive': activeSection && activeSection !== 'liveness' }]"
          @mouseenter="hoveredSection = 'liveness'"
          @mouseleave="hoveredSection = null"
        >
          <div class="probe-header">
            <span class="badge liveness-badge">02 · Liveness Probe</span>
            <span class="probe-status" :class="activeSection === 'liveness' ? 'healthy-pulse' : ''">
              {{ activeSection === 'liveness' ? 'Heartbeat: OK' : 'Checking...' }}
            </span>
          </div>
          <div class="probe-content">
            <!-- Pulsing Heartbeat EKG line SVG -->
            <svg class="ekg-line" viewBox="0 0 200 30" width="100%" height="25">
              <path 
                d="M0,15 L60,15 L70,5 L80,25 L90,12 L95,18 L100,15 L200,15" 
                fill="none" 
                stroke="#158A4E" 
                stroke-width="1.8"
                :class="{ 'animate-ekg': activeSection === 'liveness' }"
              />
            </svg>
            <p class="probe-desc">Checks if the process has hung. If checks fail, Kubelet automatically restarts the container.</p>
          </div>
        </div>

        <!-- 3. READINESS PROBE CARD -->
        <div 
          :class="['probe-card', 'readiness-card', { 'active': activeSection === 'readiness', 'inactive': activeSection && activeSection !== 'readiness' }]"
          @mouseenter="hoveredSection = 'readiness'"
          @mouseleave="hoveredSection = null"
        >
          <div class="probe-header">
            <span class="badge readiness-badge">03 · Readiness Probe</span>
            <span class="probe-status" :class="activeSection === 'readiness' ? 'gating' : ''">
              {{ activeSection === 'readiness' ? 'Routing Traffic' : 'Ready' }}
            </span>
          </div>
          <div class="probe-content">
            <div class="traffic-gate">
              <span class="gate-label">Service Ingress</span>
              <span class="gate-arrow" :class="{ 'flowing': activeSection === 'readiness' }">➔</span>
              <span class="gate-target" :class="{ 'connected': activeSection === 'readiness' }">Active Pod Pool</span>
            </div>
            <p class="probe-desc">Checks if container can receive requests. If not, temporarily removes it from service endpoints.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProbesDiagram',
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
        { text: "apiVersion: apps/v1", section: null },
        { text: "kind: Deployment", section: null },
        { text: "spec:", section: null },
        { text: "  template:", section: null },
        { text: "    spec:", section: null },
        { text: "      containers:", section: null },
        { text: "      - name: main-app", section: null },
        { text: "        image: main-app:1.4.0", section: null },
        { text: "        ports:", section: null },
        { text: "        - containerPort: 8080", section: null },
        { text: "        startupProbe:          # ◄ 1. BOOT GRACE", section: "startup" },
        { text: "          httpGet:", section: "startup" },
        { text: "            path: /startup", section: "startup" },
        { text: "            port: 8080", section: "startup" },
        { text: "          failureThreshold: 30", section: "startup" },
        { text: "          periodSeconds: 10", section: "startup" },
        { text: "        livenessProbe:         # ◄ 2. ALIVE CHECK", section: "liveness" },
        { text: "          httpGet:", section: "liveness" },
        { text: "            path: /healthz", section: "liveness" },
        { text: "            port: 8080", section: "liveness" },
        { text: "          periodSeconds: 10", section: "liveness" },
        { text: "          timeoutSeconds: 1", section: "liveness" },
        { text: "          failureThreshold: 3", section: "liveness" },
        { text: "        readinessProbe:        # ◄ 3. TRAFFIC GATE", section: "readiness" },
        { text: "          httpGet:", section: "readiness" },
        { text: "            path: /ready", section: "readiness" },
        { text: "            port: 8080", section: "readiness" },
        { text: "          initialDelaySeconds: 5", section: "readiness" },
        { text: "          periodSeconds: 5", section: "readiness" },
        { text: "          successThreshold: 1", section: "readiness" }
      ]
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      
      if (this.clicks === 1) return 'startup';
      if (this.clicks === 2) return 'liveness';
      if (this.clicks === 3) return 'readiness';
      
      return null;
    }
  },
  watch: {
    activeSection(newVal) {
      if (newVal) {
        this.scrollToSection(newVal);
      }
    },
    clicks(newVal) {
      if (newVal > 0) {
        this.scrollToSection(this.activeSection);
      }
    }
  },
  methods: {
    scrollToSection(section) {
      if (!section) return;
      this.$nextTick(() => {
        const container = this.$refs.codeBody;
        const target = this.$el.querySelector(`.code-line[data-section="${section}"]`);
        if (!container || !target) return;

        // Pin the first line of the active probe near the top so the full block is visible
        const relativeTop =
          target.getBoundingClientRect().top -
          container.getBoundingClientRect().top +
          container.scrollTop;
        const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
        const targetScroll = Math.min(Math.max(0, relativeTop - 8), maxScroll);

        container.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      });
    },
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
.probes-yaml-card {
  height: 360px;
}

.probes-visual-panel {
  height: 360px;
}

.probes-dashboard {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  padding-right: 5px;
}

.probe-card {
  background: #FFFFFF;
  border: 1.2px solid #E2E8F0;
  border-radius: 6px;
  padding: 8px 12px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.probe-card.active {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.probe-card.active.startup-card { border-color: #E2A03F; }
.probe-card.active.liveness-card { border-color: #158A4E; }
.probe-card.active.readiness-card { border-color: #0088B8; }

.probe-card.inactive {
  opacity: 0.4;
  filter: grayscale(0.5);
}

.probe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.badge {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 9px;
  padding: 1.5px 6px;
  border-radius: 4px;
}

.startup-badge { background: #FFFBF5; color: #E2A03F; }
.liveness-badge { background: #EDF8F2; color: #158A4E; }
.readiness-badge { background: #E8F4FA; color: #0088B8; }

.probe-status {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 8px;
  color: #64748B;
}

.probe-status.pulsing {
  color: #E2A03F;
  animation: flash 1s infinite alternate;
}

.probe-status.healthy-pulse {
  color: #158A4E;
  animation: flash 0.8s infinite alternate;
}

.probe-status.gating {
  color: #0088B8;
}

.probe-content {
  margin-top: 4px;
}

.probe-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 8px;
  color: #64748B;
  margin: 3px 0 0 0;
  line-height: 1.2;
}

/* Progress bar for Startup Probe */
.progress-container {
  width: 100%;
  height: 4px;
  background: #E2E8F0;
  border-radius: 2px;
  margin-bottom: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #E2A03F;
  transition: width 1s linear;
}

/* EKG EKG Heartbeat SVG Animation */
.ekg-line path.animate-ekg {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: draw-ekg 2s linear infinite;
}

@keyframes draw-ekg {
  to {
    stroke-dashoffset: 0;
  }
}

/* Traffic Gate styles for Readiness */
.traffic-gate {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F8FAFC;
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 2px;
}

.gate-label, .gate-target {
  font-family: 'Outfit', sans-serif;
  font-size: 8px;
  color: #64748B;
}

.gate-arrow {
  color: #94A3B8;
  font-weight: bold;
}

.gate-arrow.flowing {
  color: #0088B8;
  animation: slide-right 1s infinite linear;
}

.gate-target.connected {
  color: #158A4E;
  font-weight: 700;
}

@keyframes slide-right {
  0% { transform: translateX(-3px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(3px); opacity: 0; }
}

@keyframes flash {
  from { opacity: 0.5; }
  to { opacity: 1; }
}

/* Code Highlights */
.code-line.highlighted.line-startup {
  background: rgba(226, 160, 63, 0.15);
  border-left-color: #E2A03F;
  box-shadow: inset 4px 0 0 #E2A03F;
}
.code-line.highlighted.line-liveness {
  background: rgba(21, 138, 78, 0.15);
  border-left-color: #158A4E;
  box-shadow: inset 4px 0 0 #158A4E;
}
.code-line.highlighted.line-readiness {
  background: rgba(0, 136, 184, 0.15);
  border-left-color: #0088B8;
  box-shadow: inset 4px 0 0 #0088B8;
}
</style>

<template>
  <div class="k8s-highlights-container">
    <!-- LEFT PANEL: YAML Code Editor Wrapper (Allows glowing backdrop) -->
    <div class="yaml-editor-wrapper">
      <div :class="['glow-blob', activeSection]"></div>
      
      <div class="yaml-editor-card">
        <div class="editor-header">
          <div class="window-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="tab-title">deployment.yaml</div>
          <span v-if="selectedSection" class="lock-indicator">🔒 Locked Focus</span>
          <span v-else-if="clicks > 0" class="lock-indicator">⌨️ Keyboard Step {{ clicks }}</span>
        </div>
        <div class="code-body">
          <div 
            v-for="(line, idx) in yamlLines" 
            :key="idx" 
            :data-section="line.section"
            :class="[
              'code-line', 
              getLineClass(idx + 1),
              { 
                'highlighted': isLineActive(idx + 1), 
                'dimmed': activeSection && !isLineActive(idx + 1) 
              }
            ]"
          >
            <span class="line-num">{{ idx + 1 }}</span>
            <span class="line-content" v-html="highlightYAML(line.text)"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL: Benefits Cards -->
    <div class="benefits-panel">
      <!-- 1. Declarative Card -->
      <div 
        class="benefit-card declarative"
        :class="{ 'active': activeSection === 'declarative', 'locked': selectedSection === 'declarative' }"
        @mouseenter="hoveredSection = 'declarative'"
        @mouseleave="hoveredSection = null"
        @click="selectSection('declarative')"
      >
        <div class="card-header">
          <span class="badge declarative-badge">01</span>
          <h3>🎯 Declarative desired state</h3>
          <span v-if="selectedSection === 'declarative'" class="card-lock-badge">Selected</span>
        </div>
        <p>Tell the API what you want, not how to build it. Kubernetes schedules and maintains exactly <strong>replicas: 3</strong> to guarantee app instances stay active.</p>
      </div>

      <!-- 2. Self-Healing Card -->
      <div 
        class="benefit-card self-healing"
        :class="{ 'active': activeSection === 'healing', 'locked': selectedSection === 'healing' }"
        @mouseenter="hoveredSection = 'healing'"
        @mouseleave="hoveredSection = null"
        @click="selectSection('healing')"
      >
        <div class="card-header">
          <span class="badge healing-badge">02</span>
          <h3>🩹 Self-healing loops</h3>
          <span v-if="selectedSection === 'healing'" class="card-lock-badge">Selected</span>
        </div>
        <p>If a container crashes or hangs, the <strong>livenessProbe</strong> fails. Kubernetes kills the unhealthy process and spawns a fresh replacement instantly.</p>
      </div>

      <!-- 3. Portability Card -->
      <div 
        class="benefit-card portable"
        :class="{ 'active': activeSection === 'portable', 'locked': selectedSection === 'portable' }"
        @mouseenter="hoveredSection = 'portable'"
        @mouseleave="hoveredSection = null"
        @click="selectSection('portable')"
      >
        <div class="card-header">
          <span class="badge portable-badge">03</span>
          <h3>🌍 Portability (Runs Everywhere)</h3>
          <span v-if="selectedSection === 'portable'" class="card-lock-badge">Selected</span>
        </div>
        <p>Kubernetes abstracts hardware via APIs. Run the exact same YAML manifest unmodified across local laptops (Kind), on-prem private clouds, and public cloud providers (AWS, GCP, Azure).</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'K8sDeploymentHighlights',
  props: {
    clicks: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      hoveredSection: null,
      selectedSection: null, // Click locks focus on a section
      yamlLines: [
        { text: "apiVersion: apps/v1", section: null },
        { text: "kind: Deployment", section: null },
        { text: "metadata:", section: null },
        { text: "  name: auth-service", section: null },
        { text: "spec:", section: null },
        { text: "  replicas: 3             # ◄ DECLARATIVE", section: "declarative" },
        { text: "  selector:", section: "declarative" },
        { text: "    matchLabels:", section: "declarative" },
        { text: "      app: auth", section: "declarative" },
        { text: "  template:", section: null },
        { text: "    metadata:", section: null },
        { text: "      labels:", section: null },
        { text: "        app: auth", section: null },
        { text: "    spec:", section: null },
        { text: "      containers:", section: null },
        { text: "      - name: auth", section: null },
        { text: "        image: auth:v1.2.0", section: null },
        { text: "        resources:        # ◄ PORTABILITY: laptop ➔ cloud", section: "portable" },
        { text: "          limits:", section: "portable" },
        { text: "            cpu: \"500m\"", section: "portable" },
        { text: "            memory: \"256Mi\"", section: "portable" },
        { text: "        livenessProbe:    # ◄ SELF-HEALING", section: "healing" },
        { text: "          httpGet:", section: "healing" },
        { text: "            path: /healthz", section: "healing" },
        { text: "            port: 8080", section: "healing" },
        { text: "          initialDelaySeconds: 5", section: "healing" }
      ]
    };
  },
  computed: {
    activeSection() {
      // 1. Mouse hover has highest priority
      if (this.hoveredSection) return this.hoveredSection;
      
      // 2. Click-lock selection has second priority
      if (this.selectedSection) return this.selectedSection;
      
      // 3. Keyboard slide clicks have third priority
      if (this.clicks === 1) return 'declarative';
      if (this.clicks === 2) return 'healing';
      if (this.clicks === 3) return 'portable';
      
      return null;
    }
  },
  watch: {
    activeSection(newVal) {
      if (newVal) {
        this.scrollToSection(newVal);
      }
    }
  },
  methods: {
    selectSection(section) {
      if (this.selectedSection === section) {
        this.selectedSection = null; // Deselect on click
      } else {
        this.selectedSection = section; // Lock focus
      }
    },
    scrollToSection(section) {
      this.$nextTick(() => {
        const container = this.$el.querySelector('.code-body');
        const target = this.$el.querySelector(`.code-line[data-section="${section}"]`);
        if (container && target) {
          const containerRect = container.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          
          const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
          const targetScroll = relativeTop - (container.clientHeight / 2) + (target.clientHeight / 2);
          
          container.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: 'smooth'
          });
        }
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
    },
    getLineClass(lineNum) {
      const line = this.yamlLines[lineNum - 1];
      if (!line || !line.section) return '';
      return `line-${line.section}`;
    },
    isLineActive(lineNum) {
      const line = this.yamlLines[lineNum - 1];
      return line && line.section === this.activeSection;
    }
  }
};
</script>

<style scoped>
.k8s-highlights-container {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 1.5rem;
  width: 100%;
  height: 410px;
  align-items: center;
}

/* YAML EDITOR CARD WRAPPER & GLOW BACKDROP */
.yaml-editor-wrapper {
  position: relative;
  height: 380px;
  width: 100%;
}

.glow-blob {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(80px);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  pointer-events: none;
}

.glow-blob.declarative {
  background: rgba(226, 160, 63, 0.18);
  opacity: 1;
}

.glow-blob.healing {
  background: rgba(21, 138, 78, 0.18);
  opacity: 1;
}

.glow-blob.portable {
  background: rgba(0, 136, 184, 0.18);
  opacity: 1;
}

.yaml-editor-card {
  background: #0F1C2A;
  border: 1.5px solid #1E293B;
  border-radius: 8px;
  height: 100%;
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
  position: relative;
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
  font-size: 10px;
  color: #94A3B8;
}

.lock-indicator {
  position: absolute;
  right: 12px;
  font-family: 'Outfit', sans-serif;
  font-size: 9px;
  font-weight: 700;
  color: #E2A03F;
  background: rgba(226, 160, 63, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
}

.code-body {
  padding: 10px 0;
  overflow-y: auto;
  flex: 1;
}

.code-line {
  display: flex;
  align-items: center;
  padding: 1px 12px;
  border-left: 3px solid transparent;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
}

.line-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  color: #475569;
  width: 24px;
  text-align: right;
  margin-right: 12px;
  user-select: none;
}

.line-content {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  white-space: pre;
}

/* DIM OUT OTHER LINES ON HOVER */
.code-line.dimmed {
  opacity: 0.25;
  filter: blur(0.3px);
}

/* ACTIVE HIGHLIGHT STYLES WITH GLOW EFFECTS */
.code-line.highlighted.line-declarative {
  background: rgba(226, 160, 63, 0.18);
  border-left-color: #E2A03F;
  box-shadow: inset 4px 0 0 #E2A03F, 0 0 12px rgba(226, 160, 63, 0.25);
}

.code-line.highlighted.line-healing {
  background: rgba(21, 138, 78, 0.18);
  border-left-color: #158A4E;
  box-shadow: inset 4px 0 0 #158A4E, 0 0 12px rgba(21, 138, 78, 0.25);
}

.code-line.highlighted.line-portable {
  background: rgba(0, 136, 184, 0.18);
  border-left-color: #0088B8;
  box-shadow: inset 4px 0 0 #0088B8, 0 0 12px rgba(0, 136, 184, 0.25);
}

/* BENEFITS LIST */
.benefits-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 380px;
  justify-content: center;
}

.benefit-card {
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  position: relative;
}

.benefit-card h3 {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  color: #0F1C2A;
}

.benefit-card p {
  margin: 4px 0 0 0;
  font-size: 10px;
  line-height: 1.4;
  color: #5A6A7A;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.card-lock-badge {
  font-family: 'Outfit', sans-serif;
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  color: #FFFFFF;
  background: #0F1C2A;
  padding: 1px 5px;
  border-radius: 3px;
  margin-left: auto;
}

/* NEON GLOW PULSE KEYFRAMES */
@keyframes pulse-declarative-glow {
  0% { box-shadow: 0 0 15px rgba(226, 160, 63, 0.25), 0 4px 6px rgba(0,0,0,0.02); }
  50% { box-shadow: 0 0 25px rgba(226, 160, 63, 0.5), 0 4px 6px rgba(0,0,0,0.02); }
  100% { box-shadow: 0 0 15px rgba(226, 160, 63, 0.25), 0 4px 6px rgba(0,0,0,0.02); }
}

@keyframes pulse-healing-glow {
  0% { box-shadow: 0 0 15px rgba(21, 138, 78, 0.25), 0 4px 6px rgba(0,0,0,0.02); }
  50% { box-shadow: 0 0 25px rgba(21, 138, 78, 0.5), 0 4px 6px rgba(0,0,0,0.02); }
  100% { box-shadow: 0 0 15px rgba(21, 138, 78, 0.25), 0 4px 6px rgba(0,0,0,0.02); }
}

@keyframes pulse-portable-glow {
  0% { box-shadow: 0 0 15px rgba(0, 136, 184, 0.25), 0 4px 6px rgba(0,0,0,0.02); }
  50% { box-shadow: 0 0 25px rgba(0, 136, 184, 0.5), 0 4px 6px rgba(0,0,0,0.02); }
  100% { box-shadow: 0 0 15px rgba(0, 136, 184, 0.25), 0 4px 6px rgba(0,0,0,0.02); }
}

/* Card Neon Glow Accents on Hover/Active */
.benefit-card.declarative.active {
  border-color: #E2A03F;
  animation: pulse-declarative-glow 2s infinite ease-in-out;
  transform: translateY(-2px);
}
.benefit-card.declarative.active .declarative-badge {
  box-shadow: 0 0 8px rgba(226, 160, 63, 0.4);
}
.declarative-badge {
  background: rgba(226, 160, 63, 0.1);
  color: #E2A03F;
}

.benefit-card.self-healing.active {
  border-color: #158A4E;
  animation: pulse-healing-glow 2s infinite ease-in-out;
  transform: translateY(-2px);
}
.benefit-card.self-healing.active .healing-badge {
  box-shadow: 0 0 8px rgba(21, 138, 78, 0.4);
}
.healing-badge {
  background: rgba(21, 138, 78, 0.1);
  color: #158A4E;
}

.benefit-card.portable.active {
  border-color: #0088B8;
  animation: pulse-portable-glow 2s infinite ease-in-out;
  transform: translateY(-2px);
}
.benefit-card.portable.active .portable-badge {
  box-shadow: 0 0 8px rgba(0, 136, 184, 0.4);
}
.portable-badge {
  background: rgba(0, 136, 184, 0.1);
  color: #0088B8;
}
</style>

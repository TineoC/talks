<template>
  <div class="split-diagram-container config-diagram">
    <!-- LEFT: ConfigMap YAML -->
    <div class="yaml-editor-card config-yaml-card">
      <div class="editor-header">
        <div class="window-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="tab-title">configmap.yaml</div>
        <span v-if="clicks > 0" class="lock-indicator">⌨️ Step {{ clicks }}</span>
      </div>
      <div class="code-body">
        <div
          v-for="(line, idx) in yamlLines"
          :key="idx"
          :data-section="line.section"
          :class="[
            'code-line',
            line.section ? 'line-' + line.section : '',
            {
              highlighted: activeSection === line.section,
              dimmed: activeSection && activeSection !== line.section
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

    <!-- RIGHT: injection cards -->
    <div class="visual-panel config-visual">
      <div class="config-cards">
        <div
          :class="['cfg-card', { active: activeSection === 'data', inactive: activeSection && activeSection !== 'data' }]"
          @mouseenter="hoveredSection = 'data'"
          @mouseleave="hoveredSection = null"
        >
          <span class="badge data-badge">01 · ConfigMap data</span>
          <p>Non-secret settings: feature flags, URLs, log levels. Plain key/value — safe to commit patterns, not passwords.</p>
        </div>

        <div
          :class="['cfg-card', { active: activeSection === 'env', inactive: activeSection && activeSection !== 'env' }]"
          @mouseenter="hoveredSection = 'env'"
          @mouseleave="hoveredSection = null"
        >
          <span class="badge env-badge">02 · Inject as env</span>
          <p>Mount into the container as environment variables via <code>envFrom</code> / <code>valueFrom</code>.</p>
          <div class="mini-term">APP_ENV=staging · LOG_LEVEL=info</div>
        </div>

        <div
          :class="['cfg-card', { active: activeSection === 'volume', inactive: activeSection && activeSection !== 'volume' }]"
          @mouseenter="hoveredSection = 'volume'"
          @mouseleave="hoveredSection = null"
        >
          <span class="badge vol-badge">03 · Inject as files</span>
          <p>Mount as a volume — each key becomes a file under a path like <code>/etc/config</code>.</p>
          <div class="mini-term">/etc/config/APP_ENV → staging</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigDiagram',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return {
      hoveredSection: null,
      yamlLines: [
        { text: "apiVersion: v1", section: null },
        { text: "kind: ConfigMap", section: null },
        { text: "metadata:", section: null },
        { text: "  name: app-config", section: null },
        { text: "data:                    # ◄ NON-SECRET KV", section: "data" },
        { text: "  APP_ENV: staging", section: "data" },
        { text: "  LOG_LEVEL: info", section: "data" },
        { text: "  FEATURE_X: \"true\"", section: "data" },
        { text: "---", section: null },
        { text: "apiVersion: v1", section: null },
        { text: "kind: Pod", section: null },
        { text: "spec:", section: null },
        { text: "  containers:", section: null },
        { text: "  - name: app", section: null },
        { text: "    envFrom:              # ◄ AS ENV VARS", section: "env" },
        { text: "    - configMapRef:", section: "env" },
        { text: "        name: app-config", section: "env" },
        { text: "    volumeMounts:         # ◄ AS FILES", section: "volume" },
        { text: "    - name: cfg", section: "volume" },
        { text: "      mountPath: /etc/config", section: "volume" },
        { text: "  volumes:", section: "volume" },
        { text: "  - name: cfg", section: "volume" },
        { text: "    configMap:", section: "volume" },
        { text: "      name: app-config", section: "volume" }
      ]
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      if (this.clicks === 1) return 'data';
      if (this.clicks === 2) return 'env';
      if (this.clicks === 3) return 'volume';
      return null;
    }
  },
  watch: {
    activeSection(newVal) {
      if (newVal) this.scrollToSection(newVal);
    }
  },
  methods: {
    scrollToSection(section) {
      this.$nextTick(() => {
        const container = this.$el.querySelector('.code-body');
        const target = this.$el.querySelector(`.code-line[data-section="${section}"]`);
        if (!container || !target) return;
        const relativeTop =
          target.getBoundingClientRect().top -
          container.getBoundingClientRect().top +
          container.scrollTop;
        const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
        container.scrollTo({
          top: Math.min(Math.max(0, relativeTop - 8), maxScroll),
          behavior: 'smooth'
        });
      });
    },
    highlightYAML(text) {
      let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      if (html.includes("#")) {
        const parts = html.split("#");
        return this.highlightCode(parts[0]) + `<span style="color: #64748B;">#${parts[1]}</span>`;
      }
      return this.highlightCode(html);
    },
    highlightCode(code) {
      if (!code.includes(":")) return `<span style="color: #F8F8F2;">${code}</span>`;
      const idx = code.indexOf(":");
      const key = code.substring(0, idx);
      const val = code.substring(idx + 1);
      const keySpan = `<span style="color: #F92672; font-weight: 700;">${key}</span><span style="color: #F8F8F2;">:</span>`;
      const trimmedVal = val.trim();
      if (!trimmedVal) return keySpan + val;
      if (!isNaN(trimmedVal) && trimmedVal !== "") {
        return keySpan + val.replace(trimmedVal, `<span style="color: #AE81FF;">${trimmedVal}</span>`);
      }
      if (trimmedVal.includes('"') || trimmedVal.includes("'")) {
        return keySpan + val.replace(trimmedVal, `<span style="color: #E6DB74;">${trimmedVal}</span>`);
      }
      return keySpan + val.replace(trimmedVal, `<span style="color: #A6E22E;">${trimmedVal}</span>`);
    }
  }
};
</script>

<style scoped>
.config-diagram {
  height: 100%;
  min-height: 0;
}

.config-yaml-card {
  height: 100%;
  min-height: 0;
}

.config-visual {
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
}

.config-cards {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
}

.cfg-card {
  background: #FFFFFF;
  border: 1.2px solid #E2E8F0;
  border-radius: 6px;
  padding: 10px 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cfg-card.active {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.cfg-card.active:nth-child(1) { border-color: #0088B8; }
.cfg-card.active:nth-child(2) { border-color: #158A4E; }
.cfg-card.active:nth-child(3) { border-color: #E2A03F; }

.cfg-card.inactive {
  opacity: 0.4;
  filter: grayscale(0.5);
}

.cfg-card p {
  margin: 6px 0 0;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  color: #64748B;
  line-height: 1.35;
}

.cfg-card code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: #0088B8;
}

.badge {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
}

.data-badge { background: #E8F4FA; color: #0088B8; }
.env-badge { background: #EDF8F2; color: #158A4E; }
.vol-badge { background: #FFFBF5; color: #E2A03F; }

.mini-term {
  margin-top: 6px;
  background: #0F1C2A;
  color: #A6E22E;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  padding: 5px 8px;
  border-radius: 4px;
}

.code-line.highlighted.line-data {
  background: rgba(0, 136, 184, 0.15);
  border-left-color: #0088B8;
  box-shadow: inset 4px 0 0 #0088B8;
}
.code-line.highlighted.line-env {
  background: rgba(21, 138, 78, 0.15);
  border-left-color: #158A4E;
  box-shadow: inset 4px 0 0 #158A4E;
}
.code-line.highlighted.line-volume {
  background: rgba(226, 160, 63, 0.15);
  border-left-color: #E2A03F;
  box-shadow: inset 4px 0 0 #E2A03F;
}
</style>

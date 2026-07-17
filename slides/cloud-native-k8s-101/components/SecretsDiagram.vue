<template>
  <div class="split-diagram-container secrets-diagram">
    <!-- LEFT: Secret YAML -->
    <div class="yaml-editor-card secrets-yaml-card">
      <div class="editor-header">
        <div class="window-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="tab-title">secret.yaml</div>
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

    <!-- RIGHT: encoding callouts -->
    <div class="visual-panel secrets-visual">
      <div class="secrets-cards">
        <div
          :class="['sec-card', { active: activeSection === 'data', inactive: activeSection && activeSection !== 'data' }]"
          @mouseenter="hoveredSection = 'data'"
          @mouseleave="hoveredSection = null"
        >
          <span class="badge data-badge">01 · Looks opaque</span>
          <p>Values under <code>data:</code> look scrambled. Easy to assume they’re encrypted.</p>
          <div class="mini-term muted">password: cGFzc3dvcmQxMjM=</div>
        </div>

        <div
          :class="['sec-card myth', { active: activeSection === 'decode', inactive: activeSection && activeSection !== 'decode' }]"
          @mouseenter="hoveredSection = 'decode'"
          @mouseleave="hoveredSection = null"
        >
          <span class="badge myth-badge">02 · Encoded ≠ encrypted</span>
          <p>It’s only <strong>base64</strong>. Anyone with read access can decode it in one command.</p>
          <div class="mini-term warn">
            <div>$ echo cGFzc3dvcmQxMjM= | base64 -d</div>
            <div class="out">password123</div>
          </div>
        </div>

        <div
          :class="['sec-card', { active: activeSection === 'protect', inactive: activeSection && activeSection !== 'protect' }]"
          @mouseenter="hoveredSection = 'protect'"
          @mouseleave="hoveredSection = null"
        >
          <span class="badge protect-badge">03 · Real protection</span>
          <p>RBAC least privilege · etcd encryption at rest · External Secrets / Sealed Secrets / vaults.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecretsDiagram',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return {
      hoveredSection: null,
      yamlLines: [
        { text: "apiVersion: v1", section: null },
        { text: "kind: Secret", section: null },
        { text: "metadata:", section: null },
        { text: "  name: db-creds", section: null },
        { text: "type: Opaque", section: null },
        { text: "data:                       # ◄ BASE64 ONLY", section: "data" },
        { text: "  username: YWRtaW4=", section: "data" },
        { text: "  password: cGFzc3dvcmQxMjM=", section: "data" },
        { text: "# NOT encryption — just encoding", section: "decode" },
        { text: "# echo cGFzc3dvcmQxMjM= | base64 -d", section: "decode" },
        { text: "# → password123", section: "decode" },
        { text: "---", section: null },
        { text: "# Protect with:", section: "protect" },
        { text: "#  · RBAC (who can get secrets)", section: "protect" },
        { text: "#  · Encryption at rest (etcd)", section: "protect" },
        { text: "#  · External / Sealed Secrets", section: "protect" }
      ]
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      if (this.clicks === 1) return 'data';
      if (this.clicks === 2) return 'decode';
      if (this.clicks === 3) return 'protect';
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
      if (html.trimStart().startsWith("#")) {
        return `<span style="color: #64748B;">${html}</span>`;
      }
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
      return keySpan + val.replace(trimmedVal, `<span style="color: #E6DB74;">${trimmedVal}</span>`);
    }
  }
};
</script>

<style scoped>
.secrets-diagram {
  height: 100%;
  min-height: 0;
}

.secrets-yaml-card {
  height: 100%;
  min-height: 0;
}

.secrets-visual {
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
}

.secrets-cards {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
}

.sec-card {
  background: #FFFFFF;
  border: 1.2px solid #E2E8F0;
  border-radius: 6px;
  padding: 10px 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.sec-card.active {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.sec-card.active:nth-child(1) { border-color: #64748B; }
.sec-card.myth.active { border-color: #CF5A5A; }
.sec-card.active:nth-child(3) { border-color: #158A4E; }

.sec-card.inactive {
  opacity: 0.4;
  filter: grayscale(0.5);
}

.sec-card p {
  margin: 6px 0 0;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  color: #64748B;
  line-height: 1.35;
}

.sec-card code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: #CF5A5A;
}

.sec-card strong {
  color: #CF5A5A;
  font-weight: 800;
}

.badge {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
}

.data-badge { background: #F1F5F9; color: #475569; }
.myth-badge { background: #FDECEC; color: #CF5A5A; }
.protect-badge { background: #EDF8F2; color: #158A4E; }

.mini-term {
  margin-top: 6px;
  background: #0F1C2A;
  color: #A6E22E;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  padding: 5px 8px;
  border-radius: 4px;
  line-height: 1.45;
}

.mini-term.muted {
  color: #E6DB74;
}

.mini-term.warn .out {
  color: #CF5A5A;
  font-weight: 700;
}

.code-line.highlighted.line-data {
  background: rgba(100, 116, 139, 0.18);
  border-left-color: #64748B;
  box-shadow: inset 4px 0 0 #64748B;
}
.code-line.highlighted.line-decode {
  background: rgba(207, 90, 90, 0.15);
  border-left-color: #CF5A5A;
  box-shadow: inset 4px 0 0 #CF5A5A;
}
.code-line.highlighted.line-protect {
  background: rgba(21, 138, 78, 0.15);
  border-left-color: #158A4E;
  box-shadow: inset 4px 0 0 #158A4E;
}
</style>

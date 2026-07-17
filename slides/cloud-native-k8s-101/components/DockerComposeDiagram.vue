<template>
  <div class="split-diagram-container compose-diagram">
    <!-- LEFT: docker-compose.yml -->
    <div class="yaml-editor-card compose-yaml-card">
      <div class="editor-header">
        <div class="window-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="tab-title">docker-compose.yml · acme-corp</div>
        <span v-if="clicks > 0" class="lock-indicator">⌨️ Step {{ clicks }}</span>
      </div>
      <div ref="codeBody" class="code-body">
        <div
          v-for="(line, idx) in visibleLines"
          :key="idx"
          :data-section="line.section"
          :class="[
            'code-line',
            line.section ? 'line-' + line.section : '',
            {
              highlighted: activeSection === line.section,
              dimmed: activeSection && line.section && activeSection !== line.section,
              'line-enter': line.revealed
            }
          ]"
          :style="{ animationDelay: `${idx * 28}ms` }"
          @mouseenter="hoveredSection = line.section"
          @mouseleave="hoveredSection = null"
        >
          <span class="line-num">{{ idx + 1 }}</span>
          <span class="line-content" v-html="highlightYAML(line.text)"></span>
        </div>
      </div>
    </div>

    <!-- RIGHT: story cards -->
    <div class="visual-panel compose-visual">
      <div class="compose-cards">
        <div
          :class="['cmp-card', { active: activeSection === 'stack', inactive: activeSection && activeSection !== 'stack' }]"
          @mouseenter="hoveredSection = 'stack'"
          @mouseleave="hoveredSection = null"
        >
          <span class="badge stack-badge">01 · Acme Corp stack</span>
          <p>One file runs the company API with Postgres and Redis — same laptop for every engineer.</p>
          <div class="mini-term">$ docker compose up</div>
        </div>

        <div
          :class="['cmp-card pros', { active: activeSection === 'pros', inactive: activeSection && activeSection !== 'pros' }]"
          @mouseenter="hoveredSection = 'pros'"
          @mouseleave="hoveredSection = null"
        >
          <span class="badge pros-badge">02 · Why teams love it</span>
          <ul>
            <li>Declarative multi-service local env</li>
            <li>Shared networks + <code>depends_on</code></li>
            <li>Fast onboarding — clone and compose up</li>
          </ul>
        </div>

        <div
          :class="['cmp-card limits', { active: activeSection === 'limits', inactive: activeSection && activeSection !== 'limits' }]"
          @mouseenter="hoveredSection = 'limits'"
          @mouseleave="hoveredSection = null"
        >
          <span class="badge limits-badge">03 · Production limits</span>
          <ul>
            <li>Single host — no cluster scheduling</li>
            <li>Weak self-healing / rolling updates</li>
            <li>Secrets often plain env files</li>
            <li>Scaling &amp; HA need something else → K8s</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DockerComposeDiagram',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return {
      hoveredSection: null,
      revealCount: 0,
      yamlLines: [
        { text: "# Acme Corp — local company stack", section: "stack" },
        { text: "services:", section: "stack" },
        { text: "  api:", section: "stack" },
        { text: "    image: acme/api:1.4.0", section: "stack" },
        { text: "    ports:", section: "stack" },
        { text: "      - \"8080:8080\"", section: "stack" },
        { text: "    environment:", section: "stack" },
        { text: "      DATABASE_URL: postgres://acme:secret@db:5432/acme", section: "stack" },
        { text: "      REDIS_URL: redis://cache:6379", section: "stack" },
        { text: "    depends_on:", section: "stack" },
        { text: "      - db", section: "stack" },
        { text: "      - cache", section: "stack" },
        { text: "  db:", section: "stack" },
        { text: "    image: postgres:16", section: "stack" },
        { text: "    volumes:", section: "stack" },
        { text: "      - pgdata:/var/lib/postgresql/data", section: "stack" },
        { text: "  cache:", section: "stack" },
        { text: "    image: redis:7-alpine", section: "stack" },
        { text: "volumes:", section: "stack" },
        { text: "  pgdata:", section: "stack" },
        { text: "", section: null },
        { text: "# ✓ Great for: laptop + CI smoke tests", section: "pros" },
        { text: "# ✓ One command for the whole company stack", section: "pros" },
        { text: "# ✓ Same compose file across the engineering team", section: "pros" },
        { text: "", section: null },
        { text: "# ✗ One machine — no multi-node scheduling", section: "limits" },
        { text: "# ✗ No Deployment-style rolling updates / probes", section: "limits" },
        { text: "# ✗ Secrets in compose/env often plaintext", section: "limits" },
        { text: "# ✗ Production HA / scale → need an orchestrator", section: "limits" }
      ]
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      if (this.clicks === 1) return 'stack';
      if (this.clicks === 2) return 'pros';
      if (this.clicks === 3) return 'limits';
      return null;
    },
    visibleLines() {
      const count = this.revealCount;
      return this.yamlLines.map((line, idx) => ({
        ...line,
        revealed: idx < count
      })).filter((_, idx) => idx < count);
    }
  },
  watch: {
    activeSection(newVal) {
      if (newVal) this.scrollToSection(newVal);
    },
    clicks: {
      immediate: true,
      handler(val) {
        // Progressive reveal: show stack first, then expand comments
        if (val <= 0) {
          this.animateReveal(20); // full compose file
        } else if (val === 1) {
          this.animateReveal(20);
        } else if (val === 2) {
          this.animateReveal(24);
        } else {
          this.animateReveal(this.yamlLines.length);
        }
      }
    }
  },
  mounted() {
    this.animateReveal(20);
  },
  methods: {
    animateReveal(target) {
      const start = this.revealCount;
      if (target <= start) {
        this.revealCount = target;
        if (this.activeSection) this.scrollToSection(this.activeSection);
        return;
      }
      let i = start;
      const step = () => {
        i += 1;
        this.revealCount = i;
        if (i < target) {
          requestAnimationFrame(() => setTimeout(step, 22));
        } else if (this.activeSection) {
          this.scrollToSection(this.activeSection);
        }
      };
      step();
    },
    scrollToSection(section) {
      this.$nextTick(() => {
        const container = this.$refs.codeBody;
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
        const isLimit = html.includes("✗");
        const isPro = html.includes("✓");
        const color = isLimit ? "#CF5A5A" : isPro ? "#158A4E" : "#64748B";
        return `<span style="color: ${color};">${html}</span>`;
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
      if (trimmedVal.includes('"') || trimmedVal.includes("'")) {
        return keySpan + val.replace(trimmedVal, `<span style="color: #E6DB74;">${trimmedVal}</span>`);
      }
      return keySpan + val.replace(trimmedVal, `<span style="color: #A6E22E;">${trimmedVal}</span>`);
    }
  }
};
</script>

<style scoped>
.compose-diagram {
  height: 380px;
}

.compose-yaml-card {
  height: 360px;
}

.compose-visual {
  height: 360px;
  display: flex;
  align-items: center;
}

.compose-cards {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  width: 100%;
}

.cmp-card {
  background: #FFFFFF;
  border: 1.2px solid #E2E8F0;
  border-radius: 6px;
  padding: 10px 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cmp-card.active {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.cmp-card.active:nth-child(1) { border-color: #0088B8; }
.cmp-card.pros.active { border-color: #158A4E; }
.cmp-card.limits.active { border-color: #CF5A5A; }

.cmp-card.inactive {
  opacity: 0.4;
  filter: grayscale(0.5);
}

.cmp-card p {
  margin: 6px 0 0;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  color: #64748B;
  line-height: 1.35;
}

.cmp-card ul {
  margin: 6px 0 0;
  padding-left: 1.1rem;
  font-family: 'Outfit', sans-serif;
  font-size: 10.5px;
  color: #64748B;
  line-height: 1.4;
}

.cmp-card code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: #0088B8;
}

.badge {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
}

.stack-badge { background: #E8F4FA; color: #0088B8; }
.pros-badge { background: #EDF8F2; color: #158A4E; }
.limits-badge { background: #FDECEC; color: #CF5A5A; }

.mini-term {
  margin-top: 6px;
  background: #0F1C2A;
  color: #A6E22E;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  padding: 5px 8px;
  border-radius: 4px;
}

.code-line.line-enter {
  animation: compose-line-in 0.35s ease both;
}

@keyframes compose-line-in {
  from {
    opacity: 0;
    transform: translateX(-6px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.code-line.highlighted.line-stack {
  background: rgba(0, 136, 184, 0.15);
  border-left-color: #0088B8;
  box-shadow: inset 4px 0 0 #0088B8;
}

.code-line.highlighted.line-pros {
  background: rgba(21, 138, 78, 0.15);
  border-left-color: #158A4E;
  box-shadow: inset 4px 0 0 #158A4E;
}

.code-line.highlighted.line-limits {
  background: rgba(207, 90, 90, 0.15);
  border-left-color: #CF5A5A;
  box-shadow: inset 4px 0 0 #CF5A5A;
}
</style>

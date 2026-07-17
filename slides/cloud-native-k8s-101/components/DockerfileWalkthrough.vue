<template>
  <div class="df-walk" :style="{ '--accent': sectionColor || '#0088B8' }">
    <!-- LEFT: interactive Dockerfile -->
    <div class="df-editor" role="listbox" aria-label="Dockerfile instructions">
      <div class="editor-chrome">
        <div class="chrome-marks" aria-hidden="true">
          <span class="mark"></span><span class="mark"></span><span class="mark"></span>
        </div>
        <div class="chrome-path">Dockerfile</div>
        <div class="chrome-meta">
          <span class="chrome-step">{{ progressLabel }}</span>
        </div>
      </div>

      <div class="code-body" ref="codeBody">
        <button
          v-for="(line, idx) in dockerfileLines"
          :key="idx"
          type="button"
          role="option"
          :data-section="line.section || undefined"
          :aria-selected="line.section === activeSection"
          :disabled="!line.section"
          :class="[
            'code-line',
            {
              blank: !line.text,
              comment: isComment(line.text),
              interactive: !!line.section,
              active: line.section && line.section === activeSection,
              dimmed: activeSection && line.section && line.section !== activeSection,
              quiet: activeSection && !line.section
            }
          ]"
          @click="selectSection(line.section)"
          @mouseenter="onHover(line.section)"
          @mouseleave="onHover(null)"
        >
          <span class="gutter">
            <span class="line-num">{{ idx + 1 }}</span>
            <span v-if="line.section" class="tick" :class="{ on: line.section === activeSection }"></span>
          </span>
          <span class="line-content">
            <span
              v-for="(tok, tIdx) in tokenizeDockerfile(line.text)"
              :key="tIdx"
              :class="['tok', tok.kind]"
            >{{ tok.text }}</span>
          </span>
        </button>
      </div>

      <div class="layer-rail" aria-hidden="true">
        <div
          v-for="step in steps"
          :key="'layer-' + step.id"
          class="layer-block"
          :class="{ lit: isLit(step), focus: step.id === activeSection }"
          :style="{ '--c': step.color }"
          @mouseenter="onHover(step.id)"
          @mouseleave="onHover(null)"
          @click="selectSection(step.id)"
        >
          <span class="layer-label">{{ step.instruction }}</span>
        </div>
      </div>
    </div>

    <!-- RIGHT: explanation callout -->
    <aside class="df-explain">
      <div class="instr-strip">
        <button
          v-for="step in steps"
          :key="'tab-' + step.id"
          type="button"
          class="instr-tab"
          :class="{ active: step.id === activeSection, done: clicks >= step.click }"
          :style="step.id === activeSection ? { '--c': step.color } : {}"
          @click="selectSection(step.id)"
          @mouseenter="onHover(step.id)"
          @mouseleave="onHover(null)"
        >
          {{ step.instruction }}
        </button>
      </div>

      <div
        v-if="activeStep"
        :key="activeStep.id"
        class="explain-panel"
        :style="{ '--c': activeStep.color }"
      >
        <div class="explain-meta">
          <span class="step-index">{{ String(activeStep.click).padStart(2, '0') }}</span>
          <span class="step-kw">{{ activeStep.instruction }}</span>
          <span class="step-layer">{{ activeStep.layer }}</span>
        </div>

        <h3 class="explain-title">{{ activeStep.title }}</h3>
        <p class="explain-desc">{{ activeStep.desc }}</p>

        <div class="snippet">
          <div class="snippet-label">snippet</div>
          <pre><code>{{ activeStep.example }}</code></pre>
        </div>

        <p class="explain-why">
          <span class="why-mark">why</span>
          {{ activeStep.why }}
        </p>
      </div>

      <div v-else class="explain-panel idle">
        <div class="explain-meta">
          <span class="step-index">00</span>
          <span class="step-kw">START</span>
          <span class="step-layer">8 instructions</span>
        </div>
        <h3 class="explain-title">Read the image recipe</h3>
        <p class="explain-desc">
          Each instruction becomes a layer or config choice. Click a line, a tab, or advance with the keyboard.
        </p>
        <p class="explain-why">
          <span class="why-mark">tip</span>
          Hover any instruction anytime — click locks the focus.
        </p>
      </div>
    </aside>
  </div>
</template>

<script>
const KEYWORDS = new Set([
  'FROM', 'RUN', 'WORKDIR', 'COPY', 'ADD', 'USER', 'ENV',
  'EXPOSE', 'HEALTHCHECK', 'CMD', 'ENTRYPOINT', 'ARG', 'LABEL'
]);

const VALUES = new Set([
  'python:3.12-slim', 'appuser', 'app.py', '10001', '8080', 'nologin', 'healthz'
]);

export default {
  name: 'DockerfileWalkthrough',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return {
      hoveredSection: null,
      lockedSection: null,
      steps: [
        {
          id: 'from',
          click: 1,
          instruction: 'FROM',
          color: '#0088B8',
          layer: 'layer · base image',
          title: 'Pick the base image',
          desc: 'Every image starts FROM something. Acme Shop uses Python 3.12 slim — enough runtime, not the fat full image.',
          example: 'FROM python:3.12-slim',
          why: 'Smaller pulls, fewer CVEs, faster CI.'
        },
        {
          id: 'workdir',
          click: 2,
          instruction: 'WORKDIR',
          color: '#E2A03F',
          layer: 'layer · metadata',
          title: 'Set the working directory',
          desc: 'Later COPY, RUN, and CMD paths are relative to /app — home of the checkout process.',
          example: 'WORKDIR /app',
          why: 'Predictable layout; no scattered absolute paths.'
        },
        {
          id: 'copy',
          click: 3,
          instruction: 'COPY',
          color: '#158A4E',
          layer: 'layer · files',
          title: 'Copy only what you need',
          desc: 'Ship app.py into the image. Pair with .dockerignore — never COPY . . blindly.',
          example: 'COPY app.py ./',
          why: 'Narrow context = smaller image, no leaked .git or secrets.'
        },
        {
          id: 'user',
          click: 4,
          instruction: 'USER',
          color: '#CF5A5A',
          layer: 'layer · security',
          title: 'Drop root privileges',
          desc: 'Create appuser, chown the files, then USER so the process is not uid 0.',
          example:
            'RUN useradd --create-home --uid 10001 \\\n' +
            '        --shell /usr/sbin/nologin appuser\n' +
            'RUN chown appuser:appuser /app/app.py\n' +
            'USER appuser',
          why: 'Matches Pod Security and most enterprise policies.'
        },
        {
          id: 'env',
          click: 5,
          instruction: 'ENV',
          color: '#334155',
          layer: 'config · not a secret',
          title: 'Runtime defaults',
          desc: 'PORT and Python logging flags. Never bake API keys into ENV — inject those with Kubernetes Secrets.',
          example:
            'ENV PORT=8080 \\\n' +
            '    PYTHONDONTWRITEBYTECODE=1 \\\n' +
            '    PYTHONUNBUFFERED=1',
          why: 'Same image, different config per environment.'
        },
        {
          id: 'expose',
          click: 6,
          instruction: 'EXPOSE',
          color: '#0088B8',
          layer: 'docs · port',
          title: 'Document the listen port',
          desc: 'Signals that the process listens on 8080. Publishing still needs -p, a Service, or NodePort.',
          example: 'EXPOSE 8080',
          why: 'Matches containerPort in the Deployment YAML.'
        },
        {
          id: 'health',
          click: 7,
          instruction: 'HEALTHCHECK',
          color: '#158A4E',
          layer: 'local · Docker signal',
          title: 'Probe /healthz',
          desc: 'Docker can mark the container unhealthy if /healthz fails. In Kubernetes, readiness and liveness probes own traffic.',
          example:
            'HEALTHCHECK --interval=10s --timeout=3s \\\n' +
            '  --start-period=5s --retries=3 \\\n' +
            '  CMD python -c "urlopen(\'/healthz\')"',
          why: 'Handy on a laptop; cluster probes are the production control.'
        },
        {
          id: 'cmd',
          click: 8,
          instruction: 'CMD',
          color: '#0F1C2A',
          layer: 'process · start',
          title: 'Start the checkout server',
          desc: 'Exec-form JSON array — python is PID 1 with correct Unix signals (no shell wrapper).',
          example: 'CMD ["python", "app.py"]',
          why: 'Clean shutdowns and signal handling under orchestration.'
        }
      ],
      dockerfileLines: [
        { text: '# Acme Shop — checkout microservice', section: null },
        { text: 'FROM python:3.12-slim', section: 'from' },
        { text: '', section: null },
        { text: 'WORKDIR /app', section: 'workdir' },
        { text: '', section: null },
        { text: 'COPY app.py ./', section: 'copy' },
        { text: '', section: null },
        { text: 'RUN useradd --create-home --uid 10001 \\', section: 'user' },
        { text: '        --shell /usr/sbin/nologin appuser', section: 'user' },
        { text: 'RUN chown appuser:appuser /app/app.py', section: 'user' },
        { text: 'USER appuser', section: 'user' },
        { text: '', section: null },
        { text: 'ENV PORT=8080 \\', section: 'env' },
        { text: '    PYTHONDONTWRITEBYTECODE=1 \\', section: 'env' },
        { text: '    PYTHONUNBUFFERED=1', section: 'env' },
        { text: '', section: null },
        { text: 'EXPOSE 8080', section: 'expose' },
        { text: '', section: null },
        { text: 'HEALTHCHECK --interval=10s --timeout=3s \\', section: 'health' },
        { text: '  --start-period=5s --retries=3 \\', section: 'health' },
        { text: '  CMD python -c "urlopen(\'/healthz\')"', section: 'health' },
        { text: '', section: null },
        { text: 'CMD ["python", "app.py"]', section: 'cmd' }
      ]
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      if (this.lockedSection) return this.lockedSection;
      if (this.clicks >= 1 && this.clicks <= this.steps.length) {
        return this.steps[this.clicks - 1].id;
      }
      return null;
    },
    activeStep() {
      return this.steps.find((s) => s.id === this.activeSection) || null;
    },
    sectionColor() {
      return this.activeStep ? this.activeStep.color : '#0088B8';
    },
    progressLabel() {
      if (!this.activeStep) return 'ready';
      return `${this.activeStep.click} / ${this.steps.length}`;
    }
  },
  watch: {
    clicks(n) {
      // Keyboard progression clears a manual lock so Slidev clicks lead.
      if (n >= 1 && n <= this.steps.length) {
        this.lockedSection = null;
      }
    },
    activeSection(newVal) {
      if (newVal) this.scrollToSection(newVal);
    }
  },
  methods: {
    isComment(text) {
      return !!(text && text.trim().startsWith('#'));
    },
    isLit(step) {
      return this.clicks >= step.click || this.activeSection === step.id;
    },
    selectSection(section) {
      if (!section) return;
      this.lockedSection = section;
      this.hoveredSection = null;
    },
    onHover(section) {
      this.hoveredSection = section;
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
          top: Math.min(Math.max(0, relativeTop - 20), maxScroll),
          behavior: 'smooth'
        });
      });
    },
    tokenizeDockerfile(text) {
      if (!text) return [{ text: '\u00a0', kind: 'plain' }];
      if (text.trim().startsWith('#')) return [{ text, kind: 'comment' }];

      const tokens = [];
      const parts = text.match(/'(?:\\'|[^'])*'|"(?:\\"|[^"])*"|\S+|\s+/g) || [text];

      for (const part of parts) {
        if (/^\s+$/.test(part)) {
          tokens.push({ text: part, kind: 'plain' });
          continue;
        }
        if (
          (part.startsWith('"') && part.endsWith('"')) ||
          (part.startsWith("'") && part.endsWith("'"))
        ) {
          tokens.push({ text: part, kind: 'str' });
          continue;
        }
        if (part === '\\') {
          tokens.push({ text: part, kind: 'cont' });
          continue;
        }
        if (KEYWORDS.has(part)) {
          tokens.push({ text: part, kind: 'kw' });
          continue;
        }
        const bare = part.replace(/\\$/, '');
        if (VALUES.has(bare) || VALUES.has(part)) {
          if (part.endsWith('\\') && part.length > 1) {
            tokens.push({ text: bare, kind: 'val' });
            tokens.push({ text: '\\', kind: 'cont' });
          } else {
            tokens.push({ text: part, kind: 'val' });
          }
          continue;
        }
        let matched = false;
        for (const v of VALUES) {
          const i = part.indexOf(v);
          if (i !== -1) {
            if (i > 0) tokens.push({ text: part.slice(0, i), kind: 'plain' });
            tokens.push({ text: v, kind: 'val' });
            const rest = part.slice(i + v.length);
            if (rest) tokens.push({ text: rest, kind: rest === '\\' ? 'cont' : 'plain' });
            matched = true;
            break;
          }
        }
        if (!matched) tokens.push({ text: part, kind: 'plain' });
      }
      return tokens;
    }
  }
};
</script>

<style scoped>
.df-walk {
  --ink: #0F1C2A;
  --muted: #64748B;
  --line: #E2E8F0;
  --panel: #F8FAFC;
  --term: #0F1C2A;
  --term-edge: #1E293B;
  --cyan: #0088B8;

  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
  gap: 0.85rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  align-items: stretch;
}

/* ——— Editor (terminal honesty) ——— */
.df-editor {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: var(--term);
  border: 1.5px solid var(--term-edge);
  position: relative;
  overflow: hidden;
}

.df-editor::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(0, 136, 184, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 136, 184, 0.04) 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.55;
}

.editor-chrome {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.4rem 0.7rem;
  background: #1E293B;
  border-bottom: 1px solid #0B1220;
  flex-shrink: 0;
}

.chrome-marks {
  display: flex;
  gap: 0.28rem;
}

.mark {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: #475569;
}
.mark:nth-child(1) { background: #CF5A5A; }
.mark:nth-child(2) { background: #E2A03F; }
.mark:nth-child(3) { background: #158A4E; }

.chrome-path {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.68rem;
  color: #94A3B8;
  letter-spacing: 0.02em;
}

.chrome-meta {
  margin-left: auto;
}

.chrome-step {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--cyan);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.code-body {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0.35rem 0 0.2rem;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.68rem;
  line-height: 1.48;
}

.code-line {
  display: flex;
  gap: 0.45rem;
  width: 100%;
  margin: 0;
  padding: 0.06rem 0.55rem 0.06rem 0.35rem;
  border: 0;
  border-left: 3px solid transparent;
  background: transparent;
  color: inherit;
  text-align: left;
  font: inherit;
  cursor: default;
  transition:
    background 0.18s ease,
    opacity 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.code-line.interactive {
  cursor: pointer;
}

.code-line.interactive:hover {
  background: rgba(0, 136, 184, 0.1);
}

.code-line.active {
  background: rgba(0, 136, 184, 0.2);
  border-left-color: var(--accent);
  box-shadow: inset 0 0 0 1px rgba(0, 136, 184, 0.15);
}

.code-line.dimmed,
.code-line.quiet {
  opacity: 0.28;
}

.code-line.blank {
  min-height: 0.95rem;
  pointer-events: none;
}

.gutter {
  flex: 0 0 1.85rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  user-select: none;
}

.line-num {
  color: #475569;
  font-variant-numeric: tabular-nums;
}

.tick {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: #334155;
  transition: background 0.18s ease, box-shadow 0.18s ease;
}

.tick.on {
  background: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 136, 184, 0.25);
}

.line-content {
  white-space: pre;
  color: #F8F8F2;
}

.tok.kw { color: #F92672; font-weight: 700; }
.tok.str { color: #E6DB74; }
.tok.val { color: #A6E22E; }
.tok.comment { color: #64748B; }
.tok.cont { color: #94A3B8; }
.tok.plain { color: #F8F8F2; }

/* Layer stack = build metaphor */
.layer-rail {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;
  padding: 0.4rem;
  background: #0B1220;
  border-top: 1px solid #1E293B;
  flex-shrink: 0;
}

.layer-block {
  min-height: 1.55rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1E293B;
  background: #111827;
  color: #475569;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.layer-block.lit {
  border-color: color-mix(in srgb, var(--c) 55%, #1E293B);
  color: var(--c);
  background: color-mix(in srgb, var(--c) 12%, #0F1C2A);
}

.layer-block.focus {
  transform: translateY(-1px);
  border-color: var(--c);
  box-shadow: inset 0 -2px 0 var(--c);
}

.layer-label {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.48rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

/* ——— Explanation (blueprint paper) ——— */
.df-explain {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background:
    linear-gradient(rgba(0, 136, 184, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 136, 184, 0.035) 1px, transparent 1px),
    var(--panel);
  background-size: 18px 18px, 18px 18px, auto;
  border: 1px solid var(--line);
  padding: 0.55rem;
}

.instr-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  flex-shrink: 0;
}

.instr-tab {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 0.22rem 0.4rem;
  border: 1.5px solid #CBD5E1;
  background: #fff;
  color: var(--muted);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.instr-tab.done {
  border-color: #94A3B8;
  color: var(--ink);
}

.instr-tab.active {
  background: var(--c, var(--cyan));
  border-color: var(--c, var(--cyan));
  color: #fff;
}

.explain-panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.85rem 1rem;
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: inset 4px 0 0 var(--c, var(--cyan));
  animation: panel-in 0.28s ease;
}

.explain-panel.idle {
  --c: var(--cyan);
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.explain-meta {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.step-index {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--c, var(--cyan));
  letter-spacing: 0.04em;
}

.step-kw {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: 0.04em;
}

.step-layer {
  margin-left: auto;
  font-family: 'Outfit', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--muted);
  text-transform: lowercase;
}

.explain-title {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.35rem;
  line-height: 1.15;
  color: var(--ink);
}

.explain-desc {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 0.92rem;
  line-height: 1.4;
  color: #475569;
  max-width: 36rem;
}

.snippet {
  margin-top: 0.15rem;
  background: var(--term);
  border: 1px solid var(--term-edge);
  overflow: hidden;
}

.snippet-label {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748B;
  padding: 0.28rem 0.65rem 0;
}

.snippet pre {
  margin: 0;
  padding: 0.35rem 0.65rem 0.55rem;
  overflow-x: auto;
}

.snippet code {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.74rem;
  line-height: 1.45;
  color: #5EEAD4;
  white-space: pre;
}

.explain-why {
  margin: 0.15rem 0 0;
  font-family: 'Outfit', sans-serif;
  font-size: 0.82rem;
  line-height: 1.4;
  color: var(--ink);
  display: flex;
  gap: 0.45rem;
  align-items: baseline;
}

.why-mark {
  flex-shrink: 0;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--c, var(--cyan));
  border-bottom: 2px solid var(--c, var(--cyan));
  padding-bottom: 0.05rem;
}
</style>

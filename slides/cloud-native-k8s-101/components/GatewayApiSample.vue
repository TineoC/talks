<template>
  <div class="split-diagram-container gateway-sample">
    <!-- LEFT: multi-doc YAML -->
    <div class="yaml-editor-card gateway-yaml-card">
      <div class="editor-header">
        <div class="window-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="tab-title">shop-gateway.yaml</div>
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
              highlighted: activeSection === line.section,
              dimmed: activeSection && line.section && activeSection !== line.section
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

    <!-- RIGHT: component cards -->
    <div class="visual-panel gateway-visual">
      <div class="gw-cards">
        <div
          v-for="card in cards"
          :key="card.id"
          :class="['gw-card', card.id + '-card', { active: activeSection === card.id, inactive: activeSection && activeSection !== card.id }]"
          @mouseenter="hoveredSection = card.id"
          @mouseleave="hoveredSection = null"
        >
          <div class="gw-card-header">
            <span :class="['badge', card.id + '-badge']">{{ card.badge }}</span>
            <span class="gw-owner">{{ card.owner }}</span>
          </div>
          <p class="gw-card-desc">{{ card.desc }}</p>
          <div class="gw-flow" v-if="card.flow">{{ card.flow }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GatewayApiSample',
  props: {
    clicks: { type: Number, default: 0 }
  },
  data() {
    return {
      hoveredSection: null,
      cards: [
        {
          id: 'gatewayclass',
          badge: '01 · GatewayClass',
          owner: 'Platform',
          desc: 'Names the controller that will implement Gateways — Envoy Gateway, AWS, Istio, etc.',
          flow: 'controllerName: gateway.envoyproxy.io/…'
        },
        {
          id: 'gateway',
          badge: '02 · Gateway',
          owner: 'Platform',
          desc: 'Cluster entrypoint: listeners, ports, TLS. One shared front door for many apps.',
          flow: 'https://shop.example.com → listener :443'
        },
        {
          id: 'httproute',
          badge: '03 · HTTPRoute',
          owner: 'App team',
          desc: 'App-owned routing: host + path rules attach to the Gateway and send traffic to Services.',
          flow: '/checkout → checkout-svc:80'
        },
        {
          id: 'service',
          badge: '04 · Service + Pods',
          owner: 'App team',
          desc: 'Stable backend for the route. Same Service/selector model you already know.',
          flow: 'checkout-svc → Pods (app=checkout)'
        }
      ],
      yamlLines: [
        { text: "# Sample: shop.example.com → checkout pods", section: null },
        { text: "apiVersion: gateway.networking.k8s.io/v1", section: "gatewayclass" },
        { text: "kind: GatewayClass", section: "gatewayclass" },
        { text: "metadata:", section: "gatewayclass" },
        { text: "  name: envoy", section: "gatewayclass" },
        { text: "spec:", section: "gatewayclass" },
        { text: "  controllerName: gateway.envoyproxy.io/gatewayclass-controller", section: "gatewayclass" },
        { text: "---", section: null },
        { text: "apiVersion: gateway.networking.k8s.io/v1", section: "gateway" },
        { text: "kind: Gateway", section: "gateway" },
        { text: "metadata:", section: "gateway" },
        { text: "  name: shop-gw", section: "gateway" },
        { text: "  namespace: ingress", section: "gateway" },
        { text: "spec:", section: "gateway" },
        { text: "  gatewayClassName: envoy", section: "gateway" },
        { text: "  listeners:", section: "gateway" },
        { text: "  - name: https", section: "gateway" },
        { text: "    protocol: HTTPS", section: "gateway" },
        { text: "    port: 443", section: "gateway" },
        { text: "    hostname: shop.example.com", section: "gateway" },
        { text: "    tls:", section: "gateway" },
        { text: "      mode: Terminate", section: "gateway" },
        { text: "      certificateRefs:", section: "gateway" },
        { text: "      - name: shop-tls", section: "gateway" },
        { text: "---", section: null },
        { text: "apiVersion: gateway.networking.k8s.io/v1", section: "httproute" },
        { text: "kind: HTTPRoute", section: "httproute" },
        { text: "metadata:", section: "httproute" },
        { text: "  name: checkout-route", section: "httproute" },
        { text: "  namespace: shop", section: "httproute" },
        { text: "spec:", section: "httproute" },
        { text: "  parentRefs:", section: "httproute" },
        { text: "  - name: shop-gw", section: "httproute" },
        { text: "    namespace: ingress", section: "httproute" },
        { text: "  hostnames:", section: "httproute" },
        { text: "  - shop.example.com", section: "httproute" },
        { text: "  rules:", section: "httproute" },
        { text: "  - matches:", section: "httproute" },
        { text: "    - path:", section: "httproute" },
        { text: "        type: PathPrefix", section: "httproute" },
        { text: "        value: /checkout", section: "httproute" },
        { text: "    backendRefs:", section: "httproute" },
        { text: "    - name: checkout-svc", section: "httproute" },
        { text: "      port: 80", section: "httproute" },
        { text: "---", section: null },
        { text: "apiVersion: v1", section: "service" },
        { text: "kind: Service", section: "service" },
        { text: "metadata:", section: "service" },
        { text: "  name: checkout-svc", section: "service" },
        { text: "  namespace: shop", section: "service" },
        { text: "spec:", section: "service" },
        { text: "  selector:", section: "service" },
        { text: "    app: checkout", section: "service" },
        { text: "  ports:", section: "service" },
        { text: "  - port: 80", section: "service" },
        { text: "    targetPort: 8080", section: "service" }
      ]
    };
  },
  computed: {
    activeSection() {
      if (this.hoveredSection) return this.hoveredSection;
      if (this.clicks === 1) return 'gatewayclass';
      if (this.clicks === 2) return 'gateway';
      if (this.clicks === 3) return 'httproute';
      if (this.clicks === 4) return 'service';
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
        return `<span style="color: #64748B;">${html}</span>`;
      }
      if (html.includes("#")) {
        const parts = html.split("#");
        return this.highlightCode(parts[0]) + `<span style="color: #64748B;">#${parts[1]}</span>`;
      }
      return this.highlightCode(html);
    },
    highlightCode(code) {
      if (code.trim() === "---") {
        return `<span style="color: #64748B;">${code}</span>`;
      }
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
.gateway-sample {
  height: 100%;
  min-height: 0;
}

.gateway-yaml-card {
  height: 100%;
  min-height: 0;
}

.gateway-visual {
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
}

.gw-cards {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  width: 100%;
}

.gw-card {
  background: #FFFFFF;
  border: 1.2px solid #E2E8F0;
  border-radius: 6px;
  padding: 8px 11px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.gw-card.active {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.gw-card.gatewayclass-card.active { border-color: #0088B8; }
.gw-card.gateway-card.active { border-color: #0088B8; }
.gw-card.httproute-card.active { border-color: #158A4E; }
.gw-card.service-card.active { border-color: #E2A03F; }

.gw-card.inactive {
  opacity: 0.4;
  filter: grayscale(0.5);
}

.gw-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.badge {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
}

.gatewayclass-badge,
.gateway-badge {
  background: #E8F4FA;
  color: #0088B8;
}

.httproute-badge {
  background: #EDF8F2;
  color: #158A4E;
}

.service-badge {
  background: #FFFBF5;
  color: #E2A03F;
}

.gw-owner {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  font-weight: 700;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.gw-card-desc {
  margin: 5px 0 0;
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  color: #64748B;
  line-height: 1.3;
}

.gw-flow {
  margin-top: 5px;
  background: #0F1C2A;
  color: #A6E22E;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  padding: 4px 7px;
  border-radius: 4px;
}

.code-line.highlighted.line-gatewayclass,
.code-line.highlighted.line-gateway {
  background: rgba(0, 136, 184, 0.15);
  border-left-color: #0088B8;
  box-shadow: inset 4px 0 0 #0088B8;
}

.code-line.highlighted.line-httproute {
  background: rgba(21, 138, 78, 0.15);
  border-left-color: #158A4E;
  box-shadow: inset 4px 0 0 #158A4E;
}

.code-line.highlighted.line-service {
  background: rgba(226, 160, 63, 0.15);
  border-left-color: #E2A03F;
  box-shadow: inset 4px 0 0 #E2A03F;
}
</style>

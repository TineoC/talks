<template>
  <div class="certs-path">
    <div class="certs-tier">
      <div class="tier-label">Associate</div>
      <div class="tier-cards">
        <div v-for="cert in associates" :key="cert.abbr" class="cert-chip associate">
          <img :src="cert.logo" :alt="cert.abbr" class="cert-logo" />
          <div class="cert-copy">
            <span class="cert-abbr">{{ cert.abbr }}</span>
            <span class="cert-name">{{ cert.name }}</span>
            <span class="cert-hint">{{ cert.hint }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="certs-arrow" aria-hidden="true">↓</div>

    <div class="certs-tier">
      <div class="tier-label">Professional</div>
      <div class="tier-cards professional">
        <div v-for="cert in professionals" :key="cert.abbr" class="cert-chip pro">
          <img :src="cert.logo" :alt="cert.abbr" class="cert-logo" />
          <div class="cert-copy">
            <span class="cert-abbr">{{ cert.abbr }}</span>
            <span class="cert-name">{{ cert.name }}</span>
            <span class="cert-hint">{{ cert.hint }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="certs-arrow" aria-hidden="true">↓</div>

    <div class="certs-tier kubestronaut-tier">
      <div class="kubestronaut-banner">
        <img src="/certs/cert-kubestronaut-logo.png" alt="Kubestronaut" class="kubes-badge" />
        <div class="kubes-copy">
          <div class="kubes-title">Kubestronaut</div>
          <div class="kubes-body">Hold all five Kubernetes certs at once — KCNA · KCSA · CKA · CKAD · CKS</div>
          <div class="kubes-takeaway">Start with KCNA or jump to CKA — five certs unlock the jacket.</div>
        </div>
        <a class="kubes-qr" href="https://www.cncf.io/training/certification/" target="_blank" rel="noopener">
          <img src="/qr/cncf-certs.png" alt="QR: CNCF certifications" />
          <span>Scan catalog</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeepGoingCerts',
  data() {
    return {
      associates: [
        {
          abbr: 'KCNA',
          name: 'Kubernetes & Cloud Native Associate',
          hint: 'Foundations',
          logo: '/certs/cert-kcna.png'
        },
        {
          abbr: 'KCSA',
          name: 'Kubernetes & Cloud Native Security Associate',
          hint: 'Security primer',
          logo: '/certs/cert-kcsa.png'
        }
      ],
      professionals: [
        {
          abbr: 'CKA',
          name: 'Administrator',
          hint: 'Cluster ops',
          logo: '/certs/cert-cka-logo.png'
        },
        {
          abbr: 'CKAD',
          name: 'Application Developer',
          hint: 'Workloads & apps',
          logo: '/certs/cert-ckad.png'
        },
        {
          abbr: 'CKS',
          name: 'Security Specialist',
          hint: 'Requires CKA',
          logo: '/certs/cert-cks-logo.png'
        }
      ]
    };
  }
};
</script>

<style scoped>
.certs-path {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.55rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  margin: 0;
  box-sizing: border-box;
}

.certs-tier {
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  gap: 1rem;
  align-items: stretch;
  flex: 1;
  min-height: 0;
}

.tier-label {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748B;
  display: flex;
  align-items: center;
}

.tier-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  height: 100%;
}

.tier-cards.professional {
  grid-template-columns: 1fr 1fr 1fr;
}

.cert-chip {
  background: #fff;
  padding: 0.85rem 1rem;
  box-shadow: inset 4px 0 0 #0088B8;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 0;
  height: 100%;
}

.cert-chip.pro {
  box-shadow: inset 4px 0 0 #158A4E;
}

.cert-logo {
  width: 4.25rem;
  height: 4.25rem;
  object-fit: contain;
  flex-shrink: 0;
}

.cert-copy {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.cert-abbr {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-weight: 800;
  font-size: 1.2rem;
  color: #0F1C2A;
}

.cert-name {
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #475569;
  line-height: 1.25;
}

.cert-hint {
  font-family: 'Outfit', sans-serif;
  font-size: 0.82rem;
  color: #94A3B8;
}

.certs-arrow {
  text-align: center;
  color: #94A3B8;
  font-size: 1.1rem;
  line-height: 1;
  margin-left: 6.5rem;
  flex: 0 0 auto;
}

.kubestronaut-tier {
  grid-template-columns: 1fr;
  flex: 1.15;
}

.kubestronaut-banner {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: #fff;
  padding: 1rem 1.25rem;
  box-shadow: inset 4px 0 0 #E2A03F;
  height: 100%;
  box-sizing: border-box;
}

.kubes-badge {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
  flex-shrink: 0;
}

.kubes-copy {
  flex: 1;
  min-width: 0;
}

.kubes-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.45rem;
  color: #0F1C2A;
}

.kubes-body {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  color: #64748B;
  margin-top: 0.25rem;
  line-height: 1.35;
}

.kubes-takeaway {
  margin-top: 0.55rem;
  padding-top: 0.45rem;
  border-top: 2px solid #0088B8;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0F1C2A;
  line-height: 1.3;
}

.kubes-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;
  flex-shrink: 0;
}

.kubes-qr img {
  width: 5.25rem;
  height: 5.25rem;
  image-rendering: pixelated;
}

.kubes-qr span {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.68rem;
  font-weight: 700;
  color: #64748B;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
</style>

<template>
  <div class="study">
    <div class="study-grid">
      <a
        v-for="item in items"
        :key="item.title"
        class="study-card"
        :class="item.tone"
        :href="item.href"
        target="_blank"
        rel="noopener"
      >
        <div class="study-main">
          <div class="study-heading">{{ item.title }}</div>
          <div class="study-desc">{{ item.desc }}</div>
          <div class="study-url">{{ item.label }}</div>
        </div>
        <img :src="item.qr" :alt="`QR: ${item.title}`" class="study-qr" />
      </a>
    </div>
    <div class="study-takeaway">Docs → labs → simulator. Don’t only watch videos.</div>
  </div>
</template>

<script>
export default {
  name: 'KeepGoingStudy',
  data() {
    return {
      items: [
        {
          title: 'Killercoda lab',
          desc: 'Acme Shop companion for this talk — containers through Gateway API',
          label: 'killercoda.com/tineoc/scenario/cloud-native-k8s-101',
          href: 'https://killercoda.com/tineoc/scenario/cloud-native-k8s-101',
          qr: '/qr/cloud-native-k8s-101-lab.png',
          tone: 'cyan'
        },
        {
          title: 'killer.sh',
          desc: 'CKA / CKAD / CKS exam simulators — timed drills',
          label: 'killer.sh',
          href: 'https://killer.sh/',
          qr: '/qr/killersh.png',
          tone: 'cyan'
        },
        {
          title: 'Kubernetes tutorials',
          desc: 'Official docs paths — start here for concepts',
          label: 'kubernetes.io/docs/tutorials',
          href: 'https://kubernetes.io/docs/tutorials/',
          qr: '/qr/k8s-tutorials.png',
          tone: 'cyan'
        },
        {
          title: 'Linux Foundation Training',
          desc: 'Official exam prep and certification catalog',
          label: 'training.linuxfoundation.org',
          href: 'https://training.linuxfoundation.org/',
          qr: '/qr/lf-training.png',
          tone: 'green'
        },
        {
          title: 'KodeKloud',
          desc: 'Structured CKA / CKAD / CKS video + lab tracks',
          label: 'kodekloud.com',
          href: 'https://kodekloud.com/',
          qr: '/qr/kodekloud.png',
          tone: 'green'
        },
        {
          title: 'CNCF Training',
          desc: 'Free and paid cloud native courses from CNCF',
          label: 'cncf.io/training',
          href: 'https://www.cncf.io/training/',
          qr: '/qr/cncf-training.png',
          tone: 'green'
        }
      ]
    };
  }
};
</script>

<style scoped>
.study {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  gap: 0.75rem;
  box-sizing: border-box;
}

.study-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 0.85rem;
  flex: 1;
  min-height: 0;
}

.study-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  text-decoration: none;
  color: inherit;
  background: #fff;
  padding: 1rem 1.1rem;
  box-shadow: inset 4px 0 0 #0088B8;
  min-height: 0;
  height: 100%;
  box-sizing: border-box;
  transition: transform 0.2s ease;
}

.study-card:hover {
  transform: translateY(-1px);
}

.study-card.cyan { box-shadow: inset 4px 0 0 #0088B8; }
.study-card.green { box-shadow: inset 4px 0 0 #158A4E; }

.study-main {
  min-width: 0;
  flex: 1;
}

.study-heading {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  color: #0F1C2A;
  line-height: 1.2;
}

.study-desc {
  margin-top: 0.45rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  color: #64748B;
  line-height: 1.35;
}

.study-url {
  margin-top: 0.55rem;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  color: #0088B8;
  font-weight: 600;
}

.study-qr {
  width: 5.5rem;
  height: 5.5rem;
  flex-shrink: 0;
  image-rendering: pixelated;
}

.study-takeaway {
  flex: 0 0 auto;
  padding: 0.55rem 0 0;
  border-top: 2px solid #0088B8;
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0F1C2A;
  line-height: 1.3;
}
</style>

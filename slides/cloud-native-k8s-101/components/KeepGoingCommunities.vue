<template>
  <div class="communities">
    <div class="comm-grid">
      <a
        v-for="item in items"
        :key="item.title"
        class="comm-card"
        :class="item.tone"
        :href="item.href"
        target="_blank"
        rel="noopener"
      >
        <div class="comm-body">
          <div class="comm-top">
            <img v-if="item.logo" :src="item.logo" :alt="item.title" class="comm-logo" />
            <span class="comm-scope">{{ item.scope }}</span>
          </div>
          <div class="comm-title">{{ item.title }}</div>
          <div class="comm-desc">{{ item.desc }}</div>
        </div>
        <img :src="item.qr" :alt="`QR: ${item.title}`" class="comm-qr" />
      </a>
    </div>
    <div class="comm-takeaway">Join Slack, find a CNCF meetup, and show up at KubeCon / KCD.</div>
  </div>
</template>

<script>
export default {
  name: 'KeepGoingCommunities',
  data() {
    return {
      items: [
        {
          title: 'CNCF Slack',
          scope: 'Global',
          desc: 'Cloud native projects, certifications, and TAG channels',
          href: 'https://slack.cncf.io/',
          logo: '/logos/cncf.svg',
          qr: '/qr/cncf-slack.png',
          tone: 'cyan'
        },
        {
          title: 'Kubernetes Slack',
          scope: 'Global',
          desc: 'SIGs, contributors, and user help — join via slack.k8s.io',
          href: 'https://slack.k8s.io/',
          logo: '/logos/kubernetes.svg',
          qr: '/qr/k8s-slack.png',
          tone: 'cyan'
        },
        {
          title: 'CNCF Meetup groups',
          scope: 'Local',
          desc: 'City chapters worldwide — find yours on community.cncf.io',
          href: 'https://community.cncf.io/',
          logo: '/logos/cncf.svg',
          qr: '/qr/cncf-community.png',
          tone: 'green'
        },
        {
          title: 'KubeCon + CloudNativeCon',
          scope: 'Worldwide',
          desc: 'Flagship CNCF conference — NA, EU, China, and more',
          href: 'https://www.cncf.io/kubecon-cloudnativecon-events/',
          logo: '/logos/cncf.svg',
          qr: '/qr/kubecon.png',
          tone: 'green'
        },
        {
          title: 'Kubernetes Community Days',
          scope: 'Regional',
          desc: 'Local KCDs on every continent — talks, labs, hallway track',
          href: 'https://community.cncf.io/kubernetes-community-days/',
          logo: '/logos/kubernetes.svg',
          qr: '/qr/kcd.png',
          tone: 'amber'
        }
      ]
    };
  }
};
</script>

<style scoped>
.communities {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  gap: 0.75rem;
  box-sizing: border-box;
}

.comm-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 0.85rem;
  flex: 1;
  min-height: 0;
}

.comm-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  text-decoration: none;
  color: inherit;
  background: #fff;
  padding: 0.7rem 0.85rem;
  box-shadow: inset 4px 0 0 #0088B8;
  transition: transform 0.2s ease;
  min-height: 0;
  height: 100%;
  box-sizing: border-box;
  grid-column: span 2;
}

.comm-card:nth-child(4) {
  grid-column: 2 / span 2;
}

.comm-card:nth-child(5) {
  grid-column: 4 / span 2;
}

.comm-card:hover {
  transform: translateY(-1px);
}

.comm-card.cyan { box-shadow: inset 4px 0 0 #0088B8; }
.comm-card.green { box-shadow: inset 4px 0 0 #158A4E; }
.comm-card.amber { box-shadow: inset 4px 0 0 #E2A03F; }

.comm-body {
  min-width: 0;
  flex: 1;
}

.comm-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.45rem;
  max-width: 100%;
  gap: 0.5rem;
}

.comm-logo {
  width: 1.6rem;
  height: 1.6rem;
  object-fit: contain;
}

.comm-scope {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #94A3B8;
}

.comm-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
  color: #0F1C2A;
  line-height: 1.2;
}

.comm-desc {
  margin-top: 0.4rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.92rem;
  color: #64748B;
  line-height: 1.35;
}

.comm-qr {
  width: 4.25rem;
  height: 4.25rem;
  flex-shrink: 0;
  image-rendering: pixelated;
}

.comm-takeaway {
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

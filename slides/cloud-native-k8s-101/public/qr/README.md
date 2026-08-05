# QR codes

Self-hosted PNGs so the deck works offline (no api.qrserver.com).

| File | Target |
|------|--------|
| `slides-gh-pages.png` | https://tineoc.github.io/talks/cloud-native-k8s-101/ |
| `linkedin.png` | Speaker LinkedIn |
| `meetup.png` | Coffee & Code Philly Meetup |
| `killercoda.png` | https://killercoda.com/ |
| `cloud-native-k8s-101-lab.png` | https://killercoda.com/tineoc/scenario/cloud-native-k8s-101 |
| `killersh.png` | https://killer.sh/ |
| `k8s-tutorials.png` | https://kubernetes.io/docs/tutorials/ |
| `lf-training.png` | https://training.linuxfoundation.org/ |
| `kodekloud.png` | https://kodekloud.com/ |
| `cncf-training.png` | https://www.cncf.io/training/ |
| `cncf-certs.png` | https://www.cncf.io/training/certification/ |
| `cncf-slack.png` | https://slack.cncf.io/ |
| `k8s-slack.png` | https://communityinviter.com/apps/kubernetes/community (slack.k8s.io) |
| `kubecon.png` | https://www.cncf.io/kubecon-cloudnativecon-events/ |
| `kcd.png` | https://community.cncf.io/kubernetes-community-days/ |
| `cncf-community.png` | https://community.cncf.io/ |
| `openai-k8s-7500.png` | https://openai.com/index/scaling-kubernetes-to-7500-nodes/ |
| `anthropic-claude-gke.png` | https://www.youtube.com/watch?v=b87I1plPeMg |
| `nvidia-kubecon-dra.png` | https://blogs.nvidia.com/blog/nvidia-at-kubecon-2026/ |
| `kapiche-gke.png` | https://cloud.google.com/customers/kapiche-ai |
| `att-aks-ai.png` | https://www.microsoft.com/en/customers/story/25679-at-and-t-azure |

Regenerate:

```bash
python3 - <<'PY'
import qrcode
from pathlib import Path
out = Path('public/qr')
urls = {
  'slides-gh-pages.png': 'https://tineoc.github.io/talks/cloud-native-k8s-101/',
  'killercoda.png': 'https://killercoda.com/',
  'cloud-native-k8s-101-lab.png': 'https://killercoda.com/tineoc/scenario/cloud-native-k8s-101',
  'killersh.png': 'https://killer.sh/',
  'k8s-tutorials.png': 'https://kubernetes.io/docs/tutorials/',
  'lf-training.png': 'https://training.linuxfoundation.org/',
  'kodekloud.png': 'https://kodekloud.com/',
  'cncf-training.png': 'https://www.cncf.io/training/',
  'cncf-certs.png': 'https://www.cncf.io/training/certification/',
  'cncf-slack.png': 'https://slack.cncf.io/',
  'k8s-slack.png': 'https://communityinviter.com/apps/kubernetes/community',
  'kubecon.png': 'https://www.cncf.io/kubecon-cloudnativecon-events/',
  'kcd.png': 'https://community.cncf.io/kubernetes-community-days/',
  'cncf-community.png': 'https://community.cncf.io/',
  'openai-k8s-7500.png': 'https://openai.com/index/scaling-kubernetes-to-7500-nodes/',
  'anthropic-claude-gke.png': 'https://www.youtube.com/watch?v=b87I1plPeMg',
  'nvidia-kubecon-dra.png': 'https://blogs.nvidia.com/blog/nvidia-at-kubecon-2026/',
  'kapiche-gke.png': 'https://cloud.google.com/customers/kapiche-ai',
  'att-aks-ai.png': 'https://www.microsoft.com/en/customers/story/25679-at-and-t-azure',
}
for name, url in urls.items():
    qrcode.make(url, border=1).save(out / name)
PY
```

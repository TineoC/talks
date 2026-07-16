# QR codes

Self-hosted PNGs so the deck works offline (no api.qrserver.com).

| File | Target |
|------|--------|
| `lab.png` | GitHub lab folder (swap to Killercoda scenario URL when published) |
| `linkedin.png` | Speaker LinkedIn |
| `meetup.png` | Coffee & Code Philly Meetup |

Regenerate:

```bash
python3 - <<'PY'
import qrcode
from pathlib import Path
out = Path('public/qr')
qrcode.make('https://YOUR-KILLERCODA-URL').save(out / 'lab.png')
PY
```

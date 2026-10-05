"""Regenerate logos.css: one --logo-<name> custom property per logo, as a data: URI.

CSS masks can't load files over file:// (Chrome blocks them as cross-origin),
so the deck references logos through these variables instead of url(assets/...).
Run from this directory after adding or changing a logo: python3 build-css.py
"""
import base64, pathlib, re

here = pathlib.Path(__file__).parent
used = set(re.findall(r"var\(--logo-([\w-]+)\)", (here.parent.parent / "index.html").read_text()))
mime = {".svg": "image/svg+xml", ".png": "image/png"}
lines = [":root {"]
for f in sorted(here.iterdir()):
    if f.suffix in mime and f.stem in used:
        data = base64.b64encode(f.read_bytes()).decode()
        lines.append(f"  --logo-{f.stem}: url(data:{mime[f.suffix]};base64,{data});")
lines.append("}")
(here.parent / "logos.css").write_text("\n".join(lines) + "\n")

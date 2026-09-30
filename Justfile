# Talks — build/stage every deck under slides/ without per-deck wiring.
#
# Decks are auto-discovered:
#   slides/<slug>/package.json  -> Slidev deck (built with `slidev build --base /talks/<slug>/`)
#   slides/<slug>/index.html    -> static deck (Reveal.js etc., copied as-is)
#
# Adding a talk = adding a folder under slides/. No edits here, none in CI.

set shell := ["bash", "-euo", "pipefail", "-c"]

slides_dir := "slides"
site_dir := "_site"
base_prefix := "/talks"
npm := "npm"
npx := "npx"

slidev_decks := `for d in slides/*/; do d=${d%/}; if [ -f "$d/package.json" ]; then basename "$d"; fi; done | xargs`
static_decks := `for d in slides/*/; do d=${d%/}; if [ -f "$d/index.html" ] && [ ! -f "$d/package.json" ]; then basename "$d"; fi; done | xargs`
decks := `for d in slides/*/; do d=${d%/}; if [ -f "$d/index.html" ] || [ -f "$d/package.json" ]; then basename "$d"; fi; done | xargs`

# Static decks are copied wholesale minus build/source-only noise (their prose
# docs live in the repo, not on the published site).
stage_excludes := "--exclude node_modules --exclude dist --exclude .slidev --exclude .git --exclude .DS_Store --exclude '*.md' --exclude docs --exclude screenshots"

# Show available recipes and discovered decks
default:
    @{{just_executable()}} --justfile {{justfile()}} --list
    @{{just_executable()}} --justfile {{justfile()}} list

# List auto-discovered decks
list:
    @echo "Slidev decks: {{ if slidev_decks == "" { "none" } else { slidev_decks } }}"
    @echo "Static decks: {{ if static_decks == "" { "none" } else { static_decks } }}"

# Install dependencies for every Slidev deck
install:
    @for deck in {{slidev_decks}}; do echo "==> npm ci $deck"; ( cd {{slides_dir}}/$deck && {{npm}} ci ); done

# Run one deck locally: just dev <slug>
dev deck:
    #!/usr/bin/env bash
    set -euo pipefail
    dir="{{slides_dir}}/{{deck}}"
    if [ ! -d "$dir" ]; then echo "no such deck: {{deck}}  (see 'just list')"; exit 2; fi
    cd "$dir"
    if [ -f package.json ]; then exec {{npm}} run dev; fi
    echo "static deck — serving $dir on http://localhost:8080"
    exec python3 -m http.server 8080

# Build every Slidev deck (static decks need no build)
build:
    @for deck in {{slidev_decks}}; do echo "==> build $deck"; ( cd {{slides_dir}}/$deck && {{npm}} ci && {{npx}} slidev build --base {{base_prefix}}/$deck/ ); done

# Build everything and stage the combined GitHub Pages site into _site/
site: build
    #!/usr/bin/env bash
    set -euo pipefail
    rm -rf {{site_dir}}
    mkdir -p {{site_dir}}
    for deck in {{slidev_decks}}; do
        echo "==> stage $deck (slidev)"
        mkdir -p "{{site_dir}}/$deck"
        cp -a "{{slides_dir}}/$deck/dist/." "{{site_dir}}/$deck/"
    done
    for deck in {{static_decks}}; do
        echo "==> stage $deck (static)"
        mkdir -p "{{site_dir}}/$deck"
        rsync -a {{stage_excludes}} "{{slides_dir}}/$deck/" "{{site_dir}}/$deck/"
    done
    # Per-deck add-ons (slides/<slug>/addons/head.html) are injected into the
    # staged copy, so tool-exported bundles stay byte-identical in git.
    node scripts/inject-deck-addons.mjs
    # Site-root 404.html so Pages falls back to the SPA shell for deep-linked
    # Slidev slide URLs (e.g. /cloud-native-k8s-101/1). Any Slidev dist will do.
    for deck in {{slidev_decks}}; do
        if [ -f "{{slides_dir}}/$deck/dist/404.html" ]; then
            cp "{{slides_dir}}/$deck/dist/404.html" "{{site_dir}}/404.html"
            break
        fi
    done
    echo "==> staged: {{decks}}"

# Serve the staged site at http://localhost:<port>/talks/<slug>/
serve port="8080":
    @[ -d {{site_dir}} ] || {{just_executable()}} --justfile {{justfile()}} site
    @# Decks are built with --base /talks/<slug>/, so the preview server needs a
    @# /talks prefix. Self-symlink gives it one without a second copy of the site.
    @ln -sfn . {{site_dir}}/talks
    @echo "serving {{site_dir}} on http://localhost:{{port}}{{base_prefix}}/"
    @for deck in {{decks}}; do echo "  http://localhost:{{port}}{{base_prefix}}/$deck/"; done
    @cd {{site_dir}} && python3 -m http.server {{port}}

# Remove _site/ and every deck's dist/
clean:
    @rm -rf {{site_dir}}
    @for deck in {{slidev_decks}}; do rm -rf "{{slides_dir}}/$deck/dist"; done

# Regenerate the README talks table from talks.json and slides/
readme:
    node scripts/generate-readme.mjs

# Regenerate README, then commit and push README.md/talks.json if they changed (CI)
readme-sync: readme
    #!/usr/bin/env bash
    set -euo pipefail
    if git diff --quiet -- README.md talks.json; then
        echo "README.md and talks.json already up to date"
        exit 0
    fi
    git add README.md talks.json
    git commit -m "chore: sync README talks table"
    git push

# OpenSSF Scorecard for this repo (or any: just scorecard github.com/org/repo).
# Runs the pinned Scorecard container with your gh token; CI publishes the
# official score through .github/workflows/scorecard.yml.
scorecard_image := "ghcr.io/ossf/scorecard:v5.5.0"

scorecard repo="github.com/TineoC/talks" format="default":
    #!/usr/bin/env bash
    set -euo pipefail
    token="${GITHUB_AUTH_TOKEN:-$(gh auth token)}"
    docker run --rm --network host -e GITHUB_AUTH_TOKEN="$token" {{scorecard_image}} \
        --repo={{repo}} --format={{format}} --show-details

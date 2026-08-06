#!/usr/bin/env node
// Injects per-deck add-ons into the staged site.
//
// Some decks are exported wholesale from an external tool (Claude Design), so
// their index.html is generated output that must not be hand-edited — a
// re-export would silently drop the edit. Anything this repo wants to add on
// top (a theme toggle, live data, analytics) lives in slides/<slug>/addons/
// and is injected into _site/<slug>/index.html at stage time instead.
//
// Convention: if slides/<slug>/addons/head.html exists, its contents are
// inserted immediately before </head> in the staged copy of that deck. The
// addons/ directory itself is staged alongside, so relative src/href work.
//
// Run by `make site` after the decks are staged.

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const slidesDir = path.join(rootDir, 'slides')
const siteDir = path.join(rootDir, '_site')

if (!existsSync(siteDir)) {
  console.error('_site/ does not exist — run `make site` (this script runs as part of it).')
  process.exit(1)
}

const decks = readdirSync(slidesDir).filter((name) =>
  statSync(path.join(slidesDir, name)).isDirectory()
)

let injected = 0
for (const slug of decks) {
  const headFile = path.join(slidesDir, slug, 'addons', 'head.html')
  if (!existsSync(headFile)) continue

  const stagedIndex = path.join(siteDir, slug, 'index.html')
  if (!existsSync(stagedIndex)) {
    console.warn(`addons: slides/${slug}/addons/head.html exists but ${slug} has no staged index.html — skipped`)
    continue
  }

  const html = readFileSync(stagedIndex, 'utf8')
  const marker = '</head>'
  const at = html.indexOf(marker)
  if (at === -1) {
    console.warn(`addons: no </head> in _site/${slug}/index.html — skipped`)
    continue
  }

  const addon = readFileSync(headFile, 'utf8').trim()
  if (html.includes(addon)) {
    console.log(`addons: ${slug} already injected`)
    continue
  }

  writeFileSync(stagedIndex, `${html.slice(0, at)}${addon}\n${html.slice(at)}`)
  console.log(`addons: injected slides/${slug}/addons/head.html into _site/${slug}/index.html`)
  injected++
}

console.log(injected === 0 ? 'addons: nothing to inject.' : `addons: ${injected} deck(s) patched.`)

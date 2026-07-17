#!/usr/bin/env node
// Regenerates the Talks table in README.md from talks.json.
// Add a new talk by adding an entry to talks.json — this script (run via
// .github/workflows/update-readme.yml on every push to main) keeps README.md in sync.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const PAGES_BASE = 'https://tineoc.github.io/talks'

const talks = JSON.parse(readFileSync(path.join(rootDir, 'talks.json'), 'utf8'))

function linksFor(talk) {
  const links = []
  if (talk.pages) links.push(`[HTML](${PAGES_BASE}/${talk.pages}/)`)
  if (talk.pdf) links.push(`[PDF](${talk.pdf})`)
  if (talk.external) links.push(`[Slides](${talk.external})`)
  if (talk.lab) links.push(`[Lab](${talk.lab})`)
  return links.join(' · ')
}

const header = '| Event | Title | Slides | Date |\n| :--- | :--- | :--- | :--- |'
const rows = talks.map(
  (talk) => `| ${talk.event} | ${talk.title} | ${linksFor(talk)} | ${talk.date} |`
)
const table = [header, ...rows].join('\n')

const readmePath = path.join(rootDir, 'README.md')
const readme = readFileSync(readmePath, 'utf8')
const startMarker = '<!-- TALKS:START -->'
const endMarker = '<!-- TALKS:END -->'
const start = readme.indexOf(startMarker)
const end = readme.indexOf(endMarker)
if (start === -1 || end === -1) {
  throw new Error(`README.md is missing ${startMarker} / ${endMarker} markers`)
}

const updated =
  readme.slice(0, start + startMarker.length) +
  '\n' +
  table +
  '\n' +
  readme.slice(end)

if (updated !== readme) {
  writeFileSync(readmePath, updated)
  console.log('README.md talks table updated.')
} else {
  console.log('README.md talks table already up to date.')
}

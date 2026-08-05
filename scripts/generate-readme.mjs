#!/usr/bin/env node
// Regenerates the Talks table in README.md.
//
// Source of truth is talks.json, but every deck directory under slides/ is
// discovered automatically: a deck that has no talks.json entry is appended to
// talks.json with a derived title and TBD placeholders, so dropping a new deck
// into slides/ is enough to get it into the README. Run via
// .github/workflows/update-readme.yml on every push to main.

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const slidesDir = path.join(rootDir, 'slides')
const talksPath = path.join(rootDir, 'talks.json')
const readmePath = path.join(rootDir, 'README.md')
const PAGES_BASE = 'https://tineoc.github.io/talks'

/** Deck entry points we recognise; a directory with none of these is not a deck. */
const ENTRY_POINTS = ['index.html', 'slides.md']

function readDeckDirs() {
  if (!existsSync(slidesDir)) return []
  return readdirSync(slidesDir)
    .filter((name) => !name.startsWith('.'))
    .filter((name) => statSync(path.join(slidesDir, name)).isDirectory())
    .filter((name) => ENTRY_POINTS.some((f) => existsSync(path.join(slidesDir, name, f))))
    .sort()
}

function titleFromSlidev(file) {
  const src = readFileSync(file, 'utf8')
  const frontmatter = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (frontmatter) {
    const title = frontmatter[1].match(/^title:\s*(.+)$/m)
    if (title) return unquote(title[1].trim())
  }
  const heading = src.match(/^#\s+(.+)$/m)
  return heading ? heading[1].trim() : null
}

function titleFromHtml(file) {
  const match = readFileSync(file, 'utf8').match(/<title>([\s\S]*?)<\/title>/i)
  return match ? match[1].replace(/\s+/g, ' ').trim() : null
}

function unquote(value) {
  return value.replace(/^['"]|['"]$/g, '')
}

function titleize(slug) {
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

/** Best-effort title for a deck directory, falling back to its slug. */
function deriveTitle(slug) {
  const dir = path.join(slidesDir, slug)
  const slidevFile = path.join(dir, 'slides.md')
  const htmlFile = path.join(dir, 'index.html')
  if (existsSync(slidevFile)) {
    const title = titleFromSlidev(slidevFile)
    if (title) return title
  }
  if (existsSync(htmlFile)) {
    const title = titleFromHtml(htmlFile)
    if (title) return title
  }
  return titleize(slug)
}

/** A PDF sitting next to the deck is exposed as the PDF link. */
function findPdf(slug) {
  const dir = path.join(slidesDir, slug)
  const pdf = readdirSync(dir).find((f) => f.toLowerCase().endsWith('.pdf'))
  return pdf ? `slides/${slug}/${pdf}` : undefined
}

const talks = JSON.parse(readFileSync(talksPath, 'utf8'))
const known = new Set(talks.filter((t) => t.pages).map((t) => t.pages))

const discovered = readDeckDirs().filter((slug) => !known.has(slug))
for (const slug of discovered) {
  const entry = {
    event: 'TBD',
    title: deriveTitle(slug),
    date: 'TBD',
    pages: slug,
  }
  const pdf = findPdf(slug)
  if (pdf) entry.pdf = pdf
  // Newest decks go on top, matching the existing reverse-chronological order.
  talks.unshift(entry)
  console.log(`Discovered new deck slides/${slug} — added to talks.json (fill in event/date).`)
}

if (discovered.length > 0) {
  writeFileSync(talksPath, `${JSON.stringify(talks, null, 2)}\n`)
}

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

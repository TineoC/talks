#!/usr/bin/env node
// Check the runtimes this repo depends on against endoflife.date.
//
// Targets are discovered, not hard-coded:
//   - Node.js: every `node-version:` in .github/workflows/*.yml (what CI runs)
//   - Vue: the version locked in each Slidev deck's package-lock.json
//   - Node.js / Python on this machine: reported for information only
//
// Exits 1 if anything CI or a deck depends on is past end of life, so the
// weekly workflow goes red. Anything ending within WARN_DAYS is a warning.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const WARN_DAYS = 180;
const API = "https://endoflife.date/api";

const targets = [];

// Node.js versions pinned in CI workflows
const wfDir = ".github/workflows";
for (const f of readdirSync(wfDir).filter((f) => /\.ya?ml$/.test(f))) {
  const text = readFileSync(`${wfDir}/${f}`, "utf8");
  for (const m of text.matchAll(/node-version:\s*['"]?(\d+)/g)) {
    targets.push({ product: "nodejs", cycle: m[1], where: `${wfDir}/${f}`, enforce: true });
  }
}

// Vue locked by each Slidev deck
for (const deck of readdirSync("slides")) {
  const lock = `slides/${deck}/package-lock.json`;
  if (!existsSync(lock)) continue;
  const version = JSON.parse(readFileSync(lock, "utf8")).packages?.["node_modules/vue"]?.version;
  if (version) targets.push({ product: "vue", cycle: version.split(".").slice(0, 2).join("."), where: lock, enforce: true });
}

// Local toolchain, informational only (CI doesn't use it)
const local = (cmd, args, re) => {
  try {
    return execFileSync(cmd, args, { encoding: "utf8" }).match(re)?.[1];
  } catch {
    return undefined;
  }
};
const localNode = local("node", ["--version"], /v(\d+)/);
if (localNode) targets.push({ product: "nodejs", cycle: localNode, where: "local node", enforce: false });
const localPy = local("python3", ["--version"], /(\d+\.\d+)/);
if (localPy) targets.push({ product: "python", cycle: localPy, where: "local python3", enforce: false });

// Same product+cycle from several places only needs one lookup. Products
// name cycles differently (Node.js "22", Vue "3.5", Python "3.13"), so a
// "major.minor" cycle falls back to its major if endoflife.date has no match.
const cycles = new Map();
async function fetchCycle(product, cycle) {
  const r = await fetch(`${API}/${product}/${cycle}.json`);
  if (r.ok) return r.json();
  if (r.status === 404 && cycle.includes(".")) return fetchCycle(product, cycle.split(".")[0]);
  throw new Error(`${product}/${cycle}: HTTP ${r.status}`);
}
function lookup(product, cycle) {
  const key = `${product}/${cycle}`;
  if (!cycles.has(key)) cycles.set(key, fetchCycle(product, cycle));
  return cycles.get(key);
}

const today = new Date();
let failed = false;
const seen = new Set();
for (const t of targets) {
  const id = `${t.product}/${t.cycle}@${t.where}`;
  if (seen.has(id)) continue;
  seen.add(id);
  const info = await lookup(t.product, t.cycle);
  // `eol` is a date string, or a boolean when no date is announced yet
  const eol = typeof info.eol === "string" ? new Date(info.eol) : null;
  const days = eol ? Math.ceil((eol - today) / 86_400_000) : null;
  let status = "ok";
  if (info.eol === true || (days !== null && days < 0)) status = "EOL";
  else if (days !== null && days <= WARN_DAYS) status = "soon";
  if (status === "EOL" && t.enforce) failed = true;
  const when = eol ? `${info.eol} (${days < 0 ? `${-days} days ago` : `in ${days} days`})` : "no date announced";
  const tag = status === "ok" ? "  ok " : status === "soon" ? " WARN" : t.enforce ? " FAIL" : " info";
  console.log(`${tag}  ${t.product} ${t.cycle}  eol ${when}  <- ${t.where}`);
}

console.log(`\nSource: ${API}/<product>/<cycle>.json`);
process.exit(failed ? 1 : 0);

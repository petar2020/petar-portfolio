// Generates a branded 1200x630 OG image (public/og-image.png) in the
// transit control-surface style. Run: node scripts/make-og.mjs
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../public/og-image.png')

const INK = '#06100E'
const INK2 = '#0A1614'
const TEAL = '#0E8C82'
const TEALB = '#2DD4BF'
const AMBER = '#F6A623'
const PAPER = '#E7F1EE'
const DIM = '#8FA8A3'
const FAINT = '#5E7873'

// schematic route lines
const nodes = [
  [120, 140], [430, 90], [760, 170], [240, 360], [560, 320], [900, 430], [400, 520],
]
const edges = [[0,1],[1,2],[0,3],[3,4],[1,4],[4,5],[3,6],[4,6],[2,5]]
const lines = edges
  .map(([a, b]) => `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="${TEAL}" stroke-width="1.5" opacity="0.5"/>`)
  .join('')
const dots = nodes
  .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 4 ? 6 : 4}" fill="${i === 4 ? AMBER : TEALB}"/>`)
  .join('')

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="rgba(64,160,150,0.10)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="100%" r="70%">
      <stop offset="0%" stop-color="${TEAL}" stop-opacity="0.22"/>
      <stop offset="70%" stop-color="${INK}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${INK}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- schematic in upper-right -->
  <g transform="translate(180,20) scale(0.9)" opacity="0.85">${lines}${dots}</g>

  <!-- top call-sign -->
  <g font-family="monospace">
    <rect x="60" y="64" width="10" height="10" fill="${AMBER}"/>
    <text x="84" y="74" fill="${FAINT}" font-size="20" letter-spacing="4">01 — PETAR ARSIĆ / FULL-STACK</text>
  </g>

  <!-- headline -->
  <g font-family="sans-serif" font-weight="700" font-size="64">
    <text x="60" y="266" fill="${PAPER}">I build production</text>
    <text x="60" y="344" fill="${PAPER}">booking &amp; operations</text>
    <text x="60" y="422" fill="${PAPER}">systems <tspan fill="${AMBER}">for real businesses.</tspan></text>
  </g>

  <!-- metric strip -->
  <line x1="60" y1="494" x2="1140" y2="494" stroke="rgba(64,160,150,0.22)" stroke-width="1"/>
  <g font-family="monospace">
    <text x="60" y="556" fill="${AMBER}" font-size="44" font-weight="700">150,000+</text>
    <text x="60" y="584" fill="${DIM}" font-size="16" letter-spacing="2">PASSENGERS SERVED</text>

    <text x="470" y="556" fill="${PAPER}" font-size="44" font-weight="700">30+</text>
    <text x="470" y="584" fill="${DIM}" font-size="16" letter-spacing="2">DAILY INTERNAL USERS</text>

    <text x="800" y="556" fill="${PAPER}" font-size="44" font-weight="700">5+</text>
    <text x="800" y="584" fill="${DIM}" font-size="16" letter-spacing="2">YEARS IN PRODUCTION</text>
  </g>

  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="rgba(64,160,150,0.25)"/>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('wrote', out)

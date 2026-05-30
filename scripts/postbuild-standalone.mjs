// With `output: 'standalone'`, Next does NOT copy `.next/static` or `public`
// into the standalone bundle — the standalone server then 404s on all CSS/JS
// and assets (page renders completely unstyled). This copies them in so that
// `npm start` (which runs .next/standalone/server.js) and deploy both work.
import { cpSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const standalone = resolve(root, '.next/standalone')

if (!existsSync(standalone)) {
  console.warn('[postbuild] .next/standalone not found — is output:"standalone" set? Skipping.')
  process.exit(0)
}

const copies = [
  { from: resolve(root, '.next/static'), to: resolve(standalone, '.next/static') },
  { from: resolve(root, 'public'), to: resolve(standalone, 'public') },
]

for (const { from, to } of copies) {
  if (!existsSync(from)) {
    console.warn(`[postbuild] missing ${from} — skipping`)
    continue
  }
  cpSync(from, to, { recursive: true })
  console.log(`[postbuild] copied ${from} -> ${to}`)
}

'use client'

/**
 * Live "departures" ticker — a thin monospace strip that scrolls atmospheric
 * system events tied to the transit theme. CSS transform marquee (60fps),
 * pauses on hover, frozen under reduced motion (handled in globals.css).
 * Content is illustrative system telemetry, not live data.
 */
const DEFAULT_ITEMS = [
  { code: 'BEG → MUC', status: 'ON TIME', tone: 'teal' },
  { code: 'RES #18482', status: 'ISSUED', tone: 'amber' },
  { code: 'QR · GATE 3', status: 'VALIDATED', tone: 'teal' },
  { code: 'NIS → VIE', status: 'BOARDING', tone: 'amber' },
  { code: 'PAY · 402.00€', status: 'SETTLED', tone: 'teal' },
  { code: 'FISCAL RCPT', status: 'SIGNED', tone: 'teal' },
  { code: 'BEG → ZAG', status: 'ON TIME', tone: 'teal' },
  { code: 'SEAT MAP', status: 'SYNCED', tone: 'amber' },
]

function Row({ items }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2.5 px-6">
          <span
            className={`h-1.5 w-1.5 rounded-full ${it.tone === 'amber' ? 'bg-amber' : 'bg-teal-bright'}`}
          />
          <span className="font-mono text-xs tracking-wider text-paper-dim">{it.code}</span>
          <span
            className={`font-mono text-xs font-semibold tracking-[0.14em] ${it.tone === 'amber' ? 'text-amber' : 'text-teal-bright'}`}
          >
            {it.status}
          </span>
          <span className="ml-4 text-paper-faint">/</span>
        </span>
      ))}
    </div>
  )
}

export default function Ticker({ items = DEFAULT_ITEMS, className = '' }) {
  return (
    <div
      className={`group relative w-full overflow-hidden border-y border-line bg-ink-850/60 py-2.5 ${className}`}
      role="marquee"
      aria-label="System activity ticker"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row items={items} />
        <Row items={items} />
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-900 to-transparent" />
    </div>
  )
}

'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import usePrefersReducedMotion from './usePrefersReducedMotion'

/**
 * Services marquee — a slim strip that scrolls the things I actually build,
 * in plain words a business owner understands. CSS transform marquee (60fps),
 * pauses on hover, frozen under reduced motion (handled in globals.css).
 * Items come from the `hero.ticker` translation array (sr/en).
 */
const FALLBACK_ITEMS = [
  'Booking systems',
  'Ticketing platforms',
  'Admin panels & dashboards',
  'Laravel & MySQL APIs',
  'React & React Native apps',
  'Payment & fiscal integrations',
  'WordPress & WooCommerce',
  'AI integrations',
]

function Row({ items }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((label, i) => (
        <span key={i} className="flex items-center">
          <span className="px-7 font-display text-sm font-semibold tracking-wide text-paper-dim whitespace-nowrap">
            {label}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-amber/70" />
        </span>
      ))}
    </div>
  )
}

export default function Ticker({ className = '' }) {
  const t = useTranslations('hero')
  const reduced = usePrefersReducedMotion()
  let items = FALLBACK_ITEMS
  try {
    const raw = t.raw('ticker')
    if (Array.isArray(raw) && raw.length > 0) items = raw
  } catch {
    /* missing key — keep fallback */
  }

  return (
    <div
      className={`group relative w-full overflow-hidden border-y border-line bg-ink-800/70 py-3.5 ${className}`}
      role="marquee"
      aria-label="Services I build"
    >
      {reduced ? (
        <div className="flex w-max">
          <Row items={items} />
        </div>
      ) : (
        // JS-driven marquee (framer) — immune to CSS animation quirks.
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
        >
          <Row items={items} />
          <Row items={items} />
        </motion.div>
      )}
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
    </div>
  )
}

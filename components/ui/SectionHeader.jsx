'use client'
import { motion } from 'framer-motion'

/**
 * Control-surface section header: a monospace call-sign (e.g. "02 — LIVE PRODUCT"),
 * a status dot, the title in display type, and a hairline rule that runs to the edge.
 */
export default function SectionHeader({ index, callsign, title, subtitle, status = 'teal', align = 'left' }) {
  const dot = status === 'amber' ? 'bg-amber' : 'bg-teal-bright'

  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot} animate-pulse`} aria-hidden />
        <span className="callsign">
          {index ? `${index} — ` : ''}{callsign}
        </span>
        {align !== 'center' && <span className="h-px flex-1 bg-line" aria-hidden />}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
        className="mt-4 font-display font-bold tracking-tight text-paper text-3xl sm:text-4xl md:text-5xl leading-[1.08]"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.65, 0, 0.35, 1] }}
          className={`mt-4 text-base sm:text-lg text-paper-dim leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

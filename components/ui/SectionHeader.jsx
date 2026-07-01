'use client'
import { motion } from 'framer-motion'

/**
 * Section header: a soft pill eyebrow with a status dot, the title in
 * display type, and an italic-serif subtitle for an editorial touch.
 * `index` is accepted for backwards compatibility but no longer rendered.
 */
export default function SectionHeader({ index, callsign, title, subtitle, status = 'teal', align = 'left' }) {
  const dot = status === 'amber' ? 'bg-amber' : 'bg-teal'
  const centered = align === 'center'

  return (
    <div className={centered ? 'text-center' : ''}>
      <div className={`flex items-center ${centered ? 'justify-center' : ''}`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-800/80 px-3.5 py-1.5 shadow-sm">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot} animate-pulse`} aria-hidden />
          <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-paper-faint">
            {callsign}
          </span>
        </span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
        className="mt-5 font-display font-bold tracking-tight text-paper text-3xl sm:text-4xl md:text-5xl leading-[1.08]"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.65, 0, 0.35, 1] }}
          className={`mt-4 font-serif italic text-lg sm:text-xl text-paper-dim leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

'use client'

import { useScroll, useTransform, motion } from 'framer-motion'

/**
 * Gallery-light backdrop: a fixed warm-white field with a faint
 * schematic grid that drifts slowly on scroll, plus a low teal horizon
 * wash. No particles, no decorative gradients. Pure atmosphere + depth.
 */
export default function Backdrop() {
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 1200], [0, 80])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-900" aria-hidden>
      {/* faint schematic grid, drifting */}
      <motion.div style={{ y: gridY }} className="absolute inset-0 schematic-grid opacity-[0.35]" />

      {/* low teal horizon wash */}
      <div
        className="absolute inset-x-0 bottom-[-30%] h-[60%]"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 100%, rgba(14,124,114,0.08), transparent 70%)',
        }}
      />
      {/* soft top wash to seat the nav */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{ background: 'linear-gradient(180deg, rgba(251,251,248,0.9), transparent)' }}
      />

      {/* paper grain */}
      <div className="absolute inset-0 grain" />
    </div>
  )
}

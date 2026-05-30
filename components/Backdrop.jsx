'use client'

import { useScroll, useTransform, motion } from 'framer-motion'

/**
 * Ink control-surface backdrop: a fixed near-black field with a faint
 * schematic grid that drifts slowly on scroll, plus a low teal horizon
 * glow. No particles, no decorative gradients. Pure atmosphere + depth.
 */
export default function Backdrop() {
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 1200], [0, 80])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-900" aria-hidden>
      {/* faint schematic grid, drifting */}
      <motion.div style={{ y: gridY }} className="absolute inset-0 schematic-grid opacity-[0.5]" />

      {/* low teal horizon glow */}
      <div
        className="absolute inset-x-0 bottom-[-30%] h-[60%]"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 100%, rgba(14,140,130,0.18), transparent 70%)',
        }}
      />
      {/* top vignette to seat the nav */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.5), transparent)' }}
      />

      {/* film grain */}
      <div className="absolute inset-0 grain" />
    </div>
  )
}

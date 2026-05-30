'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import usePrefersReducedMotion from './usePrefersReducedMotion'

/**
 * Counts a value up when it scrolls into view. Accepts a display string like
 * "150,000+", "30+", "Live" — parses the leading number, animates it, and
 * re-appends any suffix. Non-numeric values render as-is. Honors reduced motion.
 */
export default function CountUp({ value, className = '', duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduced = usePrefersReducedMotion()

  const match = String(value).match(/^([\d.,]+)(.*)$/)
  const numeric = match ? Number(match[1].replace(/,/g, '')) : null
  const suffix = match ? match[2] : ''

  const [display, setDisplay] = useState(numeric === null ? value : 0)

  useEffect(() => {
    if (numeric === null) return
    if (!inView || reduced) {
      setDisplay(numeric)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setDisplay(Math.round(numeric * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, numeric, duration])

  const rendered =
    numeric === null ? value : `${display.toLocaleString('en-US')}${suffix}`

  return (
    <span ref={ref} className={className}>
      {rendered}
    </span>
  )
}

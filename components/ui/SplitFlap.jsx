'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import usePrefersReducedMotion from './usePrefersReducedMotion'

/**
 * Split-flap / departure-board reveal. Each character flips down into place
 * with a staggered delay when it enters view. Reduced motion = instant, static.
 */
export default function SplitFlap({ text, className = '', charDelay = 0.035, startDelay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = usePrefersReducedMotion()
  const animate = inView && !reduced

  const words = String(text).split(' ')
  let charIndex = -1

  return (
    <span ref={ref} className={className} style={{ perspective: '600px', display: 'inline-block' }}>
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {word.split('').map((ch, c) => {
            charIndex += 1
            return (
              <span
                key={c}
                className={`inline-block ${animate ? 'animate-flap' : ''}`}
                style={{
                  transformOrigin: 'center top',
                  opacity: reduced ? 1 : animate ? undefined : 0,
                  animationDelay: animate ? `${startDelay + charIndex * charDelay}s` : undefined,
                }}
              >
                {ch}
              </span>
            )
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

'use client'
import { useEffect, useState } from 'react'

/**
 * Returns true when the user has requested reduced motion.
 * SSR-safe: starts false, syncs on mount, and listens for changes.
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

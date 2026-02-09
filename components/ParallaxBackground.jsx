'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxBackground() {
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()

  const y1 = useTransform(scrollY, [0, 1000], [0, reduceMotion ? 0 : 90])
  const y2 = useTransform(scrollY, [0, 1000], [0, reduceMotion ? 0 : 150])
  const y3 = useTransform(scrollY, [0, 1000], [0, reduceMotion ? 0 : 220])

  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-600/16 via-sky-600/14 to-cyan-600/12"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_2px)] bg-[length:24px_24px]"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 bg-gradient-to-tr from-blue-200/10 to-green-200/6"
      />
    </div>
  )
}

// src/components/ParallaxBackground.jsx
'use client'

import { useScroll, useTransform, motion } from 'framer-motion'

export default function ParallaxBackground() {
  const { scrollY } = useScroll()
  // Map the first 1000px of scroll to our offsets
  const y1 = useTransform(scrollY, [0, 1000], [0, 100])
  const y2 = useTransform(scrollY, [0, 1000], [0, 200])
  const y3 = useTransform(scrollY, [0, 1000], [0, 300])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-30"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_2px,transparent_3px)] bg-[length:20px_20px]"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-green-200 mix-blend-overlay opacity-40"
      />
    </div>
  )
}

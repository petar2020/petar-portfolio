'use client'
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const controls = useAnimation()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  useEffect(() => {
    const handler = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30, // max ±15deg rotacija
        y: (e.clientY / window.innerHeight - 0.5) * 30
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <section
      id="home"
      ref={ref}
      className="
        relative min-h-[90vh] overflow-hidden
        flex items-center
        bg-gradient-to-br from-[#0B1220] via-[#0E1B37] to-[#0B1220]
      "
    >
      {/* dotted grid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#3b82f6_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      {/* animated gradient blob behind avatar */}
      <motion.div
        aria-hidden
        className="absolute right-[-10rem] top-1/3 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(59,130,246,.35), rgba(168,85,247,.15), transparent)'
        }}
        animate={{ y: [0, -20, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-10 md:gap-8 items-center"
      >
        {/* LEFT: text */}
        <div className="text-center md:text-left">
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
          >
            <span>{t('title').split(' ')[0]} </span>
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
              {t('title').split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="mt-4 text-2xl md:text-3xl font-semibold text-sky-300"
          >
            {t('subtitle')}
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-6 text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-2xl md:pr-6 mx-auto md:mx-0"
          >
            {t('description')}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a
              href="#projects"
              onClick={() => {
                if (typeof window !== 'undefined' && window.trackCTA) {
                  window.trackCTA('hero_cta', 'view_work')
                }
              }}
              className="
                inline-flex items-center justify-center rounded-xl px-8 py-4
                font-semibold text-white
                bg-gradient-to-r from-indigo-600 to-fuchsia-600
                shadow-[0_10px_30px_rgba(99,102,241,.35)]
                transition-transform duration-200 hover:shadow-[0_18px_40px_rgba(99,102,241,.45)]
                hover:-translate-y-0.5
              "
            >
              {t('cta')}
            </a>
          </motion.div>

          {/* scroll hint */}
          <motion.div
            variants={item}
            className="mt-12 hidden md:flex items-center gap-2 text-slate-400/80"
          >
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="inline-block"
            >
              ↓
            </motion.span>
            <span className="text-sm">{t('scroll')}</span>
          </motion.div>
        </div>

        {/* RIGHT: avatar with crazy animation */}
        <motion.div
          variants={item}
          className="relative mx-auto md:mx-0"
          animate={{
            rotateX: mousePos.y,
            rotateY: -mousePos.x,
            y: [0, -10, 0] // lagano lebdenje
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ perspective: 1200 }}
        >
          <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full mx-auto">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500/60 via-sky-400/40 to-fuchsia-500/60 blur-xl" />
            <div className="relative rounded-full overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image
                src="/avatar.png"
                alt="Petar Arsić"
                width={640}
                height={640}
                priority
                className="h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

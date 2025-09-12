'use client'
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

/** Particles canvas with visible smooth motion */
function Particles({
  className = '',
  density = 0.12,         // koliko tačkica (više = gušće)
  maxSpeed = 0.8,         // brzina (povećaj za jači efekat)
  size = [1, 2.2],
  respectReducedMotion = false // ako hoćeš da poštuje OS setting, stavi true
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const particlesRef = useRef([])
  const tRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const reduced =
      respectReducedMotion &&
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // re-seed
      seed()
    }

    const rand = (a, b) => a + Math.random() * (b - a)

    const countFromArea = () => {
      const area = (canvas.offsetWidth * canvas.offsetHeight) / 1000
      return Math.max(50, Math.min(420, Math.floor(area * density)))
    }

    const seed = () => {
      const count = countFromArea()
      const arr = []
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          r: rand(size[0], size[1]),
          // osnovni vektor kretanja
          vx: rand(-maxSpeed, maxSpeed),
          vy: rand(-maxSpeed, maxSpeed),
          // individualni phase za drift
          phase: Math.random() * Math.PI * 2
          })
      }
      particlesRef.current = arr
    }

    const onMouse = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      // umesto total clear, pravimo blagi trail
      ctx.fillStyle = 'rgba(8, 14, 28, 0.25)' // tamna pozadina sa malom prozirnošću
      ctx.fillRect(0, 0, w, h)

      const pts = particlesRef.current
      tRef.current += 0.005

      // blagi uticaj miša (parallax drift)
      const mx = (mouseRef.current.x / w - 0.5) * 0.6
      const my = (mouseRef.current.y / h - 0.5) * 0.6

      // crtaj tačke
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]

        // “noise-like” drift – menja pravac polako
        const driftX = Math.sin(tRef.current * 2 + p.phase) * 0.25
        const driftY = Math.cos(tRef.current * 2 + p.phase) * 0.25

        p.x += p.vx + driftX + mx
        p.y += p.vy + driftY + my

        // wrap
        if (p.x < -5) p.x = w + 5
        if (p.x > w + 5) p.x = -5
        if (p.y < -5) p.y = h + 5
        if (p.y > h + 5) p.y = -5

        // dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(148, 163, 184, 0.8)' // slate-400/80
        ctx.fill()
      }

      // connections (kraće, vidljivije)
      ctx.lineWidth = 0.8
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)' // indigo-500/25
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist2 = dx * dx + dy * dy
          const maxD = 140
          if (dist2 < maxD * maxD) {
            ctx.globalAlpha = 1 - dist2 / (maxD * maxD)
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)

    if (!reduced) {
      rafRef.current = requestAnimationFrame(draw)
    } else {
      // ako se poštuje reduced motion – nacrtaj statično
      seed()
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      for (const p of particlesRef.current) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(148, 163, 184, 0.8)'
        ctx.fill()
      }
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

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
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
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
      {/* dotted grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#3b82f6_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      {/* MOVING PARTICLES */}
      <Particles className="opacity-90" density={0.14} maxSpeed={0.85} respectReducedMotion={false} />

      {/* glowing blob */}
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
        {/* LEFT text */}
        <div className="text-center md:text-left">
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            <span>{t('title').split(' ')[0]} </span>
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
              {t('title').split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          <motion.h2 variants={item} className="mt-4 text-2xl md:text-3xl font-semibold text-sky-300">
            {t('subtitle')}
          </motion.h2>

          <motion.p variants={item} className="mt-6 text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-2xl md:pr-6 mx-auto md:mx-0">
            {t('description')}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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

          <motion.div variants={item} className="mt-12 hidden md:flex items-center gap-2 text-slate-400/80">
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="inline-block">
              ↓
            </motion.span>
            <span className="text-sm">{t('scroll')}</span>
          </motion.div>
        </div>

        {/* RIGHT avatar animation */}
        <motion.div
          variants={item}
          className="relative mx-auto md:mx-0"
          animate={{ rotateX: mousePos.y, rotateY: -mousePos.x, y: [0, -10, 0] }}
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

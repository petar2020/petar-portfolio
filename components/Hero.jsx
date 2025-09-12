'use client'
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

/* ---------- Particles: stalni lagani drift, bez miša ---------- */
function Particles({ className = '', density = 0.12, maxSpeed = 0.75, size = [1, 2.2] }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const particlesRef = useRef([])
  const tRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const rand = (a, b) => a + Math.random() * (b - a)
    const countFromArea = () => {
      const area = (canvas.offsetWidth * canvas.offsetHeight) / 1000
      return Math.max(60, Math.min(420, Math.floor(area * density)))
    }

    const seed = () => {
      const count = countFromArea()
      const arr = []
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          r: rand(size[0], size[1]),
          vx: rand(-maxSpeed, maxSpeed),
          vy: rand(-maxSpeed, maxSpeed),
          phase: Math.random() * Math.PI * 2
        })
      }
      particlesRef.current = arr
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      // blagi trail (bez „seckanja”)
      ctx.fillStyle = 'rgba(8, 14, 28, 0.22)'
      ctx.fillRect(0, 0, w, h)

      const pts = particlesRef.current
      tRef.current += 0.0045

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        // noise-like drift (uvek radi lagano)
        const driftX = Math.sin(tRef.current * 2 + p.phase) * 0.22
        const driftY = Math.cos(tRef.current * 2 + p.phase) * 0.22
        p.x += p.vx + driftX
        p.y += p.vy + driftY

        // wrap
        if (p.x < -5) p.x = w + 5
        if (p.x > w + 5) p.x = -5
        if (p.y < -5) p.y = h + 5
        if (p.y > h + 5) p.y = -5

        // dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(148, 163, 184, 0.8)'
        ctx.fill()
      }

      // kratke povezne linije
      ctx.lineWidth = 0.8
      ctx.strokeStyle = 'rgba(99,102,241,0.22)'
      const maxD = 130
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < maxD * maxD) {
            ctx.globalAlpha = 1 - d2 / (maxD * maxD)
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
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [density, maxSpeed, size])

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

/* ---------- HERO ---------- */
export default function Hero() {
  const t = useTranslations('hero')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const controls = useAnimation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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
        relative overflow-hidden flex items-center
        bg-gradient-to-br from-[#0B1220] via-[#0E1B37] to-[#0B1220]
        min-h-[88vh] pt-28 sm:pt-0
      "
    >
      {/* dotted grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#3b82f6_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      {/* particles – uvek lagano, bez miša */}
      <Particles
        className="opacity-90"
        density={isMobile ? 0.08 : 0.14}
        maxSpeed={isMobile ? 0.55 : 0.75}
        size={[1, 2.2]}
      />

      {/* glowing blob */}
      <motion.div
        aria-hidden
        className="absolute sm:right-[-10rem] sm:top-1/3 right-[-6rem] top-[55%] h-[26rem] w-[26rem] sm:h-[32rem] sm:w-[32rem] rounded-full blur-3xl"
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
        className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        {/* LEFT */}
        <div className="text-center md:text-left order-1 md:order-none">
          <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            <span>{t('title').split(' ')[0]} </span>
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
              {t('title').split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          <motion.h2 variants={item} className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-sky-300">
            {t('subtitle')}
          </motion.h2>

          <motion.p variants={item} className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-2xl md:pr-6 mx-auto md:mx-0">
            {t('description')}
          </motion.p>

          <motion.div variants={item} className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className="
                inline-flex items-center justify-center rounded-xl px-8 py-4
                font-semibold text-white
                bg-gradient-to-r from-indigo-600 to-fuchsia-600
                shadow-[0_10px_30px_rgba(99,102,241,.35)]
                transition-transform duration-200 hover:shadow-[0_18px_40px_rgba(99,102,241,.45)]
                hover:-translate-y-0.5 w-full sm:w-auto
              "
            >
              {t('cta')}
            </a>
          </motion.div>
        </div>

        {/* RIGHT: avatar – stalno, glatko ljuljanje/rotacija (bez miša) */}
        <motion.div
          variants={item}
          className="relative mx-auto md:mx-0 order-first md:order-none mt-4 sm:mt-0"
          animate={{
            y: [0, -10, 0],
            rotateX: [-6, 6, -6],
            rotateY: [6, -6, 6],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ perspective: 1200 }}
        >
          <div className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-72 md:w-72 rounded-full mx-auto">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500/60 via-sky-400/40 to-fuchsia-500/60 blur-xl" />
            <div className="relative rounded-full overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image
                src="/avatar.png"
                alt="Petar Arsić"
                width={640}
                height={640}
                priority
                className="h-44 w-44 sm:h-56 sm:w-56 md:h-72 md:w-72 object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

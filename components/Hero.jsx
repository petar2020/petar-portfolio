'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FaMapMarkerAlt } from 'react-icons/fa'
import SplitFlap from './ui/SplitFlap'
import CountUp from './ui/CountUp'
import Ticker from './ui/Ticker'

/* ---------- Route-network schematic (pure SVG, draws on load) ---------- */
function RouteSchematic() {
  // normalized node positions on a 0–100 viewBox grid
  const nodes = [
    { x: 12, y: 20 }, { x: 50, y: 12 }, { x: 86, y: 26 },
    { x: 24, y: 60 }, { x: 64, y: 54 }, { x: 90, y: 74 },
    { x: 44, y: 86 },
  ]
  const edges = [
    [0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [4, 5], [3, 6], [4, 6], [2, 5],
  ]

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="var(--teal)"
          strokeWidth="0.4"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: `route-draw 1.4s var(--ease-surface) forwards`,
            animationDelay: `${0.2 + i * 0.09}s`,
            opacity: 0.4,
          }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x} cy={n.y}
          r={i === 4 ? 1.5 : 1}
          fill={i === 4 ? 'var(--amber)' : 'var(--teal)'}
          opacity={0.6}
        />
      ))}
    </svg>
  )
}

/* ---------- HERO ---------- */
export default function Hero() {
  const t = useTranslations('hero')

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } },
  }

  const metricKeys = ['passengers', 'users', 'years']

  return (
    <section id="home" className="relative grain overflow-hidden min-h-[92vh] flex flex-col justify-center pt-28 pb-0">
      {/* focal lighting — slow-drifting aurora washes, sits behind content */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="animate-aurora-a absolute right-[4%] top-[8%] h-[38rem] w-[38rem] rounded-full opacity-80 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(14,124,114,0.13), transparent 62%)' }}
        />
        <div
          className="animate-aurora-b absolute -left-[6%] bottom-[2%] h-[32rem] w-[32rem] rounded-full opacity-70 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(194,65,12,0.09), transparent 62%)' }}
        />
        <div
          className="animate-aurora-b absolute left-[38%] top-[42%] h-[26rem] w-[26rem] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(169,207,199,0.28), transparent 65%)', animationDelay: '-8s' }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10 w-full">
        <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* LEFT — copy */}
          <div className="md:col-span-7">
            <motion.h1 variants={item} className="font-display font-bold tracking-tight text-paper text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
              {t('headline')}{' '}
              <SplitFlap text={t('headlineAccent')} className="font-serif italic font-normal text-amber" startDelay={0.35} />
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-base sm:text-lg text-paper-dim leading-relaxed">
              {t('subline')}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col sm:flex-row gap-4">
              <a href="#demo" className="btn-signal w-full sm:w-auto">
                {t('ctaDemo')} <span aria-hidden>→</span>
              </a>
              <a href="#case-study" className="btn-line w-full sm:w-auto">
                {t('ctaCase')}
              </a>
            </motion.div>
          </div>

          {/* RIGHT — profile card */}
          <motion.div variants={item} className="md:col-span-5">
            <div className="panel animate-float-slow relative max-w-sm mx-auto md:mx-0 md:ml-auto overflow-hidden rounded-2xl">
              {/* portrait over a quiet route schematic */}
              <div className="relative aspect-[5/4] bg-ink-850 overflow-hidden">
                <div className="absolute inset-0 p-4">
                  <RouteSchematic />
                </div>
                <Image
                  src="/avatar.png"
                  alt="Petar Arsić"
                  width={520}
                  height={520}
                  priority
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[94%] w-auto object-contain drop-shadow-xl"
                />
              </div>

              {/* human-readable card body */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold text-paper leading-tight">Petar Arsić</p>
                    <p className="mt-0.5 text-sm text-paper-dim">{t('card.role')}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-teal/25 bg-teal/10 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" aria-hidden />
                    <span className="text-xs font-semibold text-teal-bright whitespace-nowrap">{t('card.available')}</span>
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                  <span className="flex items-center gap-2 text-sm text-paper-dim">
                    <FaMapMarkerAlt aria-hidden className="text-teal" /> {t('card.location')}
                  </span>
                  <span className="font-mono text-xs text-paper-faint whitespace-nowrap">Laravel · React</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* OVERSIZED METRICS */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
          className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] border-t border-line"
        >
          {metricKeys.map((k, i) => (
            <div key={k} className={`py-6 sm:py-7 ${i > 0 ? 'sm:border-l border-line sm:pl-8 border-t sm:border-t-0' : ''}`}>
              <dd className={`font-display font-bold tracking-tight tabular-nums whitespace-nowrap leading-none ${i === 0 ? 'text-amber text-5xl md:text-6xl lg:text-7xl' : 'text-paper text-4xl md:text-5xl'}`}>
                <CountUp value={t(`metrics.${k}.value`)} />
              </dd>
              <dt className="mt-3 callsign">{t(`metrics.${k}.label`)}</dt>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* services ticker */}
      <div className="mt-12 md:mt-16 relative z-10">
        <Ticker />
      </div>
    </section>
  )
}

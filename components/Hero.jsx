'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
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
            opacity: 0.55,
          }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x} cy={n.y}
          r={i === 4 ? 1.5 : 1}
          fill={i === 4 ? 'var(--amber)' : 'var(--teal-bright)'}
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
      <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10 w-full">
        <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* LEFT — copy */}
          <div className="md:col-span-7">
            <motion.div variants={item} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" aria-hidden />
              <span className="callsign">01 — {t('eyebrow')}</span>
            </motion.div>

            <motion.h1 variants={item} className="mt-6 font-display font-bold tracking-tight text-paper text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
              {t('headline')}{' '}
              <SplitFlap text={t('headlineAccent')} className="text-amber" startDelay={0.35} />
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

          {/* RIGHT — schematic + duotone portrait */}
          <motion.div variants={item} className="md:col-span-5">
            <div className="panel ticked relative aspect-[4/5] max-w-xs mx-auto md:mx-0 md:ml-auto">
              {/* schematic behind */}
              <div className="absolute inset-0 p-5">
                <RouteSchematic />
              </div>

              {/* call-sign bar */}
              <div className="absolute left-0 right-0 top-0 flex items-center justify-between border-b border-line px-3 py-2">
                <span className="callsign !text-[0.62rem]">SYS · LIVE</span>
                <span className="flex items-center gap-1.5 callsign !text-[0.62rem] text-teal-bright">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-bright animate-pulse" /> ONLINE
                </span>
              </div>

              {/* duotone portrait insert */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="relative aspect-square overflow-hidden border border-line-strong">
                  <Image
                    src="/avatar.png"
                    alt="Petar Arsić"
                    width={520}
                    height={520}
                    priority
                    className="h-full w-full object-cover grayscale contrast-[1.15]"
                  />
                  {/* teal duotone tint */}
                  <div className="absolute inset-0 mix-blend-color" style={{ background: 'var(--teal)' }} />
                  <div className="absolute inset-0 mix-blend-multiply" style={{ background: 'radial-gradient(120% 100% at 50% 0%, transparent 40%, rgba(6,16,14,0.85))' }} />
                  <div className="absolute inset-0 mix-blend-screen opacity-25" style={{ background: 'linear-gradient(180deg, var(--amber), transparent 60%)' }} />
                  {/* corner ticks */}
                  <span className="absolute left-1 top-1 h-3 w-3 border-l border-t border-teal-bright" />
                  <span className="absolute bottom-1 right-1 h-3 w-3 border-b border-r border-teal-bright" />
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
          className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-3 border-t border-line"
        >
          {metricKeys.map((k, i) => (
            <div key={k} className={`py-6 sm:py-7 ${i > 0 ? 'sm:border-l border-line sm:pl-8' : ''} ${i > 0 ? 'border-t sm:border-t-0' : ''}`}>
              <dd className={`font-mono font-bold tracking-tight ${i === 0 ? 'text-amber text-6xl md:text-7xl lg:text-8xl' : 'text-paper text-4xl md:text-5xl'} leading-none`}>
                <CountUp value={t(`metrics.${k}.value`)} />
              </dd>
              <dt className="mt-3 callsign">{t(`metrics.${k}.label`)}</dt>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* live departures ticker */}
      <div className="mt-12 md:mt-16 relative z-10">
        <Ticker />
      </div>
    </section>
  )
}

'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { SiLaravel, SiPhp, SiMysql, SiReact, SiTailwindcss } from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import SplitFlap from './ui/SplitFlap'

const TECH_STACK = [
  { Icon: SiLaravel, label: 'Laravel' },
  { Icon: SiPhp, label: 'PHP' },
  { Icon: SiMysql, label: 'MySQL' },
  { Icon: SiReact, label: 'React' },
  { Icon: SiTailwindcss, label: 'Tailwind' },
  { Icon: TbApi, label: 'API' },
]

/* ---------- Rotating "available" badge, orbiting the portrait ---------- */
function AvailabilityBadge({ label }) {
  const id = 'hero-badge-path'
  return (
    <div className="absolute -top-4 -right-4 sm:top-2 sm:right-2 z-20 h-24 w-24 sm:h-28 sm:w-28">
      <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full" aria-hidden>
        <defs>
          <path id={id} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fill="var(--paper-faint)" fontSize="7.6" letterSpacing="2.4" fontFamily="var(--font-mono)">
          <textPath href={`#${id}`} startOffset="0%">
            {label} • {label} •
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-amber" aria-hidden />
    </div>
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

  return (
    <section id="home" className="relative overflow-hidden min-h-[78vh] flex flex-col justify-center pt-24 pb-12">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10 w-full">
        <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* LEFT — copy */}
          <div className="md:col-span-7">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-800 px-4 py-2 text-sm font-medium text-paper-dim shadow-sm"
            >
              {t('greeting')} <span aria-hidden>👋</span>
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 font-display font-bold tracking-tight text-paper text-4xl sm:text-5xl md:text-6xl leading-[1.06]"
            >
              {t('headline')}{' '}
              <SplitFlap text={t('headlineAccent')} className="font-serif italic font-normal text-amber" startDelay={0.35} />{' '}
              {t('headlineEnd')}
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-base sm:text-lg text-paper-dim leading-relaxed">
              {t('subline')}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="btn-pill-dark w-full sm:w-auto">
                {t('ctaDemo')} <span aria-hidden>→</span>
              </a>
              <a
                href="/api/cv"
                download
                className="btn-pill-outline w-full sm:w-auto"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.trackCTA) window.trackCTA('cv_download', 'hero')
                }}
              >
                {t('ctaCase')} <span aria-hidden>↓</span>
              </a>
            </motion.div>

            {/* tech stack row */}
            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
              {TECH_STACK.map(({ Icon, label }) => (
                <span key={label} className="flex items-center gap-2 text-paper-faint" title={label}>
                  <Icon aria-hidden className="text-xl" />
                  <span className="text-xs font-medium uppercase tracking-wide hidden sm:inline">{label}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — portrait */}
          <motion.div variants={item} className="md:col-span-5">
            <div className="relative mx-auto max-w-sm md:mx-0 md:ml-auto">
              {/* orange blob */}
              <div
                className="absolute -z-10 right-[6%] top-[4%] h-[92%] w-[92%] rounded-[46%_54%_58%_42%/50%_46%_54%_50%] bg-amber"
                aria-hidden
              />

              {/* portrait */}
              <div className="relative aspect-[4/5]">
                <Image
                  src="/avatar.png"
                  alt="Petar Arsić"
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 420px"
                  className="object-contain object-bottom grayscale drop-shadow-2xl"
                />
              </div>

              <AvailabilityBadge label={t('card.available')} />

              {/* floating stat card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 rounded-2xl bg-ink-800 border border-line shadow-lift px-5 py-4 rotate-[-3deg]">
                <p className="font-display text-3xl font-bold text-amber leading-none">{t('metrics.years.value')}</p>
                <p className="mt-1.5 text-xs font-medium text-paper-dim whitespace-nowrap">{t('statLabel')}</p>
              </div>
            </div>

            <p className="mt-8 flex items-center gap-2 text-sm text-paper-faint">
              <FaMapMarkerAlt aria-hidden className="text-amber" />
              <span className="font-medium uppercase tracking-wide text-xs">{t('card.location')}</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'
import CountUp from './ui/CountUp'

export default function AboutMe() {
  const t = useTranslations('about')
  const tHero = useTranslations('hero')
  const tCv = useTranslations('cv')

  const stats = [
    { value: t('stats.years.value'), label: t('stats.years.label') },
    { value: t('stats.projects.value'), label: t('stats.projects.label') },
    { value: tHero('metrics.users.value'), label: tHero('metrics.users.label') },
  ]
  const focus = ['focus.items.0', 'focus.items.1', 'focus.items.2', 'focus.items.3', 'focus.items.4']

  return (
    <section id="about" className="relative bg-ink-900 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader callsign={t('badge')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Bio + stats + focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <p className="text-paper-dim leading-relaxed">{t('bio')}</p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-6 border-y border-line py-7">
              {stats.map((s, i) => (
                <div key={i}>
                  <dd className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-amber">
                    <CountUp value={s.value} />
                  </dd>
                  <dt className="mt-1.5 max-w-[10rem] text-xs font-medium uppercase tracking-wide text-paper-faint leading-snug">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <span className="callsign">{t('focus.title')}</span>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {focus.map((k, i) => (
                  <li key={k} className="flex items-start gap-3 text-sm text-paper-dim">
                    <span className="mt-0.5 font-mono text-[0.7rem] text-amber">{String(i + 1).padStart(2, '0')}</span>
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-pill-dark w-full sm:w-auto">
                {t('cta')} <span aria-hidden>→</span>
              </a>
              <a
                href="/api/cv"
                download
                className="btn-pill-outline w-full sm:w-auto"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.trackCTA) window.trackCTA('cv_download', 'about_section')
                }}
              >
                {tCv('downloadButton')} <span aria-hidden>↓</span>
              </a>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line bg-ink-850 shadow-panel">
                <Image
                  src="/avatar.png"
                  alt="Petar Arsić"
                  fill
                  sizes="(max-width: 768px) 80vw, 380px"
                  className="object-cover object-top grayscale"
                />
              </div>

              {/* rotating mono badge */}
              <div className="absolute -top-5 -left-5 h-20 w-20 rounded-full bg-ink-800 border border-line shadow-panel">
                <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full" aria-hidden>
                  <defs>
                    <path id="about-badge-path" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                  </defs>
                  <text fill="var(--paper-faint)" fontSize="7" letterSpacing="1.6" fontFamily="var(--font-mono)">
                    <textPath href="#about-badge-path" startOffset="0%">
                      {t('badge')} •
                    </textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-amber" aria-hidden />
              </div>

              {/* signature */}
              <p className="absolute bottom-5 right-6 font-script text-4xl text-white drop-shadow-md" aria-hidden>
                Petar Arsić
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

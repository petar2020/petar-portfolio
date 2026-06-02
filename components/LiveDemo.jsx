'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'
import usePrefersReducedMotion from './ui/usePrefersReducedMotion'

// Lazy-loaded, client-only — keeps the tilt lib out of first paint.
const Tilt = dynamic(() => import('react-parallax-tilt'), { ssr: false })

// Real product screenshots: passenger-facing reservation flow + operations back-office.
const CARDS = [
  { key: 'passenger', image: '/demo-drivesoft.png', tag: 'PAX', offset: false },
  { key: 'admin', image: '/demo-admin.png', tag: 'OPS', offset: true },
]

export default function LiveDemo() {
  const t = useTranslations('demo')
  const reduced = usePrefersReducedMotion()

  return (
    <section id="demo" className="relative grain bg-ink-850 py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="02" callsign={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-14 grid md:grid-cols-2 gap-8 lg:gap-12">
          {CARDS.map(({ key, image, tag, offset }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.65, 0, 0.35, 1] }}
              className={offset ? 'md:mt-20' : ''}
            >
              <a
                href={t(`${key}.url`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block panel ticked overflow-hidden transition-colors hover:border-teal-bright/50"
              >
                {/* label bar */}
                <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                  <span className="callsign">{tag} · {t(`${key}.title`)}</span>
                  <span className="flex items-center gap-1.5 callsign text-teal-bright">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-bright animate-pulse" /> LIVE
                  </span>
                </div>

                {/* screenshot with tasteful 3D tilt */}
                <div className="p-4">
                  <Tilt
                    tiltEnable={!reduced}
                    tiltMaxAngleX={6}
                    tiltMaxAngleY={6}
                    glareEnable={false}
                    scale={1.015}
                    transitionSpeed={900}
                    className="relative aspect-[16/10] overflow-hidden border border-line [transform-style:preserve-3d]"
                  >
                    <Image
                      src={image}
                      alt={t(`${key}.title`)}
                      fill
                      sizes="(max-width: 768px) 92vw, 560px"
                      className="object-cover object-top"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
                  </Tilt>
                </div>

                {/* caption + testable checklist */}
                <div className="px-5 pb-6">
                  <p className="text-sm text-paper-dim leading-relaxed">{t(`${key}.caption`)}</p>

                  <p className="mt-5 callsign !text-[0.6rem]">{t('testLabel')}</p>
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
                    {t.raw(`${key}.tests`).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-paper-dim">
                        <span className="mt-1.5 h-px w-2.5 shrink-0 bg-teal-bright" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-amber group-hover:translate-x-1 transition-transform">
                    {t('open')} <span aria-hidden>→</span>
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

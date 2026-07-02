'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import CountUp from './ui/CountUp'

/**
 * Compact "About + Contact" close: a short bio with headline stats on the
 * left, the portrait in the middle, and a one-line contact CTA on the
 * right. Replaces the old full-size About and Contact sections on the
 * homepage — the full contact form lives on its own page.
 */
export default function AboutContact() {
  const t = useTranslations('about')
  const tContact = useTranslations('contact')
  const tHero = useTranslations('hero')
  const locale = useLocale()

  const contactPath = locale === 'sr' ? `/${locale}/kontakt` : `/${locale}/contact`

  const stats = [
    { value: tHero('metrics.passengers.value'), label: tHero('metrics.passengers.label') },
    { value: tHero('metrics.users.value'), label: tHero('metrics.users.label') },
    { value: tHero('metrics.years.value'), label: tHero('metrics.years.label') },
  ]

  return (
    <section id="contact" className="relative bg-ink-900 border-t border-line py-16 sm:py-24 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-amber">{t('eyebrow')}</span>
            <h2 className="mt-3 font-display font-bold tracking-tight text-paper text-3xl sm:text-4xl leading-[1.1]">
              {t('compactTitle')}
            </h2>
            <p className="mt-4 text-paper-dim leading-relaxed">{t('compactBio')}</p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {stats.map((s, i) => (
                <div key={i}>
                  <dd className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-amber">
                    <CountUp value={s.value} />
                  </dd>
                  <dt className="mt-1 max-w-[9rem] text-xs font-medium text-paper-faint leading-snug">{s.label}</dt>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <div className="relative mx-auto max-w-[260px] aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-ink-850 shadow-panel">
              <Image
                src="/avatar.png"
                alt="Petar Arsić"
                fill
                sizes="(max-width: 768px) 60vw, 220px"
                className="object-cover object-top grayscale"
              />
              <p className="absolute bottom-3 right-4 font-script text-2xl text-white drop-shadow-md" aria-hidden>
                Petar Arsić
              </p>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="lg:col-span-4 order-3 rounded-2xl border border-line bg-ink-800 shadow-panel p-6 sm:p-8"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-amber">{tContact('compactEyebrow')}</span>
            <h3 className="mt-3 font-display font-bold text-paper text-2xl leading-tight">{tContact('compactTitle')}</h3>
            <p className="mt-3 text-sm text-paper-dim leading-relaxed">{tContact('compactText')}</p>

            <a
              href={contactPath}
              className="btn-pill-dark mt-6 w-full sm:w-auto"
              onClick={() => {
                if (typeof window !== 'undefined' && window.trackCTA) window.trackCTA('contact_cta', 'about_contact')
              }}
            >
              {tContact('compactCta')} <span aria-hidden>→</span>
            </a>

            <p className="mt-5 text-sm text-paper-faint">
              {tContact('compactDirect')}{' '}
              <a href="mailto:petar.arsic14@hotmail.com" className="font-semibold text-paper hover:text-amber transition-colors">
                petar.arsic14@hotmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

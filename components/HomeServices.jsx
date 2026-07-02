'use client'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { FaCode, FaCalendarCheck, FaPlug, FaTools } from 'react-icons/fa'
import SectionHeader from './ui/SectionHeader'
import { homeServiceCards } from '../data/services'

const CARD_ICONS = {
  webdev: FaCode,
  booking: FaCalendarCheck,
  api: FaPlug,
  maintenance: FaTools,
}

export default function HomeServices() {
  const t = useTranslations('homeServices')
  const locale = useLocale()

  return (
    <section id="platforms" className="relative bg-ink-900 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          callsign={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {homeServiceCards.map((card, i) => (
            <ServiceCard key={card.slug} card={card} index={i} locale={locale} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a href={`/${locale}/services`} className="btn-pill-outline">
            {t('viewAll')} <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ card, index, locale }) {
  const t = useTranslations(`homeServices.cards.${card.labelKey}`)
  const Icon = CARD_ICONS[card.labelKey] || FaCode

  return (
    <motion.a
      href={`/${locale}/services/${card.slug}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative flex flex-col rounded-2xl border border-line bg-ink-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:border-line-strong"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink-850 text-paper transition-colors group-hover:bg-amber group-hover:text-white">
        <Icon aria-hidden className="text-lg" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold text-paper">{t('title')}</h3>
      <p className="mt-2 text-sm text-paper-dim leading-relaxed">{t('description')}</p>
      <span
        aria-hidden
        className="absolute right-5 bottom-5 flex h-9 w-9 items-center justify-center rounded-full border border-line text-paper-faint transition-all duration-300 group-hover:bg-amber group-hover:border-amber group-hover:text-white group-hover:rotate-45"
      >
        ↗
      </span>
    </motion.a>
  )
}

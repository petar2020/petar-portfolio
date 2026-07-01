'use client'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { FaUmbrellaBeach, FaCalendarCheck, FaChartLine, FaWordpress, FaShoppingCart, FaRobot } from 'react-icons/fa'
import SectionHeader from './ui/SectionHeader'
import { homeServiceCards } from '../data/services'

const CARD_ICONS = {
  tourism: FaUmbrellaBeach,
  booking: FaCalendarCheck,
  admin: FaChartLine,
  wordpress: FaWordpress,
  ecommerce: FaShoppingCart,
  ai: FaRobot,
}

export default function HomeServices() {
  const t = useTranslations('homeServices')
  const locale = useLocale()

  return (
    <section id="platforms" className="relative grain bg-ink-900 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          callsign={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
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
          <a href={`/${locale}/services`} className="btn-line">
            {t('viewAll')} <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ card, index, locale }) {
  const t = useTranslations(`homeServices.cards.${card.labelKey}`)
  const tCommon = useTranslations('servicePages')
  const Icon = CARD_ICONS[card.labelKey] || FaChartLine

  return (
    <motion.a
      href={`/${locale}/services/${card.slug}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group panel block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
        <Icon aria-hidden className="text-lg" />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-paper group-hover:text-teal-bright transition-colors">
        {t('title')}
      </h3>
      <p className="mt-2 text-sm text-paper-dim leading-relaxed">{t('description')}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-teal-bright transition-all group-hover:gap-2.5 group-hover:text-amber">
        {tCommon('readMore')} <span aria-hidden>→</span>
      </span>
    </motion.a>
  )
}

'use client'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import SectionHeader from './ui/SectionHeader'
import { homeServiceCards } from '../data/services'

export default function HomeServices() {
  const t = useTranslations('homeServices')
  const locale = useLocale()

  return (
    <section id="platforms" className="relative grain bg-ink-850 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          index="05"
          callsign={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {homeServiceCards.map((card, i) => (
            <ServiceCard key={card.slug} card={card} index={i} locale={locale} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
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

  return (
    <motion.a
      href={`/${locale}/services/${card.slug}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group block bg-ink-800 p-6 transition-colors hover:bg-ink-700"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-deep group-hover:bg-teal-bright transition-colors" />
        <span className="font-mono text-xs font-bold text-paper-faint group-hover:text-amber transition-colors">
          {t('code')}
        </span>
      </div>
      <h3 className="font-display text-lg font-bold text-paper group-hover:text-teal-bright transition-colors mb-2">
        {t('title')}
      </h3>
      <p className="text-sm text-paper-dim leading-relaxed mb-4">{t('description')}</p>
      <span className="inline-flex items-center gap-1 font-mono text-xs text-teal-bright group-hover:text-amber transition-colors">
        {tCommon('readMore')} <span aria-hidden>→</span>
      </span>
    </motion.a>
  )
}

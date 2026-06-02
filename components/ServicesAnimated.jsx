'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'

export default function ServicesAnimated() {
  const t = useTranslations('services')

  const items = [
    { key: 'backend', code: 'LAR' },
    { key: 'frontend', code: 'FE' },
    { key: 'booking', code: 'BKG' },
    { key: 'maintenance', code: 'OPS' },
    { key: 'automation', code: 'AUT' },
    { key: 'cms', code: 'CMS' },
    { key: 'ai', code: 'AI' },
  ]

  return (
    <section id="services" className="relative grain bg-ink-900 py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="05" callsign="Capabilities" title={t('title')} subtitle={t('subtitle')} />

        {/* spec table */}
        <div className="mt-12 border border-line">
          {/* header row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-line bg-ink-850">
            <span className="col-span-1 callsign !text-[0.6rem]">ID</span>
            <span className="col-span-4 callsign !text-[0.6rem]">Capability</span>
            <span className="col-span-7 callsign !text-[0.6rem]">Stack</span>
          </div>

          {items.map(({ key, code }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 py-6 border-b border-line last:border-b-0 transition-colors hover:bg-ink-800"
            >
              <div className="md:col-span-1 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-deep group-hover:bg-teal-bright transition-colors" />
                <span className="font-mono text-sm font-bold text-paper-faint group-hover:text-amber transition-colors">{code}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-lg font-bold text-paper">{t(`${key}.title`)}</h3>
                <p className="mt-1 text-sm text-paper-dim leading-relaxed">{t(`${key}.description`)}</p>
              </div>
              <div className="md:col-span-7 flex flex-wrap items-start gap-1.5 md:justify-end content-start">
                {t(`${key}.features`).split(',').map((f, idx) => (
                  <span key={idx} className="px-2 py-0.5 font-mono text-[0.68rem] text-paper-faint border border-line">
                    {f.trim()}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

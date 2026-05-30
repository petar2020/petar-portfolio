'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'

export default function ServicesAnimated() {
  const t = useTranslations('services')

  const items = [
    { key: 'webDev', code: 'WEB' },
    { key: 'mobileDev', code: 'MOB' },
    { key: 'cloudDev', code: 'CLD' },
    { key: 'devOps', code: 'OPS' },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] } },
  }

  return (
    <section id="services" className="relative grain bg-ink-900 py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="05" callsign="Capabilities" title={t('title')} subtitle={t('subtitle')} />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid sm:grid-cols-2 gap-px bg-line border border-line"
        >
          {items.map(({ key, code }, i) => (
            <motion.div key={key} variants={item} className="group bg-ink-800 p-6 sm:p-8 transition-colors hover:bg-ink-700">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="callsign">{String(i + 1).padStart(2, '0')} · {code}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-teal-deep group-hover:bg-teal-bright transition-colors" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-paper">{t(`${key}.title`)}</h3>
              <p className="mt-2 text-sm text-paper-dim leading-relaxed">{t(`${key}.description`)}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {t(`${key}.features`).split(',').map((f, idx) => (
                  <span key={idx} className="px-2 py-0.5 font-mono text-[0.68rem] text-paper-faint border border-line">
                    {f.trim()}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

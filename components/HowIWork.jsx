'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'

const KEYS = ['review', 'prompting', 'testing', 'shipping']

export default function HowIWork() {
  const t = useTranslations('howIWork')

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] } },
  }

  return (
    <section id="how-i-work" className="relative grain bg-ink-850 py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="06" callsign="Method" title={t('title')} subtitle={t('subtitle')} status="amber" />

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line"
        >
          {KEYS.map((key, i) => (
            <motion.li key={key} variants={item} className="group bg-ink-800 p-6 sm:p-7 relative">
              <span className="font-mono text-3xl font-bold text-teal-deep group-hover:text-teal-bright transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="absolute right-6 top-7 h-px w-6 bg-line group-hover:bg-amber transition-colors" aria-hidden />
              <h3 className="mt-5 font-display text-lg font-semibold text-paper">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 text-sm text-paper-dim leading-relaxed">{t(`items.${key}.description`)}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

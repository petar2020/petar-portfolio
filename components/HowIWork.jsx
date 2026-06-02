'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'

const KEYS = ['review', 'prompting', 'testing', 'shipping']

export default function HowIWork() {
  const t = useTranslations('howIWork')

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] } },
  }

  return (
    <section id="how-i-work" className="relative grain bg-ink-850 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="06" callsign="Method" title={t('title')} subtitle={t('subtitle')} status="amber" />

        {/* process flow — stops on a route */}
        <div className="mt-16 relative">
          {/* connecting line through the node centers (desktop) */}
          <div className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-line" aria-hidden />

          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10"
          >
            {KEYS.map((key, i) => (
              <motion.li key={key} variants={item} className="group relative">
                <div className="flex items-center gap-3">
                  <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center border border-line bg-ink-850 font-mono text-sm font-bold text-teal-bright group-hover:border-amber group-hover:text-amber transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < KEYS.length - 1 && (
                    <span className="md:hidden h-px flex-1 bg-line" aria-hidden />
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-paper">{t(`items.${key}.title`)}</h3>
                <p className="mt-3 text-sm text-paper-dim leading-relaxed">{t(`items.${key}.description`)}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}

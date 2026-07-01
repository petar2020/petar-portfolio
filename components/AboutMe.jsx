'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'

export default function AboutMe() {
  const t = useTranslations('about')

  const stats = ['years', 'projects', 'stack', 'remote']
  const focus = ['focus.items.0', 'focus.items.1', 'focus.items.2', 'focus.items.3', 'focus.items.4']

  return (
    <section id="about" className="relative grain bg-ink-900 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="08" callsign="Profile" title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid lg:grid-cols-2 gap-px bg-line border border-line">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="bg-ink-800 p-6 sm:p-8"
          >
            <span className="callsign">{t('aboutMe')}</span>
            <p className="mt-4 text-paper-dim leading-relaxed">{t('bio')}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px bg-line border border-line">
              {stats.map((s) => (
                <div key={s} className="bg-ink-900 p-4">
                  <dd className="font-mono text-xl font-bold text-paper">{t(`stats.${s}.value`)}</dd>
                  <dt className="mt-1 callsign !text-[0.6rem]">{t(`stats.${s}.label`)}</dt>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="bg-ink-800 p-6 sm:p-8 flex flex-col"
          >
            <span className="callsign">{t('focus.title')}</span>
            <ul className="mt-5 space-y-3">
              {focus.map((k, i) => (
                <li key={k} className="flex items-start gap-3 text-paper-dim">
                  <span className="mt-2 font-mono text-[0.7rem] text-teal-bright">{String(i + 1).padStart(2, '0')}</span>
                  <span>{t(k)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <a href="#contact" className="btn-signal w-full sm:w-auto">
                {t('cta')} <span aria-hidden>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

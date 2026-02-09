'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function AboutMe() {
  const t = useTranslations('about')
  const reduceMotion = useReducedMotion()
  const highlights = Array.isArray(t.raw('highlights')) ? t.raw('highlights') : []
  const credibility = Array.isArray(t.raw('credibility')) ? t.raw('credibility') : []

  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-[#0b1f3f] to-gray-900 py-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#3B82F6_1px,_transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={reduceMotion ? undefined : { duration: 0.45 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">{t('title')}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300">{t('subtitle')}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={reduceMotion ? undefined : { duration: 0.45 }}
            className="rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-sm md:p-8"
          >
            <h3 className="text-2xl font-bold text-white">{t('aboutMe')}</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-200 md:text-lg">{t('story')}</p>

            <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">{t('highlightsTitle')}</h4>
            <ul className="mt-4 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-100">
                  <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:brightness-110"
              >
                {t('cta')}
              </a>
            </div>
          </motion.article>

          <motion.aside
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={reduceMotion ? undefined : { duration: 0.45, delay: 0.04 }}
            className="rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-sm md:p-8"
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">{t('credibilityTitle')}</h4>
            <div className="mt-6 space-y-4">
              {credibility.map((item, index) => (
                <div key={`${item.value}-${index}`} className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="text-2xl font-extrabold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

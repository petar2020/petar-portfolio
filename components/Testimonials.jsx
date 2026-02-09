'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const reduceMotion = useReducedMotion()
  const items = Array.isArray(t.raw('items')) ? t.raw('items') : []

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white to-gray-100 py-20 dark:from-gray-950 dark:to-gray-900"
    >
      <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-15">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={reduceMotion ? undefined : { duration: 0.4 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-white">{t('title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base dark:text-gray-300">{t('subtitle')}</p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={`${item.name}-${index}`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={reduceMotion ? undefined : { duration: 0.35, delay: index * 0.05 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">“{item.quote}”</p>
              <p className="mt-5 text-sm font-extrabold text-gray-900 dark:text-white">{item.name}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
                {item.role} · {item.company}
              </p>
              <p className="mt-4 rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:border-sky-700/50 dark:bg-sky-900/30 dark:text-sky-200">
                {item.result}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:brightness-110"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  )
}

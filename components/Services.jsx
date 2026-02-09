'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Services() {
  const t = useTranslations('services')
  const reduceMotion = useReducedMotion()

  const services = [
    {
      icon: '🎫',
      title: t('items.booking.title'),
      description: t('items.booking.description'),
      tags: t('items.booking.tags')
    },
    {
      icon: '🧩',
      title: t('items.webapps.title'),
      description: t('items.webapps.description'),
      tags: t('items.webapps.tags')
    },
    {
      icon: '📱',
      title: t('items.mobile.title'),
      description: t('items.mobile.description'),
      tags: t('items.mobile.tags')
    },
    {
      icon: '⚡',
      title: t('items.wordpress.title'),
      description: t('items.wordpress.description'),
      tags: t('items.wordpress.tags')
    }
  ]

  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-[#091733] to-[#0a1222] py-20">
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#3B82F6_1px,_transparent_1px)] bg-[length:28px_28px]" />
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={reduceMotion ? undefined : { duration: 0.35, delay: index * 0.05 }}
              className="rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-sm"
            >
              <div className="text-3xl">{service.icon}</div>
              <h3 className="mt-4 text-xl font-bold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">{service.description}</p>
              <p className="mt-4 rounded-lg border border-white/15 bg-white/6 p-3 text-xs font-semibold uppercase tracking-wide text-sky-200">
                {service.tags}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={reduceMotion ? undefined : { duration: 0.35, delay: 0.12 }}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/15 bg-white/8 p-5 text-center backdrop-blur-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">{t('expertiseTitle')}</p>
          <p className="mt-2 text-sm text-slate-200">{t('expertiseText')}</p>
        </motion.div>
      </div>
    </section>
  )
}

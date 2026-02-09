'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const clients = [
  { id: 1, name: 'Srbija Tours International', url: 'https://srbijatours.com/' },
  { id: 2, name: 'Una Line GmbH', url: 'https://unaline.de/' },
  { id: 3, name: 'Bozic Tours', url: 'https://bozic-konig.com/' },
  { id: 4, name: 'Prostor Dereta', url: 'https://prostordereta.org/' }
]

export default function ClientLogos() {
  const t = useTranslations('clients')
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-gray-900 py-16">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_#3B82F6_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduceMotion ? undefined : { duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">{t('title')}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-300 md:text-base">{t('subtitle')}</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {clients.map((client, index) => (
            <motion.a
              key={client.id}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('visit', { name: client.name })}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={reduceMotion ? undefined : { duration: 0.3, delay: index * 0.05 }}
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
              className="flex h-24 items-center justify-center rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 px-3 text-center text-xs font-semibold text-gray-100 transition hover:border-sky-400 md:h-28 md:text-sm"
            >
              {client.name}
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="mb-4 text-sm text-gray-400">{t('ctaText')}</p>
          <a
            href="#contact"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:brightness-110"
          >
            {t('ctaButton')}
          </a>
        </div>
      </div>
    </section>
  )
}

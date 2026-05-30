'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'

const clients = [
  { id: 1, name: 'Srbija Tours International', url: 'https://srbijatours.com/' },
  { id: 2, name: 'Una Line GmbH', url: 'https://unaline.de/' },
  { id: 3, name: 'Božić Tours', url: 'https://bozic-konig.com/' },
  { id: 4, name: 'Prostor Dereta', url: 'https://prostordereta.org/' },
]

export default function ClientLogos() {
  const t = useTranslations('clients')

  return (
    <section className="relative grain bg-ink-850 py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="08" callsign="Trusted by" title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {clients.map((client, i) => (
            <motion.a
              key={client.id}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('visit', { name: client.name })}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group bg-ink-800 p-6 h-32 flex flex-col justify-between hover:bg-ink-700 transition-colors"
            >
              <span className="callsign !text-[0.6rem] text-paper-faint group-hover:text-teal-bright transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display font-semibold text-paper leading-snug group-hover:text-teal-bright transition-colors">
                {client.name}
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-line pt-8"
        >
          <p className="max-w-xl text-paper-dim">{t('ctaText')}</p>
          <a href="#contact" className="btn-signal shrink-0">
            {t('ctaButton')} <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

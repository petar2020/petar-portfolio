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

        {/* operators strip — single hairline rail, not a grid of boxes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-12 border-y border-line"
        >
          <div className="flex items-stretch overflow-x-auto scrollbar-hide divide-x divide-line">
            {clients.map((client, i) => (
              <motion.a
                key={client.id}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('visit', { name: client.name })}
                whileHover={{ y: -1 }}
                className="group flex shrink-0 items-center gap-3 px-6 py-6 first:pl-0 transition-colors"
              >
                <span className="font-mono text-[0.7rem] text-paper-faint group-hover:text-amber transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-semibold text-paper-dim whitespace-nowrap group-hover:text-teal-bright transition-colors">
                  {client.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* CTA line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
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

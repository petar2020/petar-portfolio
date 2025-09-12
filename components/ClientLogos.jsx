'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const clients = [
  { id: 1, name: 'Srbija Tours International', url: 'https://srbijatours.com/' },
  { id: 2, name: 'Una Line GmbH',              url: 'https://unaline.de/' },
  { id: 3, name: 'Božić Tours',                url: 'https://bozic-konig.com/' },
  { id: 4, name: 'Prostor Dereta',             url: 'https://prostordereta.org/' }
]

export default function ClientLogos() {
  const t = useTranslations('clients')

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.45 } }
  }

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_#3B82F6_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Clients */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center"
        >
          {clients.map((client, i) => (
            <motion.div key={client.id} variants={item} className="flex justify-center">
              <motion.a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={t('visit', { name: client.name })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-40 h-24 md:w-48 md:h-28 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center border border-gray-600 group-hover:border-blue-500 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                  <span className="text-center text-sm md:text-base font-semibold text-gray-200 group-hover:text-blue-400 transition-colors px-2">
                    {client.name}
                  </span>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            {t('ctaText')}
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {t('ctaButton')}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

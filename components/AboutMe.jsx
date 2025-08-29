// src/components/AboutMe.jsx
'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function AboutMe() {
  const t = useTranslations('about')

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#3B82F6_1px,_transparent_1px)] bg-[length:20px_20px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Naslov */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Sadržaj */}
        <div className="mx-auto grid md:grid-cols-2 gap-8 max-w-5xl">
          {/* Kratka biografija */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">{t('aboutMe')}</h3>
            <p className="text-gray-200 leading-relaxed">{t('bio')}</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-sm text-gray-300">{t('stats.years.label')}</p>
                <p className="text-2xl font-bold text-white">{t('stats.years.value')}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-sm text-gray-300">{t('stats.projects.label')}</p>
                <p className="text-2xl font-bold text-white">{t('stats.projects.value')}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-sm text-gray-300">{t('stats.stack.label')}</p>
                <p className="text-sm font-semibold text-white">{t('stats.stack.value')}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-sm text-gray-300">{t('stats.remote.label')}</p>
                <p className="text-sm font-semibold text-white">{t('stats.remote.value')}</p>
              </div>
            </div>
          </motion.div>

          {/* Fokus/servisi kratko */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">{t('focus.title')}</h3>
            <ul className="space-y-3 text-gray-200">
              {['focus.items.0','focus.items.1','focus.items.2','focus.items.3','focus.items.4'].map(k => (
                <li key={k} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                  <span>{t(k)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                {t('cta')}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

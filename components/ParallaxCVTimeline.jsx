'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'

export default function ParallaxCVTimeline() {
  const t = useTranslations('cv')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section ref={ref} className="relative grain bg-ink-900 border-t border-line py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="10" callsign="Dossier" title={t('title')} subtitle={t('downloadDescription')} />

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-12 panel ticked p-8 sm:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
                <span className="callsign">PDF · {t('downloadTitle')}</span>
              </div>
              <p className="mt-4 max-w-xl text-paper-dim leading-relaxed">{t('downloadDescription')}</p>
            </div>

            <motion.a
              href="/api/cv"
              download
              whileHover={{ y: -2 }}
              className="btn-signal shrink-0"
              onClick={() => {
                if (typeof window !== 'undefined' && window.trackCTA) window.trackCTA('cv_download', 'dossier_section')
              }}
            >
              {t('downloadButton')} <span aria-hidden>↓</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function ParallaxCVTimeline() {
  const t = useTranslations('cv')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.1])

  return (
    <section
      ref={ref}
      className="
        relative overflow-hidden
        bg-gradient-to-b from-gray-900 via-[#0C1B34] to-blue-900
        py-24 sm:py-28 md:py-40      /* ⇦ više vertikalnog razmaka na svim uređajima */
      "
    >
      {/* Background pattern + blaga vinjeta */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#3B82F6_1px,_transparent_1px)] bg-[length:28px_28px]" />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_60%_at_50%_30%,rgba(56,189,248,0.12),transparent)]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-5 sm:px-6 md:px-8 relative z-10"
      >
        {/* Heading blok */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7 }}
            className="
              font-extrabold text-white tracking-tight
              text-3xl sm:text-4xl md:text-5xl
            "
          >
            {t('title')}
          </motion.h2>

          <div className="mx-auto mt-4 h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="
              mt-6 md:mt-7
              text-base sm:text-lg md:text-xl
              text-slate-300/95 leading-relaxed
              max-w-[46rem] mx-auto
            "
          >
            {t('downloadDescription')}
          </motion.p>
        </div>

        {/* Kartica sa CTA */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="
              bg-white/10 backdrop-blur-sm
              rounded-2xl md:rounded-3xl
              p-6 sm:p-8 md:p-12
              border border-white/15
              shadow-[0_10px_40px_rgba(2,6,23,0.45)]
            "
          >
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4">
                {t('downloadTitle')}
              </h3>

              <p className="text-slate-200/90 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                {t('downloadDescription')}
              </p>

              <motion.a
                href="/api/cv"
                download
                className="
                  inline-flex w-full sm:w-auto items-center justify-center gap-3
                  px-6 sm:px-8 py-4
                  rounded-xl md:rounded-2xl
                  font-semibold text-white
                  bg-gradient-to-r from-blue-600 to-purple-600
                  hover:from-blue-700 hover:to-purple-700
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                "
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.trackCTA) {
                    window.trackCTA('cv_download', 'timeline_section')
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('downloadButton')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

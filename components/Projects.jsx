'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { featuredProjects } from '../data/projects'
import Image from 'next/image'

export default function Projects() {
  const t = useTranslations('projects')
  const [active, setActive] = useState(null)

  // refs
  const containerRef = useRef(null)
  const rafIdRef = useRef(null)
  const dirRef = useRef(1)        // 1 -> desno, -1 -> levo
  const hoverRef = useRef(false)  // pauza na hover
  const speedRef = useRef(0.35)   // podešavanje brzine
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  // Auto-scroll sa pauzom i čistim cleanup-om
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const step = () => {
      if (!isInView || hoverRef.current || active !== null) {
        rafIdRef.current = requestAnimationFrame(step)
        return
      }
      const max = el.scrollWidth - el.clientWidth
      const next = el.scrollLeft + speedRef.current * dirRef.current

      if (next >= max) dirRef.current = -1
      else if (next <= 0) dirRef.current = 1

      el.scrollLeft = Math.min(Math.max(next, 0), max)
      rafIdRef.current = requestAnimationFrame(step)
    }

    const onEnter = () => (hoverRef.current = true)
    const onLeave = () => (hoverRef.current = false)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    rafIdRef.current = requestAnimationFrame(step)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [isInView, active])

  // Zaključaj body scroll kada je modal otvoren
  useEffect(() => {
    const { style } = document.body
    if (active !== null) {
      const prev = style.overflow
      style.overflow = 'hidden'
      return () => { style.overflow = prev }
    }
  }, [active])

  const handleProjectClick = (projectIndex, interactionType) => {
    // event tracking – koristimo prevedeni naslov
    const p = featuredProjects[projectIndex]
    const title = t.optional?.(`items.${p.key}.title`) ?? p.key
    if (typeof window !== 'undefined' && window.trackProjectInteraction) {
      window.trackProjectInteraction(title, interactionType)
    }
    setActive(projectIndex)
  }

  // helper da dohvatimo prevedene naslove/opise
  const titleOf = (p) => t.optional?.(`items.${p.key}.title`) ?? p.title ?? p.key
  const descOf  = (p) => t.optional?.(`items.${p.key}.description`) ?? p.description ?? ''

  return (
    <>
      <section
        id="projects"
        className="relative py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden scroll-mt-24"
      >
        {/* background */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <motion.div
              className="mx-auto mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            />
          </motion.div>

          {/* horizontal scroller */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto pb-10 -mx-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            <div className="flex gap-8 px-4">
              {featuredProjects.map((p, i) => {
                const title = titleOf(p)
                const description = descOf(p)

                return (
                  <motion.article
                    key={p.key ?? title}
                    className="snap-center flex-shrink-0 w-[22rem] md:w-[26rem]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.12 }}
                  >
                    <div className="group relative h-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                      {/* image */}
                      <div className="relative h-56 md:h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={p.image}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 90vw, 416px"
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                          priority={i < 2}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                      </div>

                      {/* content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                          {title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">
                          {description}
                        </p>

                        {/* tech chips */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {p.tech.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* actions */}
                        <div className="flex items-center justify-between">
                          <motion.button
                            onClick={() => handleProjectClick(i, 'case_study_view')}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 text-primary dark:text-secondary font-medium"
                          >
                            {t('viewCase')}
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                              className="inline-flex"
                            >
                              ↗
                            </motion.span>
                          </motion.button>

                          <motion.a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            onClick={() => handleProjectClick(i, 'external_link')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                          </motion.a>
                        </div>
                      </div>

                      {/* subtle glow */}
                      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/15 to-secondary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden max-w-6xl w-full max-h-[90vh] shadow-2xl border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              layout
            >
              <div className="relative h-64 md:h-80 bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                <button
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg"
                  onClick={() => setActive(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {(() => {
                const p = featuredProjects[active]
                const title = titleOf(p)
                const description = descOf(p)

                return (
                  <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                    <motion.h3
                      className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100"
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.35 }}
                    >
                      {title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-600 dark:text-gray-300 mb-6"
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.05 }}
                    >
                      {description}
                    </motion.p>

                    {/* meta sekcije ako postoje u data (nije obavezno) */}
                    {p.metrics && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="mb-8"
                      >
                        <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{t('metrics')}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(p.metrics).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-primary dark:text-secondary">{value}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      className="flex flex-wrap gap-3 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      {p.tech.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div
                      className="flex flex-wrap gap-4"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.35 }}
                    >
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-medium hover:shadow-lg transition-all"
                        onClick={() => handleProjectClick(active, 'case_study_external_link')}
                      >
                        {t('viewLive')}
                        <span className="ml-2">↗</span>
                      </a>
                    </motion.div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

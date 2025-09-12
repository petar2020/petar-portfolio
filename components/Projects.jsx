'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { featuredProjects } from '../data/projects'

export default function Projects() {
  const t = useTranslations('projects')
  const [active, setActive] = useState(null)

  const titleOf  = (p) => t(`items.${p.key}.title`,       { default: p.title ?? p.key })
  const descOf   = (p) => t(`items.${p.key}.description`, { default: p.description ?? '' })
  const longOf   = (p) => t(`items.${p.key}.long`,        { default: p.longDescription ?? '' })
  const detailsOf = (p) => {
    const raw = (t.raw ? t.raw(`items.${p.key}.details`) : undefined)
    return Array.isArray(raw) ? raw : (p.details ?? [])
  }

  return (
    <>
      <section
        id="projects"
        className="
          relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800
          scroll-mt-24
          pt-8 sm:pt-0 pb-20    /* više vazduha na mobilu ispod fiksne nav trake */
        "
      >
        {/* bg grid */}
        <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        </div>
        <br></br>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('title', { default: 'Featured Projects' })}
            </h2>
            <div className="mx-auto mt-3 sm:mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>

          {/* MOBILE: full-width snap karusel, po jedna kartica */}
          <div className="md:hidden -mx-4 pl-4 pr-6 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2">
            {featuredProjects.map((p, i) => (
              <ProjectCard
                key={p.key ?? i}
                p={p}
                title={titleOf(p)}
                description={descOf(p)}
                onOpen={() => setActive(i)}
                viewLabel={t('viewCaseStudy', { default: 'View case study' })}
                className="snap-center w-[92%] shrink-0"
                dense
              />
            ))}
          </div>

          {/* DESKTOP: uredna grid mreža */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p, i) => (
              <ProjectCard
                key={p.key ?? i}
                p={p}
                title={titleOf(p)}
                description={descOf(p)}
                onOpen={() => setActive(i)}
                viewLabel={t('viewCaseStudy', { default: 'View case study' })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {active !== null && (
          <ModalSheet
            project={featuredProjects[active]}
            title={titleOf(featuredProjects[active])}
            description={descOf(featuredProjects[active])}
            long={longOf(featuredProjects[active])}
            details={detailsOf(featuredProjects[active])}
            t={t}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------- Modal: desktop = centered dialog; mobile = bottom sheet ---------- */
function ModalSheet({ project: p, title, description, long, details, t, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="
          w-full md:max-w-5xl md:rounded-3xl overflow-hidden
          bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800
          md:max-h-[90vh]
          rounded-t-3xl md:rounded-3xl
        "
        initial={{ y: 40, opacity: 0, scale: 1 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header image */}
        <div className="relative h-48 sm:h-64 md:h-80 bg-gray-200 dark:bg-gray-800">
          {p.image && <Image src={p.image} alt={title} fill className="object-cover" />}
          <button
            onClick={onClose}
            className="
              absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 rounded-full
              bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 hover:bg-white shadow
            "
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* content */}
        <div className="p-5 sm:p-6 md:p-8 overflow-y-auto max-h-[78vh] md:max-h-[calc(90vh-16rem)] space-y-6">
          <header>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
          </header>

          {p.tech?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {p.tech.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-xs sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {long && (
            <section>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t('caseStudy', { default: 'Case study' })}
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{long}</p>
            </section>
          )}

          {details?.length > 0 && (
            <section>
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t('highlights', { default: 'Highlights' })}
              </h5>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </section>
          )}

          <div className="flex flex-wrap gap-3">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium hover:opacity-95 w-full sm:w-auto"
              >
                {t('viewLive', { default: 'View live' })} <span className="ml-2">↗</span>
              </a>
            )}
            {p.links?.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto"
              >
                {l.label} <span className="ml-2">↗</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------- Card ---------- */
function ProjectCard({ p, title, description, onOpen, className = '', viewLabel = 'View case study', dense = false }) {
  return (
    <article className={`h-full ${className}`}>
      <div className="
        group relative h-full flex flex-col rounded-3xl
        bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 shadow-md overflow-hidden
      ">
        {/* image */}
        <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800">
          <Image
            src={p.image}
            alt={title}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 33vw, 416px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </div>

        {/* content */}
        <div className={`flex-1 ${dense ? 'p-5' : 'p-6'} flex flex-col`}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-50 md:text-gray-900 dark:text-gray-100">
            <span className="md:hidden block text-white">{title}</span>
            <span className="hidden md:block">{title}</span>
          </h3>

          <p className="mt-2 text-gray-300 md:text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>

          {p.tech?.length > 0 && (
            <div className={`mt-4 ${dense ? 'mb-4' : 'mb-6'} flex flex-wrap gap-2`}>
              {p.tech.slice(0, dense ? 5 : p.tech.length).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs sm:text-sm font-medium bg-gray-100/70 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-2">
            <button
              onClick={onOpen}
              className="flex items-center gap-2 text-primary dark:text-secondary font-medium hover:translate-x-0.5 transition-transform"
            >
              {viewLabel} <span>↗</span>
            </button>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Open"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/15 to-secondary/15 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </article>
  )
}

'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { featuredProjects } from '../data/projects'

export default function Projects() {
  const t = useTranslations('projects')
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(null)

  const titleOf = (p) => t(`items.${p.key}.title`, { default: p.title ?? p.key })
  const problemOf = (p) => t(`items.${p.key}.problem`, { default: p.description ?? '' })
  const solutionOf = (p) => t(`items.${p.key}.solution`, { default: p.longDescription ?? '' })
  const outcomeOf = (p) => t(`items.${p.key}.outcome`, { default: '' })
  const detailsOf = (p) => {
    const raw = t.raw ? t.raw(`items.${p.key}.details`) : undefined
    return Array.isArray(raw) ? raw : p.details ?? []
  }

  return (
    <>
      <section
        id="projects"
        className="relative scroll-mt-24 bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-900 dark:to-gray-950"
      >
        <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={reduceMotion ? undefined : { duration: 0.4 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-white">{t('title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base dark:text-gray-300">{t('subtitle')}</p>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.key ?? index}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={reduceMotion ? undefined : { duration: 0.35, delay: index * 0.03 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={project.image}
                    alt={titleOf(project)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">{titleOf(project)}</h3>

                  <div className="mt-4 space-y-3 text-sm">
                    <CaseField label={t('problemLabel')} value={problemOf(project)} />
                    <CaseField label={t('solutionLabel')} value={solutionOf(project)} clamp />
                    <CaseField label={t('outcomeLabel')} value={outcomeOf(project)} />

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/70">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                        {t('techLabel')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(project.tech ?? []).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-gray-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={() => {
                        setActiveIndex(index)
                        if (typeof window !== 'undefined' && window.trackProjectInteraction) {
                          window.trackProjectInteraction(project.key, 'open_case_study')
                        }
                      }}
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
                    >
                      {t('viewCaseStudy')}
                    </button>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
                      >
                        {t('viewLive')}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{t('viewAllHint')}</p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:brightness-110"
            >
              {t('viewAllCta')}
            </a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeIndex !== null && (
          <CaseStudyModal
            project={featuredProjects[activeIndex]}
            title={titleOf(featuredProjects[activeIndex])}
            problem={problemOf(featuredProjects[activeIndex])}
            solution={solutionOf(featuredProjects[activeIndex])}
            outcome={outcomeOf(featuredProjects[activeIndex])}
            details={detailsOf(featuredProjects[activeIndex])}
            labels={{
              caseStudy: t('caseStudy'),
              highlights: t('highlights'),
              problem: t('problemLabel'),
              solution: t('solutionLabel'),
              outcome: t('outcomeLabel'),
              tech: t('techLabel'),
              live: t('viewLive')
            }}
            onClose={() => setActiveIndex(null)}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function CaseField({ label, value, clamp = false }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/70">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">{label}</p>
      <p className={`text-gray-700 dark:text-gray-200 ${clamp ? 'line-clamp-3' : ''}`}>{value}</p>
    </div>
  )
}

function CaseStudyModal({ project, title, problem, solution, outcome, details, labels, onClose, reduceMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm md:items-center md:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={reduceMotion ? false : { y: 20, opacity: 0 }}
        animate={reduceMotion ? false : { y: 0, opacity: 1 }}
        exit={reduceMotion ? false : { y: 20, opacity: 0 }}
        transition={reduceMotion ? undefined : { duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full overflow-hidden rounded-t-3xl border border-gray-200 bg-white shadow-2xl md:max-w-4xl md:rounded-3xl dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="relative h-48 w-full bg-gray-100 md:h-72 dark:bg-gray-800">
          {project.image && <Image src={project.image} alt={title} fill className="object-cover" />}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-800 shadow dark:bg-gray-900/90 dark:text-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[calc(90vh-12rem)] space-y-6 overflow-y-auto p-6 md:max-h-[calc(90vh-18rem)] md:p-8">
          <header>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">{title}</h3>
          </header>

          <section>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">{labels.caseStudy}</h4>
            <CaseField label={labels.problem} value={problem} />
            <div className="mt-3">
              <CaseField label={labels.solution} value={solution} />
            </div>
            <div className="mt-3">
              <CaseField label={labels.outcome} value={outcome} />
            </div>
          </section>

          {Array.isArray(details) && details.length > 0 && (
            <section>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">{labels.highlights}</h4>
              <ul className="list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-200">
                {details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">{labels.tech}</h4>
            <div className="flex flex-wrap gap-2">
              {(project.tech ?? []).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
            >
              {labels.live}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

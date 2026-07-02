'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { featuredProjects } from '../data/projects'
import SectionHeader from './ui/SectionHeader'

const GITHUB_URL = 'https://github.com/petar2020'

/**
 * Selected work — one flagship project shown large (real production
 * numbers, capability tags), two supporting projects below it.
 */
export default function Projects() {
  const t = useTranslations('projects')
  const tHero = useTranslations('hero')
  const locale = useLocale()
  const projects = featuredProjects.filter((p) => p.featured)
  const primary = projects.find((p) => p.primary) || projects[0]
  const secondary = projects.filter((p) => p.key !== primary?.key)

  return (
    <section id="projects" className="relative bg-ink-850 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeader callsign="Selected projects" title={t('title')} subtitle={t('subtitle')} />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-paper hover:text-amber transition-colors"
          >
            {t('viewAllProjects')} <span aria-hidden>→</span>
          </a>
        </div>

        <div className="mt-12 space-y-6 lg:space-y-8">
          {primary && <FeaturedProjectCard p={primary} t={t} tHero={tHero} locale={locale} />}

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {secondary.map((p, i) => (
              <ProjectCard key={p.key} p={p} t={t} locale={locale} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function getStatusLabel(p, t) {
  return p.links?.live
    ? t('viewLive')
    : p.links?.demo
      ? t('viewDemo')
      : p.links?.caseStudy
        ? t('viewCase')
        : t('viewGithub')
}

function projectHref(p, locale) {
  return (
    p.links?.live ||
    p.links?.demo ||
    (p.links?.caseStudy ? `/${locale}/case-study/drivesoft` : null) ||
    p.links?.github
  )
}

function StatusBadge({ label }) {
  return (
    <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink-900/95 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-paper shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-teal-bright animate-pulse" aria-hidden />
      {label}
    </span>
  )
}

function FeaturedProjectCard({ p, t, tHero, locale }) {
  const title = t(`items.${p.key}.title`)
  const summary = t(`items.${p.key}.summary`)
  const capabilities = t.raw(`items.${p.key}.capabilities`) || []
  const href = projectHref(p, locale)
  const external = Boolean(p.links?.live || p.links?.demo || (!p.links?.caseStudy && p.links?.github))
  const statusLabel = getStatusLabel(p, t)

  const metrics = [
    { value: tHero('metrics.passengers.value'), label: tHero('metrics.passengers.label') },
    { value: tHero('metrics.users.value'), label: tHero('metrics.users.label') },
    { value: tHero('metrics.years.value'), label: tHero('metrics.years.label') },
  ]

  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
      className="group grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-line bg-ink-800 shadow-lift transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* screenshot */}
      <div className="relative aspect-[16/11] lg:aspect-auto overflow-hidden bg-ink-850">
        <Image
          src={p.image}
          alt={`${title} — screenshot`}
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <StatusBadge label={statusLabel} />
      </div>

      {/* content */}
      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
        <span className="text-xs font-semibold uppercase tracking-wide text-amber">{t('featuredLabel')}</span>
        <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-paper leading-tight">{title}</h3>
        <p className="mt-4 text-paper-dim leading-relaxed">{summary}</p>

        {capabilities.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {capabilities.map((c, i) => (
              <span key={i} className="rounded-full bg-amber/10 px-3 py-1.5 text-xs font-semibold text-amber-bright">
                {c}
              </span>
            ))}
          </div>
        )}

        <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-6">
          {metrics.map((m, i) => (
            <div key={i}>
              <dd className="font-display text-xl sm:text-2xl font-bold tracking-tight text-paper">{m.value}</dd>
              <dt className="mt-1 text-[0.68rem] text-paper-faint leading-snug">{m.label}</dt>
            </div>
          ))}
        </dl>

        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-paper transition-colors group-hover:text-amber">
          {statusLabel} <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.a>
  )
}

function ProjectCard({ p, t, locale, index }) {
  const title = t(`items.${p.key}.title`)
  const summary = t(`items.${p.key}.summary`)
  const href = projectHref(p, locale)
  const external = Boolean(p.links?.live || p.links?.demo || (!p.links?.caseStudy && p.links?.github))
  const statusLabel = getStatusLabel(p, t)

  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.65, 0, 0.35, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-800 shadow-panel transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      {/* screenshot */}
      <div className="relative aspect-[16/11] overflow-hidden border-b border-line bg-ink-850">
        <Image
          src={p.image}
          alt={`${title} — screenshot`}
          fill
          sizes="(max-width: 640px) 92vw, 420px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <StatusBadge label={statusLabel} />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-paper leading-snug">{title}</h3>
          <span
            aria-hidden
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-paper-faint transition-all duration-300 group-hover:bg-amber group-hover:border-amber group-hover:text-white group-hover:rotate-45"
          >
            ↗
          </span>
        </div>
        <p className="mt-2.5 text-sm text-paper-dim leading-relaxed">{summary}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {(p.tech || []).slice(0, 3).map((tag, idx) => (
              <span key={idx} className="rounded-full border border-line bg-ink-850 px-2.5 py-1 text-[0.68rem] font-medium text-paper-faint">
                {tag}
              </span>
            ))}
          </div>
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-paper-dim transition-colors group-hover:text-amber">
            {statusLabel}
          </span>
        </div>
      </div>
    </motion.a>
  )
}

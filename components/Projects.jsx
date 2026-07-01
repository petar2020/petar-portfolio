'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { featuredProjects } from '../data/projects'
import SectionHeader from './ui/SectionHeader'

/**
 * Selected work as a friendly two-column card grid: big screenshot,
 * title, one-line summary, up to three tech chips, one clear link.
 */
export default function Projects() {
  const t = useTranslations('projects')
  const locale = useLocale()

  return (
    <section id="projects" className="relative grain bg-ink-850 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader callsign="Selected projects" title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid sm:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.key} p={p} t={t} locale={locale} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, t, locale, index }) {
  const title = t(`items.${p.key}.title`)
  const summary = t(`items.${p.key}.summary`)

  // One primary destination per card, in order of usefulness to a visitor.
  const href =
    p.links?.live ||
    p.links?.demo ||
    (p.links?.caseStudy ? `/${locale}/case-study/drivesoft` : null) ||
    p.links?.github
  const external = Boolean(p.links?.live || p.links?.demo || (!p.links?.caseStudy && p.links?.github))
  const linkLabel = p.links?.live
    ? t('viewLive')
    : p.links?.demo
      ? t('viewDemo')
      : p.links?.caseStudy
        ? t('viewCase')
        : t('viewGithub')

  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.65, 0, 0.35, 1] }}
      className="group panel flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      {/* screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-ink-850">
        <Image
          src={p.image}
          alt={`${title} — screenshot`}
          fill
          sizes="(max-width: 640px) 92vw, 520px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-paper leading-snug">{title}</h3>
          <span aria-hidden className="mt-1 text-paper-faint transition-all duration-300 group-hover:text-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
          <span className="shrink-0 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-teal-bright transition-colors group-hover:text-amber">
            {linkLabel}
          </span>
        </div>
      </div>
    </motion.a>
  )
}

'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { featuredProjects } from '../data/projects'
import SectionHeader from './ui/SectionHeader'

export default function Projects() {
  const t = useTranslations('projects')

  return (
    <section id="projects" className="relative grain bg-ink-850 py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="04" callsign="Selected projects" title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 border-t border-line">
          {featuredProjects.map((p, i) => (
            <ProjectRow key={p.key} p={p} t={t} n={String(i + 1).padStart(2, '0')} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ p, t, n }) {
  const title = t(`items.${p.key}.title`)
  const summary = t(`items.${p.key}.summary`)
  const role = t(`items.${p.key}.role`)

  // Render whichever links exist, in a sensible order, with localized labels.
  const linkDefs = [
    { key: 'live', label: t('viewLive'), external: true },
    { key: 'demo', label: t('viewDemo'), external: true },
    { key: 'caseStudy', label: t('viewCase'), external: false },
    { key: 'github', label: t('viewGithub'), external: true },
  ]
  const links = linkDefs.filter((l) => p.links?.[l.key])

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
      className="group relative border-b border-line"
    >
      {/* armed accent bar (grows on hover) */}
      <span className="absolute left-0 top-0 h-full w-px bg-amber scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" aria-hidden />

      <div className="grid md:grid-cols-12 gap-6 md:gap-8 py-8 md:py-10 transition-colors duration-300 group-hover:bg-ink-800/50 md:pl-6">
        {/* index + thumbnail */}
        <div className="md:col-span-4 flex items-start gap-4">
          <span className="font-mono text-sm font-bold text-paper-faint group-hover:text-amber transition-colors pt-1">{n}</span>
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-line">
            <Image
              src={p.image}
              alt={`${title} — screenshot`}
              fill
              sizes="(max-width: 768px) 92vw, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-ink-900/30" />
          </div>
        </div>

        {/* title + one-line summary + my role */}
        <div className="md:col-span-5">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper">{title}</h3>
          <p className="mt-3 text-paper-dim leading-relaxed">{summary}</p>
          <div className="mt-4">
            <span className="callsign !text-[0.6rem] text-teal-bright">{t('roleLabel')}</span>
            <p className="mt-1 text-sm text-paper-dim leading-relaxed">{role}</p>
          </div>
        </div>

        {/* tech + links */}
        <div className="md:col-span-3 flex flex-col gap-4 md:items-end">
          <div className="flex flex-wrap gap-1.5 md:justify-end">
            {p.tech?.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 border border-line font-mono text-[0.68rem] text-paper-faint">
                {tag}
              </span>
            ))}
          </div>
          {links.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
              {links.map((l) => (
                <a
                  key={l.key}
                  href={p.links[l.key]}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-paper hover:text-amber transition-colors"
                >
                  {l.label} <span aria-hidden>{l.external ? '↗' : '↓'}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}

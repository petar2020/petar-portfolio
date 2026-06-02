'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'
import CountUp from './ui/CountUp'

export default function CaseStudy() {
  const t = useTranslations('caseStudy')
  const architecture = t.raw('architecture')
  const scale = t.raw('scale')
  const features = t.raw('features')
  const tech = t.raw('tech')

  const rows = [
    { n: '01', label: t('problemTitle'), body: t('problem'), tone: 'danger' },
    { n: '02', label: t('solutionTitle'), body: t('solution'), tone: 'teal' },
  ]

  return (
    <section id="case-study" className="relative grain bg-ink-900 py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="03" callsign={t('eyebrow')} title={t('title')} subtitle={t('tagline')} status="amber" />

        {/* Oversized scale figures */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 border-y border-line">
          {scale.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`py-7 ${i > 0 ? 'sm:border-l border-line sm:pl-8 border-t sm:border-t-0' : ''}`}
            >
              <div className={`font-mono font-bold leading-none tracking-tight ${i === 0 ? 'text-amber' : 'text-paper'} text-5xl md:text-6xl`}>
                <CountUp value={s.value} />
              </div>
              <p className="mt-3 callsign">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Spec sheet: Problem / Solution */}
        <div className="mt-12 grid lg:grid-cols-2 gap-px bg-line border border-line">
          {rows.map((r) => (
            <SpecRow key={r.n} {...r} />
          ))}
        </div>

        {/* Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mt-px panel p-6 sm:p-8 border-x border-b border-line"
        >
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-mono text-sm font-bold text-teal-bright">03</span>
            <span className="callsign">{t('architectureTitle')}</span>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {architecture.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-paper-dim leading-relaxed">
                <span className="mt-2 h-px w-3 shrink-0 bg-teal" aria-hidden />
                <span className="text-sm">{a}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Key features + My role */}
        <div className="mt-8 grid lg:grid-cols-2 gap-px bg-line border border-line">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="bg-ink-800 p-6 sm:p-8"
          >
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-mono text-sm font-bold text-teal-bright">04</span>
              <span className="callsign">{t('featuresTitle')}</span>
            </div>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-paper-dim leading-relaxed">
                  <span className="mt-2 h-px w-3 shrink-0 bg-teal" aria-hidden />
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="bg-ink-800 p-6 sm:p-8"
          >
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-mono text-sm font-bold text-amber">05</span>
              <span className="callsign text-amber">{t('roleTitle')}</span>
            </div>
            <p className="text-paper-dim leading-relaxed">{t('role')}</p>
          </motion.div>
        </div>

        {/* Result — emphasized */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mt-8 border-l-2 border-amber pl-6"
        >
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-mono text-sm font-bold text-amber">06</span>
            <span className="callsign text-amber">{t('resultTitle')}</span>
          </div>
          <p className="max-w-3xl text-lg sm:text-xl text-paper leading-relaxed">{t('result')}</p>
        </motion.div>

        {/* Tech + CTAs */}
        <div className="mt-12">
          <p className="callsign mb-3">{t('techTitle')}</p>
          <div className="flex flex-wrap gap-2">
            {tech.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 border border-line font-mono text-xs text-paper-dim">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="https://demo.drivesoft.rs/passenger-demo" target="_blank" rel="noopener noreferrer" className="btn-signal w-full sm:w-auto">
              {t('ctaPassenger')} <span aria-hidden>→</span>
            </a>
            <a href="https://demo.drivesoft.rs/admin-demo" target="_blank" rel="noopener noreferrer" className="btn-line w-full sm:w-auto">
              {t('ctaAdmin')} <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function SpecRow({ n, label, body, tone }) {
  const labelColor = tone === 'danger' ? 'text-signal-danger' : 'text-teal-bright'
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="bg-ink-800 p-6 sm:p-8"
    >
      <div className="flex items-baseline gap-3 mb-4">
        <span className={`font-mono text-sm font-bold ${labelColor}`}>{n}</span>
        <span className="callsign">{label}</span>
      </div>
      <p className="text-paper-dim leading-relaxed">{body}</p>
    </motion.div>
  )
}

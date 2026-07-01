'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import CountUp from './ui/CountUp'

/**
 * Home-page teaser for the DriveSoft case study, rendered as a single dark
 * "island" panel — the one deliberate dark moment on an otherwise light page.
 * The full spec sheet lives on /case-study/drivesoft.
 */
export default function CaseStudy() {
  const t = useTranslations('caseStudy')
  const locale = useLocale()
  const scale = t.raw('scale')

  return (
    <section id="case-study" className="relative bg-ink-900 py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#0F211B] px-6 py-12 sm:px-12 sm:py-16 shadow-lift"
        >
          {/* interior glow */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.14), transparent 65%)' }}
            />
            <div
              className="absolute -left-24 -bottom-32 h-80 w-80 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(246,166,35,0.10), transparent 65%)' }}
            />
          </div>

          <div className="relative">
            {/* eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F6A623] animate-pulse" aria-hidden />
              <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-white/60">
                {t('eyebrow')}
              </span>
            </span>

            <h2 className="mt-5 max-w-3xl font-display font-bold tracking-tight text-white text-3xl sm:text-4xl md:text-5xl leading-[1.08]">
              {t('title')}
            </h2>
            <p className="mt-4 max-w-2xl font-serif italic text-lg sm:text-xl text-white/70 leading-relaxed">
              {t('tagline')}
            </p>

            {/* Oversized scale figures */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 border-y border-white/10">
              {scale.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`py-7 ${i > 0 ? 'sm:border-l border-white/10 sm:pl-8 border-t sm:border-t-0' : ''}`}
                >
                  <div className={`font-display font-bold leading-none tracking-tight ${i === 0 ? 'text-[#FFC24B]' : 'text-white'} text-5xl md:text-6xl`}>
                    <CountUp value={s.value} />
                  </div>
                  <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/50">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Result — the one paragraph that matters */}
            <div className="mt-12 border-l-2 border-[#F6A623] pl-6">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#FFC24B] mb-3">
                {t('resultTitle')}
              </p>
              <p className="max-w-3xl font-serif italic text-xl sm:text-2xl text-white/90 leading-relaxed">
                {t('result')}
              </p>
            </div>

            {/* CTAs — try it live or read the whole story */}
            <div className="mt-11 flex flex-col sm:flex-row gap-4">
              <a
                href="https://demo.drivesoft.rs/passenger-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-white px-7 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-[#0F211B] transition-transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                {t('ctaPassenger')} <span aria-hidden>→</span>
              </a>
              <a
                href="https://demo.drivesoft.rs/admin-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/25 px-7 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/60 w-full sm:w-auto"
              >
                {t('ctaAdmin')} <span aria-hidden>→</span>
              </a>
              <a
                href={`/${locale}/case-study/drivesoft`}
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/25 px-7 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/60 w-full sm:w-auto"
              >
                {t('ctaFullStudy')} <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

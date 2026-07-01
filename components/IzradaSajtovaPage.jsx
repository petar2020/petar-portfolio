'use client'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt } from 'react-icons/fa'
import SEO from './SEO'
import SubpageNav from './SubpageNav'

const SITE_URL = 'https://petararsic.rs'
export const IZRADA_SAJTOVA_URL = `${SITE_URL}/sr/izrada-sajtova`

/**
 * Serbian-only local SEO landing page targeting broad commercial-intent
 * queries ("izrada sajtova", "izrada sajtova Beograd", "programer za sajt").
 * No English counterpart exists, so hreflang is disabled on SEO — a
 * fabricated /en/izrada-sajtova would just be a broken cross-locale link.
 */
export default function IzradaSajtovaPage() {
  const t = useTranslations('izradaSajtovaPage')
  const tSub = useTranslations('subpage')
  const tServices = useTranslations('servicePages')

  const types = t.raw('types')
  const why = t.raw('why')
  const faq = t.raw('faq')

  const additionalSchemas = useMemo(() => {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${IZRADA_SAJTOVA_URL}#service`,
      name: t('title'),
      description: t('seo.description'),
      url: IZRADA_SAJTOVA_URL,
      provider: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Petar Arsić',
      },
      areaServed: { '@type': 'Place', name: 'Beograd, Srbija' },
      serviceType: 'Izrada sajtova i web aplikacija',
      inLanguage: 'sr',
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Petar Arsić', item: `${SITE_URL}/sr` },
        { '@type': 'ListItem', position: 2, name: t('eyebrow'), item: IZRADA_SAJTOVA_URL },
      ],
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    }

    return [serviceSchema, breadcrumbSchema, faqSchema]
  }, [faq, t])

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        url={IZRADA_SAJTOVA_URL}
        locale="sr_RS"
        alternateLocales={[]}
        isMainPage={false}
        additionalSchemas={additionalSchemas}
        hreflangDisabled
      />

      <SubpageNav backLabel={tSub('backLink')} />

      <main className="pt-20">
        {/* Hero */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-24 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-800/80 px-3.5 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" aria-hidden />
              <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-paper-faint">
                {t('eyebrow')}
              </span>
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-5 font-display font-bold tracking-tight text-paper text-3xl sm:text-4xl md:text-5xl leading-[1.08]"
            >
              {t('title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-4 max-w-3xl font-serif italic text-lg sm:text-xl text-paper-dim leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-6 max-w-3xl text-paper-dim leading-relaxed"
            >
              {t('intro')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a href={`/sr/cenovnik`} className="btn-signal">
                {t('ctaButtonPricing')} <span aria-hidden>→</span>
              </a>
              <a href={`/sr#contact`} className="btn-line">
                {t('ctaButtonContact')}
              </a>
            </motion.div>
          </div>
        </section>

        {/* Types of sites */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl">{t('typesTitle')}</h2>
            <p className="mt-3 font-serif italic text-lg text-paper-dim">{t('typesSubtitle')}</p>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {types.map((item, i) => (
                <a
                  key={i}
                  href={`/sr/services/${item.slug}`}
                  className="group panel block rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <h3 className="font-display font-semibold text-paper group-hover:text-teal-bright transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-paper-dim leading-relaxed">{item.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-teal-bright transition-all group-hover:gap-2.5 group-hover:text-amber">
                    {tServices('readMore')} <span aria-hidden>→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Why freelancer */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl">{t('whyTitle')}</h2>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {why.map((item, i) => (
                <div key={i} className="rounded-2xl border border-line bg-ink-800 p-5">
                  <h3 className="font-display font-semibold text-paper">{item.title}</h3>
                  <p className="mt-2 text-sm text-paper-dim leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local trust */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="panel rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <FaMapMarkerAlt aria-hidden className="text-lg" />
              </span>
              <div>
                <h2 className="font-display font-bold text-paper text-xl">{t('localTitle')}</h2>
                <p className="mt-3 text-paper-dim leading-relaxed">{t('localText')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl mb-8">{t('faqTitle')}</h2>
            <div className="divide-y divide-line border-y border-line">
              {faq.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="grain bg-ink-850 py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl mb-3">{t('ctaTitle')}</h2>
            <p className="font-serif italic text-lg text-paper-dim mb-8 max-w-2xl mx-auto">{t('ctaText')}</p>
            <a href={`/sr#contact`} className="btn-signal">
              {t('ctaButtonContact')} <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        <footer className="border-t border-line py-6">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="callsign text-paper-faint">&copy; {new Date().getFullYear()} Petar Arsić</p>
          </div>
        </footer>
      </main>
    </>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <h3 className="font-display font-semibold text-paper text-lg group-hover:text-teal-bright transition-colors">
          {question}
        </h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-xl font-mono text-paper-faint"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-paper-dim leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  )
}

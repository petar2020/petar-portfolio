'use client'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'
import SEO from './SEO'
import SubpageNav from './SubpageNav'

const SITE_URL = 'https://petararsic.rs'
const OG_LOCALE_MAP = { sr: 'sr_RS', en: 'en_US' }

// Localized slugs: the same page lives at /sr/cenovnik and /en/pricing.
export const PRICING_URLS = {
  sr: `${SITE_URL}/sr/cenovnik`,
  en: `${SITE_URL}/en/pricing`,
}

export default function PricingPage({ locale }) {
  const t = useTranslations('pricingPage')
  const tSub = useTranslations('subpage')

  const ogLocale = OG_LOCALE_MAP[locale] ?? 'en_US'
  const alternateLocales = Object.entries(OG_LOCALE_MAP)
    .filter(([key]) => key !== locale)
    .map(([, value]) => value)
  const canonicalUrl = PRICING_URLS[locale] ?? PRICING_URLS.en

  const packages = t.raw('packages')
  const factors = t.raw('factors')
  const process = t.raw('process')
  const faq = t.raw('faq')
  const maintenanceFeatures = t.raw('maintenanceFeatures')

  const additionalSchemas = useMemo(() => {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: t('title'),
      description: t('seo.description'),
      url: canonicalUrl,
      provider: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Petar Arsić',
      },
      areaServed: { '@type': 'Place', name: 'Serbia, Europe, Remote' },
      serviceType: 'Web development',
      inLanguage: locale,
      offers: packages.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        priceCurrency: 'EUR',
        price: p.price.replace(/[^\d]/g, ''),
        description: p.description,
      })),
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Petar Arsić', item: `${SITE_URL}/${locale}` },
        { '@type': 'ListItem', position: 2, name: t('eyebrow'), item: canonicalUrl },
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
  }, [canonicalUrl, locale, packages, faq, t])

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        url={canonicalUrl}
        locale={ogLocale}
        alternateLocales={alternateLocales}
        isMainPage={false}
        additionalSchemas={additionalSchemas}
        hrefLangUrls={PRICING_URLS}
      />

      <SubpageNav backLabel={tSub('backLink')} />

      <main className="pt-20">
        {/* Hero */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-24 relative">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
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
              className="mt-6 max-w-3xl rounded-xl border border-teal/20 bg-teal/5 p-4 text-sm text-paper-dim leading-relaxed"
            >
              {t('note')}
            </motion.p>
          </div>
        </section>

        {/* Packages */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {packages.map((p, i) => (
                <PackageCard key={i} p={p} index={i} locale={locale} />
              ))}
            </div>

            {/* Maintenance */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="mt-8 panel rounded-2xl p-6 sm:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="md:w-1/3">
                  <h2 className="font-display text-xl font-bold text-paper">{t('maintenanceTitle')}</h2>
                  <p className="mt-3">
                    <span className="text-sm text-paper-faint">{t('maintenancePriceNote')} </span>
                    <span className="font-display text-3xl font-bold text-teal-bright">{t('maintenancePrice')}</span>
                    <span className="text-sm text-paper-dim"> / {t('perMonth')}</span>
                  </p>
                </div>
                <div className="md:flex-1">
                  <p className="text-paper-dim leading-relaxed">{t('maintenanceText')}</p>
                  <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {maintenanceFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-paper-dim">
                        <FaCheck aria-hidden className="mt-1 shrink-0 text-teal" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Factors */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl">{t('factorsTitle')}</h2>
            <p className="mt-3 font-serif italic text-lg text-paper-dim">{t('factorsSubtitle')}</p>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {factors.map((f, i) => (
                <div key={i} className="rounded-2xl border border-line bg-ink-800 p-5">
                  <h3 className="font-display font-semibold text-paper">{f.title}</h3>
                  <p className="mt-2 text-sm text-paper-dim leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl">{t('processTitle')}</h2>
            <ol className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
              {process.map((s, i) => (
                <li key={i}>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 font-display text-sm font-bold text-teal-bright">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display font-semibold text-paper">{s.step}</h3>
                  <p className="mt-2 text-sm text-paper-dim leading-relaxed">{s.description}</p>
                </li>
              ))}
            </ol>

            {locale === 'sr' && (
              <p className="mt-10 text-sm text-paper-dim">
                Nisi siguran koja vrsta sajta ti treba?{' '}
                <a href={`/sr/izrada-sajtova`} className="font-semibold text-teal-bright hover:text-amber transition-colors">
                  Pogledaj vrste sajtova koje radim →
                </a>
              </p>
            )}
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
            <a href={`/${locale}#contact`} className="btn-signal">
              {t('ctaButton')} <span aria-hidden>→</span>
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

function PackageCard({ p, index, locale }) {
  const featured = Boolean(p.featured)
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`flex flex-col rounded-2xl p-6 ${
        featured
          ? 'bg-[#0F211B] text-white shadow-lift'
          : 'panel'
      }`}
    >
      <h2 className={`font-display text-lg font-bold ${featured ? 'text-white' : 'text-paper'}`}>{p.name}</h2>
      <p className={`mt-1.5 text-sm leading-relaxed ${featured ? 'text-white/70' : 'text-paper-dim'}`}>
        {p.description}
      </p>

      <p className="mt-5">
        <span className={`text-sm ${featured ? 'text-white/60' : 'text-paper-faint'}`}>{p.priceNote} </span>
        <span className={`font-display text-4xl font-bold ${featured ? 'text-[#FFC24B]' : 'text-paper'}`}>
          {p.price}
        </span>
      </p>
      <p className={`mt-1 font-mono text-xs uppercase tracking-[0.12em] ${featured ? 'text-white/50' : 'text-paper-faint'}`}>
        {p.duration}
      </p>

      <ul className="mt-5 space-y-2.5">
        {p.features.map((f, i) => (
          <li key={i} className={`flex items-start gap-2.5 text-sm leading-relaxed ${featured ? 'text-white/80' : 'text-paper-dim'}`}>
            <FaCheck aria-hidden className={`mt-1 shrink-0 ${featured ? 'text-[#FFC24B]' : 'text-teal'}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <a
          href={`/${locale}#contact`}
          className={
            featured
              ? 'inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-white px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#0F211B] transition-transform hover:-translate-y-0.5'
              : 'btn-line w-full !px-5 !py-3.5 !text-xs'
          }
        >
          {p.cta || (p.priceNote === 'od' ? 'Zatraži ponudu' : 'Request a quote')} <span aria-hidden>→</span>
        </a>
      </div>
    </motion.div>
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

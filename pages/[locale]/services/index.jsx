import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import SEO from '../../../components/SEO'
import SubpageNav from '../../../components/SubpageNav'
import { services } from '../../../data/services'

const SITE_URL = 'https://petararsic.rs'
const OG_LOCALE_MAP = { sr: 'sr_RS', en: 'en_US' }

export default function ServicesIndex({ locale }) {
  const t = useTranslations('servicesIndex')
  const tSub = useTranslations('subpage')
  const tCommon = useTranslations('servicePages')
  const currentLocale = locale

  const ogLocale = OG_LOCALE_MAP[currentLocale] ?? 'en_US'
  const alternateLocales = Object.entries(OG_LOCALE_MAP)
    .filter(([key]) => key !== currentLocale)
    .map(([, value]) => value)

  const pageUrl = `${SITE_URL}/${currentLocale}/services`
  const faqs = t.raw('faq')

  const additionalSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${pageUrl}#professionalservice`,
      name: 'Petar Arsić — Full-Stack Development Services',
      description: t('seo.description'),
      url: pageUrl,
      provider: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Petar Arsić',
      },
      areaServed: {
        '@type': 'Place',
        name: 'Serbia, Europe, Remote',
      },
      serviceType: t('professionalServiceType'),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Development Services',
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: tCommon(`services.${service.slug}.title`),
            url: `${SITE_URL}/${currentLocale}/services/${service.slug}`,
          },
          position: index + 1,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: tCommon('breadcrumbHome'),
          item: `${SITE_URL}/${currentLocale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: tCommon('breadcrumbServices'),
          item: pageUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        url={pageUrl}
        locale={ogLocale}
        alternateLocales={alternateLocales}
        isMainPage={false}
        type="website"
        additionalSchemas={additionalSchemas}
        hrefLangPath="/services"
      />

      <SubpageNav backLabel={tSub('backLink')} />

      <main className="pt-20">
        {/* Hero */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-24 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-bright animate-pulse" />
              <span className="callsign">{t('heroCallsign')}</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold tracking-tight text-paper text-3xl sm:text-4xl md:text-5xl leading-[1.08]"
            >
              {t('title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-4 text-lg text-paper-dim leading-relaxed max-w-3xl"
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  locale={currentLocale}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl mb-3">{t('ctaTitle')}</h2>
            <p className="text-paper-dim mb-8 max-w-2xl mx-auto">{t('ctaDescription')}</p>
            <a href={`/${currentLocale}#contact`} className="btn-signal">
              {t('ctaButton')} <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl mb-8">{t('faqTitle')}</h2>
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
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

function ServiceCard({ service, locale, index }) {
  const t = useTranslations(`servicePages.services.${service.slug}`)
  const tCommon = useTranslations('servicePages')

  return (
    <motion.a
      href={`/${locale}/services/${service.slug}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group block bg-ink-800 p-6 transition-colors hover:bg-ink-700"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-deep group-hover:bg-teal-bright transition-colors" />
        <span className="font-mono text-xs font-bold text-paper-faint group-hover:text-amber transition-colors">
          {service.code}
        </span>
      </div>
      <h3 className="font-display text-lg font-bold text-paper group-hover:text-teal-bright transition-colors mb-2">
        {t('title')}
      </h3>
      <p className="text-sm text-paper-dim leading-relaxed mb-4">{t('shortDescription')}</p>
      <div className="flex flex-wrap gap-1.5">
        {service.tech.slice(0, 4).map((tag, i) => (
          <span key={i} className="px-2 py-0.5 border border-line font-mono text-[0.65rem] text-paper-faint">
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-teal-bright group-hover:text-amber transition-colors">
        {tCommon('readMore')} <span aria-hidden>→</span>
      </span>
    </motion.a>
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
        <p className="pb-5 text-paper-dim leading-relaxed whitespace-pre-line">{answer}</p>
      </motion.div>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: 'sr' } }, { params: { locale: 'en' } }],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const locale = params?.locale === 'sr' ? 'sr' : 'en'
  const messages = (await import(`../../../messages/${locale}.json`)).default
  return { props: { locale, messages } }
}

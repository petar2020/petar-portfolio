'use client'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import SEO from './SEO'
import SubpageNav from './SubpageNav'
import Footer from './Footer'
import { projects } from '../data/projects'
import { getServiceBySlug } from '../data/services'

const SITE_URL = 'https://petararsic.rs'
const OG_LOCALE_MAP = { sr: 'sr_RS', en: 'en_US' }

export default function ServicePageTemplate({ slug, locale }) {
  const t = useTranslations('servicePages')
  const tSub = useTranslations('subpage')
  const tProjects = useTranslations('projects')
  const service = t.raw(`services.${slug}`)

  const currentLocale = locale
  const ogLocale = OG_LOCALE_MAP[currentLocale] ?? 'en_US'
  const alternateLocales = Object.entries(OG_LOCALE_MAP)
    .filter(([key]) => key !== currentLocale)
    .map(([, value]) => value)

  const serviceUrl = `${SITE_URL}/${currentLocale}/services/${slug}`
  const canonicalUrl = serviceUrl

  const relevant = useMemo(() => {
    const keys = service.relevantProjects || []
    return projects.filter((p) => keys.includes(p.key))
  }, [service.relevantProjects])

  const faqs = useMemo(() => service.faq || [], [service.faq])
  const features = useMemo(() => service.features || [], [service.features])
  const tech = useMemo(() => service.tech || [], [service.tech])
  const built = useMemo(() => service.built || [], [service.built])
  const whoFor = useMemo(() => service.whoFor || [], [service.whoFor])

  const relatedServices = useMemo(() => {
    const relatedSlugs = getServiceBySlug(slug)?.relatedServices || []
    return relatedSlugs
      .map((relatedSlug) => getServiceBySlug(relatedSlug))
      .filter(Boolean)
  }, [slug])

  const additionalSchemas = useMemo(() => {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${serviceUrl}#service`,
      name: service.title,
      description: service.seo?.description || service.subtitle,
      url: serviceUrl,
      provider: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Petar Arsić',
        jobTitle: 'Full-Stack Laravel Developer',
        url: SITE_URL,
      },
      areaServed: {
        '@type': 'Place',
        name: 'Serbia, Europe, Remote',
      },
      serviceType: service.serviceType || 'Web Development',
      inLanguage: currentLocale,
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('breadcrumbHome'),
          item: `${SITE_URL}/${currentLocale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: t('breadcrumbServices'),
          item: `${SITE_URL}/${currentLocale}/services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.title,
          item: serviceUrl,
        },
      ],
    }

    const schemas = [serviceSchema, breadcrumbSchema]

    if (faqs.length > 0) {
      schemas.push({
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
      })
    }

    return schemas
  }, [service, serviceUrl, currentLocale, faqs, t])

  return (
    <>
      <SEO
        title={service.seo?.title || service.title}
        description={service.seo?.description || service.subtitle}
        url={canonicalUrl}
        locale={ogLocale}
        alternateLocales={alternateLocales}
        isMainPage={false}
        type="website"
        additionalSchemas={additionalSchemas}
        hrefLangPath={`/services/${slug}`}
      />

      <SubpageNav backLabel={tSub('backLink')} />

      <main className="pt-20">
        {/* Hero */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-24 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-bright animate-pulse" />
              <span className="callsign">
                {service.code} — {t('heroCallsign')}
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold tracking-tight text-paper text-3xl sm:text-4xl md:text-5xl leading-[1.08]"
            >
              {service.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-4 text-lg text-paper-dim leading-relaxed max-w-3xl"
            >
              {service.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a href={`/${currentLocale}#contact`} className="btn-signal">
                {t('heroCta')} <span aria-hidden>→</span>
              </a>
              <a href={`/${currentLocale}/services`} className="btn-line">
                {t('allServicesCta')}
              </a>
            </motion.div>
          </div>
        </section>

        {/* Who this is for */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl mb-6">{t('whoForTitle')}</h2>
            <p className="text-paper-dim leading-relaxed mb-8">{service.whoForIntro}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {whoFor.map((item, i) => (
                <div key={i} className="rounded-2xl border border-line bg-ink-800 shadow-panel p-6">
                  <h3 className="font-display font-semibold text-paper mb-2">{item.title}</h3>
                  <p className="text-sm text-paper-dim leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What can be built */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl mb-6">{t('whatBuildTitle')}</h2>
            <p className="text-paper-dim leading-relaxed mb-8">{service.whatBuildIntro}</p>
            <div className="space-y-4">
              {built.map((item, i) => (
                <div key={i} className="rounded-2xl border border-line bg-ink-800 shadow-panel p-6">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-bold text-amber mt-1">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-display font-semibold text-paper mb-1">{item.title}</h3>
                      <p className="text-sm text-paper-dim leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typical features */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl mb-6">{t('featuresTitle')}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-line bg-ink-800 p-4">
                  <span className="h-1.5 w-1.5 mt-2 rounded-full bg-amber shrink-0" aria-hidden />
                  <span className="text-sm text-paper-dim leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl mb-6">{t('techTitle')}</h2>
            <p className="text-paper-dim leading-relaxed mb-6">{service.techIntro}</p>
            <div className="flex flex-wrap gap-2">
              {tech.map((tag, i) => (
                <span key={i} className="rounded-full px-3 py-1.5 border border-line font-mono text-xs text-paper-faint bg-ink-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Relevant Projects */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl mb-8">{t('projectsTitle')}</h2>
            {relevant.length > 0 ? (
              <div className="space-y-4">
                {relevant.map((project) => (
                  <div key={project.key} className="rounded-2xl border border-line bg-ink-800 shadow-panel p-6">
                    <h3 className="font-display font-semibold text-paper mb-2">
                      {tProjects(`items.${project.key}.title`)}
                    </h3>
                    <p className="text-sm text-paper-dim leading-relaxed mb-3">
                      {tProjects(`items.${project.key}.summary`)}
                    </p>
                    <p className="text-sm text-paper-faint mb-3">
                      <span className="callsign !text-[0.6rem]">{tProjects('roleLabel')}</span>{' '}
                      {tProjects(`items.${project.key}.role`)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tag, i) => (
                        <span key={i} className="rounded-full px-2 py-0.5 border border-line font-mono text-[0.68rem] text-paper-faint">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 font-mono text-xs text-teal-bright hover:text-amber transition-colors"
                      >
                        {tProjects('viewLive')} <span aria-hidden>→</span>
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 font-mono text-xs text-teal-bright hover:text-amber transition-colors"
                      >
                        {tProjects('viewDemo')} <span aria-hidden>→</span>
                      </a>
                    )}
                    {project.links.caseStudy && (
                      <a
                        href={`/${currentLocale}/case-study/drivesoft`}
                        className="inline-block mt-4 font-mono text-xs text-teal-bright hover:text-amber transition-colors"
                      >
                        {tProjects('viewCase')} <span aria-hidden>→</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-paper-dim">{t('noProjects')}</p>
            )}
          </div>
        </section>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20 relative">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
              <h2 className="font-display font-bold text-paper text-2xl mb-8">{t('relatedServicesTitle')}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedServices.map((related) => (
                  <RelatedServiceCard key={related.slug} related={related} locale={currentLocale} t={t} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20 relative">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
              <h2 className="font-display font-bold text-paper text-2xl mb-8">{t('faqTitle')}</h2>
              <div className="divide-y divide-line border-y border-line">
                {faqs.map((item, i) => (
                  <FAQItem key={i} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="grain bg-ink-850 py-16 sm:py-20 relative">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl mb-3">{t('ctaTitle')}</h2>
            <p className="text-paper-dim mb-8 max-w-2xl mx-auto">{service.ctaDescription || t('ctaDescription')}</p>
            <a href={`/${currentLocale}#contact`} className="btn-signal">
              {t('ctaButton')} <span aria-hidden>→</span>
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export function RelatedServiceCard({ related, locale, t }) {
  return (
    <a
      href={`/${locale}/services/${related.slug}`}
      className="group block rounded-2xl border border-line bg-ink-800 shadow-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-deep group-hover:bg-teal-bright transition-colors" />
        <span className="font-mono text-xs font-bold text-paper-faint group-hover:text-amber transition-colors">
          {related.code}
        </span>
      </div>
      <h3 className="font-display text-base font-bold text-paper group-hover:text-teal-bright transition-colors mb-2">
        {t(`services.${related.slug}.title`)}
      </h3>
      <p className="text-sm text-paper-dim leading-relaxed mb-3">
        {t(`services.${related.slug}.shortDescription`)}
      </p>
      <span className="inline-flex items-center gap-1 font-mono text-xs text-teal-bright group-hover:text-amber transition-colors">
        {t('readMore')} <span aria-hidden>→</span>
      </span>
    </a>
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

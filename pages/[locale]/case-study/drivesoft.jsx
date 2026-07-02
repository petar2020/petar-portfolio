import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import SEO from '../../../components/SEO'
import SubpageNav from '../../../components/SubpageNav'
import Footer from '../../../components/Footer'
import { RelatedServiceCard } from '../../../components/ServicePageTemplate'
import { getServiceBySlug } from '../../../data/services'

const SITE_URL = 'https://petararsic.rs'
const OG_LOCALE_MAP = { sr: 'sr_RS', en: 'en_US' }
const CASE_STUDY_RELATED_SERVICES = ['booking-systems', 'admin-panels-dashboards', 'laravel-applications']

export default function CaseStudyDriveSoft({ locale }) {
  const t = useTranslations('caseStudyPage')
  const tSub = useTranslations('subpage')
  const tCS = useTranslations('caseStudy')
  const tCommon = useTranslations('servicePages')
  const router = useRouter()
  const currentLocale = locale ?? router.query?.locale ?? 'en'

  const layers = t.raw('layers')
  const steps = t.raw('bookingFlowSteps')
  const features = t.raw('featuresList')
  const tech = tCS.raw('tech')

  const ogLocale = OG_LOCALE_MAP[currentLocale] ?? 'en_US'
  const alternateLocales = Object.entries(OG_LOCALE_MAP)
    .filter(([key]) => key !== currentLocale)
    .map(([, value]) => value)

  const relatedServices = CASE_STUDY_RELATED_SERVICES.map((slug) => getServiceBySlug(slug)).filter(Boolean)

  const pageUrl = `${SITE_URL}/${currentLocale}/case-study/drivesoft`
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tCommon('breadcrumbHome'), item: `${SITE_URL}/${currentLocale}` },
      { '@type': 'ListItem', position: 2, name: tCS('title'), item: pageUrl },
    ],
  }

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        url={pageUrl}
        locale={ogLocale}
        alternateLocales={alternateLocales}
        isMainPage={false}
        hrefLangPath="/case-study/drivesoft"
        additionalSchemas={[breadcrumbSchema]}
      />

      <SubpageNav backLabel={tSub('backLink')} />

      <main className="pt-20">
        {/* Hero */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
              <span className="callsign">{tCS('eyebrow')}</span>
            </div>
            <h1 className="font-display font-bold tracking-tight text-paper text-3xl sm:text-4xl md:text-5xl leading-[1.08]">
              {tCS('title')}
            </h1>
            <p className="mt-4 text-lg text-paper-dim leading-relaxed max-w-3xl">
              {t('overview')}
            </p>

            {/* Scale figures */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 border-y border-line">
              {tCS.raw('scale').map((s, i) => (
                <div key={i} className={`py-6 ${i > 0 ? 'sm:border-l border-line sm:pl-8 border-t sm:border-t-0' : ''}`}>
                  <div className={`font-mono font-bold text-4xl md:text-5xl ${i === 0 ? 'text-amber' : 'text-paper'}`}>
                    {s.value}
                  </div>
                  <p className="mt-2 callsign">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-sm font-bold text-signal-danger">01</span>
              <h2 className="callsign">{t('challengeTitle')}</h2>
            </div>
            <p className="text-paper-dim leading-relaxed mb-6">{t('challengeIntro')}</p>
            <ul className="space-y-3 mb-6">
              {t.raw('challengePoints').map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-paper-dim leading-relaxed">
                  <span className="mt-2 h-px w-4 shrink-0 bg-signal-danger" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-paper leading-relaxed">{t('challengeConclusion')}</p>
          </div>
        </section>

        {/* Solution */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-sm font-bold text-teal-bright">02</span>
              <h2 className="callsign">{t('solutionTitle')}</h2>
            </div>
            <p className="text-paper-dim leading-relaxed">{t('solution')}</p>
          </div>
        </section>

        {/* Architecture */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-sm font-bold text-teal-bright">03</span>
              <h2 className="callsign">{t('architectureTitle')}</h2>
            </div>
            <p className="text-paper-dim leading-relaxed mb-8">{t('architectureIntro')}</p>

            <div className="space-y-4">
              {layers.map((layer, i) => (
                <div key={i} className="rounded-2xl border border-line bg-ink-800 shadow-panel p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs font-bold text-amber">{layer.code}</span>
                    <h3 className="font-display font-semibold text-paper">{layer.title}</h3>
                  </div>
                  <p className="text-sm text-paper-dim leading-relaxed">{layer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Flow */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono text-sm font-bold text-teal-bright">04</span>
              <h2 className="callsign">{t('bookingFlowTitle')}</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps.map((s, i) => (
                <div key={i} className="rounded-2xl border border-line bg-ink-800 shadow-panel p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-amber">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display font-semibold text-paper text-sm">{s.step}</h3>
                  </div>
                  <p className="text-sm text-paper-dim leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono text-sm font-bold text-teal-bright">05</span>
              <h2 className="callsign">{t('featuresTitle')}</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="border-l-2 border-teal-deep pl-5">
                  <h3 className="font-display font-semibold text-paper mb-2">{f.title}</h3>
                  <p className="text-sm text-paper-dim leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Role + Impact */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-sm font-bold text-amber">06</span>
                  <h2 className="callsign text-amber">{t('roleTitle')}</h2>
                </div>
                <p className="text-paper-dim leading-relaxed">{t('role')}</p>
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-sm font-bold text-amber">07</span>
                  <h2 className="callsign text-amber">{t('impactTitle')}</h2>
                </div>
                <p className="text-paper-dim leading-relaxed">{t('impact')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="grain bg-ink-850 border-b border-line py-12">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="callsign mb-4">{tCS('techTitle')}</p>
            <div className="flex flex-wrap gap-2">
              {tech.map((tag, i) => (
                <span key={i} className="rounded-full px-3 py-1.5 border border-line font-mono text-xs text-paper-dim">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-mono text-sm font-bold text-teal-bright">08</span>
                <h2 className="callsign">{tCommon('relatedServicesTitle')}</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedServices.map((related) => (
                  <RelatedServiceCard key={related.slug} related={related} locale={currentLocale} t={tCommon} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Demo CTA */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl mb-3">{t('demoTitle')}</h2>
            <p className="text-paper-dim mb-8 max-w-2xl mx-auto">{t('demoDescription')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://demo.drivesoft.rs/passenger-demo" target="_blank" rel="noopener noreferrer" className="btn-signal">
                {t('ctaPassenger')} <span aria-hidden>→</span>
              </a>
              <a href="https://demo.drivesoft.rs/admin-demo" target="_blank" rel="noopener noreferrer" className="btn-line">
                {t('ctaAdmin')} <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="grain bg-ink-900 py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl mb-3">{t('ctaTitle')}</h2>
            <p className="text-paper-dim mb-8">{t('ctaDescription')}</p>
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

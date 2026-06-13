import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import SEO from '../../../components/SEO'
import SubpageNav from '../../../components/SubpageNav'
import { projects } from '../../../data/projects'

const SITE_URL = 'https://petararsic.rs'
const OG_LOCALE_MAP = { sr: 'sr_RS', en: 'en_US' }

const RELEVANT_KEYS = ['drivesoft-backoffice', 'sti-web', 'bozic-konig']

export default function LaravelBackendService({ locale }) {
  const t = useTranslations('laravelService')
  const tSub = useTranslations('subpage')
  const tProjects = useTranslations('projects')
  const router = useRouter()
  const currentLocale = locale ?? router.query?.locale ?? 'en'

  const process = t.raw('process')
  const relevant = projects.filter((p) => RELEVANT_KEYS.includes(p.key))

  const ogLocale = OG_LOCALE_MAP[currentLocale] ?? 'en_US'
  const alternateLocales = Object.entries(OG_LOCALE_MAP)
    .filter(([key]) => key !== currentLocale)
    .map(([, value]) => value)

  return (
    <>
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        url={`${SITE_URL}/${currentLocale}/services/laravel-backend`}
        locale={ogLocale}
        alternateLocales={alternateLocales}
        isMainPage={false}
      />

      <SubpageNav backLabel={tSub('backLink')} />

      <main className="pt-20">
        {/* Hero */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-bright animate-pulse" />
              <span className="callsign">LAR — Service</span>
            </div>
            <h1 className="font-display font-bold tracking-tight text-paper text-3xl sm:text-4xl md:text-5xl leading-[1.08]">
              {t('title')}
            </h1>
            <p className="mt-4 text-lg text-paper-dim leading-relaxed max-w-3xl">
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* What I Build */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-bold text-paper text-2xl mb-6">{t('whatTitle')}</h2>
            <p className="text-paper-dim leading-relaxed">{t('what')}</p>
          </div>
        </section>

        {/* Process */}
        <section className="grain bg-ink-900 border-b border-line py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-bold text-paper text-2xl mb-8">{t('processTitle')}</h2>
            <div className="grid sm:grid-cols-2 gap-px bg-line border border-line">
              {process.map((item, i) => (
                <div key={i} className="bg-ink-800 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-teal-bright">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display font-semibold text-paper">{item.title}</h3>
                  </div>
                  <p className="text-sm text-paper-dim leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Relevant Projects */}
        <section className="grain bg-ink-850 border-b border-line py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-bold text-paper text-2xl mb-8">{t('projectsTitle')}</h2>
            <div className="space-y-px">
              {relevant.map((project) => (
                <div key={project.key} className="bg-ink-800 border border-line p-6">
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
                      <span key={i} className="px-2 py-0.5 border border-line font-mono text-[0.68rem] text-paper-faint">{tag}</span>
                    ))}
                  </div>
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 font-mono text-xs text-teal-bright hover:text-amber transition-colors">
                      {tProjects('viewLive')} <span aria-hidden>→</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="grain bg-ink-900 py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-paper text-2xl sm:text-3xl mb-3">{t('ctaTitle')}</h2>
            <p className="text-paper-dim mb-8">{t('ctaDescription')}</p>
            <a href={`/${currentLocale}#contact`} className="btn-signal">
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

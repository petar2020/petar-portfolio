// pages/[locale]/index.jsx
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { services } from '../../data/services'
import SEO from '../../components/SEO'
import Nav from '../../components/Nav'
import Hero from '../../components/Hero'
import LiveDemo from '../../components/LiveDemo'
import CaseStudy from '../../components/CaseStudy'
import HowIWork from '../../components/HowIWork'
import AboutMe from '../../components/AboutMe'
import Projects from '../../components/Projects'
import HomeServices from '../../components/HomeServices'
import ClientLogos from '../../components/ClientLogos'
import ParallaxCVTimeline from '../../components/ParallaxCVTimeline'
import Contact from '../../components/Contact'
import FAQ from '../../components/FAQ'
import Analytics, { PlausibleScript } from '../../components/Analytics'

// Client-only
const Backdrop         = dynamic(() => import('../../components/Backdrop'), { ssr: false })
const ServicesAnimated = dynamic(() => import('../../components/ServicesAnimated'))

const SITE_URL = 'https://petararsic.rs'
const OG_LOCALE_MAP = {
  sr: 'sr_RS',
  en: 'en_US',
}

export default function LocaleHome({ locale }) {
  const tSeo = useTranslations('seo')
  const tServices = useTranslations('servicePages')
  const router = useRouter()
  const currentLocale = locale ?? router.query?.locale ?? 'en'

  const seoConfig = useMemo(() => {
    const normalizedPath = router?.asPath?.split('#')[0]?.split('?')[0] ?? `/${currentLocale}`
    const canonicalUrl = `${SITE_URL}${normalizedPath}`
    const ogLocale = OG_LOCALE_MAP[currentLocale] ?? 'en_US'
    const alternateLocales = Object.entries(OG_LOCALE_MAP)
      .filter(([key]) => key !== currentLocale)
      .map(([, value]) => value)

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${canonicalUrl}#professionalservice`,
      name: 'Petar Arsić — Full-Stack Development Services',
      description: tSeo('description'),
      url: canonicalUrl,
      provider: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Petar Arsić',
      },
      areaServed: {
        '@type': 'Place',
        name: 'Serbia, Europe, Remote',
      },
      serviceType: 'Custom web applications, Laravel development, WordPress websites, booking systems, tourism portals, admin panels',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Development Services',
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: tServices(`services.${service.slug}.title`),
            url: `${SITE_URL}/${currentLocale}/services/${service.slug}`,
          },
          position: index + 1,
        })),
      },
    }

    return {
      title: tSeo('title'),
      description: tSeo('description'),
      url: canonicalUrl,
      locale: ogLocale,
      alternateLocales,
      additionalSchemas: [serviceSchema],
      hrefLangPath: '',
    }
  }, [currentLocale, router?.asPath, tSeo, tServices])

  return (
    <>
      <SEO {...seoConfig} />
      <PlausibleScript />
      <Analytics />

      <div className="relative">
        <Backdrop />
        <Nav />
        <Hero />
        <LiveDemo />
        <CaseStudy />
        <Projects />
        <HomeServices />
        <ServicesAnimated />
        <HowIWork />
        <AboutMe />
        <FAQ />
        <ClientLogos />
        <ParallaxCVTimeline />
        <Contact />
      </div>
    </>
  )
}

// Prebuild rute za sr/en
export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: 'sr' } }, { params: { locale: 'en' } }],
    fallback: false,
  }
}

// Učitavanje prevoda
export async function getStaticProps({ params }) {
  const locale = params?.locale === 'sr' ? 'sr' : 'en'
  const messages = (await import(`../../messages/${locale}.json`)).default

  return {
    props: { locale, messages },
    // po želji: revalidate: 60
  }
}

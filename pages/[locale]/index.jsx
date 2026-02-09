// pages/[locale]/index.jsx
import dynamic from 'next/dynamic'
import SEO from '../../components/SEO'
import Nav from '../../components/Nav'
import Hero from '../../components/Hero'
import AboutMe from '../../components/AboutMe'
import Projects from '../../components/Projects'
import Testimonials from '../../components/Testimonials'
import ClientLogos from '../../components/ClientLogos'
import ParallaxCVTimeline from '../../components/ParallaxCVTimeline'
import Contact from '../../components/Contact'
import Services from '../../components/Services'
import Analytics, { PlausibleScript } from '../../components/Analytics'
import { featuredProjects } from '../../data/projects'

// Client-only
const ParallaxBackground = dynamic(() => import('../../components/ParallaxBackground'), { ssr: false })

const SEO_BY_LOCALE = {
  en: {
    title: 'Booking Platforms and Web Apps | Petar Arsic',
    description:
      'Premium full-stack portfolio focused on booking systems, conversion-first web apps, and scalable product delivery.',
    heroImage: '/og-hero-en.svg'
  },
  sr: {
    title: 'Booking platforme i web aplikacije | Petar Arsic',
    description:
      'Premium full-stack portfolio sa fokusom na booking sisteme, konverzijski UX i skalabilnu isporuku proizvoda.',
    heroImage: '/og-hero-sr.svg'
  }
}

export default function LocaleHome({ locale = 'sr' }) {
  const currentLocale = locale === 'en' ? 'en' : 'sr'
  const seo = SEO_BY_LOCALE[currentLocale]
  const projectImages = featuredProjects.slice(0, 4).map((project) => project.image)

  return (
    <>
      <SEO
        locale={currentLocale}
        path={`/${currentLocale}`}
        title={seo.title}
        description={seo.description}
        heroImage={seo.heroImage}
        projectImages={projectImages}
      />
      <PlausibleScript />
      <Analytics />

      <div className="relative">
        <ParallaxBackground />
        <Nav />
        <Hero />
        <AboutMe />
        <Services />
        <ClientLogos />
        <Projects />
        <Testimonials />
        <Contact />
        <ParallaxCVTimeline />
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
  const locale = params?.locale === 'en' ? 'en' : 'sr'
  const messages = (await import(`../../messages/${locale}.json`)).default

  return {
    props: { locale, messages },
    // po želji: revalidate: 60
  }
}

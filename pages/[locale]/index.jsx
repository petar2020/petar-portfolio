// pages/[locale]/index.jsx
import dynamic from 'next/dynamic'
import SEO from '../../components/SEO'
import Nav from '../../components/Nav'
import Hero from '../../components/Hero'
import AboutMe from '../../components/AboutMe'
import Projects from '../../components/Projects'
import ClientLogos from '../../components/ClientLogos'
import ParallaxCVTimeline from '../../components/ParallaxCVTimeline'
import Contact from '../../components/Contact'
import Analytics, { PlausibleScript } from '../../components/Analytics'

// Client-only komponente
const ParallaxBackground = dynamic(
  () => import('../../components/ParallaxBackground'),
  { ssr: false }
)
// Ako koristiš animiranu verziju servisa, zadrži je i ukloni statičnu:
const ServicesAnimated = dynamic(
  () => import('../../components/ServicesAnimated'),
  { ssr: false }
)

export default function LocaleHome() {
  return (
    <>
      <SEO />
      <PlausibleScript />
      <Analytics />

      <div className="relative">
        {/* 1) Parallax slojevi (client-only) */}
        <ParallaxBackground />

        {/* 2) Sekcije sajta */}
        <Nav />
        <Hero />
        <AboutMe />
        <ServicesAnimated />  {/* ili <Services /> ako koristiš statičnu varijantu */}
        <Projects />
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
    paths: [
      { params: { locale: 'sr' } },
      { params: { locale: 'en' } }
    ],
    fallback: false
  }
}

// Učitavanje prevoda za dati locale
export async function getStaticProps({ params }) {
  const locale = params?.locale === 'en' ? 'en' : 'sr'
  const messages = (await import(`../../messages/${locale}.json`)).default

  return {
    props: {
      locale,
      messages
    }
    // po želji: revalidate: 60
  }
}

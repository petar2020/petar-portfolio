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

// Client-only
const ParallaxBackground = dynamic(() => import('../../components/ParallaxBackground'), { ssr: false })
const ServicesAnimated   = dynamic(() => import('../../components/ServicesAnimated'), { ssr: false })

export default function LocaleHome() {
  return (
    <>
      <SEO />
      <PlausibleScript />
      <Analytics />

      <div className="relative">
        <ParallaxBackground />
        <Nav />
        <Hero />
        <AboutMe />
        <ServicesAnimated />
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

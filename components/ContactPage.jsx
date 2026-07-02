'use client'
import { useTranslations } from 'next-intl'
import SEO from './SEO'
import SubpageNav from './SubpageNav'
import Footer from './Footer'
import Contact from './Contact'

const SITE_URL = 'https://petararsic.rs'
const OG_LOCALE_MAP = { sr: 'sr_RS', en: 'en_US' }

// Localized slugs: the same page lives at /sr/kontakt and /en/contact.
export const CONTACT_URLS = {
  sr: `${SITE_URL}/sr/kontakt`,
  en: `${SITE_URL}/en/contact`,
}

export default function ContactPage({ locale }) {
  const tPage = useTranslations('contactPage')
  const tSub = useTranslations('subpage')

  const ogLocale = OG_LOCALE_MAP[locale] ?? 'en_US'
  const alternateLocales = Object.entries(OG_LOCALE_MAP)
    .filter(([key]) => key !== locale)
    .map(([, value]) => value)
  const canonicalUrl = CONTACT_URLS[locale] ?? CONTACT_URLS.en

  return (
    <>
      <SEO
        title={tPage('seo.title')}
        description={tPage('seo.description')}
        url={canonicalUrl}
        locale={ogLocale}
        alternateLocales={alternateLocales}
        isMainPage={false}
        hrefLangUrls={CONTACT_URLS}
      />

      <SubpageNav backLabel={tSub('backLink')} />

      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  )
}

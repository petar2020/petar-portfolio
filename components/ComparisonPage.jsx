import Link from 'next/link'
import { useTranslations } from 'next-intl'
import SEO from './SEO'
import SubpageNav from './SubpageNav'
import Footer from './Footer'
import RelatedPages from './RelatedPages'
import { ContentSection, Paragraphs, ContentTable, ContentFAQ, SITE_URL, breadcrumbSchema, faqSchema } from './ContentSections'
import { comparisons, CONTENT_DATE } from '../data/comparisons'
import { resolvePricingCopy } from '../data/contentPricing'

const PRICING_PATH = { sr: '/sr/cenovnik', en: '/en/pricing' }
const CONTACT_PATH = { sr: '/sr/kontakt', en: '/en/contact' }
const OG_LOCALE = { sr: 'sr_RS', en: 'en_US' }
const UPDATED_LABEL = { sr: '23. 9. 2026.', en: '23 September 2026' }

export default function ComparisonPage({ id, locale }) {
  const t = useTranslations()
  const pricing = t.raw('pricingPage')
  const meta = comparisons.find((item) => item.id === id)
  const slug = meta.slugs[locale]
  const altLocale = locale === 'sr' ? 'en' : 'sr'
  const page = resolvePricingCopy(t.raw(`comparisonPages.${slug}`), pricing)
  const ui = t.raw('contentPages')
  const url = `${SITE_URL}/${locale}/${slug}`
  const contactPath = CONTACT_PATH[locale]
  const pricingPath = PRICING_PATH[locale]
  const person = { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Petar Arsić', url: SITE_URL }
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'Article', '@id': `${url}#article`, headline: page.title, description: page.seo.description, url, mainEntityOfPage: url, inLanguage: locale, author: person, publisher: person, datePublished: CONTENT_DATE, dateModified: CONTENT_DATE, image: `${SITE_URL}/og-image.png` },
    breadcrumbSchema(page.title, url, locale), faqSchema(page.faq),
  ]
  return <>
    <SEO
      title={page.seo.title}
      description={page.seo.description}
      url={url}
      locale={OG_LOCALE[locale]}
      alternateLocales={[OG_LOCALE[altLocale]]}
      type="article"
      isMainPage={false}
      hrefLangUrls={{ [locale]: url, [altLocale]: `${SITE_URL}/${altLocale}/${meta.slugs[altLocale]}` }}
      additionalSchemas={schemas}
    />
    <SubpageNav backLabel={t('subpage.backLink')} />
    <main className="pt-20 break-words"><article>
      <ContentSection>
        <p className="callsign">{ui.guideLabel}</p>
        <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-paper sm:text-4xl md:text-5xl">{page.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-paper-dim">{page.intro}</p>
        <p className="mt-5 text-sm text-paper-dim">{ui.author}: <Link href={`/${locale}`} rel="author" className="text-teal-bright underline">Petar Arsić</Link> · {ui.updated}: <time dateTime={CONTENT_DATE}>{UPDATED_LABEL[locale]}</time></p>
      </ContentSection>
      <ContentSection title={page.table.title} raised>
        <ContentTable caption={page.table.title} headers={page.table.headers} rows={page.table.rows} />
        <p className="mt-5 leading-relaxed text-paper-dim">{page.table.note}</p>
      </ContentSection>
      {page.sections.map((section, i) => <ContentSection key={section.title} title={section.title} raised={i % 2 === 1}><Paragraphs items={section.paragraphs} />{section.links && <ul className="mt-5 space-y-2">{section.links.map((link) => <li key={link.href}><a className="font-semibold text-teal-bright underline underline-offset-4" href={link.href}>{link.label}</a></li>)}</ul>}</ContentSection>)}
      <ContentSection title={page.faqTitle} raised><ContentFAQ items={page.faq} /></ContentSection>
      <ContentSection><RelatedPages ids={meta.relatedPages} locale={locale} title={ui.relatedTitle} /><Link href={pricingPath} className="mt-6 inline-block font-semibold text-teal-bright underline underline-offset-4">{ui.pricingLink}</Link></ContentSection>
      <ContentSection title={page.cta.title} raised><p className="mb-6 leading-relaxed text-paper-dim">{page.cta.text}</p><Link href={contactPath} className="btn-signal">{ui.contact}</Link></ContentSection>
    </article></main><Footer />
  </>
}

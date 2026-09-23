import Link from 'next/link'
import { useTranslations } from 'next-intl'
import SEO from './SEO'
import SubpageNav from './SubpageNav'
import Footer from './Footer'
import RelatedPages from './RelatedPages'
import { ContentSection, Paragraphs, ContentFAQ, ContentTable, SITE_URL, faqSchema, breadcrumbSchema } from './ContentSections'
import { industries } from '../data/industries'
import { projects } from '../data/projects'
import { resolvePricingCopy } from '../data/contentPricing'

const PRICING_PATH = { sr: '/sr/cenovnik', en: '/en/pricing' }
const CONTACT_PATH = { sr: '/sr/kontakt', en: '/en/contact' }
const AREA_LABEL = { sr: 'Srbija', en: 'Serbia' }
const OG_LOCALE = { sr: 'sr_RS', en: 'en_US' }

export default function IndustryPage({ id, locale }) {
  const t = useTranslations()
  const meta = industries.find((item) => item.id === id)
  const slug = meta.slugs[locale]
  const altLocale = locale === 'sr' ? 'en' : 'sr'
  const pricing = t.raw('pricingPage')
  const page = resolvePricingCopy(t.raw(`industryPages.${slug}`), pricing)
  const ui = resolvePricingCopy(t.raw('contentPages'), pricing)
  const packages = meta.packageIndexes.map((index) => pricing.packages[index])
  const url = `${SITE_URL}/${locale}/${slug}`
  const contactPath = CONTACT_PATH[locale]
  const pricingPath = PRICING_PATH[locale]
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'Service', '@id': `${url}#service`, name: page.title, description: page.seo.description, url,
      provider: { '@type': 'Person', '@id': `${SITE_URL}/#person` }, areaServed: [{ '@type': 'Country', name: AREA_LABEL[locale] }, { '@type': 'Place', name: 'Europe' }],
      offers: packages.map((p) => ({ '@type': 'Offer', name: p.name, url: `${SITE_URL}${pricingPath}`, priceSpecification: { '@type': 'PriceSpecification', minPrice: Number(p.price.replace(/\D/g, '')), priceCurrency: 'EUR' } })),
    }, breadcrumbSchema(page.title, url, locale), faqSchema(page.faq),
  ]
  return <>
    <SEO
      title={page.seo.title}
      description={page.seo.description}
      url={url}
      locale={OG_LOCALE[locale]}
      alternateLocales={[OG_LOCALE[altLocale]]}
      isMainPage={false}
      hrefLangUrls={{ [locale]: url, [altLocale]: `${SITE_URL}/${altLocale}/${meta.slugs[altLocale]}` }}
      additionalSchemas={schemas}
    />
    <SubpageNav backLabel={t('subpage.backLink')} />
    <main className="pt-20 break-words">
      <ContentSection>
        <p className="callsign">{ui.industryLabel}</p>
        <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-paper sm:text-4xl md:text-5xl">{page.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-paper-dim">{page.intro}</p>
        <div className="mt-8 flex flex-wrap gap-4"><Link href={contactPath} className="btn-signal">{ui.contact}</Link><Link href={pricingPath} className="btn-line">{ui.pricingLink}</Link></div>
      </ContentSection>
      <ContentSection title={page.context.title} raised><Paragraphs items={page.context.paragraphs} /></ContentSection>
      <ContentSection title={page.featuresTitle}>
        <div className="grid gap-5 sm:grid-cols-2">{page.features.map((feature) => <div key={feature.title} className="rounded-2xl border border-line bg-ink-800 p-5"><h3 className="font-display font-semibold text-paper">{feature.title}</h3><p className="mt-3 leading-relaxed text-paper-dim">{feature.description}</p></div>)}</div>
      </ContentSection>
      <ContentSection title={ui.priceTitle} raised>
        <ContentTable caption={ui.priceTitle} headers={ui.priceHeaders} rows={packages.map((p) => [p.name, `${p.priceNote} ${p.price}`, p.duration])} />
        <div className="mt-6"><Paragraphs items={page.pricing} /></div>
        <Link href={pricingPath} className="mt-5 inline-block font-semibold text-teal-bright underline underline-offset-4">{ui.pricingLink}</Link>
      </ContentSection>
      <ContentSection title={ui.proofTitle}>
        <Paragraphs items={page.proof} />
        <ul className="mt-6 space-y-3">{meta.projects.map((key) => {
          const p = projects.find((item) => item.key === key)
          return <li key={key} className="flex flex-wrap gap-x-4 gap-y-2 text-sm"><a className="font-semibold text-teal-bright underline underline-offset-4" href={p.links.live || p.links.demo}>{t(`projects.items.${key}.title`)}</a>{p.links.caseStudy && <a className="text-teal-bright underline underline-offset-4" href={`/${locale}/case-study/${p.links.caseStudy}`}>{ui.caseStudy}</a>}</li>
        })}</ul>
      </ContentSection>
      <ContentSection title={ui.directTitle} raised><ul className="space-y-4">{ui.direct.map((item) => <li key={item.title}><h3 className="font-semibold text-paper">{item.title}</h3><p className="mt-1 leading-relaxed text-paper-dim">{item.description}</p></li>)}</ul></ContentSection>
      <ContentSection title={pricing.processTitle}><ol className="grid gap-6 sm:grid-cols-2">{pricing.process.map((item, i) => <li key={item.step}><span className="font-mono text-sm text-teal-bright">0{i + 1}</span><h3 className="mt-2 font-semibold text-paper">{item.step}</h3><p className="mt-2 leading-relaxed text-paper-dim">{item.description}</p></li>)}</ol></ContentSection>
      <ContentSection title={page.faqTitle} raised><ContentFAQ items={page.faq} /></ContentSection>
      <ContentSection><RelatedPages ids={meta.relatedPages} locale={locale} title={ui.relatedTitle} /><h3 className="mt-8 font-semibold text-paper">{ui.servicesTitle}</h3><ul className="mt-3 space-y-2">{meta.services.map((service) => <li key={service}><a className="text-teal-bright underline underline-offset-4" href={`/${locale}/services/${service}`}>{t(`servicePages.services.${service}.title`)}</a></li>)}</ul></ContentSection>
      <ContentSection title={page.cta.title} raised><p className="mb-6 leading-relaxed text-paper-dim">{page.cta.text}</p><Link className="btn-signal" href={contactPath}>{ui.contact}</Link></ContentSection>
    </main><Footer />
  </>
}

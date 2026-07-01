import ServicePageTemplate from '../../../components/ServicePageTemplate'

export default function PwaApplicationsService({ locale }) {
  return <ServicePageTemplate slug="pwa-applications" locale={locale} />
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

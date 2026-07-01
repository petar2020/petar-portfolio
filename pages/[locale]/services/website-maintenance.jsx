import ServicePageTemplate from '../../../components/ServicePageTemplate'

export default function WebsiteMaintenanceService({ locale }) {
  return <ServicePageTemplate slug="website-maintenance" locale={locale} />
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

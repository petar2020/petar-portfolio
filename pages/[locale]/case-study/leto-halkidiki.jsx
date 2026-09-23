import CaseStudyPage from '../../../components/CaseStudyPage'

export default function Page({ locale }) {
  return <CaseStudyPage locale={locale} caseStudyKey="leto-halkidiki" />
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

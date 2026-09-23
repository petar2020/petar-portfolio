import IndustryPage from '../../components/IndustryPage'

export default function Page() {
  return <IndustryPage id="travel-agency" locale="en" />
}

export async function getStaticPaths() {
  return { paths: [{ params: { locale: 'en' } }], fallback: false }
}

export async function getStaticProps({ params }) {
  if (params?.locale !== 'en') return { notFound: true }
  const messages = (await import('../../messages/en.json')).default
  return { props: { locale: 'en', messages } }
}

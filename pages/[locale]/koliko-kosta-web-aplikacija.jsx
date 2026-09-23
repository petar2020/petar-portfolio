import ComparisonPage from '../../components/ComparisonPage'

export default function Page() {
  return <ComparisonPage id="webapp-cost" locale="sr" />
}

export async function getStaticPaths() {
  return { paths: [{ params: { locale: 'sr' } }], fallback: false }
}

export async function getStaticProps({ params }) {
  if (params?.locale !== 'sr') return { notFound: true }
  const messages = (await import('../../messages/sr.json')).default
  return { props: { locale: 'sr', messages } }
}

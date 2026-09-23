import IndustryPage from '../../components/IndustryPage'

export default function Page() {
  return <IndustryPage id="rent-a-car" locale="sr" />
}

export async function getStaticPaths() {
  return { paths: [{ params: { locale: 'sr' } }], fallback: false }
}

export async function getStaticProps({ params }) {
  if (params?.locale !== 'sr') return { notFound: true }
  const messages = (await import('../../messages/sr.json')).default
  return { props: { locale: 'sr', messages } }
}

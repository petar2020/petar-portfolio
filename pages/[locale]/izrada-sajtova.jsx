import IzradaSajtovaPage from '../../components/IzradaSajtovaPage'

// Serbian-only local SEO landing page — /sr/izrada-sajtova.
// No English counterpart: this page targets Serbian-language commercial
// search intent ("izrada sajtova", "izrada sajtova Beograd") specifically.
export default function IzradaSajtova() {
  return <IzradaSajtovaPage />
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: 'sr' } }],
    fallback: false,
  }
}

export async function getStaticProps() {
  const messages = (await import('../../messages/sr.json')).default
  return { props: { locale: 'sr', messages } }
}

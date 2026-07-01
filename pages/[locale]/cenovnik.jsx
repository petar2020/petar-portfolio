import PricingPage from '../../components/PricingPage'

// Serbian pricing page — /sr/cenovnik (the English twin lives at /en/pricing).
export default function Cenovnik({ locale }) {
  return <PricingPage locale={locale} />
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

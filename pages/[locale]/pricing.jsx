import PricingPage from '../../components/PricingPage'

// English pricing page — /en/pricing (the Serbian twin lives at /sr/cenovnik).
export default function Pricing({ locale }) {
  return <PricingPage locale={locale} />
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: 'en' } }],
    fallback: false,
  }
}

export async function getStaticProps() {
  const messages = (await import('../../messages/en.json')).default
  return { props: { locale: 'en', messages } }
}

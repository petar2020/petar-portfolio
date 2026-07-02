import ContactPage from '../../components/ContactPage'

// Serbian contact page — /sr/kontakt (the English twin lives at /en/contact).
export default function Kontakt({ locale }) {
  return <ContactPage locale={locale} />
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

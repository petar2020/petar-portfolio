import ContactPage from '../../components/ContactPage'

// English contact page — /en/contact (the Serbian twin lives at /sr/kontakt).
export default function Contact({ locale }) {
  return <ContactPage locale={locale} />
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

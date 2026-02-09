import Head from 'next/head'

const BASE_URL = 'https://petararsic.rs'

const DEFAULTS = {
  en: {
    title: 'Booking Platforms and Web Apps | Petar Arsic',
    description:
      'Full-stack developer building premium booking platforms and web applications focused on conversion, speed, and reliability.',
    localeTag: 'en_US',
    heroImage: '/og-hero-en.svg'
  },
  sr: {
    title: 'Booking platforme i web aplikacije | Petar Arsic',
    description:
      'Full-stack developer za premium booking platforme i web aplikacije sa fokusom na konverziju, brzinu i stabilnost.',
    localeTag: 'sr_RS',
    heroImage: '/og-hero-sr.svg'
  }
}

const absolute = (path) => {
  if (!path) return ''
  return path.startsWith('http') ? path : `${BASE_URL}${path}`
}

export default function SEO({
  locale = 'sr',
  path = '/sr',
  title,
  description,
  type = 'website',
  heroImage,
  projectImages = []
}) {
  const currentLocale = locale === 'en' ? 'en' : 'sr'
  const defaults = DEFAULTS[currentLocale]

  const finalTitle = title || defaults.title
  const finalDescription = description || defaults.description
  const canonicalUrl = absolute(path)
  const alternateEn = absolute('/en')
  const alternateSr = absolute('/sr')
  const primaryImage = absolute(heroImage || defaults.heroImage)

  const extraProjectImages = projectImages
    .map(absolute)
    .filter(Boolean)
    .filter((img, index, arr) => arr.indexOf(img) === index)

  const ogImages = [primaryImage, ...extraProjectImages].filter(Boolean)

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Petar Arsic',
      jobTitle: 'Full-Stack Developer',
      url: BASE_URL,
      inLanguage: currentLocale,
      sameAs: ['https://github.com/petar2020', 'https://linkedin.com/in/petararsic'],
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Petar Arsic Portfolio',
      url: canonicalUrl,
      inLanguage: currentLocale
    }
  ]

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta name="author" content="Petar Arsic" />
      <meta name="theme-color" content="#0b1d3f" />
      <meta httpEquiv="content-language" content={currentLocale} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={alternateEn} />
      <link rel="alternate" hrefLang="sr" href={alternateSr} />
      <link rel="alternate" hrefLang="x-default" href={alternateEn} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Petar Arsic Portfolio" />
      <meta property="og:locale" content={defaults.localeTag} />
      <meta property="og:locale:alternate" content={currentLocale === 'en' ? 'sr_RS' : 'en_US'} />
      {ogImages.map((imageUrl, index) => (
        <meta key={`og-image-${imageUrl}-${index}`} property="og:image" content={imageUrl} />
      ))}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Petar Arsic portfolio preview" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImages[0]} />

      {structuredData.map((item, index) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  )
}

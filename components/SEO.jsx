import Head from 'next/head';
import { useRouter } from 'next/router';

const DEFAULT_SITE_URL = 'https://petararsic.rs';

export default function SEO({
  title = 'Petar Arsić - Full-Stack Developer',
  description = 'Full-Stack Developer iz Srbije. Gradim moderne web aplikacije sa najnovijim tehnologijama.',
  image = '/og-image.png',
  url,
  type = 'website',
  locale,
  alternateLocales = [],
  isMainPage = true
}) {
  const router = useRouter();
  const siteUrl = url || `${DEFAULT_SITE_URL}${router?.asPath ?? ''}`;
  const ogLocale = locale || 'sr_RS';
  const alternate = alternateLocales.length > 0 ? alternateLocales : ['en_US'];
  const siteName = 'Petar Arsić Portfolio';
  const fullTitle = `${title} | ${siteName}`;
  const ogImageUrl = image.startsWith('http')
    ? image
    : (() => {
        try {
          return new URL(image, siteUrl).toString();
        } catch (error) {
          return `${DEFAULT_SITE_URL}${image}`;
        }
      })();

  const structuredDataPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://petararsic.rs/#person',
    name: 'Petar Arsić',
    alternateName: 'Petar Arsic',
    jobTitle: 'Full-Stack Developer (Laravel / React)',
    description,
    url: DEFAULT_SITE_URL,
    image: {
      '@type': 'ImageObject',
      url: `${DEFAULT_SITE_URL}/og-image.png`,
      width: 1200,
      height: 630
    },
    email: 'petar.arsic14@hotmail.com',
    telephone: '+381621175596',
    sameAs: [
      'https://github.com/petar2020',
      'https://www.linkedin.com/in/petar-arsic-2067821b5/'
    ],
    knowsAbout: [
      'Laravel',
      'PHP',
      'React',
      'React Native',
      'Next.js',
      'MySQL',
      'WordPress',
      'Booking & Ticketing Systems',
      'Business Process Automation',
      'Production Software',
      'Full-Stack Development'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RS',
      addressLocality: 'Belgrade',
      addressRegion: 'Central Serbia'
    },
    dateModified: new Date().toISOString().split('T')[0]
  };

  const structuredDataWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://petararsic.rs/#website',
    name: siteName,
    url: DEFAULT_SITE_URL,
    description,
    inLanguage: ['en', 'sr'],
    author: {
      '@id': 'https://petararsic.rs/#person'
    },
    dateModified: new Date().toISOString().split('T')[0]
  };

  const structuredDataProfilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}#profilepage`,
    url: siteUrl,
    name: title,
    description,
    inLanguage: locale === 'sr_RS' ? 'sr' : 'en',
    isPartOf: { '@id': 'https://petararsic.rs/#website' },
    about: { '@id': 'https://petararsic.rs/#person' },
    mainEntity: { '@id': 'https://petararsic.rs/#person' },
    dateModified: new Date().toISOString().split('T')[0]
  };

  const structuredDataProjects = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}#projects`,
    name: 'Selected Projects',
    numberOfItems: 6,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'WebSite',
          name: 'DriveSoft — Product & Agency Site',
          url: 'https://drivesoft.rs/',
          author: { '@id': 'https://petararsic.rs/#person' }
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'WebSite',
          name: 'Srbija Tours — Public Ticket Sales',
          url: 'https://srbijatours.com/',
          author: { '@id': 'https://petararsic.rs/#person' }
        }
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'MobileApplication',
          name: 'Srbija Tours — Mobile App',
          url: 'https://play.google.com/store/apps/details?id=com.panzo98.srbijatours',
          operatingSystem: 'Android, iOS',
          applicationCategory: 'TravelApplication',
          author: { '@id': 'https://petararsic.rs/#person' }
        }
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'SoftwareApplication',
          name: 'DriveSoft — Operations Back-office',
          applicationCategory: 'BusinessApplication',
          url: 'https://drivesoft-bozic.com/login',
          author: { '@id': 'https://petararsic.rs/#person' }
        }
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: {
          '@type': 'WebSite',
          name: 'Božić König — Online Reservations',
          url: 'https://bozic-konig.com/',
          author: { '@id': 'https://petararsic.rs/#person' }
        }
      },
      {
        '@type': 'ListItem',
        position: 6,
        item: {
          '@type': 'WebSite',
          name: 'Prostor Miljenko Dereta — Corporate Site',
          url: 'https://prostordereta.org/',
          author: { '@id': 'https://petararsic.rs/#person' }
        }
      }
    ]
  };

  const structuredDataDriveSoft = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://drivesoft.rs/#software',
    name: 'DriveSoft',
    description: 'Production reservation, ticketing and operations platform for international bus carriers. Online seat reservations, QR-code ticket validation, payments with fiscal-receipt integration, and role-based admin tools.',
    url: 'https://drivesoft.rs/',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Android, iOS',
    featureList: [
      'Online seat reservation and checkout',
      'Ticket generation with QR-code validation',
      'Payments with fiscal-receipt integration',
      'Passenger, route and departure management',
      'Role-based admin panel with operational reporting',
      'React Native tools for on-the-road ticket validation'
    ],
    author: { '@id': 'https://petararsic.rs/#person' },
    creator: { '@id': 'https://petararsic.rs/#person' }
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Language and Locale */}
      <meta property="og:locale" content={ogLocale} />
      {alternate.map(alternateLocale => (
        <meta key={alternateLocale} property="og:locale:alternate" content={alternateLocale} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Petar Arsić" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#06100E" />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Hreflang — language alternates */}
      <link rel="alternate" hrefLang="en" href={`${DEFAULT_SITE_URL}/en`} />
      <link rel="alternate" hrefLang="sr" href={`${DEFAULT_SITE_URL}/sr`} />
      <link rel="alternate" hrefLang="x-default" href={DEFAULT_SITE_URL} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataPerson)
        }}
      />

      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataWebsite)
        }}
      />

      {/* ProfilePage, ItemList, SoftwareApplication — main page only */}
      {isMainPage && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredDataProfilePage)
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredDataProjects)
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredDataDriveSoft)
            }}
          />
        </>
      )}
    </Head>
  );
}

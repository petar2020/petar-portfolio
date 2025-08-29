import Head from 'next/head';

export default function SEO({ 
  title = 'Petar Arsić - Full-Stack Developer',
  description = 'Full-Stack Developer iz Srbije. Gradim moderne web aplikacije sa najnovijim tehnologijama.',
  image = '/og-image.jpg',
  url = 'https://petararsic.rs',
  type = 'website',
  locale = 'sr_RS',
  alternateLocales = ['en_US']
}) {
  const siteName = 'Petar Arsić Portfolio';
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Language and Locale */}
      <meta property="og:locale" content={locale} />
      {alternateLocales.map(locale => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${image}`} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Petar Arsić" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#3B82F6" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Petar Arsić",
            "jobTitle": "Full-Stack Developer",
            "description": "Full-Stack Developer iz Srbije. Gradim moderne web aplikacije sa najnovijim tehnologijama.",
            "url": "https://petararsic.rs",
            "sameAs": [
              "https://github.com/petar2020",
              "https://linkedin.com/in/petararsic"
            ],
            "knowsAbout": [
              "Web Development",
              "Laravel",
              "Vue.js",
              "React",
              "Next.js",
              "Full-Stack Development"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "RS",
              "addressLocality": "Serbia"
            },
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            }
          })
        }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Petar Arsić Portfolio",
            "url": "https://petararsic.rs",
            "description": "Full-Stack Developer portfolio showcasing projects and skills",
            "author": {
              "@type": "Person",
              "name": "Petar Arsić"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://petararsic.rs/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </Head>
  );
}

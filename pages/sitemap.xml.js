const SITE_URL = 'https://petararsic.rs'

function sitemapXml() {
  const lastmod = new Date().toISOString()
  const urls = [
    { path: '/en', priority: '1.0' },
    { path: '/sr', priority: '1.0' }
  ]

  const items = urls
    .map(({ path, priority }) => {
      const url = `${SITE_URL}${path}`
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en" />
    <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}/sr" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en" />
  </url>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">${items}
</urlset>`
}

function SiteMap() {
  return null
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemapXml())
  res.end()

  return { props: {} }
}

export default SiteMap

import { services } from '../data/services';

const SITE_URL = 'https://petararsic.rs';

function buildUrl(path, priority, changefreq) {
  const now = new Date().toISOString();
  const en = `${SITE_URL}/en${path}`;
  const sr = `${SITE_URL}/sr${path}`;

  return `
    <url>
      <loc>${en}</loc>
      <xhtml:link rel="alternate" hreflang="en" href="${en}" />
      <xhtml:link rel="alternate" hreflang="sr" href="${sr}" />
      <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />
      <lastmod>${now}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
    <url>
      <loc>${sr}</loc>
      <xhtml:link rel="alternate" hreflang="en" href="${en}" />
      <xhtml:link rel="alternate" hreflang="sr" href="${sr}" />
      <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />
      <lastmod>${now}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `;
}

function generateSiteMap() {
  const homePages = buildUrl('', '1.0', 'weekly');
  const caseStudyPages = buildUrl('/case-study/drivesoft', '0.9', 'monthly');
  const servicesIndexPages = buildUrl('/services', '0.9', 'weekly');

  const servicePages = services
    .map((s) => buildUrl(`/services/${s.slug}`, '0.8', 'monthly'))
    .join('');

  const legacyServicePages = [
    '/services/laravel-backend',
  ]
    .map((path) => buildUrl(path, '0.8', 'monthly'))
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${homePages}
      ${caseStudyPages}
      ${servicesIndexPages}
      ${servicePages}
      ${legacyServicePages}
    </urlset>
  `;
}

function SiteMap() {
  // getServerSideProps will handle the XML generation
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

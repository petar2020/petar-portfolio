import { services } from '../data/services';

const SITE_URL = 'https://petararsic.rs';

// Real content-update date. Bump this when page content actually changes —
// a lastmod that changes on every crawl teaches Google to ignore it.
const LASTMOD = '2026-07-02';

// Pages whose slug differs per locale pass distinct paths (e.g. pricing/cenovnik).
function buildPair(enPath, srPath, priority, changefreq) {
  const now = LASTMOD;
  const en = `${SITE_URL}/en${enPath}`;
  const sr = `${SITE_URL}/sr${srPath}`;

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

function buildUrl(path, priority, changefreq) {
  return buildPair(path, path, priority, changefreq);
}

// Single-locale page with no translated counterpart — self-referencing only,
// no cross-locale hreflang (a fabricated /en pair would just be a 404).
function buildSingle(locale, path, priority, changefreq) {
  const loc = `${SITE_URL}/${locale}${path}`;
  return `
    <url>
      <loc>${loc}</loc>
      <xhtml:link rel="alternate" hreflang="${locale}" href="${loc}" />
      <lastmod>${LASTMOD}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `;
}

function generateSiteMap() {
  const homePages = buildUrl('', '1.0', 'weekly');
  const caseStudyPages = buildUrl('/case-study/drivesoft', '0.9', 'monthly');
  const servicesIndexPages = buildUrl('/services', '0.9', 'weekly');
  const pricingPages = buildPair('/pricing', '/cenovnik', '0.9', 'monthly');
  const contactPages = buildPair('/contact', '/kontakt', '0.8', 'monthly');
  const izradaSajtovaPage = buildSingle('sr', '/izrada-sajtova', '0.9', 'monthly');

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
      ${pricingPages}
      ${contactPages}
      ${izradaSajtovaPage}
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

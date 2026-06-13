const SITE_URL = 'https://petararsic.rs';

function generateSiteMap() {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      <url>
        <loc>${SITE_URL}/en</loc>
        <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en" />
        <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}/sr" />
        <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}" />
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${SITE_URL}/sr</loc>
        <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en" />
        <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}/sr" />
        <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}" />
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${SITE_URL}/en/case-study/drivesoft</loc>
        <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/case-study/drivesoft" />
        <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}/sr/case-study/drivesoft" />
        <lastmod>${now}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>${SITE_URL}/sr/case-study/drivesoft</loc>
        <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/case-study/drivesoft" />
        <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}/sr/case-study/drivesoft" />
        <lastmod>${now}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>${SITE_URL}/en/services/laravel-backend</loc>
        <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/services/laravel-backend" />
        <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}/sr/services/laravel-backend" />
        <lastmod>${now}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${SITE_URL}/sr/services/laravel-backend</loc>
        <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/services/laravel-backend" />
        <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}/sr/services/laravel-backend" />
        <lastmod>${now}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${SITE_URL}/en/services/booking-systems</loc>
        <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/services/booking-systems" />
        <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}/sr/services/booking-systems" />
        <lastmod>${now}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${SITE_URL}/sr/services/booking-systems</loc>
        <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/services/booking-systems" />
        <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}/sr/services/booking-systems" />
        <lastmod>${now}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
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

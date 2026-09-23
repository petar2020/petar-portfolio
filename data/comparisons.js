// `slugs` holds the URL slug per locale — content lives at
// messages/<locale>.json under comparisonPages.<slugs[locale]>.
export const CONTENT_DATE = '2026-09-23'

export const comparisons = [
  {
    id: 'freelancer-vs-agency',
    slugs: { sr: 'frilenser-ili-agencija', en: 'freelance-developer-vs-agency' },
    relatedPages: ['wordpress-vs-custom', 'webapp-cost', 'booking-cost'],
  },
  {
    id: 'wordpress-vs-custom',
    slugs: { sr: 'wordpress-ili-sajt-po-meri', en: 'wordpress-vs-custom-website' },
    relatedPages: ['wix-vs-custom', 'apartments', 'freelancer-vs-agency'],
  },
  {
    id: 'wix-vs-custom',
    slugs: { sr: 'wix-ili-sajt-po-meri', en: 'wix-vs-custom-website' },
    relatedPages: ['wordpress-vs-custom', 'freelancer-vs-agency', 'booking-cost'],
  },
  {
    id: 'booking-cost',
    slugs: { sr: 'koliko-kosta-booking-sistem', en: 'booking-system-cost' },
    relatedPages: ['apartments', 'bus-tickets', 'appointments'],
  },
  {
    id: 'webapp-cost',
    slugs: { sr: 'koliko-kosta-web-aplikacija', en: 'web-application-cost' },
    relatedPages: ['quote-app', 'freelancer-vs-agency', 'booking-cost'],
  },
]

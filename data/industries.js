// Package indexes refer to pricingPage.packages in messages/<locale>.json.
// Prices themselves are never duplicated here.
// `slugs` holds the URL slug per locale — content lives at
// messages/<locale>.json under industryPages.<slugs[locale]>.
// `relatedPages` and `services` are ids/slugs resolved by the caller per locale.
export const industries = [
  {
    id: 'apartments',
    slugs: { sr: 'izrada-sajta-za-apartmane', en: 'apartment-rental-website' },
    packageIndexes: [1],
    projects: ['leto-halkidiki'],
    services: ['tourism-accommodation-portals', 'booking-systems'],
    relatedPages: ['travel-agency', 'booking-cost', 'wordpress-vs-custom'],
  },
  {
    id: 'travel-agency',
    slugs: { sr: 'sajt-za-turisticku-agenciju', en: 'travel-agency-website' },
    packageIndexes: [1, 2],
    projects: ['leto-halkidiki', 'sti-web'],
    services: ['tourism-accommodation-portals', 'booking-systems'],
    relatedPages: ['apartments', 'bus-tickets', 'booking-cost'],
  },
  {
    id: 'bus-tickets',
    slugs: { sr: 'online-prodaja-karata-za-prevoznike', en: 'online-bus-ticket-sales-software' },
    packageIndexes: [2],
    projects: ['sti-web', 'drivesoft-backoffice'],
    services: ['booking-systems', 'admin-panels-dashboards'],
    relatedPages: ['travel-agency', 'booking-cost', 'webapp-cost'],
  },
  {
    id: 'rent-a-car',
    slugs: { sr: 'sajt-za-rent-a-car', en: 'rent-a-car-booking-website' },
    packageIndexes: [1],
    projects: ['sti-web'],
    services: ['booking-systems', 'tourism-accommodation-portals'],
    relatedPages: ['appointments', 'booking-cost', 'freelancer-vs-agency'],
  },
  {
    id: 'quote-app',
    slugs: { sr: 'program-za-izradu-ponuda', en: 'quoting-app-for-contractors' },
    packageIndexes: [2],
    projects: ['drivesoft-backoffice'],
    services: ['admin-panels-dashboards', 'crm-internal-tools'],
    relatedPages: ['webapp-cost', 'appointments', 'freelancer-vs-agency'],
  },
  {
    id: 'appointments',
    slugs: { sr: 'sajt-za-zakazivanje-termina', en: 'appointment-booking-website' },
    packageIndexes: [1],
    projects: ['sti-web'],
    services: ['booking-systems', 'crm-internal-tools'],
    relatedPages: ['rent-a-car', 'booking-cost', 'quote-app'],
  },
]

// src/data/projects.js

/**
 * @typedef Project
 * @property {string} title
 * @property {string} description
 * @property {string} longDescription
 * @property {string} image
 * @property {string} link
 * @property {string[]} tech
 * @property {string[]} [details]
 * @property {string} [codeLink]
 */

export const projects = [
  {
    title: 'Božić König – Online Rezervacije',
    description: 'React aplikacija za pretragu polazaka i online kupovinu karata.',
    longDescription:
      'SPA u React/Next okruženju sa optimizovanom pretragom, jasnim tokom kupovine i integracijom sa back-office sistemima (linije, polasci, cene). Fokus na UX i performanse.',
    image: '/bozic-konig.png',
    link: 'https://bozic-konig.com/',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'REST API'],
    details: [
      'Brza pretraga i filtriranje linija',
      'Sigurni tokovi plaćanja',
      'SEO i performance optimizacije'
    ]
  },
  {
    title: 'Srbija Tours – Prodaja karata',
    description: 'Produkcioni sajt za online rezervacije i plaćanja sa integracijama.',
    longDescription:
      'Sistem za pretragu linija, rezervacije i plaćanja, sa optimizacijom baza i keširanjem. U produkciji za veliki broj putnika godišnje.',
    image: '/srbijatours.png',
    link: 'https://srbijatours.com/',
    tech: ['Laravel', 'MySQL', 'Redis', 'Nginx'],
    details: [
      'Upravljanje linijama, cenama i popustima',
      'Integracija plaćanja i email/queue tokovi',
      'Monitoring, logovi i error tracking'
    ]
  },
  {
    title: 'Srbija Tours – Mobilna aplikacija (iOS/Android)',
    description: 'React Native aplikacija: pretraga polazaka, nalozi i rezervacije.',
    longDescription:
      'Cross-platform aplikacija sa Expo/React Native. Deljeni UI i logika, offline keširanje i push notifikacije.',
    image: '/sti-mobilna.png',
    link: 'https://play.google.com/store/apps/details?id=com.panzo98.srbijatours',
    tech: ['React Native', 'Expo', 'Android', 'iOS', 'REST API'],
    details: [
      'Login/registracija i profil',
      'Pretraga i filtriranje polazaka',
      'Push notifikacije'
    ]
  },
  {
    title: 'DriveSoft – Back-office (Laravel)',
    description: 'Interni sistem za praćenje putnika, polazaka, linija i operativa.',
    longDescription:
      'Laravel aplikacija sa kompleksnim modelima, RBAC-om, keširanjem i queue-vima. Izveštaji i export/import podataka.',
    image: '/bozic-laravel.png',
    link: 'https://drivesoft-bozic.com/login',
    tech: ['Laravel 10', 'MySQL', 'Redis', 'Queues', 'Docker'],
    details: [
      'RBAC i audit trail',
      'Import/Export CSV/Excel',
      'Grafikoni i operativni izveštaji'
    ]
  }
]

// koristi prva 4 za carousel/sekciju
export const featuredProjects = projects.slice(0, 4)

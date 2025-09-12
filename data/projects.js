export const projects = [
  {
    key: 'bozic-konig',
    title: 'Božić König – Online Rezervacije',
    description: 'React aplikacija za pretragu polazaka i online kupovinu karata.',
    longDescription:
      'SPA u React/Next okruženju sa optimizovanom pretragom, jasnim tokom kupovine i integracijom sa back-office sistemima (linije, polasci, cene). Fokus na UX i performanse.',
    image: '/bozic-konig.png',
    link: 'https://bozic-konig.com/',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'REST API'],
    details: ['Brza pretraga i filtriranje linija', 'Sigurni tokovi plaćanja', 'SEO i performance optimizacije']
  },
 {
  key: 'sti-web',
  title: 'Srbija Tours – Prodaja karata',
  description: 'WordPress frontend sa Laravel API-jem za polaske, rezervacije i plaćanja.',
  longDescription:
    'Frontend je WordPress (custom tema/blokovi) – brz i SEO-prijateljski. Backend je Laravel koji isporučuje API za polaske, cene i rezervacije, zajedno sa integrisanim plaćanjem i fiskalizacijom. Keširanje preko Redis-a i optimizacije na nivou Nginx-a.',
  image: '/srbijatours.png',
  link: 'https://srbijatours.com/',
  tech: ['WordPress', 'Laravel (API)', 'MySQL', 'Redis', 'Nginx'],
  details: [
    'WordPress frontend (custom tema/blokovi)',
    'Laravel API: polasci, cene, rezervacije',
    'Integrisana plaćanja + email/queue tokovi'
  ]
},
  {
    key: 'sti-mobile',
    title: 'Srbija Tours – Mobilna aplikacija (iOS/Android)',
    description: 'React Native aplikacija: pretraga polazaka, nalozi i rezervacije.',
    longDescription:
      'Cross-platform aplikacija sa Expo/React Native. Deljeni UI i logika, offline keširanje i push notifikacije.',
    image: '/sti-mobilna.png',
    link: 'https://play.google.com/store/apps/details?id=com.panzo98.srbijatours',
    tech: ['React Native', 'Expo', 'Android', 'iOS', 'REST API'],
    details: ['Login/registracija i profil', 'Pretraga i filtriranje polazaka', 'Push notifikacije']
  },
  {
    key: 'drivesoft-backoffice',
    title: 'DriveSoft – Back-office (Laravel)',
    description: 'Interni sistem za praćenje putnika, polazaka, linija i operativa.',
    longDescription:
      'Laravel aplikacija sa kompleksnim modelima, RBAC-om, keširanjem i queue-vima. Izveštaji i export/import podataka.',
    image: '/bozic-laravel.png',
    link: 'https://drivesoft-bozic.com/login',
    tech: ['Laravel 10', 'MySQL', 'Redis', 'Queues', 'Docker'],
    details: ['RBAC i audit trail', 'Import/Export CSV/Excel', 'Grafikoni i operativni izveštaji']
  },
  {
    key: 'drivesoft-demo',
    title: 'DriveSoft – Demo rezervacije (React)',
    description: 'Demo front-end aplikacija za pretragu i rezervaciju karata sa statičkim podacima.',
    longDescription:
      'Jasan UX sa filterima (smer, polazak, destinacija, datum, broj putnika). Verzija za demo svrhe, odvojena od produkcionih API-ja, spremna za povezivanje na pravi backend.',
    image: '/demo.png',
    link: 'https://demo.drivesoft.rs/',
    tech: ['React', 'Vite', 'Tailwind', 'i18n'],
    details: ['Statički seed podaci za prezentacije', 'Čist tok rezervacije u nekoliko koraka', 'Lako povezivanje sa realnim API-jem']
  },
  {
    key: 'prostor-dereta',
    title: 'Prostor Miljenko Dereta – WordPress',
    description: 'Korporativni WP sajt sa blogom i formama za rezervaciju prostora.',
    longDescription:
      'Moderni WordPress build sa prilagođenim šablonima i optimizacijama. Fokus na brzinu, SEO i jednostavno uređivanje sadržaja.',
    image: '/prostordereta.png',
    link: 'https://prostordereta.org/',
    tech: ['WordPress', 'Gutenberg', 'Performance', 'SEO'],
    details: ['Kontakt i booking forme', 'Optimizovane slike i keširanje', 'Struktura pogodna za SEO i blog']
  }
]

export const featuredProjects = projects

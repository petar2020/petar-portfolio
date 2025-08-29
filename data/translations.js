// src/data/translations.js
export const translations = {
  en: {
    nav: {
      logo: 'Petar Arsić',
      links: [
        { href: '#projects', label: 'PROJECTS' },
        { href: '#services', label: 'SERVICES' },
        { href: '#timeline',  label: 'TIMELINE' },
        { href: '#contact',  label: 'CONTACT' },
      ],
    },
    hero: {
      greeting:    "Hello, I'm",
      name:        'Petar Arsić',
      subtitle:    'Full-Stack Developer with a passion for modern web & mobile solutions.',
      bullets:     ['Laravel & React expert', 'WordPress custom themes', 'Mobile apps'],
      ctaSee:      'See Projects',
      ctaDownload: 'Download CV',
    },
    projects: {
      title: 'Projects',
    },
    services: {
      title: 'Services I Offer',
      items: [
        'Laravel Development',
        'React.js Development',
        'WordPress / Webflow',
        'Hosting & Servers',
        'Domains & DNS',
        'Bug Fixing & Support',
      ],
    },
    timeline: {
      title: 'Professional Journey',
      items: [
        {
          year:        '2020–2023',
          title:       'Software Developer',
          company:     'Srbija Tours International',
          description: 'Developed and maintained custom passenger transport software for a 100-employee company, including web apps and integrations.',
          skills:      ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
          duration:    '2020–2023'
        },
        {
          year:        '2023–Present',
          title:       'Full-Stack Developer',
          company:     'DriveSoft Solutions',
          description: 'Building transport solutions, mobile apps and web SaaS platforms, as well as fiscal cashier systems, marketing and user support.',
          skills:      ['Laravel', 'React', 'React Native', 'Node.js'],
          duration:    '2023–Present'
        }
      ],
      download: 'Download Full CV'
    },
    contact: {
      title: 'Contact',
      form: {
        name:    'Your Name',
        email:   'Email Address',
        message: 'Your Message',
        submit:  'Send Message',
      },
      info: {
        locationTitle: 'Location',
        location:      'Belgrade, Serbia',
        emailTitle:    'Email',
        email:         'petar@srbijatours.com',
        phoneTitle:    'Phone',
        phone:         '+381 63 1755996',
      },
      footer: {
        description: 'Building robust web and mobile solutions for clients worldwide.',
        copyright:   'Petar Arsić. All rights reserved.',
      },
    },
  },
  sr: {
    nav: {
      logo: 'Petar Arsić',
      links: [
        { href: '#projekti', label: 'PROJEKTI' },
        { href: '#usluge',  label: 'USLUGE' },
        { href: '#timeline',  label: 'KARIJERA' },
        { href: '#kontakt', label: 'KONTAKT' },
      ],
    },
    hero: {
      greeting:    'Zdravo, ja sam',
      name:        'Petar Arsić',
      subtitle:    'Full-Stack Developer sa strašću za modernim web i mobilnim rešenjima.',
      bullets:     ['Laravel & React ekspert', 'WordPress custom teme', 'Mobilne aplikacije'],
      ctaSee:      'Pogledaj projekte',
      ctaDownload: 'Preuzmi CV',
    },
    projects: {
      title: 'Projekti',
    },
    services: {
      title: 'Usluge koje nudim',
      items: [
       'Razvoj Laravel aplikacija',
        'React.js razvoj aplikacija',
        'WordPress / Webflow',
        'Hosting i serveri',
        'Domeni i DNS',
        'Otklanjanje grešaka i podrška',
      ],
    },
    timeline: {
      title: 'Profesionalno putovanje',
      items: [
        {
          year:        '2020–2023',
          title:       'Softverski developer',
          company:     'Srbija Tours International',
          description: 'Razvijao i održavao prilagođeni softver za prevoz putnika u firmi od 100 zaposlenih, uključujući web aplikacije i integracije.',
          skills:      ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
          duration:    '2020–2023'
        },
        {
          year:        '2023–Sada',
          title:       'Full-Stack developer',
          company:     'DriveSoft Solutions',
          description: 'Razvijam transportna rešenja, mobilne aplikacije i web SaaS platforme, kao i sistem za fiskalne kase, marketing i podršku korisnicima.',
          skills:      ['Laravel', 'React', 'React Native', 'Node.js'],
          duration:    '2023–sada'
        }
      ],
      download: 'Preuzmi pun CV'
    },
    contact: {
      title: 'Kontakt',
      form: {
        name:    'Vaše ime',
        email:   'Email adresa',
        message: 'Vaša poruka',
        submit:  'Pošalji poruku',
      },
      info: {
        locationTitle: 'Lokacija',
        location:      'Beograd, Srbija',
        emailTitle:    'Email',
        email:         'petar.arsic14@hotmail.com',
        phoneTitle:    'Telefon',
        phone:         '+381 62 1755996',
      },
      footer: {
        description: 'Izgrađujem robusna web i mobilna rešenja za klijente širom sveta.',
        copyright:   'Petar Arsić. Sva prava zadržana.',
      },
    },
  },
}

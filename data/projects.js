// Project metadata. The one-line summary + "my role" copy lives in
// messages/<locale>.json under projects.items.<key>; tech tags and links are here.
// links: { live, demo, caseStudy, github } — only the keys present are rendered.
export const projects = [
  {
    key: 'drivesoft-web',
    image: '/drivesoft-preview.png',
    category: 'web',
    featured: true,
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'SEO'],
    links: { live: 'https://drivesoft.rs/' },
  },
  {
    key: 'sti-web',
    image: '/srbijatours-preview.png',
    category: 'platform',
    featured: true,
    primary: true, // leads the homepage "Selected Projects" section — real 150k+ ticket volume
    tech: ['WordPress', 'Laravel (API)', 'MySQL', 'Redis', 'Nginx'],
    links: { live: 'https://srbijatours.com/', caseStudy: '#case-study' },
  },
  {
    key: 'sti-mobile',
    image: '/sti-mobilna.png',
    category: 'mobile',
    tech: ['React Native', 'Expo', 'Android', 'iOS', 'REST API'],
    links: { live: 'https://play.google.com/store/apps/details?id=com.panzo98.srbijatours' },
  },
  {
    key: 'drivesoft-backoffice',
    image: '/bozic-laravel.png',
    category: 'dashboard',
    featured: true,
    tech: ['Laravel', 'MySQL', 'Redis', 'Queues', 'Docker'],
    links: { demo: 'https://drivesoft-bozic.com/login', caseStudy: '#case-study' },
  },
  {
    key: 'bozic-konig',
    image: '/bozic-preview.png',
    category: 'web',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'REST API'],
    links: { live: 'https://bozic-konig.com/' },
  },
  {
    key: 'prostor-dereta',
    image: '/prostordereta.png',
    category: 'web',
    tech: ['WordPress', 'Gutenberg', 'Performance', 'SEO'],
    links: { live: 'https://prostordereta.org/' },
  },
]

export const featuredProjects = projects

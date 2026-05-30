// Project metadata. The Problem → Solution → Result copy lives in
// messages/<locale>.json under projects.items.<key>; tech tags are listed last.
export const projects = [
  {
    key: 'sti-web',
    image: '/srbijatours.png',
    link: 'https://srbijatours.com/',
    tech: ['WordPress', 'Laravel (API)', 'MySQL', 'Redis', 'Nginx'],
  },
  {
    key: 'sti-mobile',
    image: '/sti-mobilna.png',
    link: 'https://play.google.com/store/apps/details?id=com.panzo98.srbijatours',
    tech: ['React Native', 'Expo', 'Android', 'iOS', 'REST API'],
  },
  {
    key: 'drivesoft-backoffice',
    image: '/bozic-laravel.png',
    link: 'https://drivesoft-bozic.com/login',
    tech: ['Laravel', 'MySQL', 'Redis', 'Queues', 'Docker'],
  },
  {
    key: 'bozic-konig',
    image: '/bozic-konig.png',
    link: 'https://bozic-konig.com/',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'REST API'],
  },
  {
    key: 'prostor-dereta',
    image: '/prostordereta.png',
    link: 'https://prostordereta.org/',
    tech: ['WordPress', 'Gutenberg', 'Performance', 'SEO'],
  },
]

export const featuredProjects = projects

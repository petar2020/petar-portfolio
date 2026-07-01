// Service catalog metadata.
// All user-facing copy lives in messages/<locale>.json under servicePages.services.<slug>.
// This file only defines routing, codes, related projects, related services, and tech tags.

export const services = [
  {
    slug: 'custom-web-applications',
    code: 'CWA',
    relevantProjects: ['drivesoft-backoffice', 'bozic-konig', 'drivesoft-web'],
    tech: ['Laravel', 'PHP', 'MySQL', 'React', 'Next.js', 'REST APIs', 'Docker'],
    relatedServices: ['laravel-applications', 'react-frontend-applications', 'admin-panels-dashboards', 'ai-integrations'],
  },
  {
    slug: 'laravel-applications',
    code: 'LAR',
    relevantProjects: ['drivesoft-backoffice', 'sti-web', 'bozic-konig'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Redis', 'Queues', 'REST APIs', 'Docker'],
    relatedServices: ['custom-web-applications', 'booking-systems', 'admin-panels-dashboards', 'crm-internal-tools'],
  },
  {
    slug: 'wordpress-websites',
    code: 'WPD',
    relevantProjects: ['sti-web', 'prostor-dereta'],
    tech: ['WordPress', 'PHP', 'Gutenberg', 'ACF', 'MySQL', 'SEO', 'Performance'],
    relatedServices: ['website-redesign', 'website-maintenance', 'ecommerce-woocommerce', 'tourism-accommodation-portals'],
  },
  {
    slug: 'booking-systems',
    code: 'BKG',
    relevantProjects: ['sti-web', 'sti-mobile', 'drivesoft-backoffice', 'bozic-konig'],
    tech: ['Laravel', 'PHP', 'MySQL', 'React', 'React Native', 'Payments', 'Fiscalization'],
    relatedServices: ['tourism-accommodation-portals', 'laravel-applications', 'admin-panels-dashboards', 'crm-internal-tools'],
  },
  {
    slug: 'tourism-accommodation-portals',
    code: 'TOU',
    relevantProjects: ['sti-web', 'bozic-konig', 'drivesoft-backoffice'],
    tech: ['Laravel', 'PHP', 'MySQL', 'React', 'Next.js', 'WordPress', 'SEO'],
    relatedServices: ['booking-systems', 'laravel-applications', 'admin-panels-dashboards', 'website-maintenance', 'wordpress-websites'],
  },
  {
    slug: 'admin-panels-dashboards',
    code: 'ADM',
    relevantProjects: ['drivesoft-backoffice', 'drivesoft-web'],
    tech: ['Laravel', 'PHP', 'MySQL', 'React', 'Tailwind CSS', 'REST APIs', 'RBAC'],
    relatedServices: ['laravel-applications', 'crm-internal-tools', 'custom-web-applications', 'ai-integrations'],
  },
  {
    slug: 'crm-internal-tools',
    code: 'CRM',
    relevantProjects: ['drivesoft-backoffice', 'drivesoft-web'],
    tech: ['Laravel', 'PHP', 'MySQL', 'React', 'REST APIs', 'Import/Export', 'Reporting'],
    relatedServices: ['admin-panels-dashboards', 'laravel-applications', 'custom-web-applications', 'booking-systems'],
  },
  {
    slug: 'ecommerce-woocommerce',
    code: 'ECM',
    relevantProjects: ['sti-web', 'prostor-dereta'],
    tech: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'Stripe', 'SEO', 'Performance'],
    relatedServices: ['wordpress-websites', 'website-redesign', 'website-maintenance', 'custom-web-applications'],
  },
  {
    slug: 'react-frontend-applications',
    code: 'RFE',
    relevantProjects: ['drivesoft-web', 'bozic-konig', 'sti-web'],
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'REST APIs'],
    relatedServices: ['custom-web-applications', 'pwa-applications', 'laravel-applications', 'ai-integrations'],
  },
  {
    slug: 'pwa-applications',
    code: 'PWA',
    relevantProjects: ['bozic-konig', 'drivesoft-web'],
    tech: ['Next.js', 'React', 'Service Workers', 'Web Manifest', 'Tailwind CSS', 'Offline-First'],
    relatedServices: ['react-frontend-applications', 'custom-web-applications', 'ai-integrations', 'website-redesign'],
  },
  {
    slug: 'ai-integrations',
    code: 'AII',
    relevantProjects: ['drivesoft-web', 'drivesoft-backoffice'],
    tech: ['OpenAI API', 'Laravel', 'PHP', 'React', 'Next.js', 'Vector Stores', 'RAG'],
    relatedServices: ['custom-web-applications', 'laravel-applications', 'admin-panels-dashboards', 'react-frontend-applications'],
  },
  {
    slug: 'website-redesign',
    code: 'RDN',
    relevantProjects: ['drivesoft-web', 'prostor-dereta'],
    tech: ['Next.js', 'React', 'WordPress', 'Tailwind CSS', 'Figma', 'SEO'],
    relatedServices: ['wordpress-websites', 'react-frontend-applications', 'website-maintenance', 'custom-web-applications'],
  },
  {
    slug: 'website-maintenance',
    code: 'MNT',
    relevantProjects: ['sti-web', 'prostor-dereta', 'drivesoft-web'],
    tech: ['Laravel', 'PHP', 'WordPress', 'MySQL', 'Docker', 'Monitoring', 'CI/CD'],
    relatedServices: ['wordpress-websites', 'laravel-applications', 'website-redesign', 'tourism-accommodation-portals'],
  },
]

export const homeServiceCards = [
  { slug: 'tourism-accommodation-portals', labelKey: 'tourism' },
  { slug: 'booking-systems', labelKey: 'booking' },
  { slug: 'admin-panels-dashboards', labelKey: 'admin' },
  { slug: 'wordpress-websites', labelKey: 'wordpress' },
  { slug: 'ecommerce-woocommerce', labelKey: 'ecommerce' },
  { slug: 'ai-integrations', labelKey: 'ai' },
]

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null
}

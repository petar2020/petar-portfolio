'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa'

export default function Footer() {
  const t = useTranslations('footer')
  const tContact = useTranslations('contact')

  const links = [
    { Icon: FaGithub, url: 'https://github.com/petar2020', label: tContact('githubLabel') },
    { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/petar-arsic-2067821b5/', label: tContact('linkedinLabel') },
    { Icon: FaEnvelope, url: 'mailto:petar.arsic14@hotmail.com', label: 'Email' },
  ]

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-line">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-paper-faint">
          © {new Date().getFullYear()} Petar Arsić — {t('rights')}
        </p>

        <div className="flex items-center gap-3">
          {links.map(({ Icon, url, label }, idx) => (
            <motion.a
              key={idx}
              href={url}
              target={url.startsWith('http') ? '_blank' : undefined}
              rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              whileHover={{ y: -2 }}
              className="p-2.5 rounded-full border border-line text-paper-dim hover:border-amber hover:text-amber transition-colors"
            >
              <Icon aria-hidden="true" />
            </motion.a>
          ))}
        </div>

        <a
          href="#home"
          onClick={scrollToTop}
          className="flex items-center gap-2 text-sm font-medium text-paper-dim hover:text-paper transition-colors"
        >
          {t('backToTop')} <FaArrowUp aria-hidden className="text-xs" />
        </a>
      </div>
    </footer>
  )
}

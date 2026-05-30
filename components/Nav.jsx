'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function Nav() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: '#home', label: t('home', { default: 'Home' }) },
    { href: '#demo', label: t('demo', { default: 'Live demo' }) },
    { href: '#case-study', label: t('casestudy', { default: 'Case study' }) },
    { href: '#projects', label: t('projects', { default: 'Projects' }) },
    { href: '#about', label: t('about', { default: 'About' }) },
    { href: '#contact', label: t('contact', { default: 'Contact' }) },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (typeof window !== 'undefined' && window.trackCTA) window.trackCTA('navigation', href)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-ink-900/85 backdrop-blur-md border-line' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between py-4 px-4 sm:px-6">
        {/* logo mark */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2.5 group">
          <span className="h-2 w-2 bg-amber" aria-hidden />
          <span className="font-mono text-sm font-bold tracking-[0.2em] text-paper">PA</span>
          <span className="hidden sm:inline callsign !text-[0.6rem] text-paper-faint group-hover:text-teal-bright transition-colors">
            / FULL-STACK
          </span>
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-7">
            {navItems.map(({ href, label }) => (
              <li key={href} className="group">
                <motion.a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  whileHover={{ y: -1 }}
                  className="relative font-mono text-xs uppercase tracking-[0.14em] text-paper-dim hover:text-paper transition-colors"
                >
                  {label}
                  <span className="absolute left-0 -bottom-1.5 h-px w-0 bg-teal-bright group-hover:w-full transition-all duration-300" />
                </motion.a>
              </li>
            ))}
          </ul>

          <LanguageSwitcher scrolled={scrolled} />
        </div>
      </div>
    </nav>
  )
}

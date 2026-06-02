'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function Nav() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

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

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = ['home', 'demo', 'case-study', 'projects', 'about', 'contact']
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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
            {navItems.map(({ href, label }) => {
              const isActive = active === href.replace('#', '')
              return (
                <li key={href} className="group">
                  <motion.a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    whileHover={{ y: -1 }}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                      isActive ? 'text-paper' : 'text-paper-dim hover:text-paper'
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute left-0 -bottom-1.5 h-px bg-teal-bright transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </motion.a>
                </li>
              )
            })}
          </ul>

          <LanguageSwitcher scrolled={scrolled} />
        </div>
      </div>
    </nav>
  )
}

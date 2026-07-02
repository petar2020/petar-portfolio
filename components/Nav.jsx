'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { FaBars, FaTimes } from 'react-icons/fa'
import LanguageSwitcher from './LanguageSwitcher'

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const pricingPath = locale === 'sr' ? `/${locale}/cenovnik` : `/${locale}/pricing`
  const navItems = [
    { href: '#home', label: t('home', { default: 'Home' }) },
    { href: '#projects', label: t('projects', { default: 'Projects' }) },
    { href: `/${locale}/services`, label: t('services', { default: 'Services' }), isPage: true },
    { href: pricingPath, label: t('pricing', { default: 'Pricing' }), isPage: true },
    { href: '#contact', label: t('about', { default: 'About' }) },
  ]

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = ['home', 'projects', 'contact']
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

  const handleNavClick = (e, href, isPage) => {
    setMenuOpen(false)
    if (isPage) {
      if (typeof window !== 'undefined' && window.trackCTA) window.trackCTA('navigation', href)
      return
    }
    e.preventDefault()
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (typeof window !== 'undefined' && window.trackCTA) window.trackCTA('navigation', href)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-ink-900/90 backdrop-blur-md border-line' : 'bg-ink-900/0 border-transparent'
      }`}
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between py-4 px-4 sm:px-6">
        {/* wordmark */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-1 shrink-0">
          <span className="font-display text-lg font-bold tracking-tight text-paper">Petar Arsić</span>
          <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
        </a>

        {/* center links — desktop */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map(({ href, label, isPage }) => {
            const isActive = active === href.replace('#', '')
            return (
              <li key={href} className="group">
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href, isPage)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative pb-1 text-sm font-medium transition-colors ${
                    isActive ? 'text-paper' : 'text-paper-dim hover:text-paper'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2px] bg-amber transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher scrolled={scrolled} />
          </div>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#141110] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-black"
          >
            {t('workTogether', { default: "Let's work together" })} <span aria-hidden>→</span>
          </a>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper"
          >
            {menuOpen ? <FaTimes aria-hidden /> : <FaBars aria-hidden />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
            className="lg:hidden overflow-hidden border-t border-line bg-ink-900"
          >
            <ul className="container mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navItems.map(({ href, label, isPage }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href, isPage)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-paper hover:bg-ink-850"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center justify-between gap-3 px-3">
                <LanguageSwitcher scrolled={scrolled} />
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#141110] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {t('workTogether', { default: "Let's work together" })} <span aria-hidden>→</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

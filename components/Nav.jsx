'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function Nav() {
  const { setTheme, resolvedTheme } = useTheme()
  const t = useTranslations('nav')
  const reduceMotion = useReducedMotion()

  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen, mounted])

  const navItems = [
    { href: '#home', label: t('home'), type: 'anchor' },
    { href: '#about', label: t('about'), type: 'anchor' },
    { href: '#services', label: t('services'), type: 'anchor' },
    { href: '#projects', label: t('projects'), type: 'anchor' },
    { href: '#testimonials', label: t('testimonials'), type: 'anchor' },
    { href: '#contact', label: t('contact'), type: 'anchor' },
    { href: '/api/cv', label: t('cv'), type: 'external' }
  ]

  const handleNavClick = (e, href, type) => {
    if (type !== 'anchor') return
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileOpen(false)
    }
  }

  const onTrackedClick = (label, location) => {
    if (typeof window !== 'undefined' && window.trackCTA) {
      window.trackCTA(location, label)
    }
  }

  return (
    <>
      <nav
        className={`
          fixed top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300
          ${scrolled ? 'border-gray-200/65 bg-white/90 shadow-sm dark:border-gray-700/55 dark:bg-gray-900/90' : 'border-transparent bg-transparent'}
        `}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'anchor')}
            className={`text-xl font-extrabold uppercase tracking-[0.16em] ${scrolled ? 'text-sky-600 dark:text-sky-300' : 'text-white'}`}
            aria-label="Go to top"
          >
            PA
          </a>

          <div className="flex items-center gap-3 md:gap-5">
            <ul className="hidden items-center gap-6 md:flex">
              {navItems.map(({ href, label, type }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => {
                      handleNavClick(e, href, type)
                      onTrackedClick(label, 'navigation_desktop')
                    }}
                    className={`
                      text-xs font-semibold uppercase tracking-[0.13em] transition
                      ${scrolled ? 'text-gray-800 hover:text-sky-600 dark:text-gray-200 dark:hover:text-sky-300' : 'text-white/95 hover:text-white'}
                    `}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={(e) => {
                handleNavClick(e, '#contact', 'anchor')
                onTrackedClick(t('bookCall'), 'navigation_top')
              }}
              className="hidden rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:brightness-110 md:inline-flex"
            >
              {t('bookCall')}
            </a>

            <LanguageSwitcher scrolled={scrolled} />

            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className={`rounded-full p-2 transition hover:scale-105 ${scrolled ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100' : 'bg-white/20 text-white'}`}
                aria-label={t('toggleTheme')}
              >
                {resolvedTheme === 'dark' ? '🌞' : '🌙'}
              </button>
            )}

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`rounded-lg p-2 md:hidden ${scrolled ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100' : 'bg-white/20 text-white'}`}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={t('toggleMenu')}
            >
              <span className="block h-0.5 w-5 bg-current" />
              <span className="mt-1 block h-0.5 w-5 bg-current" />
              <span className="mt-1 block h-0.5 w-5 bg-current" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-[#020617]/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label={t('closeMenu')}
            />

            <motion.aside
              id="mobile-nav"
              initial={reduceMotion ? false : { x: '100%' }}
              animate={reduceMotion ? false : { x: 0 }}
              exit={reduceMotion ? false : { x: '100%' }}
              transition={reduceMotion ? undefined : { duration: 0.24, ease: 'easeOut' }}
              className="fixed right-0 top-0 z-[80] flex h-full w-[85%] max-w-sm flex-col border-l border-white/15 bg-[#050d1f] p-6 pt-24 shadow-2xl md:hidden"
            >
              <ul className="space-y-3">
                {navItems.map(({ href, label, type }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => {
                        handleNavClick(e, href, type)
                        setMobileOpen(false)
                        onTrackedClick(label, 'navigation_mobile')
                      }}
                      className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={(e) => {
                  handleNavClick(e, '#contact', 'anchor')
                  setMobileOpen(false)
                  onTrackedClick(t('bookCall'), 'navigation_mobile_drawer')
                }}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg"
              >
                {t('bookCall')}
              </a>

              <button
                onClick={() => setMobileOpen(false)}
                className="mt-auto rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"
              >
                {t('closeMenu')}
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <a
        href="#contact"
        onClick={(e) => {
          handleNavClick(e, '#contact', 'anchor')
          onTrackedClick(t('bookCall'), 'sticky_mobile_cta')
        }}
        className={`fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(30,64,175,0.35)] md:hidden ${mobileOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      >
        {t('bookCall')}
      </a>
    </>
  )
}

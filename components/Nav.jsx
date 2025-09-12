'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function Nav() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const t = useTranslations('nav')
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: '#home',     label: t('home',     { default: 'Home' }),     type: 'anchor' },
    { href: '#about',    label: t('about',    { default: 'About' }),    type: 'anchor' }, // <-- prevod
    { href: '#services', label: t('services', { default: 'Services' }), type: 'anchor' },
    { href: '#projects', label: t('projects', { default: 'Projects' }), type: 'anchor' },
    { href: '#contact',  label: t('contact',  { default: 'Contact' }),  type: 'anchor' },
    { href: '/api/cv',   label: t('cv',       { default: 'CV' }),       type: 'external' }
  ]

  const handleNavClick = (e, href, type) => {
    if (type !== 'anchor') return
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-500
        backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30
        ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            text-2xl font-bold uppercase tracking-wide
            ${scrolled
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'
              : 'text-white'}
          `}
        >
          PA
        </motion.span>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-8">
            {navItems.map(({ href, label, type }) => (
              <li key={href} className="group">
                <motion.a
                  href={href}
                  className={`
                    relative uppercase font-medium transition-colors
                    ${scrolled
                      ? 'text-gray-800 dark:text-gray-300 hover:text-primary dark:hover:text-secondary'
                      : 'text-white hover:text-accent'}
                  `}
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => {
                    handleNavClick(e, href, type)
                    if (typeof window !== 'undefined' && window.trackCTA) {
                      window.trackCTA('navigation', label)
                    }
                  }}
                >
                  {label}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[2px]
                      ${scrolled ? 'bg-primary' : 'bg-white'}
                      w-0 group-hover:w-full transition-all duration-300
                    `}
                  />
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Language Switcher */}
          <LanguageSwitcher scrolled={scrolled} />

          {/* Theme toggle */}
          {mounted && (
            <motion.button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className={`
                p-2 rounded-full transition hover:scale-110
                ${scrolled ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white/30 dark:bg-gray-800/30'}
              `}
              aria-label="Toggle light/dark"
            >
              {resolvedTheme === 'dark' ? '🌞' : '🌙'}
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  )
}

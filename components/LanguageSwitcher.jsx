'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from '../i18n/navigation'
import { useLocale } from 'next-intl'

const LANGS = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
]

// Pages whose slug differs per locale (createSharedPathnamesNavigation assumes
// identical slugs, so these need a manual swap when the language changes).
const LOCALIZED_SLUGS = {
  '/pricing': { sr: '/cenovnik' },
  '/cenovnik': { en: '/pricing' },
  '/contact': { sr: '/kontakt' },
  '/kontakt': { en: '/contact' },
}

function localizePath(path, newLocale) {
  const override = LOCALIZED_SLUGS[path]?.[newLocale]
  return override || path
}

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [optimistic, setOptimistic] = useState(null)
  const ref = useRef(null)

  useEffect(() => setMounted(true), [])
  useEffect(() => setOptimistic(null), [locale])

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onEsc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onEsc)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onEsc) }
  }, [])

  const active = optimistic || locale
  const current = LANGS.find((l) => l.code === active) || LANGS[0]

  const changeLanguage = (newLocale) => {
    setOpen(false)
    setOptimistic(newLocale)
    const pathWithoutLocale = pathname.replace(/^\/(sr|en)(?=\/|$)/, '') || '/'
    const localizedPath = localizePath(pathWithoutLocale, newLocale)
    router.push(localizedPath, { locale: newLocale })
    if (typeof window !== 'undefined' && window.trackLanguageChange) window.trackLanguageChange(locale, newLocale)
  }

  if (!mounted) return null

  return (
    <div ref={ref} className="relative z-50">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-line bg-ink-800/70 hover:border-teal-bright/50 transition-colors font-mono text-xs font-semibold tracking-wider text-paper"
        aria-expanded={open} aria-haspopup="listbox" aria-label="Choose language"
      >
        <span>{current.code.toUpperCase()}</span>
        <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 rounded-lg border border-line bg-ink-800/95 backdrop-blur-md shadow-lift overflow-hidden"
          >
            {LANGS.map((lang) => {
              const isActive = active === lang.code
              return (
                <button
                  key={lang.code}
                  role="option" aria-selected={isActive}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${isActive ? 'bg-ink-700' : 'hover:bg-ink-700/60'}`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="font-mono text-xs tracking-wider text-paper">{lang.name}</span>
                  {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-bright" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

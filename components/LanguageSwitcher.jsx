'use client'
import {useEffect, useRef, useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {useRouter, usePathname} from '../i18n/navigation'
import {useLocale} from 'next-intl'
import {useTheme} from 'next-themes'

const LANGS = [
  { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

export default function LanguageSwitcher({ scrolled = false }) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()                 // ← tačan, reaktivan locale iz next-intl
  const { resolvedTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [optimistic, setOptimistic] = useState(null) // ← za trenutni vizuelni update
  const ref = useRef(null)

  useEffect(() => setMounted(true), [])
  useEffect(() => setOptimistic(null), [locale])      // posle navigacije vrati se na realno stanje

  useEffect(() => {
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onEsc = e => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onEsc)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onEsc) }
  }, [])

  const currentLang = LANGS.find(l => l.code === (optimistic || locale)) || LANGS[0]

  const changeLanguage = (newLocale) => {
    setOpen(false)
    setOptimistic(newLocale) // ← odmah preboji tačku

    // skini stari locale prefiks sa početka rute (npr. /sr/xxx -> /xxx)
    const pathWithoutLocale = pathname.replace(/^\/(sr|en)(?=\/|$)/, '') || '/'
    router.push(pathWithoutLocale, { locale: newLocale })

    if (typeof window !== 'undefined' && window.trackLanguageChange) {
      window.trackLanguageChange(locale, newLocale)
    }
  }

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'
  const pillClasses = scrolled
    ? `border backdrop-blur-md ${isDark ? 'bg-gray-800/70 border-gray-600/40 text-gray-100' : 'bg-gray-100/70 border-gray-300/50 text-gray-800'}`
    : `border backdrop-blur-md ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white/15 border-white/25 text-white'}`

  const dropdownClasses = isDark
    ? 'bg-gray-900/90 border-gray-700/50 text-gray-100'
    : 'bg-white/90 border-gray-200/70 text-gray-800'

  const itemHover  = isDark ? 'hover:bg-gray-800/60' : 'hover:bg-gray-100/70'
  const itemActive = isDark ? 'bg-gray-800/70'  : 'bg-gray-100/70'
  const dotColor   = isDark ? 'bg-sky-400'      : 'bg-sky-500'

  return (
    <div ref={ref} className="relative z-50">
      <motion.button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl shadow-sm hover:shadow transition text-sm font-semibold ${pillClasses}`}
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        aria-expanded={open} aria-haspopup="listbox" aria-label="Choose language"
      >
        <span className="text-base">{currentLang.flag}</span>
        <span>{currentLang.code.toUpperCase()}</span>
        <svg className="w-4 h-4 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className={`absolute right-0 mt-2 w-44 rounded-xl border backdrop-blur-md shadow-2xl overflow-hidden ${dropdownClasses}`}
          >
            {LANGS.map((lang, i) => {
              const active = (optimistic || locale) === lang.code // ← aktivno odmah
              return (
                <button
                  key={lang.code}
                  role="option" aria-selected={active}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition
                    ${active ? itemActive : itemHover}
                    ${i === 0 ? 'rounded-t-xl' : ''} ${i === LANGS.length - 1 ? 'rounded-b-xl' : ''}`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                  {active && <span className={`ml-auto inline-flex h-2.5 w-2.5 rounded-full ${dotColor}`} />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

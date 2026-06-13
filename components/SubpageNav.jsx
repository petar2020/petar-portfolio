'use client'
import { useRouter } from 'next/router'
import LanguageSwitcher from './LanguageSwitcher'

export default function SubpageNav({ backLabel }) {
  const router = useRouter()
  const locale = router.query?.locale || 'en'

  return (
    <nav className="fixed top-0 w-full z-50 bg-ink-900/85 backdrop-blur-md border-b border-line">
      <div className="container mx-auto max-w-6xl flex items-center justify-between py-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <a href={`/${locale}`} className="flex items-center gap-2.5 group">
            <span className="h-2 w-2 bg-amber" aria-hidden />
            <span className="font-mono text-sm font-bold tracking-[0.2em] text-paper">PA</span>
            <span className="hidden sm:inline callsign !text-[0.6rem] text-paper-faint group-hover:text-teal-bright transition-colors">
              / FULL-STACK
            </span>
          </a>
          <a
            href={`/${locale}`}
            className="font-mono text-xs text-paper-dim hover:text-teal-bright transition-colors"
          >
            <span aria-hidden>←</span> {backLabel}
          </a>
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  )
}

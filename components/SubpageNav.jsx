'use client'
import { useRouter } from 'next/router'
import LanguageSwitcher from './LanguageSwitcher'

export default function SubpageNav({ backLabel }) {
  const router = useRouter()
  const locale = router.query?.locale || 'en'

  return (
    <nav className="fixed top-0 w-full z-50 bg-ink-900/90 backdrop-blur-md border-b border-line">
      <div className="container mx-auto max-w-6xl flex items-center justify-between py-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <a href={`/${locale}`} className="flex items-center gap-1 shrink-0">
            <span className="font-display text-lg font-bold tracking-tight text-paper">Petar Arsić</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
          </a>
          <a
            href={`/${locale}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-paper-dim hover:text-paper transition-colors"
          >
            <span aria-hidden>←</span> {backLabel}
          </a>
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  )
}

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { industries } from '../data/industries'
import { comparisons } from '../data/comparisons'

// Combined registry of every industry/comparison content page, looked up by
// a locale-agnostic id. `pageLinks.<id>.label`/`.description` hold the
// per-locale copy; the URL slug comes from data/industries.js or
// data/comparisons.js so it can differ between /sr/ and /en/.
const REGISTRY = [...industries, ...comparisons]

export default function RelatedPages({ ids, locale, title, descriptions = false }) {
  const t = useTranslations('pageLinks')
  const items = ids.map((id) => REGISTRY.find((item) => item.id === id)).filter(Boolean)
  return (
    <div>
      <h2 className="font-display font-bold text-paper text-xl sm:text-2xl">{title}</h2>
      <ul className={descriptions ? 'mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3' : 'mt-4 flex flex-wrap gap-x-5 gap-y-3'}>
        {items.map((meta) => (
          <li key={meta.id} className={descriptions ? 'rounded-2xl border border-line bg-ink-800 p-5' : ''}>
            <Link href={`/${locale}/${meta.slugs[locale]}`} className="font-semibold text-teal-bright hover:text-amber underline decoration-line-strong underline-offset-4">{t(`${meta.id}.label`)}</Link>
            {descriptions && <p className="mt-3 text-sm leading-relaxed text-paper-dim">{t(`${meta.id}.description`)}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

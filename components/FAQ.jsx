'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionHeader from './ui/SectionHeader'

export default function FAQ() {
  const t = useTranslations('faq')
  const items = t.raw('items')

  return (
    <section id="faq" className="relative grain bg-ink-850 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader callsign={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 divide-y divide-line border-y border-line">
          {items.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <h3 className="font-display font-semibold text-paper text-lg group-hover:text-teal-bright transition-colors">
          {question}
        </h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-xl font-mono text-paper-faint"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-paper-dim leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

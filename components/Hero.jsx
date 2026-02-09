'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')
  const reduceMotion = useReducedMotion()
  const chips = Array.isArray(t.raw('chips')) ? t.raw('chips') : []
  const trustNames = Array.isArray(t.raw('trustNames')) ? t.raw('trustNames') : []

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#070f22] via-[#0b1e40] to-[#070f22] pb-16 pt-28 md:pb-20 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#38bdf8_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl md:h-80 md:w-80"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.45 }}
          className="text-center md:text-left"
        >
          <p className="inline-flex rounded-full border border-sky-300/45 bg-sky-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-100">
            {t('badge')}
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-[3.35rem]">
            {t('title')}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200/95 sm:text-lg md:mx-0">
            {t('subtitle')}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-xl border border-white/20 bg-white/8 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_14px_30px_rgba(56,189,248,0.35)] transition hover:brightness-110"
            >
              {t('primaryCta')}
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/7 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/12"
            >
              {t('secondaryCta')}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.5, delay: 0.05 }}
          className="mx-auto w-full max-w-[18.5rem] sm:max-w-[20rem] md:max-w-[20.5rem]"
        >
          <div className="relative rounded-3xl border border-white/18 bg-gradient-to-b from-white/18 to-white/7 p-4 shadow-2xl backdrop-blur-sm md:p-5">
            <div className="absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-tr from-sky-500/30 to-indigo-500/25 blur-xl" />
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/avatar.png"
                alt="Petar Arsic"
                width={600}
                height={600}
                priority
                sizes="(max-width: 768px) 74vw, 330px"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto mt-10 max-w-6xl px-4 md:px-6">
        <div className="rounded-2xl border border-white/15 bg-white/7 px-5 py-4 backdrop-blur-sm">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
            {t('trustTitle')}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
            {trustNames.map((name) => (
              <span key={name} className="rounded-lg bg-white/8 px-3 py-2 text-sm font-semibold text-slate-100">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

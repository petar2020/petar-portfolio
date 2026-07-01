'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaPaperPlane, FaGithub, FaLinkedin } from 'react-icons/fa'
import SectionHeader from './ui/SectionHeader'

export default function Contact() {
  const t = useTranslations('contact')
  const locale = useLocale()

  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus(null)
    if (!formData.name.trim() || !formData.email.trim() || formData.message.trim().length < 10) {
      setSubmitStatus('error')
      return
    }
    if (formData.website) { setSubmitStatus('success'); return } // honeypot

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
      })
      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '', website: '' })
        if (typeof window !== 'undefined' && window.trackContactSubmission) window.trackContactSubmission(true)
      } else {
        setSubmitStatus('error')
        if (typeof window !== 'undefined' && window.trackContactSubmission) window.trackContactSubmission(false)
      }
    } catch {
      setSubmitStatus('error')
      if (typeof window !== 'undefined' && window.trackContactSubmission) window.trackContactSubmission(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputCls =
    'w-full p-4 bg-ink-900 border border-line text-paper placeholder:text-paper-faint focus:border-teal-bright outline-none transition-colors font-sans'

  const infoRows = [
    { Icon: FaMapMarkerAlt, title: t('locationTitle'), value: t('location'), href: null },
    { Icon: FaEnvelope, title: 'Email', value: 'petar.arsic14@hotmail.com', href: 'mailto:petar.arsic14@hotmail.com' },
    { Icon: FaPhoneAlt, title: t('phoneTitle'), value: '+381 62 11 755 96', href: 'tel:+381621175596' },
  ]

  return (
    <section id="contact" className="relative grain bg-ink-850 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="11" callsign="Contact" title={t('title')} subtitle={t('subtitle')} status="amber" />

        <div className="mt-12 grid lg:grid-cols-2 gap-px bg-line border border-line">
          {/* form */}
          <form className="bg-ink-800 p-6 sm:p-8 space-y-5" onSubmit={handleSubmit}>
            <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="hidden" tabIndex={-1} autoComplete="off" />

            {['name', 'email', 'message'].map((field) => (
              <div key={field}>
                <label className="callsign !text-[0.6rem] block mb-2">{t(field)}</label>
                {field !== 'message' ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={t(field)}
                    required
                    className={inputCls}
                  />
                ) : (
                  <textarea name={field} value={formData[field]} onChange={handleInputChange} rows={5} minLength={10} placeholder={t(field)} required className={`${inputCls} resize-none`} />
                )}
              </div>
            ))}

            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border font-mono text-sm ${submitStatus === 'success' ? 'border-teal text-teal-bright' : 'border-signal-danger text-signal-danger'}`}
              >
                {submitStatus === 'success' ? t('success') : t('error')}
              </motion.div>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-signal w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? t('sending') : t('send')}
              <FaPaperPlane className={isSubmitting ? 'animate-spin' : ''} />
            </button>
          </form>

          {/* info */}
          <div className="bg-ink-800 p-6 sm:p-8 flex flex-col">
            <div className="space-y-px bg-line border border-line">
              {infoRows.map(({ Icon, title, value, href }, i) => (
                <div key={i} className="bg-ink-900 p-5 flex items-start gap-4">
                  <span className="mt-0.5 text-teal-bright"><Icon /></span>
                  <div>
                    <h3 className="callsign !text-[0.6rem]">{title}</h3>
                    {href ? (
                      <a href={href} className="mt-1 block font-mono text-sm text-paper hover:text-amber transition-colors break-all">{value}</a>
                    ) : (
                      <p className="mt-1 font-mono text-sm text-paper">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* availability — hiring signal for recruiters / clients */}
            <div className="mt-6 border border-teal-deep/60 bg-teal-deep/10 p-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-bright animate-pulse" aria-hidden />
                <h4 className="callsign !text-[0.6rem] text-teal-bright">{t('availabilityTitle')}</h4>
              </div>
              <p className="mt-3 text-sm text-paper leading-relaxed">{t('availability')}</p>
              <p className="mt-1.5 font-mono text-xs text-paper-dim">{t('locationMode')}</p>
              <div className="mt-4 pt-4 border-t border-line">
                <span className="callsign !text-[0.6rem]">{t('stackTitle')}</span>
                <p className="mt-1.5 font-mono text-xs text-paper">{t('stackValue')}</p>
              </div>
            </div>

            <div className="mt-6 border border-line p-5">
              <h4 className="callsign !text-[0.6rem]">{t('hoursTitle')}</h4>
              <p className="mt-2 whitespace-pre-line font-mono text-sm text-paper-dim">{t('hours')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="mt-24 border-t border-line">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-md">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 bg-amber" />
                <span className="font-mono text-sm font-bold tracking-[0.2em] text-paper">PETAR ARSIĆ</span>
              </div>
              <p className="mt-4 text-sm text-paper-dim leading-relaxed">{t('footerBio')}</p>
            </div>

            <div className="flex gap-3">
              {[
                { Icon: FaGithub, url: 'https://github.com/petar2020' },
                { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/petar-arsic-2067821b5/' },
              ].map(({ Icon, url }, idx) => (
                <motion.a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="p-3 border border-line text-paper-dim hover:border-teal-bright hover:text-teal-bright transition-colors"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="callsign !text-[0.62rem] text-paper-faint">
              © {new Date().getFullYear()} · {t('copyright')}
            </p>
            <div className="flex items-center gap-6">
              <Link href={`/${locale}/services`} className="callsign !text-[0.62rem] text-paper-faint hover:text-teal-bright transition-colors">
                {t('servicesLink', { default: 'Services' })}
              </Link>
              <Link href={`/${locale}/case-study/drivesoft`} className="callsign !text-[0.62rem] text-paper-faint hover:text-teal-bright transition-colors">
                {t('caseStudyLink', { default: 'Case Study' })}
              </Link>
              <a href="#contact" className="callsign !text-[0.62rem] text-paper-faint hover:text-teal-bright transition-colors">
                {t('contactLink', { default: 'Contact' })}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}

'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa'
import SectionHeader from './ui/SectionHeader'

export default function Contact() {
  const t = useTranslations('contact')

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
    'w-full p-4 rounded-xl bg-ink-900 border border-line text-paper placeholder:text-paper-faint focus:border-amber outline-none transition-colors font-sans'

  const infoRows = [
    { Icon: FaMapMarkerAlt, title: t('locationTitle'), value: t('location'), href: null },
    { Icon: FaEnvelope, title: 'Email', value: 'petar.arsic14@hotmail.com', href: 'mailto:petar.arsic14@hotmail.com' },
    { Icon: FaPhoneAlt, title: t('phoneTitle'), value: '+381 62 11 755 96', href: 'tel:+381621175596' },
  ]

  return (
    <section id="contact" className="relative bg-ink-900 border-t border-line py-20 sm:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader index="08" callsign="Contact" title={t('title')} subtitle={t('subtitle')} status="amber" />

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {/* form */}
          <form className="rounded-2xl border border-line bg-ink-800 shadow-panel p-6 sm:p-8 space-y-5" onSubmit={handleSubmit}>
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
                className={`p-4 rounded-xl border font-sans text-sm ${submitStatus === 'success' ? 'border-teal text-teal-bright' : 'border-signal-danger text-signal-danger'}`}
              >
                {submitStatus === 'success' ? t('success') : t('error')}
              </motion.div>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-pill-dark w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? t('sending') : t('send')}
              <FaPaperPlane aria-hidden="true" className={isSubmitting ? 'animate-spin' : ''} />
            </button>
          </form>

          {/* info */}
          <div className="rounded-2xl border border-line bg-ink-800 shadow-panel p-6 sm:p-8 flex flex-col">
            <div className="space-y-3">
              {infoRows.map(({ Icon, title, value, href }, i) => (
                <div key={i} className="rounded-xl bg-ink-850 p-5 flex items-start gap-4">
                  <span className="mt-0.5 text-amber"><Icon aria-hidden="true" /></span>
                  <div>
                    <h3 className="callsign !text-[0.6rem]">{title}</h3>
                    {href ? (
                      <a href={href} className="mt-1 block text-sm text-paper hover:text-amber transition-colors break-all">{value}</a>
                    ) : (
                      <p className="mt-1 text-sm text-paper">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* availability — hiring signal for recruiters / clients */}
            <div className="mt-4 rounded-xl border border-amber/25 bg-amber/5 p-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" aria-hidden />
                <h4 className="callsign !text-[0.6rem] text-amber">{t('availabilityTitle')}</h4>
              </div>
              <p className="mt-3 text-sm text-paper leading-relaxed">{t('availability')}</p>
              <p className="mt-1.5 text-xs text-paper-dim">{t('locationMode')}</p>
              <div className="mt-4 pt-4 border-t border-line">
                <span className="callsign !text-[0.6rem]">{t('stackTitle')}</span>
                <p className="mt-1.5 text-xs text-paper">{t('stackValue')}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-line p-5">
              <h4 className="callsign !text-[0.6rem]">{t('hoursTitle')}</h4>
              <p className="mt-2 whitespace-pre-line text-sm text-paper-dim">{t('hours')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

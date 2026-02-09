'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FaCalendarAlt, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'

export default function Contact() {
  const t = useTranslations('contact')
  const tf = useTranslations('footer')
  const reduceMotion = useReducedMotion()

  const projectTypeOptions = Array.isArray(t.raw('projectTypeOptions')) ? t.raw('projectTypeOptions') : []
  const budgetOptions = Array.isArray(t.raw('budgetOptions')) ? t.raw('budgetOptions') : []
  const timelineOptions = Array.isArray(t.raw('timelineOptions')) ? t.raw('timelineOptions') : []
  const contactMethodOptions = Array.isArray(t.raw('contactMethodOptions')) ? t.raw('contactMethodOptions') : []

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    contactMethod: '',
    message: '',
    website: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus(null)

    const requiredFields = [
      formData.name,
      formData.email,
      formData.projectType,
      formData.budget,
      formData.timeline,
      formData.contactMethod,
      formData.message
    ]

    if (requiredFields.some((value) => !value.trim()) || formData.message.trim().length < 10) {
      setSubmitStatus('error')
      return
    }

    if (formData.website) {
      setSubmitStatus('success')
      return
    }

    setIsSubmitting(true)

    const enrichedMessage = [
      formData.message.trim(),
      '',
      `--- ${t('funnelTitle')} ---`,
      `${t('projectType')}: ${formData.projectType}`,
      `${t('budget')}: ${formData.budget}`,
      `${t('timeline')}: ${formData.timeline}`,
      `${t('contactMethod')}: ${formData.contactMethod}`
    ].join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: enrichedMessage
        })
      })

      if (!res.ok) throw new Error('Request failed')

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        timeline: '',
        contactMethod: '',
        message: '',
        website: ''
      })

      if (typeof window !== 'undefined' && window.trackContactSubmission) {
        window.trackContactSubmission(true)
      }
    } catch {
      setSubmitStatus('error')
      if (typeof window !== 'undefined' && window.trackContactSubmission) {
        window.trackContactSubmission(false)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldBase =
    'w-full rounded-xl border border-gray-300 bg-white p-3.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-sky-400 dark:focus:ring-sky-900'

  return (
    <>
      <section
        id="contact"
        className="relative scroll-mt-24 bg-gradient-to-b from-gray-100 to-gray-50 py-20 dark:from-gray-950 dark:to-gray-900"
      >
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={reduceMotion ? undefined : { duration: 0.4 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-white">{t('title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base dark:text-gray-300">{t('subtitle')}</p>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.form
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={reduceMotion ? undefined : { duration: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('name')}
                  required
                  className={fieldBase}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('email')}
                  required
                  className={fieldBase}
                />
              </div>

              <h3 className="pt-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">{t('funnelTitle')}</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <select name="projectType" value={formData.projectType} onChange={handleInputChange} required className={fieldBase}>
                  <option value="">{t('projectType')}</option>
                  {projectTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select name="budget" value={formData.budget} onChange={handleInputChange} required className={fieldBase}>
                  <option value="">{t('budget')}</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <select name="timeline" value={formData.timeline} onChange={handleInputChange} required className={fieldBase}>
                  <option value="">{t('timeline')}</option>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleInputChange}
                  required
                  className={fieldBase}
                >
                  <option value="">{t('contactMethod')}</option>
                  {contactMethodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                minLength={10}
                placeholder={t('message')}
                required
                className={`${fieldBase} resize-none`}
              />

              {submitStatus && (
                <div
                  className={`rounded-xl p-3 text-sm font-medium ${
                    submitStatus === 'success'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/25 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/25 dark:text-red-200'
                  }`}
                >
                  {submitStatus === 'success' ? t('success') : t('error')}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? t('sending') : t('send')}
              </button>
            </motion.form>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={reduceMotion ? undefined : { duration: 0.4, delay: 0.05 }}
              className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <InfoRow icon={FaMapMarkerAlt} title={t('locationTitle')} value={t('locationValue')} />
              <InfoRow icon={FaEnvelope} title={t('emailTitle')} value="petar.arsic14@hotmail.com" href="mailto:petar.arsic14@hotmail.com" />
              <InfoRow icon={FaPhoneAlt} title={t('phoneTitle')} value="+381 62 11 755 96" href="tel:+381621175596" />
              <InfoRow icon={FaMapMarkerAlt} title={t('hoursTitle')} value={t('hoursValue')} multiline />

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                <div className="flex items-start gap-3">
                  <span className="mt-1 rounded-full bg-sky-100 p-2 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300">
                    <FaCalendarAlt />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{t('scheduleTitle')}</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('scheduleText')}</p>
                  </div>
                </div>
                <a
                  href={t('scheduleUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
                >
                  {t('scheduleButton')}
                </a>
              </div>

              <div className="border-t border-gray-200 pt-5 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('asyncLabel')}</p>
                <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">petar.arsic14@hotmail.com</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-10 text-gray-300">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Petar Arsic</h3>
            <p className="mt-2 max-w-md text-sm text-gray-400">{t('footerBio')}</p>
          </div>

          <div className="flex items-center gap-3">
            <Social href="https://github.com/petar2020" icon={FaGithub} label="GitHub" />
            <Social href="https://linkedin.com/in/petararsic" icon={FaLinkedin} label="LinkedIn" />
          </div>
        </div>

        <div className="container mx-auto mt-8 max-w-6xl border-t border-gray-800 px-4 pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {tf('rights')} • {tf('madeWith')}
          </p>
        </div>
      </footer>
    </>
  )
}

function InfoRow({ icon: Icon, title, value, href, multiline = false }) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full bg-sky-100 p-3 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300">
        <Icon className="text-base" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">{title}</p>
        {href ? (
          <a href={href} className="mt-1 block text-sm font-semibold text-gray-900 hover:text-sky-600 dark:text-gray-100 dark:hover:text-sky-300">
            {value}
          </a>
        ) : (
          <p className={`mt-1 text-sm text-gray-800 dark:text-gray-100 ${multiline ? 'whitespace-pre-line' : ''}`}>{value}</p>
        )}
      </div>
    </div>
  )
}

function Social({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="rounded-full border border-gray-700 bg-gray-800 p-3 text-gray-200 transition hover:border-sky-400 hover:text-sky-300"
    >
      <Icon />
    </a>
  )
}

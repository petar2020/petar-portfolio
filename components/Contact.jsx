// src/components/Contact.jsx
'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa'

export default function Contact() {
  const t = useTranslations('contact')
  const tf = useTranslations('footer') // footer prevodi posebno
  const controls = useAnimation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '' // honeypot
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    controls.start('visible')
  }, [controls])

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, type: 'spring', stiffness: 100, damping: 10 }
    })
  }

  const hoverStyle = {
    y: -5,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 300, damping: 10 }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus(null)

    // front-end validacija
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error')
      return
    }
    if (formData.message.trim().length < 10) {
      setSubmitStatus('error')
      return
    }
    // honeypot – ako je popunjeno, prekidamo
    if (formData.website) {
      setSubmitStatus('success') // lažni success da bot ne vidi razliku
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '', website: '' })
        if (typeof window !== 'undefined' && window.trackContactSubmission) {
          window.trackContactSubmission(true)
        }
      } else {
        setSubmitStatus('error')
        if (typeof window !== 'undefined' && window.trackContactSubmission) {
          window.trackContactSubmission(false)
        }
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

  return (
    <>
      <section
        id="contact"
        className="relative py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 scroll-mt-24"
      >
        {/* bg */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
            <motion.div
              className="mx-auto mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* form */}
            <motion.form
              initial="hidden"
              animate={controls}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              {/* honeypot (skriveno) */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {['name','email','message'].map((field, i) => (
                <motion.div key={field} custom={i} variants={itemVariants} whileHover={hoverStyle}>
                  {field !== 'message' ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={t(field)}
                      required
                      className="w-full p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary dark:focus:border-secondary focus:ring-2 ring-primary/20 outline-none transition-all shadow-sm"
                    />
                  ) : (
                    <textarea
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      rows={5}
                      minLength={10}
                      placeholder={t(field)}
                      required
                      className="w-full p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary dark:focus:border-secondary focus:ring-2 ring-primary/20 outline-none transition-all resize-none shadow-sm"
                    />
                  )}
                </motion.div>
              ))}

              {/* status */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-center ${
                    submitStatus === 'success' 
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                      : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                  }`}
                >
                  {submitStatus === 'success' ? t('success') : t('error')}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                custom={3}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('sending') : t('send')}
                <motion.div
                  animate={isSubmitting ? { rotate: 360 } : { x: [0, 5, 0], rotate: [0, 10, 0] }}
                  transition={isSubmitting ? { repeat: Infinity, duration: 1 } : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  <FaPaperPlane />
                </motion.div>
              </motion.button>
            </motion.form>

            {/* info */}
            <motion.div
              initial="hidden"
              animate={controls}
              className="space-y-8 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <motion.div custom={0} variants={itemVariants} className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary dark:text-secondary">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Serbia
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Belgrade, Serbia
                  </p>
                </div>
              </motion.div>

           <motion.div custom={1} variants={itemVariants} className="flex items-start gap-4">
  <div className="p-3 rounded-full bg-primary/10 text-primary dark:text-secondary">
    <FaEnvelope className="text-xl" />
  </div>
  <div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
      Email
    </h3>
    <a
      href="mailto:petar.arsic14@hotmail.com"
      className="text-blue-600 dark:text-blue-400 hover:underline break-all"
    >
      petar.arsic14@hotmail.com
    </a>
  </div>
</motion.div>

<motion.div custom={2} variants={itemVariants} className="flex items-start gap-4">
  <div className="p-3 rounded-full bg-primary/10 text-primary dark:text-secondary">
    <FaPhoneAlt className="text-xl" />
  </div>
  <div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
      Telefon
    </h3>
    <a href="tel:+381621175596" className="text-blue-600 dark:text-blue-400 hover:underline">
      +381 62 11 755 96
    </a>
  </div>
</motion.div>

<motion.div custom={3} variants={itemVariants} className="pt-6 border-t border-gray-200 dark:border-gray-700">
  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
    Radno vreme
  </h4>
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-full bg-primary/10 text-primary dark:text-secondary">
      <FaPaperPlane className="h-5 w-5" />
    </div>
    <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">
      Ponedeljak – Petak: 09:00 – 17:00{'\n'}Subota: 09:00 – 13:00
    </p>
  </div>
</motion.div>

            </motion.div>
          </div>
        </div>
      </section>

    {/* footer */}
<footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-12">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left"
      >
        <h3 className="text-2xl font-bold text-white mb-4">Petar Arsić</h3>
        <p className="max-w-md">
          Full-Stack developer posvećen izradi modernih i funkcionalnih digitalnih rešenja.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-6"
      >
        {[FaGithub, FaLinkedin, FaTwitter].map((Icon, idx) => (
          <motion.a
            key={idx}
            href={[
              'https://github.com/petar2020',
              'https://linkedin.com/in/petararsic',
              'https://twitter.com/petar2020'
            ][idx]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon />
          </motion.a>
        ))}
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-500"
    >
      <p>
        &copy; {new Date().getFullYear()} Sva prava zadržana. Napravljeno sa ❤️ od strane Petar Arsića.
      </p>
    </motion.div>
  </div>
</footer>

    </>
  )
}

// src/components/Services.jsx
'use client'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function Services() {
  const t = useTranslations('services')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const services = [
    {
      icon: '💻',
      title: t('webDev.title'),
      description: t('webDev.description'),
      features: t('webDev.features').split(', '),
    },
    {
      icon: '📱',
      title: t('mobileDev.title'),
      description: t('mobileDev.description'),
      features: t('mobileDev.features').split(', '),
    },
    {
      icon: '☁️',
      title: t('cloudDev.title'),
      description: t('cloudDev.description'),
      features: t('cloudDev.features').split(', '),
    },
    {
      icon: '🔧',
      title: t('devOps.title'),
      description: t('devOps.description'),
      features: t('devOps.features').split(', '),
    },
  ]

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-blue-900 to-gray-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#3B82F6_1px,_transparent_1px)] bg-[length:25px_25px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-16">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  {service.description}
                </p>
                <ul className="text-left space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="text-blue-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
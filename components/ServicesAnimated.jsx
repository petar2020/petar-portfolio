// src/components/ServicesAnimated.jsx
'use client'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function ServicesAnimated() {
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
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const services = [
    {
      icon: '🚀',
      title: t('webDev.title'),
      description: t('webDev.description'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '📱',
      title: t('mobileDev.title'),
      description: t('mobileDev.description'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '☁️',
      title: t('cloudDev.title'),
      description: t('cloudDev.description'),
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: '🔧',
      title: t('devOps.title'),
      description: t('devOps.description'),
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-gray-900 to-blue-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#3B82F6_1px,_transparent_1px)] bg-[length:30px_30px]" />
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
              className="group relative"
              whileHover={{ y: -20, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`bg-gradient-to-br ${service.color} p-1 rounded-2xl shadow-2xl`}>
                <div className="bg-gray-900 rounded-2xl p-6 h-full">
                  <div className="text-center">
                    <motion.div
                      className="text-5xl mb-4 inline-block"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating particles */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-60"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full opacity-60"
                animate={{ 
                  y: [0, 10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
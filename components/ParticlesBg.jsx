'use client'
import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import { loadFull } from 'tsparticles'

export default function ParticlesBg() {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fpsLimit: 60,
        interactivity: { events: { onHover: { enable: true, mode: 'repulse' } } },
        particles: {
          color: { value: '#2563eb' },
          links: { enable: true, color: '#2563eb', distance: 150 },
          move: { enable: true, speed: 1 },
          number: { value: 50 },
          opacity: { value: 0.3 },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  )
}

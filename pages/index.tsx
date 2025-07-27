// pages/index.tsx

import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine)
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: '#000000',
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: '#6366f1' },
            links: {
              color: '#6366f1',
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'none',
              outModes: { default: 'bounce' },
            },
            number: { value: 50 },
            opacity: { value: 0.3 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Welcome to <span className="text-indigo-400">CTools</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Reviving dead crypto projects through voting, community takeovers, and $CTOOLS rewards.
          </p>
          <Link href="/login">
            <button className="bg-indigo-600 hover:bg-indigo-700 transition-all px-6 py-3 rounded text-lg font-semibold shadow-lg">
              🚀 Login with Telegram
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

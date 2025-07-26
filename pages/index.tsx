import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        Welcome to CTools
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg text-center max-w-xl mb-8"
      >
        Reviving dead crypto projects through community voting, rewards, and takeovers.
      </motion.p>
      <Link
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-xl font-semibold"
      >
        Login with Telegram
      </Link>
    </main>
  )
}

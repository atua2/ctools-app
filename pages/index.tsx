import { motion } from 'framer-motion'
import Link from 'next/link'
import { Rocket, Users, CheckCircle, BadgeDollarSign } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4"
        >
          Welcome to CTools
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl text-lg mb-6 text-gray-300"
        >
          Reviving dead crypto projects through community voting, rewards, and takeovers.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded text-white text-lg"
          >
            Login with Telegram
          </Link>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Rocket size={40} />,
              title: 'Submit a Token',
              text: 'Find abandoned or scam tokens and submit them for review.',
            },
            {
              icon: <Users size={40} />,
              title: 'Vote Once Daily',
              text: 'Help choose which project deserves revival by voting daily.',
            },
            {
              icon: <CheckCircle size={40} />,
              title: 'Community CTOs',
              text: 'Top-voted tokens get revived by the community & CTools team.',
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg text-center"
            >
              <div className="text-blue-400 mb-4 mx-auto">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <BadgeDollarSign size={40} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Earn $CTOOLS for Contributing</h2>
          <p className="text-gray-300 mb-6">
            Every action — submitting tokens, voting, participating in revivals — earns you
            points. These can later be converted into $CTOOLS, our official utility token.
          </p>
          <Link
            href="/tokens"
            className="inline-block bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded text-white text-lg"
          >
            Start Voting
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CTools. All rights reserved.
      </footer>
    </div>
  )
}

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/whitepaper',  label: 'Whitepaper' },  // ← new
  { href: '/tokens', label: 'Tokens' },
  { href: '/login', label: 'Login' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <a className="text-2xl font-bold text-white">CTools</a>
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex space-x-6 text-white">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="hover:text-indigo-400">{link.label}</a>
            </Link>
          ))}
        </div>

        {/* mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/90"
          >
            <div className="flex flex-col p-4 space-y-4">
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    onClick={() => setOpen(false)}
                    className="text-lg text-white hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

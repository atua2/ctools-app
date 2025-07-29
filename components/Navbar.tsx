import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiMenu, HiX } from 'react-icons/hi'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/whitepaper', label: 'Whitepaper' },
  { href: '/tokens', label: 'Tokens' }
]

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('ctools-user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('ctools-user')
    setUser(null)
    setOpen(false)
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo */}
        <Link href="/">
          <Image
            src="/fav-64x64.png"
            alt="CTools Logo"
            width={40}
            height={40}
            priority
            className="cursor-pointer"
          />
        </Link>

        {/* Right: Links and Telegram (desktop only) */}
        <div className="hidden md:flex items-center space-x-6 text-white">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-indigo-400">
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center space-x-2">
              <Image
                src={user.photo_url}
                alt="User"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{user.first_name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-400 hover:text-red-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                Login with Telegram
              </button>
            </Link>
          )}
        </div>

        {/* Mobile hamburger icon */}
        <div className="md:hidden">
          <button
            className="text-white text-2xl"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden bg-black/90 px-4 pb-4 space-y-3 text-white">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                onClick={() => setOpen(false)}
                className="block text-lg hover:text-indigo-400 cursor-pointer"
              >
                {link.label}
              </span>
            </Link>
          ))}
          {user ? (
            <div className="flex items-center space-x-2 pt-2">
              <Image
                src={user.photo_url}
                alt="User"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{user.first_name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-400 hover:text-red-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button
                onClick={() => setOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Login with Telegram
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

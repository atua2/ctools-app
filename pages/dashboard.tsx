// pages/dashboard.tsx

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import TriangleField from '../components/TriangleField'
import FloatingDotsBackground from '../components/FloatingDotsBackground'

interface Submission {
  _id: string
  name: string
}
interface VoteRecord {
  tokenId: string
  name: string
  votedAt: string
}

interface UserProfile {
  userId: string
  name: string
  points: number
  submissions: Submission[]
  votesToday: VoteRecord[]
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Redirect if no JWT
    const token = localStorage.getItem('jwt')
    if (!token) {
      router.replace('/login')
      return
    }

    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: { Authorization: `Bearer ${token}` },
    })

    api
      .get<UserProfile>(`/auth/profile`)
      .then((res) => {
        setProfile(res.data)
      })
      .catch((err) => {
        console.error('Failed to fetch profile', err)
        // If unauthorized, redirect to login
        router.replace('/login')
      })
      .finally(() => setLoading(false))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    router.replace('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading your dashboard…</p>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white pt-20 px-4">
      {/* Background */}
      <TriangleField />
      <FloatingDotsBackground />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto space-y-8"
      >
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Hello, {profile.name}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Log out
          </button>
        </header>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Your Points</h2>
          <p className="text-4xl font-bold text-indigo-400">{profile.points}</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Submissions</h2>
          {profile.submissions.length ? (
            <ul className="space-y-2">
              {profile.submissions.map((sub) => (
                <li key={sub._id}>
                  <Link href={`/token/${sub._id}`}>
                    <a className="text-indigo-400 hover:underline">{sub.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">You haven’t submitted any tokens yet.</p>
          )}
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Votes Cast Today</h2>
          {profile.votesToday.length ? (
            <ul className="space-y-2">
              {profile.votesToday.map((v) => (
                <li key={v.tokenId}>
                  <Link href={`/token/${v.tokenId}`}>
                    <a className="text-indigo-400 hover:underline">
                      {v.name}
                    </a>
                  </Link>{' '}
                  <span className="text-gray-500 text-sm">
                    (at {new Date(v.votedAt).toLocaleTimeString()})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">You haven’t voted today.</p>
          )}
        </section>
      </motion.div>
    </div>
  )
}

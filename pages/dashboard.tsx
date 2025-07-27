import { useEffect, useState } from 'react'
import axios from 'axios'

interface Token {
  name: string
  symbol: string
  chain: string
  contractAddress: string
  description: string
  votes: number
}

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [points, setPoints] = useState(0)
  const [submittedTokens, setSubmittedTokens] = useState<Token[]>([])
  const [votedTokens, setVotedTokens] = useState<Token[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      window.location.href = '/login'
      return
    }
    const parsed = JSON.parse(stored)
    setUserId(parsed.userId)
    setName(parsed.name)
    fetchDashboard(parsed.userId)
  }, [])

  const fetchDashboard = async (userId: string) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/${userId}`)
      setPoints(res.data.points)
      setSubmittedTokens(res.data.submittedTokens || [])
      setVotedTokens(res.data.votedTokens || [])
    } catch (err) {
      console.error('Error loading dashboard:', err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome, {name}</h1>
      <p className="mb-6 text-lg">
        🪙 <strong>Your Points:</strong> {points}
      </p>

      {/* Submitted Tokens */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📤 Your Submitted Tokens</h2>
        {submittedTokens.length === 0 ? (
          <p className="text-gray-400">You haven’t submitted any tokens yet.</p>
        ) : (
          submittedTokens.map((token, i) => (
            <div key={i} className="bg-gray-800 rounded p-4 mb-3 text-white">
              <h3 className="font-bold">
                {token.name} ({token.symbol}) – {token.chain}
              </h3>
              <p className="text-sm text-gray-300">{token.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Voted Tokens */}
      <div>
        <h2 className="text-xl font-semibold mb-2">🗳️ Tokens You Voted For</h2>
        {votedTokens.length === 0 ? (
          <p className="text-gray-400">You haven’t voted on any tokens yet.</p>
        ) : (
          votedTokens.map((token, i) => (
            <div key={i} className="bg-gray-700 rounded p-4 mb-3 text-white">
              <h3 className="font-bold">
                {token.name} ({token.symbol}) – {token.chain}
              </h3>
              <p className="text-sm text-gray-300">{token.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

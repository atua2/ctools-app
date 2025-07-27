import { useEffect, useState } from 'react'
import axios from 'axios'

interface Token {
  _id: string
  name: string
  symbol: string
  chain: string
  description: string
  votes: number
  isHidden?: boolean
  isCTO?: boolean
}

const ADMIN_IDS = ['123456789', '987654321'] // Replace with your Telegram user IDs

export default function AdminPanel() {
  const [userId, setUserId] = useState<string | null>(null)
  const [tokens, setTokens] = useState<Token[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      window.location.href = '/login'
      return
    }
    const { userId } = JSON.parse(stored)
    if (!ADMIN_IDS.includes(userId)) {
      alert('Access denied.')
      window.location.href = '/'
      return
    }
    setUserId(userId)
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tokens`)
      setTokens(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const promoteToCTO = async (tokenId: string) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/cto`, { tokenId })
      alert('Token promoted to CTO!')
      fetchTokens()
    } catch (err) {
      console.error(err)
    }
  }

  const hideToken = async (tokenId: string) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/hide`, { tokenId })
      fetchTokens()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">🛠 Admin Panel</h1>

      {tokens.length === 0 ? (
        <p>No tokens found.</p>
      ) : (
        tokens.map((token) => (
          <div
            key={token._id}
            className={`border p-4 rounded mb-4 bg-white shadow ${
              token.isCTO ? 'border-green-500' : ''
            }`}
          >
            <h2 className="text-xl font-semibold">
              {token.name} ({token.symbol}) – {token.chain}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{token.description}</p>
            <p className="text-sm">Votes: {token.votes}</p>
            <div className="mt-2 space-x-4">
              <button
                onClick={() => promoteToCTO(token._id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Promote to CTO
              </button>
              <button
                onClick={() => hideToken(token._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Hide
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// pages/token/[id].tsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import API from '../../utils/apiClient'

interface Token {
  _id: string
  name: string
  symbol: string
  chain: string
  contractAddress: string
  description: string
  votes: number
}

export default function TokenDetail() {
  const { query } = useRouter()
  const id = Array.isArray(query.id) ? query.id[0] : query.id
  const [token, setToken] = useState<Token | null>(null)
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    if (!id) return
    API.get<Token>(`/tokens/${id}`)
      .then(res => setToken(res.data))
      .catch(console.error)

    if (localStorage.getItem(`voted_${id}`)) {
      setHasVoted(true)
    }
  }, [id])

  const vote = async () => {
    if (!token || hasVoted) return
    try {
      await API.post('/votes', { tokenId: token._id })
      setToken({ ...token, votes: token.votes + 1 })
      setHasVoted(true)
      localStorage.setItem(`voted_${id}`, '1')
    } catch (err) {
      console.error(err)
      alert('Vote failed')
    }
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading…</p>
      </div>
    )
  }

  return (
    <div className="py-10 px-4 max-w-3xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-2">
        {token.name} <span className="text-gray-400">({token.symbol})</span>
      </h1>
      <p className="text-gray-300 mb-6">{token.description}</p>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <p>
          <strong>Chain:</strong> {token.chain}
        </p>
        <p>
          <strong>Contract:</strong>{' '}
          <code className="break-all">{token.contractAddress}</code>
        </p>
        <p>
          <strong>Votes:</strong> {token.votes}
        </p>
      </div>

      <button
        onClick={vote}
        disabled={hasVoted}
        className={`w-full py-3 rounded font-semibold ${
          hasVoted
            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {hasVoted ? 'Voted' : 'Vote for this Token'}
      </button>
    </div>
  )
}

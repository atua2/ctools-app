// pages/token/[id].tsx

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Token {
  _id: string
  name: string
  symbol: string
  chain: string
  contractAddress: string
  description: string
  votes: number
}

const mockTokens: Token[] = [
  {
    _id: '1',
    name: 'GhostChain',
    symbol: 'GHOST',
    chain: 'Ethereum',
    contractAddress: '0x1234deadbeefghost0001',
    description: 'Abandoned DeFi ghost project from 2022.',
    votes: 157,
  },
  {
    _id: '2',
    name: 'SolScam',
    symbol: 'SOLRUG',
    chain: 'Solana',
    contractAddress: 'SoLrugQWERTY12345',
    description: 'Rugged Solana project with unrealized hype.',
    votes: 89,
  },
]

export default function TokenDetail() {
  const router = useRouter()
  const { id } = router.query
  const [token, setToken] = useState<Token | null>(null)

  useEffect(() => {
    if (!id) return
    const found = mockTokens.find((t) => t._id === id)
    setToken(found || null)
  }, [id])

  if (!token) return <p className="p-6 text-center text-gray-300">Loading token...</p>

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-6 py-10 text-white"
    >
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-gray-700">
        <h1 className="text-4xl font-extrabold mb-3">
          {token.name} <span className="text-indigo-400">({token.symbol})</span>
        </h1>
        <p className="text-gray-400 mb-5 text-lg">{token.description}</p>

        <div className="space-y-2 text-sm bg-gray-800 p-4 rounded-md">
          <p>
            <strong className="text-gray-300">🔗 Chain:</strong> {token.chain}
          </p>
          <p>
            <strong className="text-gray-300">📜 Contract:</strong>{' '}
            <code className="text-indigo-400 break-words">{token.contractAddress}</code>
          </p>
          <p>
            <strong className="text-gray-300">📊 Votes:</strong> {token.votes}
          </p>
        </div>

        <button
          onClick={() => alert('Vote logic goes here!')}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold px-6 py-2 rounded shadow-lg"
        >
          👍 Vote for this Token
        </button>
      </div>
    </motion.div>
  )
}

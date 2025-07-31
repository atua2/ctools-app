// pages/tokens.tsx
import { useEffect, useState } from 'react'
import API from '../utils/apiClient'

interface Token {
  _id: string
  name: string
  symbol: string
  chain: string
  contractAddress: string
  description: string
  votes: number
}

const CHAINS = ['All', 'Ethereum', 'Solana', 'BSC', 'Polygon', 'Avalanche']

export default function TokensPage() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [filtered, setFiltered] = useState<Token[]>([])
  const [filter, setFilter] = useState('All')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [chain, setChain] = useState('Ethereum')
  const [contractAddress, setContractAddress] = useState('')
  const [description, setDescription] = useState('')
  const [votedToday, setVotedToday] = useState<Set<string>>(new Set())

  useEffect(() => {
    API.get<Token[]>('/tokens')
      .then(res => {
        setTokens(res.data)
        setFiltered(res.data)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    setFiltered(
      filter === 'All' ? tokens : tokens.filter(t => t.chain === filter)
    )
  }, [filter, tokens])

  const vote = async (id: string) => {
    if (votedToday.has(id)) return
    try {
      await API.post('/votes', { tokenId: id })
      setVotedToday(prev => new Set(prev).add(id))
      setTokens(tokens.map(t =>
        t._id === id ? { ...t, votes: t.votes + 1 } : t
      ))
    } catch (e) {
      console.error(e)
    }
  }

  const submitToken = async () => {
    if (!name || !symbol || !chain || !contractAddress || !description) {
      alert('Please fill all fields.')
      return
    }
    if (tokens.some(t => t.contractAddress.toLowerCase() === contractAddress.toLowerCase())) {
      alert('Contract already submitted.')
      return
    }
    try {
      const res = await API.post<Token>('/tokens', {
        name, symbol, chain, contractAddress, description
      })
      setTokens([res.data, ...tokens])
      setName(''); setSymbol(''); setChain('Ethereum')
      setContractAddress(''); setDescription('')
    } catch {
      alert('Submission failed.')
    }
  }

  return (
    <div className="py-10 px-4 max-w-5xl mx-auto">
      {/* Filter Bar */}
      <div className="mb-6 flex space-x-4 overflow-x-auto">
        {CHAINS.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === c
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Token Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(token => (
          <div
            key={token._id}
            className="bg-gray-800 p-5 rounded-lg shadow-lg flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-1 text-white">
              {token.name} <span className="text-gray-400">({token.symbol})</span>
            </h3>
            <p className="text-sm text-gray-400 mb-3 flex-1">
              {token.description}
            </p>
            <p className="text-xs text-gray-500 mb-2">Chain: {token.chain}</p>
            <p className="text-xs text-gray-500 mb-4 break-all">
              Contract: {token.contractAddress}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                Votes: {token.votes}
              </span>
              <button
                onClick={() => vote(token._id)}
                disabled={votedToday.has(token._id)}
                className={`px-3 py-1 rounded ${
                  votedToday.has(token._id)
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {votedToday.has(token._id) ? 'Voted' : 'Vote'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Form */}
      <div className="mt-10 bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Submit a New Token
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Token Name"
            className="bg-gray-800 text-white p-3 rounded"
          />
          <input
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
            placeholder="Symbol e.g. RUG"
            className="bg-gray-800 text-white p-3 rounded"
          />
          <select
            value={chain}
            onChange={e => setChain(e.target.value)}
            className="bg-gray-800 text-white p-3 rounded"
          >
            {CHAINS.filter(c => c !== 'All').map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            value={contractAddress}
            onChange={e => setContractAddress(e.target.value)}
            placeholder="Contract Address"
            className="bg-gray-800 text-white p-3 rounded"
          />
        </div>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Short Description"
          className="w-full bg-gray-800 text-white p-3 rounded mt-4"
          rows={3}
        />
        <button
          onClick={submitToken}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Submit Token
        </button>
      </div>
    </div>
  )
}

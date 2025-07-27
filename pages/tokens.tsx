import { useEffect, useState } from 'react'
import axios from 'axios'

interface Token {
  _id: string
  name: string
  symbol: string
  chain: string
  contractAddress: string
  description: string
  votes: number
}

export default function TokensPage() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([])
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [chain, setChain] = useState('Ethereum')
  const [contractAddress, setContractAddress] = useState('')
  const [description, setDescription] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      window.location.href = '/login'
      return
    }
    const { userId } = JSON.parse(stored)
    setUserId(userId)
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tokens`)
      setTokens(res.data)
      setFilteredTokens(res.data)
    } catch (err) {
      console.error('Failed to fetch tokens:', err)
    }
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
    if (value === 'All') {
      setFilteredTokens(tokens)
    } else {
      setFilteredTokens(tokens.filter((t) => t.chain === value))
    }
  }

  const submitToken = async () => {
    if (!name || !symbol || !contractAddress || !description || !chain) {
      return alert('All fields are required.')
    }

    const exists = tokens.find(
      (t) => t.contractAddress.toLowerCase() === contractAddress.toLowerCase()
    )
    if (exists) return alert('Token with this contract already submitted.')

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tokens`, {
        name,
        symbol,
        chain,
        contractAddress,
        description,
      })
      setName('')
      setSymbol('')
      setChain('Ethereum')
      setContractAddress('')
      setDescription('')
      fetchTokens()
    } catch (err) {
      alert('Token submission failed.')
      console.error(err)
    }
  }

  const voteToken = async (tokenId: string) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/votes`, {
        tokenId,
        userId,
      })
      fetchTokens()
    } catch (err: any) {
      if (err.response?.data?.message) {
        alert(err.response.data.message)
      } else {
        alert('Vote failed.')
        console.error(err)
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Revive a Token</h1>

      {/* Submit Form */}
      <div className="bg-white shadow p-6 rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Submit a Dead Token</h2>
        <input
          type="text"
          placeholder="Token Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Symbol (e.g. RUG)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full border p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="w-full border p-2 mb-2"
        />
        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="w-full border p-2 mb-2"
        >
          <option>Ethereum</option>
          <option>Solana</option>
          <option>BSC</option>
          <option>Polygon</option>
          <option>Avalanche</option>
        </select>
        <textarea
          placeholder="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 mb-4"
        />
        <button onClick={submitToken} className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Token
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Chain:</label>
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border p-2"
        >
          <option value="All">All</option>
          <option value="Ethereum">Ethereum</option>
          <option value="Solana">Solana</option>
          <option value="BSC">BSC</option>
          <option value="Polygon">Polygon</option>
          <option value="Avalanche">Avalanche</option>
        </select>
      </div>

      {/* Token List */}
      {filteredTokens.map((token) => (
        <div key={token._id} className="border p-4 rounded mb-4 bg-white shadow-sm">
          <h3 className="text-lg font-bold">
            {token.name} ({token.symbol}) – {token.chain}
          </h3>
          <p className="text-sm mb-2 text-gray-700">{token.description}</p>
          <p className="text-xs mb-2 text-gray-500">Contract: {token.contractAddress}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Votes: {token.votes}</p>
            <button
              onClick={() => voteToken(token._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

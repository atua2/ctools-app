// pages/submit.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import API from '../utils/apiClient'

export default function SubmitPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [chain, setChain] = useState('Ethereum')
  const [contractAddress, setContractAddress] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !symbol || !contractAddress || !description) {
      alert('Please fill all fields.')
      return
    }

    try {
      await API.post('/tokens', { name, symbol, chain, contractAddress, description })
      // After successful submit, navigate to the tokens list:
      router.push('/tokens')
    } catch (err) {
      console.error(err)
      alert('Submission failed.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full bg-gray-900 p-8 rounded-lg shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold">Submit a New Token</h1>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Token Name"
          className="w-full bg-gray-800 text-white p-3 rounded"
        />
        <input
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          placeholder="Symbol (e.g. RUG)"
          className="w-full bg-gray-800 text-white p-3 rounded"
        />
        <select
          value={chain}
          onChange={e => setChain(e.target.value)}
          className="w-full bg-gray-800 text-white p-3 rounded"
        >
          {['Ethereum', 'Solana', 'BSC', 'Polygon', 'Avalanche'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          value={contractAddress}
          onChange={e => setContractAddress(e.target.value)}
          placeholder="Contract Address"
          className="w-full bg-gray-800 text-white p-3 rounded"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Short Description"
          className="w-full bg-gray-800 text-white p-3 rounded"
          rows={4}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded text-lg font-semibold"
        >
          Submit Token
        </button>
      </form>
    </div>
  )
}

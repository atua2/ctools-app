import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Blockchain {
  _id: string
  name: string
}

export default function SubmitTokenPage() {
  const [blockchains, setBlockchains] = useState<Blockchain[]>([])
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    contractAddress: '',
    blockchain: '',
    description: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id

  useEffect(() => {
    if (!userId) {
      navigate('/')
    }
  }, [userId, navigate])

  useEffect(() => {
    const fetchBlockchains = async () => {
      try {
        const res = await fetch('/blockchains')
        const data = await res.json()
        setBlockchains(data)
      } catch (err) {
        console.error('Failed to fetch blockchains', err)
      }
    }

    fetchBlockchains()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/tokens/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, submittedBy: userId }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Submission failed')

      setSuccess('Token submitted for admin review')
      setFormData({
        name: '',
        symbol: '',
        contractAddress: '',
        blockchain: '',
        description: '',
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit a Token</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Token Name"
          className="w-full p-3 border rounded-lg"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="symbol"
          placeholder="Token Symbol"
          className="w-full p-3 border rounded-lg"
          value={formData.symbol}
          onChange={handleChange}
          required
        />
        <input
          name="contractAddress"
          placeholder="Contract Address"
          className="w-full p-3 border rounded-lg"
          value={formData.contractAddress}
          onChange={handleChange}
          required
        />
        <select
          name="blockchain"
          className="w-full p-3 border rounded-lg"
          value={formData.blockchain}
          onChange={handleChange}
          required
        >
          <option value="">Select Blockchain</option>
          {blockchains.map(bc => (
            <option key={bc._id} value={bc.name}>
              {bc.name}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description (optional)"
          className="w-full p-3 border rounded-lg"
          value={formData.description}
          onChange={handleChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          {submitting ? 'Submitting...' : 'Submit Token'}
        </button>
      </form>
    </div>
  )
}

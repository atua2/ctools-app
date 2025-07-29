import Link from 'next/link'
import TriangleField from '../components/TriangleField'
import FloatingDotsBackground from '../components/FloatingDotsBackground'

export default function HomePage() {
  return (
    <div
      style={{
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Welcome to CTools
        </h1>
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Reviving abandoned crypto projects through community voting, takeovers, and $CTOOLS rewards.
        </p>
        <Link href="/login">
          <button
            style={{
              backgroundColor: '#4f46e5',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            🚀 Login with Telegram
          </button>
        </Link>
      </div>
    </div>
  )
}

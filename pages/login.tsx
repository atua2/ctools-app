// pages/login.tsx

import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import TriangleField from '../components/TriangleField'
import FloatingDotsBackground from '../components/FloatingDotsBackground'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return
    if ((window as any).TelegramLoginWidget) return

    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?7'
    script.async = true
    script.setAttribute('data-telegram-login', 'TokenReviveSecureBot')
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-userpic', 'false')
    script.setAttribute('data-request-access', 'write')
    // This callback will be called by the Telegram widget
    script.setAttribute(
      'data-onauth',
      'window.onTelegramAuth && window.onTelegramAuth(user)'
    )

    document
      .getElementById('telegram-login-button')
      ?.appendChild(script)

    // Define the global callback
    ;(window as any).onTelegramAuth = async (user: any) => {
      try {
        const api = axios.create({
          baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        })
        const res = await api.post('/auth', user)
        const { token, userId, name, points } = res.data

        // Store JWT & user info
        localStorage.setItem('jwt', token)
        localStorage.setItem(
          'user',
          JSON.stringify({ userId, name, points })
        )

        // Redirect to dashboard
        router.replace('/dashboard')
      } catch (err) {
        console.error('Login failed', err)
        alert('Login failed. Please try again.')
      }
    }
  }, [router])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Background Animations */}
      <TriangleField />
      <FloatingDotsBackground />

      {/* Login Content */}
      <div className="relative z-10 text-center px-6 py-12 bg-black/70 rounded-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6">Login via Telegram</h1>
        <div id="telegram-login-button" className="inline-block" />
        <p className="mt-4 text-gray-400 text-sm">
          Just click the button above and confirm in Telegram.
        </p>
      </div>
    </div>
  )
}

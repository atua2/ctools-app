// pages/login.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import API from '../utils/apiClient'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    if (!(window as any).TelegramLoginWidget) {
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-widget.js?7'
      script.async = true
      script.setAttribute('data-telegram-login', 'TokenReviveSecureBot')
      script.setAttribute('data-size', 'large')
      script.setAttribute('data-userpic', 'false')
      script.setAttribute('data-request-access', 'write')
      script.setAttribute('data-onauth', 'handleTelegramAuth(user)')
      document.getElementById('telegram-login')?.appendChild(script)
    }

    ;(window as any).handleTelegramAuth = async (user: any) => {
      try {
        const res = await API.post('/auth', user)
        localStorage.setItem('user', JSON.stringify(res.data))
        router.push('/tokens')
      } catch (err) {
        console.error(err)
        alert('Login failed')
      }
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold">Login with Telegram</h1>
        <p className="text-gray-400">
          Please authenticate with Telegram to continue.
        </p>
        <div id="telegram-login" className="inline-block" />
      </div>
    </div>
  )
}

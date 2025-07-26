import { useEffect } from 'react'
import axios from 'axios'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export default function LoginPage() {
  useEffect(() => {
    // Avoid re-adding script
    if ((window as any).TelegramLoginWidget) return

    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?7'
    script.setAttribute('data-telegram-login', 'TokenReviveSecureBot') // Your bot username
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-userpic', 'false')
    script.setAttribute('data-request-access', 'write')
    script.setAttribute('data-onauth', 'onTelegramAuth(user)')
    script.async = true

    document.getElementById('telegram-login-button')?.appendChild(script)

    ;(window as any).onTelegramAuth = async (user: TelegramUser) => {
      try {
        const res = await axios.post('https://ctools.app/api/auth', user)
        const { userId, name, points } = res.data
        localStorage.setItem('user', JSON.stringify({ userId, name, points }))
        window.location.href = '/tokens'
      } catch (err) {
        alert('Login failed')
        console.error(err)
      }
    }
  }, [])

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Login via Telegram</h1>
      <div id="telegram-login-button"></div>
    </div>
  )
}

// app/layout.tsx
import '../styles/globals.css'

export const metadata = {
  title: 'CTools',
  description: 'Reviving abandoned crypto projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

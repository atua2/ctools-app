import { useEffect, useRef } from 'react'

const DOT_COUNT = 40
const MAX_DISTANCE = 150

type Dot = { x: number; y: number; vx: number; vy: number }

export default function FloatingDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = window.innerWidth
    let h = window.innerHeight

    canvas.width = w
    canvas.height = h

    dotsRef.current = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
    }))

    const onResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', onResize)

    const loop = () => {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)

      const dots = dotsRef.current
      dots.forEach(d => {
        d.x += d.vx
        d.y += d.vy
        if (d.x <= 0 || d.x >= w) d.vx *= -1
        if (d.y <= 0 || d.y >= h) d.vy *= -1

        ctx.beginPath()
        ctx.arc(d.x, d.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.8)'
        ctx.fill()
      })

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j]
          const dx = a.x - b.x, dy = a.y - b.y, dist = Math.hypot(dx, dy)
          if (dist < MAX_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / MAX_DISTANCE})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(loop)
    }
    loop()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

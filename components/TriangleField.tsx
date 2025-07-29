import React, { useEffect, useRef } from 'react'

const DOT_COUNT = 3         // only three for a triangle
const RADIUS = 120         // orbit radius
const SPEED = 0.002        // angular speed

type Dot = { angle: number }

export default function TriangleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = window.innerWidth
    let h = window.innerHeight

    canvas.width = w
    canvas.height = h

    // Initialize three dots at equal 120° offsets
    dotsRef.current = Array.from({ length: DOT_COUNT }, (_, i) => ({
      angle: (i * 2 * Math.PI) / DOT_COUNT,
    }))

    const onResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', onResize)

    let lastTime = performance.now()

    const animate = () => {
      const now = performance.now()
      const delta = now - lastTime
      lastTime = now

      ctx.clearRect(0, 0, w, h)

      // center of the screen
      const cx = w * 0.15
      const cy = h / 2.8

      // update and draw each dot
      dotsRef.current.forEach(dot => {
        dot.angle += SPEED * delta
        const x = cx + Math.cos(dot.angle) * RADIUS
        const y = cy + Math.sin(dot.angle) * RADIUS

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#00ffc3'
        ctx.fill()
      })

      // draw triangle connecting them
      if (dotsRef.current.length === DOT_COUNT) {
        ctx.beginPath()
        const first = dotsRef.current[0]
        ctx.moveTo(cx + Math.cos(first.angle) * RADIUS, cy + Math.sin(first.angle) * RADIUS)
        dotsRef.current.slice(1).forEach(dot => {
          ctx.lineTo(cx + Math.cos(dot.angle) * RADIUS, cy + Math.sin(dot.angle) * RADIUS)
        })
        ctx.closePath()
        ctx.strokeStyle = 'rgba(0,255,195,0.3)'
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()
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
        zIndex: -2,         // behind the dots (zIndex -1) and your content (z10)
        backgroundColor: 'transparent',
      }}
    />
  )
}

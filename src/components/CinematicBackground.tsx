import { useEffect, useRef, useState } from 'react'

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [shouldRenderVideo, setShouldRenderVideo] = useState(true)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + .4,
      speed: Math.random() * .00035 + .00008,
      phase: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createRadialGradient(
        width * (.5 + Math.sin(time * .00017) * .15),
        height * (.35 + Math.cos(time * .00013) * .12),
        0,
        width * .5,
        height * .5,
        Math.max(width, height) * .75
      )
      gradient.addColorStop(0, 'rgba(139,92,255,.20)')
      gradient.addColorStop(.38, 'rgba(255,47,173,.09)')
      gradient.addColorStop(1, 'rgba(7,5,12,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p) => {
        p.y -= p.speed * 16
        if (p.y < -.02) p.y = 1.02
        const x = p.x * width + Math.sin(time * .0007 + p.phase) * 18
        const y = p.y * height
        ctx.beginPath()
        ctx.arc(x, y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,.55)'
        ctx.fill()
      })

      raf = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07050c]">
      {shouldRenderVideo && (
        <video
          className={`cinematic-video absolute inset-0 z-0 h-full w-full transition-opacity duration-700 ${videoReady ? 'opacity-55' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=70"
          onLoadedData={() => setVideoReady(true)}
          onError={() => setShouldRenderVideo(false)}
        >
          <source src="/videos/rocky-neon-bg.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_15%_25%,rgba(255,47,173,.24),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(32,232,208,.18),transparent_30%),linear-gradient(180deg,rgba(7,5,12,.25),rgba(7,5,12,.82))]" />
      <canvas ref={canvasRef} className="absolute inset-0 z-20 opacity-70" />
    </div>
  )
}
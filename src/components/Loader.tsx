import { useEffect, useState } from 'react'

type LoaderProps = {
  open: boolean
  onEnter: () => void
}

export default function Loader({ open, onEnter }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [assetsReady, setAssetsReady] = useState(false)

  useEffect(() => {
    if (!open) return

    const start = performance.now()
    let rafId = 0

    const tick = (now: number) => {
      const next = Math.min(100, ((now - start) / 4200) * 100)
      setProgress(next)

      if (next < 100) {
        rafId = window.requestAnimationFrame(tick)
      } else {
        setAssetsReady(true)
      }
    }

    const handleLoad = () => setAssetsReady(true)
    const handleReadyTimeout = window.setTimeout(() => setAssetsReady(true), 3600)

    window.addEventListener('load', handleLoad)
    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('load', handleLoad)
      window.clearTimeout(handleReadyTimeout)
    }
  }, [open])

  if (!open) return null

  const canEnter = assetsReady && progress >= 100

  return (
    <div className="loader-shell fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#07050c] text-white">
      <div className="loader-orb loader-orb-one" />
      <div className="loader-orb loader-orb-two" />
      <div className="loader-grid" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="loader-label">Initializing Experience</div>

        <div className="loader-logo-wrap">
          <span className="loader-logo">RAZ</span>
          <span className="loader-dot" />
          <span className="loader-logo loader-logo-muted">PROJECT</span>
        </div>

        <div className="loader-bar-wrap" aria-label="Loading progress">
          <div className="loader-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="loader-status">
          {canEnter ? 'Ready to enter' : `Loading assets ${Math.round(progress)}%`}
        </div>

        <button
          type="button"
          className="loader-button"
          onClick={onEnter}
          disabled={!canEnter}
        >
          {canEnter ? 'Enter main page' : 'Loading...'}
        </button>
      </div>
    </div>
  )
}
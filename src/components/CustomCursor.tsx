import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      setActive(Boolean(target.closest('a, button, [data-cursor]')))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="cursor-dot" style={{ left: position.x, top: position.y }} />
      <div className={`cursor-ring ${active ? 'active' : ''}`} style={{ left: position.x, top: position.y }} />
    </>
  )
}
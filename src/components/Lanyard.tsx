import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Lanyard() {
  const groupRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const updateVisibility = () => {
      const shouldShow = window.scrollY < 160
      setIsVisible(shouldShow)

      if (groupRef.current) {
        gsap.to(groupRef.current, {
          opacity: shouldShow ? 1 : 0,
          y: shouldShow ? 0 : -18,
          duration: 0.5,
          ease: 'power2.inOut',
        })
      }
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateVisibility)
    }
  }, [])

  useEffect(() => {
    const group = groupRef.current
    const card = cardRef.current
    if (!group || !card) return

    const move = (e: MouseEvent) => {
      const rx = ((e.clientY / window.innerHeight) - .5) * 12
      const ry = ((e.clientX / window.innerWidth) - .5) * -18

      gsap.to(group, {
        rotateX: rx,
        rotateY: ry,
        duration: .7,
        ease: 'power3.out',
      })

      gsap.to(card, {
        rotateX: rx * .75,
        rotateY: ry * .8,
        duration: .7,
        ease: 'power3.out',
      })
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

    timeline
      .fromTo(
        group,
        {
          y: -40,
          opacity: 0,
          scale: 0.92,
          rotateX: -28,
          rotateY: 18,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 1.1,
        }
      )
      .to(
        group,
        {
          y: 12,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
        1.1
      )
      .to(
        card,
        {
          rotateZ: 2,
          y: 4,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
        1.1
      )

    window.addEventListener('mousemove', move)

    return () => {
      window.removeEventListener('mousemove', move)
      timeline.kill()
    }
  }, [])

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[52%] z-20 hidden -translate-x-1/2 md:block"
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translate(-50%, 0)' : 'translate(-50%, -18px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
    >
      <div
        ref={groupRef}
        className="relative h-[320px] w-[280px] overflow-visible [perspective:1400px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div ref={cardRef} className="absolute left-1/2 top-0 -translate-x-[58%]" style={{ transformStyle: 'preserve-3d' }}>
          <div
            className="relative w-[238px] rounded-[32px] border border-white/25 bg-[#080711]/70 p-3.5 backdrop-blur-xl"
            style={{
              transform: 'rotateX(8deg) rotateY(-10deg)',
              boxShadow: '0 35px 90px rgba(0,0,0,0.62), 0 0 45px rgba(255,47,173,0.18), inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
          >
            <div className="absolute inset-[1px] rounded-[27px] border border-white/10" />
            <div className="absolute -inset-3 rounded-[32px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.38),transparent_36%),linear-gradient(135deg,rgba(255,47,173,0.22),rgba(139,92,255,0.08),rgba(32,232,208,0.18))] blur-xl opacity-90" />

            <div className="relative">
              <div className="mb-2 flex items-center justify-between text-[9px] font-bold tracking-[.22em] text-white/55">
                <span>ROCKY</span>
                <span>2026</span>
              </div>

              <div className="overflow-hidden rounded-[18px] border border-white/15 bg-[#10111a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_16px_32px_rgba(139,92,255,0.22)]">
                <img
                  src="/images/lanyard.png"
                  alt="Lanyard portrait"
                  className="aspect-square w-full object-cover"
                />
              </div>

              <div className="mt-2 text-[10px] font-bold uppercase tracking-[.18em] text-white/90">
                Photographer × Programmer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
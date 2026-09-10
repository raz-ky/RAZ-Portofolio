import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const titleSets = [
  { top: 'RAZ', bottom: 'PROJECT' },
  { top: 'RAZ', bottom: 'PICTURES' },
  { top: 'PEJUANG', bottom: 'TECH' },
]

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const photoTrackRef = useRef<HTMLDivElement>(null)
  const mobileClusterRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(() => {
    gsap.from('.hero-reveal', {
      y: 70,
      opacity: 0,
      stagger: .09,
      duration: 1.1,
      ease: 'power4.out',
      delay: .2,
    })
  }, { scope: root })

  useEffect(() => {
    const titleLines = root.current?.querySelectorAll('.hero-title-line')

    if (titleLines && titleLines.length > 0) {
      gsap.fromTo(
        titleLines,
        {
          y: 38,
          opacity: 0,
          filter: 'blur(8px)',
          rotateX: -55,
          scaleY: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          rotateX: 0,
          scaleY: 1,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.12,
        }
      )
    }
  }, [activeIndex])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!root.current) return

      const rect = root.current.getBoundingClientRect()
      const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 22
      const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 18

      root.current.style.setProperty('--pointer-x', `${offsetX}px`)
      root.current.style.setProperty('--pointer-y', `${offsetY}px`)

      if (mobileClusterRef.current) {
        const localX = ((event.clientX - rect.left) / rect.width - 0.5) * 28
        const localY = ((event.clientY - rect.top) / rect.height - 0.5) * 24
        mobileClusterRef.current.style.transform = `translate3d(${localX * 0.9}px, ${localY * 0.9}px, 0)`
      }
    }

    const handlePointerLeave = () => {
      if (mobileClusterRef.current) {
        mobileClusterRef.current.style.transform = 'translate3d(0, 0, 0)'
      }
    }

    const cycle = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % titleSets.length)
    }, 2200)

    const element = root.current
    if (element) {
      element.addEventListener('pointermove', handlePointerMove)
      element.addEventListener('pointerleave', handlePointerLeave)
    }

    return () => {
      window.clearTimeout(cycle)
      if (element) {
        element.removeEventListener('pointermove', handlePointerMove)
        element.removeEventListener('pointerleave', handlePointerLeave)
      }
    }
  }, [activeIndex])

  useEffect(() => {
    const node = photoTrackRef.current
    if (!node) return

    const halfWidth = node.scrollWidth / 2
    let offset = 0
    let lastTime = 0
    let rafId = 0

    const tick = (time: number) => {
      if (!lastTime) lastTime = time
      const delta = (time - lastTime) / 1000
      lastTime = time

      offset -= 26 * delta
      if (Math.abs(offset) >= halfWidth) {
        offset += halfWidth
      }

      node.style.transform = `translate3d(${offset}px, 0, 0)`
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const currentTitle = titleSets[activeIndex]
  const photoSequence = [
    '/images/raz.jpg',
    '/images/pejuang.jpg',
    '/images/lanyard.png',
  ]
  const mobilePhotoCluster = photoSequence.slice(0, 3)
  const photoDividers = ['🖥️', '📸', '🛠️']
  const photoTrackItems = [...photoSequence, ...photoSequence, ...photoSequence, ...photoSequence, ...photoSequence, ...photoSequence, ...photoSequence]
  const bubbleIcons = [
    { symbol: '📸', className: 'hero-bubble-icon bubble-icon-1' },
    { symbol: '🖥️', className: 'hero-bubble-icon bubble-icon-2' },
    { symbol: '🛠️', className: 'hero-bubble-icon bubble-icon-3' },
  ]

  return (
    <section ref={root} id="top" className="hero-parallax-shell relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden pb-0 pt-12 md:pt-10">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-5 md:px-8">
        <div className="hero-reveal hero-parallax-layer hero-layer-1 mb-5 flex items-center justify-center gap-3 text-center text-[10px] font-bold uppercase tracking-[.35em] text-white/60">
          <span className="h-2 w-2 rounded-full bg-[#20e8d0] shadow-[0_0_18px_#20e8d0]" />
          <span>Visual archive / digital experiments</span>
        </div>

        <div className="hero-reveal hero-parallax-layer hero-layer-2 relative mt-10 inline-block text-center md:mt-14">
          <h1 className="hero-title-stack display-font relative overflow-hidden text-[8vw] font-black leading-[.62] tracking-[-.09em] md:text-[5.6vw]">
            <span className="hero-title-line hero-gradient-text hero-title-glow block leading-[0.78]">{currentTitle.top}</span>
            <span className="hero-title-line hero-title-glow mt-2 block leading-[0.78] text-white">{currentTitle.bottom}</span>
          </h1>
        </div>

        <div className="mt-8 w-full text-center">
          <p className="hero-reveal hero-parallax-layer hero-layer-3 mx-auto max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
            Welcome to my portfolio website. Here, I share my portfolio as a
          </p>
          <div className="hero-reveal hero-parallax-layer hero-layer-3 mt-1 flex flex-col items-center justify-center text-center text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white/80 md:text-[0.95rem]">
            <span>Photographer and Programmer</span>
          </div>
        </div>

      </div>

      <div className="hero-reveal mt-auto w-full pt-10 md:pt-12">
        <div className="hero-marquee-shell relative left-1/2 hidden w-[100vw] -ml-[50vw] overflow-hidden border-b border-white/20 bg-[linear-gradient(90deg,rgba(8,8,14,0.72),rgba(16,17,25,0.55),rgba(8,8,14,0.72))] shadow-[0_0_50px_rgba(139,92,255,0.18)] backdrop-blur-md md:block">
          <div ref={photoTrackRef} className="photo-marquee-track flex w-max min-w-full items-center gap-5 px-3 py-2 md:gap-8 md:px-4 md:py-3">
            {photoTrackItems.map((item, index) => (
              <div key={`${item}-${index}`} className="photo-marquee-item flex items-center gap-5 md:gap-8">
                <div className="h-16 w-16 overflow-hidden rounded-[1.1rem] border border-white/15 bg-white/5 shadow-[0_0_16px_rgba(32,232,208,0.12)] md:h-28 md:w-44">
                  <img src={item} alt="" className="h-full w-full object-cover" />
                </div>
                {(index + 1) % photoSequence.length !== 0 && index !== photoTrackItems.length - 1 && (
                  <span className="photo-divider text-xl text-[#20e8d0] drop-shadow-[0_0_12px_rgba(32,232,208,0.8)] md:text-2xl">
                    {photoDividers[(index + 1) % photoDividers.length]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div ref={mobileClusterRef} className="hero-mobile-photo-cluster md:hidden">
          {bubbleIcons.map((icon) => (
            <span key={icon.className} className={icon.className}>{icon.symbol}</span>
          ))}

          {mobilePhotoCluster.map((item, index) => (
            <div key={`${item}-${index}`} className={`mobile-photo-item item-${index + 1}`}>
              <img src={item} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
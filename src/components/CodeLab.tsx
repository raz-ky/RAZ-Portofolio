import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { techStack } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function CodeLab() {
  const section = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Title animations
    gsap.from('.codelab-title-kicker', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: section.current, start: 'top 85%' },
    })

    gsap.from('.codelab-title', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.1,
      scrollTrigger: { trigger: section.current, start: 'top 85%' },
    })

    gsap.from('.codelab-desc', {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.2,
      scrollTrigger: { trigger: section.current, start: 'top 85%' },
    })

    // One trigger for the whole track avoids creating a ScrollTrigger per card (114 cards).
    gsap.fromTo(
      '.stack-card',
      { y: 80, opacity: 0, rotation: 2 },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: { each: 0.01 },
        scrollTrigger: { trigger: section.current, start: 'top 85%' },
      }
    )
  }, { scope: section })

  // 6 copies of a 3-row grid = an even number of columns, so the -50% marquee loop has no visible jump.
  const cards = Array.from({ length: 6 }, () => techStack).flat()

  return (
    <section ref={section} id="lab" className="px-4 py-10 md:px-10 md:py-18 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <p className="codelab-title-kicker mb-4 text-[10px] font-bold uppercase tracking-[.35em] text-[#8ef7e8] md:mb-5">02 / Tech stack</p>
            <h2 className="codelab-title display-font text-4xl text-white md:text-[6vw] md:leading-[.85]">
              Tools<br />
              <span className="bg-gradient-to-r from-[#8ef7e8] via-[#6bd6ff] to-[#ff2fad] bg-clip-text text-transparent">for building.</span>
            </h2>
          </div>

          <p className="codelab-desc max-w-md text-sm leading-relaxed text-white/55 md:text-right">
            A focused stack for interface design and product execution — from frontend craft to launch-ready systems.
          </p>
        </div>

        <div className="scrollbar-none overflow-hidden pb-2">
          <div className="tech-track grid min-w-[720px] grid-flow-col grid-rows-3 gap-2 sm:min-w-[980px] sm:gap-3">
            {cards.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="stack-card group relative flex aspect-square w-[104px] flex-col items-center justify-center overflow-hidden rounded-[12px] border border-white/10 bg-[#0a111d]/80 p-2 shadow-[0_10px_22px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-white/15 sm:w-[154px] sm:rounded-[16px] sm:p-2.5"
              >
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[10px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(142,247,232,0.22),_rgba(18,26,35,0.96)_58%)] shadow-[0_0_25px_rgba(142,247,232,0.18)] sm:h-20 sm:w-20">
                  <img src={item.image} alt={item.name} className="h-9 w-9 object-contain sm:h-11 sm:w-11" />
                </div>
                <div className="mt-2 text-center sm:mt-3">
                  <h3 className="display-font text-[0.72rem] leading-none text-white sm:text-[1rem] md:text-[1.1rem]">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
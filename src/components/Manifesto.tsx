import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { certificates, projects } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type PortfolioTab = 'projects' | 'certificates'

export default function Manifesto() {
  const section = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<PortfolioTab>('projects')
  const [portfolioPage, setPortfolioPage] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const activeItems = activeTab === 'projects' ? projects : certificates
  const isProjectTab = activeTab === 'projects'
  const cardsPerPage = 3
  const totalPortfolioPages = Math.max(1, Math.ceil(activeItems.length / cardsPerPage))
  const visibleItems = activeItems.slice(portfolioPage * cardsPerPage, portfolioPage * cardsPerPage + cardsPerPage)

  useEffect(() => {
    setPortfolioPage((current) => Math.min(current, Math.max(0, totalPortfolioPages - 1)))
  }, [activeTab, totalPortfolioPages])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.manifesto-line', {
        y: 80,
        opacity: 0,
        stagger: .12,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: section.current, start: 'top 70%' },
      })

      gsap.from('.manifesto-description', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: { trigger: section.current, start: 'top 70%' },
      })

      const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card')
      if (!cards.length) return

      gsap.killTweensOf(cards)
      gsap.fromTo(cards, {
        opacity: 1,
        y: 0,
        rotationX: 0,
      }, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.01,
      })

      gsap.from(cards, {
        y: 60,
        opacity: 0,
        rotationX: -12,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section.current,
          start: 'top 72%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, { scope: section, dependencies: [activeTab] })

  return (
    <section ref={section} id="manifesto" className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-10 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-6 sm:gap-5">
          <div>
            <p className="manifesto-line mb-3 text-[9px] font-bold uppercase tracking-[.35em] text-[#8b5cff] md:mb-5 md:text-[10px]">03 / Portfolio</p>
            <h2 className="manifesto-line display-font text-3xl text-white md:text-6xl sm:text-4xl">Portofolio Showcase</h2>
          </div>

          <div className="manifesto-line flex gap-1.5 rounded-full border border-white/10 bg-white/3 p-1 sm:gap-2 sm:p-1.5 md:p-1.5">
            {(['projects', 'certificates'] as PortfolioTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab)
                  setPortfolioPage(0)
                }}
                className={`rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.26em] transition sm:px-4 sm:py-2 md:px-4 md:py-2 ${
                  activeTab === tab
                    ? 'bg-white text-[#09070d]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab === 'projects' ? 'Project' : 'Sertifikat'}
              </button>
            ))}
          </div>
        </div>

        <p className="manifesto-description mb-6 max-w-2xl text-xs leading-relaxed text-white/60 md:mb-10 md:text-base sm:text-sm">
          I create focused digital experiences that balance visual clarity, narrative, and strong product thinking.
        </p>

        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => {
            if (isProjectTab) {
              const project = item as (typeof projects)[number]

              return (
                <article
                  key={project.id}
                  className="portfolio-card manifesto-line group overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0a14]/75 backdrop-blur-sm"
                >
                  <div className="overflow-hidden border-b border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="display-font text-2xl text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{project.description}</p>

                    <div className="mt-6">
                      <a
                        href={project.link || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-[#8b5cff]/60 bg-[#8b5cff]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.25em] text-[#f0e6ff] transition hover:border-[#8b5cff] hover:bg-[#8b5cff]/20"
                      >
                        Detail
                      </a>
                    </div>
                  </div>
                </article>
              )
            }

            const certificate = item as (typeof certificates)[number]

            return (
              <article
                key={certificate.id}
                className="portfolio-card manifesto-line group overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0a14]/75 backdrop-blur-sm"
              >
                <div className="overflow-hidden border-b border-white/10">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="h-64 w-full cursor-pointer object-cover transition duration-700 group-hover:scale-105"
                    onClick={() => setSelectedImage(certificate.image)}
                  />
                </div>

                <div className="p-5">
                  <h3 className="display-font text-2xl text-white">{certificate.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{certificate.description}</p>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(certificate.image)}
                      className="inline-flex items-center rounded-full border border-[#20e8d0]/60 bg-[#20e8d0]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.25em] text-[#dffdf8] transition hover:border-[#20e8d0] hover:bg-[#20e8d0]/20"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070d]/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0a14] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close preview"
                onClick={() => setSelectedImage(null)}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0d0a14]/70 text-lg text-white/80 transition hover:bg-white/10"
              >
                ×
              </button>
              <img src={selectedImage} alt="Certificate preview" className="max-h-[80vh] w-full object-contain" />
            </div>
          </div>
        )}

        {activeItems.length > cardsPerPage && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPortfolioPage((current) => (current === 0 ? totalPortfolioPages - 1 : current - 1))}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[9px] font-bold uppercase tracking-[.2em] text-white/70 transition hover:bg-white/10"
            >
              Prev
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPortfolioPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPortfolioPage(index)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold transition ${portfolioPage === index ? 'bg-white text-[#09070d]' : 'border border-white/10 bg-transparent text-white/60 hover:bg-white/8'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPortfolioPage((current) => (current + 1) % totalPortfolioPages)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[9px] font-bold uppercase tracking-[.2em] text-white/70 transition hover:bg-white/10"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function PhotoArchive() {
  const section = useRef<HTMLElement>(null)
  const textTrackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Left column animations
    gsap.from('.about-content > *', {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: section.current, start: 'top 75%' },
    })

    // Right column animations
    gsap.from('.about-image-wrapper', {
      x: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: section.current, start: 'top 75%' },
    })

    // Educational section animations
    gsap.from('.educational-title', {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.educational-title', start: 'top 85%' },
    })

    gsap.from('.marquee-track', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2,
      scrollTrigger: { trigger: '.marquee-track', start: 'top 88%' },
    })
  }, { scope: section })

  const educationItems = [
    { name: 'MIN 1 Ketapang', image: '/images/min.png' },
    { name: 'MTS Al-Muhajirin', image: '/images/min.png' },
    { name: 'MAN 1 Kubu Raya', image: '/images/man.jpg' },
    { name: 'STMIK Pontianak', image: '/images/stmik.png' },
  ]

  const marqueeItems = [...educationItems, ...educationItems, ...educationItems, ...educationItems]

  return (
    <section id="about" className="about-section relative overflow-hidden py-8 sm:py-10 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:px-10 sm:px-6">
        <div className="about-content relative order-2 md:order-1">
          <div className="about-kicker-wrap">
            <span className="about-kicker-line" />
            <p className="about-kicker">About me</p>
          </div>

          <div className="about-mobile-image-wrapper mt-0 mb-5 block md:hidden">
            <div className="about-photo-wrap about-photo-wrap-mobile">
              <div className="about-orbit orbit-one" />
              <div className="about-orbit orbit-two" />

              <div className="about-image-card">
                <img
                  src="/images/about.png"
                  alt="Rocky Ahmad Zibli"
                />
              </div>
            </div>
          </div>

          <h2 className="display-font text-[2.1rem] font-black leading-[0.9] tracking-[-0.08em] md:text-[3.1rem] lg:text-[3.8rem]">
            <span className="bg-gradient-to-r from-[#fdf7ff] via-[#dff9ff] to-[#ff90d5] bg-clip-text text-transparent">Rocky Ahmad Zibli</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
            Saya adalah mahasiswa aktif di jurusan Teknik Informatika. Dan Seorang photographer x programmer yang membangun cerita lewat cahaya, komposisi, dan kode.
            Saya percaya visual yang kuat bukan hanya untuk dilihat, tapi untuk terasa — seperti ritme, emosi,
            dan kejelasan yang bergerak di setiap frame.
          </p>

          <div className="mt-8 sm:mt-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="about-kicker-line" />
              <p className="about-kicker" style={{ letterSpacing: '.26em' }}>Years of experience</p>
            </div>

            <div className="about-experience-wrap">
              <div className="about-experience-card photo-exp">
                <span className="about-exp-label">Photographer</span>
                <strong>5+</strong>
              </div>
              <div className="about-experience-card code-exp">
                <span className="about-exp-label">Programmer</span>
                <strong>3+</strong>
              </div>
            </div>
          </div>

          <div className="mt-7 sm:mt-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="about-kicker-line" />
              <p className="about-kicker" style={{ letterSpacing: '.26em' }}>Part of</p>
            </div>

            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
              {[
                { name: 'RAZ PROJECT', link: 'https://www.instagram.com/rcky_prjct/' },
                { name: 'RAZ PICTURES', link: 'https://www.instagram.com/raz.pictures_/' },
                { name: 'PEJUANG TECH', link: 'https://www.instagram.com/pejuang_tech/h' },
              ].map((item) => (
                <div key={item.name} className="about-stat about-part-card">
                  <div className="about-card-top">
                    <span className="about-card-icon" aria-hidden="true">◎</span>
                    <span className="about-card-tag">Instagram</span>
                  </div>
                  <strong>{item.name}</strong>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="about-card-button"
                  >
                    Open link
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2.5 sm:gap-3">
            {['Photography', 'Web Development', 'App Development', 'Dev Map Roblox'].map((tag) => (
              <span key={tag} className="about-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="about-image-wrapper relative order-1 hidden md:order-2 md:block">
          <div className="about-photo-wrap">
            <div className="about-orbit orbit-one" />
            <div className="about-orbit orbit-two" />

            <div className="about-image-card">
              <img
                src="/images/about.png"
                alt="Rocky Ahmad Zibli"
              />
            </div>
          </div>
        </div>
      </div>


      <div className="mt-12 w-full md:mt-16">
        <div className="mb-3 px-4 md:mb-4 md:px-10 sm:px-6">
          <p className="educational-title text-[9px] font-bold uppercase tracking-[.35em] text-[#20e8d0] md:text-[10px]">Educational</p>
        </div>
        <div className="education-marquee-shell relative left-1/2 w-[100vw] -ml-[50vw] overflow-hidden border-y border-white/20 bg-[linear-gradient(90deg,rgba(8,8,14,0.72),rgba(16,17,25,0.55),rgba(8,8,14,0.72))] shadow-[0_0_50px_rgba(139,92,255,0.18)] backdrop-blur-md">
          <div className="marquee-track marquee-glow flex w-max items-center gap-12 px-5 py-5 text-[10px] font-black uppercase tracking-[.16em] text-white/65 md:px-8 md:py-6 md:text-[12px]">
            {marqueeItems.map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex shrink-0 items-center gap-4 whitespace-nowrap md:gap-6">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-[0_0_20px_rgba(32,232,208,0.28)] md:h-12 md:w-12">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <span className="whitespace-nowrap text-white/80">{item.name}</span>
                <span className="text-[#20e8d0]/80 drop-shadow-[0_0_14px_rgba(32,232,208,0.9)]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
import { useState } from 'react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-4 py-4 mix-blend-difference md:px-8 md:py-5">
      <a href="#top" data-cursor className="text-sm font-black tracking-[-.05em] md:text-base">RAZ PROJECT<span className="text-[#20e8d0]">.</span></a>
      
      {/* Desktop Navigation */}
      <nav className="hidden gap-6 text-[9px] font-bold uppercase tracking-[.28em] sm:flex md:gap-8 md:text-[10px]">
        <a data-cursor href="#about" className="hover:text-[#20e8d0] transition">About</a>
        <a data-cursor href="#lab" className="hover:text-[#20e8d0] transition">Tech Stack</a>
        <a data-cursor href="#manifesto" className="hover:text-[#20e8d0] transition">Portofolio</a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="sm:hidden flex flex-col gap-1.5 z-50"
        aria-label="Toggle menu"
      >
        <span className={`h-0.5 w-5 bg-white transition ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`h-0.5 w-5 bg-white transition ${mobileMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`h-0.5 w-5 bg-white transition ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Desktop Contact Button */}
      <a data-cursor href="#contact" className="hidden sm:block rounded-full border border-white/30 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.25em] hover:border-white/60 transition md:px-4 md:py-2 md:text-[10px]">
        Contact
      </a>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#07050c]/95 backdrop-blur-md border-b border-white/15 sm:hidden">
          <nav className="flex flex-col gap-4 p-4 text-[11px] font-bold uppercase tracking-[.28em]">
            <a data-cursor href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#20e8d0] transition py-2">About</a>
            <a data-cursor href="#lab" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#20e8d0] transition py-2">Tech Stack</a>
            <a data-cursor href="#manifesto" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#20e8d0] transition py-2">Portofolio</a>
            <a data-cursor href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#20e8d0] transition py-2 border-t border-white/15 mt-2 pt-4">Contact</a>
          </nav>
        </div>
      )}
    </header>
  )
}
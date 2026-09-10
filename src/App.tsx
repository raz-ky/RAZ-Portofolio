import Lenis from 'lenis'
import { useEffect, useState } from 'react'
import CinematicBackground from './components/CinematicBackground'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Manifesto from './components/Manifesto'
import Navigation from './components/Navigation'
import PhotoArchive from './components/PhotoArchive'
import CodeLab from './components/CodeLab'

export default function App() {
  const [isLoaderOpen, setIsLoaderOpen] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: .085 })
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Loader open={isLoaderOpen} onEnter={() => setIsLoaderOpen(false)} />
      {!isLoaderOpen && (
        <>
          <CinematicBackground />
          <div className="grain" />
          <CustomCursor />
          <Navigation />
          <main className="relative z-10">
            <Hero />
            <PhotoArchive />
            <CodeLab />
            <Manifesto />
            <Footer />
          </main>
        </>
      )}
    </>
  )
}
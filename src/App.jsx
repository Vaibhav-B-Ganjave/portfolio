import { useCallback, useEffect, useRef, useState } from 'react'
import './styles.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import { useSmoothScroll } from './hooks'

/** A soft light that trails the mouse across the page. */
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    const onMove = e => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        ref.current?.style.setProperty('transform', `translate(${e.clientX}px, ${e.clientY}px)`)
        ref.current?.classList.add('is-on')
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
  return <div className="cursor-glow" ref={ref} aria-hidden="true" />
}

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef()

  useSmoothScroll()

  const showToast = useCallback(message => {
    clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }, [])

  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(o => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <CursorGlow />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <About />
        <Contact onToast={showToast} />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onToast={showToast} />
      <div className={`toast${toast ? ' is-visible' : ''}`} role="status">{toast}</div>
    </>
  )
}

export default App

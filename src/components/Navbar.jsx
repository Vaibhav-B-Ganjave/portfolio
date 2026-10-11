import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { sections } from '../data'
import { isMac, scrollToId } from '../hooks'
import { Search } from './Icons'

export default function Navbar({ onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ;['top', ...sections.map(s => s.id)].forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  const go = id => e => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <motion.header
      className={`nav${scrolled ? ' nav--scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="nav-inner">
        <a href="#top" className="nav-logo" onClick={go('top')} aria-label="Back to top">
          <span className="nav-logo-mark">VG</span>
          <span className="nav-logo-text">Vaibhav<span className="muted">.dev</span></span>
        </a>

        <nav className="nav-links" aria-label="Sections">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} onClick={go(s.id)} className={active === s.id ? 'is-active' : undefined}>
              {active === s.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span>{s.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="cmd-btn" onClick={onOpenPalette} aria-label="Open command menu">
            <Search />
            <span className="cmd-btn-label">Menu</span>
            <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <a className="btn btn-primary btn-sm nav-cta" href="#contact" onClick={go('contact')}>Let's talk</a>
        </div>
      </div>
    </motion.header>
  )
}

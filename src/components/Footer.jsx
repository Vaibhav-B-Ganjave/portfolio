import { useLayoutEffect, useRef } from 'react'
import { profile } from '../data'
import { isMac, scrollToId } from '../hooks'

/** Sizes a single line of text so it spans exactly the width of its container. */
function FitText({ children, className }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    const box = el.parentElement
    const fit = () => {
      el.style.fontSize = '100px'
      const ratio = box.clientWidth / el.scrollWidth
      el.style.fontSize = `${Math.floor(100 * ratio * 10) / 10}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(box)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [])

  return <p ref={ref} className={className} aria-hidden="true">{children}</p>
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-mark-box">
          <FitText className="footer-mark">{profile.name}</FitText>
        </div>
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="muted">Built with React, Three.js &amp; Framer Motion · press <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd> anywhere</span>
          <button className="link-btn" onClick={() => scrollToId('top')}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

let lenis = null

export function scrollToId(id) {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (target === null) return
  if (lenis) lenis.scrollTo(target, { offset: id === 'top' ? 0 : -20, duration: 1.4 })
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenis = null
    }
  }, [])
}

export function setScrollLocked(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export function useClock(timeZone = 'Asia/Kolkata') {
  const format = useCallback(
    () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date()),
    [timeZone]
  )
  const [time, setTime] = useState(format)
  useEffect(() => {
    const t = setInterval(() => setTime(format()), 15000)
    return () => clearInterval(t)
  }, [format])
  return time
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

/** True while the referenced element is on screen. Used to pause WebGL render loops. */
export function useInView(rootMargin = '100px') {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])
  return [ref, inView]
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

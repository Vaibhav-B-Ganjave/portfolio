import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 32, as = 'div', className, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Splits a string into letters that rise in one after another. */
export function SplitText({ text, delay = 0, gradient = false, className = '' }) {
  const chars = text.split('')
  return (
    <span className={`split ${className}`} aria-label={text}>
      {chars.map((ch, i) => (
        <span key={i} className="split-mask" aria-hidden="true">
          <motion.span
            className={`split-char${gradient ? ' grad-char' : ''}`}
            // One wide gradient shared across the word: each letter shows its own slice of it.
            style={gradient ? { backgroundSize: `${chars.length * 100}% 100%`, backgroundPosition: `${(i / Math.max(chars.length - 1, 1)) * 100}% 0` } : undefined}
            initial={{ y: '110%', rotate: 8 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 1, delay: delay + i * 0.035, ease }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Pulls its child toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 })
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 })

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.span ref={ref} className="magnetic" style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  )
}

/** Card that tilts in 3D toward the pointer and paints a spotlight under it. */
export function TiltCard({ children, className = '', max = 8, ...rest }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 18 })

  const onMove = e => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    px.set(nx)
    py.set(ny)
    ref.current.style.setProperty('--mx', `${nx * 100}%`)
    ref.current.style.setProperty('--my', `${ny * 100}%`)
  }
  const reset = () => { px.set(0.5); py.set(0.5) }

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.9, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Counts up from 0 when scrolled into view. Keeps any non-numeric suffix, e.g. "3+". */
export function Counter({ value, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const num = parseFloat(value)
  const suffix = String(value).replace(/[\d.]/g, '')

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, num, {
      duration: 1.8,
      ease,
      onUpdate: v => { if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix },
    })
    return () => controls.stop()
  }, [inView, num, decimals, suffix])

  return <span ref={ref}>{(0).toFixed(decimals) + suffix}</span>
}

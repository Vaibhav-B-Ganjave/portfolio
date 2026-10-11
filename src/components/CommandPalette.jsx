import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { profile } from '../data'
import { copyText, scrollToId, setScrollLocked } from '../hooks'
import { ArrowRight, Copy, GitHub, LinkedIn, Mail, Search } from './Icons'

function Palette({ onClose, onToast }) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef(null)
  const isPresent = useIsPresent()

  const items = useMemo(() => {
    const go = (label, id) => ({ group: 'Go to', label, icon: ArrowRight, run: () => scrollToId(id) })
    return [
      go('Home', 'top'),
      go('Experience', 'experience'),
      go('Selected work', 'work'),
      go('Skills', 'skills'),
      go('About & education', 'about'),
      go('Contact', 'contact'),
      { group: 'Actions', label: 'Copy email address', icon: Copy, run: async () => onToast(await copyText(profile.email) ? 'Email copied to clipboard' : 'Could not copy email') },
      { group: 'Actions', label: 'Send an email', icon: Mail, run: () => { window.location.href = `mailto:${profile.email}` } },
      { group: 'Links', label: 'GitHub', icon: GitHub, run: () => window.open(profile.github, '_blank', 'noopener') },
      { group: 'Links', label: 'LinkedIn', icon: LinkedIn, run: () => window.open(profile.linkedin, '_blank', 'noopener') },
    ]
  }, [onToast])

  const filtered = items.filter(i => i.label.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 10)
    return () => clearTimeout(t)
  }, [])

  const choose = item => {
    onClose()
    // The scroll lock is released as soon as `open` flips; wait a frame so navigation isn't swallowed.
    requestAnimationFrame(() => requestAnimationFrame(item.run))
  }

  const onKeyDown = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex(i => (i + 1) % Math.max(filtered.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex(i => (i - 1 + filtered.length) % Math.max(filtered.length, 1))
    } else if (e.key === 'Enter' && filtered[index]) {
      e.preventDefault()
      choose(filtered[index])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  let lastGroup = null

  return (
    <motion.div
      className="palette-backdrop"
      onMouseDown={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      // While fading out, let clicks and scrolling pass straight through to the page.
      style={{ pointerEvents: isPresent ? 'auto' : 'none' }}
      data-lenis-prevent
    >
      <motion.div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onMouseDown={e => e.stopPropagation()}
        onKeyDown={onKeyDown}
        initial={{ opacity: 0, y: -16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.15 } }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      >
        <div className="palette-search">
          <Search />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setIndex(0) }}
            placeholder="Where to? Type a section or action…"
            aria-label="Search commands"
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="palette-list" role="listbox">
          {filtered.length === 0 && <li className="palette-empty muted">No results for "{query}"</li>}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null
            lastGroup = item.group
            const Icon = item.icon
            return (
              <li key={item.label} role="presentation">
                {header && <div className="palette-group mono small muted">{header}</div>}
                <button
                  role="option"
                  aria-selected={i === index}
                  className={`palette-item${i === index ? ' is-active' : ''}`}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => choose(item)}
                >
                  {i === index && <motion.span layoutId="palette-hl" className="palette-hl" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
                  <Icon />
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default function CommandPalette({ open, ...props }) {
  // Lock page scroll only while open, and release it the instant the menu closes
  // (not after the exit animation), then hand focus back to where it was.
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement
    setScrollLocked(true)
    return () => {
      setScrollLocked(false)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus({ preventScroll: true })
    }
  }, [open])

  return <AnimatePresence>{open && <Palette {...props} />}</AnimatePresence>
}

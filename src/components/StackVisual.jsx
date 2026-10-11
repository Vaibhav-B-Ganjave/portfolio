import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMediaQuery } from '../hooks'

const ease = [0.22, 1, 0.36, 1]

/** Card that flies in from depth, then sits at its own Z layer. */
function Layer({ z, spread, delay, className, label, tech, children }) {
  const depth = useTransform(spread, s => z * s)
  return (
    <motion.div
      className={`layer ${className}`}
      style={{ z: depth }}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay, ease }}
    >
      <div className="layer-bar">
        <span className="layer-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="layer-label">{label}</span>
        <span className="layer-tech mono">{tech}</span>
      </div>
      <div className="layer-body">{children}</div>
    </motion.div>
  )
}

function useLatency() {
  const [ms, setMs] = useState(38)
  useEffect(() => {
    const t = setInterval(() => setMs(28 + Math.round(Math.random() * 30)), 1600)
    return () => clearInterval(t)
  }, [])
  return ms
}

/**
 * Exploded view of the three layers I build: React UI in front, Node/Express API in the middle,
 * SQL/MongoDB at the back. Tilts toward the pointer and spreads apart on hover.
 */
export default function StackVisual() {
  const ms = useLatency()
  const compact = useMediaQuery('(max-width: 640px)')
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], compact ? [-12, -4] : [-26, -6]), { stiffness: 90, damping: 20 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], compact ? [8, 4] : [14, 2]), { stiffness: 90, damping: 20 })
  const spread = useSpring(1, { stiffness: 120, damping: 18 })

  const onMove = e => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
    spread.set(1)
  }

  return (
    <div className="stack-scene" onPointerMove={onMove} onPointerEnter={() => spread.set(1.6)} onPointerLeave={onLeave} aria-hidden="true">
      <div className="stack-floor" />
      <motion.div className="stack" style={{ rotateX, rotateY }}>
        <Layer z={-110} spread={spread} delay={0.5} className="layer-db" label="Data" tech="SQL · MongoDB">
          <div className="db-head mono"><span>_id</span><span>stage</span><span>updated</span></div>
          {[
            ['64f…a21', 'self_review', '2m ago'],
            ['64f…b07', 'manager', 'just now'],
            ['64f…c9e', 'hr_review', '1h ago'],
            ['64f…d13', 'signed_off', '3h ago'],
          ].map(([id, stage, at], i) => (
            <div key={id} className={`db-row mono${i === 1 ? ' is-hot' : ''}`}><span>{id}</span><span>{stage}</span><span>{at}</span></div>
          ))}
        </Layer>

        <Layer z={0} spread={spread} delay={0.7} className="layer-api" label="API" tech="Node.js · Express">
          <div className="api-line mono">
            <span className="api-verb">GET</span> /api/appraisals/:id
            <span className="api-status">200 OK · {ms}ms</span>
          </div>
          <pre className="api-json mono">{`{ "stage": "manager_review",
  "progress": 0.66 }`}</pre>
        </Layer>

        <Layer z={110} spread={spread} delay={0.9} className="layer-ui" label="UI" tech="React.js">
          <div className="ui-bubble ui-user">Where is my appraisal?</div>
          <div className="ui-bubble ui-bot">It's with your manager, 2 of 3 steps done.</div>
          <div className="ui-progress"><span /><span /><span className="is-next" /></div>
          <div className="ui-typing"><i /><i /><i /></div>
        </Layer>
      </motion.div>
    </div>
  )
}

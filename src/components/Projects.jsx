import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { projects } from '../data'
import { useMediaQuery } from '../hooks'
import { SectionHead } from './About'
import { TiltCard } from './Motion'

function ChatVisual() {
  return (
    <div className="viz viz-chat" aria-hidden="true">
      <div className="viz-bar"><i /><i /><i /><span>eBuddy</span></div>
      <div className="bubble bubble-user">How do I raise a leave request?</div>
      <div className="bubble bubble-bot">Open the HR portal, choose <b>Leave</b>, pick your dates and submit. Want me to draft it?</div>
      <div className="bubble bubble-user short">Yes please</div>
      <div className="bubble bubble-bot typing"><i /><i /><i /></div>
      <div className="viz-input">Message eBuddy…</div>
    </div>
  )
}

function FlowVisual() {
  const steps = [['Self review', 'done'], ['Manager', 'done'], ['HR', 'active'], ['Sign-off', '']]
  return (
    <div className="viz viz-flow" aria-hidden="true">
      <div className="viz-bar"><i /><i /><i /><span>Appraisal cycle</span></div>
      <ol className="flow-steps">
        {steps.map(([label, state], i) => (
          <li key={label} className={state}>
            <span className="flow-dot">{state === 'done' ? '✓' : i + 1}</span>
            <span>{label}</span>
          </li>
        ))}
      </ol>
      <div className="flow-rows">
        {[82, 64, 91].map((w, i) => (
          <div key={i} className="flow-row"><span /><div><i style={{ width: `${w}%` }} /></div></div>
        ))}
      </div>
    </div>
  )
}

function GridVisual() {
  return (
    <div className="viz viz-grid" aria-hidden="true">
      <div className="viz-bar"><i /><i /><i /><span>Launcher 2</span></div>
      <div className="app-grid">
        {Array.from({ length: 8 }, (_, i) => <div key={i} className={`app-tile${i === 2 ? ' hot' : ''}`}><span /></div>)}
      </div>
      <div className="viz-code mono">module.<b>execute</b>(context)</div>
    </div>
  )
}

const visuals = { chat: ChatVisual, flow: FlowVisual, grid: GridVisual }

function ProjectCard({ p, i }) {
  const Visual = visuals[p.visual]
  return (
    <TiltCard className={`project-card accent-${i}`} max={5}>
      <div className="project-visual"><Visual /></div>
      <div className="project-body">
        <div className="project-meta mono small">
          <span>0{i + 1} / 0{projects.length}</span>
          <span className="muted">{p.context}</span>
        </div>
        <h3 className="project-title">{p.title}</h3>
        <p className="project-kind grad-text">{p.kind}</p>
        <p className="project-summary">{p.summary}</p>
        <ul className="ticks">
          {p.points.map(pt => <li key={pt}>{pt}</li>)}
        </ul>
        <ul className="chips">
          {p.tech.map(t => <li key={t} className="chip">{t}</li>)}
        </ul>
      </div>
    </TiltCard>
  )
}

/** On wide screens the section pins and the cards slide sideways as you scroll down. */
function HorizontalWork() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, v => -v * distance)
  const bar = useTransform(smooth, [0, 1], [0, 1])

  return (
    <section className="section work work--pinned" id="work" ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="work-sticky">
        <motion.div className="work-track" ref={trackRef} style={{ x }}>
          <div className="work-intro">
            <SectionHead
              index="02"
              kicker="Selected work"
              title={<>Products I've <span className="grad-text">built</span>.</>}
              note="Internal and client products, so there are no public links. Keep scrolling to see what each one does and what I built."
            />
          </div>
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          <div className="work-spacer" aria-hidden="true" />
        </motion.div>
        <div className="wrap work-progress">
          <motion.span style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  )
}

function StackedWork() {
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <SectionHead
          index="02"
          kicker="Selected work"
          title={<>Products I've <span className="grad-text">built</span>.</>}
          note="Internal and client products, so there are no public links. Here's what each one does and what I built."
        />
        <div className="work-stack">
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}

export default function Projects() {
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  return wide && !reducedMotion ? <HorizontalWork /> : <StackedWork />
}

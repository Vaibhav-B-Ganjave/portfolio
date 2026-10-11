import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience, projects, yearsOfExperience } from '../data'
import { scrollToId } from '../hooks'
import { SectionHead } from './About'
import { ArrowRight } from './Icons'
import { Reveal, TiltCard } from './Motion'

export default function Experience() {
  const lineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SectionHead
          index="01"
          kicker="Experience"
          title={<>{yearsOfExperience()}+ years shipping <span className="grad-text">enterprise software</span>.</>}
        />

        <div className="exp">
          <TiltCard className="tile exp-card" max={4}>
            <span className="tile-label">{experience.period}</span>
            <h3 className="exp-company">{experience.company}</h3>
            <p className="tile-strong grad-text">{experience.role}</p>
            <p className="muted">{experience.location} · Full-time</p>
            <ul className="chips">
              {['React.js', 'Node.js', 'Express', 'SQL', 'MongoDB', 'Mendix', 'Java'].map(t => <li key={t} className="chip">{t}</li>)}
            </ul>

            <div className="exp-products">
              <span className="tile-label">Products I built here</span>
              {projects.map(p => (
                <button key={p.id} className="exp-product" onClick={() => scrollToId('work')}>
                  <span>
                    <span className="tile-strong">{p.title}</span>
                    <span className="muted small"> · {p.kind}</span>
                  </span>
                  <ArrowRight />
                </button>
              ))}
            </div>
          </TiltCard>

          <div className="timeline" ref={lineRef}>
            <div className="tl-rail" aria-hidden="true">
              <motion.div className="tl-fill" style={{ scaleY: fill }} />
            </div>
            <ol>
              {experience.points.map((pt, i) => (
                <Reveal as="li" key={pt} className="tl-item" delay={i * 0.04}>
                  <span className="tl-dot" aria-hidden="true" />
                  <span className="mono small muted">{String(i + 1).padStart(2, '0')}</span>
                  <p>{pt}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

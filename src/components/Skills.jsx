import { lazy, Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sphereWords, stack } from '../data'
import { useInView } from '../hooks'
import { SectionHead } from './About'
import { Reveal } from './Motion'

const SkillSphere = lazy(() => import('../three/SkillSphere'))

export default function Skills() {
  const [sphereRef, inView] = useInView('200px')
  const [hovered, setHovered] = useState(null)

  return (
    <section className="section" id="skills">
      <div className="wrap">
        <SectionHead
          index="03"
          kicker="Skills"
          title={<>A toolbox that covers the <span className="grad-text">whole stack</span>.</>}
          note="Point at the globe to spin it. It's built in React Three Fiber: every word is a real 3D object."
        />

        <div className="skills">
          <div className="skills-sphere" ref={sphereRef}>
            <div className="sphere-glow" aria-hidden="true" />
            {inView || hovered !== null ? (
              <Suspense fallback={null}>
                <SkillSphere words={sphereWords} active={inView} onHover={setHovered} />
              </Suspense>
            ) : null}
            <AnimatePresence>
              {hovered && (
                <motion.span
                  key={hovered}
                  className="sphere-tag mono"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {hovered}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="skills-groups">
            {stack.map((g, i) => (
              <Reveal key={g.group} className="skill-group" delay={i * 0.06}>
                <h3 className="mono small">{g.group}</h3>
                <ul className="chips">
                  {g.items.map(item => <li key={item} className="chip">{item}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

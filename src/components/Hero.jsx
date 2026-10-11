import { motion } from 'framer-motion'
import { experience, profile, yearsOfExperience } from '../data'
import { scrollToId, useClock } from '../hooks'
import { ArrowRight, GitHub, LinkedIn } from './Icons'
import { Counter, Magnetic, SplitText } from './Motion'
import StackVisual from './StackVisual'

const ease = [0.22, 1, 0.36, 1]
const fadeUp = delay => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

export default function Hero() {
  const time = useClock()
  const years = yearsOfExperience()

  const go = id => e => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.div className="hero-badge" {...fadeUp(0.1)}>
            <i className="pulse" aria-hidden="true" />
            <span>Open to new opportunities</span>
            <span className="badge-sep" aria-hidden="true" />
            <span className="mono">Pune · {time} IST</span>
          </motion.div>

          <motion.p className="hero-eyebrow mono" {...fadeUp(0.2)}>
            Full Stack Developer · {years}+ years
          </motion.p>

          <h1 className="hero-title">
            <SplitText text="Vaibhav" delay={0.25} />
            <SplitText text="Ganjave" delay={0.45} gradient />
          </h1>

          <motion.p className="hero-lede" {...fadeUp(0.9)}>
            I build enterprise web apps end to end, from <strong>React</strong> interfaces and{' '}
            <strong>Node.js</strong> APIs down to <strong>SQL &amp; MongoDB</strong> schemas. Currently a{' '}
            {experience.role} at <strong>Four Colours</strong>.
          </motion.p>

          <motion.div className="hero-cta" {...fadeUp(1.05)}>
            <Magnetic>
              <a className="btn btn-primary" href="#experience" onClick={go('experience')}>View my experience <ArrowRight /></a>
            </Magnetic>
            {profile.resumeUrl ? (
              <a className="btn btn-glass" href={profile.resumeUrl} download>Download résumé</a>
            ) : (
              <a className="btn btn-glass" href="#contact" onClick={go('contact')}>Contact me</a>
            )}
            <a className="icon-btn icon-btn-lg" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
            <a className="icon-btn icon-btn-lg" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHub /></a>
          </motion.div>

          <motion.dl className="hero-stats" {...fadeUp(1.2)}>
            <div><dt><Counter value={`${years}+`} /></dt><dd>Years building for enterprise</dd></div>
            <div><dt><Counter value="3" /></dt><dd>Products shipped</dd></div>
            <div><dt><Counter value="2" /></dt><dd>Stacks: MERN &amp; Mendix/Java</dd></div>
          </motion.dl>
        </div>

        <motion.div className="hero-visual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
          <StackVisual />
          <p className="hero-visual-caption mono">UI → API → Data: I build every layer.</p>
        </motion.div>
      </div>
    </section>
  )
}

import photo from '../assets/Vaibhav.jpg'
import { certifications, education, languages, profile } from '../data'
import { useClock } from '../hooks'
import { Reveal, TiltCard } from './Motion'

export function SectionHead({ index, kicker, title, note }) {
  return (
    <header className="sec-head">
      <Reveal className="sec-kicker mono"><span className="sec-index">{index}</span>{kicker}</Reveal>
      <Reveal as="h2" className="sec-title" delay={0.05}>{title}</Reveal>
      {note && <Reveal as="p" className="sec-note" delay={0.1}>{note}</Reveal>}
    </header>
  )
}

export default function About() {
  const time = useClock()
  const degree = education[0]

  return (
    <section className="section" id="about">
      <div className="wrap">
        <SectionHead
          index="04"
          kicker="About"
          title={<>The person behind <span className="grad-text">the code</span>.</>}
        />

        <div className="bento">
          <TiltCard className="tile tile-intro" max={4}>
            <p className="intro-big">
              I'm a Computer Engineering graduate from Pune who found my place in <span className="hl">full-stack
              development</span>. I enjoy the whole journey of a feature, from a conversation about requirements
              to a <span className="hl">clean, deployed product</span> people use every day.
            </p>
            <p className="intro-small">
              At work I move between React screens, Express APIs, database schemas and Mendix models, often in
              the same week, and I like being the person who can follow a bug through every layer.
            </p>
          </TiltCard>

          <TiltCard className="tile tile-photo" max={6}>
            <div className="photo-frame">
              <img src={photo} alt="Portrait of Vaibhav Ganjave" loading="lazy" />
            </div>
            <div className="photo-caption">
              <span className="tile-strong">{profile.name}</span>
              <span className="mono small muted">{profile.role} · {profile.location}</span>
            </div>
          </TiltCard>

          <TiltCard className="tile tile-edu">
            <span className="tile-label">Education</span>
            <p className="big-num grad-text">{degree.score.split(' ')[0]}</p>
            <p className="tile-strong">{degree.title}</p>
            <p className="muted small">{degree.place}</p>
          </TiltCard>

          <TiltCard className="tile tile-time">
            <span className="tile-label">Local time · Pune</span>
            <p className="clock">{time}</p>
            <p className="muted small">IST (UTC+5:30)</p>
          </TiltCard>

          <TiltCard className="tile tile-cert">
            <span className="tile-label">Certifications</span>
            <ul className="cert-list">
              {certifications.map(c => (
                <li key={c.title}>
                  <span className="cert-badge" aria-hidden="true">✦</span>
                  <span>
                    <span className="tile-strong">{c.title}</span>
                    <span className="muted small block">{c.place}</span>
                  </span>
                </li>
              ))}
            </ul>
          </TiltCard>

          <TiltCard className="tile tile-lang">
            <span className="tile-label">I speak</span>
            <ul className="lang-list">
              {languages.map(l => (
                <li key={l.name}>
                  <span>{l.name}</span>
                  <span className="lang-meter" aria-label={l.level}>
                    {[1, 2, 3].map(n => <i key={n} className={n <= l.value ? 'on' : undefined} />)}
                  </span>
                  <span className="mono small muted">{l.level}</span>
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>

        <Reveal className="school-list">
          {education.slice(1).map(e => (
            <div key={e.title} className="school-row">
              <span className="tile-strong">{e.title}</span>
              <span className="muted small">{e.place}</span>
              <span className="mono small">{e.score}</span>
              <span className="mono small muted">{e.year}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { profile } from '../data'
import { copyText } from '../hooks'
import { ArrowUpRight, Copy, GitHub, Globe, LinkedIn, Mail, Phone } from './Icons'
import { Magnetic, Reveal, TiltCard } from './Motion'

const links = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { icon: LinkedIn, label: 'LinkedIn', value: profile.linkedinHandle, href: profile.linkedin },
  { icon: GitHub, label: 'GitHub', value: profile.githubHandle, href: profile.github },
  { icon: Globe, label: 'Portfolio', value: profile.websiteHandle, href: profile.website },
]

const empty = { name: '', email: '', subject: '', message: '' }

export default function Contact({ onToast }) {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          title: form.subject || 'Portfolio Contact',
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm(empty)
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 6000)
  }

  const copyEmail = async () => {
    onToast(await copyText(profile.email) ? 'Email copied to clipboard' : 'Could not copy. Please select it manually.')
  }

  const busy = status === 'loading'

  return (
    <section className="section contact" id="contact">
      <div className="contact-aurora" aria-hidden="true" />
      <div className="wrap">
        <Reveal className="sec-kicker mono"><span className="sec-index">05</span>Contact</Reveal>
        <Reveal as="h2" className="contact-title" delay={0.05}>
          <span className="contact-title-line">Let's build something</span>{' '}
          <span className="grad-text">remarkable</span>.
        </Reveal>

        <Reveal className="contact-email" delay={0.1}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button className="icon-btn" onClick={copyEmail} aria-label="Copy email address"><Copy /></button>
        </Reveal>

        <div className="contact-grid">
          <ul className="contact-links">
            {links.map(({ icon: Icon, label, value, href }, i) => {
              const external = href.startsWith('http')
              return (
                <Reveal as="li" key={label} delay={i * 0.05}>
                  <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
                    <span className="contact-icon"><Icon /></span>
                    <span className="contact-link-text">
                      <span className="contact-link-label">{label}</span>
                      <span className="muted small contact-link-value">{value}</span>
                    </span>
                    <ArrowUpRight />
                  </a>
                </Reveal>
              )
            })}
          </ul>

          <TiltCard className="tile form-card" max={3}>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  <span>Name</span>
                  <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" required disabled={busy} />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required disabled={busy} />
                </label>
              </div>
              <label>
                <span>Subject</span>
                <input type="text" value={form.subject} onChange={set('subject')} placeholder="A role, a project, or just hello" disabled={busy} />
              </label>
              <label>
                <span>Message</span>
                <textarea rows="5" value={form.message} onChange={set('message')} placeholder="Tell me a bit about it…" required disabled={busy} />
              </label>

              <div className="form-foot">
                <Magnetic strength={0.2}>
                  <button type="submit" className="btn btn-primary" disabled={busy}>
                    {busy ? <><span className="spinner" aria-hidden="true" /> Sending…</> : 'Send message'}
                  </button>
                </Magnetic>
                <p className={`form-status ${status}`} role="status">
                  {status === 'success' && "Thanks! Your message is on its way and I'll reply soon."}
                  {status === 'error' && `Something went wrong. Please email me directly at ${profile.email}.`}
                </p>
              </div>
            </form>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}

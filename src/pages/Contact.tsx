import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '9px', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)', marginBottom: '32px' }}>
          Get in Touch
        </p>
        <h1 style={{ fontFamily: 'var(--sz-serif)', fontWeight: 300, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '0.04em', color: 'var(--sz-ink)', margin: '0 auto 48px', lineHeight: 1.1 }}>
          <em>Begin a Conversation</em>
        </h1>

        {sent ? (
          <div>
            <div style={{ width: '1px', height: '48px', background: 'var(--sz-gold)', margin: '0 auto 32px' }} />
            <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '16px', color: 'var(--sz-ink-dim)', lineHeight: 1.9 }}>
              Thank you. We will be in touch within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { id: 'name', label: 'Name', type: 'text' },
              { id: 'email', label: 'Email', type: 'email' },
              { id: 'subject', label: 'Subject', type: 'text' },
            ].map(field => (
              <div key={field.id}>
                <label htmlFor={field.id} style={{ display: 'block', fontFamily: 'var(--sz-serif)', fontSize: '12px', letterSpacing: '0.06em', color: 'var(--sz-ink-mid)', marginBottom: '8px' }}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required
                  style={{
                    width: '100%', padding: '12px 0',
                    border: 'none', borderBottom: '1px solid var(--sz-ink-line)',
                    background: 'transparent', outline: 'none',
                    fontFamily: 'var(--sz-serif)', fontSize: '15px', color: 'var(--sz-ink)',
                    letterSpacing: '0.04em',
                  }}
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" style={{ display: 'block', fontFamily: 'var(--sz-serif)', fontSize: '12px', letterSpacing: '0.06em', color: 'var(--sz-ink-mid)', marginBottom: '8px' }}>
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                style={{
                  width: '100%', padding: '12px 0', resize: 'none',
                  border: 'none', borderBottom: '1px solid var(--sz-ink-line)',
                  background: 'transparent', outline: 'none',
                  fontFamily: 'var(--sz-serif)', fontSize: '15px', color: 'var(--sz-ink)',
                  letterSpacing: '0.04em', lineHeight: 1.8,
                }}
              />
            </div>
            <button type="submit" style={{
              alignSelf: 'flex-start',
              fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '9px', letterSpacing: '0.44em', textTransform: 'uppercase',
              color: 'var(--sz-blue)', border: '1px solid var(--sz-blue)', background: 'transparent',
              padding: '18px 52px', cursor: 'pointer', transition: 'background 0.35s, color 0.35s',
            }}>
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

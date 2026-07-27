export default function About() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
        textAlign: 'center',
        borderBottom: '1px solid var(--sz-ink-line)',
      }}>
        <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '9px', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)', marginBottom: '40px' }}>
          Our Story
        </p>
        <div style={{ width: '1px', height: '48px', background: 'var(--sz-gold)', margin: '0 auto 48px' }} />
        <h1 style={{
          fontFamily: 'var(--sz-serif)',
          fontWeight: 300,
          fontSize: 'clamp(36px, 6vw, 72px)',
          lineHeight: 1.05,
          letterSpacing: '0.03em',
          color: 'var(--sz-ink)',
          margin: '0 auto 40px',
          maxWidth: '800px',
        }}>
          <em>Rooted in History,<br />Worn by the Present</em>
        </h1>
        <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '16px', letterSpacing: '0.03em', color: 'var(--sz-ink-dim)', lineHeight: 1.9, maxWidth: '560px', margin: '0 auto' }}>
          Sahar Zaghloul is an Egyptian fine jewelry house drawing from the iconography, geometry, and symbolism of ancient Egypt — translated into contemporary pieces of enduring significance.
        </p>
      </section>

      {/* Philosophy */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '60vh',
      }}>
        <div style={{ background: 'var(--sz-blue)', padding: 'clamp(64px, 8vw, 112px)' }}>
          <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--sz-gold)', marginBottom: '32px' }}>Philosophy</p>
          <h2 style={{ fontFamily: 'var(--sz-serif)', fontWeight: 300, fontSize: 'clamp(24px, 3vw, 38px)', letterSpacing: '0.04em', color: 'rgba(245,241,235,0.92)', margin: '0 0 28px', lineHeight: 1.15 }}>
            <em>Objects of intention</em>
          </h2>
          <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '15px', letterSpacing: '0.02em', color: 'rgba(245,241,235,0.55)', lineHeight: 1.95 }}>
            We believe jewelry should carry meaning. Every motif we use — the lotus, the scarab, the eye — has been studied in its original context before it is reinterpreted in metal and stone.
          </p>
        </div>
        <div style={{ background: 'var(--sz-ink-line)' }} />
      </section>

      {/* Values */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)', borderTop: '1px solid var(--sz-ink-line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { title: 'Heritage', body: 'Each design is grounded in research into Egyptian antiquity. We do not use symbols casually.' },
            { title: 'Craft', body: 'Every piece is produced in limited quantities with master goldsmiths using traditional techniques.' },
            { title: 'Intention', body: 'We make jewelry for women who want to wear something that holds a story — not just an aesthetic.' },
          ].map(v => (
            <div key={v.title} style={{ textAlign: 'center' }}>
              <div style={{ width: '28px', height: '1px', background: 'var(--sz-gold)', margin: '0 auto 28px' }} />
              <h3 style={{ fontFamily: 'var(--sz-serif)', fontWeight: 400, fontSize: '22px', letterSpacing: '0.06em', color: 'var(--sz-ink)', marginBottom: '16px' }}>{v.title}</h3>
              <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '14px', color: 'var(--sz-ink-dim)', lineHeight: 1.9, letterSpacing: '0.02em' }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

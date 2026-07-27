import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--sz-blue)', color: 'rgba(245,241,235,0.45)' }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 40px 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '48px',
      }}>
        {/* Brand */}
        <div>
          <p style={{
            fontFamily: 'var(--sz-serif)',
            fontSize: '14px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,235,0.9)',
            marginBottom: '16px',
          }}>
            Sahar Zaghloul
          </p>
          <p style={{
            fontFamily: 'var(--sz-serif)',
            fontSize: '14px',
            lineHeight: 1.9,
            letterSpacing: '0.03em',
          }}>
            Egyptian-inspired fine jewelry.<br />
            Each piece a story of heritage.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <FooterHeading>Navigate</FooterHeading>
          <FooterLinks links={[
            { label: 'Collections', href: '/collections' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Customize', href: '/contact' },
          ]} />
        </div>

        {/* Legal */}
        <div>
          <FooterHeading>Information</FooterHeading>
          <FooterLinks links={[
            { label: 'Shipping Policy', href: '/contact' },
            { label: 'Returns', href: '/contact' },
            { label: 'Care Guide', href: '/contact' },
            { label: 'Privacy Policy', href: '/contact' },
          ]} />
        </div>

        {/* Contact */}
        <div>
          <FooterHeading>Contact</FooterHeading>
          <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '14px', lineHeight: 2, letterSpacing: '0.03em' }}>
            <a href="mailto:hello@saharzaghloul.com" style={{ color: 'rgba(245,241,235,0.45)', transition: 'color 0.2s' }}>
              hello@saharzaghloul.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '24px 40px',
        borderTop: '1px solid rgba(245,241,235,0.07)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <p style={{
          fontFamily: 'var(--sz-sans)',
          fontWeight: 200,
          fontSize: '8px',
          letterSpacing: '0.2em',
          color: 'rgba(245,241,235,0.2)',
        }}>
          © {new Date().getFullYear()} Sahar Zaghloul. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Instagram', 'Pinterest'].map(s => (
            <a key={s} href="#" style={{
              fontFamily: 'var(--sz-sans)',
              fontWeight: 200,
              fontSize: '8px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245,241,235,0.2)',
              transition: 'color 0.2s',
            }}>{s}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--sz-sans)',
      fontWeight: 200,
      fontSize: '8px',
      letterSpacing: '0.5em',
      textTransform: 'uppercase',
      color: 'var(--sz-gold)',
      marginBottom: '20px',
    }}>{children}</p>
  )
}

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {links.map(l => (
        <Link key={l.label} to={l.href} style={{
          fontFamily: 'var(--sz-serif)',
          fontSize: '14px',
          letterSpacing: '0.03em',
          color: 'rgba(245,241,235,0.45)',
          transition: 'color 0.2s',
        }}>{l.label}</Link>
      ))}
    </div>
  )
}

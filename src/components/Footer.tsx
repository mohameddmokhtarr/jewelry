import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--sz-blue)', color: 'rgba(245,241,235,0.45)' }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(64px,8vw,96px) clamp(24px,5vw,56px) clamp(40px,5vw,56px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '48px',
      }}>
        {/* Brand */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontFamily: 'Amiri, serif', fontSize: '26px', color: 'rgba(245,241,235,0.85)', direction: 'rtl', marginBottom: '4px' }}>سـر</div>
            <div style={{ width: '24px', height: '1px', background: 'var(--sz-gold)', marginBottom: '8px' }} />
            <p style={{
              fontFamily: 'Cinzel, serif', fontWeight: 400,
              fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(245,241,235,0.75)',
            }}>Sahar Zaghloul</p>
          </div>
          <p style={{
            fontFamily: 'var(--sz-serif)', fontSize: '14px',
            lineHeight: 1.9, letterSpacing: '0.03em',
          }}>
            Egyptian-inspired fine jewelry.<br />
            Each piece a story of heritage.
          </p>
        </div>

        {/* Shop */}
        <div>
          <FooterHeading>Shop</FooterHeading>
          <FooterLinks links={[
            { label: 'Earrings', href: '/collections/earrings' },
            { label: 'Cuffs', href: '/collections/cuffs' },
            { label: 'All Collections', href: '/collections' },
            { label: 'Customize', href: '/customize' },
          ]} />
        </div>

        {/* Company */}
        <div>
          <FooterHeading>Company</FooterHeading>
          <FooterLinks links={[
            { label: 'Our Story', href: '/our-story' },
            { label: 'Contact US', href: '/contact' },
            { label: 'Shipping Policy', href: '/contact' },
            { label: 'Returns', href: '/contact' },
          ]} />
        </div>

        {/* Contact */}
        <div>
          <FooterHeading>Contact</FooterHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="mailto:hello@saharzaghloul.com" style={{
              fontFamily: 'var(--sz-serif)', fontSize: '14px',
              letterSpacing: '0.03em', lineHeight: 1.8,
              color: 'rgba(245,241,235,0.45)', transition: 'color 0.2s',
            }}>
              hello@saharzaghloul.com
            </a>
            <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '14px', lineHeight: 1.8, letterSpacing: '0.03em' }}>
              Cairo, Egypt
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px clamp(24px,5vw,56px)',
        borderTop: '1px solid rgba(245,241,235,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <p style={{
          fontFamily: 'var(--sz-sans)', fontWeight: 200,
          fontSize: '7.5px', letterSpacing: '0.2em',
          color: 'rgba(245,241,235,0.18)',
        }}>
          © {new Date().getFullYear()} Sahar Zaghloul. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Instagram', 'Pinterest', 'TikTok'].map(s => (
            <a key={s} href="#" style={{
              fontFamily: 'var(--sz-sans)', fontWeight: 200,
              fontSize: '7.5px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(245,241,235,0.18)', transition: 'color 0.2s',
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
      fontFamily: 'var(--sz-sans)', fontWeight: 200,
      fontSize: '7.5px', letterSpacing: '0.52em', textTransform: 'uppercase',
      color: 'var(--sz-gold)', marginBottom: '20px',
    }}>{children}</p>
  )
}

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {links.map(l => (
        <Link key={l.label} to={l.href} style={{
          fontFamily: 'var(--sz-serif)', fontSize: '14px',
          letterSpacing: '0.03em', color: 'rgba(245,241,235,0.45)',
          transition: 'color 0.2s',
        }}>{l.label}</Link>
      ))}
    </div>
  )
}

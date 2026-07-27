import { Link } from 'react-router-dom'

export default function Cart() {
  return (
    <div style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--sz-serif)', fontWeight: 400, fontSize: 'clamp(20px, 3vw, 32px)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sz-ink)', marginBottom: '48px' }}>
        Your Bag
      </h1>
      <div style={{ borderTop: '1px solid var(--sz-ink-line)', paddingTop: '48px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '15px', color: 'var(--sz-ink-dim)', lineHeight: 1.9, marginBottom: '40px' }}>
          Your bag is empty.
        </p>
        <Link to="/collections" style={{
          display: 'inline-block',
          fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '9px', letterSpacing: '0.44em', textTransform: 'uppercase',
          color: 'var(--sz-blue)', border: '1px solid var(--sz-blue)',
          padding: '18px 52px', transition: 'background 0.35s, color 0.35s',
        }}>
          Explore Collections
        </Link>
      </div>
    </div>
  )
}

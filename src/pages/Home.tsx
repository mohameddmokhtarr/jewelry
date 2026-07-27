import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getProducts, getCollections } from '../lib/shopify'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { data: products } = useQuery({ queryKey: ['products'], queryFn: () => getProducts(8) })
  const { data: collections } = useQuery({ queryKey: ['collections'], queryFn: getCollections })

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '80px clamp(24px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <span style={{
          fontFamily: 'var(--sz-sans)',
          fontWeight: 200,
          fontSize: '9px',
          letterSpacing: '0.52em',
          textTransform: 'uppercase',
          color: 'var(--sz-ink-mid)',
          display: 'block',
          marginBottom: '36px',
        }}>Egyptian Fine Jewelry</span>

        <div style={{ width: '1px', height: '56px', background: 'var(--sz-gold)', margin: '0 auto 48px' }} />

        <h1 style={{
          fontFamily: 'var(--sz-serif)',
          fontWeight: 300,
          fontSize: 'clamp(42px, 7vw, 100px)',
          lineHeight: 1.0,
          letterSpacing: '0.02em',
          color: 'var(--sz-ink)',
          margin: '0 0 36px',
          maxWidth: '880px',
        }}>
          Jewelry Born<br />
          <em>from History</em>
        </h1>

        <p style={{
          fontFamily: 'var(--sz-serif)',
          fontSize: '16px',
          letterSpacing: '0.04em',
          color: 'var(--sz-ink-dim)',
          lineHeight: 1.95,
          maxWidth: '460px',
          margin: '0 auto 52px',
        }}>
          Each piece draws from ancient Egyptian iconography —
          reimagined for the woman of today.
        </p>

        <Link to="/collections/earrings" style={{
          display: 'inline-block',
          fontFamily: 'var(--sz-sans)',
          fontWeight: 200,
          fontSize: '9px',
          letterSpacing: '0.44em',
          textTransform: 'uppercase',
          color: 'var(--sz-blue)',
          border: '1px solid var(--sz-blue)',
          padding: '17px 52px',
          transition: 'background 0.35s, color 0.35s',
        }}>
          Shop Earrings
        </Link>
      </section>

      {/* Collections grid */}
      {collections && collections.length > 0 && (
        <section style={{
          padding: 'clamp(72px, 9vw, 128px) clamp(24px, 5vw, 80px)',
          borderTop: '1px solid var(--sz-ink-line)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--sz-ink-line)', paddingBottom: '20px', marginBottom: '48px' }}>
            <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '9px', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)', margin: 0 }}>
              Our Collections
            </p>
            <Link to="/collections" style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)', borderBottom: '1px solid var(--sz-ink-mid)', paddingBottom: '2px' }}>
              View All
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '28px',
          }}>
            {collections.slice(0, 4).map(col => (
              <Link key={col.id} to={`/collections/${col.handle}`} style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
                {col.image ? (
                  <img src={col.image.url} alt={col.image.altText || col.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94)' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(14,26,92,0.05)' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,26,92,0.52) 0%, transparent 55%)', display: 'flex', alignItems: 'flex-end', padding: '28px' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,241,235,0.65)', marginBottom: '6px' }}>Collection</p>
                    <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '20px', letterSpacing: '0.04em', color: 'rgba(245,241,235,0.95)', margin: 0 }}>{col.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Our Bestsellers */}
      {products && products.length > 0 && (
        <section style={{ padding: 'clamp(72px, 9vw, 128px) clamp(24px, 5vw, 80px)', borderTop: '1px solid var(--sz-ink-line)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--sz-ink-line)', paddingBottom: '20px', marginBottom: '48px' }}>
            <em style={{ fontFamily: 'var(--sz-serif)', fontSize: 'clamp(18px, 2vw, 24px)', letterSpacing: '0.06em', fontStyle: 'italic', fontWeight: 300, color: 'var(--sz-ink)' }}>
              Our Bestsellers
            </em>
            <Link to="/collections" style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)', borderBottom: '1px solid var(--sz-ink-mid)', paddingBottom: '2px' }}>
              View All
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 'clamp(28px, 3.5vw, 48px) clamp(18px, 2.5vw, 36px)',
          }}>
            {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <Link to="/collections" style={{
              display: 'inline-block',
              fontFamily: 'var(--sz-sans)',
              fontWeight: 200,
              fontSize: '9px',
              letterSpacing: '0.44em',
              textTransform: 'uppercase',
              color: 'var(--sz-blue)',
              border: '1px solid var(--sz-blue)',
              padding: '16px 48px',
            }}>
              View All
            </Link>
          </div>
        </section>
      )}

      {/* Customize Your Piece — image + text, 50/50 split */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        borderTop: '1px solid var(--sz-ink-line)',
      }}>
        {/* Image side — placeholder; will show product imagery */}
        <div style={{
          background: 'rgba(14,26,92,0.04)',
          minHeight: 'clamp(360px, 50vw, 640px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <span style={{ fontFamily: 'Amiri, serif', fontSize: '96px', color: 'rgba(14,26,92,0.08)', userSelect: 'none' }}>سر</span>
        </div>

        {/* Text side */}
        <div style={{
          background: 'var(--sz-canvas)',
          padding: 'clamp(56px, 8vw, 112px) clamp(32px, 6vw, 88px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--sz-blue)', marginBottom: '28px' }}>
            Bespoke
          </p>
          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontWeight: 400,
            fontSize: 'clamp(22px, 3vw, 34px)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--sz-ink)',
            margin: '0 0 24px',
            lineHeight: 1.2,
          }}>
            Customize<br />Your Piece
          </h2>
          <p style={{
            fontFamily: 'var(--sz-sans)',
            fontWeight: 200,
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--sz-blue)',
            lineHeight: 2.0,
            marginBottom: '40px',
            maxWidth: '380px',
          }}>
            Every piece starts with you. We work with your
            vision to create something distinctive,
            considered, and made to exist only once.
          </p>
          <Link to="/customize" style={{
            display: 'inline-block',
            fontFamily: 'var(--sz-sans)',
            fontWeight: 200,
            fontSize: '9px',
            letterSpacing: '0.44em',
            textTransform: 'uppercase',
            color: 'var(--sz-ink)',
            borderBottom: '1px solid var(--sz-ink)',
            paddingBottom: '4px',
            alignSelf: 'flex-start',
          }}>
            Shop Cuffs
          </Link>
        </div>
      </section>

      {/* Editorial / bespoke banner */}
      <section style={{
        background: 'var(--sz-blue)',
        padding: 'clamp(72px, 9vw, 120px) clamp(24px, 8vw, 120px)',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '9px', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(245,241,235,0.45)', marginBottom: '28px' }}>
          Our Story
        </p>
        <h2 style={{
          fontFamily: 'var(--sz-serif)',
          fontWeight: 300,
          fontSize: 'clamp(28px, 4.5vw, 58px)',
          lineHeight: 1.1,
          letterSpacing: '0.04em',
          color: 'rgba(245,241,235,0.95)',
          margin: '0 auto 28px',
          maxWidth: '680px',
        }}>
          <em>Each piece of jewelry is not just an accessory;<br />it's a piece of history.</em>
        </h2>
        <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '15px', letterSpacing: '0.04em', color: 'rgba(245,241,235,0.5)', lineHeight: 1.95, maxWidth: '460px', margin: '0 auto 44px' }}>
          Rooted in the iconography of ancient Egypt — the lotus, the scarab, the eye of Horus — reinterpreted for the woman of today.
        </p>
        <Link to="/our-story" style={{
          display: 'inline-block',
          fontFamily: 'var(--sz-sans)',
          fontWeight: 200,
          fontSize: '9px',
          letterSpacing: '0.44em',
          textTransform: 'uppercase',
          color: 'rgba(245,241,235,0.85)',
          border: '1px solid rgba(245,241,235,0.28)',
          padding: '16px 52px',
        }}>
          Our Story
        </Link>
      </section>
    </div>
  )
}

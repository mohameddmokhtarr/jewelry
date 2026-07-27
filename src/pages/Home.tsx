import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getProducts, getCollections } from '../lib/shopify'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { data: products } = useQuery({ queryKey: ['products'], queryFn: () => getProducts(8) })
  const { data: collections } = useQuery({ queryKey: ['collections'], queryFn: getCollections })

  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '90vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Left — editorial text */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(64px,8vw,120px) clamp(40px,6vw,100px)',
          borderRight: '1px solid var(--sz-ink-line)',
        }}>
          <span style={{
            fontFamily: 'var(--sz-sans)',
            fontWeight: 200,
            fontSize: '8.5px',
            letterSpacing: '0.55em',
            textTransform: 'uppercase',
            color: 'var(--sz-ink-mid)',
            display: 'block',
            marginBottom: '40px',
          }}>Egyptian Fine Jewelry</span>

          <div style={{ width: '1px', height: '52px', background: 'var(--sz-gold)', marginBottom: '48px' }} />

          <h1 style={{
            fontFamily: 'var(--sz-serif)',
            fontWeight: 300,
            fontSize: 'clamp(42px,5.5vw,82px)',
            lineHeight: 1.02,
            letterSpacing: '0.01em',
            color: 'var(--sz-ink)',
            margin: '0 0 32px',
          }}>
            Jewelry Born<br />
            <em>from History</em>
          </h1>

          <p style={{
            fontFamily: 'var(--sz-serif)',
            fontSize: '15px',
            letterSpacing: '0.04em',
            color: 'var(--sz-ink-dim)',
            lineHeight: 1.95,
            maxWidth: '380px',
            margin: '0 0 48px',
          }}>
            Each piece draws from ancient Egyptian iconography —
            reimagined for the woman of today.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/collections/earrings" style={{
              display: 'inline-block',
              fontFamily: 'var(--sz-sans)',
              fontWeight: 200,
              fontSize: '8.5px',
              letterSpacing: '0.44em',
              textTransform: 'uppercase',
              color: 'rgba(245,241,235,0.95)',
              background: 'var(--sz-blue)',
              padding: '16px 44px',
              transition: 'opacity 0.3s',
            }}>
              Shop Earrings
            </Link>
            <Link to="/collections/cuffs" style={{
              display: 'inline-block',
              fontFamily: 'var(--sz-sans)',
              fontWeight: 200,
              fontSize: '8.5px',
              letterSpacing: '0.44em',
              textTransform: 'uppercase',
              color: 'var(--sz-blue)',
              border: '1px solid var(--sz-blue)',
              padding: '16px 44px',
              transition: 'background 0.3s, color 0.3s',
            }}>
              Shop Cuffs
            </Link>
          </div>
        </div>

        {/* Right — large Arabic mark / editorial decoration */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '24px',
          background: 'var(--sz-canvas)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Large decorative Arabic mark */}
          <div style={{
            fontFamily: 'Amiri, serif',
            fontSize: 'clamp(160px, 18vw, 280px)',
            color: 'rgba(26,43,140,0.06)',
            lineHeight: 1,
            direction: 'rtl',
            userSelect: 'none',
            pointerEvents: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>سـر</div>

          {/* Centered brand identity block */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: 'Amiri, serif',
              fontSize: '48px',
              color: 'var(--sz-ink)',
              direction: 'rtl',
              marginBottom: '8px',
            }}>سـر</div>
            <div style={{ width: '32px', height: '1px', background: 'var(--sz-gold)', margin: '0 auto 16px' }} />
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: 400,
              fontSize: '10px',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'var(--sz-ink-soft)',
            }}>
              EST. CAIRO
            </div>
          </div>

          {/* Bottom quote */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '0', right: '0',
            textAlign: 'center',
            padding: '0 32px',
          }}>
            <p style={{
              fontFamily: 'var(--sz-serif)',
              fontSize: '12px',
              fontStyle: 'italic',
              letterSpacing: '0.04em',
              color: 'var(--sz-ink-mid)',
              lineHeight: 1.8,
            }}>
              "Each piece of jewelry is not just an accessory;<br />it's a piece of history."
            </p>
          </div>
        </div>
      </section>

      {/* ── MARQUEE / BRAND BAR ────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid var(--sz-ink-line)',
        borderBottom: '1px solid var(--sz-ink-line)',
        padding: '16px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'marquee 28s linear infinite',
          fontFamily: 'var(--sz-sans)',
          fontWeight: 200,
          fontSize: '8px',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'var(--sz-ink-mid)',
        }}>
          {Array(6).fill('Lotus · Scarab · Nile · Papyrus · Horus · Cleopatra · Pharaoh · Ancient Egypt · ').join('')}
        </div>
      </div>

      {/* ── COLLECTIONS ───────────────────────────────────────────── */}
      {collections && collections.length > 0 ? (
        <section style={{ padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,72px)' }}>
          <SectionHeader label="Our Collections" linkTo="/collections" linkLabel="View All" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {collections.slice(0, 4).map(col => (
              <Link key={col.id} to={`/collections/${col.handle}`}
                style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
                {col.image ? (
                  <img src={col.image.url} alt={col.image.altText || col.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(26,43,140,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Amiri, serif', fontSize: '64px', color: 'rgba(26,43,140,0.08)' }}>سـر</span>
                  </div>
                )}
                <div style={{ position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(14,26,92,0.55) 0%, transparent 50%)',
                  display: 'flex', alignItems: 'flex-end', padding: '28px' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '7.5px',
                      letterSpacing: '0.35em', textTransform: 'uppercase',
                      color: 'rgba(245,241,235,0.6)', marginBottom: '6px' }}>Collection</p>
                    <p style={{ fontFamily: 'Cinzel, serif', fontWeight: 400, fontSize: '16px',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'rgba(245,241,235,0.95)', margin: 0 }}>{col.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        /* Placeholder tiles when API hasn't loaded */
        <section style={{ padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,72px)' }}>
          <SectionHeader label="Our Collections" linkTo="/collections" linkLabel="View All" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '20px' }}>
            {['Earrings', 'Cuffs'].map(name => (
              <Link key={name} to={`/collections/${name.toLowerCase()}`}
                style={{ display: 'flex', position: 'relative', overflow: 'hidden', aspectRatio: '3/4',
                  background: 'rgba(26,43,140,0.03)', border: '1px solid var(--sz-ink-line)',
                  alignItems: 'flex-end', padding: '28px' }}>
                <div>
                  <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '7.5px',
                    letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)', marginBottom: '6px' }}>Collection</p>
                  <p style={{ fontFamily: 'Cinzel, serif', fontWeight: 400, fontSize: '18px',
                    letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sz-ink)', margin: 0 }}>{name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── BESTSELLERS ───────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,72px)', borderTop: '1px solid var(--sz-ink-line)' }}>
        <SectionHeader
          label={<em style={{ fontFamily: 'var(--sz-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: '0.06em', color: 'var(--sz-ink)' }}>Our Bestsellers</em>}
          linkTo="/collections"
          linkLabel="View All"
          isRich
        />
        {products && products.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))',
            gap: 'clamp(28px,3.5vw,48px) clamp(18px,2.5vw,36px)',
          }}>
            {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          /* Skeleton placeholders */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '32px' }}>
            {[1,2,3,4].map(i => (
              <div key={i}>
                <div style={{ aspectRatio: '2/3', background: 'rgba(26,43,140,0.03)', border: '1px solid var(--sz-ink-line)', marginBottom: '16px' }} />
                <div style={{ height: '10px', background: 'rgba(26,43,140,0.05)', marginBottom: '8px', borderRadius: '2px' }} />
                <div style={{ height: '8px', background: 'rgba(26,43,140,0.04)', width: '60%', borderRadius: '2px' }} />
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '52px' }}>
          <Link to="/collections" style={{
            display: 'inline-block',
            fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8.5px',
            letterSpacing: '0.44em', textTransform: 'uppercase',
            color: 'var(--sz-blue)', border: '1px solid var(--sz-blue)', padding: '16px 48px',
          }}>View All</Link>
        </div>
      </section>

      {/* ── CUSTOMIZE YOUR PIECE ──────────────────────────────────── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        borderTop: '1px solid var(--sz-ink-line)',
        minHeight: 'clamp(420px,55vw,680px)',
      }}>
        {/* Image / decorative left */}
        <div style={{
          background: 'var(--sz-canvas)',
          borderRight: '1px solid var(--sz-ink-line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '20px',
          padding: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Lotus decorative pattern in CSS */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(184,151,74,0.08) 0%, transparent 70%)`,
          }} />
          <div style={{
            fontFamily: 'Amiri, serif',
            fontSize: 'clamp(80px,12vw,160px)',
            color: 'rgba(26,43,140,0.05)',
            lineHeight: 1,
            direction: 'rtl',
            userSelect: 'none',
            position: 'absolute',
          }}>سـر</div>
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ width: '1px', height: '56px', background: 'var(--sz-gold)', margin: '0 auto 24px' }} />
            <p style={{
              fontFamily: 'Cinzel, serif', fontWeight: 400,
              fontSize: '11px', letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'var(--sz-ink-mid)',
            }}>Bespoke · Cairo</p>
          </div>
        </div>

        {/* Text right */}
        <div style={{
          background: 'var(--sz-canvas)',
          padding: 'clamp(56px,8vw,104px) clamp(32px,6vw,80px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px',
            letterSpacing: '0.55em', textTransform: 'uppercase',
            color: 'var(--sz-gold)', marginBottom: '24px',
          }}>Bespoke Service</p>

          <h2 style={{
            fontFamily: 'Cinzel, serif', fontWeight: 400,
            fontSize: 'clamp(24px,3vw,38px)',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--sz-ink)', margin: '0 0 28px', lineHeight: 1.2,
          }}>
            Customize<br />Your Piece
          </h2>

          <p style={{
            fontFamily: 'var(--sz-serif)', fontSize: '15px',
            letterSpacing: '0.03em', color: 'var(--sz-ink-dim)',
            lineHeight: 1.95, marginBottom: '40px', maxWidth: '380px',
          }}>
            Every piece starts with you. We work with your vision to create something distinctive,
            considered, and made to exist only once.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <Link to="/customize" style={{
              fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8.5px',
              letterSpacing: '0.44em', textTransform: 'uppercase',
              color: 'rgba(245,241,235,0.95)', background: 'var(--sz-blue)',
              padding: '16px 44px', display: 'inline-block',
            }}>Begin Your Piece</Link>
            <Link to="/collections/cuffs" style={{
              fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8.5px',
              letterSpacing: '0.44em', textTransform: 'uppercase',
              color: 'var(--sz-ink)', borderBottom: '1px solid var(--sz-ink-line)',
              paddingBottom: '3px',
            }}>Shop Cuffs</Link>
          </div>
        </div>
      </section>

      {/* ── BRAND STORY BANNER ────────────────────────────────────── */}
      <section style={{
        background: 'var(--sz-blue)',
        padding: 'clamp(80px,10vw,128px) clamp(24px,8vw,120px)',
        textAlign: 'center',
      }}>
        <div style={{ width: '1px', height: '48px', background: 'rgba(184,151,74,0.5)', margin: '0 auto 40px' }} />
        <p style={{
          fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px',
          letterSpacing: '0.55em', textTransform: 'uppercase',
          color: 'rgba(245,241,235,0.4)', marginBottom: '24px',
        }}>Our Story</p>
        <h2 style={{
          fontFamily: 'var(--sz-serif)', fontWeight: 300,
          fontSize: 'clamp(26px,4vw,54px)', lineHeight: 1.12,
          letterSpacing: '0.04em',
          color: 'rgba(245,241,235,0.95)',
          margin: '0 auto 28px', maxWidth: '700px',
        }}>
          <em>Each piece of jewelry is not just an accessory;<br />it's a piece of history.</em>
        </h2>
        <p style={{
          fontFamily: 'var(--sz-serif)', fontSize: '15px',
          letterSpacing: '0.04em', color: 'rgba(245,241,235,0.48)',
          lineHeight: 1.95, maxWidth: '440px', margin: '0 auto 48px',
        }}>
          Rooted in the iconography of ancient Egypt — the lotus, the scarab, the eye of Horus —
          reinterpreted for the woman of today.
        </p>
        <Link to="/our-story" style={{
          display: 'inline-block',
          fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8.5px',
          letterSpacing: '0.44em', textTransform: 'uppercase',
          color: 'rgba(245,241,235,0.82)',
          border: '1px solid rgba(245,241,235,0.22)', padding: '16px 52px',
        }}>Our Story</Link>
      </section>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (max-width: 767px) {
          section[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </div>
  )
}

function SectionHeader({ label, linkTo, linkLabel, isRich }: {
  label: React.ReactNode;
  linkTo: string;
  linkLabel: string;
  isRich?: boolean;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      borderBottom: '1px solid var(--sz-ink-line)', paddingBottom: '20px', marginBottom: '48px',
    }}>
      {isRich ? label : (
        <span style={{
          fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8.5px',
          letterSpacing: '0.52em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)',
        }}>{label}</span>
      )}
      <Link to={linkTo} style={{
        fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px',
        letterSpacing: '0.38em', textTransform: 'uppercase',
        color: 'var(--sz-ink-mid)', borderBottom: '1px solid var(--sz-ink-mid)', paddingBottom: '2px',
      }}>{linkLabel}</Link>
    </div>
  )
}

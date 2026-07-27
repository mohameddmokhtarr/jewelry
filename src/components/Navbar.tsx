import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const shopItems = [
  { label: 'Earrings', href: '/collections/earrings' },
  { label: 'Cuffs', href: '/collections/cuffs' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [mobileShoOpen, setMobileShopOpen] = useState(false)
  const { pathname } = useLocation()
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setShopOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Announcement bar */}
      <div style={{
        background: 'var(--sz-blue)',
        padding: '9px 0',
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--sz-sans)',
          fontWeight: 200,
          fontSize: '9px',
          letterSpacing: '0.46em',
          textTransform: 'uppercase',
          color: 'rgba(245,241,235,0.75)',
        }}>
          Express Your Unique Self With Our Statement Pieces
        </span>
      </div>

      {/* Header */}
      <header style={{
        background: 'var(--sz-canvas)',
        borderBottom: '1px solid var(--sz-ink-line)',
        position: 'sticky',
        top: 0,
        zIndex: 200,
      }}>
        {/* Logo row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          height: '80px',
        }}>
          {/* Search icon */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sz-ink-soft)', padding: '8px', display: 'flex' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" style={{ textAlign: 'center', lineHeight: 1 }}>
            {/* Arabic calligraphic mark */}
            <div style={{
              fontFamily: 'Amiri, serif',
              fontSize: '28px',
              color: 'var(--sz-ink)',
              lineHeight: 1,
              marginBottom: '2px',
              direction: 'rtl',
            }}>
              سـر
            </div>
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: 400,
              fontSize: '11.5px',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: 'var(--sz-ink)',
            }}>
              SAHAR ZAGHLOUL
            </div>
          </Link>

          {/* Cart + mobile menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Link to="/cart" style={{ padding: '8px', color: 'var(--sz-ink-soft)', display: 'flex' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sz-ink)', padding: '8px', display: 'flex' }}
              className="nav-hamburger"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {mobileOpen
                  ? <path d="M4 4L16 16M4 16L16 4" stroke="currentColor" strokeWidth="1.5"/>
                  : <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5"/>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Nav links row */}
        <nav style={{
          borderTop: '1px solid var(--sz-ink-line)',
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
        }} className="nav-desktop">
          {/* Home */}
          <NavLink href="/" active={isActive('/')}>Home</NavLink>

          {/* Shop dropdown */}
          <div ref={dropRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShopOpen(s => !s)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--sz-sans)',
                fontWeight: 200,
                fontSize: '9.5px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: pathname.startsWith('/collections') ? 'var(--sz-ink)' : 'var(--sz-ink-soft)',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
            >
              Shop
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d={shopOpen ? 'M9 5L5 1L1 5' : 'M1 1L5 5L9 1'} stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </button>
            {shopOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--sz-canvas)',
                border: '1px solid var(--sz-ink-line)',
                minWidth: '160px',
                zIndex: 300,
                boxShadow: '0 8px 32px rgba(14,26,92,0.06)',
              }}>
                {shopItems.map(item => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setShopOpen(false)}
                    style={{
                      display: 'block',
                      padding: '14px 24px',
                      fontFamily: 'var(--sz-sans)',
                      fontWeight: 200,
                      fontSize: '9px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--sz-ink)',
                      borderBottom: '1px solid var(--sz-ink-line)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink href="/customize" active={isActive('/customize')}>Customize</NavLink>
          <NavLink href="/our-story" active={isActive('/our-story') || isActive('/about')}>Our Story</NavLink>
          <NavLink href="/contact" active={isActive('/contact')}>Contact US</NavLink>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="nav-mobile-drawer" style={{
            background: 'var(--sz-canvas)',
            borderTop: '1px solid var(--sz-ink-line)',
            padding: '16px 0',
          }}>
            <MobileLink href="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
            {/* Shop expandable */}
            <div>
              <button
                onClick={() => setMobileShopOpen(s => !s)}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px clamp(20px, 5vw, 48px)',
                  fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '10px',
                  letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--sz-ink)',
                  borderBottom: '1px solid var(--sz-ink-line)',
                }}
              >
                Shop
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d={mobileShoOpen ? 'M9 5L5 1L1 5' : 'M1 1L5 5L9 1'} stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              </button>
              {mobileShoOpen && shopItems.map(item => (
                <MobileLink key={item.href} href={item.href} onClick={() => setMobileOpen(false)} indent>
                  {item.label}
                </MobileLink>
              ))}
            </div>
            <MobileLink href="/customize" onClick={() => setMobileOpen(false)}>Customize</MobileLink>
            <MobileLink href="/our-story" onClick={() => setMobileOpen(false)}>Our Story</MobileLink>
            <MobileLink href="/contact" onClick={() => setMobileOpen(false)}>Contact US</MobileLink>
          </div>
        )}
      </header>

      <style>{`
        .nav-hamburger { display: none; }
        .nav-desktop { display: flex; }
        .nav-mobile-drawer { display: block; }
        @media (min-width: 768px) {
          .nav-hamburger { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-hamburger { display: flex !important; }
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      style={{
        fontFamily: 'var(--sz-sans)',
        fontWeight: 200,
        fontSize: '9.5px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: active ? 'var(--sz-ink)' : 'var(--sz-ink-soft)',
        padding: '14px 20px',
        display: 'inline-block',
        borderBottom: active ? '1px solid var(--sz-ink)' : '1px solid transparent',
        transition: 'color 0.2s',
      }}
    >
      {children}
    </Link>
  )
}

function MobileLink({ href, onClick, children, indent }: { href: string; onClick: () => void; children: React.ReactNode; indent?: boolean }) {
  return (
    <Link
      to={href}
      onClick={onClick}
      style={{
        display: 'block',
        fontFamily: 'var(--sz-sans)',
        fontWeight: 200,
        fontSize: '10px',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'var(--sz-ink)',
        padding: `14px ${indent ? 'clamp(36px, 8vw, 72px)' : 'clamp(20px, 5vw, 48px)'}`,
        borderBottom: '1px solid var(--sz-ink-line)',
      }}
    >
      {children}
    </Link>
  )
}

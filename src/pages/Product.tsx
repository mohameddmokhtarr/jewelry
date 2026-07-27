import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProductByHandle, createCheckout } from '../lib/shopify'

export default function Product() {
  const { handle } = useParams<{ handle: string }>()
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProductByHandle(handle!),
    enabled: !!handle,
  })

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(false)

  if (isLoading) return (
    <div style={{ padding: 'clamp(64px, 8vw, 112px) clamp(24px, 5vw, 80px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
      <div style={{ aspectRatio: '2/3', background: 'var(--sz-ink-line)' }} />
      <div style={{ paddingTop: '40px' }}>
        <div style={{ height: '14px', background: 'var(--sz-ink-line)', width: '40%', marginBottom: '24px' }} />
        <div style={{ height: '40px', background: 'var(--sz-ink-line)', width: '80%', marginBottom: '16px' }} />
      </div>
    </div>
  )

  if (!product) return <div style={{ padding: '120px', textAlign: 'center', fontFamily: 'var(--sz-serif)' }}>Product not found.</div>

  const images = product.images.edges.map(e => e.node)
  const variants = product.variants.edges.map(e => e.node)
  const activeVariant = selectedVariantId ? variants.find(v => v.id === selectedVariantId) : variants[0]

  const handleBuy = async () => {
    const variantId = activeVariant?.id
    if (!variantId) return
    setLoading(true)
    try {
      const checkout = await createCheckout(variantId)
      window.location.href = checkout.webUrl
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(64px, 8vw, 112px) clamp(24px, 5vw, 80px)' }}>
      <Link to="/collections" style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)', borderBottom: '1px solid var(--sz-ink-mid)', paddingBottom: '2px', display: 'inline-block', marginBottom: '56px' }}>
        Collections
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 100px)', alignItems: 'start' }}>
        {/* Images */}
        <div>
          <div style={{ aspectRatio: '2/3', overflow: 'hidden', marginBottom: '16px' }}>
            {images[activeImage] && (
              <img src={images[activeImage].url} alt={images[activeImage].altText || product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }} />
            )}
          </div>
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} style={{
                  width: '64px', height: '80px', overflow: 'hidden', border: i === activeImage ? '1px solid var(--sz-ink)' : '1px solid var(--sz-ink-line)',
                  cursor: 'pointer', background: 'none', padding: 0,
                }}>
                  <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px', letterSpacing: '0.46em', textTransform: 'uppercase', color: 'var(--sz-gold)', marginBottom: '16px' }}>
            Sahar Zaghloul
          </p>
          <h1 style={{ fontFamily: 'var(--sz-serif)', fontWeight: 400, fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '0.04em', color: 'var(--sz-ink)', margin: '0 0 16px', lineHeight: 1.15 }}>
            {product.title}
          </h1>
          <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '16px', letterSpacing: '0.08em', color: 'var(--sz-ink)', marginBottom: '40px' }}>
            {parseFloat(activeVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(0)} {activeVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode}
          </p>

          {/* Options */}
          {product.options.filter(o => o.name !== 'Title').map(option => (
            <div key={option.name} style={{ marginBottom: '24px' }}>
              <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)', marginBottom: '12px' }}>{option.name}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {option.values.map(val => {
                  const variant = variants.find(v => v.selectedOptions.some(o => o.name === option.name && o.value === val))
                  const selected = activeVariant?.selectedOptions.some(o => o.name === option.name && o.value === val)
                  return (
                    <button key={val} onClick={() => variant && setSelectedVariantId(variant.id)} style={{
                      fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '9px', letterSpacing: '0.2em',
                      padding: '10px 20px', border: selected ? '1px solid var(--sz-ink)' : '1px solid var(--sz-ink-line)',
                      background: 'transparent', cursor: 'pointer', color: 'var(--sz-ink)',
                      opacity: variant?.availableForSale === false ? 0.35 : 1,
                    }}>{val}</button>
                  )
                })}
              </div>
            </div>
          ))}

          <button
            onClick={handleBuy}
            disabled={loading || !activeVariant?.availableForSale}
            style={{
              width: '100%', maxWidth: '480px', padding: '22px',
              background: 'var(--sz-blue)', color: 'var(--sz-canvas)',
              border: '1px solid var(--sz-blue)', cursor: loading ? 'wait' : 'pointer',
              fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '9px', letterSpacing: '0.44em', textTransform: 'uppercase',
              marginBottom: '48px', opacity: !activeVariant?.availableForSale ? 0.5 : 1,
              transition: 'background 0.35s, color 0.35s',
            }}
          >
            {!activeVariant?.availableForSale ? 'Sold Out' : loading ? 'Redirecting...' : 'Purchase'}
          </button>

          {/* Description */}
          {product.description && (
            <div>
              <div style={{ width: '28px', height: '1px', background: 'var(--sz-gold)', marginBottom: '24px' }} />
              <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '15px', letterSpacing: '0.02em', color: 'var(--sz-ink-dim)', lineHeight: 1.95 }}>
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

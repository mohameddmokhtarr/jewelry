import { Link } from 'react-router-dom'
import type { ShopifyProduct } from '../lib/shopify'

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images.edges[0]?.node
  const hoverImage = product.images.edges[1]?.node
  const variant = product.variants.edges[0]?.node
  const price = product.priceRange.minVariantPrice
  const available = variant?.availableForSale

  return (
    <Link to={`/products/${product.handle}`} style={{ display: 'block' }}>
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '2/3', background: 'var(--sz-canvas)', marginBottom: '20px' }}>
        {image && (
          <img
            src={image.url}
            alt={image.altText || product.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              mixBlendMode: 'multiply',
              transition: 'opacity 0.5s, transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94)',
              position: 'absolute',
              inset: 0,
            }}
          />
        )}
        {hoverImage && (
          <img
            src={hoverImage.url}
            alt={hoverImage.altText || product.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              mixBlendMode: 'multiply',
              transition: 'opacity 0.5s',
              opacity: 0,
              position: 'absolute',
              inset: 0,
            }}
            className="hover-img"
          />
        )}
        {!available && (
          <span style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            fontFamily: 'var(--sz-sans)',
            fontWeight: 200,
            fontSize: '8px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--sz-ink-mid)',
          }}>Sold Out</span>
        )}
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--sz-sans)',
          fontWeight: 200,
          fontSize: '9px',
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          color: 'var(--sz-ink)',
          marginBottom: '8px',
        }}>{product.title}</p>
        <p style={{
          fontFamily: 'var(--sz-serif)',
          fontSize: '12px',
          letterSpacing: '0.1em',
          color: 'var(--sz-ink-mid)',
        }}>
          {parseFloat(price.amount).toFixed(0)} {price.currencyCode}
        </p>
      </div>
    </Link>
  )
}

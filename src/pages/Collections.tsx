import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getCollections, getCollectionByHandle } from '../lib/shopify'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

export default function Collections() {
  const { handle } = useParams()

  if (handle) return <CollectionDetail handle={handle} />
  return <CollectionList />
}

function CollectionList() {
  const { data: collections, isLoading } = useQuery({ queryKey: ['collections'], queryFn: getCollections })

  return (
    <div style={{ padding: 'clamp(64px, 8vw, 112px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ textAlign: 'center', marginBottom: '72px' }}>
        <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '9px', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)', marginBottom: '24px' }}>Explore</p>
        <h1 style={{ fontFamily: 'var(--sz-serif)', fontWeight: 300, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '0.04em', color: 'var(--sz-ink)', margin: 0 }}>
          <em>All Collections</em>
        </h1>
      </div>

      {isLoading ? <LoadingGrid /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
          {collections?.map(col => (
            <Link key={col.id} to={`/collections/${col.handle}`} style={{ display: 'block' }}>
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', marginBottom: '20px' }}>
                {col.image
                  ? <img src={col.image.url} alt={col.image.altText || col.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94)' }} />
                  : <div style={{ width: '100%', height: '100%', background: 'var(--sz-ink-line)' }} />
                }
              </div>
              <p style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '9px', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--sz-ink)', textAlign: 'center', marginBottom: '8px' }}>{col.title}</p>
              {col.description && <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '13px', color: 'var(--sz-ink-dim)', textAlign: 'center', lineHeight: 1.7 }}>{col.description}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function CollectionDetail({ handle }: { handle: string }) {
  const { data: collection, isLoading } = useQuery({
    queryKey: ['collection', handle],
    queryFn: () => getCollectionByHandle(handle),
  })

  return (
    <div style={{ padding: 'clamp(64px, 8vw, 112px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ textAlign: 'center', marginBottom: '72px' }}>
        <Link to="/collections" style={{ fontFamily: 'var(--sz-sans)', fontWeight: 200, fontSize: '8px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--sz-ink-mid)', borderBottom: '1px solid var(--sz-ink-mid)', paddingBottom: '2px', display: 'inline-block', marginBottom: '32px' }}>
          All Collections
        </Link>
        <h1 style={{ fontFamily: 'var(--sz-serif)', fontWeight: 300, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '0.04em', color: 'var(--sz-ink)', margin: '0 0 16px' }}>
          <em>{collection?.title}</em>
        </h1>
        {collection?.description && (
          <p style={{ fontFamily: 'var(--sz-serif)', fontSize: '15px', color: 'var(--sz-ink-dim)', lineHeight: 1.9, maxWidth: '560px', margin: '0 auto' }}>{collection.description}</p>
        )}
      </div>

      {isLoading ? <LoadingGrid /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'clamp(32px,4vw,56px) clamp(20px,3vw,40px)' }}>
          {collection?.products.edges.map(({ node }) => (
            <ProductCard key={node.id} product={node} />
          ))}
        </div>
      )}
    </div>
  )
}

function LoadingGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '40px' }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <div style={{ aspectRatio: '2/3', background: 'var(--sz-ink-line)', marginBottom: '20px', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <div style={{ height: '12px', background: 'var(--sz-ink-line)', width: '60%', margin: '0 auto 8px' }} />
          <div style={{ height: '10px', background: 'var(--sz-ink-line)', width: '30%', margin: '0 auto' }} />
        </div>
      ))}
    </div>
  )
}

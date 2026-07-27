const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || 'ae29e7.myshopify.com'
const STOREFRONT_TOKEN = import.meta.env.VITE_STOREFRONT_TOKEN || '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'
const API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })
  const { data, errors } = await res.json()
  if (errors) throw new Error(errors[0].message)
  return data
}

export async function getProducts(first = 12) {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(`
    query Products($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 2) {
              edges { node { url altText } }
            }
            variants(first: 1) {
              edges { node { id availableForSale } }
            }
          }
        }
      }
    }
  `, { first })
  return data.products.edges.map(e => e.node)
}

export async function getCollections() {
  const data = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>(`
    query Collections {
      collections(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            image { url altText }
          }
        }
      }
    }
  `)
  return data.collections.edges.map(e => e.node)
}

export async function getCollectionByHandle(handle: string, first = 12) {
  const data = await shopifyFetch<{ collectionByHandle: ShopifyCollection & { products: { edges: { node: ShopifyProduct }[] } } }>(`
    query CollectionByHandle($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id
        title
        description
        image { url altText }
        products(first: $first) {
          edges {
            node {
              id
              handle
              title
              priceRange {
                minVariantPrice { amount currencyCode }
              }
              images(first: 2) {
                edges { node { url altText } }
              }
              variants(first: 1) {
                edges { node { id availableForSale } }
              }
            }
          }
        }
      }
    }
  `, { handle, first })
  return data.collectionByHandle
}

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<{ productByHandle: ShopifyProductDetail }>(`
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        images(first: 8) {
          edges { node { url altText } }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              price { amount currencyCode }
              selectedOptions { name value }
            }
          }
        }
        options { name values }
      }
    }
  `, { handle })
  return data.productByHandle
}

export async function createCheckout(variantId: string, quantity = 1) {
  const data = await shopifyFetch<{ checkoutCreate: { checkout: { webUrl: string } } }>(`
    mutation CheckoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout { webUrl }
        checkoutUserErrors { message }
      }
    }
  `, {
    input: {
      lineItems: [{ variantId, quantity }]
    }
  })
  return data.checkoutCreate.checkout
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: { edges: { node: { id: string; availableForSale: boolean } }[] }
}

export interface ShopifyProductDetail extends ShopifyProduct {
  descriptionHtml: string
  options: { name: string; values: string[] }[]
  variants: { edges: { node: { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string }; selectedOptions: { name: string; value: string }[] } }[] }
}

export interface ShopifyCollection {
  id: string
  handle: string
  title: string
  description: string
  image: { url: string; altText: string | null } | null
}

# Shilla Lace — Headless Next.js Storefront

A high-performance, conversion-focused Next.js storefront for [shillalace.com](https://shillalace.com), powered by Shopify's Storefront API.

## Tech Stack

- **Next.js 15** (App Router, React Server Components, Server Actions)
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP** (ScrollTrigger) + **Lenis** (smooth scroll)
- **Shopify Storefront API** (GraphQL)

## Getting Started

### Prerequisites

- Node.js 18.18+
- pnpm
- A Shopify store with Storefront API access

### Setup

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in your Shopify credentials:

```bash
cp .env.example .env.local
```

3. Install dependencies:

```bash
pnpm install
```

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | Your Shopify store domain (e.g., `shillalace.myshopify.com`) |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token |
| `SHOPIFY_REVALIDATION_SECRET` | Secret for webhook-based cache revalidation |
| `KLAVIYO_API_KEY` | Klaviyo private API key |
| `KLAVIYO_LIST_ID` | Klaviyo list ID for newsletter |
| `SITE_URL` | Your site URL (e.g., `https://shillalace.com`) |

## Shopify Setup

1. In your Shopify admin, go to **Settings > Apps and sales channels > Develop apps**
2. Create a new app and configure Storefront API scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_content`
3. Copy the Storefront API access token to your `.env.local`

## Webhook Setup (Cache Revalidation)

Create webhooks in Shopify pointing to `https://your-domain.com/api/revalidate`:
- `products/create`
- `products/update`
- `products/delete`
- `collections/create`
- `collections/update`
- `collections/delete`

## Deployment

Deploy to Vercel:

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

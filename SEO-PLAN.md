# Shilla Lace SEO Plan - Going Public

## What Was Blocking Indexing (Now Fixed)

These two issues were preventing Google from finding the site. Both have been resolved:

1. **`app/layout.tsx`** had `robots: { index: false, follow: false }` - changed to `true`
2. **`app/robots.ts`** had `disallow: "/"` blocking all crawlers - changed to `allow: "/"` with only internal routes blocked (`/api/`, `/dev/`, `/sourcing-preview/`)
3. **`app/favicon.ico`** was the default Vercel favicon - deleted. Site now uses `public/Favicon.png` (the SL logo)
4. **Sitemap** reference added to robots.txt output pointing to `https://shillalace.com/sitemap.xml`

---

## Immediate Action Items (Do These Now)

### 1. Set SITE_URL in Vercel Environment Variables

Your `.env.local` has `SITE_URL=http://localhost:3000`. In production on Vercel this needs to be correct.

1. Go to **Vercel Dashboard → Project → Settings → Environment Variables**
2. Add or update: `SITE_URL` = `https://shillalace.com`
3. Apply to **Production** (and optionally Preview/Development)
4. **Redeploy** the site after setting this

This affects your sitemap URLs, Open Graph tags, and organization JSON-LD. If it's wrong, Google will see `localhost:3000` URLs in your sitemap.

### 2. Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. You already have Google Site Verification set up in your DNS (`google-site-verification=T65mVwL...`) - verify the property if not already done
3. Add property for `https://shillalace.com`
4. Submit your sitemap: `https://shillalace.com/sitemap.xml`
5. Request indexing for the homepage
6. Monitor the **Coverage** report for any crawl errors

### 3. Google Business Profile

If you have an existing Google Business listing for Shilla Lace, make sure the website URL points to `https://shillalace.com`.

### 4. Remove Old Shopify from Google Search Console

If the old Shopify site was verified in Google Search Console, you may want to:
- Check if there's a separate property for the Shopify subdomain
- Make sure the primary property is the custom domain

---

## What's Already Working Well

Your site already has solid technical SEO foundations:

- **Dynamic sitemap** (`app/sitemap.ts`) - auto-generates URLs for all collections, products, and CMS pages from Shopify
- **Structured data (JSON-LD)** for products (price, availability, images), collections, and organization
- **Open Graph tags** on product pages with images
- **Dynamic metadata** pulled from Shopify SEO fields for products, collections, and pages
- **Title template** (`%s | Shilla Lace`) for consistent branding
- **Image optimization** with AVIF/WebP formats
- **Security headers** (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)

---

## SEO Optimization Roadmap

### Phase 1: Technical Foundation (Week 1)

#### Verify Core Web Vitals
- Run [PageSpeed Insights](https://pagespeed.web.dev/) on key pages after go-live
- Key pages to test: homepage, a collection page, a product page
- Focus on LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), INP (Interaction to Next Paint)
- Your ISR and image optimization should help here

#### Verify Sitemap Accuracy
- Visit `https://shillalace.com/sitemap.xml` after deploy
- Confirm all URLs use `https://shillalace.com` (not localhost)
- Check that all products and collections are listed
- Verify no broken/404 URLs

#### Check Canonical URLs
- Next.js with `metadataBase` set should auto-generate canonical URLs
- Verify by viewing page source on a product page - look for `<link rel="canonical">`

#### Set Up 301 Redirects (If Needed)
If the old Shopify site had different URL structures, set up redirects in `next.config.ts`:
- Shopify products: `/products/[handle]` - same as your Next.js routes, so likely no redirect needed
- Shopify collections: `/collections/[handle]` - same structure, likely fine
- Shopify pages: `/pages/[handle]` - same structure, likely fine
- If there were any custom Shopify pages or blog posts with different URLs, add redirects

### Phase 2: Content & On-Page SEO (Week 2-3)

#### Optimize Product SEO in Shopify Admin
Your site pulls SEO titles and descriptions from Shopify. For each product:
1. Go to **Shopify Admin → Products → [Product] → Search engine listing**
2. Write a unique **SEO title** (under 60 characters): e.g., "Black Lace Bodysuit | Shilla Lace"
3. Write a unique **SEO description** (under 160 characters): Describe the product with keywords naturally
4. Ensure the **URL handle** is clean and descriptive

#### Optimize Collection SEO in Shopify Admin
Same process for collections:
1. Go to **Shopify Admin → Collections → [Collection] → Search engine listing**
2. Include keywords like "lingerie", "bodysuit", "luxury lingerie" naturally

#### Homepage Meta Description
Currently: "Redefining intimacy with luxurious lingerie. Celebrating confidence and embracing individuality."
Consider adding more searchable terms: "Shop luxury lingerie, bodysuits, and intimate wear at Shilla Lace. Handcrafted designs celebrating confidence and individuality. Free shipping available."

### Phase 3: Off-Page SEO & Monitoring (Ongoing)

#### Monitor Google Search Console Weekly
- Check **Performance** tab for impressions, clicks, and average position
- Monitor **Coverage** for any indexing issues
- Review **Core Web Vitals** report
- Check for any **Manual Actions** or security issues

#### Social Media Profiles
Your organization JSON-LD already references:
- Instagram: https://www.instagram.com/shillalace/
- Facebook: https://www.facebook.com/profile.php?id=100094514659530

Make sure both profiles link back to `https://shillalace.com`.

#### Google Shopping (Optional)
If you want products to appear in Google Shopping:
1. Set up Google Merchant Center
2. Connect your product feed (Shopify has integrations for this)
3. Your product JSON-LD with pricing and availability already helps with rich results

---

## SEO Checklist Summary

### Before Deploy
- [x] Remove `noindex` / `nofollow` from layout.tsx
- [x] Update robots.ts to allow crawling
- [x] Fix favicon
- [x] Add sitemap reference to robots.ts
- [ ] Set `SITE_URL=https://shillalace.com` in Vercel env vars
- [ ] Redeploy to Vercel

### After Deploy
- [ ] Verify `https://shillalace.com/robots.txt` shows `Allow: /`
- [ ] Verify `https://shillalace.com/sitemap.xml` has correct URLs
- [ ] Verify favicon shows the SL logo (clear browser cache if needed)
- [ ] Submit sitemap in Google Search Console
- [ ] Request indexing for homepage
- [ ] Run PageSpeed Insights on homepage, a collection page, a product page
- [ ] Check all social media profiles link to shillalace.com
- [ ] Test Open Graph tags by pasting a product URL in the [Facebook Debugger](https://developers.facebook.com/tools/debug/)

### Ongoing
- [ ] Optimize product SEO titles and descriptions in Shopify
- [ ] Monitor Google Search Console weekly
- [ ] Track Core Web Vitals
- [ ] Build backlinks through social media, PR, and partnerships
